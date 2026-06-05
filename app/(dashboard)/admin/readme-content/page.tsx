"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Library, FileText, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

const docs = [
  { titulo: "Guia de Integracao Facebook Ads", categoria: "Integracoes", atualizado: "2 dias atras" },
  { titulo: "Como Configurar Pixels", categoria: "Tracking", atualizado: "1 semana atras" },
  { titulo: "Boas Praticas de Funis", categoria: "Funis", atualizado: "3 dias atras" },
  { titulo: "Configurando Automacoes", categoria: "Automacoes", atualizado: "5 dias atras" },
  { titulo: "Gerenciamento de Leads", categoria: "CRM", atualizado: "1 dia atras" },
]

export default function ReadmeContentPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">README Content</h1>
          <p className="text-muted-foreground">Gerencie a documentacao do sistema</p>
        </div>
        <Button className="bg-primary text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" />
          Novo Documento
        </Button>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Library className="w-5 h-5 text-primary" />
            Documentos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {docs.map((doc, i) => (
              <div 
                key={i}
                className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-primary" />
                  <div>
                    <h3 className="font-medium text-foreground">{doc.titulo}</h3>
                    <p className="text-xs text-muted-foreground">{doc.categoria}</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{doc.atualizado}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
