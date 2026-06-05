"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Zap, Rocket, Building2, Check, MessageCircle } from "lucide-react"

const operations = [
  {
    id: "start",
    name: "OPERAÇÃO START",
    tagline: "Para operações em validação.",
    description: "Estrutura inicial para validar seu modelo de negócio com infraestrutura profissional desde o primeiro dia.",
    features: [
      "Landing page de alta conversão",
      "Funil de entrada estruturado",
      "Integração com gateway",
      "Dashboard básico de métricas",
      "Setup de automações iniciais"
    ],
    icon: Zap,
    accent: "from-blue-500/20 to-cyan-500/20",
    border: "hover:border-blue-500/50"
  },
  {
    id: "scale",
    name: "OPERAÇÃO SCALE",
    tagline: "Para operações em crescimento agressivo.",
    description: "Infraestrutura robusta para suportar volume alto de tráfego e conversões sem quebrar.",
    features: [
      "Múltiplas landing pages otimizadas",
      "Funis de upsell e downsell",
      "CRM integrado com automações",
      "Múltiplos gateways de pagamento",
      "Dashboards avançados em tempo real",
      "Contingência e multi-contas"
    ],
    icon: Rocket,
    accent: "from-primary/20 to-yellow-500/20",
    border: "hover:border-primary/50",
    featured: true
  },
  {
    id: "infra",
    name: "OPERAÇÃO INFRA",
    tagline: "Infraestrutura completa para operações de alta escala.",
    description: "Ecossistema completo com sistemas personalizados, processamento próprio e arquitetura enterprise.",
    features: [
      "Sistemas SaaS sob medida",
      "Gateway próprio ou multi-gateway",
      "Infraestrutura de contingência total",
      "Automações avançadas com IA",
      "Dashboards enterprise customizados",
      "CRM completo com equipe comercial",
      "Arquitetura de escala ilimitada"
    ],
    icon: Building2,
    accent: "from-purple-500/20 to-pink-500/20",
    border: "hover:border-purple-500/50"
  }
]

export function OperationsSection() {
  const whatsappNumber = "5511999999999"

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm text-primary tracking-widest uppercase mb-4">Operações</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Escolha seu nível de{" "}
            <span className="text-primary">infraestrutura.</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {operations.map((op, index) => (
            <motion.div
              key={op.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className={`relative group ${op.featured ? 'lg:-mt-4 lg:mb-4' : ''}`}
            >
              {op.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full z-10">
                  MAIS POPULAR
                </div>
              )}

              <div className={`h-full rounded-2xl border border-border bg-card/50 backdrop-blur-sm ${op.border} transition-all duration-500 overflow-hidden`}>
                {/* Gradient top */}
                <div className={`h-1 w-full bg-gradient-to-r ${op.accent}`} />

                <div className="p-8">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${op.accent} flex items-center justify-center mb-6`}>
                    <op.icon className="w-7 h-7 text-foreground" />
                  </div>

                  {/* Header */}
                  <h3 className="text-xl font-bold text-foreground mb-2">{op.name}</h3>
                  <p className="text-primary font-medium mb-4">{op.tagline}</p>
                  <p className="text-sm text-muted-foreground mb-6">{op.description}</p>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {op.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Button
                    asChild
                    className={`w-full ${op.featured ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-secondary text-foreground hover:bg-secondary/80'}`}
                  >
                    <a
                      href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Olá! Tenho interesse na ${op.name}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Falar sobre esta operação
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
