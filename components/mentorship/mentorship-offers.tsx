"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { 
  Check, 
  MessageCircle, 
  Zap, 
  Crown, 
  Users,
  Video,
  Clock,
  Shield,
  Star,
  X
} from "lucide-react"

const offers = [
  {
    id: "grupo",
    name: "Mentoria Grupo",
    subtitle: "Para quem quer comecar",
    price: "997",
    period: "/mes",
    description: "Acesso ao programa completo com aulas em grupo e suporte via comunidade.",
    icon: Users,
    popular: false,
    features: [
      { text: "Acesso aos 7 modulos completos", included: true },
      { text: "4 calls em grupo por mes", included: true },
      { text: "Comunidade exclusiva", included: true },
      { text: "Templates e materiais", included: true },
      { text: "Gravacoes das aulas", included: true },
      { text: "Sistema de XP e niveis", included: true },
      { text: "Suporte por 90 dias", included: true },
      { text: "Calls individuais", included: false },
      { text: "Revisao de projetos", included: false },
      { text: "Certificacao G.H.O.S.T", included: false },
    ]
  },
  {
    id: "individual",
    name: "Mentoria Individual",
    subtitle: "Acompanhamento personalizado",
    price: "2.497",
    period: "/mes",
    description: "Mentoria 1:1 com acompanhamento direto e personalizado para sua operacao.",
    icon: Zap,
    popular: true,
    features: [
      { text: "Acesso aos 7 modulos completos", included: true },
      { text: "4 calls individuais por mes", included: true },
      { text: "Comunidade exclusiva", included: true },
      { text: "Templates e materiais", included: true },
      { text: "Gravacoes das aulas", included: true },
      { text: "Sistema de XP e niveis", included: true },
      { text: "Suporte por 6 meses", included: true },
      { text: "Revisao de projetos", included: true },
      { text: "Acesso direto via WhatsApp", included: true },
      { text: "Certificacao G.H.O.S.T", included: true },
    ]
  },
  {
    id: "vip",
    name: "Mentoria VIP",
    subtitle: "Implementacao completa",
    price: "4.997",
    period: "/mes",
    description: "Programa intensivo com implementacao assistida e suporte ilimitado.",
    icon: Crown,
    popular: false,
    features: [
      { text: "Acesso aos 7 modulos completos", included: true },
      { text: "Calls ilimitadas", included: true },
      { text: "Comunidade exclusiva", included: true },
      { text: "Templates e materiais", included: true },
      { text: "Gravacoes das aulas", included: true },
      { text: "Sistema de XP e niveis", included: true },
      { text: "Suporte vitalicio", included: true },
      { text: "Revisao de projetos", included: true },
      { text: "Acesso direto via WhatsApp", included: true },
      { text: "Implementacao assistida", included: true },
      { text: "Certificacao G.H.O.S.T Premium", included: true },
    ]
  }
]

const bonuses = [
  {
    icon: Video,
    title: "Biblioteca de Aulas",
    description: "+50 aulas gravadas",
    value: "R$2.000"
  },
  {
    icon: Shield,
    title: "Comunidade Privada",
    description: "Networking exclusivo",
    value: "R$997"
  },
  {
    icon: Zap,
    title: "Templates Premium",
    description: "Funis, copies e mais",
    value: "R$1.500"
  },
  {
    icon: Clock,
    title: "Suporte Prioritario",
    description: "Resposta em 24h",
    value: "R$500"
  }
]

export function MentorshipOffers() {
  const whatsappNumber = "5511999999999"

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6">
            <Crown className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Investimento</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Escolha seu <span className="text-primary">Plano</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tres opcoes para diferentes momentos da sua jornada operacional
          </p>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16 max-w-6xl mx-auto">
          {offers.map((offer, index) => {
            const whatsappMessage = encodeURIComponent(`Quero saber mais sobre a ${offer.name} do Metodo G.H.O.S.T`)
            const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

            return (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className={`relative rounded-2xl border ${
                  offer.popular 
                    ? "border-primary bg-gradient-to-b from-primary/10 to-transparent shadow-lg shadow-primary/10" 
                    : "border-border bg-card/50"
                } p-6 flex flex-col`}
              >
                {offer.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    Mais Popular
                  </div>
                )}

                {/* Header */}
                <div className="text-center pb-6 border-b border-border">
                  <div className={`inline-flex p-3 rounded-xl ${offer.popular ? "bg-primary/20" : "bg-secondary"} mb-4`}>
                    <offer.icon className={`w-6 h-6 ${offer.popular ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{offer.name}</h3>
                  <p className="text-sm text-muted-foreground">{offer.subtitle}</p>
                  <div className="mt-4">
                    <span className="text-sm text-muted-foreground">R$</span>
                    <span className="text-4xl font-bold text-foreground">{offer.price}</span>
                    <span className="text-muted-foreground">{offer.period}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="py-6 flex-1">
                  <p className="text-sm text-muted-foreground mb-4">{offer.description}</p>
                  <ul className="space-y-3">
                    {offer.features.map((feature) => (
                      <li key={feature.text} className="flex items-start gap-2">
                        {feature.included ? (
                          <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                        ) : (
                          <X className="w-4 h-4 mt-0.5 flex-shrink-0 text-muted-foreground/30" />
                        )}
                        <span className={`text-sm ${feature.included ? "text-foreground" : "text-muted-foreground/50"}`}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <Button
                  asChild
                  size="lg"
                  className={`w-full ${
                    offer.popular 
                      ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20" 
                      : "bg-secondary text-foreground hover:bg-secondary/80"
                  }`}
                >
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Quero Este Plano
                  </a>
                </Button>
              </motion.div>
            )
          })}
        </div>

        {/* Bonuses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 p-8"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground">
              Bonus inclusos em <span className="text-primary">todos os planos</span>
            </h3>
            <p className="text-muted-foreground mt-2">Mais de R$5.000 em bonus exclusivos</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {bonuses.map((bonus, index) => (
              <motion.div
                key={bonus.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-4 rounded-xl bg-background/50 border border-border"
              >
                <bonus.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <h4 className="font-semibold text-foreground">{bonus.title}</h4>
                <p className="text-sm text-muted-foreground">{bonus.description}</p>
                <p className="text-primary font-bold mt-2">Valor: {bonus.value}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
