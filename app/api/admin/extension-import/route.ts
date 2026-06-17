import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: Request) {
  try {
    // A API permite requests de qualquer origem (CORS) para que a extensão do Chrome consiga bater aqui
    const origin = request.headers.get("origin")
    
    const body = await request.json()
    const { ads, sourceUrl } = body
    const openaiKey = process.env.OPENAI_API_KEY
    
    // Configurar cliente supabase com master key para pular o RLS
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    if (!ads || !Array.isArray(ads) || ads.length === 0) {
      return NextResponse.json({ error: "Nenhum anúncio enviado pela extensão." }, { status: 400 })
    }

    console.log(`Recebidos ${ads.length} anúncios da Extensão. Processando IA...`)

    let insertedCount = 0;

    for (const ad of ads) {
      const copyText = ad.copyText || ""
      const title = ad.title || "Oferta Extraída via Extensão"
      const mediaUrl = ad.mediaUrl || ""

      if (!copyText && !mediaUrl) continue

      // IA para Categorização do idioma
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

      // Salvar direto no Supabase
      const { error: dbError } = await supabase
        .from('scaled_offers')
        .insert([{
          title: title,
          category: category,
          ad_library_url: sourceUrl || "https://facebook.com/ads/library",
          media_url: mediaUrl,
          copy_text: copyText,
          is_free: false
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
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    })

  } catch (error: any) {
    console.error("Erro geral na rota da extensão:", error)
    return NextResponse.json({ error: "Erro interno no servidor." }, { 
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*'
      } 
    })
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  })
}
