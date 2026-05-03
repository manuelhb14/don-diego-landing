import { generateObject, type LanguageModel } from "ai";
import { z } from "zod";
import { getLeadProfileRow, saveLeadProfile } from "@/lib/chat-db";

const extractionSchema = z.object({
  displayName: z
    .string()
    .nullable()
    .describe("Name the user clearly provided, or null"),
  phone: z
    .string()
    .nullable()
    .describe("Phone number if clearly stated, or null"),
  preferences: z
    .string()
    .nullable()
    .describe("Brief preferences: property type, budget hints, lifestyle, or null"),
  displayNameConfidence: z.number().min(0).max(1),
  phoneConfidence: z.number().min(0).max(1),
  preferencesConfidence: z.number().min(0).max(1),
});

export type ChatLeadExtraction = z.infer<typeof extractionSchema>;

type StoredConfidence = {
  displayName?: number;
  phone?: number;
  preferences?: number;
};

function parseConfidence(raw: string | null): StoredConfidence {
  if (!raw?.trim()) return {};
  try {
    return JSON.parse(raw) as StoredConfidence;
  } catch {
    return {};
  }
}

function mergeScalar(
  previous: string | null,
  previousConfidence: number,
  extracted: string | null,
  extractedConfidence: number,
): string | null {
  const next = extracted?.trim() || null;
  const prev = previous?.trim() || null;
  if (!next) return prev;
  if (!prev) return next;
  if (extractedConfidence > previousConfidence) return next;
  return prev;
}

export async function mergeAndPersistLeadProfile(params: {
  sessionId: string;
  model: LanguageModel;
  transcript: string;
  visitorMergedHint: boolean;
}): Promise<void> {
  const existing = await getLeadProfileRow(params.sessionId);
  const prevConf = parseConfidence(existing?.confidence_json ?? null);

  let extracted: ChatLeadExtraction;
  try {
    const result = await generateObject({
      model: params.model,
      schema: extractionSchema,
      temperature: 0.1,
      maxOutputTokens: 400,
      system:
        "You extract structured lead fields from a website chat. Only fill a field when the user clearly provided it. Use conservative confidence scores. Output JSON matching the schema.",
      prompt: `Conversation excerpt (most recent lines):\n${params.transcript.slice(0, 6000)}`,
    });
    extracted = result.object;
  } catch (err) {
    console.error("chat lead extraction failed", err);
    return;
  }

  const displayName = mergeScalar(
    existing?.display_name ?? null,
    prevConf.displayName ?? 0,
    extracted.displayName,
    extracted.displayNameConfidence,
  );
  const phone = mergeScalar(
    existing?.phone ?? null,
    prevConf.phone ?? 0,
    extracted.phone,
    extracted.phoneConfidence,
  );
  const preferences = mergeScalar(
    existing?.preferences_json ?? null,
    prevConf.preferences ?? 0,
    extracted.preferences,
    extracted.preferencesConfidence,
  );

  const confidenceJson = JSON.stringify({
    displayName: Math.max(
      prevConf.displayName ?? 0,
      extracted.displayName ? extracted.displayNameConfidence : 0,
    ),
    phone: Math.max(
      prevConf.phone ?? 0,
      extracted.phone ? extracted.phoneConfidence : 0,
    ),
    preferences: Math.max(
      prevConf.preferences ?? 0,
      extracted.preferences ? extracted.preferencesConfidence : 0,
    ),
  });

  if (!displayName && !phone && !preferences) return;

  await saveLeadProfile({
    sessionId: params.sessionId,
    displayName,
    phone,
    preferences,
    confidenceJson,
    mergedFromVisitor:
      Boolean(existing?.merged_from_visitor) || params.visitorMergedHint,
  });
}
