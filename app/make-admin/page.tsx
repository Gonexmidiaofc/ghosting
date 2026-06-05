"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Shield, CheckCircle, Loader2 } from "lucide-react"

export default function MakeAdminPage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleMakeAdmin = async () => {
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/make-admin", { method: "POST" })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error)
      }

      setSuccess(true)
      
      // Redirecionar para admin após 2 segundos
      setTimeout(() => {
        window.location.href = "/admin"
      }, 2000)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-xl p-8 text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Promover para Admin
          </h1>
          <p className="text-muted-foreground mb-6">
            Clique no botão abaixo para se tornar super_admin do GHOST.SYSTEM
          </p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          {success ? (
            <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-3 rounded-lg flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Sucesso! Redirecionando para /admin...
            </div>
          ) : (
            <Button 
              onClick={handleMakeAdmin} 
              disabled={loading}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Atualizando...
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4 mr-2" />
                  Tornar-me Super Admin
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
