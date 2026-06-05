"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { NetworkBackground } from "@/components/network-background"
import { FloatingWhatsApp } from "@/components/floating-whatsapp"
import { 
  ArrowLeft, 
  Check, 
  MessageCircle, 
  ChevronDown, 
  ChevronUp,
  ArrowRight,
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
  LucideIcon
} from "lucide-react"
import type { Service } from "@/lib/services-data"

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
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
}

interface ServicePageContentProps {
  service: Service
  allServices: Service[]
}

export function ServicePageContent({ service, allServices }: ServicePageContentProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const Icon = iconMap[service.iconName] || LayoutTemplate

  const whatsappNumber = "5511999999999"
  const whatsappMessage = encodeURIComponent(`Ola! Tenho interesse no servico de ${service.title}. Pode me dar mais informacoes?`)
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  // Get related services (excluding current)
  const relatedServices = allServices
    .filter(s => s.id !== service.id)
    .slice(0, 3)

  return (
    <main className="min-h-screen bg-background relative">
      <NetworkBackground />
      
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link 
              href="/#servicos" 
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Voltar</span>
            </Link>
            <Link href="/" className="text-xl font-bold text-foreground tracking-tight">
              GHOSTING<span className="text-primary">.ADS</span>
            </Link>
            <Button asChild size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4 mr-2" />
                Contato
              </a>
            </Button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-16 sm:py-24 border-b border-border">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <span className="text-sm text-primary tracking-widest uppercase">Servico</span>
                </div>
                
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4 text-balance">
                  {service.title}
                </h1>
                
                <p className="text-xl text-muted-foreground mb-6">
                  {service.subtitle}
                </p>
                
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  {service.fullDescription}
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="h-5 w-5 mr-2" />
                      Solicitar Orcamento
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <a href="#planos">Ver Planos</a>
                  </Button>
                </div>
              </div>

              {/* Benefits Card */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-2xl blur-3xl" />
                <Card className="relative bg-card/80 backdrop-blur border-border">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-semibold text-foreground mb-6">
                      O que voce ganha
                    </h3>
                    <ul className="space-y-4">
                      {service.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="mt-1 p-1 rounded-full bg-primary/20">
                            <Check className="h-3 w-3 text-primary" />
                          </div>
                          <span className="text-muted-foreground">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 sm:py-24 border-b border-border">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <span className="text-sm text-primary tracking-widest uppercase mb-4 block">
                Recursos
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                O que esta incluso
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Cada detalhe pensado para entregar resultado
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.features.map((feature, index) => (
                <Card 
                  key={index} 
                  className="bg-card border-border hover:border-primary/30 transition-all group"
                >
                  <CardContent className="p-6">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <span className="text-primary font-bold">{String(index + 1).padStart(2, '0')}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Plans Section */}
        <section id="planos" className="py-16 sm:py-24 border-b border-border">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <span className="text-sm text-primary tracking-widest uppercase mb-4 block">
                Investimento
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Escolha seu plano
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Opcoes para cada momento do seu negocio
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {service.plans.map((plan, index) => {
                const isPopular = index === Math.floor(service.plans.length / 2)
                return (
                  <Card 
                    key={index} 
                    className={`relative bg-card border-border overflow-hidden ${
                      isPopular ? 'border-primary ring-1 ring-primary' : ''
                    }`}
                  >
                    {isPopular && (
                      <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-bl-lg font-medium">
                        Popular
                      </div>
                    )}
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {plan.plano}
                      </h3>
                      <div className="mb-4">
                        <span className="text-3xl font-bold text-primary">{plan.valor.split('/')[0]}</span>
                        {plan.valor.includes('/') && (
                          <span className="text-muted-foreground">/{plan.valor.split('/')[1]}</span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                        {plan.inclui}
                      </p>
                      <Button 
                        asChild 
                        className={`w-full ${
                          isPopular 
                            ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                            : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                        }`}
                      >
                        <a 
                          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Ola! Tenho interesse no plano ${plan.plano} de ${service.title}. Valor: ${plan.valor}`)}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          Quero Este
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 sm:py-24 border-b border-border">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-12">
              <span className="text-sm text-primary tracking-widest uppercase mb-4 block">
                FAQ
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Duvidas frequentes
              </h2>
            </div>

            <div className="space-y-4">
              {service.faq.map((item, index) => (
                <div 
                  key={index}
                  className="border border-border rounded-lg overflow-hidden bg-card"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full p-4 flex items-center justify-between text-left hover:bg-secondary/50 transition-colors"
                  >
                    <span className="font-medium text-foreground">{item.question}</span>
                    {openFaq === index ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    )}
                  </button>
                  {openFaq === index && (
                    <div className="px-4 pb-4">
                      <p className="text-muted-foreground">{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-24 border-b border-border">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Pronto para comecar?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Clique no botao abaixo e converse diretamente conosco. Sem formularios, sem espera.
            </p>
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5 mr-2" />
                Falar no WhatsApp
              </a>
            </Button>
          </div>
        </section>

        {/* Related Services */}
        <section className="py-16 sm:py-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <span className="text-sm text-primary tracking-widest uppercase mb-4 block">
                Relacionados
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Outros servicos
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedServices.map((related) => {
                const RelatedIcon = iconMap[related.iconName] || LayoutTemplate
                return (
                  <Link 
                    key={related.id} 
                    href={`/servicos/${related.slug}`}
                    className="group"
                  >
                    <Card className="bg-card border-border hover:border-primary/30 transition-all h-full">
                      <CardContent className="p-6">
                        <div className="p-3 rounded-lg bg-secondary inline-block mb-4 group-hover:bg-primary/10 transition-colors">
                          <RelatedIcon className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {related.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          {related.description}
                        </p>
                        <span className="text-primary text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                          Ver mais <ArrowRight className="h-4 w-4" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border py-8">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <Link href="/" className="text-lg font-bold text-foreground tracking-tight">
              GHOSTING<span className="text-primary">.ADS</span>
            </Link>
            <p className="text-sm text-muted-foreground mt-2">
              Operacoes digitais de escala.
            </p>
          </div>
        </footer>
      </div>

      <FloatingWhatsApp />
    </main>
  )
}
