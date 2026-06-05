import { createAdminClient } from "@/lib/supabase/admin"
import { NextRequest, NextResponse } from "next/server"
import { getClientIP } from "@/lib/security"

// POST - Log a security event (internal use)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { event_type, severity, endpoint, method, details, user_id } = body

    const ip_address = getClientIP(request)
    const user_agent = request.headers.get("user-agent")

    // Use admin client to bypass RLS
    const supabase = createAdminClient()

    const { error } = await supabase.rpc("log_security_event", {
      p_ip_address: ip_address,
      p_event_type: event_type,
      p_severity: severity || "info",
      p_user_id: user_id || null,
      p_endpoint: endpoint || null,
      p_method: method || null,
      p_user_agent: user_agent,
      p_details: details || {}
    })

    if (error) {
      console.error("Error logging security event:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error in security event API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
