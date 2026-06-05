"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Plus, 
  MoreVertical, 
  DollarSign, 
  Users, 
  TrendingUp, 
  Edit,
  Archive,
  BarChart3,
  FolderOpen
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface Project {
  id: string
  name: string
  description: string
  category: string
  status: string
  created_at: string
  // Computed metrics
  revenue: number
  leads: number
  roas: number
  funnels: number
  offers: number
  campaigns: number
  pixels: number
  automations: number
}

export default function AdminProjetos() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalRevenue: 0,
    totalLeads: 0,
    avgRoas: 0
  })

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    const supabase = createClient()
    
    // Buscar projetos reais
    const { data: projectsData, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error loading projects:", error)
      setLoading(false)
      return
    }

    // Para cada projeto, buscar metricas relacionadas
    const projectsWithMetrics = await Promise.all(
      (projectsData || []).map(async (project) => {
        // Buscar contagens relacionadas
        const [
          { count: funnelsCount },
          { count: offersCount },
          { count: leadsCount },
          { count: pixelsCount },
          { count: automationsCount },
          { data: transactionsData }
        ] = await Promise.all([
          supabase.from("funnels").select("*", { count: "exact", head: true }).eq("project_id", project.id),
          supabase.from("offers").select("*", { count: "exact", head: true }).eq("project_id", project.id),
          supabase.from("crm_leads").select("*", { count: "exact", head: true }).eq("project_id", project.id),
          supabase.from("pixels").select("*", { count: "exact", head: true }).eq("project_id", project.id),
          supabase.from("automations").select("*", { count: "exact", head: true }).eq("project_id", project.id),
          supabase.from("transactions").select("amount").eq("project_id", project.id).eq("status", "completed")
        ])

        const revenue = (transactionsData || []).reduce((sum, t) => sum + (t.amount || 0), 0)

        return {
          ...project,
          revenue,
          leads: leadsCount || 0,
          roas: 0, // Calculado depois quando tiver dados de ad spend
          funnels: funnelsCount || 0,
          offers: offersCount || 0,
          campaigns: 0, // Futuro: quando tiver tabela de campanhas
          pixels: pixelsCount || 0,
          automations: automationsCount || 0
        }
      })
    )

    setProjects(projectsWithMetrics)

    // Calcular stats totais
    const totalRevenue = projectsWithMetrics.reduce((sum, p) => sum + p.revenue, 0)
    const totalLeads = projectsWithMetrics.reduce((sum, p) => sum + p.leads, 0)

    setStats({
      totalProjects: projectsWithMetrics.length,
      totalRevenue,
      totalLeads,
      avgRoas: 0
    })

    setLoading(false)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
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
          <h1 className="text-2xl font-bold text-foreground">Projetos</h1>
          <p className="text-sm text-muted-foreground">Gerencie todos os seus projetos e operacoes</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Novo Projeto
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Total Projetos</p>
            <p className="text-2xl font-bold text-foreground">{stats.totalProjects}</p>
          </CardContent>
        </Card>
        <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Receita Total</p>
            <p className="text-2xl font-bold text-foreground">{formatCurrency(stats.totalRevenue)}</p>
          </CardContent>
        </Card>
        <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Leads Totais</p>
            <p className="text-2xl font-bold text-foreground">{stats.totalLeads.toLocaleString("pt-BR")}</p>
          </CardContent>
        </Card>
        <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">ROAS Medio</p>
            <p className="text-2xl font-bold text-primary">{stats.avgRoas > 0 ? `${stats.avgRoas.toFixed(1)}x` : "-"}</p>
          </CardContent>
        </Card>
      </div>

      {/* Empty State */}
      {projects.length === 0 ? (
        <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
          <CardContent className="p-12 text-center">
            <FolderOpen className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Nenhum projeto ainda</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Crie seu primeiro projeto para comecar a gerenciar suas operacoes
            </p>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Criar Primeiro Projeto
            </Button>
          </CardContent>
        </Card>
      ) : (
        /* Projects Grid */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {projects.map((project) => (
            <Card key={project.id} className="bg-[#0d0d0d] border-[#1a1a1a] hover:border-[#2a2a2a] transition-colors">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-base font-semibold">{project.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">{project.category || "Sem categoria"}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                        project.status === 'active' ? 'bg-emerald-500/10 text-emerald-500' : 
                        project.status === 'paused' ? 'bg-yellow-500/10 text-yellow-500' :
                        'bg-zinc-500/10 text-zinc-500'
                      }`}>
                        {project.status === 'active' ? 'Ativo' : 
                         project.status === 'paused' ? 'Pausado' : 
                         project.status === 'archived' ? 'Arquivado' : project.status}
                      </span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Metrics */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-2 bg-[#141414] rounded-lg">
                    <DollarSign className="w-4 h-4 mx-auto text-emerald-500 mb-1" />
                    <p className="text-sm font-bold text-foreground">{formatCurrency(project.revenue)}</p>
                    <p className="text-[10px] text-muted-foreground">Receita</p>
                  </div>
                  <div className="text-center p-2 bg-[#141414] rounded-lg">
                    <Users className="w-4 h-4 mx-auto text-blue-500 mb-1" />
                    <p className="text-sm font-bold text-foreground">{project.leads}</p>
                    <p className="text-[10px] text-muted-foreground">Leads</p>
                  </div>
                  <div className="text-center p-2 bg-[#141414] rounded-lg">
                    <TrendingUp className="w-4 h-4 mx-auto text-primary mb-1" />
                    <p className="text-sm font-bold text-foreground">{project.roas > 0 ? `${project.roas.toFixed(1)}x` : "-"}</p>
                    <p className="text-[10px] text-muted-foreground">ROAS</p>
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-5 gap-2 text-center">
                  <div>
                    <p className="text-xs font-medium text-foreground">{project.funnels}</p>
                    <p className="text-[9px] text-muted-foreground">Funis</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-foreground">{project.offers}</p>
                    <p className="text-[9px] text-muted-foreground">Ofertas</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-foreground">{project.campaigns}</p>
                    <p className="text-[9px] text-muted-foreground">Campanhas</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-foreground">{project.pixels}</p>
                    <p className="text-[9px] text-muted-foreground">Pixels</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-foreground">{project.automations}</p>
                    <p className="text-[9px] text-muted-foreground">Automacoes</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-2 border-t border-[#1a1a1a]">
                  <Button variant="ghost" size="sm" className="flex-1 h-8 text-xs">
                    <Edit className="w-3 h-3 mr-1" /> Editar
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1 h-8 text-xs">
                    <BarChart3 className="w-3 h-3 mr-1" /> Dashboard
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1 h-8 text-xs">
                    <Archive className="w-3 h-3 mr-1" /> Arquivar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
