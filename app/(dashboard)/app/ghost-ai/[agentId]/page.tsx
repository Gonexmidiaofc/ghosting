"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useChat } from "@ai-sdk/react"
import { BrainCircuit, Send, ArrowLeft } from "lucide-react"
import { useEffect, useState, use } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export default function StudentAgentChat({ params }: { params: Promise<{ agentId: string }> }) {
  const resolvedParams = use(params)
  const agentId = resolvedParams.agentId

  const [agentName, setAgentName] = useState("Carregando Especialista...")
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    checkAccessAndLoadAgent()
  }, [agentId])

  const checkAccessAndLoadAgent = async () => {
    // Check if the user has access to this agent
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/login')
      return
    }

    const { data: access } = await supabase
      .from("user_agent_access")
      .select("*")
      .eq("user_id", user.id)
      .eq("agent_id", agentId)
      .single()

    if (!access) {
      // User hasn't bought it yet
      alert("Você não possui acesso a este agente.")
      router.push('/app/ghost-ai')
      return
    }

    // Load agent info
    const { data: agent } = await supabase
      .from("custom_agents")
      .select("name")
      .eq("id", agentId)
      .single()

    if (agent) {
      setAgentName(agent.name)
    }

    setLoading(false)
  }

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    body: {
      agentId: agentId
    }
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="p-0 sm:p-6 space-y-6 h-[calc(100vh-6rem)] max-w-4xl mx-auto flex flex-col">
      <div className="flex items-center gap-4 pb-2">
        <Button variant="ghost" size="icon" onClick={() => router.push('/app/ghost-ai')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <BrainCircuit className="w-6 h-6 text-primary" />
            {agentName}
          </h1>
          <p className="text-sm text-muted-foreground">O seu especialista particular pronto para trabalhar.</p>
        </div>
      </div>

      <Card className="bg-[#0d0d0d] border-[#1a1a1a] flex flex-col flex-1 overflow-hidden">
        <CardContent className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center opacity-50">
              <BrainCircuit className="w-16 h-16 mb-4 text-primary" />
              <p className="text-lg font-medium text-foreground">Olá! Sou o {agentName}.</p>
              <p className="text-sm mt-2 max-w-md">Envie sua primeira mensagem abaixo para começarmos o nosso trabalho.</p>
            </div>
          ) : (
            messages.map(m => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-5 py-3 text-sm ${
                  m.role === 'user' 
                    ? 'bg-primary text-primary-foreground rounded-br-sm' 
                    : 'bg-secondary text-foreground rounded-bl-sm border border-border'
                }`}>
                  <p className="whitespace-pre-wrap leading-relaxed">{m.content}</p>
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-secondary border border-border rounded-2xl rounded-bl-sm px-5 py-4 text-sm flex gap-1.5 items-center">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-75" />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-150" />
              </div>
            </div>
          )}
        </CardContent>
        <div className="p-4 sm:p-6 border-t border-[#1a1a1a] bg-background/50">
          <form onSubmit={handleSubmit} className="flex items-end gap-2 relative">
            <textarea 
              value={input}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  // @ts-ignore
                  handleSubmit(e);
                }
              }}
              placeholder="Digite sua requisição..."
              className="flex-1 bg-[#141414] border border-[#1a1a1a] rounded-xl px-4 py-3 min-h-[50px] max-h-[150px] text-sm text-foreground focus:outline-none focus:border-primary resize-none scrollbar-thin"
              rows={1}
            />
            <Button 
              type="submit" 
              disabled={isLoading || !input.trim()} 
              className="bg-primary hover:bg-primary/90 text-primary-foreground h-[50px] w-[50px] rounded-xl shrink-0"
            >
              <Send className="w-5 h-5" />
            </Button>
          </form>
          <div className="text-center mt-3">
             <p className="text-[10px] text-muted-foreground">O especialista pode cometer erros. Sempre revise as informações geradas.</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
