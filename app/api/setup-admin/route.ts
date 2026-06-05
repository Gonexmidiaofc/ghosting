import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

export async function POST() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

  // Admin client bypassa rate limits
  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })

  const email = "ghosting.ads@gmail.com"
  const password = "@Pipoca02"

  try {
    // Criar usuario com admin client
    const { data: user, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: "GHOSTING.ADS"
      }
    })

    if (createError) {
      // Se usuario ja existe, apenas atualiza para super_admin
      if (createError.message.includes("already been registered")) {
        const { error: updateError } = await supabaseAdmin
          .from("profiles")
          .update({ role: "super_admin" })
          .eq("email", email)

        if (updateError) {
          return NextResponse.json({ error: updateError.message }, { status: 400 })
        }

        return NextResponse.json({ 
          success: true, 
          message: "Usuario ja existia. Promovido para super_admin!",
          credentials: { email, password }
        })
      }

      return NextResponse.json({ error: createError.message }, { status: 400 })
    }

    // Promover para super_admin
    if (user?.user) {
      await supabaseAdmin
        .from("profiles")
        .update({ role: "super_admin" })
        .eq("id", user.user.id)
    }

    return NextResponse.json({ 
      success: true, 
      message: "Super Admin criado com sucesso!",
      credentials: { email, password }
    })

  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Erro desconhecido"
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
