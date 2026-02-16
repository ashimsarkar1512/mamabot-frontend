import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { password } = await req.json();

  if (password !== process.env.SITE_ACCESS_PASSWORD) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const res = NextResponse.json({ success: true });

  // ✅ SESSION COOKIE (browser close = auto clear)
  res.cookies.set("site_access", "true", {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
    // ❌ no maxAge / expires
  });

  return res;
}
