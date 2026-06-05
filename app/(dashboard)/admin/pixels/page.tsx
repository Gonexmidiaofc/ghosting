"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { QrCode, Plus, CheckCircle, XCircle, Settings } from "lucide-react"

const pixels = [
  { id: 1, nome: "Facebook Pixel Principal", plataforma: "Facebook", pixelId: "123456789012345", status: "ativo", eventos: 12847 },
  { id: 2, nome: "Google Analytics 4", plataforma: "Google", pixelId: "G-XXXXXXXXXX", status: "ativo", eventos: 15632 },
  { id: 3, nome: "Google Ads", plataforma: "Google", pixelId: "AW-XXXXXXXXX", status: "ativo", eventos: 8421 },
  { id: 4, nome: "TikTok Pixel", plataforma: "TikTok", pixelId: "CXXXXXXXXXX", status: "inativo", eventos: 0 },
]

export default function PixelsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Pixels</h1>
          <p className="text-muted-foreground">Gerencie seus pixels de rastreamento</p>
        </div>
        <Button className="bg-primary text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Pixel
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pixels.map((pixel) => (
          <Card key={pixel.id} className="bg-card border-border">
            <CardHeader className="flex flex-row items-start justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  pixel.plataforma === "Facebook" ? "bg-blue-500/20" :
                  pixel.plataforma === "Google" ? "bg-red-500/20" :
                  "bg-gray-500/20"
                }`}>
                  <QrCode className={`w-5 h-5 ${
                    pixel.plataforma === "Facebook" ? "text-blue-500" :
                    pixel.plataforma === "Google" ? "text-red-500" :
                    "text-gray-500"
                  }`} />
                </div>
                <div>
                  <CardTitle className="text-base">{pixel.nome}</CardTitle>
                  <p className="text-xs text-muted-foreground">{pixel.plataforma}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <Settings className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Pixel ID</span>
                  <code className="text-sm text-foreground bg-secondary px-2 py-1 rounded">{pixel.pixelId}</code>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <div className="flex items-center gap-2">
                    {pixel.status === "ativo" ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-green-500">Ativo</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-red-500" />
                        <span className="text-sm text-red-500">Inativo</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Eventos (30d)</span>
                  <span className="text-sm font-medium text-foreground">{pixel.eventos.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
