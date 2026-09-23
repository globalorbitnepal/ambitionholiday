import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { readContent, scrubUploadRefs, writeContent } from "@/lib/content";
import { uploadDirs, safeUploadName } from "@/lib/uploads";
import { listSiteMedia, listUploadMedia, collectLinkedMedia } from "@/lib/media-library";
import { isStaffRequest } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

function isAuthed(req: Request) {
  return isStaffRequest(req);
}

export async function DELETE(req: Request) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let publicPath = "";
  try {
    const body = (await req.json()) as { path?: string };
    publicPath = typeof body.path === "string" ? body.path : "";
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!publicPath.startsWith("/uploads/")) {
    return NextResponse.json({ error: "Only uploads can be deleted" }, { status: 400 });
  }

  const filename = safeUploadName(path.basename(publicPath));
  if (!filename) {
    return NextResponse.json({ error: "Invalid file" }, { status: 400 });
  }
  for (const dir of uploadDirs()) {
    try {
      await fs.unlink(path.join(dir, filename));
    } catch {
      // file may already be gone
    }
  }

  const content = await readContent();
  const cleaned = scrubUploadRefs(content, publicPath);
  cleaned.hero.stats = cleaned.hero.stats.map((stat) =>
    stat.iconSrc === publicPath ? { ...stat, iconSrc: undefined } : stat,
  );
  if (cleaned.header.logoSrc === publicPath) {
    cleaned.header.logoSrc = "/images/ambition-holiday-logo.webp";
  }

  const saved = await writeContent(cleaned);
  revalidatePath("/");
  return NextResponse.json(saved);
}

export async function GET(req: Request) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let uploads: Awaited<ReturnType<typeof listUploadMedia>> = [];
  let site: Awaited<ReturnType<typeof listSiteMedia>> = [];
  let remote: Awaited<ReturnType<typeof collectLinkedMedia>> = [];
  try {
    uploads = await listUploadMedia();
  } catch (err) {
    console.error("listUploadMedia", err);
  }
  try {
    site = await listSiteMedia();
  } catch (err) {
    console.error("listSiteMedia", err);
  }
  try {
    const content = await readContent();
    remote = collectLinkedMedia(content, content.updatedAt);
  } catch (err) {
    console.error("collectLinkedMedia", err);
  }

  const items = [...uploads, ...site, ...remote].filter(
    (item, index, all) => all.findIndex((other) => other.path === item.path) === index,
  );

  return NextResponse.json({
    files: uploads.map((item) => item.path),
    items,
  });
}
