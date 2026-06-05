"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, MoreVertical, Phone, Mail, Calendar, Users } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface Lead {
  id: string
  name: string
  email: string
  phone: string
  source: string
  status: string
  notes: string
  potential_value: number
  created_at: string
  project_id: string
  offer?: { name: string }
  project?: { name: string }
}

const columns = [
  { id: "new", name: "Novo Lead", color: "border-blue-500" },
  { id: "qualified", name: "Qualificado", color: "border-purple-500" },
  { id: "contacted", name: "Contactado", color: "border-cyan-500" },
  { id: "proposal", name: "Proposta", color: "border-yellow-500" },
  { id: "negotiation", name: "Negociacao", color: "border-orange-500" },
  { id: "won", name: "Fechado", color: "border-emerald-500" },
  { id: "lost", name: "Perdido", color: "border-red-500" },
]

export default function AdminCRM() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    total: 0,
    pipelineValue: 0,
    closedValue: 0,
    conversionRate: 0
  })

  useEffect(() => {
    loadLeads()
  }, [])

  const loadLeads = async () => {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from("crm_leads")
      .select(`
        *,
        project:projects(name)
      `)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error loading leads:", error)
      setLoading(false)
      return
    }

    setLeads(data || [])

    // Calculate stats
    const total = data?.length || 0
    const pipelineValue = (data || [])
      .filter(l => !['won', 'lost'].includes(l.status))
      .reduce((sum, l) => sum + (l.potential_value || 0), 0)
    const closedValue = (data || [])
      .filter(l => l.status === 'won')
      .reduce((sum, l) => sum + (l.potential_value || 0), 0)
    const wonCount = (data || []).filter(l => l.status === 'won').length
    const conversionRate = total > 0 ? (wonCount / total) * 100 : 0

    setStats({
      total,
      pipelineValue,
      closedValue,
      conversionRate
    })

    setLoading(false)
  }

  const getLeadsByStatus = (status: string) => leads.filter(l => l.status === status)
  
  const getTotalValue = (status: string) => {
    const statusLeads = getLeadsByStatus(status)
    return statusLeads.reduce((acc, l) => acc + (l.potential_value || 0), 0)
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
    <div className="p-6 space-y-6 h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">CRM</h1>
          <p className="text-sm text-muted-foreground">Gerencie seus leads e oportunidades</p>
        </div>
        <div className="flex items-center gap-2">
          <select className="bg-[#141414] border border-[#1a1a1a] rounded-lg px-3 py-2 text-sm text-foreground">
            <option>Todos os Projetos</option>
          </select>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Novo Lead
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Total Leads</p>
            <p className="text-2xl font-bold text-foreground">{stats.total}</p>
          </CardContent>
        </Card>
        <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Pipeline Total</p>
            <p className="text-2xl font-bold text-foreground">{formatCurrency(stats.pipelineValue)}</p>
          </CardContent>
        </Card>
        <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Fechados (Mes)</p>
            <p className="text-2xl font-bold text-emerald-500">{formatCurrency(stats.closedValue)}</p>
          </CardContent>
        </Card>
        <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Taxa Conversao</p>
            <p className="text-2xl font-bold text-primary">{stats.conversionRate.toFixed(1)}%</p>
          </CardContent>
        </Card>
      </div>

      {leads.length === 0 ? (
        <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
          <CardContent className="p-12 text-center">
            <Users className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Nenhum lead ainda</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Comece a capturar leads para gerenciar seu pipeline de vendas
            </p>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Primeiro Lead
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-4">
          {columns.map((column) => {
            const columnLeads = getLeadsByStatus(column.id)
            const totalValue = getTotalValue(column.id)
            
            return (
              <div key={column.id} className="flex-shrink-0 w-72">
                <div className={`border-t-2 ${column.color} bg-[#0d0d0d] rounded-lg`}>
                  <div className="p-3 border-b border-[#1a1a1a]">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-foreground">{column.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          {columnLeads.length} leads {totalValue > 0 && `• ${formatCurrency(totalValue)}`}
                        </p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-2 space-y-2 max-h-[500px] overflow-y-auto">
                    {columnLeads.map((lead) => (
                      <Card key={lead.id} className="bg-[#141414] border-[#1a1a1a] hover:border-[#2a2a2a] cursor-pointer transition-colors">
                        <CardContent className="p-3">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="text-sm font-medium text-foreground">{lead.name}</p>
                              <p className="text-xs text-muted-foreground">{lead.email}</p>
                            </div>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <MoreVertical className="w-3 h-3" />
                            </Button>
                          </div>
                          
                          <div className="flex items-center gap-2 mb-2">
                            {lead.source && (
                              <span className="text-[10px] px-1.5 py-0.5 bg-[#1a1a1a] rounded text-muted-foreground">
                                {lead.source}
                              </span>
                            )}
                            {lead.project?.name && (
                              <span className="text-[10px] px-1.5 py-0.5 bg-primary/10 text-primary rounded">
                                {lead.project.name}
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center justify-between">
                            {lead.potential_value > 0 && (
                              <span className="text-sm font-bold text-emerald-500">
                                {formatCurrency(lead.potential_value)}
                              </span>
                            )}
                            <div className="flex items-center gap-1 ml-auto">
                              {lead.phone && (
                                <Button variant="ghost" size="icon" className="h-6 w-6">
                                  <Phone className="w-3 h-3" />
                                </Button>
                              )}
                              <Button variant="ghost" size="icon" className="h-6 w-6">
                                <Mail className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                          
                          {lead.notes && (
                            <div className="mt-2 pt-2 border-t border-[#1a1a1a]">
                              <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {lead.notes}
                              </p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
