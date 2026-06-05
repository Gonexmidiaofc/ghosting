"use client"

import { motion } from "framer-motion"
import { 
  Rocket, 
  Target, 
  Settings, 
  BarChart3, 
  TrendingUp,
  Zap,
  Check
} from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

const pillars = [
  {
    letter: "G",
    title: "GROWTH ARCHITECTURE",
    subtitle: "Arquitetura de Crescimento",
    description: "Construa funis, ofertas e estruturas de conversao capazes de transformar trafego em receita previsivel.",
    icon: Rocket,
    color: "from-amber-500 to-yellow-600",
    items: ["Funis", "Landing Pages", "VSLs", "Ofertas", "Conversao", "Checkout", "Automacao de vendas"]
  },
  {
    letter: "H",
    title: "HIGH PERFORMANCE TRAFFIC",
    subtitle: "Trafego de Alta Performance",
    description: "Domine aquisicao previsivel utilizando estrategias avancadas de Meta Ads, Google Ads e TikTok Ads.",
    icon: Target,
    color: "from-orange-500 to-red-600",
    items: ["Meta Ads", "Google Ads", "TikTok Ads", "Tracking", "Escala", "Criativos", "Contingencia"]
  },
  {
    letter: "O",
    title: "OPERATIONAL SYSTEMS",
    subtitle: "Sistemas Operacionais",
    description: "Estruture operacoes profissionais com CRM, automacoes e processos escalaveis.",
    icon: Settings,
    color: "from-blue-500 to-cyan-600",
    items: ["CRM", "Automacoes", "Pipelines", "Follow-up", "Equipe", "Processos", "Integracoes"]
  },
  {
    letter: "S",
    title: "SCALE INTELLIGENCE",
    subtitle: "Inteligencia de Escala",
    description: "Transforme dados em decisoes utilizando dashboards, BI e metricas em tempo real.",
    icon: BarChart3,
    color: "from-green-500 to-emerald-600",
    items: ["Dashboards", "BI", "KPIs", "Analytics", "Metricas", "Performance Tracking", "Relatorios"]
  },
  {
    letter: "T",
    title: "TACTICAL EXPANSION",
    subtitle: "Expansao Tatica",
    description: "Escale operacoes digitais com growth systems, expansao de canais e inteligencia operacional.",
    icon: TrendingUp,
    color: "from-purple-500 to-pink-600",
    items: ["Growth", "Expansao", "MRR", "LTV", "Escala", "Gestao", "Estrutura financeira"]
  }
]

export function GhostMethod() {
  const [activePillar, setActivePillar] = useState(0)

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
      
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Framework Proprietario</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            O Metodo <span className="text-primary">G.H.O.S.T</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            O sistema operacional utilizado para construir operacoes digitais previsiveis, automatizadas e escalaveis.
          </p>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            O Metodo G.H.O.S.T foi desenvolvido para transformar operacoes digitais comuns em estruturas 
            altamente lucrativas e previsiveis. Mais do que marketing, o metodo combina aquisicao, automacao, 
            inteligencia operacional, sistemas e growth em um unico ecossistema de performance.
          </p>
        </motion.div>

        {/* Letters Navigation */}
        <div className="flex justify-center gap-2 md:gap-4 mb-12">
          {pillars.map((pillar, index) => (
            <motion.button
              key={pillar.letter}
              onClick={() => setActivePillar(index)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "relative w-14 h-14 md:w-20 md:h-20 rounded-xl font-bold text-2xl md:text-4xl transition-all duration-300",
                activePillar === index 
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 scale-110"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80"
              )}
            >
              {pillar.letter}
              {activePillar === index && (
                <motion.div
                  layoutId="pillar-indicator"
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rounded-full"
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Active Pillar Content */}
        <motion.div
          key={activePillar}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 overflow-hidden">
            {/* Gradient background */}
            <div className={cn(
              "absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] opacity-20 bg-gradient-to-br",
              pillars[activePillar].color
            )} />

            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-start gap-6 mb-8">
                <div className={cn(
                  "w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-lg",
                  pillars[activePillar].color
                )}>
                  {(() => {
                    const Icon = pillars[activePillar].icon
                    return <Icon className="w-8 h-8 text-white" />
                  })()}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-1">
                    {pillars[activePillar].title}
                  </h3>
                  <p className="text-primary font-medium">
                    {pillars[activePillar].subtitle}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-lg text-muted-foreground mb-8">
                {pillars[activePillar].description}
              </p>

              {/* Items */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {pillars[activePillar].items.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-2 p-3 rounded-lg bg-secondary/50"
                  >
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Connection line */}
        <div className="hidden lg:block absolute top-[45%] left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>
    </section>
  )
}
