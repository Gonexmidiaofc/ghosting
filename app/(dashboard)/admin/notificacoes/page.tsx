"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, Plus, Send, Users, Clock, CheckCircle } from "lucide-react"

const notificacoes = [
  { id: 1, titulo: "Nova aula disponivel!", tipo: "push", enviados: 127, abertos: 89, status: "enviado", data: "Hoje, 14:30" },
  { id: 2, titulo: "Lembrete: Call ao vivo amanha", tipo: "email", enviados: 127, abertos: 67, status: "enviado", data: "Ontem, 10:00" },
  { id: 3, titulo: "Promocao especial DNA Elite", tipo: "push", enviados: 0, abertos: 0, status: "agendado", data: "Amanha, 09:00" },
]

export default function NotificacoesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Notificacoes</h1>
          <p className="text-muted-foreground">Envie notificacoes para seus usuarios</p>
        </div>
        <Button className="bg-primary text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" />
          Nova Notificacao
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Enviadas Hoje</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">3</div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Taxa de Abertura</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">68%</div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Agendadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">1</div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            Historico de Notificacoes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {notificacoes.map((notif) => (
              <div key={notif.id} className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                <div className="flex items-center gap-3">
                  {notif.status === "enviado" ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <Clock className="w-5 h-5 text-yellow-500" />
                  )}
                  <div>
                    <h3 className="font-medium text-foreground">{notif.titulo}</h3>
                    <p className="text-xs text-muted-foreground">{notif.tipo.toUpperCase()} • {notif.data}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm">
                      <Send className="w-3 h-3" />
                      <span>{notif.enviados}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">enviados</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm">
                      <Users className="w-3 h-3" />
                      <span>{notif.abertos}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">abertos</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
