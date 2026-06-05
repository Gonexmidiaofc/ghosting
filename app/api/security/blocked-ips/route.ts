import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

// GET - List blocked IPs (admin only)
export async function GET() {
  try {
    const supabase = await createClient()
    
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if user is admin
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single()

    if (!profile || !["admin", "super_admin"].includes(profile.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const { data: blockedIPs, error } = await supabase
      .from("blocked_ips")
      .select("*")
      .order("blocked_at", { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data: blockedIPs })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST - Block an IP (admin only)
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if user is admin
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single()

    if (!profile || !["admin", "super_admin"].includes(profile.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const body = await request.json()
    const { ip_address, reason, duration_hours, permanent } = body

    if (!ip_address) {
      return NextResponse.json({ error: "IP address is required" }, { status: 400 })
    }

    const { error } = await supabase.rpc("block_ip", {
      p_ip_address: ip_address,
      p_reason: reason || "Manually blocked by admin",
      p_blocked_by: user.id,
      p_duration_hours: duration_hours || 24,
      p_is_permanent: permanent || false,
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Log the action
    await supabase.rpc("log_security_event", {
      p_ip_address: ip_address,
      p_user_agent: null,
      p_endpoint: "/api/security/blocked-ips",
      p_event_type: "ip_blocked",
      p_details: { blocked_by: user.id, reason, permanent },
    })

    return NextResponse.json({ success: true, message: `IP ${ip_address} has been blocked` })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// DELETE - Unblock an IP (admin only)
export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if user is admin
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single()

    if (!profile || !["admin", "super_admin"].includes(profile.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const ip_address = searchParams.get("ip")

    if (!ip_address) {
      return NextResponse.json({ error: "IP address is required" }, { status: 400 })
    }

    const { error } = await supabase
      .from("blocked_ips")
      .delete()
      .eq("ip_address", ip_address)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Log the action
    await supabase.rpc("log_security_event", {
      p_ip_address: ip_address,
      p_user_agent: null,
      p_endpoint: "/api/security/blocked-ips",
      p_event_type: "ip_unblocked",
      p_details: { unblocked_by: user.id },
    })

    return NextResponse.json({ success: true, message: `IP ${ip_address} has been unblocked` })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
