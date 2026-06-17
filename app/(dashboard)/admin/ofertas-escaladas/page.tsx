"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  Plus, 
  Trash2, 
  ExternalLink,
  Image as ImageIcon,
  Check,
  X,
  Sparkles
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

interface ScaledOffer {
  id: string
  title: string
  description: string
  copy_text: string
  media_url: string
  ad_library_url: string
  category: "BR" | "LATAM" | "INFOPRODUTO" | "BLACK"
  is_free: boolean
  created_at: string
}

export default function AdminOfertasEscaladas() {
  const [offers, setOffers] = useState<ScaledOffer[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  
  // Form state
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [copyText, setCopyText] = useState("")
  const [mediaUrl, setMediaUrl] = useState("")
  const [adLibraryUrl, setAdLibraryUrl] = useState("")
  const [category, setCategory] = useState<"BR" | "LATAM" | "INFOPRODUTO" | "BLACK">("BR")
  const [isFree, setIsFree] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Magic Import state
  const [importUrl, setImportUrl] = useState("")
  const [isImporting, setIsImporting] = useState(false)

  const supabase = createClient()

  useEffect(() => {
    loadOffers()
  }, [])

  const loadOffers = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from("scaled_offers")
      .select("*")
      .order("created_at", { ascending: false })

    if (!error && data) {
      setOffers(data)
    }
    setLoading(false)
  }

  const handleImport = async () => {
    if (!importUrl) {
      alert("Cole o link do Facebook Ad Library primeiro.")
      return
    }
    setIsImporting(true)
    try {
      const res = await fetch("/api/admin/scrape-ad", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: importUrl })
      })
      const result = await res.json()
      
      if (!res.ok) {
        throw new Error(result.error || "Erro desconhecido")
      }

      if (result.success) {
        alert(result.message || "Anúncios extraídos com sucesso!")
        setImportUrl("")
        loadOffers() // Atualiza a tabela com os novos dados puxados
      }
    } catch (err: any) {
      alert("Erro ao extrair anúncio: " + err.message)
    } finally {
      setIsImporting(false)
    }
  }

  const handleCreate = async () => {
    if (!title || !category) return

    setIsSubmitting(true)
    const { error } = await supabase.from("scaled_offers").insert([{
      title,
      description,
      copy_text: copyText,
      media_url: mediaUrl,
      ad_library_url: adLibraryUrl,
      category,
      is_free: isFree
    }])

    setIsSubmitting(false)
    if (!error) {
      setIsDialogOpen(false)
      // Reset form
      setTitle("")
      setDescription("")
      setCopyText("")
      setMediaUrl("")
      setAdLibraryUrl("")
      setCategory("BR")
      setIsFree(false)
      loadOffers()
    } else {
      alert("Erro ao criar oferta: " + error.message)
    }
  }

  const toggleFreeStatus = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from("scaled_offers")
      .update({ is_free: !currentStatus })
      .eq("id", id)

    if (!error) {
      setOffers(offers.map(o => o.id === id ? { ...o, is_free: !currentStatus } : o))
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta oferta?")) return

    const { error } = await supabase
      .from("scaled_offers")
      .delete()
      .eq("id", id)

    if (!error) {
      setOffers(offers.filter(o => o.id !== id))
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Comunidade de Ofertas</h1>
          <p className="text-sm text-muted-foreground">Gerencie as ofertas escaladas para os alunos</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Oferta
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#0d0d0d] border-[#1a1a1a] text-foreground sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Nova Oferta Escalada</DialogTitle>
              <DialogDescription className="sr-only">
                Preencha os campos abaixo para cadastrar uma nova oferta no sistema.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              
              {/* Importador Automático Mágico */}
              <div className="p-4 rounded-lg border border-primary/30 bg-primary/5 space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-primary flex items-center">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Importador Mágico (DSers)
                  </h3>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-500 px-2 py-0.5 rounded-full uppercase font-bold">Apify Conectado</span>
                </div>
                <p className="text-xs text-muted-foreground">Cole o link da Biblioteca de Anúncios e puxamos tudo automaticamente.</p>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Cole o link do Facebook Ad Library..." 
                    className="bg-background border-primary/20 text-xs h-9"
                    value={importUrl}
                    onChange={(e) => setImportUrl(e.target.value)}
                  />
                  <Button 
                    size="sm" 
                    className="h-9 whitespace-nowrap bg-primary text-primary-foreground hover:bg-primary/90" 
                    onClick={handleImport}
                    disabled={isImporting}
                  >
                    {isImporting ? "Extraindo e Rodando IA..." : "Extrair 3 Automáticos"}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Título da Oferta</label>
                <Input 
                  placeholder="Ex: VSL Encapsulado Gringo" 
                  value={title} onChange={e => setTitle(e.target.value)}
                  className="bg-background border-border"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Categoria</label>
                <Select value={category} onValueChange={(val: any) => setCategory(val)}>
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BR">Brasil (BR)</SelectItem>
                    <SelectItem value="LATAM">America Latina (LATAM)</SelectItem>
                    <SelectItem value="INFOPRODUTO">Infoproduto</SelectItem>
                    <SelectItem value="BLACK">Nicho Black</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Link Biblioteca de Anúncios (FB)</label>
                <Input 
                  placeholder="https://www.facebook.com/ads/library/..." 
                  value={adLibraryUrl} onChange={e => setAdLibraryUrl(e.target.value)}
                  className="bg-background border-border"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">URL da Imagem ou Vídeo</label>
                <Input 
                  placeholder="https://..." 
                  value={mediaUrl} onChange={e => setMediaUrl(e.target.value)}
                  className="bg-background border-border"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Copy (Texto do Anúncio)</label>
                <Textarea 
                  placeholder="Cole aqui a copy..." 
                  value={copyText} onChange={e => setCopyText(e.target.value)}
                  className="bg-background border-border min-h-[100px]"
                />
              </div>
              <div className="flex items-center justify-between p-3 border border-border rounded-lg bg-secondary/20">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">Oferta Gratuita?</label>
                  <p className="text-xs text-muted-foreground">Fica visível para todos (Limite de 3 indicadas)</p>
                </div>
                <Switch checked={isFree} onCheckedChange={setIsFree} />
              </div>
              <Button 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" 
                onClick={handleCreate}
                disabled={isSubmitting || !title}
              >
                {isSubmitting ? "Salvando..." : "Salvar Oferta"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <div className="col-span-full py-12 text-center text-muted-foreground">
            Carregando ofertas...
          </div>
        ) : offers.length === 0 ? (
          <div className="col-span-full py-12 text-center text-muted-foreground bg-[#0d0d0d] border border-[#1a1a1a] rounded-lg">
            Nenhuma oferta cadastrada no Garimpo.
          </div>
        ) : (
          offers.map(offer => (
            <Card key={offer.id} className="bg-[#0d0d0d] border-[#1a1a1a] overflow-hidden flex flex-col">
              <div className="h-40 bg-zinc-900 relative">
                {offer.media_url ? (
                  <img src={offer.media_url} alt={offer.title} className="w-full h-full object-cover opacity-80" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-700">
                    <ImageIcon className="w-8 h-8" />
                  </div>
                )}
                <div className="absolute top-2 right-2 flex gap-2">
                  <span className="px-2 py-1 bg-black/60 backdrop-blur-md rounded text-xs font-semibold text-white border border-white/10">
                    {offer.category}
                  </span>
                  {offer.is_free && (
                    <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 backdrop-blur-md rounded text-xs font-semibold border border-emerald-500/20">
                      FREE
                    </span>
                  )}
                </div>
              </div>
              <CardContent className="p-4 flex-1 flex flex-col">
                <h3 className="font-semibold text-lg text-foreground mb-1 line-clamp-1">{offer.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-4 flex-1">
                  {offer.copy_text || offer.description || "Sem descrição"}
                </p>
                
                <div className="flex items-center gap-2 mt-auto pt-4 border-t border-border">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 border-border bg-transparent hover:bg-secondary/50 text-xs"
                    onClick={() => toggleFreeStatus(offer.id, offer.is_free)}
                  >
                    {offer.is_free ? <X className="w-3 h-3 mr-1" /> : <Check className="w-3 h-3 mr-1" />}
                    {offer.is_free ? "Remover Free" : "Tornar Free"}
                  </Button>
                  {offer.ad_library_url && (
                    <Button variant="outline" size="sm" className="border-border bg-transparent hover:bg-secondary/50" asChild>
                      <a href={offer.ad_library_url} target="_blank" rel="noreferrer">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-red-500/20 text-red-400 bg-red-500/5 hover:bg-red-500/10"
                    onClick={() => handleDelete(offer.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
