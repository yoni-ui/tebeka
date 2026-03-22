import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { secret?: string };
  const expected = process.env.ADMIN_PANEL_SECRET ?? "change-me-admin";
  if (!body.secret || body.secret !== expected) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
  const jar = await cookies();
  jar.set("tebeka_admin", "1", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 2,
  });
  return NextResponse.json({ ok: true });
}
