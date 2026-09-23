import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { isStaffRequest } from "@/lib/admin-auth";
import { contentTypeFor, readUpload, safeUploadName } from "@/lib/uploads";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function isAuthed(req: Request) {
  return isStaffRequest(req);
}

function safePublicPath(input: string) {
  const raw = decodeURIComponent(input).split("?")[0];
  if (!raw.startsWith("/images/") && !raw.startsWith("/uploads/") && !raw.startsWith("/videos/")) {
    return null;
  }
  if (raw.includes("..") || raw.includes("\\")) return null;
  return raw;
}

export async function GET(req: Request) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const requested = safePublicPath(url.searchParams.get("path") || "");
  if (!requested) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 });
  }

  let data: Buffer | null = null;
  if (requested.startsWith("/uploads/")) {
    const name = safeUploadName(path.basename(requested));
    data = name ? await readUpload(name) : null;
  } else {
    const abs = path.join(process.cwd(), "public", requested.replace(/^\//, ""));
    const publicRoot = path.join(process.cwd(), "public");
    if (!abs.startsWith(publicRoot)) {
      return NextResponse.json({ error: "Invalid path" }, { status: 400 });
    }
    try {
      data = await fs.readFile(abs);
    } catch {
      data = null;
    }
  }

  if (!data) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return new NextResponse(new Uint8Array(data), {
    headers: {
      "Content-Type": contentTypeFor(path.basename(requested)),
      "Cache-Control": "private, max-age=3600",
    },
  });
}
