"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { MessageCircle, Zap } from "lucide-react"
import Image from "next/image"

const terminalLines = [
  { text: "> initializing infrastructure...", delay: 0 },
  { text: "> gateway.connected ✓", delay: 400 },
  { text: "> campaigns.scaling ✓", delay: 800 },
  { text: "> processing.live ✓", delay: 1200 },
  { text: "> dashboard.synced ✓", delay: 1600 },
  { text: "> operation.online ✓", delay: 2000 },
]

const tags = ["Funis", "Performance", "Gateway", "SaaS", "Dashboards", "Escala"]

export function CinematicHero() {
  const [visibleLines, setVisibleLines] = useState<number[]>([])
  const [showAvatar, setShowAvatar] = useState(false)
  const whatsappNumber = "5511999999999"
  const whatsappMessage = encodeURIComponent("Olá! Quero entrar na operação GHOSTING.ADS")

  useEffect(() => {
    terminalLines.forEach((_, index) => {
      setTimeout(() => {
        setVisibleLines(prev => [...prev, index])
      }, terminalLines[index].delay)
    })

    setTimeout(() => {
      setShowAvatar(true)
    }, 3000)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(200, 169, 107, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(200, 169, 107, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Floating particles - fixed positions to avoid hydration mismatch */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          { left: 10, top: 20 }, { left: 25, top: 60 }, { left: 40, top: 15 },
          { left: 55, top: 75 }, { left: 70, top: 30 }, { left: 85, top: 55 },
          { left: 15, top: 85 }, { left: 35, top: 45 }, { left: 60, top: 90 },
          { left: 80, top: 10 }, { left: 5, top: 50 }, { left: 95, top: 40 },
          { left: 30, top: 70 }, { left: 50, top: 25 }, { left: 75, top: 65 },
        ].map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/40 rounded-full"
            style={{
              left: `${pos.left}%`,
              top: `${pos.top}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 5 + (i % 4),
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-sm text-primary font-medium tracking-wide">INFRAESTRUTURA OPERACIONAL</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
              Infraestrutura para{" "}
              <span className="text-primary">operações de alta escala.</span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              Construímos ecossistemas completos de aquisição, conversão e processamento para operações digitais que precisam crescer sem limites.
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-3">
              {tags.map((tag, index) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="px-3 py-1 text-sm text-muted-foreground border border-border rounded-md bg-secondary/50"
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
              >
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Zap className="mr-2 h-5 w-5" />
                  Entrar na operação
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary/30 hover:bg-primary/10"
              >
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Olá! Gostaria de solicitar um diagnóstico da minha operação.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Solicitar diagnóstico
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Right - Terminal + Avatar */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Terminal window */}
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: showAvatar ? 0 : 1 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 z-10"
              >
                <div className="h-full rounded-xl border border-primary/20 bg-card/80 backdrop-blur-xl overflow-hidden shadow-2xl shadow-primary/10">
                  {/* Terminal header */}
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/50">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <span className="text-xs text-muted-foreground ml-2 font-mono">ghosting://infrastructure</span>
                    <div className="ml-auto flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-xs text-green-500 font-mono">LIVE</span>
                    </div>
                  </div>

                  {/* Terminal content */}
                  <div className="p-6 font-mono text-sm space-y-2">
                    {terminalLines.map((line, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ 
                          opacity: visibleLines.includes(index) ? 1 : 0,
                          x: visibleLines.includes(index) ? 0 : -10
                        }}
                        className={`${
                          line.text.includes("✓") 
                            ? "text-green-500" 
                            : "text-primary"
                        }`}
                      >
                        {line.text}
                        {index === visibleLines.length - 1 && (
                          <span className="inline-block w-2 h-4 bg-primary ml-1 animate-pulse" />
                        )}
                      </motion.div>
                    ))}
                  </div>

                  {/* Fake metrics */}
                  <div className="absolute bottom-6 left-6 right-6 grid grid-cols-3 gap-4">
                    {[
                      { label: "Gateway", value: "ONLINE" },
                      { label: "Latency", value: "12ms" },
                      { label: "Uptime", value: "99.9%" },
                    ].map((metric, i) => (
                      <motion.div
                        key={metric.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: visibleLines.length > 4 ? 1 : 0, y: visibleLines.length > 4 ? 0 : 10 }}
                        transition={{ delay: i * 0.1 }}
                        className="text-center p-3 rounded-lg bg-secondary/50 border border-border"
                      >
                        <div className="text-xs text-muted-foreground">{metric.label}</div>
                        <div className="text-sm font-bold text-primary">{metric.value}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Avatar reveal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: showAvatar ? 1 : 0, scale: showAvatar ? 1 : 0.9 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="relative">
                  {/* Glow ring */}
                  <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl animate-pulse" />
                  
                  {/* Avatar container */}
                  <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-full overflow-hidden border-2 border-primary/30 shadow-2xl shadow-primary/20">
                    <Image
                      src="/ghost-mascot.jpg"
                      alt="GHOSTING.ADS"
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: showAvatar ? 1 : 0, y: showAvatar ? 0 : 20 }}
                    transition={{ delay: 0.3 }}
                    className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full bg-card border border-primary/30 shadow-lg"
                  >
                    <span className="text-sm font-bold text-primary tracking-wider">GHOSTING.ADS</span>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
