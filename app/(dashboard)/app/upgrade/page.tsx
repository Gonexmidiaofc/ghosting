"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Crown, Sparkles, CheckCircle2, Star, Zap, Infinity as InfinityIcon } from "lucide-react"

export default function UpgradePage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center max-w-3xl mx-auto space-y-8">
      <div className="space-y-4">
        <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Crown className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
          Destrave o Plano <span className="text-primary">DNA Elite</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Tenha acesso ilimitado a todas as ferramentas, garimpos de ofertas milionárias e acompanhamento direto para escalar sua operação.
        </p>
      </div>

      <Card className="bg-[#0d0d0d] border-primary/30 relative overflow-hidden w-full max-w-2xl text-left">
        <div className="absolute top-0 right-0 bg-primary/10 w-64 h-64 blur-3xl rounded-full -mr-20 -mt-20"></div>
        <CardContent className="p-8 md:p-10 relative z-10">
          <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
            <div className="space-y-6 flex-1">
              <h3 className="text-2xl font-bold text-foreground">Benefícios Exclusivos:</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <InfinityIcon className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-foreground"><strong>Acesso Ilimitado à Biblioteca de Ofertas</strong> Escaladas (BR, LATAM, Black, Infoprodutos)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-foreground"><strong>1 Oferta Individual Sob Demanda</strong> (Você pede o nicho e nós garimpamos para você)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-foreground"><strong>+15 Novas Ofertas Validadas</strong> adicionadas mensalmente direto do campo de batalha</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-foreground"><strong>Acesso aos Funis de Alta Conversão</strong> e scripts prontos para copiar e colar</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-background/50 border border-border p-6 rounded-2xl text-center min-w-[240px] shrink-0 backdrop-blur-sm">
              <p className="text-sm text-muted-foreground uppercase tracking-widest mb-2 font-semibold">Assinatura</p>
              <div className="flex items-end justify-center gap-1 mb-2">
                <span className="text-sm text-muted-foreground font-medium mb-1">R$</span>
                <span className="text-5xl font-black text-foreground">197</span>
                <span className="text-sm text-muted-foreground font-medium mb-1">/mês</span>
              </div>
              <p className="text-xs text-muted-foreground mb-6">Cancele quando quiser</p>
              <Button 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-12 text-md shadow-lg shadow-primary/20"
                onClick={() => {
                  // TODO: Colocar o link do gateway de pagamento (Kiwify, PerfectPay, Stripe, etc)
                  window.open("https://checkout.perfectpay.com.br/...", "_blank")
                }}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Assinar Agora
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <p className="text-sm text-muted-foreground">
        Após a assinatura, o seu acesso ao DNA Elite será liberado automaticamente em alguns minutos.
      </p>
    </div>
  )
}
