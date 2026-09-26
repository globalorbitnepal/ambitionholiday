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
  let catalog: Record<string, { displayName?: string; altText?: string }> = {};
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
    catalog = content.mediaCatalog ?? {};
    remote = collectLinkedMedia(content, content.updatedAt);
  } catch (err) {
    console.error("collectLinkedMedia", err);
  }

  const items = [...uploads, ...site, ...remote].filter(
    (item, index, all) => all.findIndex((other) => other.path === item.path) === index,
  );

  const enriched = items.map((item) => {
    const meta = catalog[item.path];
    return {
      ...item,
      displayName: meta?.displayName?.trim() || undefined,
      altText: meta?.altText?.trim() || undefined,
      label: meta?.displayName?.trim() || item.name,
    };
  });

  return NextResponse.json({
    files: uploads.map((item) => item.path),
    items: enriched,
  });
}

export async function PATCH(req: Request) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { path?: string; displayName?: string; altText?: string };
  try {
    body = (await req.json()) as { path?: string; displayName?: string; altText?: string };
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const mediaPath = typeof body.path === "string" ? body.path.trim() : "";
  if (!mediaPath.startsWith("/")) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 });
  }

  const content = await readContent();
  const mediaCatalog = { ...(content.mediaCatalog ?? {}) };
  mediaCatalog[mediaPath] = {
    displayName: typeof body.displayName === "string" ? body.displayName.trim() : "",
    altText: typeof body.altText === "string" ? body.altText.trim() : "",
  };

  const saved = await writeContent({ ...content, mediaCatalog });
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/orbit");
  return NextResponse.json({ ok: true, mediaCatalog: saved.mediaCatalog });
}
