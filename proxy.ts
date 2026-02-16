

// import { NextRequest, NextResponse } from "next/server";

// export function proxy(req: NextRequest) {
//   const { pathname } = req.nextUrl;

//   // ✅ Allow static files
//   if (
//     pathname.startsWith("/_next") ||
//     pathname === "/favicon.ico"
//   ) {
//     return NextResponse.next();
//   }

//   // ✅ Allow public routes
//   if (
//     pathname.startsWith("/login") ||
//     pathname.startsWith("/register") ||
//     pathname.startsWith("/forgot-password") ||
//     pathname.startsWith("/reset-password") ||
//     pathname.startsWith("/emailVerification") ||
//     pathname.startsWith("/reset-password") ||
//     pathname.startsWith("/verification") ||
//     pathname.startsWith("/paymentSuccess") ||
    
//     pathname.startsWith("/authenticate") ||
//      pathname.startsWith("/api")
//   ) {
//     return NextResponse.next();
//   }

//   // 🔐 Site access check
//   const siteAccess = req.cookies.get("site_access")?.value;
//   if (!siteAccess) {
//     return NextResponse.redirect(new URL("/authenticate", req.url));
//   }

//   // 🔐 LOGIN CHECK
//   const token = req.cookies.get("token")?.value;
//   const role = req.cookies.get("role")?.value;

//   // ❌ Not logged in → block dashboards
//   if (
//     (pathname.startsWith("/user-dashboard") ||
//       pathname.startsWith("/admin-dashboard")) &&
//     !token
//   ) {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   // 🔒 Role protection
//   if (pathname.startsWith("/admin-dashboard") && role !== "Admin") {
//     return NextResponse.redirect(new URL("/user-dashboard", req.url));
//   }

//   if (pathname.startsWith("/user-dashboard") && role !== "User") {
//     return NextResponse.redirect(new URL("/admin-dashboard", req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/((?!_next/static|_next/image|.*\\.png$).*)",
//   ],
// };


import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ====================================
  // ✅ 1. Allow Static Files First
  // ====================================
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.match(/\.(png|jpg|jpeg|svg|gif|webp)$/)
  ) {
    return NextResponse.next();
  }

  // ====================================
  // 🔑 2. Get Cookies
  // ====================================
  const siteAccess = req.cookies.get("site_access")?.value;
  const token = req.cookies.get("token")?.value;
  const role = req.cookies.get("role")?.value;

  // ====================================
  // 🔓 3. Public Routes (Always Allowed)
  // ====================================
  const isPublicRoute =
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/forgot-password") ||
    pathname.startsWith("/reset-password") ||
    pathname.startsWith("/emailVerification") ||
    pathname.startsWith("/verification") ||
    pathname.startsWith("/paymentSuccess") ||
    pathname.startsWith("/authenticate") ||
    pathname.startsWith("/api");

  // ====================================
  // 🔐 4. Site Access Gate
  // ====================================
  if (!siteAccess && !isPublicRoute) {
    return NextResponse.redirect(new URL("/authenticate", req.url));
  }

  // ====================================
  // 🚫 5. If Logged In → Block Auth Pages
  // ====================================
  if (
    token &&
    (
      pathname.startsWith("/login") ||
      pathname.startsWith("/register") ||
      pathname.startsWith("/forgot-password") ||
      pathname.startsWith("/reset-password") ||
      pathname.startsWith("/emailVerification") ||
      pathname.startsWith("/verification")
    )
  ) {
    if (role === "Admin") {
      return NextResponse.redirect(new URL("/admin-dashboard", req.url));
    }
    return NextResponse.redirect(new URL("/user-dashboard", req.url));
  }

  // ====================================
  // ❌ 6. Not Logged In → Block Dashboards
  // ====================================
  if (
    (pathname.startsWith("/user-dashboard") ||
      pathname.startsWith("/admin-dashboard")) &&
    !token
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // ====================================
  // 🔒 7. Role Protection
  // ====================================
  if (pathname.startsWith("/admin-dashboard") && role !== "Admin") {
    return NextResponse.redirect(new URL("/user-dashboard", req.url));
  }

  if (pathname.startsWith("/user-dashboard") && role !== "User") {
    return NextResponse.redirect(new URL("/admin-dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.svg$|.*\\.webp$).*)",
  ],
};
