"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { ChevronDown, HelpCircle } from "lucide-react"

const faqs = [
  {
    question: "Para quem e o Metodo G.H.O.S.T?",
    answer: "Para gestores de trafego, infoprodutores, donos de agencia e empreendedores digitais que querem estruturar operacoes escaláveis com funis, automacao, sistemas e dashboards profissionais. Se voce quer sair do operacional e ter uma maquina de crescimento, esse metodo e para voce."
  },
  {
    question: "Preciso ter experiencia previa?",
    answer: "Nao necessariamente. O programa foi desenhado para levar voce do basico ao avancado com os 7 modulos estruturados. Porem, se voce ja tem experiencia, vai acelerar ainda mais seus resultados e preencher lacunas que estao travando sua escala."
  },
  {
    question: "Quanto tempo preciso dedicar por semana?",
    answer: "Recomendamos pelo menos 5-8 horas por semana para consumir o conteudo e implementar. O sistema de XP e niveis foi criado justamente para manter voce engajado e evoluindo no seu ritmo. Quanto mais voce se dedicar, mais rapido atinge o nivel Ghost."
  },
  {
    question: "As aulas sao ao vivo ou gravadas?",
    answer: "Temos ambos. O conteudo principal e gravado na area de membros premium para voce assistir no seu ritmo. Alem disso, temos calls ao vivo semanais para tirar duvidas, analisar operacoes e mentorias em grupo/individual dependendo do plano escolhido."
  },
  {
    question: "O que e o sistema de XP e niveis?",
    answer: "E o nosso sistema de gamificacao. Voce comeca como Operator e evolui ate Ghost conforme completa modulos, desafios e implementacoes. Cada nivel desbloqueia conteudos exclusivos, badges e acesso a recursos premium. Isso torna a jornada mais engajante e mensuravel."
  },
  {
    question: "Tem suporte para duvidas?",
    answer: "Sim! Todos os planos incluem acesso a comunidade privada onde voce pode tirar duvidas e fazer networking. Planos Individual e VIP tem acesso direto via WhatsApp, calls 1:1 e revisao de projetos."
  },
  {
    question: "Como funciona a certificacao?",
    answer: "Ao completar todos os 7 modulos e atingir o nivel Ghost, voce recebe a certificacao oficial 'Certified G.H.O.S.T Operator' com QR code verificavel e pagina publica. E um diferencial de mercado que comprova sua expertise em operacoes digitais."
  },
  {
    question: "Posso parcelar o investimento?",
    answer: "Sim, aceitamos cartao de credito em ate 12x sem juros. Tambem temos condicoes especiais para pagamento a vista via Pix com desconto adicional."
  },
  {
    question: "Tem garantia?",
    answer: "Sim, oferecemos garantia incondicional de 7 dias. Se por qualquer motivo voce nao ficar satisfeito com o sistema e o metodo, devolvemos 100% do seu investimento sem questionamentos."
  },
  {
    question: "Por quanto tempo tenho acesso?",
    answer: "Depende do plano: Start tem suporte por 90 dias, Pro tem 6 meses de suporte intensivo, e Elite tem acesso vitalicio ao conteudo, atualizacoes e suporte premium."
  }
]

export function MentorshipFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-card/30 via-background to-card/30" />

      <div className="container mx-auto px-4 max-w-3xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6">
            <HelpCircle className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Duvidas Frequentes</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Perguntas e <span className="text-primary">Respostas</span>
          </h2>
        </motion.div>

        {/* FAQ items */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.03 }}
              className={`border rounded-xl overflow-hidden transition-colors ${
                openIndex === index ? "border-primary/50 bg-primary/5" : "border-border bg-card/30"
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-card/50 transition-colors"
              >
                <span className={`font-medium pr-4 transition-colors ${
                  openIndex === index ? "text-primary" : "text-foreground"
                }`}>
                  {faq.question}
                </span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                  openIndex === index ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                }`}>
                  <ChevronDown 
                    className={`w-4 h-4 transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`} 
                  />
                </div>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
