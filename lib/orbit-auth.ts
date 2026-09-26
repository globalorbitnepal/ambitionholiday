import { createHmac, timingSafeEqual, randomBytes } from "crypto";
import { hydrateRuntimeEnv } from "@/lib/load-runtime-env";

const COOKIE_NAME = "orbit_session";
const MAX_AGE_SEC = 60 * 60 * 12; // 12 hours

function getPasskey() {
  hydrateRuntimeEnv();
  return (process.env.ORBIT_PASSKEY ?? "").trim();
}

function getSecret() {
  hydrateRuntimeEnv();
  return (process.env.ORBIT_SESSION_SECRET ?? "").trim();
}

export function isOrbitConfigured() {
  return Boolean(getPasskey() && getSecret());
}

export function verifyPasskey(input: string) {
  const expected = getPasskey();
  const given = (input || "").trim();
  if (!expected || !given) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  try {
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

function sign(payload: string) {
  return createHmac("sha256", getSecret()).update(payload).digest("hex");
}

export function createSessionToken() {
  const exp = Math.floor(Date.now() / 1000) + MAX_AGE_SEC;
  const nonce = randomBytes(16).toString("hex");
  const payload = `orbit.${exp}.${nonce}`;
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string | undefined | null) {
  if (!token || !getSecret()) return false;
  const parts = token.split(".");
  if (parts.length !== 4) return false;
  const [scope, expStr, nonce, sig] = parts;
  if (scope !== "orbit" || !expStr || !nonce || !sig) return false;
  const payload = `${scope}.${expStr}.${nonce}`;
  const expected = sign(payload);
  try {
    const ok = timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
    if (!ok) return false;
  } catch {
    return false;
  }
  const exp = Number(expStr);
  if (!Number.isFinite(exp) || exp * 1000 < Date.now()) return false;
  return true;
}

export function sessionCookieHeader(token: string) {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${MAX_AGE_SEC}${secure}`;
}

export function clearSessionCookieHeader() {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secure}`;
}

export function getSessionCookieName() {
  return COOKIE_NAME;
}

export function readSessionFromCookieHeader(cookieHeader: string | null) {
  if (!cookieHeader) return null;
  const match = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${COOKIE_NAME}=`));
  if (!match) return null;
  return match.slice(COOKIE_NAME.length + 1);
}
