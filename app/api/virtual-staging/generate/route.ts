import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import {
  getOrCreateUser,
  createVirtualStaging,
  updateVirtualStagingResult,
  DAILY_CREDIT_LIMIT,
} from "@/lib/virtual-staging";
import { generateVirtualStaging } from "@/lib/nano-banana";
import { getDb } from "@/lib/db";
import { putImage } from "@/lib/storage";

export const runtime = "nodejs";

function getPublicUrlForKey(key: string) {
  const rawBase = process.env.R2_PUBLIC_URL?.trim();
  if (!rawBase) return null;

  const base = /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(rawBase)
    ? rawBase
    : `https://${rawBase.replace(/^\/+/, "")}`;

  try {
    const parsed = new URL(base);
    // S3 API endpoint requires auth and cannot be used as a browser-public URL.
    if (parsed.hostname.endsWith(".r2.cloudflarestorage.com")) return null;

    const normalizedBase = parsed.pathname.endsWith("/") ? parsed.toString() : `${parsed.toString()}/`;
    return new URL(key, normalizedBase).toString();
  } catch {
    return null;
  }
}

function getLocalProxyUrl(req: NextRequest, key: string) {
  const encodedKey = key.split("/").map(encodeURIComponent).join("/");
  return `${req.nextUrl.origin}/api/r2/${encodedKey}`;
}

async function resolveAccessibleImageUrl(
  req: NextRequest,
  candidateUrl: string | null,
  key: string,
  logPrefix: string,
) {
  const localProxyUrl = getLocalProxyUrl(req, key);
  if (!candidateUrl) return localProxyUrl;

  try {
    const headRes = await fetch(candidateUrl, { method: "HEAD" });
    if (headRes.ok) return candidateUrl;

    console.warn(`${logPrefix} public image URL is not accessible, using local proxy fallback`, {
      candidateUrl,
      localProxyUrl,
      status: headRes.status,
      statusText: headRes.statusText,
    });
    return localProxyUrl;
  } catch (error) {
    console.warn(`${logPrefix} failed to verify public image URL, using local proxy fallback`, {
      candidateUrl,
      localProxyUrl,
      error: String(error),
    });
    return localProxyUrl;
  }
}

export async function POST(req: NextRequest) {
  const requestId = nanoid(8);
  const logPrefix = `[virtual-staging:generate][${requestId}]`;
  try {
    console.info(`${logPrefix} request received`);
    const formData = await req.formData();
    const email = formData.get("email") as string;
    const style = formData.get("style") as string;
    const imageFile = formData.get("image") as File | null;
    const imageUrl = formData.get("imageUrl") as string | null;
    const prompt = (formData.get("prompt") as string) || "";
    const propertyIdStr = formData.get("propertyId") as string;
    const imageIndexStr = formData.get("imageIndex") as string;

    const propertyId = propertyIdStr ? parseInt(propertyIdStr, 10) : undefined;
    const imageIndex = imageIndexStr ? parseInt(imageIndexStr, 10) : undefined;

    console.info(`${logPrefix} payload parsed`, {
      hasEmail: Boolean(email),
      style: style || "default",
      hasImageFile: Boolean(imageFile),
      hasImageUrl: Boolean(imageUrl),
      promptLength: prompt.length,
      propertyId: propertyId ?? null,
      imageIndex: imageIndex ?? null,
    });

    if (!email || (!imageFile && !imageUrl)) {
      console.warn(`${logPrefix} validation failed: missing required fields`);
      return NextResponse.json({ errorCode: "VS_MISSING_REQUIRED_FIELDS" }, { status: 400 });
    }

    const user = await getOrCreateUser(email);
    if (!user) {
      console.error(`${logPrefix} failed to create/find user`);
      return NextResponse.json({ errorCode: "VS_COULD_NOT_CREATE_USER" }, { status: 500 });
    }

    console.info(`${logPrefix} user resolved`, {
      userId: user.Id,
      credits: user.Credits,
      dailyLimit: DAILY_CREDIT_LIMIT,
    });

    if (user.Credits <= 0) {
      console.warn(`${logPrefix} request blocked: daily limit reached`, { userId: user.Id });
      return NextResponse.json(
        { errorCode: "VS_DAILY_LIMIT_REACHED", credits: 0, dailyLimit: DAILY_CREDIT_LIMIT },
        { status: 402 },
      );
    }

    let base64Image: string;
    let finalOriginalUrl: string;
    let sourceMimeType = "image/png";
    const shareId = nanoid();
    const timestamp = Date.now();

    if (imageFile && imageFile.size > 0) {
      console.info(`${logPrefix} processing uploaded file`, {
        fileSize: imageFile.size,
        mimeType: imageFile.type || "image/png",
      });
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      base64Image = buffer.toString("base64");
      sourceMimeType = imageFile.type || "image/png";
      finalOriginalUrl = `data:${sourceMimeType};base64,${base64Image}`;
    } else if (imageUrl) {
      console.info(`${logPrefix} fetching source image`, { imageUrl });
      const imageRes = await fetch(imageUrl);
      if (!imageRes.ok) {
        console.error(`${logPrefix} failed to fetch source image`, {
          imageUrl,
          status: imageRes.status,
          statusText: imageRes.statusText,
        });
        return NextResponse.json({ errorCode: "VS_FAILED_TO_FETCH_SOURCE_IMAGE" }, { status: 400 });
      }
      const arrayBuffer = await imageRes.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      base64Image = buffer.toString("base64");
      sourceMimeType = imageRes.headers.get("content-type") || "image/png";
      finalOriginalUrl = imageUrl;
    } else {
      console.warn(`${logPrefix} validation failed: no valid image provided`);
      return NextResponse.json({ errorCode: "VS_NO_VALID_IMAGE_PROVIDED" }, { status: 400 });
    }

    console.info(`${logPrefix} creating staging record`, { userId: user.Id, shareId });
    const stagingId = await createVirtualStaging(
      user.Id,
      finalOriginalUrl,
      style,
      prompt,
      propertyId,
      imageIndex,
      shareId,
    );

    if (!stagingId) {
      console.error(`${logPrefix} failed to create staging record`, { userId: user.Id, shareId });
      return NextResponse.json({ errorCode: "VS_FAILED_TO_CREATE_STAGING_RECORD" }, { status: 500 });
    }

    console.info(`${logPrefix} staging record created`, { stagingId });
    let generatedBuffer: Buffer | null;
    try {
      console.info(`${logPrefix} starting AI generation`, { stagingId, style: style || "default" });
      generatedBuffer = await generateVirtualStaging(base64Image, sourceMimeType, style, prompt);
      console.info(`${logPrefix} AI generation completed`, {
        stagingId,
        bytes: generatedBuffer?.length ?? 0,
      });
    } catch {
      console.error(`${logPrefix} AI generation failed`, { stagingId });
      await updateVirtualStagingResult(stagingId, "", "failed");
      return NextResponse.json({ errorCode: "VS_AI_GENERATION_FAILED" }, { status: 500 });
    }

    if (!generatedBuffer) {
      console.error(`${logPrefix} AI generation returned empty result`, { stagingId });
      await updateVirtualStagingResult(stagingId, "", "failed");
      return NextResponse.json(
        { errorCode: "VS_AI_GENERATION_EMPTY_RESULT" },
        { status: 500 },
      );
    }

    const generatedFilename = `virtual-staging/${user.Id}/${timestamp}-generated.png`;
    console.info(`${logPrefix} uploading generated image`, {
      stagingId,
      generatedFilename,
      bytes: generatedBuffer.length,
    });
    // Miniflare can assert on Buffer serialization across worker boundary.
    // Upload as a plain Uint8Array copy to avoid local dev devalue assertion errors.
    const generatedBytes = Uint8Array.from(generatedBuffer);
    await putImage(generatedFilename, generatedBytes, { contentType: "image/png" });
    console.info(`${logPrefix} upload completed`, { stagingId, generatedFilename });
    const generatedPublicUrl = await resolveAccessibleImageUrl(
      req,
      getPublicUrlForKey(generatedFilename),
      generatedFilename,
      logPrefix,
    );
    console.info(`${logPrefix} resolved generated public url`, {
      stagingId,
      usesLocalProxyFallback: generatedPublicUrl.includes("/api/r2/"),
    });

    console.info(`${logPrefix} updating staging result`, { stagingId });
    await updateVirtualStagingResult(stagingId, generatedPublicUrl, "completed");
    console.info(`${logPrefix} staging record marked completed`, { stagingId, generatedFilename });

    const db = getDb();
    console.info(`${logPrefix} decrementing credits`, { userId: user.Id });
    await db.prepare("UPDATE Users SET Credits = Credits - 1 WHERE Id = ?").bind(user.Id).run();
    console.info(`${logPrefix} credits updated`, { userId: user.Id, remainingCredits: user.Credits - 1 });

    return NextResponse.json({
      success: true,
      data: {
        originalUrl: finalOriginalUrl,
        generatedUrl: generatedPublicUrl,
        credits: user.Credits - 1,
        dailyLimit: DAILY_CREDIT_LIMIT,
        shareId,
      },
    });
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error(String(error));
    console.error(`${logPrefix} unhandled error`, {
      name: err.name,
      message: err.message,
      stack: err.stack,
    });
    return NextResponse.json(
      { errorCode: "VS_INTERNAL_SERVER_ERROR", details: err.message },
      { status: 500 },
    );
  }
}
