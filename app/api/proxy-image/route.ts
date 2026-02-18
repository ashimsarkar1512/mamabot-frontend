import { NextRequest, NextResponse } from "next/server";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url || typeof url !== "string") {
    return NextResponse.json({ error: "Missing url" }, { status: 400 });
  }

  // Only allow proxying to our API origin (security)
  const allowedOrigin = API_BASE.replace(/\/$/, "");
  if (!url.startsWith(allowedOrigin)) {
    return NextResponse.json({ error: "Invalid url" }, { status: 403 });
  }

  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      return NextResponse.json({ error: "Image fetch failed" }, { status: res.status });
    }
    const blob = await res.blob();
    const contentType = res.headers.get("content-type") || "image/jpeg";
    return new NextResponse(blob, {
      headers: { "Content-Type": contentType },
    });
  } catch (e) {
    return NextResponse.json({ error: "Proxy failed" }, { status: 502 });
  }
}
