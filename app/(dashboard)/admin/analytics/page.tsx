"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Globe, Clock, Monitor, Smartphone, MapPin } from "lucide-react"

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground">Analise detalhada do comportamento dos usuarios</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Sessoes Ativas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">47</div>
            <p className="text-xs text-muted-foreground">usuarios online agora</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Tempo Medio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">4:32</div>
            <p className="text-xs text-muted-foreground">minutos por sessao</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Monitor className="w-4 h-4" />
              Desktop
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">62%</div>
            <p className="text-xs text-muted-foreground">dos acessos</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Smartphone className="w-4 h-4" />
              Mobile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">38%</div>
            <p className="text-xs text-muted-foreground">dos acessos</p>
          </CardContent>
        </Card>
      </div>

      {/* Mapa de calor de acessos */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Principais Regioes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { regiao: "Sao Paulo, SP", visitas: 4521, percent: 35 },
              { regiao: "Rio de Janeiro, RJ", visitas: 2847, percent: 22 },
              { regiao: "Belo Horizonte, MG", visitas: 1654, percent: 13 },
              { regiao: "Curitiba, PR", visitas: 1232, percent: 10 },
              { regiao: "Porto Alegre, RS", visitas: 987, percent: 8 },
              { regiao: "Outros", visitas: 1559, percent: 12 },
            ].map((item) => (
              <div key={item.regiao} className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-foreground">{item.regiao}</span>
                    <span className="text-sm text-muted-foreground">{item.visitas.toLocaleString()}</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                </div>
                <span className="text-sm font-medium text-foreground w-12 text-right">{item.percent}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Grafico de linha */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LineChart className="w-5 h-5 text-primary" />
            Trafego nos Ultimos 7 Dias
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48 flex items-end justify-around gap-4">
            {[
              { dia: "Seg", valor: 1250 },
              { dia: "Ter", valor: 1420 },
              { dia: "Qua", valor: 1180 },
              { dia: "Qui", valor: 1650 },
              { dia: "Sex", valor: 1890 },
              { dia: "Sab", valor: 980 },
              { dia: "Dom", valor: 720 },
            ].map((item, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className="text-xs text-muted-foreground">{item.valor}</div>
                <div 
                  className="w-full bg-primary rounded-t"
                  style={{ height: `${(item.valor / 1890) * 100}%` }}
                />
                <span className="text-xs text-muted-foreground">{item.dia}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
