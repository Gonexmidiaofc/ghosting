"use client"

import { Target, Workflow, BarChart3, Bot, Database, Rocket } from "lucide-react"

const solutions = [
  {
    icon: Target,
    title: "Tráfego Estratégico",
    description: "Campanhas otimizadas para aquisição qualificada."
  },
  {
    icon: Workflow,
    title: "Automação Inteligente",
    description: "Fluxos que convertem leads em clientes automaticamente."
  },
  {
    icon: Database,
    title: "CRM Estruturado",
    description: "Gestão completa do ciclo de vida do cliente."
  },
  {
    icon: Bot,
    title: "IA Integrada",
    description: "Inteligência artificial em cada ponto de contato."
  },
  {
    icon: BarChart3,
    title: "Dashboards",
    description: "Métricas em tempo real para decisões rápidas."
  },
  {
    icon: Rocket,
    title: "Sistemas de Escala",
    description: "Infraestrutura pronta para crescimento exponencial."
  }
]

export function SolutionSection() {
  return (
    <section className="relative py-24 sm:py-32 bg-card/50">
      {/* Background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,169,107,0.05)_0%,transparent_70%)]" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm text-primary tracking-widest uppercase mb-4">A Solução</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Construímos estruturas digitais
            <br />
            <span className="text-primary">para aquisição, conversão e escala.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Uma operação completa que transforma tráfego em crescimento previsível.
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {solutions.map((solution, index) => (
            <div 
              key={index}
              className="group relative p-6 sm:p-8 rounded-lg border border-border bg-background hover:border-primary/50 transition-all duration-300"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-lg bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-lg bg-secondary flex items-center justify-center mb-5 group-hover:bg-primary/10 transition-colors">
                  <solution.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{solution.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{solution.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
