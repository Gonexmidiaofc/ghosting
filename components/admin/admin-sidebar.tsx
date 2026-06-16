"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  Ghost, 
  LayoutDashboard, 
  FolderKanban,
  Package,
  GitBranch,
  Megaphone,
  BarChart3,
  LineChart,
  Route,
  Crosshair,
  QrCode,
  GraduationCap,
  BookOpen,
  PlayCircle,
  FileText,
  Users,
  MessagesSquare,
  Contact,
  DollarSign,
  CreditCard,
  Zap,
  FileCode,
  Library,
  Bot,
  Network,
  Tag,
  Bell,
  Sparkles,
  Settings,
  Shield,
  ChevronDown
} from "lucide-react"
import type { User } from "@supabase/supabase-js"
import { useState } from "react"

interface Profile {
  id: string
  full_name: string | null
  role: string
}

interface AdminSidebarProps {
  user: User
  profile: Profile | null
}

const navigationGroups = [
  {
    name: "Principal",
    items: [
      { name: "Overview", href: "/admin", icon: LayoutDashboard },
      { name: "Projetos", href: "/admin/projetos", icon: FolderKanban },
      { name: "Ofertas (Suas)", href: "/admin/ofertas", icon: Package },
      { name: "Ofertas Escaladas", href: "/admin/ofertas-escaladas", icon: Tag },
      { name: "Ghost AI", href: "/admin/ghost-ai", icon: Bot },
      { name: "Segundo Cérebro", href: "/admin/segundo-cerebro", icon: Network },
      { name: "Funis", href: "/admin/funis", icon: GitBranch },
    ]
  },
  {
    name: "Marketing",
    items: [
      { name: "Trafego", href: "/admin/trafego", icon: Megaphone },
      { name: "Metricas", href: "/admin/metricas", icon: BarChart3 },
      { name: "Analytics", href: "/admin/analytics", icon: LineChart },
      { name: "Rotas", href: "/admin/rotas", icon: Route },
      { name: "Tracking", href: "/admin/tracking", icon: Crosshair },
      { name: "Pixels", href: "/admin/pixels", icon: QrCode },
    ]
  },
  {
    name: "Educacao",
    items: [
      { name: "Cursos", href: "/admin/cursos", icon: GraduationCap },
      { name: "Modulos", href: "/admin/modulos", icon: BookOpen },
      { name: "Aulas", href: "/admin/aulas", icon: PlayCircle },
      { name: "Conteudo", href: "/admin/conteudo", icon: FileText },
    ]
  },
  {
    name: "Usuarios",
    items: [
      { name: "Alunos", href: "/admin/alunos", icon: Users },
      { name: "Comunidade", href: "/admin/comunidade", icon: MessagesSquare },
      { name: "CRM", href: "/admin/crm", icon: Contact },
    ]
  },
  {
    name: "Financeiro",
    items: [
      { name: "Financeiro", href: "/admin/financeiro", icon: DollarSign },
      { name: "Assinaturas", href: "/admin/assinaturas", icon: CreditCard },
      { name: "Automacoes", href: "/admin/automacoes", icon: Zap },
    ]
  },
  {
    name: "Sistema",
    items: [
      { name: "README", href: "/admin/readme", icon: FileCode },
      { name: "README Content", href: "/admin/readme-content", icon: Library },
      { name: "Ghost AI", href: "/admin/ghost-ai", icon: Bot },
      { name: "Notificacoes", href: "/admin/notificacoes", icon: Bell },
      { name: "Novidades", href: "/admin/novidades", icon: Sparkles },
      { name: "Seguranca", href: "/admin/seguranca", icon: Shield },
      { name: "Configuracoes", href: "/admin/configuracoes", icon: Settings },
    ]
  },
]

export function AdminSidebar({ profile }: AdminSidebarProps) {
  const pathname = usePathname()
  const [collapsedGroups, setCollapsedGroups] = useState<string[]>([])

  const toggleGroup = (groupName: string) => {
    setCollapsedGroups(prev => 
      prev.includes(groupName) 
        ? prev.filter(g => g !== groupName)
        : [...prev, groupName]
    )
  }

  return (
    <aside className="w-64 bg-[#0a0a0a] border-r border-[#1a1a1a] flex flex-col h-screen overflow-hidden">
      {/* Logo */}
      <div className="p-4 border-b border-[#1a1a1a] flex-shrink-0">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-red-500/10 rounded-lg flex items-center justify-center">
            <Ghost className="w-5 h-5 text-red-500" />
          </div>
          <div>
            <span className="text-base font-bold text-foreground">GHOST</span>
            <span className="text-base text-red-500">.ADMIN</span>
          </div>
        </Link>
      </div>

      {/* Role Badge */}
      <div className="px-3 py-2 flex-shrink-0">
        <div className={cn(
          "px-2.5 py-1.5 rounded-md flex items-center gap-2",
          profile?.role === "super_admin" 
            ? "bg-red-500/20 text-red-400" 
            : "bg-orange-500/20 text-orange-400"
        )}>
          <Shield className="w-3.5 h-3.5" />
          <span className="text-xs font-medium">
            {profile?.role === "super_admin" ? "Super Admin" : "Admin"}
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 py-2 space-y-1 scrollbar-thin">
        {navigationGroups.map((group) => {
          const isCollapsed = collapsedGroups.includes(group.name)
          
          return (
            <div key={group.name}>
              <button
                onClick={() => toggleGroup(group.name)}
                className="w-full flex items-center justify-between px-2 py-1.5 text-[10px] font-semibold text-muted-foreground/60 uppercase tracking-wider hover:text-muted-foreground"
              >
                {group.name}
                <ChevronDown className={cn(
                  "w-3 h-3 transition-transform",
                  isCollapsed && "-rotate-90"
                )} />
              </button>
              
              {!isCollapsed && (
                <div className="space-y-0.5 mt-0.5">
                  {group.items.map((item) => {
                    const isActive = pathname === item.href || 
                      (item.href !== "/admin" && pathname.startsWith(item.href))
                    
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          "flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all",
                          isActive 
                            ? "bg-red-500/10 text-red-500 border-l-2 border-red-500" 
                            : "text-muted-foreground hover:text-foreground hover:bg-[#141414]"
                        )}
                      >
                        <item.icon className="w-4 h-4 flex-shrink-0" />
                        {item.name}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {/* Back to App */}
      <div className="p-3 border-t border-[#1a1a1a] flex-shrink-0">
        <Link 
          href="/app"
          className="flex items-center gap-2 px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-[#141414]"
        >
          <span>← Voltar para o App</span>
        </Link>
      </div>
    </aside>
  )
}
