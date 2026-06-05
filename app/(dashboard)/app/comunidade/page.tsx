"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase/client"
import { 
  Users, 
  MessageSquare, 
  Trophy, 
  Crown,
  Medal,
  Star,
  TrendingUp,
  Send,
  Heart,
  MessageCircle,
  Share2,
  UserCircle
} from "lucide-react"

interface CommunityPost {
  id: string
  user_id: string
  title: string | null
  content: string
  type: string
  likes_count: number
  comments_count: number
  created_at: string
  profiles?: {
    full_name: string | null
    avatar_url: string | null
  }
}

interface RankingUser {
  id: string
  full_name: string | null
  xp: number
  level: number
}

export default function ComunidadePage() {
  const [newPost, setNewPost] = useState("")
  const [posts, setPosts] = useState<CommunityPost[]>([])
  const [rankings, setRankings] = useState<RankingUser[]>([])
  const [memberCount, setMemberCount] = useState(0)
  const [onlineCount, setOnlineCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState<{ id: string; full_name: string | null } | null>(null)

  useEffect(() => {
    async function loadData() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("id, full_name")
          .eq("id", user.id)
          .single()
        
        setCurrentUser(profile)
      }

      // Carregar posts da comunidade
      const { data: postsData } = await supabase
        .from("community_posts")
        .select(`
          id,
          user_id,
          title,
          content,
          type,
          likes_count,
          comments_count,
          created_at,
          profiles:user_id (full_name, avatar_url)
        `)
        .eq("status", "active")
        .order("created_at", { ascending: false })
        .limit(20)

      if (postsData) {
        setPosts(postsData as unknown as CommunityPost[])
      }

      // Carregar contagem de membros
      const { count } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true })

      setMemberCount(count || 0)

      // Carregar ranking (por XP se existir gamification)
      const { data: rankingData } = await supabase
        .from("profiles")
        .select("id, full_name, xp, level")
        .order("xp", { ascending: false })
        .limit(10)

      if (rankingData) {
        setRankings(rankingData)
      }

      setLoading(false)
    }

    loadData()
  }, [])

  const handleSubmitPost = async () => {
    if (!newPost.trim() || !currentUser) return

    const supabase = createClient()
    
    const { error } = await supabase
      .from("community_posts")
      .insert({
        user_id: currentUser.id,
        content: newPost,
        type: "post"
      })

    if (!error) {
      setNewPost("")
      // Recarregar posts
      const { data: postsData } = await supabase
        .from("community_posts")
        .select(`
          id,
          user_id,
          title,
          content,
          type,
          likes_count,
          comments_count,
          created_at,
          profiles:user_id (full_name, avatar_url)
        `)
        .eq("status", "active")
        .order("created_at", { ascending: false })
        .limit(20)

      if (postsData) {
        setPosts(postsData as unknown as CommunityPost[])
      }
    }
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
    
    if (diffInSeconds < 60) return "agora"
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}min`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`
    return `${Math.floor(diffInSeconds / 86400)}d`
  }

  const getInitials = (name: string | null) => {
    if (!name) return "U"
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Comunidade G.H.O.S.T</h1>
        <p className="text-muted-foreground mt-1">Conecte-se com outros operadores e compartilhe resultados</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Feed */}
        <div className="lg:col-span-2 space-y-6">
          {/* New Post */}
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                  {getInitials(currentUser?.full_name)}
                </div>
                <div className="flex-1">
                  <Input
                    placeholder="Compartilhe seus resultados ou tire duvidas..."
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    className="bg-secondary border-border"
                  />
                  <div className="flex justify-end mt-3">
                    <Button 
                      size="sm" 
                      className="bg-primary text-primary-foreground"
                      onClick={handleSubmitPost}
                      disabled={!newPost.trim()}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Publicar
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Posts */}
          {posts.length === 0 ? (
            <Card className="bg-[#0d0d0d] border-[#1a1a1a]">
              <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <MessageSquare className="w-8 h-8 text-primary/50" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Nenhuma publicacao ainda</h3>
                <p className="text-sm text-muted-foreground max-w-md">
                  Seja o primeiro a compartilhar algo com a comunidade!
                </p>
              </CardContent>
            </Card>
          ) : (
            posts.map((post) => (
              <Card key={post.id} className="bg-card border-border">
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                      {getInitials(post.profiles?.full_name)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground">
                          {post.profiles?.full_name || "Usuario"}
                        </span>
                        <span className="text-xs text-muted-foreground">{formatTimeAgo(post.created_at)}</span>
                      </div>
                      <p className="text-foreground mt-2">{post.content}</p>
                      <div className="flex items-center gap-6 mt-4">
                        <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                          <Heart className="w-4 h-4" />
                          <span className="text-sm">{post.likes_count}</span>
                        </button>
                        <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                          <MessageCircle className="w-4 h-4" />
                          <span className="text-sm">{post.comments_count}</span>
                        </button>
                        <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Sidebar - Ranking */}
        <div className="space-y-6">
          {/* Stats */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Comunidade
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 rounded-lg bg-secondary/50">
                  <p className="text-2xl font-bold text-primary">{memberCount}</p>
                  <p className="text-xs text-muted-foreground">Membros</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-secondary/50">
                  <p className="text-2xl font-bold text-green-400">{onlineCount}</p>
                  <p className="text-xs text-muted-foreground">Online</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ranking */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Trophy className="w-5 h-5 text-primary" />
                Ranking
              </CardTitle>
            </CardHeader>
            <CardContent>
              {rankings.length === 0 ? (
                <div className="text-center py-8">
                  <UserCircle className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Nenhum ranking disponivel</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {rankings.map((user, index) => (
                    <div 
                      key={user.id}
                      className={`flex items-center gap-3 p-2 rounded-lg ${
                        user.id === currentUser?.id ? "bg-primary/10 border border-primary/30" : "hover:bg-secondary/50"
                      } transition-colors`}
                    >
                      <span className={`w-6 text-center font-bold ${
                        index === 0 ? "text-yellow-400" :
                        index === 1 ? "text-gray-400" :
                        index === 2 ? "text-amber-600" :
                        "text-muted-foreground"
                      }`}>
                        {index + 1}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold">
                        {getInitials(user.full_name)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {user.full_name || "Usuario"} {user.id === currentUser?.id && "(Voce)"}
                        </p>
                        <p className="text-xs text-muted-foreground">Nivel {user.level || 1}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-primary">{(user.xp || 0).toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">XP</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
