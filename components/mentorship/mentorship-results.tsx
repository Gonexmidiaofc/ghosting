"use client"

import { motion } from "framer-motion"
import { TrendingUp, Users, DollarSign, Target, Quote, BarChart3, Zap } from "lucide-react"
import { useEffect, useState } from "react"

const stats = [
  {
    icon: DollarSign,
    value: 4.7,
    suffix: "M",
    prefix: "R$",
    label: "Gerados",
    description: "em operacoes digitais"
  },
  {
    icon: Users,
    value: 127,
    suffix: "+",
    prefix: "",
    label: "Mentorados",
    description: "ja passaram pelo programa"
  },
  {
    icon: TrendingUp,
    value: 312,
    suffix: "%",
    prefix: "",
    label: "Crescimento Medio",
    description: "nos primeiros 90 dias"
  },
  {
    icon: Target,
    value: 94,
    suffix: "%",
    prefix: "",
    label: "Taxa de Implementacao",
    description: "concluiram os modulos"
  }
]

const testimonials = [
  {
    name: "Rafael S.",
    role: "Gestor de Trafego",
    avatar: "RS",
    content: "Sai de R$8k/mes para R$47k/mes em 4 meses aplicando o Metodo G.H.O.S.T. A estrutura muda tudo.",
    result: "+487%",
    metric: "faturamento"
  },
  {
    name: "Carolina M.",
    role: "Infoprodutora",
    avatar: "CM",
    content: "Finalmente entendi como estruturar uma operacao de verdade. Hoje tenho previsibilidade e controle total.",
    result: "R$120k",
    metric: "lancamento"
  },
  {
    name: "Thiago R.",
    role: "Agencia Digital",
    avatar: "TR",
    content: "O modulo de SaaS me ajudou a criar um sistema que hoje vendo como servico. Receita recorrente garantida.",
    result: "R$15k",
    metric: "MRR"
  }
]

function AnimatedNumber({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    const duration = 2000
    const steps = 60
    const interval = duration / steps
    let step = 0
    
    const timer = setInterval(() => {
      step++
      const progress = step / steps
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(value * eased)
      if (step >= steps) clearInterval(timer)
    }, interval)

    return () => clearInterval(timer)
  }, [value])

  return (
    <span>
      {prefix}{value < 10 ? count.toFixed(1) : Math.floor(count)}{suffix}
    </span>
  )
}

export function MentorshipResults() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-card/50 via-background to-card/50" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6">
            <BarChart3 className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Resultados Reais</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Numeros que <span className="text-primary">comprovam</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Dados reais de operadores que aplicaram o Metodo G.H.O.S.T
          </p>
        </motion.div>

        {/* Stats with chart mockup */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative p-6 rounded-2xl border border-border bg-card/50 overflow-hidden group hover:border-primary/50 transition-colors"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
                <stat.icon className="w-8 h-8 text-primary mb-4" />
                <div className="text-3xl font-bold text-foreground">
                  <AnimatedNumber value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </div>
                <div className="text-foreground font-medium">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.description}</div>
              </motion.div>
            ))}
          </div>

          {/* Growth chart mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-primary/10 blur-[80px] rounded-full" />
            <div className="relative bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-semibold text-foreground">Crescimento dos Mentorados</h3>
                  <p className="text-sm text-muted-foreground">Media dos ultimos 12 meses</p>
                </div>
                <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-sm">
                  <TrendingUp className="w-4 h-4" />
                  +312%
                </div>
              </div>

              {/* Chart */}
              <div className="h-48 flex items-end justify-between gap-2">
                {[25, 35, 30, 45, 55, 50, 70, 65, 85, 90, 95, 100].map((h, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 bg-primary/60 rounded-t relative group"
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.05, duration: 0.5 }}
                  >
                    {i === 11 && (
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rounded-full animate-pulse" />
                    )}
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-between mt-4 text-xs text-muted-foreground">
                <span>Jan</span>
                <span>Mar</span>
                <span>Jun</span>
                <span>Set</span>
                <span>Dez</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative p-6 rounded-2xl border border-border bg-card/50 hover:border-primary/30 transition-colors"
            >
              <Quote className="w-8 h-8 text-primary/20 absolute top-4 right-4" />
              
              {/* Content */}
              <p className="text-foreground mb-6 relative z-10 leading-relaxed">
                {`"${testimonial.content}"`}
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  {testimonial.avatar}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>

              {/* Result badge */}
              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Resultado:</span>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="text-primary font-bold">{testimonial.result}</span>
                  <span className="text-sm text-muted-foreground">{testimonial.metric}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
