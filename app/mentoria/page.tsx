import { MentorshipHero } from "@/components/mentorship/mentorship-hero"
import { GhostMethod } from "@/components/mentorship/ghost-method"
import { RoadmapSection } from "@/components/mentorship/roadmap-section"
import { HowItWorks } from "@/components/mentorship/how-it-works"
import { MentorshipModules } from "@/components/mentorship/mentorship-modules"
import { WhatYouGet } from "@/components/mentorship/what-you-get"
import { MentorshipResults } from "@/components/mentorship/mentorship-results"
import { MembersPreview } from "@/components/mentorship/members-preview"
import { CertificationSection } from "@/components/mentorship/certification-section"
import { MentorshipOffers } from "@/components/mentorship/mentorship-offers"
import { MentorshipFAQ } from "@/components/mentorship/mentorship-faq"
import { MentorshipCTA } from "@/components/mentorship/mentorship-cta"
import { NetworkBackground } from "@/components/network-background"
import { FloatingWhatsApp } from "@/components/floating-whatsapp"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Método G.H.O.S.T | Domine Operações Digitais de Escala",
  description: "O sistema operacional utilizado para construir operações digitais previsíveis, automatizadas e escaláveis. Funis, tráfego, automação, SaaS, dashboards e crescimento escalável.",
}

export default function MentoriaPage() {
  return (
    <main className="min-h-screen bg-background relative">
      <NetworkBackground />
      <div className="relative z-10">
        <MentorshipHero />
        <GhostMethod />
        <RoadmapSection />
        <HowItWorks />
        <MentorshipModules />
        <WhatYouGet />
        <MentorshipResults />
        <MembersPreview />
        <CertificationSection />
        <MentorshipOffers />
        <MentorshipFAQ />
        <MentorshipCTA />
      </div>
      <FloatingWhatsApp />
    </main>
  )
}
