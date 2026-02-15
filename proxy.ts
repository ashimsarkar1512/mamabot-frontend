

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

  // ===============================
  // ✅ 1. Allow static files
  // ===============================
  if (
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // ===============================
  // 🔐 2. Site Gate Check
  // ===============================
  const siteAccess = req.cookies.get("site_access")?.value;

  if (!siteAccess && !pathname.startsWith("/authenticate")) {
    return NextResponse.redirect(new URL("/authenticate", req.url));
  }

  // ===============================
  // 🔑 3. Get Auth Cookies
  // ===============================
  const token = req.cookies.get("token")?.value;
  const role = req.cookies.get("role")?.value;

  // ===============================
  // 🚫 4. If Logged In → Block Auth Pages
  // ===============================
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

  // ===============================
  // ❌ 5. Not Logged In → Block Dashboards
  // ===============================
  if (
    (pathname.startsWith("/user-dashboard") ||
      pathname.startsWith("/admin-dashboard")) &&
    !token
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // ===============================
  // 🔒 6. Role Protection
  // ===============================
  if (pathname.startsWith("/admin-dashboard") && role !== "Admin") {
    return NextResponse.redirect(new URL("/user-dashboard", req.url));
  }

  if (pathname.startsWith("/user-dashboard") && role !== "User") {
    return NextResponse.redirect(new URL("/admin-dashboard", req.url));
  }

  // ===============================
  // ✅ 7. Allow Public Routes
  // ===============================
  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/forgot-password") ||
    pathname.startsWith("/reset-password") ||
    pathname.startsWith("/emailVerification") ||
    pathname.startsWith("/verification") ||
    pathname.startsWith("/paymentSuccess") ||
    pathname.startsWith("/authenticate") ||
    pathname.startsWith("/api")
  ) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.svg$).*)",
  ],
};
