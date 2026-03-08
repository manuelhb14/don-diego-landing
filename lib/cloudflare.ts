import { getCloudflareContext } from "@opennextjs/cloudflare";

/**
 * Get Cloudflare bindings (D1, R2, etc.) in server code.
 * Use getEnv({ async: true }) in SSG/async contexts; use getEnv() in request handlers.
 */
export function getEnv(): CloudflareEnv;
export function getEnv(options: { async: true }): Promise<CloudflareEnv>;
export function getEnv(
  options?: { async?: boolean }
): CloudflareEnv | Promise<CloudflareEnv> {
  if (options?.async) {
    return getCloudflareContext({ async: true }).then(
      (ctx) => ctx.env as CloudflareEnv
    );
  }
  return getCloudflareContext().env as CloudflareEnv;
}
