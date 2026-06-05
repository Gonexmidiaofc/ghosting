import { CinematicHero } from "@/components/cinematic-hero"
import { ProblemSection } from "@/components/problem-section"
import { InfrastructureSection } from "@/components/infrastructure-section"
import { OperationsSection } from "@/components/operations-section"
import { SaasDashboard } from "@/components/saas-dashboard"
import { Differentials } from "@/components/differentials"
import { Services } from "@/components/services"
import { FinalCTA } from "@/components/final-cta"
import { Footer } from "@/components/footer"
import { FloatingWhatsApp } from "@/components/floating-whatsapp"
import { NetworkBackground } from "@/components/network-background"

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative">
      <NetworkBackground />
      <div className="relative z-10">
        <CinematicHero />
        <ProblemSection />
        <InfrastructureSection />
        <OperationsSection />
        <SaasDashboard />
        <Differentials />
        <Services />
        <FinalCTA />
        <Footer />
      </div>
      <FloatingWhatsApp />
    </main>
  )
}
