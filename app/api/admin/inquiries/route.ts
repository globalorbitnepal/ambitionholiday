import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { isStaffRequest } from "@/lib/admin-auth";
import { contentDataDir } from "@/lib/cms-paths";

export const dynamic = "force-dynamic";

export type StoredInquiry = {
  id: string;
  createdAt: string;
  source: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  dates: string;
  travelers: string;
  interest: string;
  message: string;
};

function inquiriesPath() {
  return path.join(contentDataDir(), "contact-inquiries.json");
}

export async function GET(req: Request) {
  if (!isStaffRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const raw = await fs.readFile(inquiriesPath(), "utf8");
    const parsed = JSON.parse(raw) as StoredInquiry[];
    const items = Array.isArray(parsed) ? parsed : [];
    return NextResponse.json({ items });
  } catch {
    return NextResponse.json({ items: [] });
  }
}
