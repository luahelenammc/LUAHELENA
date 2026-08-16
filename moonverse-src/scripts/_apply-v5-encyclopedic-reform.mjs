import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(new URL('..', import.meta.url).pathname);
const dataRoot = path.join(root, 'data');
const v4Root = path.join(root, 'v4');
const readJson = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
const writeJson = (p, value) => fs.writeFileSync(p, JSON.stringify(value, null, 2) + '\n');

const entriesPath = path.join(dataRoot, 'entries.json');
const entries = readJson(entriesPath);
const byId = new Map(entries.map((entry) => [entry.id, entry]));
const today = '2026-08-16';

const reforms = {
  'maresia': {
    title: 'Memórias de praia na infância de Moon',
    type: 'Memória autobiográfica',
    summary: 'Registro autobiográfico sobre viagens ao litoral durante a infância e sobre a associação da maresia com a chegada à praia.',
    lead: 'As viagens ao litoral constituem um dos conjuntos de memórias de infância mais recorrentes no arquivo autobiográfico de Moon. Entre os elementos preservados está a lembrança do cheiro de maresia como sinal antecipado da proximidade da praia.',
    body_markdown: `## Visão geral\n\nAs viagens à praia aparecem no arquivo autobiográfico de Moon como experiências recorrentes da infância. A documentação disponível não constitui uma cronologia completa das viagens, mas registra elementos que se repetem na memória: deslocamentos de carro, expectativa de chegada, contato com o mar e associação entre o litoral, lazer e períodos considerados positivos da infância.\n\n## O cheiro de maresia\n\nUm dos marcadores mais estáveis dessas lembranças é o cheiro de maresia percebido antes da chegada à praia. No relato autobiográfico, esse sinal sensorial funciona como referência espacial: indicava que o litoral estava próximo antes de a praia ser plenamente visível.\n\n## Contexto autobiográfico\n\nAs memórias de praia se relacionam a outros registros sobre infância, tecnologia e cultura doméstica dos anos 2000. O corpus associa essas viagens a câmeras digitais, jogos, CDs e outras tecnologias que faziam parte do cotidiano familiar naquele período. Esses elementos são tratados em verbetes próprios para evitar que uma única memória seja usada como explicação totalizante da infância.\n\n## Uso no Moonverse\n\nNo Moonverse, a memória de praia é classificada como material autobiográfico de baixa sensibilidade. Sua função é documentar um conjunto de experiências sensoriais e culturais preservadas no arquivo, sem reconstruir pessoas, endereços, conflitos familiares ou outras informações privadas relacionadas às viagens.\n\n## Limites documentais\n\nA página descreve lembranças registradas posteriormente e não pretende estabelecer uma sequência exata de todas as viagens realizadas. Interpretações simbólicas sobre água, paraíso ou identidade podem existir em outros arquivos, mas não são apresentadas aqui como fatos históricos.`
  },
  'moon-source': {
    title: 'Moon Source',
    type: 'Método de arquitetura de contexto',
    summary: 'Método desenvolvido por Moon para organizar contexto, memória, autoridade e continuidade em sistemas de colaboração com inteligência artificial.',
    lead: 'Moon Source é um método de arquitetura de contexto desenvolvido por Lua Helena Moon Martins Cardoso para organizar informações persistentes sobre pessoas, projetos e instituições em sistemas de colaboração com inteligência artificial.',
    body_markdown: `## Definição\n\nMoon Source é um método de arquitetura de contexto voltado à organização de informações que precisam permanecer legíveis e atualizáveis ao longo de interações com sistemas de inteligência artificial. O método utiliza arquivos-fonte, índices, registros de atualização, handoffs e superfícies de publicação para diferenciar fatos, interpretações, decisões, limites e material histórico.\n\n## Origem e problema abordado\n\nO método foi desenvolvido a partir do uso intensivo de modelos de linguagem em projetos de longa duração. Seu problema de partida é a perda de continuidade entre sessões e ferramentas, combinada ao risco oposto de acumular grande quantidade de contexto sem hierarquia de autoridade.\n\n## Componentes\n\nEntre os componentes recorrentes estão fontes vivas, ledgers de mudanças, roteamento entre arquivos, distinção entre material ativo e legado, camadas públicas e privadas e handoffs destinados a transferir estado entre ambientes de trabalho. A implementação varia conforme o projeto; o método não pressupõe um único formato técnico.\n\n## Constituição e metabolização\n\nMoon Source distingue duas operações principais. A constituição define entidades, relações, funções e fronteiras. A metabolização incorpora informações novas, atualiza conclusões, registra conflitos de versão e remove ou rebaixa material que deixou de ser autoritativo.\n\n## Publicação e privacidade\n\nO método separa acesso de autorização para publicação. Um arquivo privado pode funcionar como fonte de evidência para uma síntese pública sem que seu conteúdo bruto seja exportado. Essa regra é aplicada no próprio Moonverse, cuja camada pública é mais restrita que o arquivo de origem.\n\n## Escopo\n\nMoon Source é apresentado como método autoral de organização de contexto e conhecimento. A documentação pública não o descreve como treinamento de modelos, infraestrutura proprietária de LLMs ou sistema empresarial de produção quando essas capacidades não foram demonstradas.`
  },
  'sims': {
    title: 'The Sims na infância de Moon',
    type: 'Memória cultural',
    summary: 'Registro sobre o contato de Moon com The Sims e sobre a importância posterior atribuída ao jogo em sua relação com ambientes simulados.',
    lead: 'The Sims foi um dos jogos de computador presentes na infância de Moon e aparece em seus arquivos como referência recorrente de simulação doméstica, construção de casas e experimentação de rotinas.',
    body_markdown: `## Contexto\n\nMoon teve contato com The Sims durante a infância, em um período anterior à presença constante de internet doméstica em sua rotina. O jogo foi apresentado por uma pessoa próxima da família, cuja identidade não é necessária para o registro público.\n\n## Experiência de jogo\n\nAs lembranças preservadas incluem a construção e mobília de casas, administração de recursos e exploração do jogo por tentativa e repetição. Um detalhe recorrente no arquivo é a lembrança de móveis simples das primeiras partidas e da descoberta de que era possível avançar sem depender de códigos de dinheiro.\n\n## Relevância posterior\n\nEm leituras autobiográficas posteriores, Moon passou a relacionar The Sims a seu interesse por ambientes organizáveis e por sistemas em que espaço, objetos e regras alteram possibilidades de ação. Essa associação é retrospectiva e deve ser distinguida do fato histórico de ter jogado e apreciado o título durante a infância.\n\n## Relação com o Moonverse\n\nA arquitetura do Moonverse utiliza salas e objetos como elementos de navegação. A documentação do projeto reconhece The Sims como uma das referências culturais que ajudaram a tornar intuitiva a ideia de organizar informação espacialmente. Isso não significa que o Moonverse seja uma adaptação ou reprodução do jogo.\n\n## Limites\n\nO verbete registra a relação pessoal de Moon com The Sims e não pretende descrever a história geral da franquia, sua recepção crítica ou suas mecânicas de forma exaustiva.`
  },
  'orkut-msn': {
    title: 'Orkut e MSN na adolescência de Moon',
    type: 'Memória de internet',
    summary: 'Registro sobre o uso de Orkut e MSN e sobre o papel dessas plataformas na socialização e expressão online de Moon.',
    lead: 'Orkut e MSN Messenger integraram a experiência de internet de Moon durante a adolescência e aparecem em seu arquivo histórico como plataformas de socialização, escrita informal e apresentação de identidade.',
    body_markdown: `## Contexto\n\nOrkut e MSN Messenger estiveram entre as principais plataformas de comunicação usadas por Moon durante a expansão da internet doméstica nos anos 2000 e início dos anos 2010. Os registros históricos incluem referências a perfis, comunidades, conversas e personalização de presença online.\n\n## Orkut\n\nNo Orkut, a experiência combinava perfil pessoal, participação em comunidades, depoimentos e circulação por redes de conhecidos. O formato permitia que gostos, grupos e descrições de perfil fossem usados como elementos de apresentação pública.\n\n## MSN Messenger\n\nO MSN funcionava principalmente como ambiente de comunicação síncrona. Nome de exibição, mensagens de status, emoticons e janelas individuais de conversa faziam parte da experiência cotidiana. O arquivo privado contém conversas e nomes de terceiros que não são reproduzidos nesta página.\n\n## Importância autobiográfica\n\nEm retrospecto, Moon descreve essas plataformas como uma fase em que a internet era percebida como um espaço social identificável, com interfaces e rituais próprios. A interpretação posterior relaciona esse período ao interesse atual por interfaces, arquivos pessoais e identidade digital.\n\n## Preservação e privacidade\n\nA versão pública elimina contatos, URLs antigas, diálogos privados, nomes de terceiros e situações relacionais. O objetivo é registrar a experiência cultural das plataformas sem transformar o arquivo histórico em exposição de outras pessoas.`
  },
  'infancia-digital': {
    title: 'Tecnologia e cultura digital na infância de Moon',
    type: 'História autobiográfica de tecnologia',
    summary: 'Panorama dos videogames, câmeras digitais, computadores e outras tecnologias presentes na infância de Moon nos anos 2000.',
    lead: 'A infância de Moon coincidiu com a expansão de computadores domésticos, câmeras digitais, emulação de videogames e acesso progressivo à internet no Brasil, elementos que aparecem de forma recorrente em seus registros autobiográficos.',
    body_markdown: `## Contexto geracional\n\nMoon nasceu na segunda metade da década de 1990 e pertence à geração que viveu a transição entre uma infância com conectividade limitada e a difusão de internet doméstica, smartphones e serviços digitais. Seus arquivos registram essa mudança a partir de objetos concretos do cotidiano.\n\n## Videogames e emulação\n\nEntre as referências recorrentes estão jogos de Super Nintendo executados por emuladores, The Sims e RollerCoaster Tycoon. O interesse não se restringia ao consumo de jogos; incluía exploração de interfaces, criação de ambientes e curiosidade sobre as possibilidades dos computadores domésticos.\n\n## Câmera Olympus D395\n\nA câmera digital Olympus D395 ocupa lugar específico nas memórias de infância e viagens. O equipamento é citado como parte do período em que fotografar deixou de depender exclusivamente de filme e passou a permitir visualização e repetição imediatas, alterando a relação cotidiana com registro de imagens.\n\n## Internet e tradução\n\nO arquivo também registra fascínio com ferramentas online e, posteriormente, com o Google Tradutor. Para uma criança brasileira interessada em conteúdos em inglês, a tradução automática representava uma ampliação concreta de acesso a páginas, jogos e referências culturais.\n\n## Continuidade na vida adulta\n\nEm textos posteriores, Moon relaciona esse repertório ao interesse atual por inteligência artificial e sistemas digitais. Essa continuidade é uma interpretação autobiográfica construída na vida adulta; os fatos documentados são o contato recorrente com tecnologias emergentes e o interesse persistente por suas possibilidades.`
  },
  'ecologia-espiritual': {
    title: 'Ecologia espiritual no universo de Moon',
    type: 'Tema intelectual e espiritual',
    summary: 'Síntese do interesse de Moon pelas relações entre espiritualidade, natureza, ética ecológica e formas comunitárias de vida.',
    lead: 'Ecologia espiritual é um dos temas de pesquisa e elaboração autoral presentes no arquivo de Moon, articulando relação com a natureza, espiritualidade, cuidado ambiental e formas de vida comunitária.',
    body_markdown: `## Definição adotada\n\nNo corpus de Moon, ecologia espiritual designa abordagens em que a relação com a natureza possui dimensão ética, existencial ou espiritual, sem exigir adesão a uma tradição religiosa única. O tema é tratado como campo interdisciplinar, distinto de uma doutrina pessoal fechada.\n\n## Pesquisa\n\nO arquivo inclui um artigo de revisão sobre ecologia espiritual no Brasil, com levantamento de livros, artigos, teses e dissertações publicados entre 1990 e 2024. A literatura reunida relaciona ecologia, religiões, espiritualidades contemporâneas, educação ambiental, comunidades tradicionais e práticas de cuidado de si e do ambiente.\n\n## Relação com projetos autorais\n\nO tema também aparece na formulação do Santuário e da Ecorreligião. Nesses projetos, a ecologia não é tratada apenas como estética ou paisagem, mas como requisito de práticas materiais de cuidado, convivência e responsabilidade ambiental.\n\n## Distinções epistemológicas\n\nOs arquivos do projeto estabelecem separação entre fato verificável, experiência espiritual, símbolo, hipótese e linguagem ritual. Essa distinção é usada para evitar que interpretações metafísicas sejam apresentadas como evidências objetivas.\n\n## Escopo público\n\nEsta página descreve o campo de interesse e sua presença na obra de Moon. Não estabelece uma crença obrigatória, não resume a diversidade das religiões ecológicas e não substitui o artigo acadêmico utilizado como fonte.`
  },
  'me-tornando': {
    title: 'Me tornando eu mesma',
    type: 'Obra autobiográfica',
    summary: 'Texto autobiográfico de Moon dedicado à identidade, à transição de gênero e à reconstrução de sua trajetória em primeira pessoa.',
    lead: 'Me tornando eu mesma é uma obra autobiográfica de Lua Helena Moon Martins Cardoso centrada na formação de identidade, na transição de gênero e na releitura de experiências anteriores a partir de sua vida adulta.',
    body_markdown: `## Caracterização\n\nMe tornando eu mesma é um texto autobiográfico em desenvolvimento que organiza memórias, mudanças de identidade e reflexões sobre feminilidade. A obra combina narrativa pessoal e reconstrução retrospectiva, mas não é tratada no Moonverse como prontuário clínico.\n\n## Temas\n\nEntre os temas documentados estão reconhecimento de identidade de gênero, relação entre corpo e linguagem, mudanças de apresentação social, escolha de nome, memória de infância e reinterpretação de experiências anteriores. O texto também discute como lembranças podem adquirir novos significados sem que a interpretação posterior seja confundida com prova histórica absoluta.\n\n## Função no arquivo\n\nA obra funciona como uma das fontes autobiográficas do projeto Sobre a Moon. Trechos podem sustentar verbetes públicos quando o assunto foi autorizado e sanitizado, mas o manuscrito completo não é presumido como material público.\n\n## Relação com o Moonverse\n\nO Moonverse utiliza a obra principalmente para páginas sobre identidade, nome, memória e escrita. Informações médicas, familiares ou referentes a terceiros permanecem fora da superfície pública, salvo quando houver autorização editorial específica.\n\n## Limites\n\nA página descreve a obra e seus temas gerais. Não reproduz nome anterior, detalhes clínicos, documentos pessoais nem cenas privadas que não sejam necessárias para compreender o projeto autobiográfico.`
  },
  'nome-presenca': {
    title: 'Nome e identidade pública de Moon',
    type: 'História de identidade',
    summary: 'Registro sobre a adoção e o uso público do nome Moon no processo de consolidação de identidade e presença social.',
    lead: 'O nome Moon integra a identidade pública de Lua Helena Moon Martins Cardoso e aparece nos arquivos como elemento de reconhecimento social, autoria e continuidade entre projetos.',
    body_markdown: `## Uso do nome\n\nMoon é o nome pelo qual Lua Helena Moon Martins Cardoso prefere ser identificada em seus projetos, redes e arquivos autorais. O nome passou a funcionar como assinatura recorrente e como ponto de continuidade entre produção literária, projetos de inteligência artificial e presença pública.\n\n## Relação com a transição\n\nA consolidação do nome ocorreu no contexto mais amplo de transição de gênero e reconhecimento de identidade. Os arquivos tratam o uso do nome correto como questão de presença social e dignidade, sem exigir a exposição pública do nome anterior.\n\n## Função autoral\n\nAlém do uso pessoal, Moon tornou-se um marcador de autoria. Expressões como Moon Source, Moonverse e Moonpedia derivam dessa assinatura e indicam projetos diferentes dentro de um mesmo ecossistema autoral.\n\n## Documentação e privacidade\n\nO arquivo privado contém informações documentais relacionadas a mudanças de identidade. A página pública não reproduz documentos, números de registro, nome anterior ou informações administrativas desnecessárias.\n\n## Convenção editorial\n\nNo Moonverse, Moon é a forma preferencial de referência à autora. O nome completo é usado apenas quando necessário para identificação bibliográfica, profissional ou institucional.`
  },
  'casa-arca': {
    title: 'Casa-Arca',
    type: 'Projeto de vida',
    summary: 'Conceito de longo prazo que reúne moradia, família, animais, natureza e infraestrutura de cuidado em um único projeto doméstico.',
    lead: 'Casa-Arca é o nome dado por Moon a um projeto de vida de longo prazo centrado em uma residência com espaço, natureza, família escolhida e condições de cuidado multiespécie.',
    body_markdown: `## Origem\n\nO conceito foi consolidado a partir de registros autobiográficos de diferentes períodos. Há documentação anterior à transição consciente sobre desejo de ter filhos e preferência pela adoção, além de textos posteriores sobre casa com jardim, proteção para gatos e criação de uma organização dedicada ao cuidado de animais.\n\n## Componentes\n\nA formulação atual reúne moradia com espaço, área verde, proteção física, convivência com animais, família e divisão de responsabilidades domésticas. Versões mais recentes acrescentam a preferência por um terreno, sítio ou chácara próximo à cidade, desde que a localização mantenha acesso funcional a serviços urbanos.\n\n## Dimensão multiespécie\n\nOs animais ocupam papel central no conceito. O arquivo contém relatos de acolhimento e cuidado de animais vulneráveis e formulações explícitas sobre criação de uma ONG ou estrutura de proteção animal. A Casa-Arca é, portanto, descrita como moradia humana e também como infraestrutura de convivência e cuidado de outros seres vivos.\n\n## Relação com o Santuário\n\nO projeto Santuário foi posteriormente reorganizado para reconhecer a Casa-Arca territorial como sua principal forma material. Elementos simbólicos e espirituais são derivados dessa base concreta, e não usados como substitutos de infraestrutura real.\n\n## Status\n\nCasa-Arca é um projeto de futuro e não uma propriedade já existente. Elementos específicos, como localização, escala, composição familiar e modelo institucional de proteção animal, permanecem em definição.`
  },
  'hecate': {
    title: 'Hécate na arquitetura simbólica de Moon',
    type: 'Símbolo e referência mitológica',
    summary: 'Uso autoral de Hécate como referência para temas de limiar, encruzilhada, estratégia e proteção.',
    lead: 'Hécate é uma das figuras mitológicas recorrentes na arquitetura simbólica de Moon, onde é associada principalmente a limiares, encruzilhadas, antecipação e proteção.',
    body_markdown: `## Presença no arquivo\n\nHécate aparece de forma recorrente nos arquivos de identidade e espiritualidade de Moon. A figura integra um conjunto mais amplo de referências que inclui Afrodite, Lilith, Hermes, Ganesha e Ísis.\n\n## Função simbólica\n\nNa taxonomia autoral, Hécate é relacionada a antecipação de cenários, proteção de fronteiras, estratégia e decisões em situações de encruzilhada. Essa função é utilizada como linguagem de organização psíquica e narrativa, e não como substituto de análise factual.\n\n## Relação com o Santuário\n\nNo Moonverse, a associação com portões e limiares decorre da função simbólica atribuída à figura. O Jardim-Santuário utiliza Hécate como referência visual para fronteiras, entrada e proteção.\n\n## Estatuto epistemológico\n\nOs arquivos distinguem explicitamente símbolo, mito, hipótese espiritual e fato verificável. A presença de Hécate no sistema autoral não implica que interpretações mitológicas sejam apresentadas como evidência objetiva, nem que exista uma doutrina religiosa obrigatória.\n\n## Escopo\n\nEste verbete descreve o uso específico de Hécate no corpus de Moon. Não pretende resumir a história da deusa na religião grega antiga ou as múltiplas formas de culto contemporâneo.`
  },
  'lithia': {
    title: 'Crônicas de Líthia',
    type: 'Projeto literário e universo ficcional',
    summary: 'Projeto de ficção e worldbuilding de Moon ambientado no universo de Líthia.',
    lead: 'Crônicas de Líthia é um projeto literário de Moon baseado em worldbuilding, mitologia ficcional e construção de territórios narrativos.',
    body_markdown: `## Caracterização\n\nCrônicas de Líthia é um projeto de ficção de longa duração que reúne narrativa, worldbuilding, mapas, mitologia própria e desenvolvimento de personagens. O projeto pertence à produção literária de Moon e possui jurisdição distinta dos arquivos autobiográficos.\n\n## Desenvolvimento\n\nO material de Líthia foi produzido em diferentes momentos e formatos. Parte do corpus permanece em desenvolvimento e nem todo elemento criado ao longo do tempo é considerado cânone atual. O arquivo do Moonverse, por isso, publica apenas informações explicitamente selecionadas para a superfície pública.\n\n## Relação com a autobiografia\n\nA obra pode incorporar temas, preocupações ou estruturas imaginativas presentes na vida da autora, mas personagens e acontecimentos ficcionais não são tratados como representações documentais de pessoas ou eventos reais.\n\n## Relação com o Moonverse\n\nNo Moonverse, Líthia ocupa uma sala própria destinada a escrita e mundos autorais. A página funciona como entrada bibliográfica para o projeto, enquanto materiais específicos de lore dependem de revisão de cânone antes de publicação.\n\n## Estado editorial\n\nCrônicas de Líthia permanece um universo em desenvolvimento. A ausência de detalhes nesta página não deve ser interpretada como ausência de material na fonte; indica apenas que a camada pública é deliberadamente mais estreita que o arquivo criativo completo.`
  },
  'lunar-citadel': {
    title: 'Lunar Citadel',
    type: 'Projeto de sistemas de inteligência artificial',
    summary: 'Projeto experimental de Moon dedicado a agentes, memória, governança e arquiteturas de colaboração entre humanos e sistemas de IA.',
    lead: 'Lunar Citadel é um projeto experimental de Lua Helena Moon Martins Cardoso voltado à arquitetura de sistemas multiagente, memória persistente, governança e colaboração entre humanos e inteligência artificial.',
    body_markdown: `## Objetivo\n\nLunar Citadel investiga como agentes e componentes de inteligência artificial podem operar em um ambiente organizado por papéis, memória, regras de governança e estados verificáveis. O projeto combina experimentação técnica com uma linguagem espacial de cidade e instituições.\n\n## Arquitetura\n\nO corpus inclui definições de agentes, protocolos, world state, dispositivos, runtime e mecanismos de preservação. Versões mais recentes também documentam integração com infraestrutura externa, testes de execução e um programa de aproximação com outros projetos de sistemas agentivos.\n\n## Runtime\n\nA Citadel possui uma frente de runtime separada da camada conceitual. Essa frente utiliza repositórios, automação de testes e infraestrutura computacional para verificar partes do sistema. O estado público deve distinguir recursos implementados, protótipos e propostas ainda não concluídas.\n\n## Comunidade\n\nEm 2026 foi criado um servidor privado de Discord para conversas com desenvolvedores e pesquisadores interessados em sistemas adjacentes. A comunidade é tratada como espaço de troca e não como requisito para participação formal no projeto.\n\n## Relação com Moon Source\n\nMoon Source organiza contexto e continuidade; Lunar Citadel funciona como um dos ambientes em que princípios de contexto, memória e governança são aplicados e testados. Os dois projetos são relacionados, mas não equivalentes.`
  },
  'familia-do-futuro': {
    title: 'Projeto de família de Moon',
    type: 'Projeto de vida',
    summary: 'Registro de longo prazo sobre maternidade, adoção, parceria parental e organização doméstica desejada por Moon.',
    lead: 'O projeto de família de Moon reúne um desejo antigo de maternidade, preferência pela adoção e expectativa de uma estrutura doméstica estável com responsabilidades parentais compartilhadas.',
    body_markdown: `## Histórico\n\nRegistros autobiográficos anteriores à transição consciente já documentavam o desejo de ter filhos. A adoção aparece repetidamente como via legítima e, em alguns textos, como preferência. Também há registro antigo de imaginar inicialmente um filho menino, formulação que posteriormente se tornou menos rígida.\n\n## Estrutura familiar\n\nA visão de futuro associa parentalidade a uma casa com espaço, estabilidade material e presença de um parceiro capaz de dividir responsabilidades. O arquivo não trata a maternidade como projeto isolado da organização doméstica e econômica necessária para sustentar uma criança.\n\n## Relação com Casa-Arca\n\nCom o desenvolvimento do conceito de Casa-Arca, a família passou a ser descrita dentro de um ecossistema mais amplo que inclui animais, natureza, proteção do território e infraestrutura de cuidado.\n\n## Interpretações posteriores\n\nArquivos analíticos exploram possíveis relações entre o desejo de maternidade e experiências anteriores de identidade e família. Essas leituras são interpretações psicológicas ou autobiográficas posteriores e não constituem fatos necessários para descrever o projeto de família.\n\n## Status\n\nTrata-se de um projeto de vida futuro. Número de filhos, composição familiar, cronograma e condições materiais permanecem abertos e dependem de circunstâncias reais.`
  },
  'escrita-magia': {
    title: 'Escrita autobiográfica e preservação de memória',
    type: 'Prática autoral',
    summary: 'Papel da escrita na autobiografia, no arquivamento de experiências e na produção de projetos ficcionais de Moon.',
    lead: 'A escrita ocupa função central no arquivo de Moon como instrumento de autobiografia, preservação de memória, organização de experiências e criação de mundos ficcionais.',
    body_markdown: `## Funções da escrita\n\nOs arquivos de Moon atribuem à escrita quatro funções recorrentes: registrar experiências, reorganizar acontecimentos retrospectivamente, preservar memória ao longo do tempo e construir obras ficcionais. Essas funções aparecem em diários, blogs históricos, textos autobiográficos e projetos literários.\n\n## Autobiografia\n\nObras como Me tornando eu mesma e os arquivos 25 de Junho e KAIROS utilizam a escrita para reconstruir períodos da vida e manter registros destinados a consulta futura. O texto autobiográfico é tratado como fonte situada: preserva a perspectiva da autora, mas pode conter lembranças incompletas ou interpretações produzidas posteriormente.\n\n## Arquivo e legado\n\nO corpus registra de forma explícita o desejo de deixar documentação durável sobre experiências, viagens e visões de mundo. A ideia de legado é apresentada como uma das razões para organizar textos e arquivos de longa duração.\n\n## Ficção e worldbuilding\n\nA escrita também sustenta projetos ficcionais, especialmente Crônicas de Líthia. Nesse contexto, o objetivo não é documentar acontecimentos reais, mas construir universos, personagens e mitologias próprias.\n\n## Relação com sistemas de IA\n\nNa vida adulta, a escrita passou a incluir colaboração com modelos de linguagem para organização, edição, prototipagem e manutenção de arquivos. A autoria editorial continua atribuída a Moon; ferramentas de IA são registradas como instrumentos de apoio e coelaboração operacional.`
  }
};

for (const [id, patch] of Object.entries(reforms)) {
  const entry = byId.get(id);
  if (!entry) throw new Error(`Missing existing entry ${id}`);
  Object.assign(entry, patch, {
    editorial_language: 'encyclopedic_ptbr_v1',
    updated: today,
    editorial_state: 'published_v5_encyclopedic_reform',
    reviewed_by_moon: true,
    reviewed_at: today,
    relation_review_state: 'approved_v5_editorial_reform',
    visual_state: 'v4_article_shell_encyclopedic',
    next_action: 'manter linguagem enciclopédica; ampliar apenas com fonte identificada'
  });
}

const newEntries = [
  {
    id: 'moon-profile', slug: 'lua-helena-moon-martins-cardoso', title: 'Lua Helena Moon Martins Cardoso', type: 'Perfil autoral', wing: 'biblioteca-lunar',
    summary: 'Perfil público da autora de Moon Source, Moonverse, Lunar Citadel e Crônicas de Líthia.',
    lead: 'Lua Helena Moon Martins Cardoso, conhecida publicamente como Moon, é uma psicóloga, escritora e criadora brasileira de projetos de arquitetura de contexto, inteligência artificial e ficção.',
    source_authority: 'Sobre a Moon — sMoon_core.py e registro público de projetos',
    source_refs: ['sMoon_core.py', 'True_Moonverse.py', 'Moon Source — arquivos públicos', 'Lunar Citadel — documentação pública'],
    tags: ['Moon','autoria','psicologia','IA','escrita'], life_phase: 'vida adulta', date_label: 'perfil atual',
    body_markdown: `## Perfil\n\nLua Helena Moon Martins Cardoso, conhecida como Moon, é uma psicóloga e escritora brasileira que também desenvolve projetos autorais relacionados a inteligência artificial, organização de conhecimento e sistemas simbólicos. Seu arquivo pessoal e de projetos é organizado no ecossistema Sobre a Moon.\n\n## Formação e atuação\n\nA documentação de identidade registra atuação em psicologia hospitalar e interesse acadêmico em Sociologia. Informações institucionais detalhadas, casos profissionais e dados de pacientes não integram a superfície pública do Moonverse.\n\n## Projetos de inteligência artificial\n\nEntre os principais projetos estão Moon Source, método de arquitetura de contexto, e Lunar Citadel, experimento de sistemas multiagente, memória e governança. Moonverse é a camada web pública utilizada para organizar parte desse ecossistema em forma navegável.\n\n## Produção literária\n\nMoon mantém projetos autobiográficos e ficcionais. Me tornando eu mesma é uma obra autobiográfica sobre identidade e transição; Crônicas de Líthia é um projeto de ficção e worldbuilding.\n\n## Organização do arquivo\n\nO projeto Sobre a Moon separa fatos estáveis, cronologia, relações, sonhos, projetos e interpretações em arquivos diferentes. Essa organização é usada para evitar que leituras provisórias ou material privado sejam automaticamente tratados como biografia pública.\n\n## Nome\n\nMoon é a forma preferencial de referência à autora no ecossistema de projetos. O nome completo é usado nesta página por função identificadora e bibliográfica.`,
    rooms: ['biblioteca-lunar','espelho-dagua'], albums: [], memory: false, era: 'agora'
  },
  {
    id: 'moonverse', slug: 'moonverse', title: 'Moonverse', type: 'Projeto web e arquivo público', wing: 'observatorio-nexus',
    summary: 'Portal web de Moon que organiza documentos públicos em uma casa navegável, Moonpedia, linha do tempo, Atlas e dispositivos de memória.',
    lead: 'Moonverse é um portal web criado por Moon para publicar e organizar uma seleção de documentos autobiográficos, projetos e referências culturais em uma arquitetura navegável.',
    source_authority: 'Sobre a Moon — True_Moonverse.py e repositório LUAHELENA',
    source_refs: ['True_Moonverse.py', 'LUAHELENA / moonverse-src', 'Moonverse V4 Rebirth'],
    tags: ['Moonverse','web','arquivo','Moonpedia','GitHub Pages'], life_phase: 'projeto atual', date_label: 'projeto iniciado em 2026',
    body_markdown: `## Definição\n\nMoonverse é a camada web pública do ecossistema de arquivos de Moon. O projeto combina uma interface espacial, denominada Hall e salas, com uma camada documental denominada Moonpedia.\n\n## Origem\n\nA formulação inicial, registrada em abril de 2026, descrevia um site que funcionasse como palácio mental ou mansão navegável, evitando tanto um portfólio institucional convencional quanto uma wiki sem identidade visual. O Notion foi definido como fonte editorial, enquanto o site teria autonomia de interface.\n\n## Arquitetura\n\nA versão atual possui Hall de Entrada, oito salas, Moonpedia, Linha do Tempo Lunar, Atlas, Álbuns, Máquina Mnésica, busca e páginas individuais de artigos. Os documentos são arquivos HTML estáticos gerados a partir de dados versionados no repositório LUAHELENA.\n\n## Relação com a Moonwiki\n\nA Moonwiki funciona como fonte-mãe privada ou semiprivada. O Moonverse publica apenas versões selecionadas e sanitizadas. A existência de uma página ou registro na Moonwiki não implica publicação automática.\n\n## Evolução\n\nO projeto passou por versões centradas em estrutura de wiki, depois por um redesenho inspirado em ergonomia de leitura do Wikiwand e, em seguida, pelo V4 Rebirth, que restaurou a casa navegável como interface principal sem abandonar os artigos de leitura profunda.\n\n## Tecnologia\n\nO site utiliza HTML, CSS e JavaScript leves, com geração estática e validações automatizadas no GitHub Actions. A arquitetura evita dependências externas obrigatórias para a leitura básica.` ,
    rooms: ['observatorio-nexus','biblioteca-lunar'], albums: [], memory: false, era: 'agora'
  },
  {
    id: 'moonwiki', slug: 'moonwiki', title: 'Moonwiki', type: 'Arquivo editorial privado', wing: 'biblioteca-lunar',
    summary: 'Sistema editorial usado como fonte-mãe para cronologia, verbetes e textos que podem alimentar versões públicas do Moonverse.',
    lead: 'Moonwiki é o arquivo editorial de Moon mantido no Notion e utilizado como uma das fontes de conteúdo para o Moonverse.',
    source_authority: 'Sobre a Moon — True_Moonverse.py e recibo de exportação Moonwiki',
    source_refs: ['True_Moonverse.py — GPT/Notion/GitHub bridge', 'Moonwiki Biography', 'Linha do Tempo Lunar', 'Verbetes do Moonverse'],
    tags: ['Moonwiki','Notion','arquivo','fonte','editorial'], life_phase: 'projeto atual', date_label: 'arquivo ativo',
    body_markdown: `## Função\n\nMoonwiki é um arquivo editorial mantido no Notion para organizar biografia, cronologia, verbetes e textos-base relacionados a Moon e seus projetos. Sua função principal é servir como fonte estruturada de consulta e não como interface pública final.\n\n## Estrutura\n\nO sistema inclui uma base biográfica, uma Linha do Tempo Lunar, uma coleção de Verbetes do Moonverse e Textos Base. Os registros possuem metadados que podem ser usados para classificação e reconciliação de conteúdo.\n\n## Integração com o Moonverse\n\nEm 2026 foi implementada uma ponte de trabalho em que conteúdo da Moonwiki pode ser recuperado por ferramentas de IA, revisado e transformado em artefatos no repositório do Moonverse. A integração é editorial: a fonte é lida e convertida, mas o corpo privado não é publicado automaticamente.\n\n## Política de publicação\n\nO princípio operacional é que exportação não equivale a publicação. Informações médicas, familiares, institucionais, relacionais ou de terceiros podem permanecer disponíveis na fonte privada sem aparecer no site.\n\n## Relação com Moon Source\n\nMoonwiki é uma implementação concreta de arquivo-fonte dentro do ecossistema Moon Source. Ela fornece matéria-prima e metadados; a autoridade de publicação permanece com a revisão editorial de Moon.`,
    rooms: ['biblioteca-lunar'], albums: [], memory: false, era: 'agora'
  },
  {
    id: 'tecnologia-ia', slug: 'tecnologia-e-inteligencia-artificial-na-trajetoria-de-moon', title: 'Tecnologia e inteligência artificial na trajetória de Moon', type: 'História autobiográfica de tecnologia', wing: 'observatorio-nexus',
    summary: 'Continuidade entre o interesse de Moon por tecnologia desde os anos 2000 e seu uso posterior de modelos de linguagem e sistemas de IA.',
    lead: 'O interesse de Moon por tecnologia é documentado desde a infância e adolescência, atravessando videogames, câmeras digitais, internet, smartphones e, na vida adulta, modelos de linguagem.',
    source_authority: 'Sobre a Moon — sMoon_core.py, sonhos.py e arquivo autobiográfico',
    source_refs: ['sMoon_core.py — tecnologia como magia tornando-se arquitetura', '25 de Junho — infância e tecnologia', 'welcometomycutelife BRUTO.txt — smartphones', 'sonhos.py — santuário tecnomágico'],
    tags: ['tecnologia','IA','LLMs','zillennial','internet'], life_phase: 'transversal', date_label: 'anos 2000–2026',
    body_markdown: `## Infância e anos 2000\n\nOs registros de infância incluem câmera digital, emuladores de Super Nintendo, The Sims, RollerCoaster Tycoon, CDs, computador doméstico e acesso progressivo à internet. O conjunto é compatível com uma experiência geracional zillennial marcada pela rápida expansão da tecnologia de consumo.\n\n## Adolescência e smartphones\n\nEm textos de 2012 e 2013, Moon registrou interesse intenso por smartphones, especialmente aparelhos Android e modelos como Samsung Galaxy Ace e Galaxy S II. Também acompanhava o iPhone e especulava sobre tecnologias futuras, incluindo comunicação holográfica.\n\n## Idioma e acesso\n\nO aprendizado de inglês e o uso de ferramentas como Google Tradutor aparecem no arquivo como formas de ampliar acesso à internet e a conteúdos culturais. A tradução automática foi posteriormente lembrada como um exemplo precoce de tecnologia capaz de atravessar uma barreira que antes exigia maior mediação humana.\n\n## Modelos de linguagem\n\nNa vida adulta, Moon passou a utilizar modelos de linguagem não apenas para perguntas pontuais, mas para organizar arquivos, escrever, estruturar projetos, gerar handoffs e manter sistemas de contexto. Esse uso levou ao desenvolvimento de Moon Source e de outros projetos de IA.\n\n## Interpretação autobiográfica\n\nO arquivo atual descreve essa trajetória pela expressão “tecnologia como magia tornando-se arquitetura”. A expressão é uma interpretação autoral: os fatos documentados são a continuidade do interesse por tecnologias emergentes e a ampliação progressiva de seu uso criativo e organizacional.`,
    rooms: ['quarto-nostalgico','observatorio-nexus'], albums: ['album-nostalgico'], memory: true, era: 'transversal'
  },
  {
    id: 'santuario', slug: 'santuario-de-moon', title: 'Santuário de Moon', type: 'Projeto territorial e simbólico', wing: 'jardim-santuario',
    summary: 'Projeto de longo prazo de um território doméstico multiespécie com natureza, proteção, cuidado e extensões espirituais.',
    lead: 'Santuário é um conceito de projeto de vida de Moon cuja formulação atual prioriza uma base territorial concreta: casa com espaço, natureza, proteção e infraestrutura de cuidado multiespécie.',
    source_authority: 'Sobre a Moon — santuário.py e sonhos.py',
    source_refs: ['santuário.py', 'sonhos.py — Casa-Arca, ecologia protetora e santuário tecnomágico'],
    tags: ['Santuário','Casa-Arca','natureza','animais','território'], life_phase: 'futuro', date_label: 'projeto em formulação',
    body_markdown: `## Formulação atual\n\nSantuário é um conceito desenvolvido no projeto Sobre a Moon para organizar um objetivo de longo prazo de moradia e forma de vida. A versão atual estabelece como prioridade um território real, preferencialmente um sítio, chácara ou terreno com espaço e proximidade funcional da cidade.\n\n## Componentes materiais\n\nO projeto inclui casa com espaço, jardim ou natureza viva, borda física segura, infraestrutura para animais e condições de cuidado que não dependam exclusivamente da vigilância permanente de uma única pessoa. A formulação deriva do conceito de Casa-Arca e de registros anteriores sobre proteção animal e vida doméstica.\n\n## Escalas secundárias\n\nOs arquivos também utilizam o termo santuário para um quarto privado de descanso e tecnologia, para regras de acesso afetivo e para experiências de natureza percebidas como espiritualmente significativas. Após revisão conceitual, essas escalas foram classificadas como derivadas da forma territorial principal.\n\n## Relação com a Ecorreligião\n\nA Ecorreligião é tratada como possível exteriorização comunitária e institucional do Santuário, não como definição total do conceito. O Santuário pode existir como projeto doméstico e ecológico independentemente de uma organização religiosa.\n\n## Status\n\nO projeto permanece em formulação. Não existe ainda uma propriedade ou instituição pública correspondente a todas essas características.` ,
    rooms: ['jardim-santuario'], albums: ['atlas-afetivo'], memory: true, era: 'futuro'
  },
  {
    id: 'ecorreligiao', slug: 'ecorreligiao', title: 'Ecorreligião', type: 'Projeto de espiritualidade ecopolítica', wing: 'jardim-santuario',
    summary: 'Projeto autoral em formulação que combina espiritualidade ecológica, rito, comunidade, ética ecossocial e mecanismos anti-culto.',
    lead: 'Ecorreligião é o nome provisório de um projeto de Moon voltado à criação de uma comunidade de espiritualidade ecopolítica com práticas ecológicas, rito e governança explicitamente anti-culto.',
    source_authority: 'Sobre a Moon — ecorreligião.py e pesquisa de ecologia espiritual',
    source_refs: ['ecorreligião.py', 'Ecologia Espiritual no Brasil (artigo)', 'santuário.py'],
    tags: ['ecorreligião','espiritualidade','ecologia','comunidade','anti-culto'], life_phase: 'projeto futuro', date_label: 'projeto em formulação',
    body_markdown: `## Definição\n\nEcorreligião é um projeto em formulação que procura combinar espiritualidade ecológica, ética ecossocial, práticas comunitárias e linguagem ritual. O termo “religião” é tratado nos arquivos como possível interface social e institucional, enquanto a descrição interna mais frequente é espiritualidade ecopolítica.\n\n## Princípios\n\nAs regras registradas incluem ausência de autoridade infalível, recusa a revelação fechada, separação entre símbolo e fato, liberdade interpretativa, prática ecológica concreta e mecanismos contra culto de personalidade. O projeto não define uma escritura inquestionável nem uma metafísica obrigatória.\n\n## Desenvolvimento previsto\n\nA sequência de desenvolvimento proposta começa por um santuário mínimo, com carta de princípios, simbologia, rito e calendário reduzidos. Uma fase posterior dependeria da existência de participantes reais, encontros regulares e práticas ecológicas verificáveis antes de qualquer formalização institucional.\n\n## Referências comparativas\n\nA pesquisa interna mapeou iniciativas como Findhorn Foundation, Reclaiming, Earth Activist Training, GreenFaith e ecovilas brasileiras. Elas são utilizadas como casos comparativos de governança, comunidade, ritual e ecologia, sem serem tratadas como modelos a copiar integralmente.\n\n## Relação com o Santuário\n\nO Santuário é a base territorial e doméstica mais ampla. A Ecorreligião representa apenas uma possibilidade de expansão coletiva e institucional dessa base.\n\n## Status\n\nNão há organização religiosa formal criada. O projeto permanece conceitual e experimental.` ,
    rooms: ['jardim-santuario'], albums: [], memory: false, era: 'futuro'
  },
  {
    id: 'story-scanner', slug: 'story-scanner', title: 'Story Scanner', type: 'Método de análise de mídia social', wing: 'observatorio-nexus',
    summary: 'Método criado por Moon para analisar conjuntos de Instagram Stories separando observação, sequência, inferência e risco de sobreinterpretação.',
    lead: 'Story Scanner é um protocolo de análise de Instagram Stories criado no projeto Sobre a Moon para estudar padrões de autoapresentação sem tratar interpretações como fatos.',
    source_authority: 'Sobre a Moon — story_scanner.py',
    source_refs: ['story_scanner.py'],
    tags: ['Story Scanner','Instagram','mídia social','análise','método'], life_phase: 'projeto atual', date_label: 'criado em 2026',
    body_markdown: `## Objetivo\n\nStory Scanner é um método para analisar conjuntos de Instagram Stories como unidades de autoapresentação pública. O protocolo considera conteúdo visível, texto, ordem da sequência, contrastes e recorrências ao longo do tempo.\n\n## Unidade de análise\n\nA unidade principal é o story_set_do_dia, e não apenas um story isolado. A sequência é analisada porque a combinação entre conteúdos pode comunicar algo diferente de cada item considerado separadamente.\n\n## Camadas\n\nO protocolo separa fatos visíveis, lógica da sequência, sinais conscientes, inferências plausíveis, leitura de públicos, imagem transmitida, mudanças de padrão e risco de sobreinterpretação. As inferências recebem níveis de confiança e não são convertidas automaticamente em características estáveis da pessoa.\n\n## Limites\n\nO método não pressupõe acesso contínuo à conta de Instagram. No fluxo atual, a análise depende do envio de capturas ou gravações brutas. Também proíbe tratar ausência de evidência como evidência e recomenda que padrões estáveis só sejam exportados para arquivos de identidade após repetição suficiente.\n\n## Papel no ecossistema\n\nStory Scanner funciona como engine e log. Leituras cotidianas permanecem no próprio arquivo; apenas deltas considerados estáveis podem alimentar arquivos de identidade, cronologia ou relações.` ,
    rooms: ['observatorio-nexus'], albums: [], memory: false, era: 'agora'
  },
  {
    id: 'arquitetura-simbolica', slug: 'arquitetura-simbolica-de-moon', title: 'Arquitetura simbólica de Moon', type: 'Sistema simbólico autoral', wing: 'jardim-santuario',
    summary: 'Conjunto de figuras mitológicas e símbolos recorrentes usados por Moon como linguagem de interpretação e organização pessoal.',
    lead: 'A arquitetura simbólica de Moon é um sistema autoral de referências mitológicas, imagens e motivos recorrentes utilizado como linguagem de interpretação, criação e tomada de decisão.',
    source_authority: 'Sobre a Moon — sMoon_core.py e arquivos de espiritualidade',
    source_refs: ['sMoon_core.py — SYMBOLIC_ARCHITECTURE', 'santuário.py', 'ecorreligião.py'],
    tags: ['símbolos','Hécate','Afrodite','Lilith','mitologia'], life_phase: 'transversal', date_label: 'sistema autoral ativo',
    body_markdown: `## Composição\n\nO arquivo de identidade de Moon registra como figuras simbólicas recorrentes Hécate, Afrodite, Lilith, Hermes, Ganesha e Ísis. Também aparecem motivos como lua, água, mar, espelhos, portais, gatos, tecnologia e escrita.\n\n## Função\n\nEsses elementos são usados para organizar interpretações, escolhas estéticas e narrativas pessoais. Hécate é associada a limiar e estratégia; Afrodite a desejo, beleza e ternura; Lilith a insubmissão e soberania. Outras figuras possuem funções mais situacionais conforme o arquivo em que aparecem.\n\n## Natureza do sistema\n\nA arquitetura simbólica não é registrada como doutrina religiosa fechada. Os próprios arquivos a descrevem como linguagem estruturante e estabelecem que arquétipos não devem ser tratados como dogmas ou como prova objetiva sobre acontecimentos.\n\n## Relação com projetos\n\nA simbologia influencia a estética do Moonverse, o desenvolvimento do Santuário e alguns projetos literários. Também fornece vocabulário para organizar temas de identidade, proteção, criação e transição entre fases.\n\n## Limites epistemológicos\n\nO sistema distingue uso simbólico de afirmação factual. Quando uma figura mitológica é usada para interpretar uma decisão ou período de vida, a relação é apresentada como construção autoral e não como causalidade demonstrada.` ,
    rooms: ['jardim-santuario','atelie-de-lithia'], albums: [], memory: false, era: 'transversal'
  }
];

for (const spec of newEntries) {
  if (byId.has(spec.id)) continue;
  const { rooms, albums, memory, era, ...entry } = spec;
  entries.push({
    ...entry,
    status: 'published',
    editorial_state: 'published_v5_source_mined',
    privacy: 'sanitized_approved',
    publication_approved: true,
    source_kind: 'authored_synthesis',
    sensitivity: 'public_sanitized',
    sanitization_required: true,
    sanitization_notes: 'Síntese pública construída a partir de arquivos do projeto; exclui material clínico, familiar, institucional, sexual, documental e dados de terceiros sem necessidade editorial.',
    publication_rationale: 'Novo verbete autorizado por Moon em 2026-08-16 durante expansão enciclopédica do Moonverse.',
    reviewed_by_moon: true,
    reviewed_at: today,
    relation_review_state: 'approved_v5_source_mining',
    visual_state: 'v4_article_shell_encyclopedic',
    next_action: 'manter linguagem enciclopédica; ampliar apenas com fonte identificada',
    editorial_language: 'encyclopedic_ptbr_v1',
    published: today,
    updated: today,
    relations: []
  });
  spec._projection = { rooms, albums, memory, era };
}

writeJson(entriesPath, entries);

const publicPagesPath = path.join(v4Root, 'public-pages.json');
const publicPages = readJson(publicPagesPath);
const existingPageById = new Map(publicPages.pages.map((page) => [page.id, page]));
const projectionDefaults = {
  'maresia': ['biblioteca-lunar','jardim-santuario'], 'moon-source': ['observatorio-nexus'], 'sims': ['quarto-nostalgico'],
  'orkut-msn': ['quarto-nostalgico','cinema-musica'], 'infancia-digital': ['quarto-nostalgico','biblioteca-lunar'],
  'ecologia-espiritual': ['jardim-santuario'], 'me-tornando': ['espelho-dagua','biblioteca-lunar'], 'nome-presenca': ['espelho-dagua'],
  'casa-arca': ['jardim-santuario'], 'hecate': ['jardim-santuario'], 'lithia': ['atelie-de-lithia'], 'lunar-citadel': ['observatorio-nexus'],
  'familia-do-futuro': ['jardim-santuario','biblioteca-lunar'], 'escrita-magia': ['atelie-de-lithia','biblioteca-lunar']
};
const newProjection = Object.fromEntries(newEntries.map((e) => [e.id, e._projection]));
const pageRecords = entries.filter((e) => e.status === 'published' && e.publication_approved === true && ['public','sanitized_approved'].includes(e.privacy)).map((e) => {
  const old = existingPageById.get(e.id);
  const proj = newProjection[e.id] || {};
  return {
    id: e.id,
    title: e.title,
    url: `/moonverse/entry/${e.slug}/`,
    summary: e.summary,
    source_record_ids: old?.source_record_ids || [],
    rooms: proj.rooms || old?.rooms || projectionDefaults[e.id] || [e.wing],
    albums: proj.albums || old?.albums || [],
    memory: proj.memory ?? old?.memory ?? false,
    tags: e.tags || [],
    era: proj.era || old?.era || e.life_phase || 'agora'
  };
});
writeJson(publicPagesPath, { version: '5.0.0-encyclopedic', pages: pageRecords });

const roomsPath = path.join(v4Root, 'rooms.json');
const roomData = readJson(roomsPath);
const addObject = (roomId, object) => {
  const room = roomData.rooms.find((r) => r.id === roomId);
  if (room && !room.objects.some((o) => o.href === object.href)) room.objects.push(object);
};
addObject('biblioteca-lunar',{kind:'portrait',label:'Perfil de Moon',href:'/moonverse/entry/lua-helena-moon-martins-cardoso/',note:'Perfil autoral e mapa dos principais projetos.'});
addObject('biblioteca-lunar',{kind:'archive',label:'Moonwiki',href:'/moonverse/entry/moonwiki/',note:'A fonte editorial por trás de parte da casa.'});
addObject('quarto-nostalgico',{kind:'signal',label:'Da tecnologia à IA',href:'/moonverse/entry/tecnologia-e-inteligencia-artificial-na-trajetoria-de-moon/',note:'Tecnologia dos anos 2000, smartphones e LLMs.'});
addObject('observatorio-nexus',{kind:'site',label:'Moonverse',href:'/moonverse/entry/moonverse/',note:'Arquitetura e história do próprio portal.'});
addObject('observatorio-nexus',{kind:'scanner',label:'Story Scanner',href:'/moonverse/entry/story-scanner/',note:'Método para analisar autoapresentação efêmera.'});
addObject('jardim-santuario',{kind:'land',label:'Santuário',href:'/moonverse/entry/santuario-de-moon/',note:'Projeto territorial, ecológico e multiespécie.'});
addObject('jardim-santuario',{kind:'circle',label:'Ecorreligião',href:'/moonverse/entry/ecorreligiao/',note:'Espiritualidade ecopolítica em formulação.'});
addObject('jardim-santuario',{kind:'symbols',label:'Arquitetura simbólica',href:'/moonverse/entry/arquitetura-simbolica-de-moon/',note:'Figuras e símbolos como linguagem autoral.'});
roomData.version = '5.0.0-encyclopedic';
writeJson(roomsPath, roomData);

const ledgerPath = path.join(dataRoot, 'migration-ledger.json');
const ledger = readJson(ledgerPath);
ledger.summary.public_entries_built = pageRecords.length;
writeJson(ledgerPath, ledger);

const buildV4Path = path.join(v4Root, 'build-v4.mjs');
let buildV4 = fs.readFileSync(buildV4Path, 'utf8');
const groupStart = buildV4.indexOf('const wikiGroups = [');
const groupEnd = buildV4.indexOf('];', groupStart) + 2;
if (groupStart < 0 || groupEnd < 2) throw new Error('wikiGroups block not found');
const newGroups = `const wikiGroups = [\n ['Sobre Moon',['moon-profile','me-tornando','nome-presenca','escrita-magia']],\n ['Memória & tecnologia',['maresia','sims','orkut-msn','infancia-digital','tecnologia-ia']],\n ['Natureza, espiritualidade & futuro',['ecologia-espiritual','casa-arca','santuario','ecorreligiao','hecate','arquitetura-simbolica','familia-do-futuro']],\n ['IA, arquivo & mundos autorais',['moon-source','moonwiki','moonverse','lunar-citadel','story-scanner','lithia']]\n];`;
buildV4 = buildV4.slice(0, groupStart) + newGroups + buildV4.slice(groupEnd);
fs.writeFileSync(buildV4Path, buildV4);

const validateV4Path = path.join(v4Root, 'validate-v4.mjs');
let validateV4 = fs.readFileSync(validateV4Path, 'utf8');
validateV4 = validateV4.replace("assert(pages.length===14,'V4 must reconcile all 14 approved V3 documents');", "const searchIndex=JSON.parse(fs.readFileSync(path.join(siteRoot,'assets','search-index.json'),'utf8'));assert(pages.length===searchIndex.length,`V4 public-pages must reconcile search index (${pages.length}/${searchIndex.length})`);assert(pages.length>=14,'V4 cannot regress below the previously approved public corpus');");
validateV4 = validateV4.replace('14 public documents', '${pages.length} public documents');
fs.writeFileSync(validateV4Path, validateV4);

const styleStandard = `# Moonpedia — Padrão Editorial Enciclopédico v1\n\n## Regra principal\n\nOs artigos da Moonpedia são verbetes enciclopédicos em português brasileiro. A linguagem padrão é descritiva, factual e atribuída; não é diário, manifesto, poema ou ensaio lírico.\n\n## Lead\n\nO primeiro parágrafo identifica o assunto e responde, quando aplicável, o que é, quem criou, qual a função e em que contexto existe. O lead evita perguntas retóricas, suspense e metáforas usadas como definição.\n\n## Corpo\n\n- usar terceira pessoa;\n- separar fatos documentados de interpretações posteriores;\n- preferir seções como Definição, Histórico, Componentes, Desenvolvimento, Relações, Status e Limites;\n- usar datas, nomes de projetos e estados de implementação quando sustentados pela fonte;\n- explicitar quando algo é projeto futuro, hipótese, leitura simbólica ou material em desenvolvimento;\n- não preencher lacunas com lore, psicologização ou inferência;\n- preservar privacidade de terceiros e material clínico/institucional.\n\n## Proibições editoriais\n\n- blockquotes usados como frase de efeito;\n- primeira pessoa no corpo do verbete;\n- frases que transformem metáfora em fato;\n- conclusão moralizante;\n- linguagem promocional sobre projetos;\n- alegações técnicas além do que a documentação demonstra.\n\n## Exceções\n\nTítulos de obras e nomes autorais podem ser poéticos. O artigo que os descreve continua enciclopédico. Citações curtas só entram quando forem documentalmente necessárias e atribuídas.\n`;
fs.writeFileSync(path.join(root, 'EDITORIAL_STANDARD.md'), styleStandard);

const styleValidator = `import fs from 'node:fs';\nimport path from 'node:path';\nconst root=path.resolve(new URL('..',import.meta.url).pathname);\nconst entries=JSON.parse(fs.readFileSync(path.join(root,'data','entries.json'),'utf8'));\nconst publicEntries=entries.filter(e=>e.status==='published'&&e.publication_approved===true&&['public','sanitized_approved'].includes(e.privacy));\nconst errors=[];\nfor(const e of publicEntries){\n if(e.editorial_language!=='encyclopedic_ptbr_v1')errors.push(e.id+' lacks encyclopedic editorial language stamp');\n if(!/^## /m.test(e.body_markdown)||((e.body_markdown.match(/^## /gm)||[]).length<3))errors.push(e.id+' needs at least three encyclopedic sections');\n if(/(^|\\n)>\\s/m.test(e.body_markdown))errors.push(e.id+' contains literary blockquote');\n if(/\\b(eu|meu|minha|meus|minhas)\\b/i.test(e.body_markdown))errors.push(e.id+' uses first-person singular in article body');\n if(/[?]$/.test((e.lead||'').trim()))errors.push(e.id+' uses rhetorical-question lead');\n if(!e.lead||e.lead.length<70)errors.push(e.id+' lead is too short to be definitional');\n}\nif(errors.length){console.error('Moonpedia editorial validation failed:');errors.forEach(e=>console.error('- '+e));process.exit(1)}\nconsole.log('Moonpedia editorial validation passed: '+publicEntries.length+' encyclopedic public articles.');\n`;
fs.writeFileSync(path.join(root, 'scripts', 'validate-editorial-style.mjs'), styleValidator);

const packagePath = path.join(root, 'package.json');
const pkg = readJson(packagePath);
if (!pkg.scripts.validate.includes('validate-editorial-style.mjs')) pkg.scripts.validate += ' && node scripts/validate-editorial-style.mjs';
pkg.version = '5.0.0-encyclopedic';
writeJson(packagePath, pkg);

console.log(`Applied V5 encyclopedic reform: ${Object.keys(reforms).length} rewritten + ${newEntries.length} new = ${entries.length} entries.`);
