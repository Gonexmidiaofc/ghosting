"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, Plus, Calendar, Eye } from "lucide-react"

const novidades = [
  { 
    id: 1, 
    titulo: "Nova funcionalidade: Ghost AI melhorado", 
    descricao: "Agora o Ghost AI pode ajudar a criar campanhas completas...",
    data: "15 Jan 2024",
    visualizacoes: 89,
    status: "publicado"
  },
  { 
    id: 2, 
    titulo: "Modulo 6 disponivel", 
    descricao: "O novo modulo sobre sistemas SaaS ja esta disponivel...",
    data: "10 Jan 2024",
    visualizacoes: 127,
    status: "publicado"
  },
  { 
    id: 3, 
    titulo: "Atualizacao do Dashboard", 
    descricao: "Novas metricas e graficos foram adicionados...",
    data: "05 Jan 2024",
    visualizacoes: 156,
    status: "publicado"
  },
]

export default function NovidadesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Novidades</h1>
          <p className="text-muted-foreground">Changelog e atualizacoes do sistema</p>
        </div>
        <Button className="bg-primary text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" />
          Nova Atualizacao
        </Button>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Ultimas Novidades
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {novidades.map((item) => (
              <div key={item.id} className="p-4 bg-secondary/30 rounded-lg border-l-2 border-primary">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-foreground">{item.titulo}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{item.descricao}</p>
                  </div>
                  <span className="text-xs bg-green-500/20 text-green-500 px-2 py-1 rounded">
                    {item.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {item.data}
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {item.visualizacoes} visualizacoes
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
