import { promises as fs } from "fs";
import path from "path";
import { uploadDirs, safeUploadName } from "@/lib/uploads";

export type MediaKind = "image" | "video" | "other";

export type MediaItem = {
  path: string;
  name: string;
  kind: MediaKind;
  bytes: number;
  updatedAt: string;
  collection: "uploads" | "site";
};

export function kindFromName(name: string): MediaKind {
  const ext = path.extname(name).toLowerCase();
  if ([".mp4", ".webm", ".mov"].includes(ext)) return "video";
  if ([".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg", ".avif"].includes(ext)) {
    return "image";
  }
  return "other";
}

async function statItem(
  abs: string,
  publicPath: string,
  collection: MediaItem["collection"],
): Promise<MediaItem | null> {
  try {
    const st = await fs.stat(abs);
    if (!st.isFile()) return null;
    const name = path.basename(abs);
    return {
      path: publicPath,
      name,
      kind: kindFromName(name),
      bytes: st.size,
      updatedAt: st.mtime.toISOString(),
      collection,
    };
  } catch {
    return null;
  }
}

async function walkPublic(
  absRoot: string,
  urlPrefix: string,
): Promise<MediaItem[]> {
  const out: MediaItem[] = [];
  async function walk(dir: string, prefix: string) {
    let entries: Awaited<ReturnType<typeof fs.readdir>>;
    try {
      entries = await fs.readdir(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      if (entry.name.startsWith(".")) continue;
      const abs = path.join(dir, entry.name);
      const url = `${prefix}/${entry.name}`;
      if (entry.isDirectory()) {
        await walk(abs, url);
        continue;
      }
      const item = await statItem(abs, url, "site");
      if (item && item.kind !== "other") out.push(item);
    }
  }
  await walk(absRoot, urlPrefix);
  return out;
}

/** Copy every upload into every durable folder so deploys never drop a file. */
export async function healUploadCopies() {
  const dirs = uploadDirs();
  const sourceByName = new Map<string, string>();

  for (const dir of dirs) {
    await fs.mkdir(dir, { recursive: true });
    let files: string[] = [];
    try {
      files = await fs.readdir(dir);
    } catch {
      continue;
    }
    for (const file of files) {
      if (file.startsWith(".") || !safeUploadName(file)) continue;
      if (!sourceByName.has(file)) {
        sourceByName.set(file, path.join(dir, file));
      }
    }
  }

  for (const [file, src] of sourceByName) {
    let buf: Buffer | null = null;
    for (const dir of dirs) {
      const dest = path.join(dir, file);
      try {
        await fs.access(dest);
      } catch {
        if (!buf) buf = await fs.readFile(src);
        await fs.writeFile(dest, buf);
      }
    }
  }
}

export async function listUploadMedia(): Promise<MediaItem[]> {
  await healUploadCopies();
  const seen = new Map<string, MediaItem>();
  for (const dir of uploadDirs()) {
    let files: string[] = [];
    try {
      files = await fs.readdir(dir);
    } catch {
      continue;
    }
    for (const file of files) {
      if (file.startsWith(".") || !safeUploadName(file)) continue;
      if (seen.has(file)) continue;
      const item = await statItem(path.join(dir, file), `/uploads/${file}`, "uploads");
      if (item) seen.set(file, item);
    }
  }
  return [...seen.values()].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function listSiteMedia(): Promise<MediaItem[]> {
  const images = await walkPublic(path.join(process.cwd(), "public", "images"), "/images");
  const videos = await walkPublic(path.join(process.cwd(), "public", "videos"), "/videos");
  return [...images, ...videos].sort((a, b) => a.path.localeCompare(b.path));
}
