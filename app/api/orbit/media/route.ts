import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { readContent, scrubUploadRefs, writeContent } from "@/lib/content";
import { uploadDirs, safeUploadName } from "@/lib/uploads";
import { listSiteMedia, listUploadMedia, collectLinkedMedia } from "@/lib/media-library";
import {
  readSessionFromCookieHeader,
  verifySessionToken,
} from "@/lib/orbit-auth";

export const dynamic = "force-dynamic";

function isAuthed(req: Request) {
  return verifySessionToken(readSessionFromCookieHeader(req.headers.get("cookie")));
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
    cleaned.header.logoSrc = "/images/ambition-holiday-logo.png";
  }

  const saved = await writeContent(cleaned);
  revalidatePath("/");
  return NextResponse.json(saved);
}

export async function GET(req: Request) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const uploads = await listUploadMedia();
  const site = await listSiteMedia();
  const content = await readContent();
  const remote = collectLinkedMedia(content, content.updatedAt);

  return NextResponse.json({
    files: uploads.map((item) => item.path),
    items: [...uploads, ...remote, ...site],
  });
}
