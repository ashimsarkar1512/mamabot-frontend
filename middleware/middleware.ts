import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  // Define public routes that don't require authentication
  const isPublicRoute =
    req.nextUrl.pathname.startsWith("/auth/") ||
    req.nextUrl.pathname === "/login" ||
    req.nextUrl.pathname === "/register";

  // Define admin routes that require admin role
  const isAdminRoute =
    req.nextUrl.pathname.startsWith("/admin") ||
    req.nextUrl.pathname.startsWith("/(adminDashboard)");

  // Define user dashboard routes that require user role
  const isUserRoute =
    req.nextUrl.pathname.startsWith("/user-dashboard") ||
    req.nextUrl.pathname.startsWith("/(userDashboard)");

  // If no token exists and trying to access a protected route, redirect to login
  if (
    !token &&
    !isPublicRoute &&
    !req.nextUrl.pathname.startsWith("/") &&
    req.nextUrl.pathname !== "/"
  ) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // If trying to access admin route without admin role
  if (isAdminRoute && token && token.role !== "admin") {
    const url = req.nextUrl.clone();
    url.pathname = "/user-dashboard"; // Redirect non-admins to user dashboard
    return NextResponse.redirect(url);
  }

  // If user is logged in and tries to access auth pages, redirect to home
  if (token && isPublicRoute) {
    const url = req.nextUrl.clone();

    // Define role priority
    const ROLE_PRIORITY = ["admin", "moderator", "user"];

    // Redirect based on user role priority
    // Type assertion to ensure proper typing
    const tokenRole = token.role as string | string[];

    if (Array.isArray(tokenRole) && tokenRole.length > 0) {
      // Handle multiple roles - use the highest priority role
      const roles = Array.isArray(tokenRole) ? tokenRole : [tokenRole];
      const primaryRole =
        ROLE_PRIORITY.find((role) => roles.includes(role)) || "user";

      switch (primaryRole) {
        case "admin":
          url.pathname = "/admin-dashboard";
          break;
        case "moderator":
          url.pathname = "/moderator-dashboard";
          break;
        default:
          url.pathname = "/user-dashboard";
      }
    } else {
      // Handle single role or fallback
      const role = tokenRole || "user";
      if (role === "admin") {
        url.pathname = "/admin-dashboard";
      } else {
        url.pathname = "/user-dashboard";
      }
    }
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|auth|login|register).*)",
  ],
};
