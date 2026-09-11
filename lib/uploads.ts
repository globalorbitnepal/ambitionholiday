import { promises as fs } from "fs";
import path from "path";
import { uploadDirs } from "@/lib/cms-paths";

export { uploadDirs };

/** @deprecated Prefer uploadDirs() */
export const UPLOAD_DIRS = uploadDirs();

export function safeUploadName(input: string) {
  const base = path.basename(input);
  if (!/^[A-Za-z0-9._-]+$/.test(base)) return null;
  return base;
}

export function contentTypeFor(name: string) {
  const ext = path.extname(name).toLowerCase();
  if (ext === ".png") return "image/png";
  if (ext === ".webp") return "image/webp";
  if (ext === ".gif") return "image/gif";
  if (ext === ".mp4") return "video/mp4";
  if (ext === ".webm") return "video/webm";
  if (ext === ".mov") return "video/quicktime";
  return "image/jpeg";
}

export async function writeUpload(name: string, buffer: Buffer) {
  let wrote = false;
  let lastError: unknown;
  for (const dir of uploadDirs()) {
    try {
      await fs.mkdir(dir, { recursive: true });
      await fs.writeFile(path.join(dir, name), buffer);
      wrote = true;
    } catch (err) {
      lastError = err;
    }
  }
  if (!wrote) {
    throw lastError instanceof Error ? lastError : new Error("Upload write failed");
  }
}

export async function readUpload(name: string) {
  const safe = safeUploadName(name);
  if (!safe) return null;
  for (const dir of uploadDirs()) {
    const abs = path.join(dir, safe);
    if (!abs.startsWith(dir)) continue;
    try {
      return await fs.readFile(abs);
    } catch {
      // try next location
    }
  }
  return null;
}
