import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  FolderKanban, 
  Plus, 
  MoreVertical,
  Calendar,
  Users
} from "lucide-react"

export default async function WorkspacePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", user?.id)
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Workspace</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie seus projetos e operacoes
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Novo Projeto
        </Button>
      </div>

      {/* Projects Grid */}
      {projects && projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link key={project.id} href={`/app/workspace/${project.id}`}>
              <Card className="bg-card/50 hover:bg-card hover:shadow-lg transition-all cursor-pointer h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <FolderKanban className="w-6 h-6 text-primary" />
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                  <CardTitle className="mt-4">{project.name}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {project.description || "Sem descricao"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(project.created_at).toLocaleDateString("pt-BR")}
                    </div>
                    <div className="flex items-center gap-1">
                      <span className={`w-2 h-2 rounded-full ${
                        project.status === "active" ? "bg-green-500" : "bg-yellow-500"
                      }`} />
                      {project.status === "active" ? "Ativo" : "Pausado"}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <Card className="bg-card/50">
          <CardContent className="py-16 text-center">
            <div className="w-16 h-16 rounded-2xl bg-secondary mx-auto flex items-center justify-center mb-4">
              <FolderKanban className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Nenhum projeto ainda
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Crie seu primeiro projeto para comecar a organizar suas operacoes digitais
            </p>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Criar primeiro projeto
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
