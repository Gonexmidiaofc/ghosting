import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  User,
  Zap,
  Trophy,
  Flame,
  Target,
  Award,
  Star,
  Crown,
  Medal,
  Clock,
  Calendar,
  BookOpen,
  Edit,
  Download
} from "lucide-react"

export default async function PerfilPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user?.id)
    .single()

  // Buscar dados reais de gamificacao
  const xp = profile?.xp || 0
  const level = profile?.level || 1
  const xpForNextLevel = level * 1000
  const xpProgress = xp > 0 ? Math.min((xp % 1000) / 10, 100) : 0
  const streak = profile?.streak_days || 0

  // Buscar progresso real
  const { count: completedLessonsCount } = await supabase
    .from("student_progress")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user?.id)
    .eq("completed", true)

  const completedLessons = completedLessonsCount || 0

  // Buscar certificados reais
  const { data: certificates, count: certificatesCount } = await supabase
    .from("student_enrollments")
    .select("*, courses(title)", { count: "exact" })
    .eq("user_id", user?.id)
    .eq("certificate_issued", true)

  // Buscar ranking
  const { data: rankingData } = await supabase
    .from("profiles")
    .select("id")
    .order("xp", { ascending: false })

  let rank = 0
  if (rankingData) {
    rank = rankingData.findIndex(p => p.id === user?.id) + 1
  }

  const displayName = profile?.full_name || user?.email?.split("@")[0] || "Usuario"
  const joinedDate = profile?.created_at 
    ? new Date(profile.created_at).toLocaleDateString("pt-BR", { day: "numeric", month: "short", year: "numeric" })
    : "-"

  const achievements = [
    { icon: Flame, name: "7 dias seguidos", description: "Mantenha uma sequencia de 7 dias", unlocked: streak >= 7, xp: 100 },
    { icon: Star, name: "Primeiro modulo", description: "Complete seu primeiro modulo", unlocked: completedLessons >= 1, xp: 250 },
    { icon: Target, name: "10 aulas concluidas", description: "Complete 10 aulas", unlocked: completedLessons >= 10, xp: 150 },
    { icon: Crown, name: "Top 10%", description: "Esteja entre os 10% melhores", unlocked: false, xp: 500 },
    { icon: Medal, name: "Certificado Elite", description: "Obtenha o certificado Elite", unlocked: (certificatesCount || 0) > 0, xp: 1000 },
    { icon: Trophy, name: "Metodo Completo", description: "Complete 100% do metodo", unlocked: false, xp: 2000 },
  ]

  const stats = [
    { label: "Nivel", value: level, icon: Zap, color: "text-primary" },
    { label: "XP Total", value: `${xp}`, icon: Star, color: "text-yellow-500" },
    { label: "Ranking", value: rank > 0 ? `#${rank}` : "-", icon: Trophy, color: "text-emerald-500" },
    { label: "Sequencia", value: streak > 0 ? `${streak} dias` : "0", icon: Flame, color: "text-orange-500" },
    { label: "Aulas", value: completedLessons, icon: BookOpen, color: "text-blue-500" },
    { label: "Horas", value: "0h", icon: Clock, color: "text-purple-500" },
  ]

  const levelBenefits = [
    { level: 1, name: "Iniciante", benefit: "Acesso ao metodo", achieved: true },
    { level: 3, name: "Operador", benefit: "Badge exclusiva", achieved: level >= 3 },
    { level: 5, name: "Growth", benefit: "Materiais bonus", achieved: level >= 5 },
    { level: 7, name: "Performance", benefit: "Mentoria extra", achieved: level >= 7 },
    { level: 10, name: "Elite", benefit: "Certificado VIP", achieved: level >= 10 },
  ]

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Profile Header */}
      <Card className="bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border-primary/30">
        <CardContent className="p-6">
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 rounded-2xl bg-primary/20 flex items-center justify-center text-4xl font-bold text-primary border-2 border-primary/30">
              {displayName.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                    {displayName}
                    {streak >= 7 && <Flame className="w-5 h-5 text-orange-500" />}
                    {level >= 5 && <Crown className="w-5 h-5 text-yellow-500" />}
                  </h1>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Membro desde {joinedDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      {certificatesCount || 0} certificado{(certificatesCount || 0) !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="border-[#1a1a1a]">
                  <Edit className="w-4 h-4 mr-2" />
                  Editar Perfil
                </Button>
              </div>
              
              {/* Level Progress */}
              <div className="mt-4 p-3 bg-[#0d0d0d] rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Zap className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Nivel {level}</p>
                      <p className="text-xs text-muted-foreground">{xp} XP total</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-primary">{Math.max(0, xpForNextLevel - xp)} XP</p>
                    <p className="text-xs text-muted-foreground">para nivel {level + 1}</p>
                  </div>
                </div>
                <Progress value={xpProgress} className="h-2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {stats.map((stat) => (
          <Card key={stat.label} className="bg-[#0d0d0d] border-[#1a1a1a]">
            <CardContent className="p-4 text-center">
              <stat.icon className={`w-5 h-5 mx-auto mb-2 ${stat.color}`} />
              <p className="text-xl font-bold text-foreground">{stat.value}</p>
              <p className="text-[10px] text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Achievements */}
        <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-base">
                <Award className="w-4 h-4 text-primary" />
                Conquistas
              </CardTitle>
              <span className="text-xs text-muted-foreground">
                {achievements.filter(a => a.unlocked).length}/{achievements.length}
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {achievements.map((achievement) => (
              <div 
                key={achievement.name}
                className={`flex items-center gap-3 p-3 rounded-lg ${
                  achievement.unlocked ? 'bg-[#141414]' : 'bg-[#0a0a0a] opacity-50'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  achievement.unlocked ? 'bg-primary/10' : 'bg-[#1a1a1a]'
                }`}>
                  <achievement.icon className={`w-5 h-5 ${achievement.unlocked ? 'text-primary' : 'text-muted-foreground'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{achievement.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{achievement.description}</p>
                </div>
                <div className="text-right">
                  {achievement.unlocked ? (
                    <span className="text-[10px] text-emerald-500">Conquistado</span>
                  ) : (
                    <span className="text-[10px] text-muted-foreground">+{achievement.xp} XP</span>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Level Benefits */}
        <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Crown className="w-4 h-4 text-yellow-500" />
              Beneficios por Nivel
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {levelBenefits.map((benefit) => (
              <div 
                key={benefit.level}
                className={`flex items-center gap-3 p-3 rounded-lg ${
                  benefit.achieved ? 'bg-[#141414]' : 'bg-[#0a0a0a]'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold ${
                  benefit.achieved ? 'bg-primary/10 text-primary' : 'bg-[#1a1a1a] text-muted-foreground'
                }`}>
                  {benefit.level}
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${benefit.achieved ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {benefit.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{benefit.benefit}</p>
                </div>
                {benefit.achieved && (
                  <span className="text-[10px] text-emerald-500 px-2 py-0.5 bg-emerald-500/10 rounded">
                    Desbloqueado
                  </span>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Certificates */}
      <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <Medal className="w-4 h-4 text-emerald-500" />
            Certificados
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!certificates || certificates.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Medal className="w-8 h-8 text-primary/50" />
              </div>
              <p className="text-sm text-muted-foreground">
                Voce ainda nao possui certificados. Complete os modulos para desbloquear!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certificates.map((cert) => (
                <div key={cert.id} className="p-4 bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                        <Award className="w-5 h-5 text-emerald-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {(cert as unknown as { courses: { title: string } }).courses?.title || "Certificado"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Emitido em {new Date(cert.created_at).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
