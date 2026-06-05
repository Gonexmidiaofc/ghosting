"use client"

import { motion } from "framer-motion"
import { Server, LineChart, Gauge, Cpu, TrendingUp, Shield } from "lucide-react"

const pillars = [
  {
    icon: Server,
    title: "Infraestrutura",
    description: "Arquitetura robusta que suporta qualquer volume sem quebrar."
  },
  {
    icon: LineChart,
    title: "Previsibilidade",
    description: "Métricas claras e dashboards que mostram exatamente onde você está."
  },
  {
    icon: Gauge,
    title: "Performance",
    description: "Otimização contínua para maximizar cada real investido."
  },
  {
    icon: Cpu,
    title: "Processamento",
    description: "Gateways estáveis e checkout otimizado para não perder vendas."
  },
  {
    icon: TrendingUp,
    title: "Escala",
    description: "Sistema preparado para multiplicar volume sem esforço manual."
  },
  {
    icon: Shield,
    title: "Controle",
    description: "Visão total da operação com automações inteligentes."
  }
]

export function Differentials() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(200, 169, 107, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(200, 169, 107, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Não vendemos marketing.
            <br />
            <span className="text-primary">Construímos operações digitais.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="group h-full p-8 rounded-xl border border-border bg-card/30 backdrop-blur-sm hover:border-primary/30 hover:bg-primary/5 transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <pillar.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{pillar.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{pillar.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
