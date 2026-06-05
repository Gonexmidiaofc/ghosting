"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Plus, 
  DollarSign, 
  Eye, 
  MousePointer, 
  Users, 
  ShoppingCart,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Filter
} from "lucide-react"

const channels = [
  {
    name: "Meta Ads",
    investment: "R$ 45.670",
    impressions: "2.3M",
    reach: "1.8M",
    clicks: 34567,
    ctr: "1.5%",
    cpc: "R$ 1.32",
    cpm: "R$ 19.86",
    leads: 2847,
    cpl: "R$ 16.04",
    sales: 312,
    cpa: "R$ 146.38",
    revenue: "R$ 423.000",
    roas: "9.26x",
    profit: "R$ 377.330",
    status: "Ativo"
  },
  {
    name: "Google Ads",
    investment: "R$ 23.450",
    impressions: "890K",
    reach: "670K",
    clicks: 12345,
    ctr: "1.4%",
    cpc: "R$ 1.90",
    cpm: "R$ 26.35",
    leads: 987,
    cpl: "R$ 23.76",
    sales: 98,
    cpa: "R$ 239.29",
    revenue: "R$ 156.000",
    roas: "6.65x",
    profit: "R$ 132.550",
    status: "Ativo"
  },
  {
    name: "TikTok Ads",
    investment: "R$ 12.340",
    impressions: "4.5M",
    reach: "3.2M",
    clicks: 67890,
    ctr: "1.5%",
    cpc: "R$ 0.18",
    cpm: "R$ 2.74",
    leads: 1234,
    cpl: "R$ 10.00",
    sales: 67,
    cpa: "R$ 184.18",
    revenue: "R$ 89.000",
    roas: "7.21x",
    profit: "R$ 76.660",
    status: "Ativo"
  },
  {
    name: "Organico",
    investment: "R$ 0",
    impressions: "156K",
    reach: "89K",
    clicks: 8934,
    ctr: "5.7%",
    cpc: "R$ 0",
    cpm: "R$ 0",
    leads: 567,
    cpl: "R$ 0",
    sales: 45,
    cpa: "R$ 0",
    revenue: "R$ 67.000",
    roas: "∞",
    profit: "R$ 67.000",
    status: "Ativo"
  },
  {
    name: "Email",
    investment: "R$ 890",
    impressions: "45K",
    reach: "23K",
    clicks: 4567,
    ctr: "10.1%",
    cpc: "R$ 0.19",
    cpm: "R$ 19.78",
    leads: 234,
    cpl: "R$ 3.80",
    sales: 34,
    cpa: "R$ 26.18",
    revenue: "R$ 45.000",
    roas: "50.56x",
    profit: "R$ 44.110",
    status: "Ativo"
  },
]

const campaigns = [
  { name: "[CONV] VSL Elite - LAL 1%", channel: "Meta Ads", status: "Ativo", spend: "R$ 12.340", leads: 456, sales: 34, cpa: "R$ 363", roas: "8.2x" },
  { name: "[CONV] VSL Elite - INT Trafego", channel: "Meta Ads", status: "Ativo", spend: "R$ 8.760", leads: 312, sales: 28, cpa: "R$ 313", roas: "7.8x" },
  { name: "[CONV] Low Ticket - Broad", channel: "Meta Ads", status: "Ativo", spend: "R$ 5.430", leads: 567, sales: 89, cpa: "R$ 61", roas: "5.4x" },
  { name: "[CONV] High Ticket - Search", channel: "Google Ads", status: "Ativo", spend: "R$ 7.890", leads: 234, sales: 23, cpa: "R$ 343", roas: "6.2x" },
  { name: "[CONV] Brand - Search", channel: "Google Ads", status: "Pausado", spend: "R$ 2.340", leads: 89, sales: 12, cpa: "R$ 195", roas: "4.8x" },
  { name: "[LEAD] TikTok - Viral", channel: "TikTok Ads", status: "Ativo", spend: "R$ 4.560", leads: 890, sales: 34, cpa: "R$ 134", roas: "3.2x" },
]

export default function AdminTrafego() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Trafego</h1>
          <p className="text-sm text-muted-foreground">Dashboard de performance de trafego pago e organico</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-[#1a1a1a]">
            <Filter className="w-4 h-4 mr-2" />
            Filtros
          </Button>
          <select className="bg-[#141414] border border-[#1a1a1a] rounded-lg px-3 py-2 text-sm text-foreground">
            <option>Todos os Projetos</option>
            <option>Metodo G.H.O.S.T</option>
            <option>Done4You Services</option>
          </select>
          <select className="bg-[#141414] border border-[#1a1a1a] rounded-lg px-3 py-2 text-sm text-foreground">
            <option>Ultimos 30 dias</option>
            <option>Ultimos 7 dias</option>
            <option>Este mes</option>
          </select>
        </div>
      </div>

      {/* Main Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
          <CardContent className="p-3">
            <p className="text-[10px] text-muted-foreground">Investimento</p>
            <p className="text-lg font-bold text-foreground">R$ 82.350</p>
            <div className="flex items-center gap-1 text-[10px] text-emerald-500">
              <ArrowUpRight className="w-3 h-3" /> +12.3%
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
          <CardContent className="p-3">
            <p className="text-[10px] text-muted-foreground">Impressoes</p>
            <p className="text-lg font-bold text-foreground">8.9M</p>
            <div className="flex items-center gap-1 text-[10px] text-emerald-500">
              <ArrowUpRight className="w-3 h-3" /> +8.7%
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
          <CardContent className="p-3">
            <p className="text-[10px] text-muted-foreground">Cliques</p>
            <p className="text-lg font-bold text-foreground">128.3K</p>
            <div className="flex items-center gap-1 text-[10px] text-emerald-500">
              <ArrowUpRight className="w-3 h-3" /> +15.2%
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
          <CardContent className="p-3">
            <p className="text-[10px] text-muted-foreground">Leads</p>
            <p className="text-lg font-bold text-foreground">5.869</p>
            <div className="flex items-center gap-1 text-[10px] text-emerald-500">
              <ArrowUpRight className="w-3 h-3" /> +18.4%
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
          <CardContent className="p-3">
            <p className="text-[10px] text-muted-foreground">Vendas</p>
            <p className="text-lg font-bold text-foreground">556</p>
            <div className="flex items-center gap-1 text-[10px] text-emerald-500">
              <ArrowUpRight className="w-3 h-3" /> +23.1%
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
          <CardContent className="p-3">
            <p className="text-[10px] text-muted-foreground">Receita</p>
            <p className="text-lg font-bold text-emerald-500">R$ 780K</p>
            <div className="flex items-center gap-1 text-[10px] text-emerald-500">
              <ArrowUpRight className="w-3 h-3" /> +31.2%
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
          <CardContent className="p-3">
            <p className="text-[10px] text-muted-foreground">ROAS</p>
            <p className="text-lg font-bold text-primary">9.47x</p>
            <div className="flex items-center gap-1 text-[10px] text-emerald-500">
              <ArrowUpRight className="w-3 h-3" /> +1.2x
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Channels */}
      <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Performance por Canal</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1a1a1a]">
                  <th className="text-left p-3 text-[10px] font-medium text-muted-foreground">Canal</th>
                  <th className="text-left p-3 text-[10px] font-medium text-muted-foreground">Investimento</th>
                  <th className="text-left p-3 text-[10px] font-medium text-muted-foreground">Impressoes</th>
                  <th className="text-left p-3 text-[10px] font-medium text-muted-foreground">Cliques</th>
                  <th className="text-left p-3 text-[10px] font-medium text-muted-foreground">CTR</th>
                  <th className="text-left p-3 text-[10px] font-medium text-muted-foreground">Leads</th>
                  <th className="text-left p-3 text-[10px] font-medium text-muted-foreground">CPL</th>
                  <th className="text-left p-3 text-[10px] font-medium text-muted-foreground">Vendas</th>
                  <th className="text-left p-3 text-[10px] font-medium text-muted-foreground">CPA</th>
                  <th className="text-left p-3 text-[10px] font-medium text-muted-foreground">Receita</th>
                  <th className="text-left p-3 text-[10px] font-medium text-muted-foreground">ROAS</th>
                </tr>
              </thead>
              <tbody>
                {channels.map((channel) => (
                  <tr key={channel.name} className="border-b border-[#1a1a1a] hover:bg-[#141414]">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          channel.name === 'Meta Ads' ? 'bg-blue-500' :
                          channel.name === 'Google Ads' ? 'bg-red-500' :
                          channel.name === 'TikTok Ads' ? 'bg-cyan-500' :
                          channel.name === 'Organico' ? 'bg-emerald-500' :
                          'bg-purple-500'
                        }`} />
                        <span className="text-xs font-medium text-foreground">{channel.name}</span>
                      </div>
                    </td>
                    <td className="p-3 text-xs text-foreground">{channel.investment}</td>
                    <td className="p-3 text-xs text-foreground">{channel.impressions}</td>
                    <td className="p-3 text-xs text-foreground">{channel.clicks.toLocaleString()}</td>
                    <td className="p-3 text-xs text-foreground">{channel.ctr}</td>
                    <td className="p-3 text-xs text-foreground">{channel.leads.toLocaleString()}</td>
                    <td className="p-3 text-xs text-foreground">{channel.cpl}</td>
                    <td className="p-3 text-xs text-foreground">{channel.sales}</td>
                    <td className="p-3 text-xs text-foreground">{channel.cpa}</td>
                    <td className="p-3 text-xs font-medium text-emerald-500">{channel.revenue}</td>
                    <td className="p-3 text-xs font-bold text-primary">{channel.roas}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Campaigns */}
      <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm">Campanhas Ativas</CardTitle>
            <Button variant="ghost" size="sm" className="text-xs">Ver todas</Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1a1a1a]">
                  <th className="text-left p-3 text-[10px] font-medium text-muted-foreground">Campanha</th>
                  <th className="text-left p-3 text-[10px] font-medium text-muted-foreground">Canal</th>
                  <th className="text-left p-3 text-[10px] font-medium text-muted-foreground">Status</th>
                  <th className="text-left p-3 text-[10px] font-medium text-muted-foreground">Gasto</th>
                  <th className="text-left p-3 text-[10px] font-medium text-muted-foreground">Leads</th>
                  <th className="text-left p-3 text-[10px] font-medium text-muted-foreground">Vendas</th>
                  <th className="text-left p-3 text-[10px] font-medium text-muted-foreground">CPA</th>
                  <th className="text-left p-3 text-[10px] font-medium text-muted-foreground">ROAS</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((campaign, i) => (
                  <tr key={i} className="border-b border-[#1a1a1a] hover:bg-[#141414]">
                    <td className="p-3 text-xs font-medium text-foreground">{campaign.name}</td>
                    <td className="p-3 text-xs text-muted-foreground">{campaign.channel}</td>
                    <td className="p-3">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                        campaign.status === 'Ativo' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-yellow-500/10 text-yellow-500'
                      }`}>
                        {campaign.status}
                      </span>
                    </td>
                    <td className="p-3 text-xs text-foreground">{campaign.spend}</td>
                    <td className="p-3 text-xs text-foreground">{campaign.leads}</td>
                    <td className="p-3 text-xs text-foreground">{campaign.sales}</td>
                    <td className="p-3 text-xs text-foreground">{campaign.cpa}</td>
                    <td className="p-3 text-xs font-bold text-primary">{campaign.roas}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
