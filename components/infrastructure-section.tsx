"use client"

import { motion } from "framer-motion"
import { 
  Target, 
  GitBranch, 
  LayoutTemplate, 
  ShoppingCart, 
  CreditCard, 
  Users, 
  BarChart3, 
  Code, 
  Cpu, 
  Bot 
} from "lucide-react"

const nodes = [
  { id: "aquisicao", label: "Aquisição", icon: Target, x: 10, y: 20 },
  { id: "funis", label: "Funis", icon: GitBranch, x: 30, y: 10 },
  { id: "paginas", label: "Páginas", icon: LayoutTemplate, x: 50, y: 5 },
  { id: "checkout", label: "Checkout", icon: ShoppingCart, x: 70, y: 10 },
  { id: "gateway", label: "Gateway", icon: CreditCard, x: 90, y: 20 },
  { id: "crm", label: "CRM", icon: Users, x: 10, y: 80 },
  { id: "dashboards", label: "Dashboards", icon: BarChart3, x: 30, y: 90 },
  { id: "saas", label: "SaaS", icon: Code, x: 50, y: 95 },
  { id: "processamento", label: "Processamento", icon: Cpu, x: 70, y: 90 },
  { id: "automacoes", label: "Automações", icon: Bot, x: 90, y: 80 },
]

const connections = [
  ["aquisicao", "funis"],
  ["funis", "paginas"],
  ["paginas", "checkout"],
  ["checkout", "gateway"],
  ["aquisicao", "crm"],
  ["crm", "dashboards"],
  ["dashboards", "saas"],
  ["saas", "processamento"],
  ["processamento", "automacoes"],
  ["gateway", "automacoes"],
  ["funis", "dashboards"],
  ["checkout", "processamento"],
]

export function InfrastructureSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(200, 169, 107, 0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(200, 169, 107, 0.02) 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px'
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            A estrutura por trás das{" "}
            <span className="text-primary">operações que escalam.</span>
          </h2>
        </motion.div>

        {/* Infrastructure map */}
        <div className="relative max-w-5xl mx-auto aspect-[16/10] rounded-2xl border border-primary/20 bg-card/30 backdrop-blur-sm overflow-hidden">
          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full">
            {connections.map((conn, index) => {
              const from = nodes.find(n => n.id === conn[0])!
              const to = nodes.find(n => n.id === conn[1])!
              return (
                <motion.line
                  key={index}
                  x1={`${from.x}%`}
                  y1={`${from.y}%`}
                  x2={`${to.x}%`}
                  y2={`${to.y}%`}
                  stroke="url(#goldGradient)"
                  strokeWidth="1"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.4 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                />
              )
            })}
            <defs>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#C8A96B" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#C8A96B" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#C8A96B" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>

          {/* Animated pulse on lines */}
          {connections.map((conn, index) => {
            const from = nodes.find(n => n.id === conn[0])!
            const to = nodes.find(n => n.id === conn[1])!
            return (
              <motion.div
                key={`pulse-${index}`}
                className="absolute w-2 h-2 bg-primary rounded-full shadow-lg shadow-primary/50"
                initial={{ 
                  left: `${from.x}%`, 
                  top: `${from.y}%`,
                  opacity: 0 
                }}
                animate={{ 
                  left: [`${from.x}%`, `${to.x}%`],
                  top: [`${from.y}%`, `${to.y}%`],
                  opacity: [0, 1, 1, 0]
                }}
                transition={{ 
                  duration: 2,
                  delay: index * 0.3,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              />
            )
          })}

          {/* Nodes */}
          {nodes.map((node, index) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
            >
              <div className="group flex flex-col items-center gap-2">
                <div className="p-3 md:p-4 rounded-xl bg-card border border-primary/30 shadow-lg shadow-primary/10 group-hover:border-primary/60 group-hover:shadow-primary/20 transition-all duration-300">
                  <node.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
                <span className="text-xs md:text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap">
                  {node.label}
                </span>
              </div>
            </motion.div>
          ))}

          {/* Center glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
        </div>
      </div>
    </section>
  )
}
