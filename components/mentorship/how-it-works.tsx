"use client"

import { motion } from "framer-motion"
import { 
  Play, 
  Video, 
  BarChart3, 
  FileText, 
  Bot, 
  Users, 
  MessageCircle,
  Layout,
  Zap,
  Monitor
} from "lucide-react"

const features = [
  { icon: Play, label: "Aulas Gravadas", desc: "Conteudo estruturado" },
  { icon: Video, label: "Calls ao Vivo", desc: "Semanais com mentor" },
  { icon: BarChart3, label: "Dashboards", desc: "Templates prontos" },
  { icon: FileText, label: "Templates", desc: "Copys e estruturas" },
  { icon: Bot, label: "Automacoes", desc: "Workflows prontos" },
  { icon: Users, label: "Comunidade", desc: "Network exclusivo" },
  { icon: MessageCircle, label: "Suporte", desc: "Direto no grupo" },
  { icon: Layout, label: "Workspace", desc: "Area operacional" },
]

export function HowItWorks() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Sistema de Implementacao</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Como <span className="text-primary">Funciona</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A mentoria funciona como um sistema operacional de implementacao. 
            Voce aprende, aplica e escala com suporte direto.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="group p-5 rounded-xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{feature.label}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </motion.div>
              )
            })}
          </div>

          {/* System Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Glow */}
            <div className="absolute inset-0 bg-primary/10 blur-[80px] rounded-full" />
            
            {/* HUD Frame */}
            <div className="relative bg-card/80 backdrop-blur-sm border border-border rounded-2xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-secondary/30">
                <div className="flex items-center gap-2">
                  <Monitor className="w-4 h-4 text-primary" />
                  <span className="text-sm font-mono text-foreground">GHOST.SYSTEM</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs text-green-500">ONLINE</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Sidebar + Content mockup */}
                <div className="flex gap-4">
                  {/* Sidebar */}
                  <div className="w-1/4 space-y-2">
                    {["Dashboard", "Modulos", "Workspace", "Analytics", "Comunidade"].map((item, i) => (
                      <div
                        key={item}
                        className={`px-3 py-2 rounded text-xs ${i === 0 ? "bg-primary/20 text-primary" : "text-muted-foreground"}`}
                      >
                        {item}
                      </div>
                    ))}
                  </div>

                  {/* Main content */}
                  <div className="flex-1 space-y-3">
                    {/* Stats row */}
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { label: "Progresso", value: "67%" },
                        { label: "Nivel", value: "Elite" },
                        { label: "XP", value: "2.4k" },
                      ].map((stat) => (
                        <div key={stat.label} className="p-2 rounded bg-secondary/50 text-center">
                          <div className="text-xs text-muted-foreground">{stat.label}</div>
                          <div className="text-sm font-bold text-foreground">{stat.value}</div>
                        </div>
                      ))}
                    </div>

                    {/* Module progress */}
                    <div className="p-3 rounded-lg bg-secondary/30">
                      <div className="flex justify-between text-xs mb-2">
                        <span className="text-foreground">Modulo 3: Operational Systems</span>
                        <span className="text-primary">75%</span>
                      </div>
                      <div className="h-2 bg-background rounded-full overflow-hidden">
                        <div className="h-full w-3/4 bg-primary rounded-full" />
                      </div>
                    </div>

                    {/* Next action */}
                    <div className="p-3 rounded-lg border border-primary/30 bg-primary/5">
                      <div className="flex items-center gap-2 mb-1">
                        <Play className="w-3 h-3 text-primary" />
                        <span className="text-xs text-primary">Proxima aula</span>
                      </div>
                      <p className="text-sm text-foreground">Configurando CRM e Pipelines</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
