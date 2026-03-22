import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** App Router lives in `app/(app)/…`, so real paths are `/chat`, `/upload`, etc. Links use `/app/chat`; rewrite to match. */
function appShellInternalPath(pathname: string): string {
  const rest = pathname === "/app" ? "" : pathname.slice("/app".length);
  const internal = rest.startsWith("/") ? rest : `/${rest}`;
  if (internal === "/" || internal === "") {
    return "/chat";
  }
  return internal;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authDisabled = process.env.NEXT_PUBLIC_AUTH_DISABLED === "true";

  if (pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  if (pathname === "/app" || pathname.startsWith("/app/")) {
    if (!authDisabled && !request.cookies.get("tebeka_user")?.value) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
    const url = request.nextUrl.clone();
    url.pathname = appShellInternalPath(pathname);
    return NextResponse.rewrite(url);
  }

  if (pathname.startsWith("/admin")) {
    if (!authDisabled && !request.cookies.get("tebeka_admin")?.value) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/app", "/app/:path*", "/admin", "/admin/:path*"],
};
