"use client"

import { MessageCircle } from "lucide-react"

export function FloatingWhatsApp() {
  const whatsappNumber = "5511999999999"
  const whatsappMessage = encodeURIComponent("Olá! Vim pelo site e gostaria de estruturar minha operação digital.")
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full shadow-lg shadow-[#25D366]/30 hover:scale-110 transition-all duration-300"
      aria-label="Falar pelo WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  )
}
