import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = [
  "/login",
  "/api/auth", // OAuth flow
];

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  console.log("🔥 PROXY:", pathname);
  // console.log("COOKIES:", request.cookies.getAll());
  // console.log("TOKEN:", token);
  if (token && pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  // ✅ Always allow auth flow
  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }
  // 🔥 login แล้ว ห้ามเข้า login

  // ✅ 3. ยังไม่ login ห้ามเข้า dashboard
  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // ✅ 4. เข้า root
  if (pathname === "/") {
    return NextResponse.redirect(
      new URL(token ? "/dashboard" : "/login", request.url),
    );
  }

  // ✅ 5. Protect ทุก path ที่เหลือ
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
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
