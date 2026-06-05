"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Activity, Zap, TrendingUp } from "lucide-react"
import Image from "next/image"

const whatsappNumber = "5511999999999"
const whatsappMessage = encodeURIComponent("Olá! Quero estruturar minha operação digital.")

const codeLines = [
  { text: "$ initializing ghost.system...", delay: 0 },
  { text: "→ connecting database [████████] 100%", delay: 400 },
  { text: "→ api_key: ●●●●●●●●●●●●●●●●", delay: 800 },
  { text: "→ loading campaigns.config", delay: 1200 },
  { text: "→ ROAS_target: 5.0x ✓", delay: 1600 },
  { text: "→ automation: ENABLED", delay: 2000 },
  { text: "→ scaling_mode: AGGRESSIVE", delay: 2400 },
  { text: "$ system.ready → ONLINE", delay: 2800 },
]

export function Hero() {
  const [visibleLines, setVisibleLines] = useState<number[]>([])
  const [showAvatar, setShowAvatar] = useState(false)
  const [animationComplete, setAnimationComplete] = useState(false)

  useEffect(() => {
    // Show code lines sequentially
    codeLines.forEach((line, index) => {
      setTimeout(() => {
        setVisibleLines(prev => [...prev, index])
      }, line.delay)
    })

    // After all lines shown, fade them out and show avatar
    setTimeout(() => {
      setAnimationComplete(true)
    }, 3200)

    setTimeout(() => {
      setShowAvatar(true)
    }, 3600)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(200,169,107,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(200,169,107,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      
      {/* Animated Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }} />
      
      {/* Floating Particles */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDuration: "3s" }} />
      <div className="absolute top-40 right-20 w-3 h-3 bg-primary/30 rounded-full animate-bounce" style={{ animationDuration: "4s", animationDelay: "1s" }} />
      <div className="absolute bottom-40 left-1/4 w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDuration: "3.5s", animationDelay: "2s" }} />
      
      {/* Rotating Ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-primary/5 rounded-full animate-spin" style={{ animationDuration: "20s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-primary/3 rounded-full animate-spin" style={{ animationDirection: "reverse", animationDuration: "30s" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50 backdrop-blur-sm mb-8">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm text-muted-foreground tracking-wide uppercase">Operacao Digital de Elite</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 text-balance">
              Escala nao nasce
              <br />
              <span className="text-primary">da sorte.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed text-pretty">
              Construimos operacoes digitais para crescimento previsivel. 
              Trafego, SaaS, automacao, landing pages e CRM integrados em uma estrutura de escala.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Button 
                size="lg" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-base font-semibold shadow-lg shadow-primary/20"
                asChild
              >
                <a href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer">
                  Estruturar Operacao
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-border hover:bg-secondary px-8 py-6 text-base"
                asChild
              >
                <a href="#servicos">
                  Ver Servicos
                </a>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center lg:items-start p-4 rounded-lg border border-border bg-card/30 backdrop-blur-sm">
                <Activity className="h-5 w-5 text-primary mb-2" />
                <span className="text-2xl font-bold text-foreground">+500%</span>
                <span className="text-xs text-muted-foreground">ROAS medio</span>
              </div>
              <div className="flex flex-col items-center lg:items-start p-4 rounded-lg border border-border bg-card/30 backdrop-blur-sm">
                <Zap className="h-5 w-5 text-primary mb-2" />
                <span className="text-2xl font-bold text-foreground">R$10M+</span>
                <span className="text-xs text-muted-foreground">Em ads</span>
              </div>
              <div className="flex flex-col items-center lg:items-start p-4 rounded-lg border border-border bg-card/30 backdrop-blur-sm">
                <TrendingUp className="h-5 w-5 text-primary mb-2" />
                <span className="text-2xl font-bold text-foreground">150+</span>
                <span className="text-xs text-muted-foreground">Operacoes</span>
              </div>
            </div>
          </div>

          {/* Ghost Mascot with Code Reveal Animation */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-80 h-80 sm:w-96 sm:h-96 lg:w-[450px] lg:h-[450px]">
              {/* Glow behind */}
              <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-3xl scale-90" />
              
              {/* Terminal with code - fades out */}
              <div 
                className={`absolute inset-0 bg-[#0a0a0a] rounded-2xl border border-primary/30 overflow-hidden transition-opacity duration-700 ${animationComplete ? 'opacity-0' : 'opacity-100'}`}
              >
                {/* Terminal header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-[#141414] border-b border-primary/20">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-3 text-xs text-muted-foreground font-mono">ghost.system</span>
                </div>
                
                {/* Code lines */}
                <div className="p-4 font-mono text-xs sm:text-sm space-y-2">
                  {codeLines.map((line, index) => (
                    <div 
                      key={index}
                      className={`transition-all duration-300 ${
                        visibleLines.includes(index) 
                          ? 'opacity-100 translate-x-0' 
                          : 'opacity-0 -translate-x-4'
                      }`}
                    >
                      <span className={
                        line.text.includes('✓') || line.text.includes('ONLINE') || line.text.includes('ENABLED')
                          ? 'text-green-400'
                          : line.text.includes('●●●')
                          ? 'text-yellow-400'
                          : line.text.includes('AGGRESSIVE')
                          ? 'text-primary'
                          : 'text-muted-foreground'
                      }>
                        {line.text}
                      </span>
                      {index === visibleLines.length - 1 && !animationComplete && (
                        <span className="inline-block w-2 h-4 bg-primary ml-1 animate-pulse" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Ghost Image - fades in */}
              <div 
                className={`absolute inset-0 transition-all duration-700 ${
                  showAvatar ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
              >
                <Image
                  src="/ghost-mascot.jpg"
                  alt="GHOSTING.ADS Mascot"
                  fill
                  className="object-cover rounded-2xl border border-primary/20 shadow-2xl shadow-primary/10"
                  priority
                />
              </div>
              
              {/* Floating badge */}
              <div 
                className={`absolute -bottom-4 -right-4 px-4 py-2 bg-card border border-primary/30 rounded-lg shadow-lg transition-all duration-500 ${
                  showAvatar ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                <span className="text-primary font-mono text-sm font-bold">GHOSTING.ADS</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
