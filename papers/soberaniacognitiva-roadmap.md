# PR-007 | Soberania Cognitiva Brasileira — roteiro de pesquisa e implementação

## Postflight público v1.3.0 · 30/10/2026 (checkpoint soberano mais recente)
PR #81 fundido em squash: commit `784e7e5ef44a0e328da237ac8447b5e4ec0532dc`. GitHub main contém v1.3.0 no HTML e resumo. GitHub Pages na URL pública do paper retornou em leitura GET 80945 bytes, 4 referências à v1.3.0 e zero à v1.2.1; o resumo público retornou 4035 bytes, v1.3.0 e PL 2338/2023 presentes. A propagação inicialmente serviu a edição anterior, mas a resposta posterior confirmou a atual. **PUBLIC_V1.3.0_LIVE**. As evidências de QA de navegador estão em [QA de release](./soberaniacognitiva-qa-release-2026-10-30.md). Sem alegação de leitor de tela real ou certificação WCAG.
Sete rascunhos Gmail foram atualizados em lugar com URL da v1.3.0 e [nota externa pública](./soberaniacognitiva-circulacao-nota-2026-10-30.md), todos confirmados DRAFT; nenhum email/formulário enviado. CPQD tem formulário oficial, não e-mail técnico comprovado. Somente autorização nominal de Moon por destinatário permite remessa. A continuidade de pesquisas G3/G4 não bloqueia o artigo exploratório nem autoriza alegações de validação institucional.


## Checkpoint PR-007 v1.3.0, 30/10/2026 (mais recente)
A branch de integração preserva a main e Beacon. O paper e o resumo estão alinhados com a versão 1.3.0. O teste Chromium 156, a impressão A4 de 19 páginas e o controle dos casos de contraste encontram-se em soberaniacognitiva-qa-release-2026-10-30.md. Ausência de leitor de tela real está registrada e não permite alegações de certificação. Entradas antigas referentes ao bloqueio da candidata anterior são históricas e não descrevem este checkpoint. Antes de considerar a publicação concluída, é obrigatório verificar o site ao vivo após merge. Outreach permanece sem envio, com autorização nominal por destinatário. O histórico acadêmico e legal é acompanhado sem alegações de validação institucional.

**Patch:** 2026-10-29 · **natureza:** planejamento longitudinal público, sujeito a revisão factual.  
**Artefato:** [Soberania Cognitiva Brasileira](https://www.luahelena.com.br/papers/soberaniacognitiva.html) · [direção visual](./soberaniacognitiva-design.md).  
**Autoria:** Lua Helena Moon Martins Cardoso.  
**Estado:** paper independente publicado; pesquisa e contatos institucionais em preparação. Sem parceria, adoção, endosso, oficina implementada ou envio federal do PR-007 confirmado. Este roteiro não é uma proposta oficial de gabinete nem documento governamental.

## Decisão estratégica

A matriz de oito capacidades (**hospedar, auditar, adaptar, operar, contestar, substituir, aprender, socializar retorno**) permanece o núcleo. Nossa contribuição mais defensável não é o uso isolado de escala 0–3, mensuração ou auditoria: instrumentos públicos brasileiros já incluem essas ideias. Investigar e testar o valor incremental da combinação de **governabilidade institucional, contestabilidade humana, memória/aprendizagem e distribuição do retorno social**, com **falhas críticas não compensáveis por média**.

Não alegar que a metodologia do Serpro seja cópia, derivação, validação ou adoção da matriz Moon. Também não alegar exclusividade intelectual sobre soberania, auditoria, reversibilidade, software livre, avaliação ou princípios existentes. Comparar objetivos, operacionalização, limites e evidências antes de reivindicar novidade.

## Anterioridade e mapa regulatório: pontos de partida

1. **Gradiente de Soberania Serpro**, framework público com 15 critérios em três pilares, dados (30%), operação (40%) e tecnologia (30%), notas 0–3 e índice ponderado. É avaliação de stack, não necessariamente de todos os direitos de usuários ou da organização pública. Fazer comparação **critério a critério e caso a caso**, sem equivalência simplista; verificar gates próprios do Serpro, não supor que a média permite qualquer carga crítica. Fonte: https://soberania.serpro.gov.br/pt-br/ ; https://soberania.serpro.gov.br/pt-br/avaliador/
2. **Estratégia Nacional de Governo Digital 2024–2027**, revisão Portaria SGD/MGI 5.395 de 01/07/2026. **5.5** governança de IA proporcional ao risco e autoavaliação; **6.6** guias, padrões e referências para IA no serviço público; **9.4** transparência de finalidade, funcionamento e impacto. Testar uma ficha de aderência, sem insinuar delegação formal ou lacuna normativa automática. Fontes: https://www.gov.br/governodigital/pt-br/estrategias-e-governanca-digital/estrategianacional/revisao_engd_2026 ; https://www.gov.br/governodigital/pt-br/estrategias-e-governanca-digital/estrategianacional/objetivo-05 ; https://www.gov.br/governodigital/pt-br/estrategias-e-governanca-digital/estrategianacional/objetivo-06/objetivo-06-capa ; https://www.gov.br/governodigital/pt-br/estrategias-e-governanca-digital/estrategianacional/objetivo-09
3. **Sâmia Bomfim / PEC da Soberania Digital Nacional.** Noticiada em 28/10/2026; manifestação da deputada menciona coleta de assinaturas. Imprensa descreveu protocolo, mas **número e texto integral oficial não foram confirmados no checkpoint de 29/10**. Não escrever que a PEC já tramita sob número específico sem fonte oficial posterior. Obter texto, fase, legitimidade e forma de contribuição antes de elaborar sugestões de dispositivo. Notícia: https://www1.folha.uol.com.br/colunas/monicabergamo/2026/10/samia-bomfim-protocola-pec-para-garantir-soberania-digital-nacional.shtml
4. **REQ 41/2026 CMADS**, apresentado por Sâmia em 30/04, aprovado em 13/05 para seminário sobre impactos socioambientais de data centers e soberania, com Idec e LAPIN incluídos. **Aprovação não comprova a realização do seminário.** Fonte: https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=2620527
5. **Legislação correlata**, a avaliar por texto e tramitação: PL 4218/2025 (Política Nacional de Soberania Digital); PL 4364/2026 (nuvem em contratação pública, apensado); PL 6352/2025 (estatais de tecnologia); PL 2338/2023 (IA). Fontes: https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=2552522 ; https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=2641048 ; https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=2595907 ; https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=2487262
6. **MGI, MCTI/PBIA, Serpro, CPQD/INSPIRE, Dataprev, Nuvem Brasileira e Ministério da Saúde**: mapear competências, cronogramas, documentos oficiais e janelas públicas para contribuir. Não confundir anúncio, escuta, edital, contratação, entrega e adoção.
7. **Idec, LAPIN e literatura socioambiental**: estudar água, energia, licenciamento, justiça territorial, trabalho e transparência. Separar métricas propostas de dados efetivamente medidos.
8. **RIC 1688/2026 de Sâmia**, relativo à saúde digital e com resposta encaminhada em 04/08/2026, é caso adicional a examinar, não prova de relação direta com o PR-007: https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=2630018

## Protocolo bibliográfico

- Corpus acadêmico: SciELO, OpenAlex, Crossref, Google Scholar como descoberta auxiliar, publicações revisadas por pares; fontes normativas/administrativas: Câmara, Senado, Planalto, Diário Oficial, gov.br, Serpro, empresas estatais e institutos. Separar fontes primárias, técnicas, acadêmicas, jornalísticas e advocacy.
- Registrar cada item com **ID, título, autor/instituição, ano, URL/DOI, data de acesso, tipo de evidência, escopo, posição, nível de confiança e implicação para nossa tese**.
- Consultas PT/EN: soberania digital; autonomia tecnológica; AI sovereignty; digital public infrastructure; public sector AI audit; algorithmic contestability; exit/portability; procurement lock-in; environmental impacts data centers; institutional learning.
- Documentar strings/bases/datas de consulta, deduplicação, critérios de inclusão/exclusão e cobertura temporal. Não usar “revisão completa” para insinuar exaustividade impossível; objetivo é uma revisão abrangente e reprodutível.
- Construir uma **matriz de reivindicações de originalidade**: pré-existente, adaptação, síntese independente, contribuição candidata a nova e ponto ainda sem validação. Afirmações de originalidade exigem comparação, não apenas convicção.

## Três linhas de produto

**A. Legislativo / participação pública:** nota de 1–2 páginas sobre requisitos operacionais de transparência, contestação humana, revisão e reparação, portabilidade, registros verificáveis, continuidade, participação e impacto socioambiental. Primeiro localizar texto oficial da PEC, depois distinguir o que é constitucional, legal, regulamentar ou operacional; submeter a revisão jurídica externa quando necessário. Rota Sâmia + Mariana como possíveis destinatários de **leitura crítica e roteamento**, nunca como apoiadoras presumidas.

**B. Executivo / governança:** quadro cruzado Serpro × matriz Moon, instrumento ilustrativo aplicado a ENGD 5.5/6.6/9.4, perguntas de compras e contratos, simulação de saída e retenção de memória fora do fornecedor. Solicitar análise técnica de unidade competente; a oficina de 90 min é **proposta**, não executada.

**C. Território, saúde e retorno social:** quadro de contrapartidas/indicadores de energia, água, trabalhadores, formação, acesso e impactos; hipótese de caso documental para continuidade em infraestrutura pública de saúde. Não acessar dados pessoais ou operacionais sem autoridade e base legal; não prometer engenharia, avaliação clínica, licenciamento ou parecer jurídico.

## Auditoria editorial e de design

**Preservar** a carta cívica operacional e atlas de capacidades, tipografia editorial, navegação lateral, matriz em oito `details`, HTML leve sem dependência externa, acessibilidade e impressão. Evitar redesign genérico, marketing de produto, pictogramas decorativos, animação gratuita e perda da voz original.

**Melhorar na v1.3 planejada:**
- Exemplo demonstrativo de decisão antes de mergulhar no método; leitura inicial em dois minutos.
- Três profundidades: **apresentação / instrumento / dossiê**; entradas por finalidade (parlamento, gestão, pesquisa, cidadania), sem clonar quatro páginas.
- Ficha de avaliação preenchida com **caso expressamente fictício**; destacar veto de falhas críticas sem certificação improvisada; não apresentar calculadora como validador normativo.
- Comparação documentada com instrumentos existentes; seção “o que já existe / o que acrescentamos / o que resta testar”.
- Bibliografia versionada e notas por afirmação; changelog público; não converter o corpo do paper em feed político.
- Imagem OG editorial e `twitter:image` se criada com licenciamento claro; `summary_large_image` apenas quando houver imagem válida. Manter metadados, autoria e canonical.
- Sincronizar `soberaniacognitiva-design.md` com HTML real; testar navegação teclado, zoom, contraste, quebra mobile (320/375/768/1024/1440), foco, `prefers-reduced-motion`, JS off e print A4.
- Testar compartilhamento de URL, metadados, botões, links externos e continuidade da matriz; oferecer resumo executivo acessível e exportação sem sacrificar leitura.

**Inspeção em 29/10:** o HTML v1.2 tinha 9 capítulos, 8 `details`, 45 links, estilos responsivos e impressão, IDs sem duplicações e âncoras locais resolvidas; não equivale a QA visual de navegador ou auditoria WCAG formal.

## Etapas, entregáveis e gates (datas indicativas)

| Horizonte | Entrega | Gate de conclusão |
|---|---|---|
| 29/10–03/11/2026 | Dossiê oficial da PEC e da CMADS; mapa legislativo inicial | Texto/número/estado oficial identificados ou lacuna explicitada; não enviar minuta como se baseada em texto não lido |
| Novembro/2026 | Corpus bibliográfico e mapa de atores, instrumentos e interesses | Fontes classificadas, comparação Serpro e anterioridade registradas |
| Novembro–dezembro/2026 | Paper v1.3 e módulos curtos para públicos distintos | Revisão factual, claims, escopo jurídico e QA visual/acessibilidade |
| Novembro/2026–janeiro/2027 | Contatos legitimados e circulação inicial, se aprovada | Quem/por quê/o quê/quando registrados no ledger; confirmação de envios reais |
| Fevereiro–março/2027 | Leitura do novo período legislativo e programas executivos | Reavaliação de competência e oportunidade com documentos atuais |
| Abril–junho/2027 | Estudo de caso público, oficina ou demonstração se houver condições | Caso com fonte, consentimentos/autorizações pertinentes, limitações e resultados auditáveis; caso contrário publicar análise sem alegar execução |

Trilhas **A (PEC) e B (comparação/ENGD)** podem avançar em paralelo. A revisão bibliográfica não deve impedir uma nota preliminar honesta sobre limitações; tampouco a urgência deve eliminar pesquisa de anterioridade. O calendário é de trabalho interno, não cronograma institucional validado.

## Gestão de destinatários, privacidade e circulação

- Mapa interno de contato: instituição, unidade, competência, canal público, pessoa quando justificável, fonte, data de verificação, pedido preciso, histórico, próximo gate.
- **Não publicar e-mails pessoais, histórico de Gmail, interesses privados nem supostas relações** neste repositório público. Armazenar contatos e recibos no arquivo-fonte privado apropriado.
- Pedidos iniciais: **leitura crítica, roteamento para unidade competente ou orientação de canal**; sem pedido de endosso automático ou reunião com alta autoridade.
- Atualização semanal somente quando houver fatos novos; checkpoint mensal do PR-007. “Recebido” não é “lido”; aprovação de requerimento não é realização de evento; resposta cordial não é parceria.
- Dependências para envio: texto factual revalidado, pacote específico, revisão de claims/autoria, canal verificado e autorização humana de circulação; sem disparos em massa.
- Separar o **paper público** (tese e fonte), o **registro Reaches** (estado e recibos) e o **dossiê político** (análise substantiva). Anotações internas e relações pessoais não entram no HTML.

## Controle de alterações

- **2026-10-29:** roteiro criado depois de auditoria de conteúdo, design e mecanismos de oportunidade legislativa/executiva. Corrige risco de novidade absoluta à luz do Gradiente Serpro e registra a ENGD 5.5/6.6/9.4; não altera o estado de circulação do projeto.

- **2026-10-29 · implementação parcial:** o HTML v1.2.1 ganhou pergunta de entrada, caso fictício preenchido, nota de anterioridade e correção do rótulo do Decreto 12.069/2024. A inspeção estática confirmou oito capacidades, IDs únicos e âncoras internas resolvidas. QA renderizado e os demais gates da v1.3 continuam pendentes; não há nova circulação nem certificação institucional.

- **2026-10-29 · continuidade:** adicionados caminhos de leitura por profundidade e resumo executivo em HTML com formatação para impressão; explicitado que “não avaliado” não equivale a zero. A página continua v1.2.1; confirmação de uma página A4 e testes de acessibilidade permanecem pendentes.

## Atualização executada pelo chat — 29/10/2026

**Pesquisas primárias destravadas:** leitura integral dos textos originais PL 4218/2025 (10p), PL 4364/2026 (8p) e PL 6352/2025 (3p); resposta ao RIC 1688/2026 (15p, com Nota Técnica 39 do Ministério da Saúde). Autógrafo do PL 2338/2023 baixado em 35 páginas digitalizadas, sem extração de texto adequada, portanto ainda sem análise de íntegra. PEC Sâmia (número/íntegra) e seminário específico REQ 41 (realização) permanecem sem prova. [Dossiê artigo por artigo](./soberaniacognitiva-legislacao-2026-10-29.md).

**QA de navegador realmente executado:** cinco larguras sem overflow, teclado/detalhes, sem JS, zoom aproximado, A4 de 18 páginas com texto extraível, axe-core com zero violações automáticas nas larguras testadas. Foram corrigidos contraste de `--muted` e foco do skip link, com reteste positivo no domínio público. **Gates restantes:** contraste incompleto no axe, leitor de tela humano, revisão visual do impresso e preview social. [QA detalhado](./soberaniacognitiva-qa-2026-10-29.md). A página continua v1.2.1 até encerramento destes gates.

**Circulação:** não iniciada. Seis drafts HOLD existentes; nenhum envio foi autorizado. A ampliação da pesquisa não libera pacotes automaticamente.

## Postflight da candidata BRICS — 30/10/2026 (evidência real)

A branch `pr007-brics-editorial-qa` foi testada em Chromium/Playwright com HTML baixado do commit candidato, sem publicar a alteração. Cinco larguras (320, 375, 768, 1024 e 1440 px) sem overflow e oito `details` funcionais; teclado, skip link, sem JS, reflow com zoom CSS 2/4, impressão de 19 páginas e axe-core em 375/1440 sem violações automáticas, porém com 27/20 nós `color-contrast` inconclusivos. Não houve leitor de tela humano nem inspeção visual manual de todas as páginas: **v1.3 permanece bloqueada**. Relatório: [QA 30/10](./soberaniacognitiva-qa-candidata-2026-10-30.md).

**Prova legislativa nova:** PDF com texto do texto final do Senado do PL 2338/2023, 36 páginas e arts. 1–80, recuperado na Câmara. Arts. 3, 5–8 mencionam contestabilidade, explicação e revisão humana, que são antecedentes expressos da proposta Moon. Fonte: https://www.camara.leg.br/proposicoesWeb/prop_mostrarintegra?codteor=2868197 . Parecer da Comissão Especial em andamento, não é lei. O HTML candidato passou a explicitar esse limite no commit e013f8a. PEC anunciada e realização do seminário paulista REQ 41 ainda sem confirmação documental. Não enviar nem promover até gates pendentes.


## Micro-patch de estado e indispensabilidade · PR-007 · 30/10/2026
**Escopo:** atualização do estado observado; prevalece sobre os status antigos de 29/10 acima quando houver conflito temporal. **Não muda o lifecycle nem autoriza promoção, divulgação ou contato.**

### Realizado, com lastro
- **Produto público:** paper [Soberania Cognitiva Brasileira](https://www.luahelena.com.br/papers/soberaniacognitiva.html) v1.2.1, resumo HTML e imagem OG; oito capacidades (hospedar, auditar, adaptar, operar, contestar, substituir, aprender e socializar retorno); escala ordinal 0–3 com «não avaliado» ≠ 0; gates críticos não compensáveis; exemplo sintético e limites de novidade e adoção. A v1.3 **não** foi publicada.
- **Legislação:** leitura de versões originais dos PL 4218/2025, 4364/2026, 6352/2025 e resposta integral ao RIC 1688/2026. O bloqueio anterior do PL 2338/2023 foi superado: recuperado texto **final aprovado pelo Senado e remetido à Câmara**, em PDF oficial com camada textual (36 páginas, arts. 1–80), que já trata de supervisão, auditabilidade, explicação, contestação e revisão humana. **Não é lei vigente nem prova da redação atual de eventuais substitutivos da Câmara.** [PDF oficial](https://www.camara.leg.br/proposicoesWeb/prop_mostrarintegra?codteor=2868197).
- **China–BRICS–Brasil:** memorando privado atualizado e verificado, [fonte](https://docs.google.com/document/d/1pCv25GWymjAFgjJYXq57jTbw8OnFciPaDh33EQSmJI4/edit); distingue anúncio unilateral de Xi em 13/09/2026, Declaração de Nova Délhi e antecedentes operacionais; anterioridade BRICS 2025 reconhecida; aplicação das mesmas oito capacidades a cooperação internacional e dois cenários sintéticos. Governança, orçamento, licenças e implantação específica das propostas = \`NOT_VERIFIED\`. A URL do comunicado chinês presente na candidata foi conferida no memorando.
- **Comparação e instrumentos:** nota privada de [convergências e hipótese de valor incremental](https://docs.google.com/document/d/15a3ID7tNPRcuUKiZgDHToxSCiPRlsQdDeuxKFA4WUfE/edit) com Serpro Gradiente V3, ENGD, FGV/CyberBRICS, PL 2338 e BRICS; quatro notas temáticas de circulação, cartas MRE/LNCC e mapa de canais em HOLD; anexo técnico BRICS preparado para futura revisão. Revisão bibliográfica anterior: 26 registros e consultas dirigidas, **não revisão sistemática nem demonstração empírica de superioridade**.
- **Candidata editorial:** branch \`pr007-brics-editorial-qa\` com seção BRICS, anterioridade 2025, antecedente PL 2338, roadmap, design e [relatório de QA da candidata](https://github.com/luahelenammc/LUAHELENA/blob/pr007-brics-editorial-qa/papers/soberaniacognitiva-qa-candidata-2026-10-30.md); não integrada à main. Chromium/Playwright testou 320/375/768/1024/1440 px sem overflow; Tab, skip link e foco, disclosures, sem JS, zoom CSS 2×/4×, A4 **19 páginas** com texto extraível e sem palavras fora das páginas na inspeção geométrica; axe-core 375/1440 teve zero violações automáticas, mas **27/20 nós de contraste inconclusivo**. Isso **não equivale a certificação WCAG**. Testes de domínio público anteriores da v1.2.1 e desta candidata têm escopos distintos.
- **Estado institucional:** sete drafts Gmail em \`DRAFT\`, sem anexos; três sem destinatários; LNCC usa canal de comunicação geral, não confirmação de equipe competente. **ZERO envios, submissões, contatos, reuniões ou inscrições neste ciclo**. Reaches/01: \`public_artifact_live__active_strategy__outreach_not_yet_sent\`.

### O que falta e o quanto é indispensável
**G0 · indispensável para qualquer integração/publicação da candidata:** reconfirmar \`main\` versus branch, preservar os commits novos não relacionados, revisar diff completo e todas as alterações; conferir fontes/links usados, claims de originalidade, direitos/IA, estado BRICS e versões de PL; resolver defeitos técnicos ou de acesso detectados; verificar build/deploy e readback público **depois** de integração. A branch estava seis commits à frente e três atrás da main em 30/10, com os três commits adicionais da main limitados ao Beacon; não fazer merge cego.
**G1 · indispensável para promover esta candidata à v1.3 segundo os gates editoriais assumidos:** avaliar manualmente os 27/20 contrastes inconclusivos, corrigir falhas, revisar visualmente os 19 fólios A4 (se impressão integrar o pacote público), efetuar revisão final de acessibilidade e de redação, confirmar coerência entre paper, resumo, OG e referências e obter aceite editorial humano. Um \`axe: 0 violations\` não substitui essas provas. Leitor de tela real é **muito importante e pendente** para afirmar boa acessibilidade prática; ausência da ferramenta deve ser registrada como limitação e **proíbe alegação de teste real ou conformidade certificada**, sem por si só exigir eternizar a v1.2.1 quando demais gates forem resolvidos e Moon deliberar.
**G2 · indispensável SOMENTE ANTES DE CIRCULAÇÃO:** revisar cada nota e anexo final, eliminar links privados/informações internas, confirmar competência/canal oficial do destinatário, revisar o corpo dos sete drafts e só anexar material apto; **autorização humana nominal e por envio é obrigatória**. Enquanto não ocorrer, tudo continua HOLD independentemente da versão pública.
**G3 · importante, mas não bloqueia uma versão conceitual com limites honestos:** SciELO e ampliação bibliográfica direcionada; cotejo paginado do FGV/CyberBRICS e do Gradiente; piloto sintético comparativo pré-registrado e avaliação crítica independente. Sem tais passos não alegar validação, ganho incremental demonstrado, estudo sistemático ou piloto real. Leitura de toda a bibliografia e verificação empírica são **indispensáveis apenas para tais alegações fortes**, não para publicar uma proposta explicitamente exploratória.
**G4 · pesquisa/monitoramento contingente, NÃO bloqueia v1.3 se não houver alegações dependentes:** número e inteiro teor oficial da PEC sobre soberania digital anunciada por Sâmia, ainda \`NOT_VERIFIED\`; prova de realização do seminário paulista específico ligado ao REQ 41/2026 (aprovação do requerimento ≠ realização); eventual estatuto, compute, financiamento e operação da comunidade/nuvem China–BRICS anunciada. Não preencher incertezas com inferências e não apresentar esses itens como consumados.

**Decisão atual:** manter v1.2.1 publicada, candidata isolada, circulação HOLD e lifecycle inalterado. Próximo avanço material: revisão manual de contrastes/impressão, conferir diff e links, fechamento editorial e decisão humana explícita sobre integração. Status: \`partial_with_known_gates\`, **não** \`fully_verified\`.
