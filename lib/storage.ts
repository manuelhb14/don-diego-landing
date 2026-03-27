import { getEnv } from "@/lib/cloudflare";

/**
 * Get the R2 bucket binding for image storage.
 * Works in both local (Miniflare emulation) and production.
 */
function getBucket() {
  return getEnv().IMAGES;
}

export type PutOptions = {
  contentType?: string;
  customMetadata?: Record<string, string>;
};

/**
 * Upload a file to R2 (images bucket).
 * @param key - Object key (e.g. "uploads/abc123.jpg")
 * @param body - ReadableStream, ArrayBuffer, or string
 */
export async function putImage(
  key: string,
  body: ReadableStream | ArrayBuffer | ArrayBufferView | string,
  options?: PutOptions
) {
  const bucket = getBucket();
  return bucket.put(key, body, {
    httpMetadata: options?.contentType
      ? { contentType: options.contentType }
      : undefined,
    customMetadata: options?.customMetadata,
  });
}

/**
 * Get an object from R2. Returns null if not found.
 */
export async function getImage(key: string) {
  const bucket = getBucket();
  return bucket.get(key);
}

/**
 * Delete an object from R2.
 */
export async function deleteImage(key: string) {
  const bucket = getBucket();
  return bucket.delete(key);
}

/**
 * List objects in the bucket (e.g. under a prefix).
 */
export async function listImages(options?: { prefix?: string; limit?: number }) {
  const bucket = getBucket();
  return bucket.list({
    prefix: options?.prefix,
    limit: options?.limit ?? 1000,
  });
}
