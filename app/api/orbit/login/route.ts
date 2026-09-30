import { NextResponse } from "next/server";
import { refreshSecretsFromDisk } from "@/lib/load-runtime-env";
import {
  clearSessionCookieHeader,
  createSessionToken,
  isOrbitConfigured,
  sessionCookieHeader,
  verifyPasskey,
} from "@/lib/orbit-auth";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  refreshSecretsFromDisk();
  if (!isOrbitConfigured()) {
    return NextResponse.json(
      { error: "Orbit is not configured. Set ORBIT_PASSKEY and ORBIT_SESSION_SECRET." },
      { status: 503 },
    );
  }

  let passkey = "";
  try {
    const body = (await req.json()) as { passkey?: string };
    passkey = typeof body.passkey === "string" ? body.passkey : "";
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!verifyPasskey(passkey)) {
    return NextResponse.json({ error: "Invalid passkey" }, { status: 401 });
  }

  const token = createSessionToken();
  const res = NextResponse.json({ ok: true });
  res.headers.set("Set-Cookie", sessionCookieHeader(token));
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.headers.set("Set-Cookie", clearSessionCookieHeader());
  return res;
}
