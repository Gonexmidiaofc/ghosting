import { openai } from '@ai-sdk/openai'
import { generateObject } from 'ai'
import { z } from 'zod'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

export const maxDuration = 60; // Max execution time for Vercel (long context parsing)

const ingestionSchema = z.object({
  nodes: z.array(z.object({
    title: z.string().describe("Título curto e direto da ideia, conceito ou projeto. Máximo 5 palavras."),
    content: z.string().describe("Breve explicação ou resumo do conceito. De 1 a 3 frases."),
    group_type: z.enum(['Ideia', 'Projeto', 'Aprendizado', 'Outro']).describe("Classificação do nó")
  })),
  links: z.array(z.object({
    source_title: z.string().describe("Título do nó de origem (deve bater exatamente com um title gerado na lista de nodes)"),
    target_title: z.string().describe("Título do nó de destino (deve bater exatamente com um title gerado na lista de nodes)")
  }))
})

export async function POST(req: Request) {
  try {
    const { text } = await req.json()

    if (!text || text.length < 10) {
      return new Response(JSON.stringify({ error: "Texto muito curto" }), { status: 400 })
    }

    // Use AI to extract structured knowledge
    const { object } = await generateObject({
      model: openai('gpt-4o'),
      schema: ingestionSchema,
      prompt: `
Você é um Ingestor Neural de Conhecimento (estilo NotebookLM).
Seu objetivo é analisar o seguinte texto bruto fornecido pelo usuário, identificar os principais conceitos/atores/ideias e extraí-los como uma malha de rede (Nós e Conexões).

TEXTO DE ENTRADA:
"""
${text}
"""

Crie até 10 nós mais relevantes.
Conecte os nós logicamente através da lista de 'links'.
Use português estruturado.
      `
    })

    const { nodes, links } = object

    // Database insertions
    const insertedNodesMap: Record<string, string> = {}

    for (const node of nodes) {
      const { data, error } = await supabase
        .from('brain_nodes')
        .insert([{
          title: node.title,
          content: node.content,
          group_type: node.group_type
        }])
        .select()
        .single()

      if (data && !error) {
        insertedNodesMap[node.title] = data.id
      }
    }

    for (const link of links) {
      const sourceId = insertedNodesMap[link.source_title]
      const targetId = insertedNodesMap[link.target_title]

      if (sourceId && targetId && sourceId !== targetId) {
        await supabase
          .from('brain_links')
          .insert([{
            source: sourceId,
            target: targetId
          }])
      }
    }

    return new Response(JSON.stringify({ 
      success: true, 
      nodesCreated: nodes.length, 
      linksCreated: links.length 
    }), { status: 200 })

  } catch (error: any) {
    console.error("Ingestion Error:", error)
    return new Response(JSON.stringify({ error: "Erro na extração neural", details: error.message }), { status: 500 })
  }
}
