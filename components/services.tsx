"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  LayoutTemplate, 
  Target, 
  Palette, 
  GitBranch, 
  Bot, 
  Sparkles, 
  LineChart, 
  DollarSign, 
  Code,
  GraduationCap,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  ArrowRight
} from "lucide-react"

interface ServicePlan {
  plano: string
  valor: string
  inclui: string
}

interface Service {
  id: string
  title: string
  icon: React.ElementType
  description: string
  plans: ServicePlan[]
}

const services: Service[] = [
  {
    id: "landing-page",
    title: "Landing Page",
    icon: LayoutTemplate,
    description: "Páginas de alta conversão com design dark premium e copy estratégica",
    plans: [
      { plano: "Starter", valor: "R$697", inclui: "Página de conversão, design premium, copy básica, responsiva, CTA WhatsApp" },
      { plano: "Premium", valor: "R$1.297", inclui: "Copy estratégica, estrutura psicológica, integração CRM, tracking" },
      { plano: "Scale", valor: "R$2.497", inclui: "UX avançada, automações, analytics, funil estruturado" },
    ]
  },
  {
    id: "gestao-trafego",
    title: "Gestão de Tráfego",
    icon: Target,
    description: "Escale suas vendas com campanhas estruturadas para aquisição qualificada",
    plans: [
      { plano: "Starter", valor: "R$997/mês", inclui: "Meta Ads, otimização básica, relatórios e criativos" },
      { plano: "Performance", valor: "R$1.997/mês", inclui: "Meta + Google Ads, estratégia semanal, funil e criativos premium" },
      { plano: "Scale", valor: "R$3.500 – R$7.000/mês", inclui: "Escala agressiva, multi campanhas, CRO e dashboards" },
    ]
  },
  {
    id: "criativos",
    title: "Criativos Premium",
    icon: Palette,
    description: "Designs que capturam atenção e maximizam conversões",
    plans: [
      { plano: "Starter", valor: "R$497", inclui: "5 criativos premium" },
      { plano: "Performance", valor: "R$897", inclui: "10 criativos + copy estratégica" },
      { plano: "Scale", valor: "R$1.497", inclui: "Criativos para testes e escala" },
    ]
  },
  {
    id: "funil",
    title: "Estruturação de Funil",
    icon: GitBranch,
    description: "Funis completos que convertem visitantes em clientes previsíveis",
    plans: [
      { plano: "Starter", valor: "R$1.297", inclui: "Landing page, CRM básico e automação inicial" },
      { plano: "Premium", valor: "R$2.497", inclui: "Funil completo, remarketing e recuperação" },
    ]
  },
  {
    id: "crm",
    title: "CRM + Automação",
    icon: Bot,
    description: "Sistemas que convertem leads automaticamente 24/7",
    plans: [
      { plano: "Starter", valor: "R$997", inclui: "Pipeline simples + automação WhatsApp" },
      { plano: "Scale", valor: "R$2.997+", inclui: "CRM completo, IA e automações avançadas" },
    ]
  },
  {
    id: "branding",
    title: "Branding Premium",
    icon: Sparkles,
    description: "Identidade visual que transmite autoridade e exclusividade",
    plans: [
      { plano: "Starter", valor: "R$797", inclui: "Identidade visual inicial + posicionamento" },
      { plano: "Premium", valor: "R$1.997", inclui: "Estratégia visual completa + branding dark premium" },
    ]
  },
  {
    id: "estrategia",
    title: "Estratégia Digital",
    icon: LineChart,
    description: "Consultoria para crescimento previsível e estruturado",
    plans: [
      { plano: "Consultoria", valor: "R$697 – R$1.497", inclui: "Diagnóstico, posicionamento e plano estratégico" },
    ]
  },
  {
    id: "financeiro",
    title: "Gestão Financeira",
    icon: DollarSign,
    description: "Organize suas finanças para escalar com previsibilidade",
    plans: [
      { plano: "Starter", valor: "R$997", inclui: "Organização financeira e KPIs" },
      { plano: "Premium", valor: "R$2.497", inclui: "Estrutura financeira + previsibilidade + crescimento" },
    ]
  },
  {
    id: "saas",
    title: "SaaS / Sistema",
    icon: Code,
    description: "Sistemas sob medida para automatizar operações complexas",
    plans: [
      { plano: "MVP", valor: "R$3.500+", inclui: "Estrutura inicial de sistema" },
      { plano: "Premium", valor: "R$7.000 – R$25.000+", inclui: "Sistema completo com automações e dashboards" },
    ]
  },
  {
    id: "mentoria",
    title: "Mentoria",
    icon: GraduationCap,
    description: "Acompanhamento direto para acelerar seu crescimento digital",
    plans: [
      { plano: "Individual", valor: "R$1.997/mês", inclui: "4 sessões individuais + acesso direto + materiais" },
      { plano: "Grupo", valor: "R$497/mês", inclui: "4 sessões em grupo + comunidade + materiais" },
      { plano: "VIP", valor: "R$4.997/mês", inclui: "Acompanhamento intensivo + implementação assistida" },
    ]
  },
]

function ServiceCard({ service }: { service: Service }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const Icon = service.icon

  const whatsappNumber = "5511999999999"
  const whatsappMessage = encodeURIComponent(`Olá! Tenho interesse no serviço de ${service.title}. Pode me dar mais informações?`)
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  return (
    <Card className="bg-card border-border hover:border-primary/30 transition-all duration-500 group relative overflow-hidden">
      {/* Subtle glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <CardHeader className="relative z-10">
        <div className="flex items-start justify-between">
          <div className="p-3 rounded-lg bg-secondary group-hover:bg-primary/10 transition-colors duration-300">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <span className="text-xs text-muted-foreground border border-border rounded-full px-3 py-1">
            {service.plans.length} {service.plans.length === 1 ? 'plano' : 'planos'}
          </span>
        </div>
        <CardTitle className="text-xl text-foreground pt-4">{service.title}</CardTitle>
        <CardDescription className="text-muted-foreground">
          {service.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="relative z-10 space-y-4">
        {/* Quick price range */}
        <div className="flex items-baseline gap-2">
          <span className="text-sm text-muted-foreground">A partir de</span>
          <span className="text-2xl font-bold text-primary">{service.plans[0].valor.split('/')[0].split(' ')[0]}</span>
        </div>

        {/* Expandable plans */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors w-full"
        >
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          {isExpanded ? "Ocultar planos" : "Ver todos os planos"}
        </button>

        {isExpanded && (
          <div className="space-y-3 pt-2 border-t border-border">
            {service.plans.map((plan, index) => (
              <div key={index} className="p-3 rounded-lg bg-secondary/50 border border-border/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-foreground">{plan.plano}</span>
                  <span className="text-primary font-bold">{plan.valor}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{plan.inclui}</p>
              </div>
            ))}
          </div>
        )}

        {/* CTAs */}
        <div className="flex gap-2 mt-4">
          <Button 
            asChild
            variant="outline"
            className="flex-1"
          >
            <Link href={`/servicos/${service.id}`}>
              Saiba Mais
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button 
            asChild
            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/10"
          >
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-4 w-4" />
              Orçamento
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export function Services() {
  return (
    <section id="servicos" className="relative py-24 sm:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(200,169,107,0.03)_0%,transparent_60%)]" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-sm text-primary tracking-widest uppercase mb-4">Serviços</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Estrutura completa para
            <br />
            <span className="text-muted-foreground">operações de escala.</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Cada serviço é projetado para se integrar em um sistema coeso de crescimento previsível.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  )
}
