"use client"

import { useEffect, useState } from "react"
import { TrendingUp, Users, DollarSign, Target, Activity, Zap } from "lucide-react"

interface Metric {
  label: string
  value: number
  suffix: string
  prefix?: string
  icon: React.ReactNode
  trend: number
  color: string
}

const baseMetrics: Omit<Metric, "value">[] = [
  { label: "Leads Hoje", suffix: "", icon: <Users className="w-4 h-4" />, trend: 12.5, color: "#C8A96B" },
  { label: "Conversão", suffix: "%", icon: <Target className="w-4 h-4" />, trend: 8.3, color: "#C8A96B" },
  { label: "Faturamento", prefix: "R$", suffix: "K", icon: <DollarSign className="w-4 h-4" />, trend: 23.1, color: "#C8A96B" },
  { label: "ROAS", suffix: "x", icon: <TrendingUp className="w-4 h-4" />, trend: 15.7, color: "#C8A96B" },
  { label: "CPL Médio", prefix: "R$", suffix: "", icon: <Activity className="w-4 h-4" />, trend: -18.2, color: "#C8A96B" },
  { label: "Campanhas", suffix: "", icon: <Zap className="w-4 h-4" />, trend: 5.0, color: "#C8A96B" },
]

const targetValues = [247, 4.8, 127, 5.2, 12, 24]

export function LiveMetrics() {
  const [values, setValues] = useState<number[]>(targetValues.map(() => 0))
  const [isAnimating, setIsAnimating] = useState(true)

  useEffect(() => {
    // Initial animation
    const duration = 2000
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easeOut = 1 - Math.pow(1 - progress, 3)

      setValues(targetValues.map((target) => target * easeOut))

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setIsAnimating(false)
      }
    }

    animate()
  }, [])

  // Simulate live updates
  useEffect(() => {
    if (isAnimating) return

    const interval = setInterval(() => {
      setValues((prev) =>
        prev.map((val, i) => {
          const fluctuation = (Math.random() - 0.5) * targetValues[i] * 0.05
          return Math.max(0, val + fluctuation)
        })
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [isAnimating])

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {baseMetrics.map((metric, index) => (
        <div
          key={metric.label}
          className="relative group p-4 rounded-lg bg-card/50 border border-border/50 hover:border-primary/50 transition-all duration-300"
        >
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-lg bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          
          {/* Live indicator */}
          <div className="absolute top-2 right-2 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] text-muted-foreground">LIVE</span>
          </div>

          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded bg-primary/10 text-primary">
                {metric.icon}
              </div>
            </div>
            
            <div className="text-2xl font-bold text-foreground tracking-tight">
              {metric.prefix}
              {values[index].toFixed(metric.suffix === "%" || metric.suffix === "x" ? 1 : 0)}
              {metric.suffix}
            </div>
            
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs text-muted-foreground">{metric.label}</span>
              <span className={`text-xs font-medium ${metric.trend >= 0 ? "text-green-500" : "text-red-500"}`}>
                {metric.trend >= 0 ? "+" : ""}{metric.trend}%
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
