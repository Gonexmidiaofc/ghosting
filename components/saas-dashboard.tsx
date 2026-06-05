"use client"

import { useState, useEffect, useRef } from "react"
import { 
  LayoutDashboard, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Target, 
  BarChart3,
  Settings,
  Zap,
  Globe,
  MessageSquare,
  Bell,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react"

// Sidebar navigation items
const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: BarChart3, label: "Analytics", active: false },
  { icon: Users, label: "Leads", active: false },
  { icon: Target, label: "Campanhas", active: false },
  { icon: Globe, label: "Trafego", active: false },
  { icon: MessageSquare, label: "CRM", active: false },
  { icon: Settings, label: "Config", active: false },
]

// KPI Cards data
const kpiData = [
  { label: "Faturamento", value: 127450, prefix: "R$", trend: 23.5, icon: DollarSign },
  { label: "Leads", value: 1847, prefix: "", trend: 18.2, icon: Users },
  { label: "ROAS", value: 5.8, prefix: "", suffix: "x", trend: 12.7, icon: TrendingUp },
  { label: "Conversao", value: 4.2, prefix: "", suffix: "%", trend: -2.1, icon: Target },
]

export function SaasDashboard() {
  const [metrics, setMetrics] = useState(kpiData.map(k => ({ ...k, displayValue: 0 })))
  const [chartData, setChartData] = useState<number[]>([35, 42, 38, 55, 48, 62, 58, 72, 68, 85, 78, 92])
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    )
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  // Animate KPI values on visibility
  useEffect(() => {
    if (!isVisible) return

    const duration = 1500
    const startTime = Date.now()
    let rafId: number

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easeOut = 1 - Math.pow(1 - progress, 3)

      setMetrics(kpiData.map(k => ({
        ...k,
        displayValue: k.value * easeOut
      })))

      if (progress < 1) {
        rafId = requestAnimationFrame(animate)
      }
    }

    animate()
    return () => cancelAnimationFrame(rafId)
  }, [isVisible])

  // Smooth chart updates
  useEffect(() => {
    if (!isVisible) return

    const interval = setInterval(() => {
      setChartData(prev => {
        const newData = [...prev.slice(1)]
        const lastVal = prev[prev.length - 1]
        const change = (Math.random() - 0.35) * 12
        newData.push(Math.max(25, Math.min(100, lastVal + change)))
        return newData
      })
    }, 1200)

    return () => clearInterval(interval)
  }, [isVisible])

  // Smooth metric fluctuations
  useEffect(() => {
    if (!isVisible) return

    const interval = setInterval(() => {
      setMetrics(prev => prev.map(m => ({
        ...m,
        displayValue: m.displayValue + (Math.random() - 0.4) * m.value * 0.01
      })))
    }, 2500)

    return () => clearInterval(interval)
  }, [isVisible])

  const formatValue = (val: number, prefix?: string, suffix?: string) => {
    if (prefix === "R$") return `${prefix}${val.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}`
    if (suffix === "x" || suffix === "%") return `${val.toFixed(1)}${suffix}`
    return Math.round(val).toLocaleString('pt-BR')
  }

  return (
    <section ref={containerRef} className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-sm text-primary tracking-widest uppercase mb-4">
            Sistema SaaS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Construimos sistemas que escalam.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Dashboards em tempo real para qualquer tipo de empresa ou negocio.
          </p>
        </div>

        {/* Dashboard Container */}
        <div className="relative rounded-2xl border border-border bg-card overflow-hidden shadow-2xl shadow-black/20">
          {/* Browser-like header */}
          <div className="flex items-center gap-2 px-4 py-3 bg-secondary/50 border-b border-border">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="px-4 py-1 rounded-md bg-background/50 text-xs text-muted-foreground">
                dashboard.ghosting.ads
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-muted-foreground" />
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-xs text-primary font-bold">G</span>
              </div>
            </div>
          </div>

          <div className="flex">
            {/* Sidebar */}
            <div className="hidden md:flex flex-col w-56 bg-secondary/30 border-r border-border p-4">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <Zap className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="font-bold text-foreground">GHOSTING</span>
              </div>

              <nav className="flex-1 space-y-1">
                {navItems.map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 cursor-pointer ${
                      item.active 
                        ? 'bg-primary/10 text-primary border border-primary/20' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                    {item.active && <ChevronRight className="w-4 h-4 ml-auto" />}
                  </div>
                ))}
              </nav>

              <div className="mt-auto p-3 rounded-lg bg-primary/5 border border-primary/10">
                <div className="flex items-center gap-2 mb-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                  </span>
                  <span className="text-xs text-green-500 font-medium">Sistema Ativo</span>
                </div>
                <p className="text-xs text-muted-foreground">Ultima sync: agora</p>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
              {/* Top bar */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-foreground">Dashboard</h3>
                  <p className="text-sm text-muted-foreground">Visao geral em tempo real</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                  </span>
                  <span className="text-xs text-green-500 font-medium">LIVE</span>
                </div>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {metrics.map((metric, i) => (
                  <div 
                    key={i}
                    className="p-4 rounded-xl bg-secondary/30 border border-border hover:border-primary/30 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <metric.icon className="w-4 h-4 text-primary" />
                      </div>
                      <div className={`flex items-center gap-1 text-xs font-medium ${
                        metric.trend >= 0 ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {metric.trend >= 0 ? (
                          <ArrowUpRight className="w-3 h-3" />
                        ) : (
                          <ArrowDownRight className="w-3 h-3" />
                        )}
                        {Math.abs(metric.trend)}%
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-foreground tabular-nums transition-all duration-300">
                      {formatValue(metric.displayValue, metric.prefix, metric.suffix)}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{metric.label}</div>
                  </div>
                ))}
              </div>

              {/* Chart Area */}
              <div className="rounded-xl bg-secondary/20 border border-border p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-sm font-medium text-foreground">Performance</h4>
                    <p className="text-xs text-muted-foreground">Ultimas 12 atualizacoes</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                      <span className="text-xs text-muted-foreground">Conversao</span>
                    </div>
                  </div>
                </div>

                {/* CSS-based Chart - Much smoother than Canvas */}
                <div className="relative h-48">
                  {/* Grid lines */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                    {[0, 1, 2, 3, 4].map(i => (
                      <div key={i} className="border-t border-border/30 w-full" />
                    ))}
                  </div>

                  {/* Y-axis labels */}
                  <div className="absolute left-0 inset-y-0 flex flex-col justify-between text-xs text-muted-foreground pr-2">
                    {['100%', '75%', '50%', '25%', '0%'].map(label => (
                      <span key={label}>{label}</span>
                    ))}
                  </div>

                  {/* Bars container */}
                  <div className="absolute left-10 right-0 bottom-0 top-0 flex items-end justify-between gap-2 px-2">
                    {chartData.map((value, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div className="relative w-full flex justify-center">
                          <div 
                            className="w-full max-w-8 rounded-t-md bg-gradient-to-t from-primary/60 to-primary transition-all duration-700 ease-out relative overflow-hidden"
                            style={{ height: `${value * 1.8}px` }}
                          >
                            {/* Shimmer effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
                            {/* Glow on last bar */}
                            {i === chartData.length - 1 && (
                              <div className="absolute inset-0 bg-primary/30 animate-pulse" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Floating current value */}
                  <div className="absolute top-2 right-2 px-3 py-2 rounded-lg bg-card/90 backdrop-blur border border-primary/20">
                    <div className="text-xs text-muted-foreground">Atual</div>
                    <div className="text-xl font-bold text-primary tabular-nums transition-all duration-500">
                      {chartData[chartData.length - 1].toFixed(1)}%
                    </div>
                  </div>
                </div>

                {/* X-axis labels */}
                <div className="flex justify-between mt-2 ml-10 text-xs text-muted-foreground">
                  {chartData.map((_, i) => (
                    <span key={i} className="flex-1 text-center">
                      {i === chartData.length - 1 ? 'Agora' : `-${(chartData.length - 1 - i) * 5}s`}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Stats Row */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20">
                  <div className="text-xs text-green-500 mb-1">Campanhas Ativas</div>
                  <div className="text-2xl font-bold text-green-500">24</div>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                  <div className="text-xs text-primary mb-1">Leads Hoje</div>
                  <div className="text-2xl font-bold text-primary">347</div>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20">
                  <div className="text-xs text-blue-500 mb-1">Automacoes</div>
                  <div className="text-2xl font-bold text-blue-500">12</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Caption */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          Interface real de um sistema desenvolvido pela GHOSTING.ADS
        </p>
      </div>
    </section>
  )
}
