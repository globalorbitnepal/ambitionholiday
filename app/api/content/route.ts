import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { readContent, writeContent } from "@/lib/content";
import type { SiteContent } from "@/lib/content-types";
import { isStaffRequest } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function isAuthed(req: Request) {
  return isStaffRequest(req);
}

export async function GET() {
  const content = await readContent();
  return NextResponse.json(content, {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
    },
  });
}

export async function POST(req: Request) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: SiteContent;
  try {
    body = (await req.json()) as SiteContent;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  let saved;
  try {
    saved = await writeContent(body);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Save failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
  revalidatePath("/");
  revalidatePath("/journal", "layout");
  revalidatePath("/about-us");
  revalidatePath("/company");
  revalidatePath("/visa-and-entry");
  revalidatePath("/best-time-to-visit");
  revalidatePath("/packing-guide");
  revalidatePath("/altitude-tips");
  revalidatePath("/permits-and-fees");
  revalidatePath("/nepal");
  revalidatePath("/bhutan");
  revalidatePath("/tibet");
  revalidatePath("/himalayan-multi-countries-tour");
  revalidatePath("/helicopter-tours");
  revalidatePath("/photography-treks");
  revalidatePath("/orbit", "layout");
  revalidatePath("/admin", "layout");
  revalidatePath("/trip", "layout");
  revalidatePath("/everest-base-camp-trek");
  revalidatePath("/everest-base-camp-luxury-trek");
  revalidatePath("/saved");
  return NextResponse.json(saved, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
