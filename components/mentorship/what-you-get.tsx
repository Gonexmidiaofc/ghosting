"use client"

import { motion } from "framer-motion"
import { 
  Layout, 
  BarChart3, 
  Users, 
  FileText, 
  Bot, 
  Video,
  MessageCircle,
  Palette,
  Target,
  Sparkles,
  Check
} from "lucide-react"

const benefits = [
  { icon: Layout, title: "Area de Membros Premium", desc: "Plataforma exclusiva com design premium e navegacao intuitiva" },
  { icon: BarChart3, title: "Dashboard Operacional", desc: "Acompanhe seu progresso, XP e evolucao em tempo real" },
  { icon: Users, title: "Comunidade Privada", desc: "Network com outros operadores e mentorados de elite" },
  { icon: FileText, title: "Templates & SOPs", desc: "Documentos prontos para usar nas suas operacoes" },
  { icon: Bot, title: "Workspace IA", desc: "Assistente inteligente para duvidas e implementacoes" },
  { icon: Video, title: "Calls Semanais", desc: "Sessoes ao vivo com mentor para tirar duvidas" },
  { icon: MessageCircle, title: "Suporte Direto", desc: "Acesso ao grupo exclusivo para suporte rapido" },
  { icon: Palette, title: "Biblioteca de Criativos", desc: "Referencias e templates de criativos que performam" },
  { icon: Target, title: "Tracking Systems", desc: "Sistemas de acompanhamento de metricas prontos" },
]

export function WhatYouGet() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Acesso Completo</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            O Que Voce <span className="text-primary">Recebe</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Mais do que uma mentoria. Um ecossistema operacional completo para voce escalar.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 max-w-4xl mx-auto"
        >
          <div className="p-8 rounded-2xl bg-primary/5 border border-primary/30">
            <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Check className="w-10 h-10 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Acesso Vitalicio a Todo o Conteudo
                </h3>
                <p className="text-muted-foreground">
                  Uma vez membro, voce tem acesso permanente a todos os modulos, atualizacoes futuras, 
                  templates e recursos da plataforma. Sem mensalidades escondidas.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
