"use client"

import { motion } from "framer-motion"
import { 
  Shield, 
  Sword, 
  Crown, 
  Gem, 
  Ghost,
  Lock,
  Star,
  Zap
} from "lucide-react"
import { cn } from "@/lib/utils"

const levels = [
  {
    name: "Operator",
    xp: "0 - 500 XP",
    icon: Shield,
    color: "bg-zinc-600",
    borderColor: "border-zinc-500",
    unlocks: ["Modulo 0", "Comunidade", "Templates Basicos"],
    progress: 100
  },
  {
    name: "Commander",
    xp: "500 - 1.500 XP",
    icon: Sword,
    color: "bg-blue-600",
    borderColor: "border-blue-500",
    unlocks: ["Modulos 1-2", "Calls em Grupo", "SOPs"],
    progress: 75
  },
  {
    name: "Elite",
    xp: "1.500 - 3.000 XP",
    icon: Crown,
    color: "bg-purple-600",
    borderColor: "border-purple-500",
    unlocks: ["Modulos 3-4", "Workspace IA", "Dashboards"],
    progress: 45
  },
  {
    name: "Titan",
    xp: "3.000 - 5.000 XP",
    icon: Gem,
    color: "bg-amber-600",
    borderColor: "border-amber-500",
    unlocks: ["Modulos 5-6", "Mentorias 1:1", "Certificacao"],
    progress: 20
  },
  {
    name: "Ghost",
    xp: "5.000+ XP",
    icon: Ghost,
    color: "bg-primary",
    borderColor: "border-primary",
    unlocks: ["Acesso Total", "Network Elite", "Bonus Exclusivos"],
    progress: 5
  }
]

export function RoadmapSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-card/50 via-background to-card/50" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6">
            <Star className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Sistema de Evolucao</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Roadmap de <span className="text-primary">Evolucao</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Evolua seu nivel operacional, desbloqueie conteudos exclusivos e conquiste sua certificacao.
          </p>
        </motion.div>

        {/* Levels */}
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Connection line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-zinc-600 via-primary/50 to-primary" />

            {/* Level cards */}
            <div className="space-y-8">
              {levels.map((level, index) => {
                const Icon = level.icon
                const isLeft = index % 2 === 0

                return (
                  <motion.div
                    key={level.name}
                    initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={cn(
                      "relative flex items-center",
                      "md:justify-start",
                      !isLeft && "md:flex-row-reverse"
                    )}
                  >
                    {/* Node */}
                    <div className={cn(
                      "absolute left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 rounded-full flex items-center justify-center z-10",
                      level.color,
                      "shadow-lg"
                    )}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Card */}
                    <div className={cn(
                      "ml-24 md:ml-0 md:w-[45%]",
                      isLeft ? "md:mr-auto md:pr-12" : "md:ml-auto md:pl-12"
                    )}>
                      <div className={cn(
                        "bg-card/50 backdrop-blur-sm border rounded-xl p-6",
                        level.borderColor
                      )}>
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-foreground">{level.name}</h3>
                            <p className="text-sm text-muted-foreground">{level.xp}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(index + 1)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-primary fill-primary" />
                            ))}
                          </div>
                        </div>

                        {/* Progress */}
                        <div className="mb-4">
                          <div className="flex justify-between text-xs text-muted-foreground mb-1">
                            <span>Membros neste nivel</span>
                            <span>{level.progress}%</span>
                          </div>
                          <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${level.progress}%` }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.5, duration: 0.8 }}
                              className={cn("h-full rounded-full", level.color)}
                            />
                          </div>
                        </div>

                        {/* Unlocks */}
                        <div className="space-y-2">
                          <p className="text-xs text-muted-foreground uppercase tracking-wider">Desbloqueios:</p>
                          <div className="flex flex-wrap gap-2">
                            {level.unlocks.map((unlock) => (
                              <span
                                key={unlock}
                                className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs bg-secondary/50 text-foreground"
                              >
                                <Lock className="w-3 h-3" />
                                {unlock}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-4">
            Comece como <span className="text-foreground font-semibold">Operator</span> e evolua ate se tornar um <span className="text-primary font-semibold">Ghost</span>.
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border border-primary/30">
            <Zap className="w-5 h-5 text-primary" />
            <span className="text-primary font-medium">Ganhe XP completando modulos, desafios e implementacoes</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
