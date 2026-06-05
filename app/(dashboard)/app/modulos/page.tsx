import { createClient } from "@/lib/supabase/server"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { 
  GitBranch, 
  Target, 
  Bot, 
  Code, 
  LineChart, 
  TrendingUp,
  Lock,
  CheckCircle,
  PlayCircle,
  BookOpen
} from "lucide-react"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  GitBranch,
  Target,
  Bot,
  Code,
  LineChart,
  TrendingUp,
  BookOpen,
}

export default async function ModulosPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: modules } = await supabase
    .from("modules")
    .select("*")
    .eq("is_active", true)
    .order("order_index")

  // Buscar progresso real do usuario
  let moduleProgress: Record<string, number> = {}
  
  if (user) {
    const { data: progressData } = await supabase
      .from("student_progress")
      .select("lesson_id, progress_percent, completed, lessons!inner(module_id)")
      .eq("user_id", user.id)

    // Calcular progresso por modulo se houver dados
    if (progressData && progressData.length > 0) {
      // Agrupar por module_id e calcular media
      const progressByModule: Record<string, { total: number; count: number }> = {}
      
      for (const p of progressData) {
        const moduleId = (p as unknown as { lessons: { module_id: string } }).lessons?.module_id
        if (moduleId) {
          if (!progressByModule[moduleId]) {
            progressByModule[moduleId] = { total: 0, count: 0 }
          }
          progressByModule[moduleId].total += p.progress_percent || 0
          progressByModule[moduleId].count += 1
        }
      }

      for (const [moduleId, data] of Object.entries(progressByModule)) {
        moduleProgress[moduleId] = Math.round(data.total / data.count)
      }
    }
  }

  // Se nao houver modulos
  if (!modules || modules.length === 0) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Modulos</h1>
          <p className="text-muted-foreground mt-1">
            Os pilares do Metodo G.H.O.S.T para dominar operacoes digitais
          </p>
        </div>

        <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
          <CardContent className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <BookOpen className="w-10 h-10 text-primary/50" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Nenhum modulo disponivel</h3>
            <p className="text-muted-foreground max-w-md">
              Os modulos do curso ainda nao foram publicados. 
              Assim que estiverem disponiveis, eles aparecerao aqui.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Modulos</h1>
        <p className="text-muted-foreground mt-1">
          Os pilares do Metodo G.H.O.S.T para dominar operacoes digitais
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modules?.map((module, index) => {
          const Icon = iconMap[module.icon] || BookOpen
          const progress = moduleProgress[module.id] || 0
          const isLocked = false // Todos desbloqueados por enquanto
          const isCompleted = progress === 100
          const isInProgress = progress > 0 && progress < 100

          return (
            <Link
              key={module.id}
              href={isLocked ? "#" : `/app/modulos/${module.slug || module.id}`}
              className={isLocked ? "cursor-not-allowed" : ""}
            >
              <Card className={`
                h-full transition-all duration-300
                ${isLocked 
                  ? "bg-card/30 opacity-60" 
                  : "bg-card/50 hover:bg-card hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20"
                }
              `}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    {/* Module Number */}
                    <div className={`
                      w-14 h-14 rounded-2xl flex items-center justify-center relative
                      ${isCompleted 
                        ? "bg-green-500/20" 
                        : isInProgress 
                          ? "bg-primary/20" 
                          : isLocked 
                            ? "bg-secondary" 
                            : "bg-secondary"
                      }
                    `}>
                      {isLocked ? (
                        <Lock className="w-6 h-6 text-muted-foreground" />
                      ) : isCompleted ? (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      ) : (
                        <span className={`text-2xl font-bold ${isInProgress ? "text-primary" : "text-muted-foreground"}`}>
                          {index + 1}
                        </span>
                      )}
                    </div>

                    <div className="flex-1">
                      {/* Header */}
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className={`w-4 h-4 ${isCompleted ? "text-green-500" : isInProgress ? "text-primary" : "text-muted-foreground"}`} />
                        <span className="text-xs text-muted-foreground uppercase tracking-wider">
                          Modulo {index + 1}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {module.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {module.description || "Sem descricao disponivel"}
                      </p>

                      {/* Progress */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className={`font-medium ${
                            isCompleted ? "text-green-500" : isInProgress ? "text-primary" : "text-muted-foreground"
                          }`}>
                            {isLocked 
                              ? "Bloqueado" 
                              : isCompleted 
                                ? "Concluido" 
                                : isInProgress 
                                  ? "Em progresso" 
                                  : "Nao iniciado"
                            }
                          </span>
                          <span className="text-muted-foreground">{progress}%</span>
                        </div>
                        <Progress 
                          value={progress} 
                          className={`h-2 ${isCompleted ? "[&>div]:bg-green-500" : ""}`}
                        />
                      </div>

                      {/* CTA */}
                      {!isLocked && (
                        <div className="mt-4 flex items-center gap-2 text-sm font-medium text-primary">
                          <PlayCircle className="w-4 h-4" />
                          {isCompleted ? "Revisar modulo" : isInProgress ? "Continuar" : "Comecar modulo"}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
