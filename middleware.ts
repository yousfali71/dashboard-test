import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("authToken");
  request.headers.set(
    "x-auth-state",
    authToken ? "authenticated" : "unauthenticated"
  );
  return NextResponse.next();
}
