import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Protect all /admin routes except /admin/login
    const isAdminRoute = pathname.startsWith("/admin");
    const isLoginPage = pathname === "/admin/login";
    const isApiAuthRoute = pathname.startsWith("/api/admin/login");

    if (isAdminRoute && !isLoginPage && !isApiAuthRoute) {
        const session = req.cookies.get("admin_session");
        if (!session || session.value !== "1") {
            const loginUrl = new URL("/admin/login", req.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    // Protect /api/admin/* routes (except login endpoint itself)
    const isAdminApi = pathname.startsWith("/api/admin");
    if (isAdminApi && !isApiAuthRoute) {
        const session = req.cookies.get("admin_session");
        if (!session || session.value !== "1") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/api/admin/:path*"],
};
