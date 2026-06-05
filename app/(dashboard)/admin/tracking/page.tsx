"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Crosshair, Plus, Activity, CheckCircle, XCircle } from "lucide-react"

const eventos = [
  { id: 1, nome: "PageView", disparos: 12847, status: "ativo", plataforma: "Facebook Pixel" },
  { id: 2, nome: "ViewContent", disparos: 8421, status: "ativo", plataforma: "Facebook Pixel" },
  { id: 3, nome: "AddToCart", disparos: 2156, status: "ativo", plataforma: "Facebook Pixel" },
  { id: 4, nome: "InitiateCheckout", disparos: 1847, status: "ativo", plataforma: "Facebook Pixel" },
  { id: 5, nome: "Purchase", disparos: 847, status: "ativo", plataforma: "Facebook Pixel" },
  { id: 6, nome: "page_view", disparos: 12847, status: "ativo", plataforma: "Google Analytics" },
  { id: 7, nome: "purchase", disparos: 847, status: "erro", plataforma: "Google Analytics" },
]

export default function TrackingPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Tracking</h1>
          <p className="text-muted-foreground">Monitore eventos e conversoes</p>
        </div>
        <Button className="bg-primary text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" />
          Novo Evento
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Eventos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">39.812</div>
            <p className="text-xs text-green-500">+15% vs ontem</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Eventos Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">6</div>
            <p className="text-xs text-muted-foreground">de 7 configurados</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Taxa de Erro</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">0.3%</div>
            <p className="text-xs text-muted-foreground">12 erros hoje</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crosshair className="w-5 h-5 text-primary" />
            Eventos Configurados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {eventos.map((evento) => (
              <div 
                key={evento.id} 
                className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Activity className="w-4 h-4 text-primary" />
                  <div>
                    <code className="text-sm font-medium text-foreground">{evento.nome}</code>
                    <p className="text-xs text-muted-foreground">{evento.plataforma}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm font-medium text-foreground">{evento.disparos.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">disparos</div>
                  </div>
                  {evento.status === "ativo" ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
