import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublic = ["/sign-in", "/sign-up"].includes(path);
  const authToken = request.cookies.get("authToken")?.value || "";

  if (!isPublic && !authToken) {
    return NextResponse.redirect(new URL("/sign-in", request.nextUrl));
  }

  if (isPublic && authToken) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin", "/sign-in", "/sign-up"],
};
