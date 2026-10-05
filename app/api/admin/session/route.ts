import { NextRequest, NextResponse } from "next/server";
import {
  clearAdminSessionCookie,
  isAdminRequest,
  isValidAdminPassword,
  setAdminSessionCookie,
} from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

function noStore(res: NextResponse) {
  res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0");
  return res;
}

// GET → is the current browser signed in?
export async function GET(req: NextRequest) {
  return noStore(NextResponse.json({ authed: isAdminRequest(req) }));
}

// POST { password } → sign in (sets an httpOnly session cookie)
export async function POST(req: NextRequest) {
  let password: unknown;
  try {
    ({ password } = await req.json());
  } catch {
    return noStore(NextResponse.json({ error: "Invalid JSON" }, { status: 400 }));
  }

  if (!isValidAdminPassword(password)) {
    // Slow down brute-force attempts
    await new Promise((resolve) => setTimeout(resolve, 750));
    return noStore(NextResponse.json({ error: "Incorrect password." }, { status: 401 }));
  }

  const res = NextResponse.json({ authed: true });
  setAdminSessionCookie(res);
  return noStore(res);
}

// DELETE → sign out
export async function DELETE() {
  const res = NextResponse.json({ authed: false });
  clearAdminSessionCookie(res);
  return noStore(res);
}
