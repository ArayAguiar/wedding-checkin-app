// src/middleware.ts
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createServerClient } from "@supabase/ssr"

export async function middleware(req: NextRequest) {
  let res = NextResponse.next()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            req.cookies.set(name, value)
          })
          res = NextResponse.next({
            request: req,
          })
          cookiesToSet.forEach(({ name, value, options }) => {
            res.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  // FIX: getUser() validates the JWT with Supabase Auth server
  const { data: { user }, error: userError } = await supabase.auth.getUser()

  // Protect /checkin — must be logged in AND be staff
  if (req.nextUrl.pathname.startsWith("/checkin")) {
    if (userError || !user) {
      return NextResponse.redirect(new URL("/staff", req.url))
    }

    // Verify staff role by email
    const { data: staff } = await supabase
      .from("staff")
      .select("id")
      .eq("email", user.email)
      .single()

    if (!staff) {
      return NextResponse.redirect(new URL("/", req.url))
    }
  }

  return res
}

export const config = { matcher: ["/checkin/:path*"] }