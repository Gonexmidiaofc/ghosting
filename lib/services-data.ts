export interface ServicePlan {
  plano: string
  valor: string
  inclui: string
}

export interface ServiceFeature {
  title: string
  description: string
}

export interface Service {
  id: string
  slug: string
  title: string
  subtitle: string
  iconName: string
  description: string
  fullDescription: string
  benefits: string[]
  features: ServiceFeature[]
  plans: ServicePlan[]
  faq: { question: string; answer: string }[]
}

export const services: Service[] = [
  {
    id: "landing-page",
    slug: "landing-page",
    title: "Landing Page",
    subtitle: "Paginas que convertem visitantes em clientes",
    iconName: "LayoutTemplate",
    description: "Paginas de alta conversao com design dark premium e copy estrategica",
    fullDescription: "Construimos landing pages com arquitetura de conversao comprovada. Cada elemento e pensado para guiar o visitante ate a acao: design dark premium, copy persuasiva, CTAs estrategicos e otimizacao para mobile. Nao criamos paginas bonitas — criamos maquinas de conversao.",
    benefits: [
      "Taxa de conversao acima da media do mercado",
      "Design exclusivo que transmite autoridade",
      "Copy baseada em gatilhos psicologicos",
      "Otimizacao completa para SEO e velocidade",
      "Integracao nativa com CRM e automacoes",
      "Tracking avancado de comportamento"
    ],
    features: [
      { title: "Design Dark Premium", description: "Identidade visual sofisticada que diferencia sua marca" },
      { title: "Copy Estrategica", description: "Textos persuasivos que vendem sem parecer vendedor" },
      { title: "Mobile First", description: "Performance otimizada para qualquer dispositivo" },
      { title: "CTA Inteligente", description: "Botoes e formularios posicionados estrategicamente" },
      { title: "Analytics Integrado", description: "Dados em tempo real para otimizacao continua" },
      { title: "Carregamento Rapido", description: "Menos de 3 segundos para carregar completamente" }
    ],
    plans: [
      { plano: "Starter", valor: "R$697", inclui: "Pagina de conversao, design premium, copy basica, responsiva, CTA WhatsApp" },
      { plano: "Premium", valor: "R$1.297", inclui: "Copy estrategica, estrutura psicologica, integracao CRM, tracking completo" },
      { plano: "Scale", valor: "R$2.497", inclui: "UX avancada, automacoes, analytics, funil estruturado, testes A/B" },
    ],
    faq: [
      { question: "Quanto tempo leva para ficar pronta?", answer: "Entre 5 a 10 dias uteis dependendo do plano escolhido." },
      { question: "Posso editar depois de pronta?", answer: "Sim, entregamos com painel de edicao ou acesso completo ao codigo." },
      { question: "Inclui hospedagem?", answer: "Orientamos sobre hospedagem, mas nao esta inclusa no valor." }
    ]
  },
  {
    id: "gestao-trafego",
    slug: "gestao-trafego",
    title: "Gestao de Trafego",
    subtitle: "Escale suas vendas com campanhas estruturadas",
    iconName: "Target",
    description: "Escale suas vendas com campanhas estruturadas para aquisicao qualificada",
    fullDescription: "Gestao de trafego nao e apenas apertar botoes no Meta Ads. E ciencia de aquisicao: segmentacao cirurgica, criativos que param o scroll, copy que convence, e otimizacao constante baseada em dados. Operamos campanhas que trazem leads qualificados prontos para comprar.",
    benefits: [
      "Leads qualificados e prontos para converter",
      "Reducao de custo por aquisicao (CPA)",
      "Escala previsivel e controlada",
      "Relatorios semanais com insights acionaveis",
      "Otimizacao diaria de campanhas",
      "Testes de criativos e audiencias"
    ],
    features: [
      { title: "Meta Ads Expert", description: "Campanhas otimizadas para Facebook e Instagram" },
      { title: "Google Ads", description: "Search, Display e YouTube para captura de demanda" },
      { title: "Remarketing Avancado", description: "Recupere visitantes que nao converteram" },
      { title: "Lookalike Audiences", description: "Encontre mais pessoas como seus melhores clientes" },
      { title: "Criativos de Alta Conversao", description: "Anuncios que capturam atencao e geram cliques" },
      { title: "Dashboard em Tempo Real", description: "Acompanhe seus resultados quando quiser" }
    ],
    plans: [
      { plano: "Starter", valor: "R$997/mes", inclui: "Meta Ads, otimizacao basica, relatorios semanais e criativos" },
      { plano: "Performance", valor: "R$1.997/mes", inclui: "Meta + Google Ads, estrategia semanal, funil e criativos premium" },
      { plano: "Scale", valor: "R$3.500 - R$7.000/mes", inclui: "Escala agressiva, multi campanhas, CRO e dashboards" },
    ],
    faq: [
      { question: "Preciso ter verba de anuncios separada?", answer: "Sim, o valor da gestao nao inclui a verba de midia que vai direto para as plataformas." },
      { question: "Qual o minimo de investimento em anuncios?", answer: "Recomendamos no minimo R$1.500/mes para resultados consistentes." },
      { question: "Quanto tempo para ver resultados?", answer: "Primeiros leads em 7-14 dias. Escala consistente em 60-90 dias." }
    ]
  },
  {
    id: "criativos",
    slug: "criativos",
    title: "Criativos Premium",
    subtitle: "Designs que param o scroll e geram cliques",
    iconName: "Palette",
    description: "Designs que capturam atencao e maximizam conversoes",
    fullDescription: "Em um feed lotado, voce tem 3 segundos para capturar atencao. Nossos criativos sao projetados para interromper o scroll, comunicar valor instantaneamente e gerar o clique. Design dark premium, copy afiada e formatos que funcionam em cada plataforma.",
    benefits: [
      "Criativos que param o scroll",
      "Identidade visual consistente",
      "Formatos otimizados por plataforma",
      "Copy persuasiva integrada",
      "Testes A/B de variacoes",
      "Entrega em alta resolucao"
    ],
    features: [
      { title: "Design Dark Premium", description: "Estetica sofisticada que transmite autoridade" },
      { title: "Formatos Multiplataforma", description: "Feed, Stories, Reels, TikTok, YouTube" },
      { title: "Copy Integrada", description: "Texto persuasivo que complementa o visual" },
      { title: "Motion Graphics", description: "Animacoes sutis que capturam atencao" },
      { title: "Variacoes para Teste", description: "Multiplas versoes para otimizacao" },
      { title: "Entrega Rapida", description: "Criativos prontos em ate 48h" }
    ],
    plans: [
      { plano: "Starter", valor: "R$497", inclui: "5 criativos premium estaticos" },
      { plano: "Performance", valor: "R$897", inclui: "10 criativos + copy estrategica + motion" },
      { plano: "Scale", valor: "R$1.497", inclui: "20 criativos para testes e escala" },
    ],
    faq: [
      { question: "Posso solicitar revisoes?", answer: "Sim, incluimos ate 2 rodadas de ajustes em cada criativo." },
      { question: "Voces fazem videos?", answer: "Fazemos motion graphics. Para videos completos, consulte nosso pacote de conteudo." },
      { question: "Quanto tempo para entrega?", answer: "Criativos estaticos em 48h, motion graphics em 72h." }
    ]
  },
  {
    id: "funil",
    slug: "funil",
    title: "Estruturacao de Funil",
    subtitle: "Jornadas que convertem visitantes em clientes",
    iconName: "GitBranch",
    description: "Funis completos que convertem visitantes em clientes previsiveis",
    fullDescription: "Um funil bem estruturado transforma trafego frio em clientes fieis de forma automatica. Desenhamos cada etapa da jornada: captura, nutricao, conversao e retencao. Com automacoes inteligentes, seu funil trabalha 24/7 enquanto voce foca no que importa.",
    benefits: [
      "Conversao automatizada 24/7",
      "Nutricao de leads no piloto automatico",
      "Recuperacao de abandonos",
      "Segmentacao por comportamento",
      "Escalabilidade infinita",
      "Metricas claras de cada etapa"
    ],
    features: [
      { title: "Mapeamento de Jornada", description: "Entendemos exatamente como seu cliente compra" },
      { title: "Landing Pages Estrategicas", description: "Paginas especificas para cada etapa" },
      { title: "Email Marketing", description: "Sequencias que nutrem e convertem" },
      { title: "WhatsApp Automation", description: "Mensagens automaticas que vendem" },
      { title: "Remarketing Integrado", description: "Recupere quem nao converteu" },
      { title: "Analytics de Funil", description: "Saiba onde estao os gargalos" }
    ],
    plans: [
      { plano: "Starter", valor: "R$1.297", inclui: "Landing page, CRM basico e automacao inicial" },
      { plano: "Premium", valor: "R$2.497", inclui: "Funil completo, remarketing, recuperacao e analytics" },
    ],
    faq: [
      { question: "Preciso ter email marketing?", answer: "Configuramos tudo do zero ou integramos com sua ferramenta atual." },
      { question: "Funciona para qualquer nicho?", answer: "Sim, adaptamos a estrutura do funil para seu modelo de negocio." },
      { question: "E se eu ja tiver um funil?", answer: "Analisamos e otimizamos seu funil existente." }
    ]
  },
  {
    id: "crm",
    slug: "crm",
    title: "CRM + Automacao",
    subtitle: "Sistemas que convertem leads automaticamente",
    iconName: "Bot",
    description: "Sistemas que convertem leads automaticamente 24/7",
    fullDescription: "Leads sem follow-up sao dinheiro jogado fora. Implementamos CRM com automacoes inteligentes: cada lead recebe a mensagem certa, no momento certo, pelo canal certo. Integracao com WhatsApp, email, e pipeline visual para voce nunca mais perder uma venda.",
    benefits: [
      "Zero leads perdidos",
      "Follow-up automatico 24/7",
      "Pipeline visual de vendas",
      "Integracao multi-canal",
      "Relatorios de conversao",
      "Previsibilidade de receita"
    ],
    features: [
      { title: "Pipeline Visual", description: "Veja todas suas oportunidades em um so lugar" },
      { title: "WhatsApp Business API", description: "Automacoes direto no WhatsApp" },
      { title: "Lead Scoring", description: "Saiba quais leads estao prontos para comprar" },
      { title: "Automacoes Inteligentes", description: "Regras que disparam acoes automaticamente" },
      { title: "Integracoes", description: "Conecte com suas ferramentas atuais" },
      { title: "App Mobile", description: "Gerencie vendas de qualquer lugar" }
    ],
    plans: [
      { plano: "Starter", valor: "R$997", inclui: "Pipeline simples + automacao WhatsApp basica" },
      { plano: "Scale", valor: "R$2.997+", inclui: "CRM completo, IA, automacoes avancadas e integracoes" },
    ],
    faq: [
      { question: "Qual CRM voces usam?", answer: "Trabalhamos com Kommo, HubSpot, Pipedrive ou solucoes customizadas." },
      { question: "Preciso trocar meu CRM atual?", answer: "Nao necessariamente. Podemos otimizar seu sistema atual." },
      { question: "Inclui treinamento?", answer: "Sim, treinamos sua equipe para usar o sistema." }
    ]
  },
  {
    id: "branding",
    slug: "branding",
    title: "Branding Premium",
    subtitle: "Identidade visual que transmite autoridade",
    iconName: "Sparkles",
    description: "Identidade visual que transmite autoridade e exclusividade",
    fullDescription: "Sua marca e a primeira impressao e a lembranca duradoura. Criamos identidades visuais dark premium que comunicam autoridade, sofisticacao e confianca. Do logo aos materiais completos, cada elemento e pensado para posicionar voce acima da concorrencia.",
    benefits: [
      "Posicionamento premium percebido",
      "Consistencia em todos os pontos de contato",
      "Diferenciacao da concorrencia",
      "Materiais prontos para uso",
      "Guia de marca completo",
      "Arquivos editaveis"
    ],
    features: [
      { title: "Logomark + Logotype", description: "Simbolo e tipografia unicos para sua marca" },
      { title: "Paleta de Cores", description: "Cores estrategicas que comunicam seus valores" },
      { title: "Tipografia", description: "Fontes que reforcam sua personalidade" },
      { title: "Elementos Graficos", description: "Padroes e icones exclusivos" },
      { title: "Aplicacoes", description: "Cartao, assinatura, social media" },
      { title: "Brand Guide", description: "Manual completo de uso da marca" }
    ],
    plans: [
      { plano: "Starter", valor: "R$797", inclui: "Logo + paleta de cores + tipografia + aplicacoes basicas" },
      { plano: "Premium", valor: "R$1.997", inclui: "Identidade completa + brand guide + materiais de marketing" },
    ],
    faq: [
      { question: "Quantas opcoes de logo recebo?", answer: "Apresentamos 3 conceitos diferentes para voce escolher." },
      { question: "Posso pedir ajustes?", answer: "Sim, incluimos ate 3 rodadas de revisao." },
      { question: "Recebo os arquivos editaveis?", answer: "Sim, entregamos em todos os formatos necessarios." }
    ]
  },
  {
    id: "estrategia",
    slug: "estrategia",
    title: "Estrategia Digital",
    subtitle: "Consultoria para crescimento estruturado",
    iconName: "LineChart",
    description: "Consultoria para crescimento previsivel e estruturado",
    fullDescription: "Antes de executar, e preciso planejar. Nossa consultoria estrategica analisa seu negocio, mercado, concorrencia e oportunidades para criar um plano de crescimento claro. Voce sai da sessao com um roadmap pratico e acionavel.",
    benefits: [
      "Clareza sobre proximos passos",
      "Priorizacao de acoes de maior impacto",
      "Analise de concorrencia",
      "Posicionamento definido",
      "Metas e KPIs claros",
      "Plano de acao documentado"
    ],
    features: [
      { title: "Diagnostico Completo", description: "Analise profunda do seu negocio atual" },
      { title: "Pesquisa de Mercado", description: "Entendimento do cenario competitivo" },
      { title: "Definicao de ICP", description: "Perfil ideal de cliente documentado" },
      { title: "Roadmap Estrategico", description: "Plano de acao prioritizado" },
      { title: "KPIs e Metas", description: "Metricas claras para acompanhar" },
      { title: "Follow-up", description: "Acompanhamento da implementacao" }
    ],
    plans: [
      { plano: "Consultoria", valor: "R$697 - R$1.497", inclui: "Diagnostico, posicionamento, plano estrategico e acompanhamento" },
    ],
    faq: [
      { question: "Como funciona a consultoria?", answer: "Reuniao de diagnostico + analise + entrega do plano + follow-up." },
      { question: "Quanto tempo dura?", answer: "O processo completo leva de 1 a 2 semanas." },
      { question: "Voces implementam o plano?", answer: "A implementacao e separada, mas podemos executar tambem." }
    ]
  },
  {
    id: "financeiro",
    slug: "financeiro",
    title: "Gestao Financeira",
    subtitle: "Organize financas para escalar",
    iconName: "DollarSign",
    description: "Organize suas financas para escalar com previsibilidade",
    fullDescription: "Escala sem controle financeiro e receita para desastre. Organizamos suas financas, criamos dashboards de acompanhamento, definimos KPIs financeiros e construimos previsibilidade para voce tomar decisoes baseadas em dados, nao em achismos.",
    benefits: [
      "Visao clara de receitas e despesas",
      "Previsibilidade de fluxo de caixa",
      "KPIs financeiros definidos",
      "Dashboard de acompanhamento",
      "Margem de lucro otimizada",
      "Decisoes baseadas em dados"
    ],
    features: [
      { title: "Diagnostico Financeiro", description: "Raio-X completo da sua situacao atual" },
      { title: "Organizacao de Contas", description: "Categorizacao e controle de entradas/saidas" },
      { title: "Dashboard Financeiro", description: "Visualizacao clara dos numeros" },
      { title: "Projecoes", description: "Previsao de receita e despesas" },
      { title: "KPIs de Negocio", description: "Metricas que realmente importam" },
      { title: "Plano de Acao", description: "Como melhorar seus numeros" }
    ],
    plans: [
      { plano: "Starter", valor: "R$997", inclui: "Organizacao financeira basica + dashboard + KPIs" },
      { plano: "Premium", valor: "R$2.497", inclui: "Estrutura financeira completa + previsibilidade + estrategia de crescimento" },
    ],
    faq: [
      { question: "Voces fazem contabilidade?", answer: "Nao somos contadores. Fazemos gestao financeira estrategica." },
      { question: "Preciso ter um contador?", answer: "Sim, trabalhamos em complemento ao seu contador." },
      { question: "Qual ferramenta usam?", answer: "Adaptamos a sua realidade: planilhas, Notion ou softwares especificos." }
    ]
  },
  {
    id: "saas",
    slug: "saas",
    title: "SaaS / Sistema",
    subtitle: "Sistemas sob medida para sua operacao",
    iconName: "Code",
    description: "Sistemas sob medida para automatizar operacoes complexas",
    fullDescription: "Quando as ferramentas do mercado nao resolvem, construimos a sua. Desenvolvemos sistemas sob medida que automatizam operacoes complexas, integram ferramentas e criam dashboards que voce precisa. Do MVP ao sistema completo, entregamos tecnologia que escala.",
    benefits: [
      "Sistema feito para sua necessidade",
      "Automacao de processos complexos",
      "Integracao com ferramentas existentes",
      "Dashboards personalizados",
      "Escalabilidade garantida",
      "Suporte e manutencao"
    ],
    features: [
      { title: "Desenvolvimento Custom", description: "Codigo feito especificamente para voce" },
      { title: "APIs e Integracoes", description: "Conecte todas suas ferramentas" },
      { title: "Dashboards", description: "Visualize dados que importam" },
      { title: "Automacoes", description: "Elimine trabalho manual repetitivo" },
      { title: "Mobile Responsive", description: "Funciona em qualquer dispositivo" },
      { title: "Suporte Continuo", description: "Manutencao e evolucao do sistema" }
    ],
    plans: [
      { plano: "MVP", valor: "R$3.500+", inclui: "Estrutura inicial de sistema funcional" },
      { plano: "Premium", valor: "R$7.000 - R$25.000+", inclui: "Sistema completo com automacoes, integracoes e dashboards" },
    ],
    faq: [
      { question: "Quanto tempo para desenvolver?", answer: "MVP em 2-4 semanas. Sistemas completos de 1-3 meses." },
      { question: "Qual tecnologia usam?", answer: "Stack moderna: React, Next.js, Node.js, PostgreSQL." },
      { question: "Inclui hospedagem?", answer: "Configuramos tudo, hospedagem e custo separado (geralmente baixo)." }
    ]
  },
  {
    id: "mentoria",
    slug: "mentoria",
    title: "Mentoria",
    subtitle: "Acompanhamento direto para acelerar resultados",
    iconName: "GraduationCap",
    description: "Mentoria individual para acelerar seu crescimento digital",
    fullDescription: "Aprenda diretamente com quem executa. Nossa mentoria e para quem quer dominar trafego, funis, automacao e escala com acompanhamento proximo. Sessoes ao vivo, acesso direto, materiais exclusivos e um plano personalizado para seu momento.",
    benefits: [
      "Acesso direto ao mentor",
      "Plano personalizado para seu negocio",
      "Sessoes ao vivo semanais/quinzenais",
      "Materiais e templates exclusivos",
      "Comunidade de mentorados",
      "Suporte entre sessoes"
    ],
    features: [
      { title: "Diagnostico Inicial", description: "Entendemos sua situacao e objetivos" },
      { title: "Plano de Desenvolvimento", description: "Roadmap personalizado de aprendizado" },
      { title: "Sessoes ao Vivo", description: "Encontros individuais ou em grupo" },
      { title: "Materiais Exclusivos", description: "Templates, checklists e frameworks" },
      { title: "Acesso Direto", description: "WhatsApp para duvidas rapidas" },
      { title: "Comunidade", description: "Rede de empreendedores como voce" }
    ],
    plans: [
      { plano: "Individual", valor: "R$1.997/mes", inclui: "4 sessoes individuais + acesso direto + materiais" },
      { plano: "Grupo", valor: "R$497/mes", inclui: "4 sessoes em grupo + comunidade + materiais" },
      { plano: "VIP", valor: "R$4.997/mes", inclui: "Acompanhamento intensivo + implementacao assistida" },
    ],
    faq: [
      { question: "Qual a duracao da mentoria?", answer: "Minimo de 3 meses para resultados consistentes." },
      { question: "Posso cancelar?", answer: "Sim, sem fidelidade apos o periodo minimo." },
      { question: "E para iniciantes?", answer: "Temos trilhas para todos os niveis." }
    ]
  }
]

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find(service => service.slug === slug)
}

export function getAllServiceSlugs(): string[] {
  return services.map(service => service.slug)
}
