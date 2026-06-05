"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Shield, 
  ShieldAlert, 
  ShieldCheck, 
  Lock, 
  Unlock,
  AlertTriangle,
  Activity,
  Globe,
  Clock,
  Eye,
  Ban,
  RefreshCw,
  Search,
  Download,
  Filter,
  ChevronDown,
  CheckCircle2,
  XCircle,
  Monitor,
  Smartphone,
  Laptop,
  UserX,
  Zap,
  TrendingUp
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"

interface SecurityLog {
  id: string
  ip_address: string
  user_agent: string | null
  event_type: string
  severity: string
  endpoint: string | null
  method: string | null
  details: Record<string, unknown>
  country: string | null
  city: string | null
  device: string | null
  browser: string | null
  os: string | null
  created_at: string
}

interface BlockedIP {
  id: string
  ip_address: string
  reason: string
  blocked_at: string
  blocked_until: string | null
  is_permanent: boolean
  attempts_count: number
  last_attempt_at: string
}

interface SecurityStats {
  total_logs_24h: number
  blocked_ips: number
  failed_logins_24h: number
  suspicious_activities: number
  active_sessions: number
}

const eventTypeLabels: Record<string, string> = {
  login_success: "Login Sucesso",
  login_failed: "Login Falhou",
  logout: "Logout",
  signup: "Cadastro",
  password_reset: "Reset de Senha",
  password_change: "Alteracao de Senha",
  email_change: "Alteracao de Email",
  rate_limit_exceeded: "Rate Limit Excedido",
  blocked_ip_attempt: "Tentativa de IP Bloqueado",
  suspicious_activity: "Atividade Suspeita",
  bot_detected: "Bot Detectado",
  sql_injection_attempt: "Tentativa SQL Injection",
  xss_attempt: "Tentativa XSS",
  csrf_attempt: "Tentativa CSRF",
  brute_force: "Brute Force",
  unauthorized_access: "Acesso Nao Autorizado",
  api_key_used: "API Key Usada",
  webhook_triggered: "Webhook Disparado",
  admin_action: "Acao Admin"
}

const severityColors: Record<string, string> = {
  info: "bg-blue-500/20 text-blue-400",
  warning: "bg-yellow-500/20 text-yellow-400",
  error: "bg-orange-500/20 text-orange-400",
  critical: "bg-red-500/20 text-red-400"
}

export default function SecurityPage() {
  const [logs, setLogs] = useState<SecurityLog[]>([])
  const [blockedIPs, setBlockedIPs] = useState<BlockedIP[]>([])
  const [stats, setStats] = useState<SecurityStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<"overview" | "logs" | "blocked" | "realtime">("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [eventFilter, setEventFilter] = useState<string>("all")
  const [severityFilter, setSeverityFilter] = useState<string>("all")
  const [newBlockIP, setNewBlockIP] = useState("")
  const [blockReason, setBlockReason] = useState("")

  const supabase = createClient()

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      // Fetch security logs
      const logsRes = await fetch("/api/security/logs?limit=200")
      if (logsRes.ok) {
        const logsData = await logsRes.json()
        setLogs(logsData.data || [])
      }

      // Fetch blocked IPs
      const blockedRes = await fetch("/api/security/blocked-ips")
      if (blockedRes.ok) {
        const blockedData = await blockedRes.json()
        setBlockedIPs(blockedData.data || [])
      }

      // Fetch stats
      const { data: statsData } = await supabase.rpc("get_security_stats")
      if (statsData) {
        setStats(statsData)
      }
    } catch (error) {
      console.error("Error fetching security data:", error)
    } finally {
      setLoading(false)
    }
  }, [supabase])

  useEffect(() => {
    fetchData()
    
    // Auto refresh every 30 seconds
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [fetchData])

  const handleBlockIP = async () => {
    if (!newBlockIP) return
    
    try {
      const res = await fetch("/api/security/blocked-ips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ip_address: newBlockIP,
          reason: blockReason || "Bloqueado manualmente pelo admin",
          duration_hours: 24,
          permanent: false
        })
      })
      
      if (res.ok) {
        setNewBlockIP("")
        setBlockReason("")
        fetchData()
      }
    } catch (error) {
      console.error("Error blocking IP:", error)
    }
  }

  const handleUnblockIP = async (ip: string) => {
    try {
      const res = await fetch(`/api/security/blocked-ips?ip=${encodeURIComponent(ip)}`, {
        method: "DELETE"
      })
      
      if (res.ok) {
        fetchData()
      }
    } catch (error) {
      console.error("Error unblocking IP:", error)
    }
  }

  const filteredLogs = logs.filter(log => {
    const matchesSearch = 
      log.ip_address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.endpoint || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.details && JSON.stringify(log.details).toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesEvent = eventFilter === "all" || log.event_type === eventFilter
    const matchesSeverity = severityFilter === "all" || log.severity === severityFilter
    
    return matchesSearch && matchesEvent && matchesSeverity
  })

  const getDeviceIcon = (device: string | null) => {
    if (!device) return Monitor
    const d = device.toLowerCase()
    if (d.includes("mobile") || d.includes("phone")) return Smartphone
    if (d.includes("tablet")) return Laptop
    return Monitor
  }

  const exportLogs = () => {
    const csv = [
      ["Data", "IP", "Evento", "Severidade", "Endpoint", "Detalhes"].join(","),
      ...filteredLogs.map(log => [
        log.created_at,
        log.ip_address,
        log.event_type,
        log.severity,
        log.endpoint || "",
        JSON.stringify(log.details || {})
      ].join(","))
    ].join("\n")
    
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `security-logs-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
            <Shield className="w-7 h-7 text-red-500" />
            Central de Seguranca
          </h1>
          <p className="text-sm text-muted-foreground">Monitore e proteja seu sistema em tempo real</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={fetchData} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Atualizar
          </Button>
          <Button variant="outline" size="sm" onClick={exportLogs}>
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Logs 24h</p>
                <p className="text-xl font-bold text-foreground">{stats?.total_logs_24h || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                <Ban className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">IPs Bloqueados</p>
                <p className="text-xl font-bold text-foreground">{stats?.blocked_ips || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Login Falhos 24h</p>
                <p className="text-xl font-bold text-foreground">{stats?.failed_logins_24h || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <ShieldAlert className="w-5 h-5 text-orange-400" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Atividades Suspeitas</p>
                <p className="text-xl font-bold text-foreground">{stats?.suspicious_activities || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Sessoes Ativas</p>
                <p className="text-xl font-bold text-foreground">{stats?.active_sessions || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-[#0d0d0d] p-1 rounded-lg w-fit">
        {[
          { id: "overview", label: "Visao Geral", icon: Eye },
          { id: "logs", label: "Logs", icon: Activity },
          { id: "blocked", label: "IPs Bloqueados", icon: Ban },
          { id: "realtime", label: "Tempo Real", icon: Zap }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === tab.id
                ? "bg-red-500/20 text-red-500"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Protection Status */}
          <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                Status de Protecao
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { name: "Row Level Security (RLS)", enabled: true },
                { name: "Rate Limiting", enabled: true },
                { name: "Deteccao de Bots", enabled: true },
                { name: "Protecao SQL Injection", enabled: true },
                { name: "Protecao XSS", enabled: true },
                { name: "Protecao CSRF", enabled: true },
                { name: "Brute Force Protection", enabled: true },
                { name: "Security Headers", enabled: true }
              ].map((item) => (
                <div key={item.name} className="flex items-center justify-between p-3 bg-[#141414] rounded-lg">
                  <span className="text-sm text-foreground">{item.name}</span>
                  {item.enabled ? (
                    <Badge className="bg-emerald-500/20 text-emerald-400 border-0">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Ativo
                    </Badge>
                  ) : (
                    <Badge className="bg-red-500/20 text-red-400 border-0">
                      <XCircle className="w-3 h-3 mr-1" />
                      Inativo
                    </Badge>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Threats */}
          <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-500" />
                Ameacas Recentes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 max-h-[380px] overflow-y-auto">
              {logs
                .filter(log => ["warning", "error", "critical"].includes(log.severity))
                .slice(0, 10)
                .map((log) => (
                  <div key={log.id} className="flex items-start gap-3 p-3 bg-[#141414] rounded-lg">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      log.severity === "critical" ? "bg-red-500" :
                      log.severity === "error" ? "bg-orange-500" :
                      "bg-yellow-500"
                    }`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-foreground">
                          {eventTypeLabels[log.event_type] || log.event_type}
                        </span>
                        <Badge className={severityColors[log.severity]}>
                          {log.severity}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        IP: {log.ip_address}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(log.created_at), { addSuffix: true, locale: ptBR })}
                      </p>
                    </div>
                  </div>
                ))}
              {logs.filter(log => ["warning", "error", "critical"].includes(log.severity)).length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <ShieldCheck className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">Nenhuma ameaca detectada</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Block IP */}
          <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Ban className="w-4 h-4 text-red-500" />
                Bloquear IP Manualmente
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input
                placeholder="Digite o endereco IP"
                value={newBlockIP}
                onChange={(e) => setNewBlockIP(e.target.value)}
                className="bg-[#141414] border-[#1a1a1a]"
              />
              <Input
                placeholder="Motivo do bloqueio (opcional)"
                value={blockReason}
                onChange={(e) => setBlockReason(e.target.value)}
                className="bg-[#141414] border-[#1a1a1a]"
              />
              <Button 
                onClick={handleBlockIP}
                disabled={!newBlockIP}
                className="w-full bg-red-500 hover:bg-red-600"
              >
                <Ban className="w-4 h-4 mr-2" />
                Bloquear IP
              </Button>
            </CardContent>
          </Card>

          {/* Security Metrics */}
          <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                Metricas de Seguranca
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-[#141414] rounded-lg">
                  <p className="text-xs text-muted-foreground">Taxa de Bloqueio</p>
                  <p className="text-lg font-bold text-foreground">
                    {logs.length > 0 ? ((logs.filter(l => l.severity !== "info").length / logs.length) * 100).toFixed(1) : 0}%
                  </p>
                </div>
                <div className="p-3 bg-[#141414] rounded-lg">
                  <p className="text-xs text-muted-foreground">Eventos/Hora</p>
                  <p className="text-lg font-bold text-foreground">
                    {Math.round((stats?.total_logs_24h || 0) / 24)}
                  </p>
                </div>
                <div className="p-3 bg-[#141414] rounded-lg">
                  <p className="text-xs text-muted-foreground">IPs Unicos</p>
                  <p className="text-lg font-bold text-foreground">
                    {new Set(logs.map(l => l.ip_address)).size}
                  </p>
                </div>
                <div className="p-3 bg-[#141414] rounded-lg">
                  <p className="text-xs text-muted-foreground">Eventos Criticos</p>
                  <p className="text-lg font-bold text-red-500">
                    {logs.filter(l => l.severity === "critical").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Logs Tab */}
      {activeTab === "logs" && (
        <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">Logs de Seguranca</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 w-48 bg-[#141414] border-[#1a1a1a]"
                  />
                </div>
                <div className="relative">
                  <Filter className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <select
                    value={eventFilter}
                    onChange={(e) => setEventFilter(e.target.value)}
                    className="pl-9 pr-8 py-2 bg-[#141414] border border-[#1a1a1a] rounded-md text-sm text-foreground appearance-none cursor-pointer"
                  >
                    <option value="all">Todos Eventos</option>
                    {Object.entries(eventTypeLabels).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                </div>
                <div className="relative">
                  <select
                    value={severityFilter}
                    onChange={(e) => setSeverityFilter(e.target.value)}
                    className="px-3 py-2 bg-[#141414] border border-[#1a1a1a] rounded-md text-sm text-foreground appearance-none cursor-pointer pr-8"
                  >
                    <option value="all">Todas Severidades</option>
                    <option value="info">Info</option>
                    <option value="warning">Warning</option>
                    <option value="error">Error</option>
                    <option value="critical">Critical</option>
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {filteredLogs.map((log) => {
                const DeviceIcon = getDeviceIcon(log.device)
                return (
                  <div key={log.id} className="flex items-start gap-4 p-4 bg-[#141414] rounded-lg hover:bg-[#1a1a1a] transition-colors">
                    <div className={`w-3 h-3 rounded-full mt-1.5 ${
                      log.severity === "critical" ? "bg-red-500" :
                      log.severity === "error" ? "bg-orange-500" :
                      log.severity === "warning" ? "bg-yellow-500" :
                      "bg-blue-500"
                    }`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-medium text-foreground">
                          {eventTypeLabels[log.event_type] || log.event_type}
                        </span>
                        <Badge className={severityColors[log.severity]}>
                          {log.severity}
                        </Badge>
                        {log.endpoint && (
                          <Badge variant="outline" className="text-xs">
                            {log.method} {log.endpoint}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Globe className="w-3 h-3" />
                          {log.ip_address}
                        </span>
                        {log.country && (
                          <span>{log.country}{log.city ? `, ${log.city}` : ""}</span>
                        )}
                        <span className="flex items-center gap-1">
                          <DeviceIcon className="w-3 h-3" />
                          {log.browser || "Desconhecido"}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatDistanceToNow(new Date(log.created_at), { addSuffix: true, locale: ptBR })}
                        </span>
                      </div>
                      {log.details && Object.keys(log.details).length > 0 && (
                        <div className="mt-2 p-2 bg-[#0d0d0d] rounded text-xs text-muted-foreground font-mono overflow-x-auto">
                          {JSON.stringify(log.details, null, 2)}
                        </div>
                      )}
                    </div>
                    {log.severity !== "info" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setNewBlockIP(log.ip_address)
                          setActiveTab("overview")
                        }}
                        className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
                      >
                        <Ban className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                )
              })}
              {filteredLogs.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <Activity className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">Nenhum log encontrado</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Blocked IPs Tab */}
      {activeTab === "blocked" && (
        <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <Ban className="w-4 h-4 text-red-500" />
              IPs Bloqueados ({blockedIPs.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {blockedIPs.map((ip) => (
                <div key={ip.id} className="flex items-center justify-between p-4 bg-[#141414] rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                      <UserX className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground font-mono">{ip.ip_address}</p>
                      <p className="text-xs text-muted-foreground">{ip.reason}</p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                        <span>Tentativas: {ip.attempts_count}</span>
                        <span>
                          Bloqueado: {formatDistanceToNow(new Date(ip.blocked_at), { addSuffix: true, locale: ptBR })}
                        </span>
                        {ip.is_permanent ? (
                          <Badge className="bg-red-500/20 text-red-400 border-0">Permanente</Badge>
                        ) : ip.blocked_until && (
                          <span>
                            Expira: {formatDistanceToNow(new Date(ip.blocked_until), { addSuffix: true, locale: ptBR })}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleUnblockIP(ip.ip_address)}
                    className="text-emerald-500 border-emerald-500/50 hover:bg-emerald-500/10"
                  >
                    <Unlock className="w-4 h-4 mr-2" />
                    Desbloquear
                  </Button>
                </div>
              ))}
              {blockedIPs.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <ShieldCheck className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">Nenhum IP bloqueado</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Realtime Tab */}
      {activeTab === "realtime" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-500" />
                Eventos em Tempo Real
                <div className="ml-auto flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-xs text-muted-foreground">Ao vivo</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 max-h-[500px] overflow-y-auto">
              {logs.slice(0, 20).map((log, index) => (
                <div 
                  key={log.id} 
                  className={`flex items-start gap-3 p-3 bg-[#141414] rounded-lg transition-all ${
                    index === 0 ? "animate-pulse border border-primary/30" : ""
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    log.severity === "critical" ? "bg-red-500" :
                    log.severity === "error" ? "bg-orange-500" :
                    log.severity === "warning" ? "bg-yellow-500" :
                    "bg-blue-500"
                  }`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-foreground">
                        {eventTypeLabels[log.event_type] || log.event_type}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(log.created_at), { addSuffix: true, locale: ptBR })}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {log.ip_address} • {log.endpoint || "Sistema"}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-500" />
                Mapa de Atividade
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {/* Top IPs */}
                <div className="p-3 bg-[#141414] rounded-lg">
                  <p className="text-xs font-medium text-muted-foreground mb-2">Top IPs Ativos</p>
                  {Object.entries(
                    logs.reduce((acc, log) => {
                      acc[log.ip_address] = (acc[log.ip_address] || 0) + 1
                      return acc
                    }, {} as Record<string, number>)
                  )
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 5)
                    .map(([ip, count]) => (
                      <div key={ip} className="flex items-center justify-between py-1">
                        <span className="text-xs font-mono text-foreground">{ip}</span>
                        <span className="text-xs text-muted-foreground">{count} eventos</span>
                      </div>
                    ))}
                </div>

                {/* Event Types Distribution */}
                <div className="p-3 bg-[#141414] rounded-lg">
                  <p className="text-xs font-medium text-muted-foreground mb-2">Distribuicao de Eventos</p>
                  {Object.entries(
                    logs.reduce((acc, log) => {
                      acc[log.event_type] = (acc[log.event_type] || 0) + 1
                      return acc
                    }, {} as Record<string, number>)
                  )
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 5)
                    .map(([type, count]) => {
                      const percent = logs.length > 0 ? (count / logs.length) * 100 : 0
                      return (
                        <div key={type} className="space-y-1 py-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-foreground">{eventTypeLabels[type] || type}</span>
                            <span className="text-muted-foreground">{count} ({percent.toFixed(0)}%)</span>
                          </div>
                          <div className="h-1.5 bg-[#0d0d0d] rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary rounded-full"
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                        </div>
                      )
                    })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
