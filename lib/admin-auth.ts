import { createHmac, timingSafeEqual, randomBytes } from "crypto";
import { verifyPassword } from "@/lib/password";
import {
  readSessionFromCookieHeader,
  verifySessionToken,
} from "@/lib/orbit-auth";

const COOKIE_NAME = "admin_session";
const MAX_AGE_SEC = 60 * 60 * 8;

function getUsername() {
  return (process.env.ADMIN_USERNAME ?? "").trim();
}

function getPasswordHash() {
  const b64 = process.env.ADMIN_PASSWORD_HASH_B64 ?? "";
  if (b64) {
    try {
      return Buffer.from(b64, "base64").toString("utf8");
    } catch {
      return "";
    }
  }
  return (process.env.ADMIN_PASSWORD_HASH ?? "").replace(/\\\$/g, "$");
}

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.ORBIT_SESSION_SECRET || "";
}

export function isAdminConfigured() {
  return Boolean(getUsername() && getPasswordHash() && getSecret());
}

export async function verifyAdminCredentials(username: string, password: string) {
  const expectedUser = getUsername();
  const hash = getPasswordHash();
  if (!expectedUser || !hash || !username || !password) return false;
  const userBuf = Buffer.from(username.normalize("NFKC"));
  const expectedBuf = Buffer.from(expectedUser.normalize("NFKC"));
  if (userBuf.length !== expectedBuf.length) {
    await verifyPassword(password, hash);
    return false;
  }
  let userOk = false;
  try {
    userOk = timingSafeEqual(userBuf, expectedBuf);
  } catch {
    userOk = false;
  }
  const passOk = await verifyPassword(password, hash);
  return userOk && passOk;
}

function sign(payload: string) {
  return createHmac("sha256", getSecret()).update(payload).digest("hex");
}

export function createAdminSessionToken(username: string) {
  const exp = Math.floor(Date.now() / 1000) + MAX_AGE_SEC;
  const nonce = randomBytes(16).toString("hex");
  const safeUser = username.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 32) || "admin";
  const payload = `admin.${safeUser}.${exp}.${nonce}`;
  return `${payload}.${sign(payload)}`;
}

export function verifyAdminSessionToken(token: string | undefined | null) {
  if (!token || !getSecret()) return false;
  const parts = token.split(".");
  if (parts.length !== 5) return false;
  const [scope, user, expStr, nonce, sig] = parts;
  if (scope !== "admin" || !user || !expStr || !nonce || !sig) return false;
  const payload = `${scope}.${user}.${expStr}.${nonce}`;
  const expected = sign(payload);
  try {
    if (!timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return false;
  } catch {
    return false;
  }
  const exp = Number(expStr);
  if (!Number.isFinite(exp) || exp * 1000 < Date.now()) return false;
  return true;
}

export function adminSessionCookieHeader(token: string) {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${MAX_AGE_SEC}${secure}`;
}

export function clearAdminSessionCookieHeader() {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0${secure}`;
}

export function getAdminSessionCookieName() {
  return COOKIE_NAME;
}

export function readAdminSessionFromCookieHeader(cookieHeader: string | null) {
  if (!cookieHeader) return null;
  const match = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${COOKIE_NAME}=`));
  if (!match) return null;
  return match.slice(COOKIE_NAME.length + 1);
}

export function isStaffRequest(req: Request) {
  const cookie = req.headers.get("cookie");
  if (verifyAdminSessionToken(readAdminSessionFromCookieHeader(cookie))) return true;
  return verifySessionToken(readSessionFromCookieHeader(cookie));
}
