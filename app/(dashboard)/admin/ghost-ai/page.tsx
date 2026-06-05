"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Bot,
  Sparkles,
  FileText,
  Megaphone,
  Video,
  Globe,
  GitBranch,
  BarChart3,
  Lightbulb,
  BookOpen,
  Zap,
  Send,
  History,
  Star
} from "lucide-react"
import { useState } from "react"

const capabilities = [
  { icon: FileText, name: "Gerar Copy", description: "Crie copies persuasivas para vendas", color: "bg-blue-500/10 text-blue-500" },
  { icon: Megaphone, name: "Gerar Anuncio", description: "Crie anuncios para Meta, Google, TikTok", color: "bg-purple-500/10 text-purple-500" },
  { icon: Sparkles, name: "Gerar Hook", description: "Crie hooks virais para conteudo", color: "bg-pink-500/10 text-pink-500" },
  { icon: Video, name: "Gerar VSL", description: "Crie roteiros de VSL completos", color: "bg-red-500/10 text-red-500" },
  { icon: Globe, name: "Gerar LP", description: "Crie estruturas de landing pages", color: "bg-cyan-500/10 text-cyan-500" },
  { icon: GitBranch, name: "Criar Funil", description: "Monte estruturas de funis", color: "bg-emerald-500/10 text-emerald-500" },
  { icon: BarChart3, name: "Analisar Metricas", description: "Analise e interprete dados", color: "bg-yellow-500/10 text-yellow-500" },
  { icon: Lightbulb, name: "Sugerir Otimizacoes", description: "Receba sugestoes de melhoria", color: "bg-orange-500/10 text-orange-500" },
  { icon: BookOpen, name: "Criar Aula", description: "Gere estruturas de aulas", color: "bg-indigo-500/10 text-indigo-500" },
  { icon: Zap, name: "Criar Automacao", description: "Monte fluxos de automacao", color: "bg-primary/10 text-primary" },
]

const recentChats = [
  { id: 1, title: "Copy para VSL Elite", time: "2h atras", preview: "Gerei uma copy focada em dor e transformacao..." },
  { id: 2, title: "Analise de ROAS", time: "5h atras", preview: "Baseado nos dados, recomendo aumentar o budget..." },
  { id: 3, title: "Hooks para TikTok", time: "1d atras", preview: "Aqui estao 10 hooks virais para seu nicho..." },
  { id: 4, title: "Estrutura de Funil", time: "2d atras", preview: "Sugiro um funil de 3 etapas com..." },
]

export default function AdminGhostAI() {
  const [message, setMessage] = useState("")

  return (
    <div className="p-6 space-y-6 h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Bot className="w-6 h-6 text-primary" />
            Ghost AI
          </h1>
          <p className="text-sm text-muted-foreground">Seu copiloto de operacoes digitais</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-[#1a1a1a]">
            <History className="w-4 h-4 mr-2" />
            Historico
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Area */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="bg-[#0d0d0d] border-[#1a1a1a] h-[500px] flex flex-col">
            <CardHeader className="pb-2 border-b border-[#1a1a1a]">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                Nova Conversa
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-4 overflow-y-auto">
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                  <Bot className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Como posso ajudar?</h3>
                <p className="text-sm text-muted-foreground max-w-md">
                  Sou seu assistente de operacoes digitais. Posso criar copies, anuncios, analisar metricas, 
                  sugerir otimizacoes e muito mais.
                </p>
              </div>
            </CardContent>
            <div className="p-4 border-t border-[#1a1a1a]">
              <div className="flex items-center gap-2">
                <input 
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 bg-[#141414] border border-[#1a1a1a] rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                />
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {capabilities.slice(0, 5).map((cap) => (
              <Button key={cap.name} variant="outline" className="border-[#1a1a1a] h-auto py-3 flex flex-col items-center gap-1">
                <cap.icon className="w-4 h-4 text-primary" />
                <span className="text-[10px]">{cap.name}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Capabilities */}
          <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Capacidades</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {capabilities.map((cap) => (
                <button
                  key={cap.name}
                  className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-[#141414] transition-colors text-left"
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${cap.color}`}>
                    <cap.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground">{cap.name}</p>
                    <p className="text-[10px] text-muted-foreground truncate">{cap.description}</p>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Recent Chats */}
          <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Conversas Recentes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {recentChats.map((chat) => (
                <button
                  key={chat.id}
                  className="w-full p-2 rounded-lg hover:bg-[#141414] transition-colors text-left"
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs font-medium text-foreground">{chat.title}</p>
                    <span className="text-[10px] text-muted-foreground">{chat.time}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground truncate">{chat.preview}</p>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
