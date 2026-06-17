import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: Request) {
  try {
    const { url } = await request.json()
    const apiKey = process.env.APIFY_API_KEY
    const openaiKey = process.env.OPENAI_API_KEY
    
    // Configurar cliente supabase com master key para pular o RLS (estamos no backend admin)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    if (!url) {
      return NextResponse.json({ error: "A URL é obrigatória" }, { status: 400 })
    }

    if (!apiKey) {
      return NextResponse.json({ error: "Chave do Apify não configurada no servidor" }, { status: 500 })
    }

    // 1. Extrair os anúncios usando Apify (maxAds: 3)
    const apifyUrl = `https://api.apify.com/v2/acts/apify~facebook-ads-scraper/run-sync-get-dataset-items?token=${apiKey}`
    
    console.log("Iniciando extração em lote do Facebook Ads via Apify...")
    const response = await fetch(apifyUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        startUrls: [{ url }],
        maxAds: 3, // Puxar 3 anúncios automaticamente
      })
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      console.error("Erro no Apify:", errorData)
      
      // Checar se o limite acabou
      if (errorData?.error?.message?.includes("limit exceeded")) {
        return NextResponse.json({ error: "Sua conta do Apify atingiu o limite mensal. Recarregue os créditos no painel do Apify." }, { status: 402 })
      }
      
      return NextResponse.json({ error: "Falha ao se comunicar com o extrator (Apify)." }, { status: 500 })
    }

    const data = await response.json()
    
    if (!data || data.length === 0) {
      return NextResponse.json({ error: "Nenhum dado de anúncio encontrado nesse link." }, { status: 404 })
    }

    console.log(`Apify extraiu ${data.length} anúncios. Iniciando IA...`)

    let insertedCount = 0;

    // 2. Processar cada anúncio, categorizar com IA, e salvar no banco
    for (const ad of data) {
      const copyText = ad.primaryText || ad.body || ""
      const title = ad.title || ad.pageName || "Oferta Escalada Extraída"
      
      let mediaUrl = ""
      if (ad.videos && ad.videos.length > 0) {
        mediaUrl = ad.videos[0].videoUrl || ad.videos[0].videoHdUrl || ad.videos[0].videoSdUrl || ""
      } else if (ad.images && ad.images.length > 0) {
        mediaUrl = ad.images[0].originalUrl || ad.images[0].resizedUrl || ""
      } else if (ad.snapshotUrl) {
        mediaUrl = ad.snapshotUrl
      }

      // Se o anúncio for nulo/vazio, pula
      if (!copyText && !mediaUrl) continue

      // 3. IA para Categorização do idioma
      let category = "Brasil (BR)" // Padrão
      
      if (openaiKey && copyText) {
        try {
          const aiRes = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${openaiKey}`
            },
            body: JSON.stringify({
              model: "gpt-4o-mini",
              messages: [
                {
                  role: "system",
                  content: "Você é um classificador de anúncios. Responda APENAS com a categoria exata baseada no idioma do texto. Regras: Se for português, responda 'Brasil (BR)'. Se for espanhol, inglês ou qualquer outro idioma estrangeiro, responda 'Gringa (LATAM)'. Não fale mais nada."
                },
                { role: "user", content: `Classifique o seguinte texto:\n\n${copyText}` }
              ],
              temperature: 0,
              max_tokens: 10
            })
          })
          
          if (aiRes.ok) {
            const aiData = await aiRes.json()
            const resultText = aiData.choices[0].message.content.trim()
            if (resultText === "Brasil (BR)" || resultText === "Gringa (LATAM)") {
              category = resultText
            }
          }
        } catch (e) {
          console.error("Falha ao usar OpenAI, usando categoria padrão.", e)
        }
      }

      // 4. Salvar direto no Supabase
      const { error: dbError } = await supabase
        .from('scaled_offers')
        .insert([{
          title: title,
          category: category,
          ad_library_url: url,
          media_url: mediaUrl,
          copy_text: copyText,
          is_free: false // Padrão
        }])

      if (!dbError) {
        insertedCount++
      } else {
        console.error("Erro ao inserir anúncio no Supabase:", dbError)
      }
    }

    return NextResponse.json({
      success: true,
      message: `Sucesso! Extraídos e salvos ${insertedCount} anúncios com Inteligência Artificial.`,
      count: insertedCount
    })

  } catch (error: any) {
    console.error("Erro geral no scraper:", error)
    return NextResponse.json({ error: "Erro interno no servidor de extração" }, { status: 500 })
  }
}
