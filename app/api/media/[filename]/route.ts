import { NextResponse } from "next/server";
import { contentTypeFor, readUpload, safeUploadName } from "@/lib/uploads";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type Props = {
  params: Promise<{ filename: string }>;
};

export async function GET(req: Request, { params }: Props) {
  const { filename } = await params;
  const safe = safeUploadName(filename);
  if (!safe) {
    return NextResponse.json({ error: "Invalid file" }, { status: 400 });
  }

  const data = await readUpload(safe);
  if (!data) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body = new Uint8Array(data);
  const type = contentTypeFor(safe);
  const size = body.byteLength;
  const range = req.headers.get("range");

  if (range) {
    const match = /bytes=(\d*)-(\d*)/.exec(range);
    const start = match?.[1] ? Number(match[1]) : 0;
    const end = match?.[2] ? Number(match[2]) : size - 1;
    if (start >= size || end >= size || start > end) {
      return new NextResponse(null, {
        status: 416,
        headers: { "Content-Range": `bytes */${size}` },
      });
    }
    const chunk = body.subarray(start, end + 1);
    return new NextResponse(chunk, {
      status: 206,
      headers: {
        "Content-Type": type,
        "Accept-Ranges": "bytes",
        "Content-Range": `bytes ${start}-${end}/${size}`,
        "Content-Length": String(chunk.byteLength),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }

  return new NextResponse(body, {
    headers: {
      "Content-Type": type,
      "Accept-Ranges": "bytes",
      "Content-Length": String(size),
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
