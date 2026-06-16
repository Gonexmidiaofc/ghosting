import { openai } from '@ai-sdk/openai';
import { streamText, Message } from 'ai';
import { createClient } from '@supabase/supabase-js';

// Setup Supabase Client (Service Role for DB queries)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export const maxDuration = 30; // Max execution time for Vercel

const SUPREME_PROMPT = `
Você é o Ghost AI Supreme, um arquiteto de inteligência artificial criado para ajudar o Administrador do sistema a desenvolver sub-agentes especialistas.
O Administrador vai te passar uma ideia (ex: "Quero um agente que escreva copys de e-mail").
Sua função é ajudá-lo a estruturar esse agente. Você deve fazer perguntas para refinar a personalidade, tom de voz e restrições do novo agente.
Quando o Administrador estiver satisfeito com a ideia, você deve formatar o PROMPT DE SISTEMA final para esse novo agente de forma extremamente profissional, detalhada e otimizada.
Você não executa tarefas finais (como escrever um e-mail), você constrói a mente do agente que fará isso.
Seja direto, profissional e focado em engenharia de prompt.
`;

export async function POST(req: Request) {
  try {
    const { messages, agentId } = await req.json();

    let systemPrompt = "Você é um assistente virtual útil.";

    if (agentId === 'supreme') {
      systemPrompt = SUPREME_PROMPT;
    } else if (agentId) {
      // Look up the specific agent in the database
      const { data: agent, error } = await supabase
        .from('custom_agents')
        .select('system_prompt')
        .eq('id', agentId)
        .single();

      if (agent && !error) {
        systemPrompt = agent.system_prompt;
      } else {
        return new Response(JSON.stringify({ error: "Agente não encontrado ou inativo" }), { status: 404 });
      }
    }

    const result = await streamText({
      model: openai('gpt-4o'),
      system: systemPrompt,
      messages: messages,
    });

    return result.toDataStreamResponse();
  } catch (error: any) {
    console.error("AI Error:", error);
    return new Response(JSON.stringify({ error: "Erro interno no servidor de IA", details: error.message }), { status: 500 });
  }
}
