import { createAdminClient } from "@/lib/supabase/admin"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { email, plan, role } = await request.json()
    const supabase = createAdminClient()

    const updateData: Record<string, string> = {}
    if (plan) updateData.plan = plan
    if (role) updateData.role = role

    const { data, error } = await supabase
      .from("profiles")
      .update(updateData)
      .eq("email", email)
      .select()

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Erro ao atualizar" }, { status: 500 })
  }
}

// Endpoint para liberar acesso total
export async function GET() {
  try {
    const supabase = createAdminClient()

    const { data, error } = await supabase
      .from("profiles")
      .update({ 
        plan: "dna_elite",
        role: "super_admin"
      })
      .eq("email", "ghosting.ads@gmail.com")
      .select()

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 })
    }

    return NextResponse.json({ 
      success: true, 
      message: "Acesso total liberado para ghosting.ads@gmail.com",
      data 
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Erro ao atualizar" }, { status: 500 })
  }
}
