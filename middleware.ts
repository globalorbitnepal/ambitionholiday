import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api/admin/")) {
    if (pathname === "/api/admin/login") return NextResponse.next();
    const hasAdmin = Boolean(request.cookies.get("admin_session")?.value);
    if (!hasAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.next();
  }

  if (!pathname.startsWith("/api/orbit/")) {
    return NextResponse.next();
  }

  if (pathname === "/api/orbit/login" || pathname === "/api/orbit/upload" || pathname === "/api/orbit/media-file") {
    return NextResponse.next();
  }

  const hasCookie = Boolean(
    request.cookies.get("orbit_session")?.value || request.cookies.get("admin_session")?.value,
  );
  if (!hasCookie) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/orbit/:path*", "/api/admin/:path*"],
};
