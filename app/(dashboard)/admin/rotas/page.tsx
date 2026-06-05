"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Route, Plus, ExternalLink, Copy, MoreVertical, Check } from "lucide-react"
import { useState } from "react"

const rotas = [
  { id: 1, nome: "Pagina de Vendas", slug: "/venda", destino: "https://pay.kiwify.com.br/abc123", cliques: 1234, status: "ativo" },
  { id: 2, nome: "Checkout Premium", slug: "/premium", destino: "https://pay.kiwify.com.br/xyz789", cliques: 567, status: "ativo" },
  { id: 3, nome: "WhatsApp Suporte", slug: "/suporte", destino: "https://wa.me/5511999999999", cliques: 892, status: "ativo" },
  { id: 4, nome: "Instagram", slug: "/insta", destino: "https://instagram.com/ghosting.ads", cliques: 2341, status: "ativo" },
  { id: 5, nome: "Bonus Exclusivo", slug: "/bonus", destino: "https://exemplo.com/bonus", cliques: 156, status: "pausado" },
]

export default function RotasPage() {
  const [copied, setCopied] = useState<number | null>(null)

  const copyLink = (id: number, slug: string) => {
    navigator.clipboard.writeText(`https://seudominio.com${slug}`)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Rotas</h1>
          <p className="text-muted-foreground">Gerencie redirecionamentos e links curtos</p>
        </div>
        <Button className="bg-primary text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" />
          Nova Rota
        </Button>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Route className="w-5 h-5 text-primary" />
            Todas as Rotas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {rotas.map((rota) => (
              <div 
                key={rota.id} 
                className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg border border-border"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-medium text-foreground">{rota.nome}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      rota.status === "ativo" ? "bg-green-500/20 text-green-500" : "bg-yellow-500/20 text-yellow-500"
                    }`}>
                      {rota.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-1">
                    <code className="text-sm text-primary">{rota.slug}</code>
                    <span className="text-xs text-muted-foreground">→</span>
                    <span className="text-xs text-muted-foreground truncate max-w-[200px]">{rota.destino}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-lg font-bold text-foreground">{rota.cliques.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">cliques</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => copyLink(rota.id, rota.slug)}
                    >
                      {copied === rota.id ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
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
