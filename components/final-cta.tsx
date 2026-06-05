"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Zap, Lock, Users } from "lucide-react"

const whatsappNumber = "5511999999999"
const whatsappMessage = encodeURIComponent("Olá! Quero entrar na operação GHOSTING.ADS")

export function FinalCTA() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]" />
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(200, 169, 107, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(200, 169, 107, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Exclusivity badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5">
              <Lock className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary">Acesso Restrito</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary">Vagas Limitadas</span>
            </div>
          </div>

          {/* Headline */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Quem controla a infraestrutura
            <br />
            <span className="text-primary">controla a escala.</span>
          </h2>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            Operações grandes não crescem por acaso. Crescem porque a estrutura suporta.
          </p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Button 
              size="lg" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-12 py-8 text-lg font-bold shadow-2xl shadow-primary/30 group"
              asChild
            >
              <a href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer">
                <Zap className="mr-3 h-6 w-6" />
                Entrar na operação
              </a>
            </Button>
          </motion.div>

          {/* Trust text */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="mt-8 text-sm text-muted-foreground"
          >
            Operação privada. Resposta em até 2 horas.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
