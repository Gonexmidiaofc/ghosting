import { createAdminClient } from "@/lib/supabase/admin"
import { NextResponse } from "next/server"

export async function POST() {
  try {
    const supabase = createAdminClient()

    // Buscar usuario pelo email
    const { data: users, error: listError } = await supabase.auth.admin.listUsers()
    
    if (listError) {
      return NextResponse.json({ error: listError.message }, { status: 500 })
    }

    const user = users.users.find(u => u.email === "ghosting.ads@gmail.com")
    
    if (!user) {
      return NextResponse.json({ error: "Usuario nao encontrado" }, { status: 404 })
    }

    // Atualizar role para super_admin
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ role: "super_admin" })
      .eq("id", user.id)

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      message: "Voce agora e Super Admin!" 
    })

  } catch (err) {
    return NextResponse.json({ 
      error: err instanceof Error ? err.message : "Erro desconhecido" 
    }, { status: 500 })
  }
}
