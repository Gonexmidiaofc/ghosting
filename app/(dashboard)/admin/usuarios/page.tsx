import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Search, 
  Filter, 
  MoreVertical,
  Mail,
  Crown,
  Calendar
} from "lucide-react"

export default async function AdminUsuariosPage() {
  const supabase = await createClient()

  const { data: users } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50)

  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case "dna_elite":
        return { label: "DNA Elite", color: "bg-primary/20 text-primary" }
      case "dna_pro":
        return { label: "DNA Pro", color: "bg-blue-500/20 text-blue-400" }
      default:
        return { label: "DNA Start", color: "bg-secondary text-muted-foreground" }
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "super_admin":
        return { label: "Super Admin", color: "bg-red-500/20 text-red-400" }
      case "admin":
        return { label: "Admin", color: "bg-orange-500/20 text-orange-400" }
      default:
        return { label: "Membro", color: "bg-green-500/20 text-green-400" }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Usuarios</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie todos os usuarios da plataforma
          </p>
        </div>
        <Button>Adicionar Usuario</Button>
      </div>

      {/* Filters */}
      <Card className="bg-card/50">
        <CardContent className="py-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar por nome ou email..." 
                className="pl-10 bg-secondary/50"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="bg-card/50">
        <CardHeader>
          <CardTitle>Lista de Usuarios</CardTitle>
          <CardDescription>{users?.length || 0} usuarios encontrados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Usuario</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Plano</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Role</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Cadastro</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Acoes</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user) => {
                  const planBadge = getPlanBadge(user.plan)
                  const roleBadge = getRoleBadge(user.role)

                  return (
                    <tr key={user.id} className="border-b border-border/50 hover:bg-secondary/30">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-sm font-semibold text-primary">
                              {(user.full_name || user.email)?.slice(0, 2).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-foreground">
                              {user.full_name || "Sem nome"}
                            </p>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${planBadge.color}`}>
                          <Crown className="w-3 h-3" />
                          {planBadge.label}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${roleBadge.color}`}>
                          {roleBadge.label}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(user.created_at).toLocaleDateString("pt-BR")}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
