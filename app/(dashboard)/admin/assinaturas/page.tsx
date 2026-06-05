"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CreditCard, Users, DollarSign, TrendingUp, AlertCircle } from "lucide-react"

const assinaturas = [
  { plano: "DNA Start", membros: 45, mrr: "R$ 44.955", churn: "2.1%", cor: "text-blue-500" },
  { plano: "DNA Pro", membros: 67, mrr: "R$ 167.333", churn: "1.8%", cor: "text-purple-500" },
  { plano: "DNA Elite", membros: 15, mrr: "R$ 74.955", churn: "0.5%", cor: "text-primary" },
]

export default function AssinaturasPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Assinaturas</h1>
          <p className="text-muted-foreground">Gerencie planos e assinantes</p>
        </div>
        <Button className="bg-primary text-primary-foreground">
          Novo Plano
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Users className="w-4 h-4" />
              Total Assinantes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">127</div>
            <p className="text-xs text-green-500">+8 este mes</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              MRR Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">R$ 287.243</div>
            <p className="text-xs text-muted-foreground">receita mensal recorrente</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              LTV Medio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">R$ 8.450</div>
            <p className="text-xs text-green-500">+12% vs trimestre</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Churn Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">1.7%</div>
            <p className="text-xs text-green-500">-0.3% vs mes passado</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary" />
            Planos Ativos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {assinaturas.map((plano) => (
              <div key={plano.plano} className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${plano.cor.replace("text-", "bg-")}`} />
                  <div>
                    <h3 className={`font-bold ${plano.cor}`}>{plano.plano}</h3>
                    <p className="text-sm text-muted-foreground">{plano.membros} membros ativos</p>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <p className="font-bold text-foreground">{plano.mrr}</p>
                    <p className="text-xs text-muted-foreground">MRR</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-foreground">{plano.churn}</p>
                    <p className="text-xs text-muted-foreground">Churn</p>
                  </div>
                  <Button variant="outline" size="sm">Gerenciar</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
