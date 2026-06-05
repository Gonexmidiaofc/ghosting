import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

export async function POST() {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )

  const email = "ghosting.ads@gmail.com"

  try {
    // Buscar o usuario
    const { data: users, error: listError } = await supabaseAdmin.auth.admin.listUsers()
    
    if (listError) {
      return NextResponse.json({ error: listError.message }, { status: 400 })
    }

    const user = users.users.find(u => u.email === email)
    
    if (!user) {
      return NextResponse.json({ error: "Usuario nao encontrado" }, { status: 404 })
    }

    // Confirmar o email do usuario
    const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(
      user.id,
      { email_confirm: true }
    )

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, message: "Email confirmado! Agora voce pode fazer login." })
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Erro desconhecido"
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
