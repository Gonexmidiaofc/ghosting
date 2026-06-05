"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import { 
  Play, 
  ChevronLeft, 
  ChevronRight,
  Clock,
  Lock,
  CheckCircle,
  Download,
  Sparkles,
  BookOpen,
  GraduationCap,
  FolderOpen
} from "lucide-react"

interface Module {
  id: string
  title: string
  description: string
  thumbnail_url: string | null
  duration_minutes: number
  order_index: number
  is_active: boolean
}

interface Lesson {
  id: string
  title: string
  module_id: string
  duration_minutes: number
  order_index: number
}

interface Progress {
  lesson_id: string
  progress_percent: number
  completed: boolean
}

interface Material {
  id: string
  title: string
  type: string
  category: string
}

// Carousel Component
function Carousel({ title, children, showAll, isEmpty }: { title: string; children: React.ReactNode; showAll?: string; isEmpty?: boolean }) {
  const scroll = (direction: 'left' | 'right') => {
    const container = document.getElementById(`carousel-${title.replace(/\s/g, '-')}`)
    if (container) {
      const scrollAmount = direction === 'left' ? -400 : 400
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  if (isEmpty) {
    return null
  }

  return (
    <div className="relative group">
      <div className="flex items-center justify-between mb-4 px-4 md:px-12">
        <h2 className="text-lg md:text-xl font-semibold text-foreground">{title}</h2>
        {showAll && (
          <Link href={showAll} className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Ver tudo
          </Link>
        )}
      </div>
      
      <div className="relative">
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-0 bottom-0 z-10 w-12 bg-gradient-to-r from-background to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
        >
          <ChevronLeft className="w-8 h-8 text-foreground" />
        </button>

        <div 
          id={`carousel-${title.replace(/\s/g, '-')}`}
          className="flex gap-3 overflow-x-auto scrollbar-hide px-4 md:px-12 pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {children}
        </div>

        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-0 bottom-0 z-10 w-12 bg-gradient-to-l from-background to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
        >
          <ChevronRight className="w-8 h-8 text-foreground" />
        </button>
      </div>
    </div>
  )
}

// Module Card Component
function ModuleCard({ module, isLocked, progress }: { module: Module; isLocked: boolean; progress: number }) {
  const isCompleted = progress === 100
  
  return (
    <Link 
      href={isLocked ? '#' : `/app/modulos/${module.id}`}
      className={`flex-shrink-0 w-[280px] md:w-[320px] group ${isLocked ? 'cursor-not-allowed' : ''}`}
    >
      <div className={`relative rounded-lg overflow-hidden transition-all duration-300 ${
        isLocked ? 'opacity-50' : 'hover:scale-105 hover:z-10'
      }`}>
        <div className="aspect-video bg-[#141414] relative">
          {module.thumbnail_url ? (
            <Image
              src={module.thumbnail_url}
              alt={module.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
              <BookOpen className="w-12 h-12 text-primary/50" />
            </div>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
          
          {isLocked && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60">
              <Lock className="w-10 h-10 text-muted-foreground" />
            </div>
          )}
          
          {isCompleted && (
            <div className="absolute top-2 right-2 bg-emerald-500 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              Concluido
            </div>
          )}
          
          {!isLocked && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
                <Play className="w-6 h-6 text-primary-foreground fill-current ml-1" />
              </div>
            </div>
          )}
          
          {progress > 0 && progress < 100 && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#333]">
              <div 
                className="h-full bg-primary"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
          
          <div className="absolute top-2 left-2 w-8 h-8 rounded bg-black/80 flex items-center justify-center">
            <span className="text-sm font-bold text-primary">{module.order_index}</span>
          </div>
        </div>
        
        <div className="p-3 bg-[#141414]">
          <h3 className="font-semibold text-foreground text-sm mb-1">{module.title}</h3>
          <p className="text-xs text-muted-foreground line-clamp-1">{module.description}</p>
          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {module.duration_minutes}min
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

// Empty State Component
function EmptyState({ 
  icon: Icon, 
  title, 
  description, 
  action, 
  actionLink 
}: { 
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  action?: string
  actionLink?: string
}) {
  return (
    <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
      <CardContent className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <Icon className="w-8 h-8 text-primary/50" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground max-w-md mb-4">{description}</p>
        {action && actionLink && (
          <Link href={actionLink}>
            <Button>{action}</Button>
          </Link>
        )}
      </CardContent>
    </Card>
  )
}

export default function AppDashboard() {
  const [modules, setModules] = useState<Module[]>([])
  const [progress, setProgress] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      // Carregar modulos
      const { data: modulesData } = await supabase
        .from("modules")
        .select("*")
        .eq("is_active", true)
        .order("order_index")

      if (modulesData) {
        setModules(modulesData)
      }

      // Carregar progresso do usuario
      if (user) {
        const { data: progressData } = await supabase
          .from("student_progress")
          .select("lesson_id, progress_percent, completed")
          .eq("user_id", user.id)

        if (progressData) {
          // Calcular progresso por modulo (simplificado)
          const moduleProgress: Record<string, number> = {}
          // Por enquanto, deixar vazio ate ter dados reais
          setProgress(moduleProgress)
        }
      }

      setLoading(false)
    }

    loadData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  const hasModules = modules.length > 0
  const hasProgress = Object.keys(progress).length > 0

  return (
    <div className="min-h-screen bg-background -m-6">
      {/* Hero Banner */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 pb-24">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="w-6 h-6 text-primary" />
              <span className="text-sm text-primary font-medium">Area de Membros</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Bem-vindo ao Metodo G.H.O.S.T
            </h1>
            
            <p className="text-base md:text-lg text-muted-foreground mb-6">
              {hasModules 
                ? "Comece sua jornada de aprendizado. Selecione um modulo abaixo para iniciar."
                : "Em breve novos conteudos estarao disponiveis. Fique atento!"}
            </p>
            
            {hasModules && (
              <div className="flex items-center gap-3">
                <Link href="/app/modulos">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
                    <Play className="w-5 h-5 mr-2 fill-current" />
                    Comecar Agora
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="relative -mt-16 z-10 space-y-8 pb-12">
        {/* Modulos */}
        {hasModules ? (
          <Carousel title="Modulos do Metodo G.H.O.S.T" showAll="/app/modulos">
            {modules.map((module, index) => (
              <ModuleCard 
                key={module.id} 
                module={module}
                isLocked={false}
                progress={progress[module.id] || 0}
              />
            ))}
          </Carousel>
        ) : (
          <div className="px-4 md:px-12">
            <EmptyState
              icon={BookOpen}
              title="Nenhum modulo disponivel"
              description="Os modulos do curso ainda nao foram publicados. Assim que estiverem disponiveis, eles aparecerao aqui."
            />
          </div>
        )}

        {/* Ghost AI Banner */}
        <div className="px-4 md:px-12">
          <Link href="/app/ghost-ai">
            <div className="relative rounded-xl overflow-hidden bg-gradient-to-r from-primary/20 via-purple-500/20 to-pink-500/20 p-6 md:p-8 border border-primary/20 hover:border-primary/40 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">Assistente IA</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                    Precisa de ajuda? Pergunte ao Ghost AI
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Tire duvidas, gere copys, crie estrategias e muito mais com inteligencia artificial.
                  </p>
                </div>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Iniciar Chat
                </Button>
              </div>
            </div>
          </Link>
        </div>

        {/* Materiais - Estado Vazio */}
        <div className="px-4 md:px-12">
          <h2 className="text-lg md:text-xl font-semibold text-foreground mb-4">Materiais e Templates</h2>
          <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <FolderOpen className="w-6 h-6 text-primary/50" />
              </div>
              <p className="text-sm text-muted-foreground">Nenhum material disponivel ainda</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
