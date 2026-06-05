"use client"

import { motion } from "framer-motion"
import { Award, QrCode, Globe, Shield, Check } from "lucide-react"

export function CertificationSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5">
                <Award className="w-4 h-4 text-primary" />
                <span className="text-sm text-primary font-medium">Certificacao Oficial</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                Certified <span className="text-primary">G.H.O.S.T</span> Operator
              </h2>

              <p className="text-xl text-muted-foreground">
                Certificacao oficial para operadores digitais que concluirem o metodo completo. 
                Comprove sua expertise em operacoes digitais de alta performance.
              </p>

              <div className="space-y-4">
                {[
                  "Certificado digital com QR code verificavel",
                  "Pagina publica de verificacao",
                  "Badge exclusivo de Certified Operator",
                  "Acesso ao network de certificados",
                  "Reconhecimento na comunidade",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Certificate Preview */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Glow */}
              <div className="absolute inset-0 bg-primary/10 blur-[80px] rounded-full" />
              
              {/* Certificate */}
              <div className="relative bg-gradient-to-br from-card via-card to-secondary/30 border border-border rounded-2xl p-8 shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <Shield className="w-8 h-8 text-primary" />
                    <span className="font-bold text-lg text-foreground">GHOST.SYSTEM</span>
                  </div>
                  <div className="text-xs text-muted-foreground">ID: GHO-2024-0127</div>
                </div>

                {/* Title */}
                <div className="text-center mb-8">
                  <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
                    Certifica que
                  </p>
                  <h3 className="text-3xl font-bold text-foreground mb-4">
                    [Seu Nome]
                  </h3>
                  <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
                    Concluiu com exito o programa
                  </p>
                  <h4 className="text-2xl font-bold text-primary">
                    Metodo G.H.O.S.T
                  </h4>
                </div>

                {/* Details */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="text-center p-3 rounded-lg bg-secondary/50">
                    <div className="text-xs text-muted-foreground mb-1">Modulos</div>
                    <div className="text-lg font-bold text-foreground">7/7</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-secondary/50">
                    <div className="text-xs text-muted-foreground mb-1">XP Total</div>
                    <div className="text-lg font-bold text-foreground">5.000+</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-secondary/50">
                    <div className="text-xs text-muted-foreground mb-1">Level</div>
                    <div className="text-lg font-bold text-primary">Ghost</div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-6 border-t border-border">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Globe className="w-4 h-4" />
                    <span>ghost.system/verify/GHO-2024-0127</span>
                  </div>
                  <div className="w-16 h-16 rounded-lg bg-foreground/5 flex items-center justify-center">
                    <QrCode className="w-10 h-10 text-muted-foreground" />
                  </div>
                </div>

                {/* Badge */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/30">
                  <div className="text-center">
                    <Award className="w-8 h-8 text-primary-foreground mx-auto mb-1" />
                    <span className="text-xs text-primary-foreground font-bold">CERTIFIED</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
