"use client"

import { useEffect, useState, use } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ExternalLink, Copy, CheckCircle2, Sparkles, Image as ImageIcon } from "lucide-react"

interface ScaledOffer {
  id: string
  title: string
  description: string
  copy_text: string
  media_url: string
  ad_library_url: string
  category: string
  is_free: boolean
  created_at: string
}

export default function OfertaDetalhePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id } = use(params)
  
  const [offer, setOffer] = useState<ScaledOffer | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  
  const supabase = createClient()

  useEffect(() => {
    async function loadOffer() {
      const { data, error } = await supabase
        .from("scaled_offers")
        .select("*")
        .eq("id", id)
        .single()
        
      if (data) setOffer(data)
      setLoading(false)
    }
    loadOffer()
  }, [id])

  const copyToClipboard = () => {
    if (offer?.copy_text) {
      navigator.clipboard.writeText(offer.copy_text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!offer) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-foreground">Oferta não encontrada</h2>
        <p className="text-muted-foreground mt-2 mb-6">Esta oferta pode ter sido removida ou você não tem acesso a ela.</p>
        <Button onClick={() => router.push('/app/ofertas-escaladas')} variant="outline">
          Voltar para o Garimpo
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Navigation */}
      <button 
        onClick={() => router.push('/app/ofertas-escaladas')}
        className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Voltar para ofertas
      </button>

      {/* Header Info */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-primary/20 text-primary rounded-md text-xs font-bold uppercase tracking-wider">
            {offer.category}
          </span>
          {offer.is_free && (
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-md text-xs font-bold uppercase tracking-wider">
              Oferta Gratuita
            </span>
          )}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">{offer.title}</h1>
        {offer.description && (
          <p className="text-muted-foreground mt-3 text-lg">{offer.description}</p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6">
        {/* Left Column: Media & Actions */}
        <div className="space-y-6">
          <Card className="bg-card border-border overflow-hidden">
            <div className="aspect-video bg-zinc-900 relative flex items-center justify-center">
              {offer.media_url ? (
                <img 
                  src={offer.media_url} 
                  alt={offer.title} 
                  className="w-full h-full object-contain"
                />
              ) : (
                <ImageIcon className="w-16 h-16 text-zinc-700" />
              )}
            </div>
            <CardContent className="p-4">
              <Button 
                className="w-full bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-colors"
                asChild
              >
                <a href={offer.ad_library_url} target="_blank" rel="noreferrer">
                  Ver no Facebook Ad Library
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Ghost AI Placeholder - future integration */}
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-primary text-lg">
                <Sparkles className="w-5 h-5 mr-2" />
                Análise do Ghost AI
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Em breve, seus agentes de Inteligência Artificial analisarão esta oferta automaticamente, extraindo gatilhos mentais, dores do público e sugerindo variações da copy!
              </p>
              <Button disabled variant="outline" className="w-full bg-background/50 border-primary/20 text-primary/50">
                Agente Analisando Estrutura...
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Copy text */}
        <div className="space-y-6">
          <Card className="bg-card border-border h-full flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-border">
              <CardTitle className="text-lg">Copy do Anúncio</CardTitle>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={copyToClipboard}
                className={copied ? "text-emerald-500" : "text-muted-foreground hover:text-foreground"}
              >
                {copied ? (
                  <><CheckCircle2 className="w-4 h-4 mr-2" /> Copiado</>
                ) : (
                  <><Copy className="w-4 h-4 mr-2" /> Copiar Copy</>
                )}
              </Button>
            </CardHeader>
            <CardContent className="p-6 flex-1 bg-secondary/10 overflow-y-auto">
              <div className="whitespace-pre-wrap text-sm md:text-base leading-relaxed text-foreground/90 font-medium">
                {offer.copy_text || "Nenhuma copy cadastrada para esta oferta."}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
