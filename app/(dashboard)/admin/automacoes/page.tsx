"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Plus, 
  Zap, 
  Play, 
  Pause, 
  MoreVertical,
  Mail,
  MessageSquare,
  Webhook,
  CreditCard,
  Clock,
  CheckCircle,
  XCircle,
  Activity
} from "lucide-react"

const automations = [
  {
    id: 1,
    name: "Welcome Email Sequence",
    trigger: "Novo Lead Capturado",
    action: "Enviar sequencia de 5 emails",
    project: "Metodo G.H.O.S.T",
    offer: "Todos",
    status: "Ativo",
    lastRun: "5 min atras",
    executions: 1247,
    successRate: 98.5,
    icon: Mail
  },
  {
    id: 2,
    name: "WhatsApp Follow-up",
    trigger: "Lead nao respondeu em 24h",
    action: "Enviar mensagem no WhatsApp",
    project: "Metodo G.H.O.S.T",
    offer: "Elite",
    status: "Ativo",
    lastRun: "12 min atras",
    executions: 456,
    successRate: 94.2,
    icon: MessageSquare
  },
  {
    id: 3,
    name: "Webhook Stripe → CRM",
    trigger: "Pagamento Aprovado",
    action: "Atualizar status no CRM",
    project: "Todos",
    offer: "Todos",
    status: "Ativo",
    lastRun: "2h atras",
    executions: 312,
    successRate: 100,
    icon: Webhook
  },
  {
    id: 4,
    name: "Dunning - Cartao Recusado",
    trigger: "Falha no pagamento",
    action: "Enviar email + SMS + WhatsApp",
    project: "Metodo G.H.O.S.T",
    offer: "Recorrentes",
    status: "Ativo",
    lastRun: "1d atras",
    executions: 89,
    successRate: 67.4,
    icon: CreditCard
  },
  {
    id: 5,
    name: "Onboarding Sequence",
    trigger: "Compra confirmada",
    action: "Enviar sequencia de onboarding",
    project: "Metodo G.H.O.S.T",
    offer: "Todos",
    status: "Ativo",
    lastRun: "3h atras",
    executions: 234,
    successRate: 99.1,
    icon: CheckCircle
  },
  {
    id: 6,
    name: "Reativacao de Inativos",
    trigger: "Aluno inativo ha 7 dias",
    action: "Enviar email de reativacao",
    project: "Metodo G.H.O.S.T",
    offer: "Todos",
    status: "Pausado",
    lastRun: "7d atras",
    executions: 156,
    successRate: 42.3,
    icon: Clock
  },
]

const integrations = [
  { name: "n8n", status: "Conectado", icon: "⚡" },
  { name: "Email (SMTP)", status: "Conectado", icon: "📧" },
  { name: "WhatsApp API", status: "Conectado", icon: "💬" },
  { name: "Webhooks", status: "Ativo", icon: "🔗" },
  { name: "Stripe", status: "Conectado", icon: "💳" },
]

const recentLogs = [
  { automation: "Welcome Email Sequence", status: "success", message: "Email enviado para joao@email.com", time: "2 min" },
  { automation: "WhatsApp Follow-up", status: "success", message: "Mensagem enviada para +55 11 99999-1234", time: "5 min" },
  { automation: "Webhook Stripe → CRM", status: "success", message: "CRM atualizado - Pedido #12345", time: "12 min" },
  { automation: "Dunning - Cartao Recusado", status: "error", message: "WhatsApp falhou - numero invalido", time: "1h" },
  { automation: "Welcome Email Sequence", status: "success", message: "Email enviado para maria@email.com", time: "2h" },
]

export default function AdminAutomacoes() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Automacoes</h1>
          <p className="text-sm text-muted-foreground">Central de automacoes e workflows</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Nova Automacao
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Total Automacoes</p>
            <p className="text-2xl font-bold text-foreground">{automations.length}</p>
          </CardContent>
        </Card>
        <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Ativas</p>
            <p className="text-2xl font-bold text-emerald-500">{automations.filter(a => a.status === 'Ativo').length}</p>
          </CardContent>
        </Card>
        <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Execucoes (30d)</p>
            <p className="text-2xl font-bold text-foreground">2.494</p>
          </CardContent>
        </Card>
        <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Taxa Sucesso</p>
            <p className="text-2xl font-bold text-primary">94.7%</p>
          </CardContent>
        </Card>
        <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Integracoes</p>
            <p className="text-2xl font-bold text-foreground">{integrations.length}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {automations.map((auto) => (
            <Card key={auto.id} className="bg-[#0d0d0d] border-[#1a1a1a] hover:border-[#2a2a2a] transition-colors">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    auto.status === 'Ativo' ? 'bg-emerald-500/10' : 'bg-yellow-500/10'
                  }`}>
                    <auto.icon className={`w-5 h-5 ${
                      auto.status === 'Ativo' ? 'text-emerald-500' : 'text-yellow-500'
                    }`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-sm font-semibold text-foreground">{auto.name}</h3>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                        auto.status === 'Ativo' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-yellow-500/10 text-yellow-500'
                      }`}>
                        {auto.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <span className="text-primary">Gatilho:</span> {auto.trigger}
                      <span className="text-muted-foreground">→</span>
                      <span className="text-primary">Acao:</span> {auto.action}
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{auto.project}</span>
                      <span>•</span>
                      <span>{auto.executions} execucoes</span>
                      <span>•</span>
                      <span className={auto.successRate >= 90 ? 'text-emerald-500' : auto.successRate >= 70 ? 'text-yellow-500' : 'text-red-500'}>
                        {auto.successRate}% sucesso
                      </span>
                      <span>•</span>
                      <span>Ultima: {auto.lastRun}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      {auto.status === 'Ativo' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Activity className="w-4 h-4" />
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

        <div className="space-y-4">
          <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Integracoes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {integrations.map((int) => (
                <div key={int.name} className="flex items-center justify-between p-2 bg-[#141414] rounded-lg">
                  <div className="flex items-center gap-2">
                    <span>{int.icon}</span>
                    <span className="text-xs font-medium text-foreground">{int.name}</span>
                  </div>
                  <span className="text-[10px] text-emerald-500">{int.status}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Logs Recentes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {recentLogs.map((log, i) => (
                <div key={i} className="p-2 bg-[#141414] rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-muted-foreground">{log.automation}</span>
                    <span className="text-[10px] text-muted-foreground">{log.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {log.status === 'success' ? (
                      <CheckCircle className="w-3 h-3 text-emerald-500" />
                    ) : (
                      <XCircle className="w-3 h-3 text-red-500" />
                    )}
                    <span className="text-[10px] text-foreground truncate">{log.message}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
