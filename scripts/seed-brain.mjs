import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase URL or Key")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function seedSecondBrain() {
  console.log("Iniciando Mapeamento Neural do Projeto...")

  // Define Nodes
  const initialNodes = [
    { title: "Ghosting Plataforma (Coração)", content: "O hub central da plataforma.", group_type: "Projeto" },
    { title: "Módulo: Ghost AI", content: "Loja de Agentes de IA e Construtor Supremo.", group_type: "Ideia" },
    { title: "Módulo: Ofertas Escaladas", content: "Área de garimpo de anúncios do Facebook Ads.", group_type: "Ideia" },
    { title: "Módulo: Cursos e Aulas", content: "Gestão de EAD e progressão de alunos.", group_type: "Projeto" },
    { title: "Módulo: Funis e Tráfego", content: "Gestão de funis de vendas, rotas e pixels.", group_type: "Aprendizado" },
    { title: "Autenticação & Controle", content: "Gestão de usuários, RLS no Supabase e bloqueios.", group_type: "Outro" },
    { title: "Segundo Cérebro", content: "Este mapa mental 3D construído com react-force-graph.", group_type: "Ideia" },
  ]

  const insertedNodes = []

  // Insert Nodes
  for (const node of initialNodes) {
    const { data, error } = await supabase
      .from('brain_nodes')
      .insert([node])
      .select()
      .single()
    
    if (error) {
      console.error("Erro ao inserir nó:", node.title, error.message)
    } else {
      console.log(`Nó criado: ${node.title}`)
      insertedNodes.push(data)
    }
  }

  // Create Links
  if (insertedNodes.length === 7) {
    const hub = insertedNodes[0].id
    const ai = insertedNodes[1].id
    const ofertas = insertedNodes[2].id
    const cursos = insertedNodes[3].id
    const funis = insertedNodes[4].id
    const auth = insertedNodes[5].id
    const cerebro = insertedNodes[6].id

    const links = [
      { source: hub, target: ai },
      { source: hub, target: ofertas },
      { source: hub, target: cursos },
      { source: hub, target: funis },
      { source: hub, target: auth },
      { source: hub, target: cerebro },
      
      // Interconexões
      { source: ai, target: auth },
      { source: ofertas, target: auth },
      { source: cerebro, target: auth },
      { source: cursos, target: funis }
    ]

    for (const link of links) {
      const { error } = await supabase.from('brain_links').insert([link])
      if (error) {
        console.error("Erro ao criar ligação:", error.message)
      }
    }
    
    console.log("Ligações sinápticas criadas com sucesso!")
  }

  console.log("Mapeamento concluído. Verifique o seu Segundo Cérebro no painel.")
}

seedSecondBrain()
