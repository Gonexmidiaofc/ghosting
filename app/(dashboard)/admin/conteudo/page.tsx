"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Plus, Download, Eye, MoreVertical, File, Video, Image } from "lucide-react"

const conteudos = [
  { id: 1, nome: "Template de Campanha", tipo: "pdf", tamanho: "2.4 MB", downloads: 456, categoria: "Templates" },
  { id: 2, nome: "Planilha de Metricas", tipo: "xlsx", tamanho: "1.2 MB", downloads: 378, categoria: "Planilhas" },
  { id: 3, nome: "Video Bonus - Escala", tipo: "video", tamanho: "156 MB", downloads: 234, categoria: "Videos" },
  { id: 4, nome: "Pack de Criativos", tipo: "zip", tamanho: "45 MB", downloads: 567, categoria: "Criativos" },
  { id: 5, nome: "Ebook - Fundamentos", tipo: "pdf", tamanho: "8.7 MB", downloads: 892, categoria: "Ebooks" },
]

const getIcon = (tipo: string) => {
  switch(tipo) {
    case "video": return Video
    case "png": case "jpg": return Image
    default: return File
  }
}

export default function ConteudoPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Conteudo</h1>
          <p className="text-muted-foreground">Gerencie materiais e arquivos do curso</p>
        </div>
        <Button className="bg-primary text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" />
          Upload
        </Button>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Biblioteca de Conteudo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {conteudos.map((item) => {
              const Icon = getIcon(item.tipo)
              return (
                <div 
                  key={item.id} 
                  className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{item.nome}</h3>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="uppercase">{item.tipo}</span>
                        <span>•</span>
                        <span>{item.tamanho}</span>
                        <span>•</span>
                        <span>{item.categoria}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Download className="w-4 h-4" />
                      <span className="text-sm">{item.downloads}</span>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
