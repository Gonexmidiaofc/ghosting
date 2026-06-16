"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  Ghost, 
  LayoutDashboard, 
  BookOpen, 
  FolderKanban, 
  MessageSquare, 
  Settings,
  Crown,
  Sparkles,
  Shield,
  Users,
  User
} from "lucide-react"
import type { User } from "@supabase/supabase-js"

interface Profile {
  id: string
  full_name: string | null
  plan: string
  role: string
}

interface AppSidebarProps {
  user: User
  profile: Profile | null
}

const navigation = [
  { name: "Dashboard", href: "/app", icon: LayoutDashboard },
  { name: "Modulos", href: "/app/modulos", icon: BookOpen },
  { name: "Ofertas Escaladas", href: "/app/ofertas-escaladas", icon: Sparkles },
  { name: "Workspace", href: "/app/workspace", icon: FolderKanban },
  { name: "Ghost AI", href: "/app/ghost-ai", icon: Sparkles },
  { name: "Comunidade", href: "/app/comunidade", icon: Users },
  { name: "Perfil", href: "/app/perfil", icon: User },
  { name: "Configuracoes", href: "/app/configuracoes", icon: Settings },
]

export function AppSidebar({ profile }: AppSidebarProps) {
  const pathname = usePathname()

  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case "dna_elite":
        return { label: "DNA Elite", color: "bg-primary text-primary-foreground" }
      case "dna_pro":
        return { label: "DNA Pro", color: "bg-blue-500/20 text-blue-400" }
      default:
        return { label: "DNA Start", color: "bg-secondary text-muted-foreground" }
    }
  }

  const planBadge = getPlanBadge(profile?.plan || "dna_start")

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <Link href="/app" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
            <Ghost className="w-5 h-5 text-primary" />
          </div>
          <div>
            <span className="text-lg font-bold text-foreground">GHOST</span>
            <span className="text-lg text-primary">.SYSTEM</span>
          </div>
        </Link>
      </div>

      {/* Plan Badge */}
      <div className="px-4 py-3">
        <div className={cn("px-3 py-2 rounded-lg flex items-center gap-2", planBadge.color)}>
          <Crown className="w-4 h-4" />
          <span className="text-sm font-medium">{planBadge.label}</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== "/app" && pathname.startsWith(item.href))
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* Admin Link */}
      <div className="px-4 pb-2">
        <Link
          href="/admin"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
        >
          <Shield className="w-5 h-5" />
          Painel Admin
        </Link>
      </div>

      {/* Upgrade CTA (for non-elite users) */}
      {profile?.plan !== "dna_elite" && (
        <div className="p-4 border-t border-border">
          <div className="p-4 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl">
            <h4 className="text-sm font-semibold text-foreground mb-1">Upgrade para Elite</h4>
            <p className="text-xs text-muted-foreground mb-3">
              Desbloqueie todos os recursos e modulos
            </p>
            <Link 
              href="/app/upgrade"
              className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
            >
              Ver planos
              <span className="text-lg">→</span>
            </Link>
          </div>
        </div>
      )}

      {/* Version */}
      <div className="p-4 text-center">
        <span className="text-xs text-muted-foreground">v1.0.0</span>
      </div>
    </aside>
  )
}
