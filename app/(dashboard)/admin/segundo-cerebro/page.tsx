"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import BrainGraph from "@/components/admin/force-graph"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Network, Plus, Save, X, Link as LinkIcon, BrainCircuit, Loader2 } from "lucide-react"

export default function SegundoCerebroPage() {
  const supabase = createClient()
  
  const [nodes, setNodes] = useState<any[]>([])
  const [links, setLinks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Side Panel State
  const [selectedNode, setSelectedNode] = useState<any | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [groupType, setGroupType] = useState("Ideia")
  const [linkTarget, setLinkTarget] = useState<string>("")

  // Ingestion State
  const [showIngestor, setShowIngestor] = useState(false)
  const [ingestText, setIngestText] = useState("")
  const [isIngesting, setIsIngesting] = useState(false)

  useEffect(() => {
    loadGraphData()
  }, [])

  const loadGraphData = async () => {
    setLoading(true)
    const { data: nodesData } = await supabase.from("brain_nodes").select("*")
    const { data: linksData } = await supabase.from("brain_links").select("*")

    if (nodesData && linksData) {
      setNodes(nodesData)
      setLinks(linksData)
    }
    setLoading(false)
  }

  const handleNodeClick = (node: any) => {
    setSelectedNode(node)
    setIsCreating(false)
    setTitle(node.title || "")
    setContent(node.content || "")
    setGroupType(node.group_type)
    setLinkTarget("")
  }

  const handleCreateNew = () => {
    setSelectedNode(null)
    setIsCreating(true)
    setTitle("")
    setContent("")
    setGroupType("Ideia")
    setLinkTarget("")
  }

  const handleSaveNode = async () => {
    if (!title?.trim()) return

    if (isCreating) {
      const { data: newNode, error } = await supabase.from("brain_nodes").insert([{
        title, content, group_type: groupType
      }]).select().single()

      if (newNode) {
        // If a target was selected to link to
        if (linkTarget) {
          await supabase.from("brain_links").insert([{
            source: newNode.id,
            target: linkTarget
          }])
        }
        await loadGraphData()
        setIsCreating(false)
        setSelectedNode(newNode)
      }
    } else if (selectedNode) {
      await supabase.from("brain_nodes").update({
        title, content, group_type: groupType
      }).eq("id", selectedNode.id)
      
      if (linkTarget) {
         // Create a new link
         await supabase.from("brain_links").insert([{
            source: selectedNode.id,
            target: linkTarget
         }])
      }

      await loadGraphData()
    }
  }

  const handleIngest = async () => {
    if (!ingestText.trim()) return
    setIsIngesting(true)
    try {
      const res = await fetch('/api/brain/ingest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: ingestText })
      })
      
      const data = await res.json()
      
      if (res.ok) {
        await loadGraphData()
        setShowIngestor(false)
        setIngestText("")
      } else {
        console.error("Failed to ingest", data)
        alert("Erro na IA: " + (data.details || data.error || "Erro desconhecido"))
      }
    } catch (error: any) {
      console.error(error)
      alert("Erro na requisição: " + error.message)
    } finally {
      setIsIngesting(false)
    }
  }

  const formatGraphData = () => {
    return {
      nodes: nodes.map(n => ({ ...n })),
      links: links.map(l => ({ source: l.source, target: l.target }))
    }
  }

  return (
    <div className="flex h-[calc(100vh-6rem)] -m-6 relative bg-black overflow-hidden">
      
      {/* 3D Canvas Area */}
      <div className="flex-1 h-full w-full">
        {loading ? (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            Sincronizando Sinapses...
          </div>
        ) : (
          <BrainGraph 
            graphData={formatGraphData()} 
            onNodeClick={handleNodeClick} 
          />
        )}
      </div>

      {/* Floating Action Button for New Node */}
      {!selectedNode && !isCreating && !showIngestor && (
        <div className="absolute bottom-8 left-8 flex flex-col gap-4">
          <Button onClick={() => setShowIngestor(true)} size="lg" variant="secondary" className="rounded-full shadow-lg border border-primary/20">
            <BrainCircuit className="w-5 h-5 mr-2 text-primary" />
            NotebookLM (Ingestor)
          </Button>
          <Button onClick={handleCreateNew} size="lg" className="rounded-full shadow-lg shadow-primary/20">
            <Plus className="w-5 h-5 mr-2" />
            Nova Conexão
          </Button>
        </div>
      )}

      {/* NotebookLM Ingestor Panel */}
      {showIngestor && (
        <Card className="absolute left-8 bottom-8 w-96 bg-[#0d0d0d]/95 backdrop-blur-xl border-primary/30 flex flex-col shadow-2xl z-20">
          <CardHeader className="pb-3 border-b border-[#1a1a1a] flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <BrainCircuit className="w-4 h-4 text-primary" />
              NotebookLM (Sintetizador)
            </CardTitle>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setShowIngestor(false)}>
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent className="flex-1 p-4 space-y-4">
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Cole um texto, anotação ou artigo longo. A IA vai ler, extrair os conceitos e inseri-los no mapa automaticamente.</p>
              <Textarea 
                value={ingestText} 
                onChange={e => setIngestText(e.target.value)} 
                className="bg-background border-border min-h-[250px]"
                placeholder="Ex: A plataforma Ghosting possui 3 módulos centrais..."
                disabled={isIngesting}
              />
            </div>
          </CardContent>
          <div className="p-4 border-t border-[#1a1a1a]">
            <Button onClick={handleIngest} disabled={isIngesting || !ingestText.trim()} className="w-full">
              {isIngesting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sintetizando Conexões...
                </>
              ) : (
                <>
                  <BrainCircuit className="w-4 h-4 mr-2" />
                  Processar com IA
                </>
              )}
            </Button>
          </div>
        </Card>
      )}

      {/* Side Panel (Edit/Create) */}
      {(selectedNode || isCreating) && (
        <Card className="absolute right-4 top-4 bottom-4 w-96 bg-[#0d0d0d]/90 backdrop-blur-xl border-[#1a1a1a] flex flex-col shadow-2xl z-10">
          <CardHeader className="pb-3 border-b border-[#1a1a1a] flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Network className="w-4 h-4 text-primary" />
              {isCreating ? "Nova Ideia/Nó" : "Editar Conexão"}
            </CardTitle>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setSelectedNode(null); setIsCreating(false); }}>
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent className="flex-1 p-4 space-y-4 overflow-y-auto">
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Título</label>
              <Input 
                value={title} 
                onChange={e => setTitle(e.target.value)} 
                className="bg-background border-border"
                placeholder="Ex: Copy de Vendas VSL"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Tipo</label>
              <select 
                value={groupType} 
                onChange={e => setGroupType(e.target.value)}
                className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary"
              >
                <option value="Ideia">Ideia (Amarelo)</option>
                <option value="Projeto">Projeto (Azul)</option>
                <option value="Aprendizado">Aprendizado (Verde)</option>
                <option value="Outro">Outro (Roxo)</option>
              </select>
            </div>

            <div className="space-y-2 flex-1">
              <label className="text-xs font-medium text-muted-foreground">Conteúdo / Anotações</label>
              <Textarea 
                value={content} 
                onChange={e => setContent(e.target.value)} 
                className="bg-background border-border min-h-[200px]"
                placeholder="Escreva suas ideias aqui..."
              />
            </div>

            <div className="space-y-2 pt-4 border-t border-[#1a1a1a]">
              <label className="text-xs font-medium text-muted-foreground flex items-center gap-2">
                <LinkIcon className="w-3 h-3" />
                Ligar a outro Nó
              </label>
              <select 
                value={linkTarget} 
                onChange={e => setLinkTarget(e.target.value)}
                className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary"
              >
                <option value="">-- Nenhuma ligação nova --</option>
                {nodes.filter(n => n.id !== selectedNode?.id).map(n => (
                  <option key={n.id} value={n.id}>{n.title}</option>
                ))}
              </select>
            </div>
          </CardContent>
          <div className="p-4 border-t border-[#1a1a1a]">
            <Button onClick={handleSaveNode} className="w-full">
              <Save className="w-4 h-4 mr-2" />
              Salvar Conexão
            </Button>
          </div>
        </Card>
      )}

    </div>
  )
}
