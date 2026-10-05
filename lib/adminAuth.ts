import { createHmac, timingSafeEqual } from "crypto";
import type { NextRequest, NextResponse } from "next/server";

// Server-only admin authentication. The admin password (ADMIN_SECRET) never
// leaves the server: the browser exchanges it once for a signed, httpOnly
// session cookie. There is deliberately no fallback secret — if ADMIN_SECRET
// is not configured, every admin request is rejected.

export const ADMIN_SESSION_COOKIE = "mw_admin_session";
const SESSION_TTL_SECONDS = 12 * 60 * 60;

function getAdminSecret(): string {
  return (process.env.ADMIN_SECRET ?? "").trim();
}

function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

function sign(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(`mw-admin-session:${payload}`).digest("base64url");
}

export function isValidAdminPassword(password: unknown): boolean {
  const secret = getAdminSecret();
  return Boolean(secret) && typeof password === "string" && safeEqual(password, secret);
}

function isValidSessionToken(token: string | undefined): boolean {
  const secret = getAdminSecret();
  if (!secret || !token) return false;
  const [expiresAt, signature] = token.split(".");
  if (!expiresAt || !signature) return false;
  if (!/^\d+$/.test(expiresAt) || Number(expiresAt) * 1000 < Date.now()) return false;
  return safeEqual(signature, sign(expiresAt, secret));
}

// Accepts the browser session cookie, or the raw secret in `x-admin-secret`
// for server-side scripts (never send that header from browser code).
export function isAdminRequest(req: NextRequest): boolean {
  if (isValidSessionToken(req.cookies.get(ADMIN_SESSION_COOKIE)?.value)) return true;
  const headerSecret = req.headers.get("x-admin-secret");
  return headerSecret !== null && isValidAdminPassword(headerSecret);
}

export function setAdminSessionCookie(res: NextResponse): void {
  const expiresAt = String(Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS);
  res.cookies.set(ADMIN_SESSION_COOKIE, `${expiresAt}.${sign(expiresAt, getAdminSecret())}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
}

export function clearAdminSessionCookie(res: NextResponse): void {
  res.cookies.set(ADMIN_SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
}
