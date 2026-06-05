"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { MessageCircle, Play, Shield, Zap, TrendingUp, Users, BarChart3 } from "lucide-react"

export function MentorshipCTA() {
  const whatsappNumber = "5511999999999"
  const whatsappMessage = encodeURIComponent("Quero garantir minha vaga na Mentoria G.H.O.S.T")
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      
      {/* Glow effects */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-primary/10 blur-[150px] rounded-full" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-primary/5 blur-[150px] rounded-full" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-8">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Ultima Chamada</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Construa sua{" "}
              <span className="text-primary">maquina operacional</span>
              {" "}de escala.
            </h2>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Domine o Metodo G.H.O.S.T e transforme sua operacao digital em uma estrutura previsivel, 
              automatizada e escalavel.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 text-lg px-8 py-6"
              >
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Garantir Minha Vaga
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-primary/30 hover:bg-primary/5 text-lg px-8 py-6"
              >
                <Play className="mr-2 h-5 w-5" />
                Ver Demonstracao do Sistema
              </Button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                <span>Garantia de 7 dias</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                <span>Pagamento seguro</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                <span>Acesso imediato</span>
              </div>
            </div>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-3 gap-4 p-6 rounded-2xl bg-card/50 border border-border backdrop-blur-sm"
          >
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="w-5 h-5 text-primary" />
                <span className="text-2xl font-bold text-foreground">+127</span>
              </div>
              <span className="text-sm text-muted-foreground">Mentorados</span>
            </div>
            <div className="text-center border-x border-border">
              <div className="flex items-center justify-center gap-2 mb-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                <span className="text-2xl font-bold text-foreground">R$4.7M</span>
              </div>
              <span className="text-sm text-muted-foreground">Gerados</span>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span className="text-2xl font-bold text-foreground">312%</span>
              </div>
              <span className="text-sm text-muted-foreground">Crescimento</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-16 text-center text-sm text-muted-foreground">
        <p>Metodo G.H.O.S.T by <span className="text-primary">GHOSTING.ADS</span></p>
      </div>
    </section>
  )
}
