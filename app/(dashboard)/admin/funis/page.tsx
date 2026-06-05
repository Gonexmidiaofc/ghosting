"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, ArrowRight, TrendingDown, GitBranch } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface Funnel {
  id: string
  name: string
  type: string
  status: string
  project_id: string
  offer_id: string
  created_at: string
  project?: { name: string }
  offer?: { name: string }
  // Computed
  steps: Array<{ name: string; value: number; rate: string }>
  revenue: number
  roas: number
}

const funnelTypes = [
  { name: "Aplicacao", id: "application", color: "bg-purple-500" },
  { name: "VSL", id: "vsl", color: "bg-blue-500" },
  { name: "WhatsApp", id: "whatsapp", color: "bg-emerald-500" },
  { name: "Webinar", id: "webinar", color: "bg-orange-500" },
  { name: "Low Ticket", id: "low_ticket", color: "bg-cyan-500" },
  { name: "High Ticket", id: "high_ticket", color: "bg-primary" },
]

export default function AdminFunis() {
  const [funnels, setFunnels] = useState<Funnel[]>([])
  const [loading, setLoading] = useState(true)
  const [typeCounts, setTypeCounts] = useState<Record<string, number>>({})

  useEffect(() => {
    loadFunnels()
  }, [])

  const loadFunnels = async () => {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from("funnels")
      .select(`
        *,
        project:projects(name),
        offer:offers(name)
      `)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error loading funnels:", error)
      setLoading(false)
      return
    }

    // Calcular contagem por tipo
    const counts: Record<string, number> = {}
    funnelTypes.forEach(t => counts[t.id] = 0)
    
    const funnelsWithMetrics = (data || []).map(funnel => {
      if (funnel.type && counts[funnel.type] !== undefined) {
        counts[funnel.type]++
      }
      
      return {
        ...funnel,
        steps: [], // Seria preenchido com dados reais das funnel_pages
        revenue: 0,
        roas: 0
      }
    })

    setTypeCounts(counts)
    setFunnels(funnelsWithMetrics)
    setLoading(false)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0
    }).format(value)
  }

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Funis</h1>
          <p className="text-sm text-muted-foreground">Visualize e gerencie todos os funis de conversao</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Novo Funil
        </Button>
      </div>

      {/* Funnel Types */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {funnelTypes.map((type) => (
          <Card key={type.name} className="bg-[#0d0d0d] border-[#1a1a1a] hover:border-[#2a2a2a] cursor-pointer transition-colors">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-2 h-2 rounded-full ${type.color}`} />
                <span className="text-xs text-muted-foreground">Funil de {type.name}</span>
              </div>
              <p className="text-xl font-bold text-foreground">{typeCounts[type.id] || 0}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {funnels.length === 0 ? (
        <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
          <CardContent className="p-12 text-center">
            <GitBranch className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Nenhum funil ainda</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Crie seu primeiro funil de vendas para comecar a converter
            </p>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Criar Primeiro Funil
            </Button>
          </CardContent>
        </Card>
      ) : (
        /* Funnels */
        <div className="space-y-6">
          {funnels.map((funnel) => (
            <Card key={funnel.id} className="bg-[#0d0d0d] border-[#1a1a1a]">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">{funnel.name}</CardTitle>
                    <p className="text-xs text-muted-foreground mt-1">
                      {funnel.offer?.name || "Sem oferta"} - {funnel.type || "Sem tipo"}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-bold text-emerald-500">{formatCurrency(funnel.revenue)}</p>
                      <p className="text-xs text-muted-foreground">Receita</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-primary">{funnel.roas > 0 ? `${funnel.roas.toFixed(1)}x` : "-"}</p>
                      <p className="text-xs text-muted-foreground">ROAS</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {funnel.steps.length > 0 ? (
                  <div className="flex items-center gap-2 overflow-x-auto pb-2">
                    {funnel.steps.map((step, index) => (
                      <div key={step.name} className="flex items-center">
                        <div className="flex flex-col items-center min-w-[100px]">
                          <div className="w-full bg-[#141414] rounded-lg p-3 text-center">
                            <p className="text-lg font-bold text-foreground">{step.value.toLocaleString()}</p>
                            <p className="text-[10px] text-muted-foreground mt-1">{step.name}</p>
                            <p className="text-xs font-medium text-primary mt-1">{step.rate}</p>
                          </div>
                          {index < funnel.steps.length - 1 && (
                            <div className="text-xs text-red-400 mt-1 flex items-center gap-1">
                              <TrendingDown className="w-3 h-3" />
                              {(100 - parseFloat(funnel.steps[index + 1].rate)).toFixed(1)}%
                            </div>
                          )}
                        </div>
                        {index < funnel.steps.length - 1 && (
                          <ArrowRight className="w-4 h-4 text-muted-foreground mx-2 flex-shrink-0" />
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Nenhuma etapa configurada ainda
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
