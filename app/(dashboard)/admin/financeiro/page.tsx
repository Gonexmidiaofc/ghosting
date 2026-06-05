"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  CreditCard,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Wallet
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface Transaction {
  id: string
  type: string
  user_id: string
  amount: number
  status: string
  payment_method: string
  created_at: string
  offer?: { name: string }
  user?: { full_name: string; email: string }
}

export default function AdminFinanceiro() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [metrics, setMetrics] = useState({
    totalRevenue: 0,
    recurringRevenue: 0,
    mrr: 0,
    arr: 0,
    churn: 0,
    refunds: 0,
    activeSubscriptions: 0,
    lateSubscriptions: 0,
    avgTicket: 0,
    ltv: 0,
    pendingPayments: 0,
    netProfit: 0
  })
  const [revenueByProduct, setRevenueByProduct] = useState<Array<{
    product: string
    revenue: number
    sales: number
    percent: number
  }>>([])

  useEffect(() => {
    loadFinancialData()
  }, [])

  const loadFinancialData = async () => {
    const supabase = createClient()

    // Buscar transacoes
    const { data: txData } = await supabase
      .from("transactions")
      .select(`
        *,
        offer:offers(name),
        user:profiles(full_name, email)
      `)
      .order("created_at", { ascending: false })
      .limit(20)

    // Buscar assinaturas
    const { count: activeSubsCount } = await supabase
      .from("subscriptions")
      .select("*", { count: "exact", head: true })
      .eq("status", "active")

    const { count: lateSubsCount } = await supabase
      .from("subscriptions")
      .select("*", { count: "exact", head: true })
      .eq("status", "past_due")

    // Calcular metricas
    const allTx = txData || []
    const completedTx = allTx.filter(t => t.status === "completed")
    const refundedTx = allTx.filter(t => t.status === "refunded")
    const pendingTx = allTx.filter(t => t.status === "pending")

    const totalRevenue = completedTx.reduce((sum, t) => sum + (t.amount || 0), 0)
    const refunds = refundedTx.reduce((sum, t) => sum + (t.amount || 0), 0)
    const pendingPayments = pendingTx.reduce((sum, t) => sum + (t.amount || 0), 0)
    const avgTicket = completedTx.length > 0 ? totalRevenue / completedTx.length : 0

    setMetrics({
      totalRevenue,
      recurringRevenue: 0, // Calcular de subscriptions
      mrr: 0,
      arr: 0,
      churn: 0,
      refunds,
      activeSubscriptions: activeSubsCount || 0,
      lateSubscriptions: lateSubsCount || 0,
      avgTicket,
      ltv: avgTicket * 3, // Estimativa
      pendingPayments,
      netProfit: totalRevenue * 0.6
    })

    setTransactions(allTx)
    setLoading(false)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0
    }).format(value)
  }

  const formatDate = (date: string) => {
    const d = new Date(date)
    const now = new Date()
    const diff = now.getTime() - d.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    
    if (days === 0) return `Hoje, ${d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}`
    if (days === 1) return `Ontem, ${d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}`
    return `${days} dias atras`
  }

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  const metricCards = [
    { label: "Receita Total", value: formatCurrency(metrics.totalRevenue), icon: DollarSign, positive: true },
    { label: "MRR", value: formatCurrency(metrics.mrr), icon: TrendingUp, positive: true },
    { label: "ARR", value: formatCurrency(metrics.arr), icon: TrendingUp, positive: true },
    { label: "Reembolsos", value: formatCurrency(metrics.refunds), icon: AlertCircle, positive: metrics.refunds === 0 },
    { label: "Assinaturas Ativas", value: metrics.activeSubscriptions.toString(), icon: CheckCircle, positive: true },
    { label: "Assinaturas Atrasadas", value: metrics.lateSubscriptions.toString(), icon: Clock, positive: metrics.lateSubscriptions === 0 },
    { label: "Ticket Medio", value: formatCurrency(metrics.avgTicket), icon: DollarSign, positive: true },
    { label: "LTV Estimado", value: formatCurrency(metrics.ltv), icon: TrendingUp, positive: true },
    { label: "Pagamentos Pendentes", value: formatCurrency(metrics.pendingPayments), icon: Clock, positive: false },
    { label: "Lucro Liquido", value: formatCurrency(metrics.netProfit), icon: DollarSign, positive: true },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Financeiro</h1>
          <p className="text-sm text-muted-foreground">Visao geral financeira da operacao</p>
        </div>
        <div className="flex items-center gap-2">
          <select className="bg-[#141414] border border-[#1a1a1a] rounded-lg px-3 py-2 text-sm text-foreground">
            <option>Este mes</option>
            <option>Ultimo mes</option>
            <option>Ultimos 3 meses</option>
            <option>Este ano</option>
          </select>
          <Button variant="outline" className="border-[#1a1a1a]">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {metricCards.slice(0, 5).map((metric) => (
          <Card key={metric.label} className="bg-[#0d0d0d] border-[#1a1a1a]">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 mb-1">
                <metric.icon className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-[10px] text-muted-foreground truncate">{metric.label}</span>
              </div>
              <p className={`text-lg font-bold ${metric.positive ? 'text-foreground' : 'text-red-500'}`}>
                {metric.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {metricCards.slice(5, 10).map((metric) => (
          <Card key={metric.label} className="bg-[#0d0d0d] border-[#1a1a1a]">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 mb-1">
                <metric.icon className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-[10px] text-muted-foreground truncate">{metric.label}</span>
              </div>
              <p className={`text-lg font-bold ${metric.positive ? 'text-foreground' : 'text-red-500'}`}>
                {metric.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Transacoes */}
      <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Transacoes Recentes</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {transactions.length === 0 ? (
            <div className="p-12 text-center">
              <Wallet className="w-12 h-12 mx-auto text-muted-foreground/30 mb-4" />
              <p className="text-sm text-muted-foreground">Nenhuma transacao ainda</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#1a1a1a]">
                    <th className="text-left p-3 text-[10px] font-medium text-muted-foreground">Tipo</th>
                    <th className="text-left p-3 text-[10px] font-medium text-muted-foreground">Cliente</th>
                    <th className="text-left p-3 text-[10px] font-medium text-muted-foreground">Produto</th>
                    <th className="text-left p-3 text-[10px] font-medium text-muted-foreground">Valor</th>
                    <th className="text-left p-3 text-[10px] font-medium text-muted-foreground">Status</th>
                    <th className="text-left p-3 text-[10px] font-medium text-muted-foreground">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="border-b border-[#1a1a1a] hover:bg-[#141414]">
                      <td className="p-3">
                        <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                          tx.type === 'sale' ? 'bg-emerald-500/10 text-emerald-500' :
                          tx.type === 'recurring' ? 'bg-blue-500/10 text-blue-500' :
                          tx.type === 'refund' ? 'bg-red-500/10 text-red-500' :
                          'bg-yellow-500/10 text-yellow-500'
                        }`}>
                          {tx.type === 'sale' ? 'Venda' :
                           tx.type === 'recurring' ? 'Recorrencia' :
                           tx.type === 'refund' ? 'Reembolso' : tx.type}
                        </span>
                      </td>
                      <td className="p-3 text-xs text-foreground">
                        {tx.user?.full_name || tx.user?.email || "N/A"}
                      </td>
                      <td className="p-3 text-xs text-muted-foreground">
                        {tx.offer?.name || "N/A"}
                      </td>
                      <td className={`p-3 text-xs font-medium ${
                        tx.type === 'refund' ? 'text-red-500' : 'text-emerald-500'
                      }`}>
                        {tx.type === 'refund' ? '-' : ''}{formatCurrency(tx.amount)}
                      </td>
                      <td className="p-3">
                        <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                          tx.status === 'completed' ? 'bg-emerald-500/10 text-emerald-500' :
                          tx.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' :
                          tx.status === 'refunded' ? 'bg-blue-500/10 text-blue-500' :
                          'bg-red-500/10 text-red-500'
                        }`}>
                          {tx.status === 'completed' ? 'Aprovado' :
                           tx.status === 'pending' ? 'Pendente' :
                           tx.status === 'refunded' ? 'Reembolsado' :
                           tx.status === 'failed' ? 'Falhou' : tx.status}
                        </span>
                      </td>
                      <td className="p-3 text-xs text-muted-foreground">
                        {formatDate(tx.created_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
