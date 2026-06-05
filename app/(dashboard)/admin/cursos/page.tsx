"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GraduationCap, Plus, Users, BookOpen, Clock, MoreVertical } from "lucide-react"

const cursos = [
  { id: 1, nome: "Metodo G.H.O.S.T", alunos: 127, modulos: 7, aulas: 47, duracao: "32h", status: "ativo" },
  { id: 2, nome: "Masterclass Trafego", alunos: 89, modulos: 4, aulas: 24, duracao: "18h", status: "ativo" },
  { id: 3, nome: "Funis de Alta Conversao", alunos: 56, modulos: 3, aulas: 15, duracao: "12h", status: "rascunho" },
]

export default function CursosPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Cursos</h1>
          <p className="text-muted-foreground">Gerencie seus cursos e treinamentos</p>
        </div>
        <Button className="bg-primary text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" />
          Novo Curso
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cursos.map((curso) => (
          <Card key={curso.id} className="bg-card border-border">
            <CardHeader className="flex flex-row items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-base">{curso.nome}</CardTitle>
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    curso.status === "ativo" ? "bg-green-500/20 text-green-500" : "bg-yellow-500/20 text-yellow-500"
                  }`}>
                    {curso.status}
                  </span>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">{curso.alunos} alunos</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">{curso.modulos} modulos</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">{curso.aulas} aulas</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">{curso.duracao}</span>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">
                Gerenciar Curso
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
