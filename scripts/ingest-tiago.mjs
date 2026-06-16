const text = `1. O "Segundo Cérebro" e a Gestão do Conhecimento Pessoal (PKM) O conceito central que permeia os materiais é o "Segundo Cérebro", um método criado por Tiago Forte. A ideia é transferir a carga de lembrar informações da sua mente biológica para um sistema digital externo, liberando seu cérebro para a criatividade e inovação. O Método C.O.D.E.: O processo de construção desse sistema se divide em quatro passos: Capturar o que ressoa com você, Organizar para ações futuras, Destilar (encontrar a essência da informação) e Expressar (compartilhar o seu melhor trabalho). A Origem - O Método Zettelkasten: Este sistema moderno é fortemente inspirado no Zettelkasten (criado por Niklas Luhmann), que se baseia em "notas atômicas" (uma ideia por nota) com identificadores únicos. Em vez de pastas hierárquicas rígidas, o conhecimento cresce organicamente através de conexões e links explícitos entre os pensamentos.

2. A Evolução: O Segundo Cérebro de IA Com o avanço da tecnologia, o "Segundo Cérebro" está sendo potencializado pela Inteligência Artificial. Contexto Pessoal: Tiago Forte destaca que os melhores resultados da IA não vêm de ferramentas melhores, mas de melhor contexto. A habilidade fundamental agora é o Personal Context Management (Gerenciamento de Contexto Pessoal) — fornecer à IA seus padrões, arquivos e forma de pensar para que ela atue como uma colaboradora criativa, e não como um simples chatbot. IA e Fluxos de Trabalho: No ambiente corporativo, plataformas de IA (como o Supernormal) atuam como "segundos cérebros" em reuniões, fazendo transcrições automáticas, anotações inteligentes e monitoramento de tarefas. Para obter ganho real de produtividade, a IA não deve ser aplicada apenas a tarefas isoladas, mas sim a "cadeias de tarefas" completas, reconfigurando a eficiência e os fluxos organizacionais do início ao fim. Estratégia Institucional: Organizações como o Tribunal de Contas Europeu já estão adotando essas tecnologias ativamente, priorizando ter dados padronizados e "prontos para IA" (AI-ready), automatizando processos de auditoria e investindo na alfabetização em IA de seus funcionários de forma ética e segura.

3. Construção de um Negócio Digital de Sucesso A partir da sua expertise, Tiago Forte construiu um negócio que fatura mais de $1 milhão por ano. Construção de Audiência e E-mail: O crescimento começa com a construção de uma lista de e-mails em plataformas onde o criador tem total controle sobre sua audiência, evitando a dependência de algoritmos ou plataformas de terceiros. O envio em horários consistentes e a vulnerabilidade de falar sobre a vida pessoal e outras paixões criam conexões humanas e seguidores fiéis em longo prazo. O uso de link triggers (gatilhos de links) permite segmentar a audiência automaticamente de acordo com seus interesses. Cursos Baseados em Turmas (Cohort-Based Courses): A principal via de monetização são os cursos focados em interação ao vivo e comunidade, que geram maior retenção, senso de responsabilidade e impacto. Por serem altamente interativos e premium, podem ser vendidos por valores muito mais altos (ex: $1.500 a $5.000) com um número menor de alunos.

4. A Escala: O "Criador de um Bilhão de Dólares" (Billion Dollar Creator) Para escalar negócios de $2 milhões para faixas de $10 milhões a $100 milhões por ano, as estratégias mudam radicalmente: Além da Marca Pessoal: É necessário construir um valor empresarial real e vendável que não dependa unicamente da figura do criador, vendendo produtos (ou softwares) e não apenas atenção. Receita Recorrente: Diferente da dinâmica exaustiva de grandes "lançamentos", a escala real exige compras repetidas ou receitas recorrentes. No mercado de educação e expertise, isso é atingido criando comunidades pagas ou ecossistemas de certificação para formar coaches e implementadores credenciados em sua metodologia.

5. Estruturação de Consultorias Para profissionais e pequenas e médias empresas (PMEs) que desejam focar em vender expertise "B2B", o modelo de consultoria foca na estratégia (o "quê" e o "porquê") e na transformação e resultados gerados, não em vender apenas horas de trabalho. Esse modelo exige a criação de autoridade, um Escopo de Trabalho (SOW) extremamente rigoroso para proteger o projeto e modelos de precificação fixos ou baseados no valor entregue ao cliente`;

async function ingest() {
  console.log("Iniciando ingestão do texto...");
  const res = await fetch('http://localhost:3000/api/brain/ingest', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });
  
  if (!res.ok) {
    const errorText = await res.text();
    console.error("ERRO:", res.status, errorText);
  } else {
    const data = await res.json();
    console.log("SUCESSO:", data);
  }
}

ingest();
