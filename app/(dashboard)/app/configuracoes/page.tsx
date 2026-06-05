"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  User, 
  Bell, 
  Shield, 
  CreditCard,
  Loader2,
  Check
} from "lucide-react"

interface Profile {
  id: string
  full_name: string | null
  email: string
  phone: string | null
  company: string | null
  avatar_url: string | null
}

export default function ConfiguracoesPage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  
  const supabase = createClient()

  useEffect(() => {
    async function loadProfile() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single()
        
        if (data) {
          setProfile(data)
        }
      }
      setLoading(false)
    }
    loadProfile()
  }, [supabase])

  const handleSave = async () => {
    if (!profile) return
    setSaving(true)

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: profile.full_name,
        phone: profile.phone,
        company: profile.company,
      })
      .eq("id", profile.id)

    setSaving(false)
    if (!error) {
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Configuracoes</h1>
        <p className="text-muted-foreground mt-1">
          Gerencie suas preferencias e informacoes da conta
        </p>
      </div>

      <Tabs defaultValue="perfil" className="space-y-6">
        <TabsList className="bg-secondary/50">
          <TabsTrigger value="perfil" className="gap-2">
            <User className="w-4 h-4" />
            Perfil
          </TabsTrigger>
          <TabsTrigger value="notificacoes" className="gap-2">
            <Bell className="w-4 h-4" />
            Notificacoes
          </TabsTrigger>
          <TabsTrigger value="seguranca" className="gap-2">
            <Shield className="w-4 h-4" />
            Seguranca
          </TabsTrigger>
          <TabsTrigger value="assinatura" className="gap-2">
            <CreditCard className="w-4 h-4" />
            Assinatura
          </TabsTrigger>
        </TabsList>

        <TabsContent value="perfil">
          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle>Informacoes do Perfil</CardTitle>
              <CardDescription>
                Atualize suas informacoes pessoais
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar */}
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
                  {profile?.avatar_url ? (
                    <img 
                      src={profile.avatar_url} 
                      alt="Avatar"
                      className="w-20 h-20 rounded-2xl object-cover"
                    />
                  ) : (
                    <span className="text-2xl font-bold text-primary">
                      {profile?.full_name?.slice(0, 2).toUpperCase() || "US"}
                    </span>
                  )}
                </div>
                <div>
                  <Button variant="outline" size="sm">Alterar foto</Button>
                  <p className="text-xs text-muted-foreground mt-1">JPG, PNG. Max 2MB</p>
                </div>
              </div>

              {/* Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nome completo</label>
                  <Input
                    value={profile?.full_name || ""}
                    onChange={(e) => setProfile(prev => prev ? { ...prev, full_name: e.target.value } : null)}
                    className="bg-secondary/50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    value={profile?.email || ""}
                    disabled
                    className="bg-secondary/50 opacity-60"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Telefone</label>
                  <Input
                    value={profile?.phone || ""}
                    onChange={(e) => setProfile(prev => prev ? { ...prev, phone: e.target.value } : null)}
                    placeholder="(00) 00000-0000"
                    className="bg-secondary/50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Empresa</label>
                  <Input
                    value={profile?.company || ""}
                    onChange={(e) => setProfile(prev => prev ? { ...prev, company: e.target.value } : null)}
                    placeholder="Nome da empresa"
                    className="bg-secondary/50"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSave} disabled={saving}>
                  {saving ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : saved ? (
                    <Check className="w-4 h-4 mr-2" />
                  ) : null}
                  {saved ? "Salvo!" : "Salvar alteracoes"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notificacoes">
          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle>Preferencias de Notificacao</CardTitle>
              <CardDescription>
                Escolha como deseja receber atualizacoes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Em breve...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seguranca">
          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle>Seguranca</CardTitle>
              <CardDescription>
                Gerencie sua senha e autenticacao
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-secondary/50 flex items-center justify-between">
                <div>
                  <p className="font-medium">Alterar senha</p>
                  <p className="text-sm text-muted-foreground">Atualize sua senha regularmente</p>
                </div>
                <Button variant="outline">Alterar</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assinatura">
          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle>Sua Assinatura</CardTitle>
              <CardDescription>
                Gerencie seu plano e pagamentos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-6 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Plano atual</p>
                    <p className="text-2xl font-bold text-foreground">DNA Start</p>
                  </div>
                  <Button>Fazer upgrade</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
