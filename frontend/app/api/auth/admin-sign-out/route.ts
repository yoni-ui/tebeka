import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const jar = await cookies();
  jar.delete("tebeka_admin");
  return NextResponse.json({ ok: true });
}
