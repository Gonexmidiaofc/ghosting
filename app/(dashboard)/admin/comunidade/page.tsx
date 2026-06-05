"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessagesSquare, Users, MessageCircle, Flag, TrendingUp } from "lucide-react"

export default function ComunidadeAdminPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Comunidade</h1>
          <p className="text-muted-foreground">Gerencie a comunidade e interacoes</p>
        </div>
        <Button className="bg-primary text-primary-foreground">
          Criar Anuncio
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Users className="w-4 h-4" />
              Membros Ativos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">127</div>
            <p className="text-xs text-green-500">+12 esta semana</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Posts Hoje
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">34</div>
            <p className="text-xs text-muted-foreground">89 comentarios</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Flag className="w-4 h-4" />
              Denuncias
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">3</div>
            <p className="text-xs text-muted-foreground">pendentes</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Engajamento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">78%</div>
            <p className="text-xs text-green-500">+5% vs semana passada</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessagesSquare className="w-5 h-5 text-primary" />
            Posts Recentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { autor: "Rafael S.", post: "Acabei de bater minha meta de R$50k...", likes: 45, comentarios: 12, tempo: "2h" },
              { autor: "Marina L.", post: "Alguem tem template de campanha para...", likes: 23, comentarios: 8, tempo: "4h" },
              { autor: "Carlos M.", post: "Compartilhando meus resultados da semana...", likes: 67, comentarios: 21, tempo: "6h" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">{item.autor[0]}</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{item.autor}</p>
                    <p className="text-sm text-muted-foreground truncate max-w-[300px]">{item.post}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{item.likes} likes</span>
                  <span>{item.comentarios} comentarios</span>
                  <span>{item.tempo}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
