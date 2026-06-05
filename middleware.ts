import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"
import {
  SECURITY_HEADERS,
  isMaliciousBot,
  isSuspiciousPath,
  hasSuspiciousHeaders,
  checkRateLimit,
  getClientIP,
} from "@/lib/security"

// Blocked page response
function blockedResponse(reason: string, status: number = 403) {
  return new NextResponse(
    JSON.stringify({
      error: "Access Denied",
      message: reason,
    }),
    {
      status,
      headers: {
        "Content-Type": "application/json",
        ...SECURITY_HEADERS,
      },
    }
  )
}

// Rate limited response
function rateLimitedResponse(resetTime: number) {
  return new NextResponse(
    JSON.stringify({
      error: "Too Many Requests",
      message: "You have exceeded the rate limit. Please try again later.",
      retryAfter: Math.ceil((resetTime - Date.now()) / 1000),
    }),
    {
      status: 429,
      headers: {
        "Content-Type": "application/json",
        "Retry-After": String(Math.ceil((resetTime - Date.now()) / 1000)),
        ...SECURITY_HEADERS,
      },
    }
  )
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const userAgent = request.headers.get("user-agent")
  const clientIP = getClientIP(request)

  // 1. Check for malicious bots (skip for legitimate crawlers)
  const isSearchEngine = userAgent && /googlebot|bingbot|yandex|duckduckbot/i.test(userAgent)
  if (!isSearchEngine && isMaliciousBot(userAgent)) {
    return blockedResponse("Automated access is not permitted")
  }

  // 2. Check for suspicious paths (potential attacks)
  if (isSuspiciousPath(pathname)) {
    return blockedResponse("Invalid request path")
  }

  // 3. Check for suspicious headers
  if (hasSuspiciousHeaders(request.headers)) {
    return blockedResponse("Invalid request headers")
  }

  // 4. Rate limiting
  // Different limits for different endpoints
  let rateLimit = { limit: 200, window: 60000 } // Default: 200 requests per minute

  if (pathname.startsWith("/api/")) {
    rateLimit = { limit: 100, window: 60000 } // API: 100 requests per minute
  } else if (pathname === "/login" || pathname === "/signup") {
    rateLimit = { limit: 30, window: 60000 } // Auth: 30 requests per minute
  }

  const rateLimitResult = checkRateLimit(clientIP, rateLimit.limit, rateLimit.window)
  if (!rateLimitResult.allowed) {
    return rateLimitedResponse(rateLimitResult.resetTime)
  }

  // 5. Skip Supabase middleware if not configured
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    const response = NextResponse.next()
    // Add security headers
    Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
      response.headers.set(key, value)
    })
    return response
  }

  // 6. Supabase authentication middleware
  let supabaseResponse = NextResponse.next({
    request,
  })

  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            )
            supabaseResponse = NextResponse.next({
              request,
            })
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, {
                ...options,
                // Secure cookie settings
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
              })
            )
          },
        },
      }
    )

    const { data: { user } } = await supabase.auth.getUser()

    // 7. Protected routes check
    const protectedRoutes = ["/app", "/admin"]
    const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

    if (isProtectedRoute && !user) {
      const loginUrl = new URL("/login", request.url)
      loginUrl.searchParams.set("redirect", pathname)
      return NextResponse.redirect(loginUrl)
    }

    // 8. Admin route protection
    if (pathname.startsWith("/admin") && user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single()

      if (!profile || !["admin", "super_admin"].includes(profile.role)) {
        return NextResponse.redirect(new URL("/app", request.url))
      }
    }

    // 9. Redirect authenticated users away from auth pages
    const authRoutes = ["/login", "/signup"]
    if (authRoutes.includes(pathname) && user) {
      // Check user role to redirect appropriately
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single()

      if (profile?.role === "admin" || profile?.role === "super_admin") {
        return NextResponse.redirect(new URL("/admin", request.url))
      }
      return NextResponse.redirect(new URL("/app", request.url))
    }

  } catch (error) {
    // If Supabase fails, continue but add security headers
    const response = NextResponse.next()
    Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
      response.headers.set(key, value)
    })
    return response
  }

  // 10. Add security headers to response
  Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
    supabaseResponse.headers.set(key, value)
  })

  // Add rate limit headers
  supabaseResponse.headers.set("X-RateLimit-Limit", String(rateLimit.limit))
  supabaseResponse.headers.set("X-RateLimit-Remaining", String(rateLimitResult.remaining))
  supabaseResponse.headers.set("X-RateLimit-Reset", String(rateLimitResult.resetTime))

  return supabaseResponse
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)",
  ],
}
