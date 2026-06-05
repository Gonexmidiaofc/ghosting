"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Skull, Crown, Building2, Check } from "lucide-react"

const whatsappNumber = "5511999999999"

const audiences = [
  {
    id: "black",
    icon: Skull,
    title: "NICHO BLACK",
    subtitle: "(Promessa Clara)",
    tagline: "Para quem opera no limite",
    description: "Estrutura blindada para operações agressivas. Contingência, multi-contas, rotação de criativos e funis de alta conversão. Escale sem deixar rastro.",
    features: [
      "Contingência total em plataformas",
      "Estrutura multi-BM e multi-contas",
      "Funis de alta conversão anônimos",
      "Rotação automática de criativos",
      "Operação invisível e escalável"
    ],
    cta: "Quero estrutura blindada",
    message: "Olá! Trabalho no nicho black e preciso de uma estrutura blindada para escalar.",
    gradient: "from-red-950/20 via-transparent to-transparent",
    accentColor: "text-red-500",
    borderColor: "border-red-500/20 hover:border-red-500/40"
  },
  {
    id: "white",
    icon: Crown,
    title: "NICHO WHITE",
    subtitle: "(Promessa Forte)",
    tagline: "Performance com autoridade",
    description: "Estrutura premium para infoprodutores e experts. Funis de lançamento, perpétuo e high-ticket com posicionamento de mercado e escala previsível.",
    features: [
      "Funis de lançamento e perpétuo",
      "Posicionamento premium de marca",
      "Automação de vendas high-ticket",
      "Dashboards de performance",
      "Escala previsível e sustentável"
    ],
    cta: "Quero escalar meu infoproduto",
    message: "Olá! Tenho um infoproduto e quero escalar com estrutura profissional.",
    gradient: "from-primary/20 via-transparent to-transparent",
    accentColor: "text-primary",
    borderColor: "border-primary/20 hover:border-primary/40"
  },
  {
    id: "enterprise",
    icon: Building2,
    title: "EMPRESAS",
    subtitle: "(Promessa Qualificada)",
    tagline: "Operação corporativa de elite",
    description: "Estrutura enterprise para aquisição de leads qualificados. CRM integrado, automação comercial, relatórios executivos e processos escaláveis.",
    features: [
      "Geração de leads qualificados",
      "CRM e automação comercial",
      "Relatórios e dashboards executivos",
      "Processos de venda estruturados",
      "Integração com equipe comercial"
    ],
    cta: "Quero leads qualificados",
    message: "Olá! Tenho uma empresa e preciso de uma operação estruturada para gerar leads qualificados.",
    gradient: "from-blue-950/20 via-transparent to-transparent",
    accentColor: "text-blue-500",
    borderColor: "border-blue-500/20 hover:border-blue-500/40"
  }
]

export function AudienceSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(200,169,107,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(200,169,107,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50 backdrop-blur-sm mb-6">
            <span className="text-sm text-muted-foreground tracking-wide uppercase">Escolha Sua Operação</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Estrutura sob medida para
            <br />
            <span className="text-primary">seu modelo de negócio</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Cada operação exige uma abordagem diferente. Identificamos seu perfil e construímos a estrutura ideal para máxima performance.
          </p>
        </div>

        {/* Audience Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {audiences.map((audience, index) => (
            <div
              key={audience.id}
              className={`group relative rounded-2xl border ${audience.borderColor} bg-card/50 backdrop-blur-sm p-8 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl perspective-1000`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-b ${audience.gradient} rounded-2xl pointer-events-none`} />
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-card border border-border mb-6 ${audience.accentColor} group-hover:animate-pulse-glow`}>
                  <audience.icon className="h-7 w-7" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-foreground mb-1">{audience.title}</h3>
                <span className={`text-sm ${audience.accentColor} font-medium`}>{audience.subtitle}</span>
                
                {/* Tagline */}
                <p className="text-muted-foreground text-sm mt-3 mb-4 italic">{audience.tagline}</p>

                {/* Description */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {audience.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {audience.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className={`h-5 w-5 ${audience.accentColor} shrink-0 mt-0.5`} />
                      <span className="text-sm text-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  className="w-full bg-card border border-border hover:bg-secondary hover:border-primary/30 text-foreground font-semibold py-6 group-hover:shadow-lg transition-all"
                  asChild
                >
                  <a 
                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(audience.message)}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    {audience.cta}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
              </div>

              {/* Animated border glow on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className={`absolute inset-0 rounded-2xl ${audience.id === 'black' ? 'shadow-red-500/20' : audience.id === 'white' ? 'shadow-primary/20' : 'shadow-blue-500/20'} shadow-lg`} />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center text-muted-foreground text-sm mt-12">
          Não sabe qual operação é ideal para você? <a href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Olá! Quero entender qual estrutura é ideal para meu negócio.")}`} className="text-primary hover:underline">Fale com nosso time</a>
        </p>
      </div>
    </section>
  )
}
