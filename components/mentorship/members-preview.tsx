"use client"

import { motion } from "framer-motion"
import { 
  Monitor,
  BarChart3,
  Layout,
  Users,
  Bot,
  Play,
  Target,
  Zap
} from "lucide-react"

const tabs = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "modulos", label: "Modulos", icon: Layout },
  { id: "workspace", label: "Workspace", icon: Bot },
  { id: "comunidade", label: "Comunidade", icon: Users },
]

export function MembersPreview() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-card/50 via-background to-card/50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[200px]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6">
            <Monitor className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Preview do Sistema</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Mais do que uma mentoria.
          </h2>
          <p className="text-2xl text-primary font-semibold mb-4">
            Um sistema operacional completo.
          </p>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Acesse a area de membros com dashboard, analytics, workspace IA, comunidade e muito mais.
          </p>
        </motion.div>

        {/* System Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          {/* Browser frame */}
          <div className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm overflow-hidden shadow-2xl shadow-primary/5">
            {/* Browser header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-secondary/30">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="px-4 py-1 rounded-md bg-background/50 text-xs font-mono text-muted-foreground">
                  ghost.system/app
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs text-green-500">ONLINE</span>
              </div>
            </div>

            {/* App content */}
            <div className="flex">
              {/* Sidebar */}
              <div className="w-56 border-r border-border p-4 space-y-2 hidden md:block">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                    <Zap className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <span className="font-bold text-foreground">GHOST.SYSTEM</span>
                </div>
                
                {tabs.map((tab, i) => (
                  <div
                    key={tab.id}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                      i === 0 ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary/50"
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{tab.label}</span>
                  </div>
                ))}

                <div className="pt-4 mt-4 border-t border-border">
                  <div className="flex items-center gap-3 px-3 py-2.5 text-muted-foreground">
                    <Target className="w-4 h-4" />
                    <span className="text-sm">Analytics</span>
                  </div>
                  <div className="flex items-center gap-3 px-3 py-2.5 text-muted-foreground">
                    <Play className="w-4 h-4" />
                    <span className="text-sm">Aulas</span>
                  </div>
                </div>
              </div>

              {/* Main content */}
              <div className="flex-1 p-6 space-y-6">
                {/* Welcome */}
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Bem-vindo, Operator</h2>
                    <p className="text-sm text-muted-foreground">Continue sua evolucao no Metodo G.H.O.S.T</p>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm">
                    <span>Level: Elite</span>
                    <span className="font-bold">2.450 XP</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-4">
                  {[
                    { label: "Progresso", value: "67%", trend: "+12%" },
                    { label: "Modulos", value: "4/7", trend: "2 restantes" },
                    { label: "Horas", value: "32h", trend: "esta semana" },
                    { label: "Ranking", value: "#14", trend: "Top 15%" },
                  ].map((stat) => (
                    <div key={stat.label} className="p-4 rounded-xl bg-secondary/50">
                      <div className="text-xs text-muted-foreground mb-1">{stat.label}</div>
                      <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                      <div className="text-xs text-primary">{stat.trend}</div>
                    </div>
                  ))}
                </div>

                {/* Current module */}
                <div className="p-4 rounded-xl border border-primary/30 bg-primary/5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                        <Target className="w-5 h-5 text-orange-400" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">Modulo 02: HIGH PERFORMANCE TRAFFIC</div>
                        <div className="text-sm text-muted-foreground">Aula 6 de 10 - Criativos que performam</div>
                      </div>
                    </div>
                    <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium">
                      Continuar
                    </button>
                  </div>
                  <div className="h-2 bg-background rounded-full overflow-hidden">
                    <div className="h-full w-[60%] bg-primary rounded-full" />
                  </div>
                </div>

                {/* Activity */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-secondary/30">
                    <h3 className="font-semibold text-foreground mb-3">Proximas Calls</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 p-2 rounded-lg bg-background/50">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span className="text-sm">Call de Trafego - Hoje 19h</span>
                      </div>
                      <div className="flex items-center gap-3 p-2 rounded-lg bg-background/50">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span className="text-sm">Mentoria Grupo - Quinta 20h</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-secondary/30">
                    <h3 className="font-semibold text-foreground mb-3">Comunidade</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 p-2 rounded-lg bg-background/50">
                        <Users className="w-4 h-4 text-primary" />
                        <span className="text-sm">127 membros ativos</span>
                      </div>
                      <div className="flex items-center gap-3 p-2 rounded-lg bg-background/50">
                        <Bot className="w-4 h-4 text-primary" />
                        <span className="text-sm">Ghost AI disponivel 24/7</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
