"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Plus, 
  MoreVertical, 
  PlayCircle, 
  Users, 
  Clock,
  Edit,
  Eye,
  GripVertical,
  FileText
} from "lucide-react"

const modules = [
  {
    id: 0,
    name: "Modulo 0 — Operator Setup",
    description: "Fundamentos e setup inicial para operar no digital",
    lessons: 8,
    duration: "2h 45min",
    status: "Publicado",
    avgProgress: 89,
    completedStudents: 234,
    totalStudents: 263,
    materials: 12
  },
  {
    id: 1,
    name: "Modulo 1 — Growth Architecture",
    description: "Arquitetura de crescimento e estrutura de funis",
    lessons: 12,
    duration: "4h 30min",
    status: "Publicado",
    avgProgress: 76,
    completedStudents: 198,
    totalStudents: 263,
    materials: 18
  },
  {
    id: 2,
    name: "Modulo 2 — High Performance Traffic",
    description: "Trafego de alta performance e escala",
    lessons: 15,
    duration: "5h 15min",
    status: "Publicado",
    avgProgress: 64,
    completedStudents: 156,
    totalStudents: 263,
    materials: 24
  },
  {
    id: 3,
    name: "Modulo 3 — Operational Systems",
    description: "Sistemas operacionais e automacoes",
    lessons: 10,
    duration: "3h 45min",
    status: "Publicado",
    avgProgress: 52,
    completedStudents: 98,
    totalStudents: 263,
    materials: 15
  },
  {
    id: 4,
    name: "Modulo 4 — Scale Intelligence",
    description: "Inteligencia de escala e otimizacao",
    lessons: 11,
    duration: "4h",
    status: "Publicado",
    avgProgress: 38,
    completedStudents: 67,
    totalStudents: 263,
    materials: 14
  },
  {
    id: 5,
    name: "Modulo 5 — Tactical Expansion",
    description: "Expansao tatica e novos mercados",
    lessons: 9,
    duration: "3h 30min",
    status: "Publicado",
    avgProgress: 24,
    completedStudents: 45,
    totalStudents: 263,
    materials: 11
  },
  {
    id: 6,
    name: "Modulo 6 — SaaS & Systems",
    description: "Construcao de SaaS e sistemas proprios",
    lessons: 14,
    duration: "5h",
    status: "Em Producao",
    avgProgress: 12,
    completedStudents: 23,
    totalStudents: 263,
    materials: 8
  },
]

export default function AdminModulos() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Modulos</h1>
          <p className="text-sm text-muted-foreground">Gerencie os modulos do Metodo G.H.O.S.T</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Novo Modulo
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Total Modulos</p>
            <p className="text-2xl font-bold text-foreground">{modules.length}</p>
          </CardContent>
        </Card>
        <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Total Aulas</p>
            <p className="text-2xl font-bold text-foreground">{modules.reduce((acc, m) => acc + m.lessons, 0)}</p>
          </CardContent>
        </Card>
        <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Duracao Total</p>
            <p className="text-2xl font-bold text-foreground">28h 45min</p>
          </CardContent>
        </Card>
        <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Progresso Medio</p>
            <p className="text-2xl font-bold text-primary">51%</p>
          </CardContent>
        </Card>
        <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Materiais</p>
            <p className="text-2xl font-bold text-foreground">{modules.reduce((acc, m) => acc + m.materials, 0)}</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-3">
        {modules.map((module) => (
          <Card key={module.id} className="bg-[#0d0d0d] border-[#1a1a1a] hover:border-[#2a2a2a] transition-colors">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-8 h-8 text-muted-foreground cursor-grab">
                  <GripVertical className="w-4 h-4" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">{module.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{module.description}</p>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                      module.status === 'Publicado' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-yellow-500/10 text-yellow-500'
                    }`}>
                      {module.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-6 mt-4">
                    <div className="flex items-center gap-2">
                      <PlayCircle className="w-4 h-4 text-muted-foreground" />
                      <span className="text-xs text-foreground">{module.lessons} aulas</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-xs text-foreground">{module.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="text-xs text-foreground">{module.completedStudents}/{module.totalStudents} concluiram</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      <span className="text-xs text-foreground">{module.materials} materiais</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Progresso medio</span>
                      <span className="text-primary font-medium">{module.avgProgress}%</span>
                    </div>
                    <div className="h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${module.avgProgress}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Plus className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
