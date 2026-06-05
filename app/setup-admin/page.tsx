"use client"

import { useState, useEffect } from "react"

export default function SetupAdminPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  useEffect(() => {
    // Auto-create user on page load
    createAdmin()
  }, [])

  async function createAdmin() {
    setStatus("loading")
    setMessage("Criando usuario admin...")

    try {
      const response = await fetch("/api/admin/create-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "ghosting.ads@gmail.com",
          password: "@Fuskinha56",
          fullName: "Marshall",
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus("success")
        setMessage("Usuario criado com sucesso! Redirecionando para login...")
        setTimeout(() => {
          window.location.href = "/login"
        }, 2000)
      } else {
        setStatus("error")
        setMessage(data.error || "Erro ao criar usuario")
      }
    } catch (error) {
      setStatus("error")
      setMessage("Erro de conexao")
    }
  }

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center">
      <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-8 max-w-md w-full mx-4">
        <h1 className="text-2xl font-bold text-white mb-4 text-center">
          Configuracao Admin
        </h1>
        
        <div className="text-center">
          {status === "loading" && (
            <div className="text-[#C9A227]">
              <div className="animate-spin w-8 h-8 border-2 border-[#C9A227] border-t-transparent rounded-full mx-auto mb-4"></div>
              <p>{message}</p>
            </div>
          )}
          
          {status === "success" && (
            <div className="text-green-500">
              <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <p>{message}</p>
            </div>
          )}
          
          {status === "error" && (
            <div className="text-red-500">
              <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <p>{message}</p>
              <button
                onClick={createAdmin}
                className="mt-4 px-4 py-2 bg-[#C9A227] text-black rounded-lg hover:bg-[#B8922A] transition-colors"
              >
                Tentar novamente
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
