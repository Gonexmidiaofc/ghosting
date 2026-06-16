"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useChat } from "@ai-sdk/react"
import { Bot, Send, Settings, Save, BrainCircuit } from "lucide-react"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"

export default function AdminGhostAIBuilder() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    body: {
      agentId: "supreme"
    }
  })

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [systemPrompt, setSystemPrompt] = useState("")
  const [price, setPrice] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  const supabase = createClient()

  const handleSaveAgent = async () => {
    if (!name || !systemPrompt || !price) {
      alert("Preencha o Nome, Prompt de Sistema e Preço.")
      return
    }

    setIsSaving(true)
    const { error } = await supabase.from("custom_agents").insert([{
      name,
      description,
      system_prompt: systemPrompt,
      price: parseFloat(price)
    }])
    setIsSaving(false)

    if (error) {
      alert("Erro ao salvar agente: " + error.message)
    } else {
      alert("Agente salvo com sucesso!")
      setName("")
      setDescription("")
      setSystemPrompt("")
      setPrice("")
    }
  }

  return (
    <div className="p-6 space-y-6 h-[calc(100vh-6rem)]">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <BrainCircuit className="w-6 h-6 text-primary" />
          Ghost AI Supreme Builder
        </h1>
        <p className="text-sm text-muted-foreground">Construa e precifique seus próprios agentes especialistas para vender aos alunos.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full pb-10">
        
        {/* Chat with Supreme Agent */}
        <Card className="bg-[#0d0d0d] border-[#1a1a1a] flex flex-col h-full">
          <CardHeader className="pb-2 border-b border-[#1a1a1a]">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-primary">
              <Bot className="w-4 h-4" />
              Agente Supremo (Arquiteto)
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center opacity-50">
                <BrainCircuit className="w-12 h-12 mb-4" />
                <p className="text-sm">Peça ao Supremo para estruturar o prompt do seu novo agente.</p>
                <p className="text-xs mt-2">Ex: "Crie um agente especialista em Copy de VSL de emagrecimento."</p>
              </div>
            ) : (
              messages.map(m => (
                <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-lg px-4 py-2 text-sm ${
                    m.role === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-secondary text-foreground'
                  }`}>
                    {m.content}
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-secondary rounded-lg px-4 py-2 text-sm flex gap-1">
                  <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce delay-75" />
                  <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce delay-150" />
                </div>
              </div>
            )}
          </CardContent>
          <div className="p-4 border-t border-[#1a1a1a]">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <input 
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="Converse com o Agente Supremo..."
                className="flex-1 bg-[#141414] border border-[#1a1a1a] rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary"
              />
              <Button type="submit" disabled={isLoading || !input.trim()} className="bg-primary text-primary-foreground">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </Card>

        {/* Agent Form */}
        <Card className="bg-[#0d0d0d] border-[#1a1a1a] flex flex-col h-full">
          <CardHeader className="pb-2 border-b border-[#1a1a1a]">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-foreground">
              <Settings className="w-4 h-4" />
              Configuração do Novo Agente (Loja)
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 p-6 space-y-4 overflow-y-auto">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nome do Agente</label>
              <Input 
                placeholder="Ex: Mestre das Copys" 
                value={name} onChange={e => setName(e.target.value)}
                className="bg-background border-border"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Descrição Curta (Aparece na Loja)</label>
              <Input 
                placeholder="Escreve copys persuasivas que convertem 3x mais." 
                value={description} onChange={e => setDescription(e.target.value)}
                className="bg-background border-border"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Valor de Venda (R$)</label>
              <Input 
                type="number"
                placeholder="97.00" 
                value={price} onChange={e => setPrice(e.target.value)}
                className="bg-background border-border text-primary font-bold text-lg"
              />
            </div>
            <div className="space-y-2 flex-1 flex flex-col pt-4 border-t border-[#1a1a1a]">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-emerald-400">Prompt do Sistema (O Cérebro)</label>
                <span className="text-xs text-muted-foreground">Copie a estrutura gerada pelo Supremo e cole aqui</span>
              </div>
              <Textarea 
                placeholder="Você é um especialista em Copywriting. Seu objetivo é..." 
                value={systemPrompt} onChange={e => setSystemPrompt(e.target.value)}
                className="bg-background border-border flex-1 min-h-[150px] font-mono text-xs"
              />
            </div>
          </CardContent>
          <div className="p-4 border-t border-[#1a1a1a]">
             <Button 
                onClick={handleSaveAgent}
                disabled={isSaving}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 font-bold"
              >
                {isSaving ? "Publicando na Loja..." : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Publicar Agente na Loja
                  </>
                )}
              </Button>
          </div>
        </Card>

      </div>
    </div>
  )
}
