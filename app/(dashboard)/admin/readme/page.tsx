"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileCode, BookOpen, Zap, Shield, Database, Globe } from "lucide-react"

export default function ReadmePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">README</h1>
        <p className="text-muted-foreground">Documentacao e guias do sistema</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { titulo: "Introducao", desc: "Visao geral do GHOST.SYSTEM", icon: BookOpen },
          { titulo: "API Reference", desc: "Documentacao da API", icon: FileCode },
          { titulo: "Integrações", desc: "Como conectar servicos", icon: Zap },
          { titulo: "Seguranca", desc: "Boas praticas de seguranca", icon: Shield },
          { titulo: "Database", desc: "Schema e queries", icon: Database },
          { titulo: "Deploy", desc: "Como publicar o sistema", icon: Globe },
        ].map((item) => (
          <Card key={item.titulo} className="bg-card border-border hover:border-primary/50 transition-colors cursor-pointer">
            <CardHeader>
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center mb-2">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <CardTitle className="text-base">{item.titulo}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Quick Start</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-invert max-w-none">
          <pre className="bg-[#0a0a0a] p-4 rounded-lg overflow-x-auto">
            <code className="text-sm text-green-400">{`# Clone o repositorio
git clone https://github.com/ghosting-ads/ghost-system.git

# Instale as dependencias
npm install

# Configure as variaveis de ambiente
cp .env.example .env.local

# Inicie o servidor de desenvolvimento
npm run dev`}</code>
          </pre>
        </CardContent>
      </Card>
    </div>
  )
}
