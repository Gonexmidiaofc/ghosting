"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign,
  Eye,
  MousePointer,
  ShoppingCart,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface Metric {
  name: string
  value: string
  change: string
  trend: "up" | "down"
  icon: React.ElementType
}

export default function MetricasPage() {
  const [metrics, setMetrics] = useState<Metric[]>([])
  const [monthlyData, setMonthlyData] = useState<number[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadMetrics()
  }, [])

  const loadMetrics = async () => {
    const supabase = createClient()

    // Buscar dados reais
    const [
      { count: visitorsCount },
      { count: leadsCount },
      { count: conversionsCount },
      { data: transactions }
    ] = await Promise.all([
      supabase.from("page_views").select("*", { count: "exact", head: true }),
      supabase.from("crm_leads").select("*", { count: "exact", head: true }),
      supabase.from("conversions").select("*", { count: "exact", head: true }),
      supabase.from("transactions").select("amount").eq("status", "completed")
    ])

    const totalRevenue = (transactions || []).reduce((sum, t) => sum + (t.amount || 0), 0)
    const conversionRate = (visitorsCount || 0) > 0 
      ? ((conversionsCount || 0) / (visitorsCount || 1)) * 100 
      : 0

    const realMetrics: Metric[] = [
      { name: "Visitantes", value: (visitorsCount || 0).toLocaleString("pt-BR"), change: "-", trend: "up", icon: Eye },
      { name: "Cliques", value: "0", change: "-", trend: "up", icon: MousePointer },
      { name: "Conversoes", value: (conversionsCount || 0).toLocaleString("pt-BR"), change: "-", trend: "up", icon: ShoppingCart },
      { name: "Taxa CVR", value: `${conversionRate.toFixed(2)}%`, change: "-", trend: "up", icon: TrendingUp },
      { name: "Leads", value: (leadsCount || 0).toLocaleString("pt-BR"), change: "-", trend: "up", icon: Users },
      { name: "Receita", value: new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 0 }).format(totalRevenue), change: "-", trend: "up", icon: DollarSign },
    ]

    setMetrics(realMetrics)

    // Dados mensais (inicialmente zerados)
    setMonthlyData([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])

    setLoading(false)
  }

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Metricas</h1>
        <p className="text-muted-foreground">Acompanhe todas as metricas do seu negocio</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric) => (
          <Card key={metric.name} className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.name}
              </CardTitle>
              <metric.icon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{metric.value}</div>
              {metric.change !== "-" && (
                <div className={`flex items-center text-xs mt-1 ${
                  metric.trend === "up" ? "text-green-500" : "text-red-500"
                }`}>
                  {metric.trend === "up" ? (
                    <ArrowUpRight className="w-3 h-3 mr-1" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3 mr-1" />
                  )}
                  {metric.change} vs mes anterior
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Grafico */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Evolucao Mensal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-end justify-around gap-2">
            {monthlyData.map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div 
                  className="w-full bg-[#1a1a1a] rounded-t relative overflow-hidden"
                  style={{ height: height > 0 ? `${height}%` : '4px', minHeight: '4px' }}
                >
                  {height > 0 && (
                    <div 
                      className="absolute bottom-0 w-full bg-primary rounded-t"
                      style={{ height: `${height * 0.7}%` }}
                    />
                  )}
                </div>
                <span className="text-[10px] text-muted-foreground">
                  {["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"][i]}
                </span>
              </div>
            ))}
          </div>
          {monthlyData.every(v => v === 0) && (
            <p className="text-center text-sm text-muted-foreground mt-4">
              Nenhum dado disponivel ainda
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
