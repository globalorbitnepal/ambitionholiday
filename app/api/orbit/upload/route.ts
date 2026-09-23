import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import path from "path";
import { isStaffRequest } from "@/lib/admin-auth";
import { writeUpload } from "@/lib/uploads";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 60;

function isAuthed(req: Request) {
  return isStaffRequest(req);
}

/** Center-cover crop to exact 9:16 portrait so frames never show empty bars. */
async function loadSharp() {
  const { default: sharp } = await import("sharp");
  return sharp;
}

async function toNineSixteen(buffer: Buffer): Promise<Buffer> {
  const sharp = await loadSharp();
  const image = sharp(buffer, { failOn: "none" }).rotate();
  const meta = await image.metadata();
  const width = meta.width ?? 1080;
  const height = meta.height ?? 1920;
  const targetRatio = 9 / 16;
  const currentRatio = width / height;

  let extractW = width;
  let extractH = height;
  let left = 0;
  let top = 0;

  if (currentRatio > targetRatio) {
    extractW = Math.round(height * targetRatio);
    left = Math.max(0, Math.round((width - extractW) / 2));
  } else if (currentRatio < targetRatio) {
    extractH = Math.round(width / targetRatio);
    top = Math.max(0, Math.round((height - extractH) / 2));
  }

  return sharp(buffer, { failOn: "none" })
    .rotate()
    .extract({
      left,
      top,
      width: Math.min(extractW, width),
      height: Math.min(extractH, height),
    })
    .resize(1080, 1920, { fit: "fill" })
    .webp({ quality: 74, effort: 4 })
    .toBuffer();
}

/** Landscape-friendly webp so Orbit previews and destination covers stay sharp and light. */
async function toWebPhoto(buffer: Buffer): Promise<Buffer> {
  const sharp = await loadSharp();
  return sharp(buffer, { failOn: "none" })
    .rotate()
    .resize(1920, 1920, { fit: "inside", withoutEnlargement: true })
    .webp({ quality: 74, effort: 4 })
    .toBuffer();
}

export async function POST(req: Request) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await req.formData();
  const file = form.get("file");
  const crop = String(form.get("crop") || "");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file" }, { status: 400 });
  }

  const type = file.type || "";
  const stamp = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const isVideo =
    type.startsWith("video/") || /\.(mp4|webm|mov)$/i.test(file.name || "");

  if (isVideo) {
    if (file.size > 40 * 1024 * 1024) {
      return NextResponse.json({ error: "Video max 40MB" }, { status: 400 });
    }
    const ext = path.extname(file.name || "").toLowerCase();
    const safeExt = [".mp4", ".webm", ".mov"].includes(ext) ? ext : ".mp4";
    const name = `upload-${stamp}${safeExt}`;
    const raw = Buffer.from(await file.arrayBuffer());
    await writeUpload(name, raw);
    revalidatePath("/");
    return NextResponse.json({ url: `/uploads/${name}` });
  }

  if (type && !type.startsWith("image/") && type !== "application/octet-stream") {
    return NextResponse.json({ error: "Images or MP4 video only" }, { status: 400 });
  }

  if (file.size > 40 * 1024 * 1024) {
    return NextResponse.json({ error: "Max 40MB" }, { status: 400 });
  }

  const raw = Buffer.from(await file.arrayBuffer());
  const name = `upload-${stamp}.webp`;

  try {
    const out = crop === "9x16" ? await toNineSixteen(raw) : await toWebPhoto(raw);
    await writeUpload(crop === "9x16" ? `upload-${stamp}-9x16.webp` : name, out);
    const saved = crop === "9x16" ? `upload-${stamp}-9x16.webp` : name;
    revalidatePath("/");
    return NextResponse.json({ url: `/uploads/${saved}` });
  } catch {
    const ext = path.extname(file.name || "").toLowerCase();
    const safeExt = [".jpg", ".jpeg", ".png", ".webp", ".gif"].includes(ext) ? ext : ".jpg";
    const fallback = `upload-${stamp}${safeExt === ".jpeg" ? ".jpg" : safeExt}`;
    await writeUpload(fallback, raw);
    revalidatePath("/");
    return NextResponse.json({ url: `/uploads/${fallback}` });
  }
}
