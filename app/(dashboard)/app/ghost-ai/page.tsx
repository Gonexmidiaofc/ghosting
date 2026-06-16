"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BrainCircuit, Lock, ExternalLink, Sparkles, MessageSquare } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface CustomAgent {
  id: string
  name: string
  description: string
  price: number
  icon: string
}

export default function GhostAIStorePage() {
  const [agents, setAgents] = useState<CustomAgent[]>([])
  const [unlockedAgentIds, setUnlockedAgentIds] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    loadStore()
  }, [])

  const loadStore = async () => {
    setLoading(true)
    
    // 1. Get all active agents
    const { data: agentsData } = await supabase
      .from("custom_agents")
      .select("id, name, description, price, icon")
      .eq("is_active", true)
      .order("created_at", { ascending: true })

    if (agentsData) setAgents(agentsData)

    // 2. Get current user's unlocked agents
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { data: accessData } = await supabase
        .from("user_agent_access")
        .select("agent_id")
        .eq("user_id", user.id)
        
      if (accessData) {
        setUnlockedAgentIds(accessData.map(a => a.agent_id))
      }
    }

    setLoading(false)
  }

  const handleAgentClick = (agentId: string, isUnlocked: boolean, price: number) => {
    if (isUnlocked || price === 0) {
      router.push(`/app/ghost-ai/${agentId}`)
    } else {
      // Aqui abririamos o modal ou redirecionaria para o checkout
      // Para este MVP, vamos apenas dar um alert ou abrir uma nova tab se tivermos o link
      alert(`Para acessar este agente, o aluno deve comprar pelo checkout (Valor: R$ ${price})`)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <BrainCircuit className="w-8 h-8 text-primary" />
          Loja de Agentes de IA
        </h1>
        <p className="text-muted-foreground mt-1">
          Contrate nossos agentes especialistas, treinados exclusivamente para executar tarefas específicas no seu negócio.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {agents.length === 0 ? (
          <div className="col-span-full py-12 text-center text-muted-foreground bg-[#0d0d0d] border border-[#1a1a1a] rounded-lg">
            Nenhum agente especialista disponível no momento.
          </div>
        ) : (
          agents.map(agent => {
            const isUnlocked = unlockedAgentIds.includes(agent.id)

            return (
              <Card 
                key={agent.id} 
                className={`bg-[#0d0d0d] border-[#1a1a1a] flex flex-col relative group transition-all ${
                  !isUnlocked ? "hover:border-primary/30" : "hover:border-emerald-500/50 cursor-pointer"
                }`}
                onClick={() => isUnlocked && handleAgentClick(agent.id, isUnlocked, agent.price)}
              >
                <CardContent className="p-6 flex-1 flex flex-col items-center text-center">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${
                    isUnlocked ? "bg-emerald-500/20 text-emerald-400" : "bg-primary/10 text-primary"
                  }`}>
                    {isUnlocked ? <MessageSquare className="w-8 h-8" /> : <BrainCircuit className="w-8 h-8" />}
                  </div>
                  
                  <h3 className="font-bold text-xl text-foreground mb-2">{agent.name}</h3>
                  <p className="text-sm text-muted-foreground mb-6 flex-1">{agent.description}</p>
                  
                  <div className="w-full pt-4 border-t border-[#1a1a1a]">
                    {isUnlocked ? (
                      <Button className="w-full bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-colors border border-emerald-500/20">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Acessar Chat
                      </Button>
                    ) : (
                      <div className="space-y-3 w-full">
                        <div className="flex items-center justify-center gap-1">
                          <span className="text-xs text-muted-foreground">R$</span>
                          <span className="text-2xl font-black text-foreground">{agent.price.toFixed(2)}</span>
                        </div>
                        <Button 
                          className="w-full bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20 hover:bg-primary/90"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleAgentClick(agent.id, isUnlocked, agent.price)
                          }}
                        >
                          <Lock className="w-4 h-4 mr-2" />
                          Desbloquear Acesso
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
