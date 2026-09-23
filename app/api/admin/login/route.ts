import { NextResponse } from "next/server";
import {
  adminSessionCookieHeader,
  createAdminSessionToken,
  isAdminConfigured,
  verifyAdminCredentials,
} from "@/lib/admin-auth";
import {
  adminLoginBlocked,
  clearAdminLoginFailures,
  recordAdminLoginFailure,
} from "@/lib/admin-rate-limit";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function clientIp(req: Request) {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]?.trim() || "unknown";
  return req.headers.get("x-real-ip") || "unknown";
}

export async function POST(req: Request) {
  if (!isAdminConfigured()) {
    return NextResponse.json({ error: "Admin is not configured." }, { status: 503 });
  }

  const ip = clientIp(req);
  if (adminLoginBlocked(ip)) {
    return NextResponse.json(
      { error: "Too many attempts. Try again in 15 minutes." },
      { status: 429 },
    );
  }

  let body: { username?: string; password?: string };
  try {
    body = (await req.json()) as { username?: string; password?: string };
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const username = typeof body.username === "string" ? body.username.trim() : "";
  const password = typeof body.password === "string" ? body.password : "";

  const ok = await verifyAdminCredentials(username, password);
  if (!ok) {
    recordAdminLoginFailure(ip);
    return NextResponse.json({ error: "Invalid username or password." }, { status: 401 });
  }

  clearAdminLoginFailures(ip);
  const token = createAdminSessionToken(username);
  const res = NextResponse.json({ ok: true });
  res.headers.set("Set-Cookie", adminSessionCookieHeader(token));
  return res;
}
