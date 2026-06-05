"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { 
  Ghost, 
  Send, 
  Sparkles, 
  Copy, 
  RotateCcw,
  Lightbulb,
  Code,
  Target,
  FileText
} from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

const quickPrompts = [
  { icon: Target, label: "Estrategia de trafego", prompt: "Me ajude a criar uma estrategia de trafego pago para um produto digital de R$297" },
  { icon: Code, label: "Estrutura de funil", prompt: "Qual a melhor estrutura de funil para um lancamento de infoproduto?" },
  { icon: FileText, label: "Copy para anuncio", prompt: "Crie uma copy persuasiva para anuncio de um curso online" },
  { icon: Lightbulb, label: "Ideias de conteudo", prompt: "Me de 10 ideias de conteudo para atrair leads qualificados no Instagram" },
]

export default function GhostAIPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async (text?: string) => {
    const messageText = text || input
    if (!messageText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response (replace with actual AI integration)
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `Entendi sua pergunta sobre "${messageText.slice(0, 50)}..."\n\nComo seu assistente especializado em operacoes digitais, posso te ajudar com:\n\n1. **Estrategia**: Definir o melhor caminho para seu objetivo\n2. **Execucao**: Passo a passo pratico para implementar\n3. **Otimizacao**: Melhorias baseadas em dados\n\nQuer que eu detalhe algum desses pontos?`,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
  }

  const clearChat = () => {
    setMessages([])
  }

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-primary" />
            Ghost AI
          </h1>
          <p className="text-muted-foreground mt-1">
            Seu assistente especializado em operacoes digitais
          </p>
        </div>
        {messages.length > 0 && (
          <Button variant="outline" size="sm" onClick={clearChat}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Nova conversa
          </Button>
        )}
      </div>

      {/* Chat Area */}
      <Card className="flex-1 bg-card/50 flex flex-col overflow-hidden">
        <CardContent className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mb-6">
                <Ghost className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Ola! Sou o Ghost AI
              </h2>
              <p className="text-muted-foreground max-w-md mb-8">
                Estou aqui para te ajudar com estrategias de marketing, trafego pago, 
                funis de vendas, automacoes e muito mais.
              </p>

              {/* Quick Prompts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt.label}
                    onClick={() => handleSend(prompt.prompt)}
                    className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50 hover:bg-secondary text-left transition-colors"
                  >
                    <prompt.icon className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">{prompt.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-4 ${message.role === "user" ? "justify-end" : ""}`}
                >
                  {message.role === "assistant" && (
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Ghost className="w-5 h-5 text-primary" />
                    </div>
                  )}
                  <div
                    className={`
                      max-w-[80%] rounded-2xl p-4 
                      ${message.role === "user" 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-secondary/50"
                      }
                    `}
                  >
                    <p className="whitespace-pre-wrap text-sm leading-relaxed">
                      {message.content}
                    </p>
                    {message.role === "assistant" && (
                      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border/50">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => copyMessage(message.content)}
                          className="h-7 px-2 text-xs"
                        >
                          <Copy className="w-3 h-3 mr-1" />
                          Copiar
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Ghost className="w-5 h-5 text-primary animate-pulse" />
                  </div>
                  <div className="bg-secondary/50 rounded-2xl p-4">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </CardContent>

        {/* Input Area */}
        <div className="p-4 border-t border-border">
          <div className="flex gap-3">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Pergunte algo ao Ghost AI..."
              className="min-h-[50px] max-h-[150px] resize-none bg-secondary/50 border-0"
              rows={1}
            />
            <Button 
              onClick={() => handleSend()} 
              disabled={!input.trim() || isLoading}
              className="px-4"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-2">
            Ghost AI pode cometer erros. Verifique informacoes importantes.
          </p>
        </div>
      </Card>
    </div>
  )
}
