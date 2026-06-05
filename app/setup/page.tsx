"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Check, Loader2, AlertCircle } from "lucide-react"

export default function SetupPage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const [credentials, setCredentials] = useState({ email: "", password: "" })

  const handleSetup = async () => {
    setLoading(true)
    setError("")

    try {
      // Chamar API que usa service_role_key (bypassa rate limit)
      const res = await fetch("/api/setup-admin", { method: "POST" })
      const data = await res.json()

      if (data.error) {
        throw new Error(data.error)
      }

      setCredentials(data.credentials)
      setSuccess(true)

      // Fazer login automatico
      const supabase = createClient()
      await supabase.auth.signInWithPassword({
        email: data.credentials.email,
        password: data.credentials.password
      })

      setTimeout(() => {
        window.location.href = "/admin"
      }, 3000)

    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao criar admin"
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-card border-border">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl text-foreground">Setup Inicial</CardTitle>
          <CardDescription>
            Clique no botao para criar sua conta de Super Admin automaticamente
          </CardDescription>
        </CardHeader>
        <CardContent>
          {success ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Admin Criado com Sucesso!
              </h3>
              <div className="bg-secondary/50 p-4 rounded-lg mb-4 text-left">
                <p className="text-sm text-muted-foreground mb-2">Suas credenciais:</p>
                <p className="text-sm text-foreground"><strong>Email:</strong> {credentials.email}</p>
                <p className="text-sm text-foreground"><strong>Senha:</strong> {credentials.password}</p>
              </div>
              <p className="text-muted-foreground text-sm">
                Redirecionando para o painel...
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-secondary/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Sera criado com:</p>
                <p className="text-sm text-foreground"><strong>Email:</strong> ghosting.ads@gmail.com</p>
                <p className="text-sm text-foreground"><strong>Senha:</strong> @Pipoca02</p>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-500 text-sm bg-red-500/10 p-3 rounded-lg">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <Button
                onClick={handleSetup}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Criando Admin...
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4 mr-2" />
                    Criar Minha Conta
                  </>
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-4">
                Clique apenas uma vez. Voce sera logado automaticamente.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
