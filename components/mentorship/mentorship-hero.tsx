"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { MessageCircle, Play, TrendingUp, Users, Zap, Target, BarChart3 } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

export function MentorshipHero() {
  const whatsappNumber = "5511999999999"
  const whatsappMessage = encodeURIComponent("Quero entrar para a Mentoria Método G.H.O.S.T")
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  // Animated counter
  const [revenue, setRevenue] = useState(0)
  const [students, setStudents] = useState(0)
  const [growth, setGrowth] = useState(0)

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const interval = duration / steps

    let step = 0
    const timer = setInterval(() => {
      step++
      const progress = step / steps
      const eased = 1 - Math.pow(1 - progress, 3)
      
      setRevenue(Math.floor(4.7 * eased * 10) / 10)
      setStudents(Math.floor(127 * eased))
      setGrowth(Math.floor(312 * eased))

      if (step >= steps) clearInterval(timer)
    }, interval)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(200,169,107,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,107,0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5"
            >
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Sistema Operacional de Escala</span>
            </motion.div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Domine{" "}
                <span className="text-primary">Operacoes Digitais</span>
                {" "}de Escala
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                Aprenda a construir operacoes previsiveis utilizando o{" "}
                <span className="text-primary font-semibold">Metodo G.H.O.S.T</span>: funis, trafego, 
                automacao, SaaS, dashboards e crescimento escalavel em um unico ecossistema operacional.
              </p>
            </div>

            {/* Animated Stats */}
            <div className="grid grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="relative p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border"
              >
                <div className="absolute -top-2 -right-2 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="text-xs text-muted-foreground">Mentorados</span>
                </div>
                <div className="text-2xl font-bold text-foreground">+{students}</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="relative p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border"
              >
                <div className="absolute -top-2 -right-2 w-3 h-3 bg-primary rounded-full animate-pulse" />
                <div className="flex items-center gap-2 mb-1">
                  <BarChart3 className="w-4 h-4 text-primary" />
                  <span className="text-xs text-muted-foreground">Gerados</span>
                </div>
                <div className="text-2xl font-bold text-foreground">R${revenue}M</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="relative p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border"
              >
                <div className="absolute -top-2 -right-2 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <span className="text-xs text-muted-foreground">Crescimento</span>
                </div>
                <div className="text-2xl font-bold text-foreground">{growth}%</div>
              </motion.div>
            </div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 text-base px-8"
              >
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Entrar para a Mentoria
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-primary/30 hover:bg-primary/5 text-base px-8"
              >
                <Play className="mr-2 h-5 w-5" />
                Ver Demonstracao
              </Button>
            </motion.div>
          </motion.div>

          {/* Right - Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            {/* Glow */}
            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />
            
            {/* Dashboard mockup */}
            <div className="relative bg-card/80 backdrop-blur-sm border border-border rounded-2xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/30">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex-1 text-center">
                  <span className="text-xs text-muted-foreground font-mono">ghost.system/dashboard</span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                {/* Mini stats */}
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { label: "ROAS", value: "8.72x", trend: "+12%" },
                    { label: "Leads", value: "2.4k", trend: "+8%" },
                    { label: "Conv.", value: "4.2%", trend: "+3%" },
                    { label: "MRR", value: "47k", trend: "+15%" },
                  ].map((stat) => (
                    <div key={stat.label} className="p-3 rounded-lg bg-secondary/50 text-center">
                      <div className="text-xs text-muted-foreground mb-1">{stat.label}</div>
                      <div className="text-lg font-bold text-foreground">{stat.value}</div>
                      <div className="text-xs text-green-500">{stat.trend}</div>
                    </div>
                  ))}
                </div>

                {/* Chart mockup */}
                <div className="h-32 bg-secondary/30 rounded-lg p-4 relative overflow-hidden">
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-2">
                    {[40, 55, 45, 70, 60, 85, 75, 95, 80, 100].map((h, i) => (
                      <motion.div
                        key={i}
                        className="flex-1 bg-primary/60 rounded-t"
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
                      />
                    ))}
                  </div>
                  <div className="absolute top-2 left-4 text-xs text-muted-foreground">Faturamento</div>
                  <div className="absolute top-2 right-4 flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs text-green-500">LIVE</span>
                  </div>
                </div>

                {/* Activity feed */}
                <div className="space-y-2">
                  {[
                    { icon: Target, text: "Nova conversao detectada", time: "agora" },
                    { icon: TrendingUp, text: "Meta diaria atingida", time: "2min" },
                    { icon: Zap, text: "Automacao disparada", time: "5min" },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.2 + i * 0.1 }}
                      className="flex items-center gap-3 p-2 rounded-lg bg-secondary/30"
                    >
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <item.icon className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-foreground">{item.text}</div>
                      </div>
                      <div className="text-xs text-muted-foreground">{item.time}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
