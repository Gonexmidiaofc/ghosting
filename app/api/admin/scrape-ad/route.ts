import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { url } = await request.json()
    const apiKey = process.env.APIFY_API_KEY

    if (!url) {
      return NextResponse.json({ error: "A URL é obrigatória" }, { status: 400 })
    }

    if (!apiKey) {
      return NextResponse.json({ error: "Chave do Apify não configurada no servidor" }, { status: 500 })
    }

    // Call Apify actor apify/facebook-ads-scraper
    // Using run-sync-get-dataset-items to wait for completion and get results immediately
    const apifyUrl = `https://api.apify.com/v2/acts/apify~facebook-ads-scraper/run-sync-get-dataset-items?token=${apiKey}`
    
    console.log("Iniciando extração do Facebook Ads via Apify...")
    const response = await fetch(apifyUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        startUrls: [{ url }],
        maxAds: 1, // We only need the ad from the specific URL
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Erro no Apify:", errorText)
      return NextResponse.json({ error: "Falha ao se comunicar com o extrator (Apify)" }, { status: 500 })
    }

    const data = await response.json()
    
    // Apify dataset items returns an array
    if (!data || data.length === 0) {
      return NextResponse.json({ error: "Nenhum dado de anúncio encontrado nesse link." }, { status: 404 })
    }

    const ad = data[0]

    // Formatar os dados extraídos para o nosso frontend
    // O scraper do apify retorna campos específicos (podem variar, mas geralmente incluem primaryText, title, images/videos)
    
    const copyText = ad.primaryText || ad.body || ""
    const title = ad.title || ad.pageName || "Oferta Encontrada"
    
    // Pegar a mídia (vídeo tem prioridade sobre imagem)
    let mediaUrl = ""
    if (ad.videos && ad.videos.length > 0) {
      mediaUrl = ad.videos[0].videoUrl || ad.videos[0].videoHdUrl || ad.videos[0].videoSdUrl
    } else if (ad.images && ad.images.length > 0) {
      mediaUrl = ad.images[0].originalUrl || ad.images[0].resizedUrl
    } else if (ad.snapshotUrl) {
      mediaUrl = ad.snapshotUrl
    }

    return NextResponse.json({
      success: true,
      data: {
        title,
        copyText,
        mediaUrl,
        adLibraryUrl: url
      }
    })

  } catch (error: any) {
    console.error("Erro geral no scraper:", error)
    return NextResponse.json({ error: "Erro interno no servidor de extração" }, { status: 500 })
  }
}
