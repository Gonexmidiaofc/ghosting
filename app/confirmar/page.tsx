"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, CheckCircle, Loader2 } from "lucide-react"
import Link from "next/link"

export default function ConfirmarPage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleConfirm = async () => {
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/confirm-email", { method: "POST" })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Erro ao confirmar email")
        return
      }

      setSuccess(true)
    } catch {
      setError("Erro de conexao")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-card border-border">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            {success ? (
              <CheckCircle className="w-8 h-8 text-green-500" />
            ) : (
              <Shield className="w-8 h-8 text-primary" />
            )}
          </div>
          <CardTitle className="text-2xl text-foreground">
            {success ? "Email Confirmado!" : "Confirmar Email"}
          </CardTitle>
          <CardDescription>
            {success 
              ? "Agora voce pode fazer login normalmente" 
              : "Clique no botao abaixo para confirmar seu email"
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          {success ? (
            <Button asChild className="w-full bg-primary text-primary-foreground">
              <Link href="/login">Ir para Login</Link>
            </Button>
          ) : (
            <Button 
              onClick={handleConfirm} 
              disabled={loading}
              className="w-full bg-primary text-primary-foreground"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Confirmando...
                </>
              ) : (
                "Confirmar Meu Email"
              )}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
