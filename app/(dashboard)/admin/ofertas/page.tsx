"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Plus, 
  MoreVertical, 
  DollarSign, 
  TrendingUp,
  ExternalLink,
  BarChart3,
  GitBranch,
  Package
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface Offer {
  id: string
  name: string
  description: string
  price: number
  type: string
  status: string
  sales_page_url: string
  checkout_url: string
  project_id: string
  created_at: string
  project?: { name: string }
  // Computed
  revenue: number
  sales: number
  leads: number
  conversion: number
}

const typeColors: Record<string, string> = {
  "high_ticket": "bg-purple-500/10 text-purple-500",
  "mentoria": "bg-primary/10 text-primary",
  "low_ticket": "bg-blue-500/10 text-blue-500",
  "servico": "bg-emerald-500/10 text-emerald-500",
  "saas": "bg-cyan-500/10 text-cyan-500",
  "course": "bg-orange-500/10 text-orange-500",
}

const typeLabels: Record<string, string> = {
  "high_ticket": "High Ticket",
  "mentoria": "Mentoria",
  "low_ticket": "Low Ticket",
  "servico": "Servico",
  "saas": "SaaS",
  "course": "Curso",
}

export default function AdminOfertas() {
  const [offers, setOffers] = useState<Offer[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    total: 0,
    totalRevenue: 0,
    totalSales: 0,
    avgTicket: 0,
    totalProfit: 0
  })

  useEffect(() => {
    loadOffers()
  }, [])

  const loadOffers = async () => {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from("offers")
      .select(`
        *,
        project:projects(name)
      `)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error loading offers:", error)
      setLoading(false)
      return
    }

    // Para cada oferta, buscar transacoes relacionadas
    const offersWithMetrics = await Promise.all(
      (data || []).map(async (offer) => {
        const { data: transactions } = await supabase
          .from("transactions")
          .select("amount")
          .eq("offer_id", offer.id)
          .eq("status", "completed")

        const { count: leadsCount } = await supabase
          .from("crm_leads")
          .select("*", { count: "exact", head: true })
          .eq("offer_id", offer.id)

        const revenue = (transactions || []).reduce((sum, t) => sum + (t.amount || 0), 0)
        const sales = transactions?.length || 0
        const leads = leadsCount || 0
        const conversion = leads > 0 ? (sales / leads) * 100 : 0

        return {
          ...offer,
          revenue,
          sales,
          leads,
          conversion
        }
      })
    )

    setOffers(offersWithMetrics)

    // Calculate stats
    const totalRevenue = offersWithMetrics.reduce((sum, o) => sum + o.revenue, 0)
    const totalSales = offersWithMetrics.reduce((sum, o) => sum + o.sales, 0)
    const avgTicket = totalSales > 0 ? totalRevenue / totalSales : 0

    setStats({
      total: offersWithMetrics.length,
      totalRevenue,
      totalSales,
      avgTicket,
      totalProfit: totalRevenue * 0.6 // Estimativa 60% de margem
    })

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
          <h1 className="text-2xl font-bold text-foreground">Ofertas</h1>
          <p className="text-sm text-muted-foreground">Gerencie todas as suas ofertas e produtos</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Nova Oferta
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Total Ofertas</p>
            <p className="text-2xl font-bold text-foreground">{stats.total}</p>
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
            <p className="text-xs text-muted-foreground">Vendas Totais</p>
            <p className="text-2xl font-bold text-foreground">{stats.totalSales.toLocaleString("pt-BR")}</p>
          </CardContent>
        </Card>
        <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Ticket Medio</p>
            <p className="text-2xl font-bold text-foreground">{formatCurrency(stats.avgTicket)}</p>
          </CardContent>
        </Card>
        <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Lucro Total</p>
            <p className="text-2xl font-bold text-emerald-500">{formatCurrency(stats.totalProfit)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Empty State */}
      {offers.length === 0 ? (
        <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
          <CardContent className="p-12 text-center">
            <Package className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Nenhuma oferta ainda</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Crie sua primeira oferta para comecar a vender
            </p>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Criar Primeira Oferta
            </Button>
          </CardContent>
        </Card>
      ) : (
        /* Offers Table */
        <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#1a1a1a]">
                    <th className="text-left p-4 text-xs font-medium text-muted-foreground">Oferta</th>
                    <th className="text-left p-4 text-xs font-medium text-muted-foreground">Tipo</th>
                    <th className="text-left p-4 text-xs font-medium text-muted-foreground">Preco</th>
                    <th className="text-left p-4 text-xs font-medium text-muted-foreground">Receita</th>
                    <th className="text-left p-4 text-xs font-medium text-muted-foreground">Vendas</th>
                    <th className="text-left p-4 text-xs font-medium text-muted-foreground">Conv.</th>
                    <th className="text-left p-4 text-xs font-medium text-muted-foreground">Status</th>
                    <th className="text-left p-4 text-xs font-medium text-muted-foreground">Acoes</th>
                  </tr>
                </thead>
                <tbody>
                  {offers.map((offer) => (
                    <tr key={offer.id} className="border-b border-[#1a1a1a] hover:bg-[#141414] transition-colors">
                      <td className="p-4">
                        <div>
                          <p className="text-sm font-medium text-foreground">{offer.name}</p>
                          <p className="text-xs text-muted-foreground">{offer.project?.name || "Sem projeto"}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`text-xs px-2 py-1 rounded-full ${typeColors[offer.type] || 'bg-gray-500/10 text-gray-500'}`}>
                          {typeLabels[offer.type] || offer.type}
                        </span>
                      </td>
                      <td className="p-4 text-sm font-medium text-foreground">{formatCurrency(offer.price)}</td>
                      <td className="p-4 text-sm font-medium text-emerald-500">{formatCurrency(offer.revenue)}</td>
                      <td className="p-4 text-sm text-foreground">{offer.sales}</td>
                      <td className="p-4 text-sm text-foreground">{offer.conversion.toFixed(1)}%</td>
                      <td className="p-4">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          offer.status === 'active' ? 'bg-emerald-500/10 text-emerald-500' :
                          offer.status === 'draft' ? 'bg-yellow-500/10 text-yellow-500' :
                          'bg-zinc-500/10 text-zinc-500'
                        }`}>
                          {offer.status === 'active' ? 'Ativo' : 
                           offer.status === 'draft' ? 'Rascunho' : offer.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <BarChart3 className="w-3.5 h-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <GitBranch className="w-3.5 h-3.5" />
                          </Button>
                          {offer.sales_page_url && (
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              <ExternalLink className="w-3.5 h-3.5" />
                            </Button>
                          )}
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <MoreVertical className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
