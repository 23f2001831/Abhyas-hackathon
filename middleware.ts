import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Define protected routes that require authentication
const protectedRoutes = [
  "/dashboard",
  "/skills",
  "/missions",
  "/teams",
  "/career-simulator",
  "/incubation",
  "/journal",
  "/time-capsule",
  "/resume-builder",
  "/mentors",
]

// Define public routes that should redirect to dashboard if already authenticated
const publicRoutes = ["/login", "/home"]

// Define admin-only routes
const adminRoutes = ["/admin"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check for auth token in cookies or headers
  const authToken = request.cookies.get("auth-token")?.value
  const userData = request.cookies.get("user-data")?.value

  // Check if route is protected
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))
  const isPublicRoute = publicRoutes.some((route) => pathname === route || pathname.startsWith(route))
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route))

  // If accessing protected route without auth token, redirect to login
  if (isProtectedRoute && !authToken) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("redirect", pathname)
    return NextResponse.redirect(loginUrl)
  }

  // If accessing public routes (login/home) while authenticated, redirect to dashboard
  if (isPublicRoute && authToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  // Check admin routes
  if (isAdminRoute && authToken) {
    try {
      const user = userData ? JSON.parse(userData) : null
      if (user?.role !== "admin") {
        return NextResponse.redirect(new URL("/dashboard", request.url))
      }
    } catch (error) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  return NextResponse.next()
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
