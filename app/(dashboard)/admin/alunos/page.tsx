"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Plus, 
  Search,
  Filter,
  MoreVertical,
  Mail,
  Award,
  TrendingUp,
  Settings,
  X,
  Check,
  Shield
} from "lucide-react"

const initialStudents = [
  { id: 1, name: "Ghosting Ads", email: "ghosting.ads@gmail.com", plan: "dna_elite", role: "super_admin", status: "Ativo", progress: 100, lastAccess: "Agora", lessons: 47, score: 9999, xp: 99999, certified: true, payments: "Lifetime", tags: ["Owner", "VIP"] },
  { id: 2, name: "Joao Silva", email: "joao@email.com", plan: "dna_elite", role: "member", status: "Ativo", progress: 78, lastAccess: "2h atras", lessons: 45, score: 920, xp: 4500, certified: true, payments: "Em dia", tags: ["Engajado", "VIP"] },
  { id: 3, name: "Maria Santos", email: "maria@email.com", plan: "dna_pro", role: "member", status: "Ativo", progress: 65, lastAccess: "5h atras", lessons: 38, score: 780, xp: 3200, certified: false, payments: "Em dia", tags: ["Engajado"] },
  { id: 4, name: "Carlos Oliveira", email: "carlos@email.com", plan: "dna_elite", role: "member", status: "Ativo", progress: 92, lastAccess: "1d atras", lessons: 67, score: 1150, xp: 5800, certified: true, payments: "Em dia", tags: ["Top Aluno", "VIP"] },
  { id: 5, name: "Ana Costa", email: "ana@email.com", plan: "dna_start", role: "member", status: "Ativo", progress: 34, lastAccess: "3d atras", lessons: 12, score: 340, xp: 890, certified: false, payments: "Em dia", tags: [] },
  { id: 6, name: "Pedro Mendes", email: "pedro@email.com", plan: "dna_pro", role: "member", status: "Inativo", progress: 45, lastAccess: "15d atras", lessons: 23, score: 450, xp: 1200, certified: false, payments: "Atrasado", tags: ["Risco"] },
]

const planOptions = [
  { value: "dna_start", label: "DNA Start", color: "bg-blue-500/10 text-blue-500" },
  { value: "dna_pro", label: "DNA Pro", color: "bg-purple-500/10 text-purple-500" },
  { value: "dna_elite", label: "DNA Elite", color: "bg-primary/10 text-primary" },
]

const roleOptions = [
  { value: "member", label: "Membro", color: "bg-[#1a1a1a] text-muted-foreground" },
  { value: "admin", label: "Admin", color: "bg-orange-500/10 text-orange-500" },
  { value: "super_admin", label: "Super Admin", color: "bg-red-500/10 text-red-500" },
]

export default function AdminAlunos() {
  const [students, setStudents] = useState(initialStudents)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [loading, setLoading] = useState<number | null>(null)
  const [message, setMessage] = useState("")

  const handleUpdateAccess = async (studentId: number, email: string, plan: string, role: string) => {
    setLoading(studentId)
    try {
      const res = await fetch("/api/update-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, plan, role })
      })
      const data = await res.json()
      
      if (data.success) {
        setStudents(prev => prev.map(s => 
          s.id === studentId ? { ...s, plan, role } : s
        ))
        setMessage(`Acesso atualizado para ${email}`)
        setTimeout(() => setMessage(""), 3000)
      }
    } catch (error) {
      setMessage("Erro ao atualizar")
    }
    setLoading(null)
    setEditingId(null)
  }

  const getPlanInfo = (plan: string) => planOptions.find(p => p.value === plan) || planOptions[0]
  const getRoleInfo = (role: string) => roleOptions.find(r => r.value === role) || roleOptions[0]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Alunos</h1>
          <p className="text-sm text-muted-foreground">Gerencie acessos e planos dos alunos</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Aluno
        </Button>
      </div>

      {message && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 px-4 py-2 rounded-lg text-sm flex items-center gap-2">
          <Check className="w-4 h-4" />
          {message}
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Total Alunos</p>
            <p className="text-2xl font-bold text-foreground">{students.length}</p>
          </CardContent>
        </Card>
        <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Ativos</p>
            <p className="text-2xl font-bold text-emerald-500">{students.filter(s => s.status === 'Ativo').length}</p>
          </CardContent>
        </Card>
        <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">DNA Elite</p>
            <p className="text-2xl font-bold text-primary">{students.filter(s => s.plan === 'dna_elite').length}</p>
          </CardContent>
        </Card>
        <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">DNA Pro</p>
            <p className="text-2xl font-bold text-purple-500">{students.filter(s => s.plan === 'dna_pro').length}</p>
          </CardContent>
        </Card>
        <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Admins</p>
            <p className="text-2xl font-bold text-orange-500">{students.filter(s => s.role === 'admin' || s.role === 'super_admin').length}</p>
          </CardContent>
        </Card>
        <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Certificados</p>
            <p className="text-2xl font-bold text-foreground">{students.filter(s => s.certified).length}</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Buscar alunos..." 
            className="w-full bg-[#141414] border border-[#1a1a1a] rounded-lg pl-10 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground"
          />
        </div>
        <Button variant="outline" className="border-[#1a1a1a]">
          <Filter className="w-4 h-4 mr-2" />
          Filtros
        </Button>
      </div>

      <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1a1a1a]">
                  <th className="text-left p-4 text-xs font-medium text-muted-foreground">Aluno</th>
                  <th className="text-left p-4 text-xs font-medium text-muted-foreground">Plano</th>
                  <th className="text-left p-4 text-xs font-medium text-muted-foreground">Role</th>
                  <th className="text-left p-4 text-xs font-medium text-muted-foreground">Status</th>
                  <th className="text-left p-4 text-xs font-medium text-muted-foreground">Progresso</th>
                  <th className="text-left p-4 text-xs font-medium text-muted-foreground">Score/XP</th>
                  <th className="text-left p-4 text-xs font-medium text-muted-foreground">Acoes</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="border-b border-[#1a1a1a] hover:bg-[#141414] transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground flex items-center gap-2">
                            {student.name}
                            {student.certified && <Award className="w-3.5 h-3.5 text-primary" />}
                            {student.role === 'super_admin' && <Shield className="w-3.5 h-3.5 text-red-500" />}
                          </p>
                          <p className="text-xs text-muted-foreground">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      {editingId === student.id ? (
                        <select 
                          defaultValue={student.plan}
                          id={`plan-${student.id}`}
                          className="bg-[#141414] border border-[#1a1a1a] rounded px-2 py-1 text-xs text-foreground"
                        >
                          {planOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      ) : (
                        <span className={`text-xs px-2 py-1 rounded-full ${getPlanInfo(student.plan).color}`}>
                          {getPlanInfo(student.plan).label}
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      {editingId === student.id ? (
                        <select 
                          defaultValue={student.role}
                          id={`role-${student.id}`}
                          className="bg-[#141414] border border-[#1a1a1a] rounded px-2 py-1 text-xs text-foreground"
                        >
                          {roleOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      ) : (
                        <span className={`text-xs px-2 py-1 rounded-full ${getRoleInfo(student.role).color}`}>
                          {getRoleInfo(student.role).label}
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        student.status === 'Ativo' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'
                      }`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: `${student.progress}%` }} />
                        </div>
                        <span className="text-xs text-foreground">{student.progress}%</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-xs">
                        <p className="text-foreground font-medium">{student.score} pts</p>
                        <p className="text-muted-foreground">{student.xp} XP</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        {editingId === student.id ? (
                          <>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-7 w-7 text-emerald-500"
                              disabled={loading === student.id}
                              onClick={() => {
                                const planEl = document.getElementById(`plan-${student.id}`) as HTMLSelectElement
                                const roleEl = document.getElementById(`role-${student.id}`) as HTMLSelectElement
                                handleUpdateAccess(student.id, student.email, planEl.value, roleEl.value)
                              }}
                            >
                              {loading === student.id ? (
                                <div className="w-3 h-3 border border-emerald-500 border-t-transparent rounded-full animate-spin" />
                              ) : (
                                <Check className="w-3.5 h-3.5" />
                              )}
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-7 w-7 text-red-500"
                              onClick={() => setEditingId(null)}
                            >
                              <X className="w-3.5 h-3.5" />
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-7 w-7"
                              onClick={() => setEditingId(student.id)}
                              title="Editar acesso"
                            >
                              <Settings className="w-3.5 h-3.5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7" title="Enviar email">
                              <Mail className="w-3.5 h-3.5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7" title="Ver progresso">
                              <TrendingUp className="w-3.5 h-3.5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              <MoreVertical className="w-3.5 h-3.5" />
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
