"use client"

import { motion } from "framer-motion"
import { AlertTriangle, TrendingDown, Users, Cpu, Hand, BarChart3 } from "lucide-react"

const problems = [
  {
    icon: TrendingDown,
    title: "Baixa conversão",
    description: "Tráfego entrando, mas vendas não acontecendo. Funil quebrado."
  },
  {
    icon: AlertTriangle,
    title: "Operação quebrando na escala",
    description: "Quando aumenta o volume, tudo desmorona. Sistema não aguenta."
  },
  {
    icon: Users,
    title: "Leads perdidos",
    description: "Contatos entrando e sumindo. Sem CRM, sem follow-up, sem controle."
  },
  {
    icon: Cpu,
    title: "Processamento ruim",
    description: "Gateway instável, checkout travando, vendas perdidas no caminho."
  },
  {
    icon: BarChart3,
    title: "Falta de sistema",
    description: "Operação manual, sem dashboards, sem métricas, sem previsibilidade."
  },
  {
    icon: Hand,
    title: "Dependência manual",
    description: "Você no centro de tudo. Sem automação, sem escala, sem liberdade."
  }
]

export function ProblemSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Mais tráfego sem infraestrutura{" "}
            <span className="text-red-500">só acelera o prejuízo.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="group h-full p-6 rounded-xl border border-red-500/10 bg-card/50 backdrop-blur-sm hover:border-red-500/30 hover:bg-red-500/5 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-red-500/10 text-red-500 group-hover:bg-red-500/20 transition-colors">
                    <problem.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{problem.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{problem.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
