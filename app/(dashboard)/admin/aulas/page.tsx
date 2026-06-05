"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlayCircle, Plus, Clock, Eye, MoreVertical } from "lucide-react"

const aulas = [
  { id: 1, nome: "Introducao ao Metodo", modulo: "Modulo 0", duracao: "12:45", views: 1247, status: "publicado" },
  { id: 2, nome: "Fundamentos de Trafego", modulo: "Modulo 1", duracao: "18:32", views: 1089, status: "publicado" },
  { id: 3, nome: "Estrutura de Campanhas", modulo: "Modulo 1", duracao: "24:15", views: 987, status: "publicado" },
  { id: 4, nome: "Copywriting para Ads", modulo: "Modulo 2", duracao: "21:08", views: 856, status: "publicado" },
  { id: 5, nome: "Funis de Vendas", modulo: "Modulo 3", duracao: "32:45", views: 723, status: "rascunho" },
]

export default function AulasPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Aulas</h1>
          <p className="text-muted-foreground">Gerencie as aulas dos seus cursos</p>
        </div>
        <Button className="bg-primary text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" />
          Nova Aula
        </Button>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PlayCircle className="w-5 h-5 text-primary" />
            Todas as Aulas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {aulas.map((aula) => (
              <div 
                key={aula.id} 
                className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                    <PlayCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{aula.nome}</h3>
                    <p className="text-sm text-muted-foreground">{aula.modulo}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{aula.duracao}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">{aula.views.toLocaleString()}</span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${
                    aula.status === "publicado" ? "bg-green-500/20 text-green-500" : "bg-yellow-500/20 text-yellow-500"
                  }`}>
                    {aula.status}
                  </span>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
