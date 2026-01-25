import { NextRequest, NextResponse } from "next/server";

export function proxy (req: NextRequest) {
  const { pathname } = req.nextUrl;
  const siteAccess = req.cookies.get("site_access")?.value;

  // Allow static assets
  if (
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // Allow authenticate page & API
  if (
    pathname.startsWith("/authenticate") ||
    pathname.startsWith("/api")
  ) {
    return NextResponse.next();
  }

  /**
   * 🔐 SITE GATE
   * No cookie → redirect to password page
   */
  if (!siteAccess) {
    return NextResponse.redirect(
      new URL("/authenticate", req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|.*\\.png$).*)",
  ],
};
