"use client"

import { BarChart3, Zap } from "lucide-react"
import { AnimatedChart } from "./animated-chart"
import { LiveMetrics } from "./live-metrics"

export function ResultsSection() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm text-primary tracking-widest uppercase mb-4">Resultados</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Métricas que importam.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Dados em tempo real de operações estruturadas para escala.
          </p>
        </div>

        {/* Live Metrics Strip */}
        <div className="mb-8">
          <LiveMetrics />
        </div>

        {/* Dashboard-style Metrics */}
        <div className="relative p-1 rounded-2xl bg-gradient-to-br from-primary/20 via-border to-primary/10">
          <div className="rounded-xl bg-card p-6 sm:p-10">
            {/* Header bar simulation */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-border">
              <div className="flex items-center gap-3">
                <BarChart3 className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">Dashboard de Performance</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <Zap className="h-4 w-4 text-primary" />
                <span className="text-xs text-primary font-medium">Atualização em Tempo Real</span>
              </div>
            </div>

            {/* Animated Chart */}
            <AnimatedChart />

            {/* Bottom stats */}
            <div className="mt-8 pt-6 border-t border-border grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4">
                <p className="text-2xl sm:text-3xl font-bold text-primary">+340%</p>
                <p className="text-xs text-muted-foreground mt-1">ROAS Médio</p>
              </div>
              <div className="text-center p-4">
                <p className="text-2xl sm:text-3xl font-bold text-primary">2.5M+</p>
                <p className="text-xs text-muted-foreground mt-1">Leads Gerados</p>
              </div>
              <div className="text-center p-4">
                <p className="text-2xl sm:text-3xl font-bold text-primary">R$50M+</p>
                <p className="text-xs text-muted-foreground mt-1">Faturamento</p>
              </div>
              <div className="text-center p-4">
                <p className="text-2xl sm:text-3xl font-bold text-primary">45%</p>
                <p className="text-xs text-muted-foreground mt-1">Taxa Conversão</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
