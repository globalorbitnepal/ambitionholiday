import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { contentDataDir } from "@/lib/cms-paths";

export const dynamic = "force-dynamic";

type Inquiry = {
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

function clean(value: unknown, max = 400) {
  return String(value ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 160);
  const phone = clean(body.phone, 40);
  const country = clean(body.country, 80);
  const dates = clean(body.dates, 80);
  const travelers = clean(body.travelers, 20);
  const interest = clean(body.interest, 80);
  const message = clean(body.message || body.question, 2500);
  const source = clean(body.source, 40) || "contact";

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Please fill name, email and message." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  const inquiry: Inquiry = {
    id: `inq_${Date.now()}`,
    createdAt: new Date().toISOString(),
    source,
    name,
    email,
    phone,
    country,
    dates,
    travelers,
    interest,
    message,
  };

  try {
    const file = inquiriesPath();
    await fs.mkdir(path.dirname(file), { recursive: true });
    let list: Inquiry[] = [];
    try {
      const raw = await fs.readFile(file, "utf8");
      const parsed = JSON.parse(raw) as Inquiry[];
      if (Array.isArray(parsed)) list = parsed;
    } catch {
      list = [];
    }
    list.unshift(inquiry);
    await fs.writeFile(file, JSON.stringify(list.slice(0, 500), null, 2), "utf8");
  } catch (err) {
    console.error("contact inquiry write failed", err);
    return NextResponse.json(
      { error: "Could not save enquiry. Please WhatsApp or email us." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
