import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GOOGLE_GEMINI_API_KEY;

function getImageDimensions(buffer: Buffer): { width: number; height: number } {
  if (
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47
  ) {
    const width = buffer.readUInt32BE(16);
    const height = buffer.readUInt32BE(20);
    return { width, height };
  }

  if (buffer[0] === 0xff && buffer[1] === 0xd8) {
    let offset = 2;
    while (offset < buffer.length) {
      if (buffer[offset] !== 0xff) break;
      offset++;
      const marker = buffer[offset];
      offset++;
      const len = buffer.readUInt16BE(offset);
      if (marker === 0xc0 || marker === 0xc2) {
        const height = buffer.readUInt16BE(offset + 3);
        const width = buffer.readUInt16BE(offset + 5);
        return { width, height };
      }
      offset += len;
    }
  }

  return { width: 1024, height: 1024 };
}

const STYLES: Record<string, string> = {
  Minimalism:
    "Analyze this interior image and add, replace, or refine the furniture and decor as needed so the space feels fully resolved by a high-end interior designer. Respect the original architecture, proportions, base materials, natural light, windows, doors, circulation paths, and overall structure of the space. Scale every piece correctly, maintain realistic distances, avoid visual clutter, and also avoid making the room feel empty. If furniture already exists, keep only the pieces that truly contribute and replace or remove the ones that do not. If the space is empty, furnish it from scratch with a complete, elegant, coherent, and professional design proposal. Apply a luxury minimalism style, with clean lines, a restrained and sophisticated composition, very few elements but each one carefully selected, high-end contemporary furniture, noble materials such as stone, wood, linen, marble, and subtle metal accents, a neutral palette of cream, beige, sand, warm gray, and soft black, warm integrated lighting, and an overall feeling of spaciousness, calm, order, refinement, and quiet luxury. The final result must feel sophisticated, harmonious, functional, livable, realistic, editorial, and quietly luxurious, with curated furniture, strong composition, decorative lighting, and believable materials. Avoid furniture that is out of scale, too many objects, generic decor, poor layout, unrealistic elements, or cheap finishes. Faithfully preserve and replicate any important existing details in the image, including water droplets, reflections, natural imperfections, glass texture, or the original atmosphere, so the final edit feels fully integrated and natural. Make it look like a professionally staged luxury interior, not AI-generated.",
  Modern:
    "Analyze this interior image and add, replace, or refine the furniture and decor as needed so the space feels fully resolved by a high-end interior designer. Respect the original architecture, proportions, base materials, natural light, windows, doors, circulation paths, and overall structure of the space. Scale every piece correctly, maintain realistic distances, avoid visual clutter, and also avoid making the room feel empty. If furniture already exists, keep only the pieces that truly contribute and replace or remove the ones that do not. If the space is empty, furnish it from scratch with a complete, elegant, coherent, and professional design proposal. Apply a modern style, with defined and elegant lines, contemporary furniture with clean forms and balanced proportions, a refined mix of materials such as wood, metal, glass, stone, and sophisticated textiles, a mostly neutral palette with subtle accents, functional design, an ordered composition, architectural lighting, and an overall feeling of freshness, sophistication, and high-end design. The final result must feel sophisticated, harmonious, functional, livable, realistic, editorial, and quietly luxurious, with curated furniture, strong composition, decorative lighting, and believable materials. Avoid furniture that is out of scale, too many objects, generic decor, poor layout, unrealistic elements, or cheap finishes. Faithfully preserve and replicate any important existing details in the image, including water droplets, reflections, natural imperfections, glass texture, or the original atmosphere, so the final edit feels fully integrated and natural. Make it look like a professionally staged luxury interior, not AI-generated.",
  Industrial:
    "Analyze this interior image and add, replace, or refine the furniture and decor as needed so the space feels fully resolved by a high-end interior designer. Respect the original architecture, proportions, base materials, natural light, windows, doors, circulation paths, and overall structure of the space. Scale every piece correctly, maintain realistic distances, avoid visual clutter, and also avoid making the room feel empty. If furniture already exists, keep only the pieces that truly contribute and replace or remove the ones that do not. If the space is empty, furnish it from scratch with a complete, elegant, coherent, and professional design proposal. Apply an industrial style, with honest materials and strong architectural character, including concrete, black metal, steel, aged or natural wood, restrained leather, track or pendant lighting, strong lines, and substantial yet well-proportioned furniture. Use a palette of grays, charcoal, black, brown, and earthy tones to create a sophisticated, urban, masculine, editorial, and premium environment, never rough or improvised. The final result must feel sophisticated, harmonious, functional, livable, realistic, editorial, and quietly luxurious, with curated furniture, strong composition, decorative lighting, and believable materials. Avoid furniture that is out of scale, too many objects, generic decor, poor layout, unrealistic elements, or cheap finishes. Faithfully preserve and replicate any important existing details in the image, including water droplets, reflections, natural imperfections, glass texture, or the original atmosphere, so the final edit feels fully integrated and natural. Make it look like a professionally staged luxury interior, not AI-generated.",
  Scandinavian:
    "Analyze this interior image and add, replace, or refine the furniture and decor as needed so the space feels fully resolved by a high-end interior designer. Respect the original architecture, proportions, base materials, natural light, windows, doors, circulation paths, and overall structure of the space. Scale every piece correctly, maintain realistic distances, avoid visual clutter, and also avoid making the room feel empty. If furniture already exists, keep only the pieces that truly contribute and replace or remove the ones that do not. If the space is empty, furnish it from scratch with a complete, elegant, coherent, and professional design proposal. Apply a Scandinavian style, with clean, warm, and light-filled design, light woods, natural textiles such as linen, wool, and cotton, furniture with simple and soft lines, a palette of off-white, beige, light gray, sand, and natural wood tones, discreet and functional decor, soft lighting, and an overall feeling of tranquility, order, comfort, and natural elegance. The final result must feel sophisticated, harmonious, functional, livable, realistic, editorial, and quietly luxurious, with curated furniture, strong composition, decorative lighting, and believable materials. Avoid furniture that is out of scale, too many objects, generic decor, poor layout, unrealistic elements, or cheap finishes. Faithfully preserve and replicate any important existing details in the image, including water droplets, reflections, natural imperfections, glass texture, or the original atmosphere, so the final edit feels fully integrated and natural. Make it look like a professionally staged luxury interior, not AI-generated.",
  Boho:
    "Analyze this interior image and add, replace, or refine the furniture and decor as needed so the space feels fully resolved by a high-end interior designer. Respect the original architecture, proportions, base materials, natural light, windows, doors, circulation paths, and overall structure of the space. Scale every piece correctly, maintain realistic distances, avoid visual clutter, and also avoid making the room feel empty. If furniture already exists, keep only the pieces that truly contribute and replace or remove the ones that do not. If the space is empty, furnish it from scratch with a complete, elegant, coherent, and professional design proposal. Apply a boho style, with a curated mix of textures, natural materials, fibers, wood, linen, ceramics, handcrafted details, and organic accents, using a warm palette of earth tones, sand, terracotta, cream, olive, and soft brown. Include relaxed yet well-designed furniture, layered textiles, and an artistic, natural, free-spirited, and sophisticated atmosphere, while avoiding visual excess and maintaining a premium, refined, editorial look. The final result must feel sophisticated, harmonious, functional, livable, realistic, editorial, and quietly luxurious, with curated furniture, strong composition, decorative lighting, and believable materials. Avoid furniture that is out of scale, too many objects, generic decor, poor layout, unrealistic elements, or cheap finishes. Faithfully preserve and replicate any important existing details in the image, including water droplets, reflections, natural imperfections, glass texture, or the original atmosphere, so the final edit feels fully integrated and natural. Make it look like a professionally staged luxury interior, not AI-generated.",
  Hacienda:
    "Analyze this interior image and add, replace, or refine the furniture and decor as needed so the space feels fully resolved by a high-end interior designer. Respect the original architecture, proportions, base materials, natural light, windows, doors, circulation paths, and overall structure of the space. Scale every piece correctly, maintain realistic distances, avoid visual clutter, and also avoid making the room feel empty. If furniture already exists, keep only the pieces that truly contribute and replace or remove the ones that do not. If the space is empty, furnish it from scratch with a complete, elegant, coherent, and professional design proposal. Apply a hacienda style, warm, traditional, and authentic, with rich natural materials such as carved wood, terracotta, wrought iron, stone, and artisanal textiles. Use a palette of warm neutrals, clay, sand, cream, muted ochre, and earthy browns, with tasteful handcrafted accents, timeless furniture, and layered textures that feel inviting and rooted in place. Keep the composition elegant and premium, balancing rustic character with refined styling and editorial polish. The final result must feel sophisticated, harmonious, functional, livable, realistic, editorial, and quietly luxurious, with curated furniture, strong composition, decorative lighting, and believable materials. Avoid furniture that is out of scale, too many objects, generic decor, poor layout, unrealistic elements, or cheap finishes. Faithfully preserve and replicate any important existing details in the image, including water droplets, reflections, natural imperfections, glass texture, or the original atmosphere, so the final edit feels fully integrated and natural. Make it look like a professionally staged luxury interior, not AI-generated.",
};

function getClosestAspectRatio(width: number, height: number): string {
  const ratio = width / height;
  const ratios: Record<string, number> = {
    "1:1": 1,
    "4:3": 4 / 3,
    "3:4": 3 / 4,
    "16:9": 16 / 9,
    "9:16": 9 / 16,
  };

  let best = "4:3";
  let minDiff = Infinity;
  for (const [key, val] of Object.entries(ratios)) {
    const diff = Math.abs(ratio - val);
    if (diff < minDiff) {
      minDiff = diff;
      best = key;
    }
  }

  return best;
}

export async function generateVirtualStaging(
  imageBase64: string,
  imageMimeType: string,
  style: string,
  customPrompt?: string,
): Promise<Buffer | null> {
  if (!apiKey) {
    console.warn("Missing GOOGLE_GEMINI_API_KEY, returning input image.");
    return Buffer.from(imageBase64, "base64");
  }

  let promptText = STYLES[style] || "Furnish this empty room.";
  if (customPrompt && customPrompt.trim().length > 0) {
    promptText += ` IMPORTANT ADDITIONAL INSTRUCTIONS: ${customPrompt}. Follow these instructions strictly while maintaining the overall ${style} style.`;
  }

  promptText +=
    " CRITICAL: You MUST preserve the EXACT aspect ratio and dimensions of the input image. Do NOT crop the image. Do NOT make it square. The output image must have the same width and height ratio as the input image.";

  const ai = new GoogleGenAI({ apiKey });
  const modelName = process.env.GEMINI_MODEL || "gemini-2.5-flash-image";

  const buffer = Buffer.from(imageBase64, "base64");
  const { width, height } = getImageDimensions(buffer);
  const aspectRatio = getClosestAspectRatio(width, height);
  const requestId = Math.random().toString(36).slice(2, 10);
  const logPrefix = `[nano-banana][${requestId}]`;

  console.info(`${logPrefix} generate request`, {
    modelName,
    style,
    mimeType: imageMimeType,
    width,
    height,
    aspectRatio,
    hasCustomPrompt: Boolean(customPrompt?.trim()),
  });

  const maxAttempts = 3;
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    const retryInstruction =
      attempt === 1
        ? ""
        : " IMPORTANT: Return an IMAGE output only. Do not return explanation text by itself.";

    const response = await ai.models.generateContent({
      model: modelName,
      contents: [
        { text: `${promptText}${retryInstruction}` },
        {
          inlineData: {
            mimeType: imageMimeType,
            data: imageBase64,
          },
        },
      ],
      config: {
        responseModalities: ["IMAGE", "TEXT"],
        generationConfig: {
          responseModalities: ["IMAGE", "TEXT"],
          imageConfig: {
            aspectRatio,
            imageSize: "2K",
          },
        },
      } as never,
    });

    const candidates = response.candidates;
    if (!candidates?.length) {
      console.warn(`${logPrefix} no candidates returned`, { attempt, maxAttempts });
      continue;
    }

    const firstCandidate = candidates[0];
    console.info(`${logPrefix} candidate metadata`, {
      attempt,
      maxAttempts,
      finishReason: firstCandidate.finishReason ?? null,
      hasContent: Boolean(firstCandidate.content),
      partsCount: firstCandidate.content?.parts?.length ?? 0,
    });

    const parts = firstCandidate.content?.parts;
    if (!parts) {
      console.warn(`${logPrefix} candidate has no parts`, { attempt, maxAttempts });
      continue;
    }

    for (const part of parts) {
      if (part.inlineData?.data) {
        console.info(`${logPrefix} image part returned`, {
          attempt,
          mimeType: part.inlineData.mimeType ?? "unknown",
          base64Length: part.inlineData.data.length,
        });
        return Buffer.from(part.inlineData.data, "base64");
      }
    }

    const textPreview = parts
      .map((part) => part.text || "")
      .join(" ")
      .trim()
      .slice(0, 400);
    console.warn(`${logPrefix} no image part in candidate`, {
      attempt,
      maxAttempts,
      finishReason: firstCandidate.finishReason ?? null,
      textPreview: textPreview || null,
    });
  }

  return null;
}
