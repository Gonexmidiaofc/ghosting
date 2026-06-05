"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Settings, 
  Users, 
  Shield, 
  Link, 
  QrCode, 
  Crosshair, 
  CreditCard, 
  Bell, 
  Upload, 
  Sparkles, 
  Palette, 
  Key,
  Lock,
  Save
} from "lucide-react"
import { useState } from "react"

const tabs = [
  { id: "geral", name: "Geral", icon: Settings },
  { id: "usuarios", name: "Usuarios", icon: Users },
  { id: "permissoes", name: "Permissoes", icon: Shield },
  { id: "integracoes", name: "Integracoes", icon: Link },
  { id: "pixels", name: "Pixels", icon: QrCode },
  { id: "tracking", name: "Tracking", icon: Crosshair },
  { id: "pagamentos", name: "Pagamentos", icon: CreditCard },
  { id: "notificacoes", name: "Notificacoes", icon: Bell },
  { id: "importacoes", name: "Importacoes", icon: Upload },
  { id: "novidades", name: "Novidades", icon: Sparkles },
  { id: "tema", name: "Tema", icon: Palette },
  { id: "api", name: "API Keys", icon: Key },
  { id: "seguranca", name: "Seguranca", icon: Lock },
]

const integrations = [
  { name: "Stripe", status: "Conectado", icon: "💳" },
  { name: "Meta Ads", status: "Conectado", icon: "📘" },
  { name: "Google Ads", status: "Conectado", icon: "🔍" },
  { name: "TikTok Ads", status: "Nao conectado", icon: "🎵" },
  { name: "n8n", status: "Conectado", icon: "⚡" },
  { name: "WhatsApp API", status: "Conectado", icon: "💬" },
  { name: "Supabase", status: "Conectado", icon: "🗄️" },
  { name: "Vercel", status: "Conectado", icon: "▲" },
]

export default function AdminConfiguracoes() {
  const [activeTab, setActiveTab] = useState("geral")

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Configuracoes</h1>
          <p className="text-sm text-muted-foreground">Gerencie as configuracoes do sistema</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Save className="w-4 h-4 mr-2" />
          Salvar Alteracoes
        </Button>
      </div>

      <div className="flex gap-6">
        {/* Sidebar Tabs */}
        <div className="w-48 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                activeTab === tab.id 
                  ? 'bg-primary/10 text-primary' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-[#141414]'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.name}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === "geral" && (
            <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
              <CardHeader>
                <CardTitle className="text-base">Configuracoes Gerais</CardTitle>
                <CardDescription>Configuracoes basicas da plataforma</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-xs text-muted-foreground">Nome da Plataforma</label>
                  <input 
                    type="text" 
                    defaultValue="GHOST.SYSTEM"
                    className="w-full mt-1 bg-[#141414] border border-[#1a1a1a] rounded-lg px-3 py-2 text-sm text-foreground"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">URL do Sistema</label>
                  <input 
                    type="text" 
                    defaultValue="https://ghosting.ads"
                    className="w-full mt-1 bg-[#141414] border border-[#1a1a1a] rounded-lg px-3 py-2 text-sm text-foreground"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Email de Suporte</label>
                  <input 
                    type="email" 
                    defaultValue="suporte@ghosting.ads"
                    className="w-full mt-1 bg-[#141414] border border-[#1a1a1a] rounded-lg px-3 py-2 text-sm text-foreground"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Timezone</label>
                  <select className="w-full mt-1 bg-[#141414] border border-[#1a1a1a] rounded-lg px-3 py-2 text-sm text-foreground">
                    <option>America/Sao_Paulo (GMT-3)</option>
                    <option>America/New_York (GMT-5)</option>
                    <option>Europe/London (GMT+0)</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "integracoes" && (
            <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
              <CardHeader>
                <CardTitle className="text-base">Integracoes</CardTitle>
                <CardDescription>Conecte suas ferramentas e plataformas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {integrations.map((int) => (
                  <div key={int.name} className="flex items-center justify-between p-3 bg-[#141414] rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{int.icon}</span>
                      <div>
                        <p className="text-sm font-medium text-foreground">{int.name}</p>
                        <p className={`text-xs ${int.status === 'Conectado' ? 'text-emerald-500' : 'text-muted-foreground'}`}>
                          {int.status}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="border-[#1a1a1a]">
                      {int.status === 'Conectado' ? 'Configurar' : 'Conectar'}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {activeTab === "pixels" && (
            <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
              <CardHeader>
                <CardTitle className="text-base">Pixels e Tracking</CardTitle>
                <CardDescription>Configure seus pixels de conversao</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-xs text-muted-foreground">Meta Pixel ID</label>
                  <input 
                    type="text" 
                    placeholder="Insira o Pixel ID"
                    className="w-full mt-1 bg-[#141414] border border-[#1a1a1a] rounded-lg px-3 py-2 text-sm text-foreground"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Meta CAPI Token</label>
                  <input 
                    type="password" 
                    placeholder="Insira o Access Token"
                    className="w-full mt-1 bg-[#141414] border border-[#1a1a1a] rounded-lg px-3 py-2 text-sm text-foreground"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Google Tag Manager ID</label>
                  <input 
                    type="text" 
                    placeholder="GTM-XXXXXXX"
                    className="w-full mt-1 bg-[#141414] border border-[#1a1a1a] rounded-lg px-3 py-2 text-sm text-foreground"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">GA4 Measurement ID</label>
                  <input 
                    type="text" 
                    placeholder="G-XXXXXXXXXX"
                    className="w-full mt-1 bg-[#141414] border border-[#1a1a1a] rounded-lg px-3 py-2 text-sm text-foreground"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Google Ads Conversion ID</label>
                  <input 
                    type="text" 
                    placeholder="AW-XXXXXXXXX"
                    className="w-full mt-1 bg-[#141414] border border-[#1a1a1a] rounded-lg px-3 py-2 text-sm text-foreground"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">TikTok Pixel ID</label>
                  <input 
                    type="text" 
                    placeholder="Insira o Pixel ID"
                    className="w-full mt-1 bg-[#141414] border border-[#1a1a1a] rounded-lg px-3 py-2 text-sm text-foreground"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "api" && (
            <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
              <CardHeader>
                <CardTitle className="text-base">API Keys</CardTitle>
                <CardDescription>Gerencie suas chaves de API</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-[#141414] rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-foreground">API Key Principal</p>
                    <Button variant="ghost" size="sm">Regenerar</Button>
                  </div>
                  <code className="text-xs text-muted-foreground bg-[#0d0d0d] px-2 py-1 rounded">
                    ghost_sk_live_••••••••••••••••••••••••
                  </code>
                </div>
                <div className="p-3 bg-[#141414] rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-foreground">Webhook Secret</p>
                    <Button variant="ghost" size="sm">Regenerar</Button>
                  </div>
                  <code className="text-xs text-muted-foreground bg-[#0d0d0d] px-2 py-1 rounded">
                    whsec_••••••••••••••••••••••••
                  </code>
                </div>
                <Button variant="outline" className="w-full border-[#1a1a1a]">
                  <Key className="w-4 h-4 mr-2" />
                  Criar Nova API Key
                </Button>
              </CardContent>
            </Card>
          )}

          {activeTab === "seguranca" && (
            <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
              <CardHeader>
                <CardTitle className="text-base">Seguranca</CardTitle>
                <CardDescription>Configure opcoes de seguranca</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-[#141414] rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-foreground">Autenticacao 2FA</p>
                    <p className="text-xs text-muted-foreground">Adicione uma camada extra de seguranca</p>
                  </div>
                  <Button variant="outline" size="sm" className="border-[#1a1a1a]">Ativar</Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#141414] rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-foreground">Sessoes Ativas</p>
                    <p className="text-xs text-muted-foreground">3 dispositivos conectados</p>
                  </div>
                  <Button variant="outline" size="sm" className="border-[#1a1a1a]">Gerenciar</Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#141414] rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-foreground">Logs de Acesso</p>
                    <p className="text-xs text-muted-foreground">Visualize historico de logins</p>
                  </div>
                  <Button variant="outline" size="sm" className="border-[#1a1a1a]">Ver Logs</Button>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Alterar Senha</label>
                  <input 
                    type="password" 
                    placeholder="Nova senha"
                    className="w-full mt-1 bg-[#141414] border border-[#1a1a1a] rounded-lg px-3 py-2 text-sm text-foreground"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {!["geral", "integracoes", "pixels", "api", "seguranca"].includes(activeTab) && (
            <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
              <CardContent className="p-8 text-center">
                <div className="w-12 h-12 bg-[#141414] rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Settings className="w-6 h-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {tabs.find(t => t.id === activeTab)?.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Configuracoes de {tabs.find(t => t.id === activeTab)?.name.toLowerCase()} em desenvolvimento.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
