"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lock, Sparkles, ExternalLink, Image as ImageIcon } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

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

export default function OfertasEscaladasPage() {
  const [offers, setOffers] = useState<ScaledOffer[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<string>("ALL")
  const [isPremium, setIsPremium] = useState(false)
  
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    checkAccessAndLoadOffers()
  }, [])

  const checkAccessAndLoadOffers = async () => {
    setLoading(true)
    
    // Check if user is elite
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("plan")
        .eq("id", user.id)
        .single()
        
      if (profile && profile.plan === 'dna_elite') {
        setIsPremium(true)
      }
    }

    // Load offers (RLS will automatically filter out non-free offers if not elite)
    const { data, error } = await supabase
      .from("scaled_offers")
      .select("*")
      .order("created_at", { ascending: false })

    if (!error && data) {
      setOffers(data)
    }
    setLoading(false)
  }

  const filteredOffers = offers.filter(o => activeCategory === "ALL" || o.category === activeCategory)

  // Array falso para renderizar cadeados caso o usuario nao seja premium
  // Simulando que existem muitas ofertas escondidas
  const lockedOffersPlaceholder = isPremium ? [] : Array(6).fill(null)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Garimpo de Ofertas</h1>
        <p className="text-muted-foreground mt-1">Biblioteca exclusiva de anúncios escalados retirados direto do campo de batalha.</p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {["ALL", "BR", "LATAM", "INFOPRODUTO", "BLACK"].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeCategory === cat 
                ? "bg-primary text-primary-foreground" 
                : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
            }`}
          >
            {cat === "ALL" ? "Todas as Ofertas" : cat}
          </button>
        ))}
      </div>

      {/* Feed */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredOffers.map(offer => (
          <Card key={offer.id} className="bg-card border-border overflow-hidden flex flex-col group hover:border-primary/50 transition-colors">
            <div className="h-48 bg-zinc-900 relative">
              {offer.media_url ? (
                <img src={offer.media_url} alt={offer.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-700">
                  <ImageIcon className="w-10 h-10" />
                </div>
              )}
              <div className="absolute top-3 left-3 flex gap-2">
                <span className="px-2.5 py-1 bg-black/70 backdrop-blur-md rounded-md text-xs font-bold text-white border border-white/10 uppercase">
                  {offer.category}
                </span>
                {offer.is_free && !isPremium && (
                  <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 backdrop-blur-md rounded-md text-xs font-bold border border-emerald-500/20 uppercase">
                    Gratuita
                  </span>
                )}
              </div>
            </div>
            <CardContent className="p-5 flex-1 flex flex-col">
              <h3 className="font-bold text-lg text-foreground mb-2 line-clamp-2">{offer.title}</h3>
              <div className="text-sm text-muted-foreground line-clamp-3 mb-6 flex-1 bg-secondary/30 p-3 rounded-md italic">
                "{offer.copy_text || offer.description || "Sem copy disponível"}"
              </div>
              
              <Button 
                className="w-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={() => router.push(`/app/ofertas-escaladas/${offer.id}`)}
              >
                Ver Análise Completa
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        ))}

        {/* Cadeados (Upsell) */}
        {!isPremium && lockedOffersPlaceholder.map((_, i) => (
          <Card key={i} className="bg-card border-border overflow-hidden flex flex-col relative group cursor-pointer" onClick={() => router.push('/app/upgrade')}>
            {/* Blur overlay */}
            <div className="absolute inset-0 z-10 backdrop-blur-md bg-background/50 flex flex-col items-center justify-center p-6 text-center transition-all group-hover:bg-background/40">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <Lock className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg text-foreground mb-2">Conteúdo Premium</h3>
              <p className="text-sm text-muted-foreground mb-6">Assine o plano para desbloquear todas as ofertas e copiar nossas estratégias de escala.</p>
              <Button className="bg-primary text-primary-foreground">
                <Sparkles className="w-4 h-4 mr-2" />
                Desbloquear Acesso
              </Button>
            </div>

            {/* Fake Content Behind Blur */}
            <div className="h-48 bg-zinc-900/50"></div>
            <CardContent className="p-5 flex-1 flex flex-col opacity-30">
              <div className="h-6 bg-secondary rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-secondary rounded w-full mb-2"></div>
              <div className="h-4 bg-secondary rounded w-5/6 mb-6"></div>
              <div className="h-10 bg-secondary rounded w-full mt-auto"></div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {!isPremium && filteredOffers.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">Nenhuma oferta gratuita liberada no momento.</p>
        </div>
      )}
    </div>
  )
}
