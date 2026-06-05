import { notFound } from "next/navigation"
import { getServiceBySlug, getAllServiceSlugs, services } from "@/lib/services-data"
import { ServicePageContent } from "@/components/service-page-content"
import type { Metadata } from "next"

interface ServicePageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  
  if (!service) {
    return { title: "Serviço não encontrado" }
  }

  return {
    title: `${service.title} | GHOSTING.ADS`,
    description: service.fullDescription.slice(0, 160),
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) {
    notFound()
  }

  return <ServicePageContent service={service} allServices={services} />
}
