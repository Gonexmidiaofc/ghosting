"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  ShoppingCart,
  Target,
  BarChart3,
  Percent,
  Clock,
  BookOpen,
  MessageSquare,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Loader2
} from "lucide-react"

interface DashboardStats {
  faturamentoTotal: number
  mrr: number
  arr: number
  receitaMes: number
  vendasHoje: number
  leadsCapturados: number
  conversoes: number
  roasGeral: number
  cacMedio: number
  cpaMedio: number
  ltvMedio: number
  churn: number
  retencao: number
  alunosAtivos: number
  aulasConcluidas: number
  engajamento: number
}

interface RecentActivity {
  id: string
  action: string
  detail: string
  time: string
  type: "sale" | "lead" | "progress" | "upgrade" | "refund" | "signup"
}

export default function AdminOverview() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<DashboardStats>({
    faturamentoTotal: 0,
    mrr: 0,
    arr: 0,
    receitaMes: 0,
    vendasHoje: 0,
    leadsCapturados: 0,
    conversoes: 0,
    roasGeral: 0,
    cacMedio: 0,
    cpaMedio: 0,
    ltvMedio: 0,
    churn: 0,
    retencao: 0,
    alunosAtivos: 0,
    aulasConcluidas: 0,
    engajamento: 0
  })
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([])
  const [revenueData, setRevenueData] = useState<{ month: string; value: number }[]>([])

  useEffect(() => {
    const fetchDashboardData = async () => {
      const supabase = createClient()
      
      try {
        // Buscar transacoes para calcular metricas financeiras
        const { data: transactions } = await supabase
          .from("transactions")
          .select("*")
          .eq("status", "completed")
        
        // Buscar leads
        const { data: leads } = await supabase
          .from("crm_leads")
          .select("*")
        
        // Buscar conversoes
        const { data: conversions } = await supabase
          .from("conversions")
          .select("*")
        
        // Buscar alunos ativos (usuarios com role 'user' e status 'active')
        const { data: students } = await supabase
          .from("profiles")
          .select("*")
          .eq("role", "user")
          .eq("status", "active")
        
        // Buscar progresso de aulas
        const { data: progress } = await supabase
          .from("student_progress")
          .select("*")
          .eq("completed", true)
        
        // Buscar atividades recentes (security_logs, transactions, leads)
        const { data: securityLogs } = await supabase
          .from("security_logs")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(10)
        
        // Calcular estatisticas
        const faturamentoTotal = transactions?.reduce((sum, t) => sum + (t.amount || 0), 0) || 0
        const vendasHoje = transactions?.filter(t => {
          const today = new Date().toISOString().split('T')[0]
          return t.created_at?.startsWith(today)
        }).length || 0
        
        const mesAtual = new Date().getMonth()
        const anoAtual = new Date().getFullYear()
        const transacoesMes = transactions?.filter(t => {
          const date = new Date(t.created_at)
          return date.getMonth() === mesAtual && date.getFullYear() === anoAtual
        }) || []
        const receitaMes = transacoesMes.reduce((sum, t) => sum + (t.amount || 0), 0)
        
        // MRR (considerando subscriptions ativas)
        const { data: subscriptions } = await supabase
          .from("subscriptions")
          .select("*")
          .eq("status", "active")
        
        const mrr = subscriptions?.reduce((sum, s) => {
          if (s.billing_cycle === "monthly") return sum + (s.price || 0)
          if (s.billing_cycle === "yearly") return sum + ((s.price || 0) / 12)
          return sum
        }, 0) || 0
        
        setStats({
          faturamentoTotal,
          mrr,
          arr: mrr * 12,
          receitaMes,
          vendasHoje,
          leadsCapturados: leads?.length || 0,
          conversoes: conversions?.length || 0,
          roasGeral: 0,
          cacMedio: 0,
          cpaMedio: 0,
          ltvMedio: 0,
          churn: 0,
          retencao: 100,
          alunosAtivos: students?.length || 0,
          aulasConcluidas: progress?.length || 0,
          engajamento: 0
        })
        
        // Montar atividades recentes
        const activities: RecentActivity[] = []
        
        securityLogs?.forEach(log => {
          let action = ""
          let type: RecentActivity["type"] = "signup"
          
          if (log.event_type === "login_success") {
            action = "Login realizado"
            type = "signup"
          } else if (log.event_type === "login_failed") {
            action = "Tentativa de login"
            type = "refund"
          } else if (log.event_type === "signup") {
            action = "Novo cadastro"
            type = "lead"
          } else {
            action = log.event_type
          }
          
          const timeAgo = getTimeAgo(new Date(log.created_at))
          
          activities.push({
            id: log.id,
            action,
            detail: log.details?.email || log.endpoint || "-",
            time: timeAgo,
            type
          })
        })
        
        setRecentActivity(activities.slice(0, 6))
        
        // Montar dados do grafico de receita por mes
        const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
        const revenueByMonth = months.map((month, index) => {
          const monthTransactions = transactions?.filter(t => {
            const date = new Date(t.created_at)
            return date.getMonth() === index && date.getFullYear() === anoAtual
          }) || []
          return {
            month,
            value: monthTransactions.reduce((sum, t) => sum + (t.amount || 0), 0)
          }
        })
        setRevenueData(revenueByMonth)
        
      } catch (error) {
        console.error("Erro ao buscar dados:", error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchDashboardData()
  }, [])
  
  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)
    if (seconds < 60) return `${seconds} seg`
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes} min`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h`
    const days = Math.floor(hours / 24)
    return `${days}d`
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  const metrics = [
    { label: "Faturamento Total", value: formatCurrency(stats.faturamentoTotal), change: "-", positive: true, icon: DollarSign },
    { label: "MRR", value: formatCurrency(stats.mrr), change: "-", positive: true, icon: TrendingUp },
    { label: "ARR", value: formatCurrency(stats.arr), change: "-", positive: true, icon: BarChart3 },
    { label: "Receita do Mes", value: formatCurrency(stats.receitaMes), change: "-", positive: true, icon: DollarSign },
    { label: "Vendas Hoje", value: stats.vendasHoje.toString(), change: "-", positive: true, icon: ShoppingCart },
    { label: "Leads Capturados", value: stats.leadsCapturados.toString(), change: "-", positive: true, icon: Target },
    { label: "Conversoes", value: stats.conversoes.toString(), change: "-", positive: true, icon: Percent },
    { label: "ROAS Geral", value: stats.roasGeral > 0 ? `${stats.roasGeral.toFixed(2)}x` : "-", change: "-", positive: true, icon: TrendingUp },
    { label: "CAC Medio", value: stats.cacMedio > 0 ? formatCurrency(stats.cacMedio) : "-", change: "-", positive: true, icon: DollarSign },
    { label: "CPA Medio", value: stats.cpaMedio > 0 ? formatCurrency(stats.cpaMedio) : "-", change: "-", positive: true, icon: Target },
    { label: "LTV Medio", value: stats.ltvMedio > 0 ? formatCurrency(stats.ltvMedio) : "-", change: "-", positive: true, icon: Users },
    { label: "Churn", value: stats.churn > 0 ? `${stats.churn.toFixed(1)}%` : "0%", change: "-", positive: true, icon: ArrowDownRight },
    { label: "Retencao", value: `${stats.retencao.toFixed(1)}%`, change: "-", positive: true, icon: Clock },
    { label: "Alunos Ativos", value: stats.alunosAtivos.toString(), change: "-", positive: true, icon: Users },
    { label: "Aulas Concluidas", value: stats.aulasConcluidas.toString(), change: "-", positive: true, icon: BookOpen },
    { label: "Engajamento", value: stats.engajamento > 0 ? `${stats.engajamento}%` : "-", change: "-", positive: true, icon: MessageSquare },
  ]

  const maxRevenue = Math.max(...revenueData.map(d => d.value), 1)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Overview</h1>
          <p className="text-sm text-muted-foreground">Visao geral da operacao GHOST.SYSTEM</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 rounded-lg">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-xs text-emerald-500 font-medium">Sistema Online</span>
          </div>
          <select className="bg-[#141414] border border-[#1a1a1a] rounded-lg px-3 py-2 text-sm text-foreground">
            <option>Ultimos 30 dias</option>
            <option>Ultimos 7 dias</option>
            <option>Este mes</option>
            <option>Este ano</option>
          </select>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
        {metrics.slice(0, 8).map((metric) => (
          <Card key={metric.label} className="bg-[#0d0d0d] border-[#1a1a1a] hover:border-[#2a2a2a] transition-colors">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 mb-1">
                <metric.icon className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-[10px] text-muted-foreground truncate">{metric.label}</span>
              </div>
              <p className="text-lg font-bold text-foreground">{metric.value}</p>
              {metric.change !== "-" && (
                <div className={`flex items-center gap-1 text-[10px] ${metric.positive ? 'text-emerald-500' : 'text-red-500'}`}>
                  {metric.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {metric.change}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Second Row Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
        {metrics.slice(8, 16).map((metric) => (
          <Card key={metric.label} className="bg-[#0d0d0d] border-[#1a1a1a] hover:border-[#2a2a2a] transition-colors">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 mb-1">
                <metric.icon className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-[10px] text-muted-foreground truncate">{metric.label}</span>
              </div>
              <p className="text-lg font-bold text-foreground">{metric.value}</p>
              {metric.change !== "-" && (
                <div className={`flex items-center gap-1 text-[10px] ${metric.positive ? 'text-emerald-500' : 'text-red-500'}`}>
                  {metric.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {metric.change}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <Card className="bg-[#0d0d0d] border-[#1a1a1a] lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              Receita por Periodo
              <span className="text-xs text-muted-foreground font-normal">{new Date().getFullYear()}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 flex items-end gap-1">
              {revenueData.length > 0 ? revenueData.map((data) => (
                <div key={data.month} className="flex-1 flex flex-col items-center gap-1">
                  <div 
                    className="w-full bg-primary/80 rounded-t hover:bg-primary transition-colors cursor-pointer relative group"
                    style={{ height: `${(data.value / maxRevenue) * 160}px`, minHeight: data.value > 0 ? '4px' : '0px' }}
                  >
                    {data.value > 0 && (
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#1a1a1a] px-2 py-1 rounded text-[10px] text-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {formatCurrency(data.value)}
                      </div>
                    )}
                  </div>
                  <span className="text-[9px] text-muted-foreground">{data.month}</span>
                </div>
              )) : (
                <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
                  Nenhum dado disponivel
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Activity Feed */}
        <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              Atividade em Tempo Real
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 max-h-[220px] overflow-y-auto">
            {recentActivity.length > 0 ? recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-2 p-2 bg-[#141414] rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-1.5 ${
                  activity.type === 'sale' ? 'bg-emerald-500' :
                  activity.type === 'lead' ? 'bg-blue-500' :
                  activity.type === 'progress' ? 'bg-purple-500' :
                  activity.type === 'upgrade' ? 'bg-primary' :
                  activity.type === 'signup' ? 'bg-cyan-500' :
                  'bg-red-500'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground">{activity.action}</p>
                  <p className="text-[10px] text-muted-foreground truncate">{activity.detail}</p>
                </div>
                <span className="text-[10px] text-muted-foreground">{activity.time}</span>
              </div>
            )) : (
              <div className="flex items-center justify-center h-32 text-muted-foreground text-sm">
                Nenhuma atividade recente
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row - Empty State */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leads by Channel */}
        <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Leads por Canal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-32 text-muted-foreground text-sm">
              Sem dados de leads
            </div>
          </CardContent>
        </Card>

        {/* Conversions by Funnel */}
        <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Conversoes por Funil</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-32 text-muted-foreground text-sm">
              Sem dados de conversao
            </div>
          </CardContent>
        </Card>

        {/* ROAS by Offer */}
        <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">ROAS por Oferta</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-32 text-muted-foreground text-sm">
              Sem dados de ROAS
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
