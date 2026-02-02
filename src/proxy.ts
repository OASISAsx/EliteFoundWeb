import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = [
  "/login",
  "/api/auth", // OAuth flow
];

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log("🔥 PROXY:", pathname);

  // ✅ Always allow auth flow
  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  /**
   * ⭐ IMPORTANT:
   * Allow first landing after OAuth even if token is not ready yet
   */

  if (!token && pathname === "/dashboard") {
    return NextResponse.next();
  }

  // 🔐 Protect others
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (token && pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  const role = token.role;

  if (pathname === "/dashboard") {
    if (role === "ADMIN") {
      return NextResponse.rewrite(new URL("/(admin)/dashboard", request.url));
    }

    if (role === "USER") {
      return NextResponse.rewrite(new URL("/(user)/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};
