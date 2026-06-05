"use client"

import { motion } from "framer-motion"
import { 
  Settings as SettingsIcon, 
  Rocket, 
  Target, 
  Bot, 
  BarChart3, 
  TrendingUp,
  Code,
  ChevronRight,
  Clock,
  Video,
  FileText,
  Zap
} from "lucide-react"
import { useState } from "react"

const modules = [
  {
    id: "setup",
    number: "00",
    title: "OPERATOR SETUP",
    subtitle: "Configuracao Inicial",
    icon: SettingsIcon,
    color: "from-zinc-500/20 to-zinc-600/5",
    borderColor: "border-zinc-500/30",
    iconColor: "text-zinc-400",
    duration: "4 aulas",
    description: "Configure sua operacao, stack e ambiente de crescimento. O ponto de partida para qualquer operacao digital profissional.",
    topics: [
      "Setup do ambiente operacional",
      "Ferramentas essenciais",
      "Stack tecnologica",
      "Organizacao de projetos",
    ],
    deliverables: ["Checklist de setup", "Lista de ferramentas", "Template de organizacao"]
  },
  {
    id: "growth",
    number: "01",
    title: "GROWTH ARCHITECTURE",
    subtitle: "Arquitetura de Crescimento",
    icon: Rocket,
    color: "from-amber-500/20 to-amber-600/5",
    borderColor: "border-amber-500/30",
    iconColor: "text-amber-400",
    duration: "8 aulas",
    description: "Construa estruturas de aquisicao e conversao. Funis, landing pages, ofertas e sistemas que transformam trafego em receita.",
    topics: [
      "Arquitetura de funis de conversao",
      "Landing pages de alta performance",
      "VSLs e video marketing",
      "Estruturacao de ofertas",
      "Otimizacao de checkout",
      "Automacao de vendas",
    ],
    deliverables: ["Templates de funil", "Swipe files de copy", "Checklists de conversao"]
  },
  {
    id: "traffic",
    number: "02",
    title: "HIGH PERFORMANCE TRAFFIC",
    subtitle: "Trafego de Alta Performance",
    icon: Target,
    color: "from-orange-500/20 to-orange-600/5",
    borderColor: "border-orange-500/30",
    iconColor: "text-orange-400",
    duration: "10 aulas",
    description: "Escala previsivel com trafego de alta performance. Domine Meta Ads, Google Ads e TikTok Ads com estrategias avancadas.",
    topics: [
      "Estrutura de campanhas escalaveis",
      "Meta Ads avancado",
      "Google Ads para conversao",
      "TikTok Ads e novos canais",
      "Tracking e atribuicao",
      "Criativos que performam",
      "Estrategias de escala",
      "Contingencia e multi-contas",
    ],
    deliverables: ["Planilha de gestao", "Biblioteca de criativos", "SOPs de otimizacao"]
  },
  {
    id: "systems",
    number: "03",
    title: "OPERATIONAL SYSTEMS",
    subtitle: "Sistemas Operacionais",
    icon: Bot,
    color: "from-blue-500/20 to-blue-600/5",
    borderColor: "border-blue-500/30",
    iconColor: "text-blue-400",
    duration: "6 aulas",
    description: "Automatize sua operacao utilizando CRM e sistemas. Processos que funcionam no piloto automatico.",
    topics: [
      "Setup de CRM profissional",
      "Automacoes de follow-up",
      "Pipeline de vendas",
      "Integracao entre ferramentas",
      "Processos escalaveis",
      "Gestao de equipe",
    ],
    deliverables: ["Templates de CRM", "Fluxos de automacao", "Scripts de vendas"]
  },
  {
    id: "intelligence",
    number: "04",
    title: "SCALE INTELLIGENCE",
    subtitle: "Inteligencia de Escala",
    icon: BarChart3,
    color: "from-green-500/20 to-green-600/5",
    borderColor: "border-green-500/30",
    iconColor: "text-green-400",
    duration: "6 aulas",
    description: "Controle sua operacao atraves de dashboards e analytics. Transforme dados em decisoes estrategicas.",
    topics: [
      "Fundamentos de BI",
      "Dashboards em tempo real",
      "KPIs que importam",
      "Analytics avancado",
      "Relatorios executivos",
      "Performance tracking",
    ],
    deliverables: ["Templates de dashboard", "Conectores de dados", "Modelos de relatorio"]
  },
  {
    id: "expansion",
    number: "05",
    title: "TACTICAL EXPANSION",
    subtitle: "Expansao Tatica",
    icon: TrendingUp,
    color: "from-purple-500/20 to-purple-600/5",
    borderColor: "border-purple-500/30",
    iconColor: "text-purple-400",
    duration: "8 aulas",
    description: "Expanda sua operacao com estrategias avancadas de growth. De 6 para 7 e 8 digitos.",
    topics: [
      "Modelo de escala sustentavel",
      "Unit economics e LTV",
      "Estruturacao financeira",
      "MRR e receita recorrente",
      "Expansao de canais",
      "Parcerias estrategicas",
    ],
    deliverables: ["Planilha financeira", "Framework de escala", "Playbook de growth"]
  },
  {
    id: "saas",
    number: "06",
    title: "SAAS & SYSTEMS",
    subtitle: "Sistemas e Ativos Digitais",
    icon: Code,
    color: "from-cyan-500/20 to-cyan-600/5",
    borderColor: "border-cyan-500/30",
    iconColor: "text-cyan-400",
    duration: "8 aulas",
    description: "Crie ativos digitais, automacoes e sistemas proprios. Tecnologia proprietaria para sua operacao.",
    topics: [
      "No-code e low-code avancado",
      "APIs e integracoes",
      "Automacao com n8n e Make",
      "Criacao de dashboards",
      "MVPs rapidos",
      "Monetizacao de sistemas",
    ],
    deliverables: ["Templates de sistema", "Bibliotecas de automacao", "Guia de deploy"]
  }
]

export function MentorshipModules() {
  const [activeModule, setActiveModule] = useState(modules[0].id)
  const active = modules.find(m => m.id === activeModule)!

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Fases de Evolucao</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            7 Modulos de <span className="text-primary">Transformacao</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Cada modulo representa uma fase da sua evolucao operacional dentro do Metodo G.H.O.S.T
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Module selector */}
          <div className="lg:col-span-4 space-y-2">
            {modules.map((module, index) => (
              <motion.button
                key={module.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setActiveModule(module.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${
                  activeModule === module.id
                    ? `bg-gradient-to-r ${module.color} ${module.borderColor} border-opacity-100`
                    : "bg-card/30 border-border hover:border-primary/30"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`text-xl font-bold font-mono ${activeModule === module.id ? module.iconColor : "text-muted-foreground"}`}>
                    {module.number}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`font-semibold truncate ${activeModule === module.id ? "text-foreground" : "text-muted-foreground"}`}>
                      {module.title}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">{module.subtitle}</div>
                  </div>
                  <ChevronRight className={`w-5 h-5 flex-shrink-0 transition-transform ${activeModule === module.id ? "rotate-90 text-primary" : "text-muted-foreground"}`} />
                </div>
              </motion.button>
            ))}
          </div>

          {/* Module content */}
          <motion.div
            key={activeModule}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:col-span-8"
          >
            <div className={`rounded-2xl border ${active.borderColor} bg-gradient-to-br ${active.color} p-8`}>
              {/* Header */}
              <div className="flex items-start gap-4 mb-8">
                <div className={`p-4 rounded-xl bg-background/50 ${active.iconColor}`}>
                  <active.icon className="w-8 h-8" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-muted-foreground">MODULO {active.number}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">{active.title}</h3>
                  <p className="text-muted-foreground mt-1">{active.description}</p>
                </div>
              </div>

              {/* Meta info */}
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/50">
                  <Video className="w-4 h-4 text-primary" />
                  <span className="text-sm">{active.duration}</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/50">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-sm">Acesso vitalicio</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/50">
                  <FileText className="w-4 h-4 text-primary" />
                  <span className="text-sm">{active.deliverables.length} entregaveis</span>
                </div>
              </div>

              {/* Topics */}
              <div className="mb-8">
                <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                  Conteudo do Modulo
                </h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {active.topics.map((topic, index) => (
                    <motion.div
                      key={topic}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center gap-2"
                    >
                      <div className={`w-1.5 h-1.5 rounded-full ${active.iconColor} bg-current`} />
                      <span className="text-sm text-muted-foreground">{topic}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Deliverables */}
              <div>
                <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                  Entregaveis
                </h4>
                <div className="flex flex-wrap gap-2">
                  {active.deliverables.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
