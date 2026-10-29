# Soberania Cognitiva Brasileira — implementação e direção de design

**Página:** `papers/soberaniacognitiva.html`  
**Registro de concepção:** v1.0 — 18/07/2026. **Versão atual do paper:** v1.2.1, com correção de acessibilidade e contraste de 29/10/2026.  
**Tese visual escolhida:** carta cívica operacional + atlas de capacidades públicas.

## Três direções consideradas

1. **Carta cívica operacional + atlas.** Papel claro, tinta, azul de serviço público e vermelho de contestação; margem editorial persistente; matriz como registro dobrável. Escolhida porque une leitura autoral e uso institucional sem parecer governo, startup ou campanha.
2. **Planta técnica de capacidade.** Fundo azul mineral, traços de desenho e peças conectáveis. Rejeitada porque deslocava a proposta para infraestrutura e tornava a camada humana excessivamente fria.
3. **Arquivo de evidências.** Pastas, carimbos, fichas e marcas de revisão. Rejeitada porque a metáfora documental poderia virar burocracia cenográfica e enfraquecer a decisão.

## Design dials finais

| Dial | Valor | Decisão |
|---|---:|---|
| design_variance | 8/10 | composição assimétrica, navegação lateral e registro expansível; identidade distante dos papers existentes |
| motion_intensity | 3/10 | feedback curto em navegação, detalhes e toast; nenhum movimento contínuo |
| visual_density | 6/10 | matéria densa organizada por regras, margens e faixas editoriais |
| moon_signature | 4/10 | autoria forte, sem estética lunar ou linguagem de portfólio |
| literalness | 8/10 | perguntas, evidências, alertas e escala aparecem sem metáfora encobridora |

## Tokens

- **Cores:** papel `#f2efe4`, tinta `#151915`, azul `#174b78`, vermelho `#a83a2f`, verde do piloto `#315e49`.
- **Tipo:** `Iowan Old Style`/Palatino/Georgia para títulos; Aptos/Segoe/system para operação. Sem fonte remota.
- **Espaço:** escala de `.35rem` a `5.5rem`.
- **Forma:** cantos quase retos; bordas e regras fazem a hierarquia. Sombras apenas onde indicam folha ou objeto destacado.
- **Movimento:** 160–200 ms, easing `cubic-bezier(.2,.8,.2,1)`, com `prefers-reduced-motion`.
- **Breakpoints:** 980, 700 e 360 px, com recomposição da navegação, matriz e camadas.

## Design Skill Cortex aplicado

- **Taste Skill / Leon Lin:** dials explícitos, ban system anti-slop, auditoria de redesenho e disciplina de conclusão.
- **Emil Design Eng / Emil Kowalski:** abertura de capacidades, foco, navegação de capítulo, copiar citação e toast como feedback funcional; motion breve.
- **Anthropic Frontend Design:** direção estética definida antes do HTML; tipografia, paleta e composição com ponto de vista.
- **UI/UX Pro Max:** landmarks, teclado, foco, contraste, redução de movimento, mobile e impressão incorporados ao desenho.
- **Vercel/Web Design Guidelines:** HTML semântico, JS progressivo, nenhum framework, CDN, tracking ou dependência central.
- **Refero Styles / DESIGN.md:** anatomia de tokens e registro de decisões, sem copiar marca, layout ou código externo.

As skills foram metabolizadas como método. Nenhum código, design de marca ou identidade externa foi copiado.

## Auditoria anti-clone

### Preservado dos papers existentes

- arquivo HTML autônomo em `papers/`;
- favicon local e URL canônica do site;
- página legível sem build;
- autoria, contato, fontes e impressão;
- descoberta mínima pelo grupo “Papers & estudos” no `index.html`.

### Rejeitado deliberadamente

- fundo escuro com gradientes radiais e vidro;
- hero em dois painéis;
- cards arredondados em grid;
- navegação por pílulas;
- marca lunar em conic-gradient;
- emojis em todos os títulos;
- números gigantes de seção;
- barra de progresso colorida;
- sequência hero → cards → quote → cards;
- fade-up de seções e botão de copiar link.

### O que torna a página única

- margem editorial persistente que vira índice horizontal no mobile;
- materialidade de carta pública impressa;
- matriz como registro de oito linhas expansíveis, acessível por teclado;
- cor vermelha reservada a contestação, risco e decisão;
- três camadas representadas como folhas institucionais encaixadas;
- piloto apresentado como ficha de decisão, não como produto.

## QA previsto

- HTML e links locais;
- IDs e landmarks;
- navegação por teclado e foco;
- contraste e zoom;
- viewports 320, 375, 768, 1024 e 1440 px;
- `prefers-reduced-motion`;
- impressão A4;
- console sem erros;
- conteúdo essencial disponível sem JavaScript;
- comparação visual com `direitosemcaminho.html` e `iapelavida.html`.


## Patch de auditoria e direção v1.3 planejada — 29/10/2026

**Status de implementação:** a página pública permanece v1.2.1, com atualização de referências e metadados em 29/10. Este documento registra melhorias futuras; **não** afirma que o redesenho, testes visuais ou comparação empírica já ocorreram. O roteiro operacional completo está em [soberaniacognitiva-roadmap.md](./soberaniacognitiva-roadmap.md).

**Decisão de continuidade:** preservar a carta cívica operacional + atlas. Não migrar para cards de SaaS, dashboard ornamental ou comunicação partidária. Os tokens históricos acima documentam a v1.0; a página atual usa tokens refinados (papel `#eee9df`, tinta `#202327`, vinho `#8a4548`, azul `#506482`) e breakpoints 1080/920/700/380 px; essa diferença era um débito de sincronização, não uma falha visual comprovada.

**Nova arquitetura editorial de três camadas:** 1) abertura e decisão em dois minutos; 2) instrumento, evidências, ficha demonstrativa fictícia; 3) dossiê com anterioridade, legislação e fontes. Manter navegação de capítulos e opções de impressão. Criar entrada por finalidade sem quadruplicar o conteúdo.

**Auditoria de conteúdo:** incorporar Gradiente Serpro e ENGD 5.5/6.6/9.4, destacar o diferencial humano e de aprendizado público, testar a regra de bloqueio de falha crítica. Comparar com trabalho existente antes de afirmar originalidade. Separar papel público de campanha, correspondência e dossiê de contatos.

**Design e acessibilidade pendentes:** exemplar preenchido com valores fictícios e aviso de não certificação; diferencial entre nota ordinal e decisão; preview social com imagem editorial original e licença adequada; variações mobile; acessibilidade de `details` e navegação; impressão A4; contraste real; zoom 200/400%; teclado; leitura sem JS; checagem de links. Sem teste renderizado não registrar pass.

**QA estático verificado na v1.2 em 29/10:** HTML ~70 KB, nove capítulos navegáveis, oito `details`, IDs internos únicos, hrefs internos resolvidos, estilo de foco, redução de movimento e CSS para impressão. Isso não constitui auditoria WCAG nem revisão jurídica.

**Gate para v1.3:** revisão factual do corpus; comparativo Serpro × Moon; revisão de alegações; prova visual e funcional; atualização da data e do changelog; verificação de que nenhuma relação institucional é inflada. O documento HTML não deve ostentar v1.3 antes de esses gates terem sido efetivamente cumpridos.

## Patch editorial parcial — 29/10/2026

O HTML v1.2.1 recebeu uma pergunta inicial, um caso inteiramente fictício para ilustrar a regra de falhas críticas, uma nota de complementaridade e uma correção na identificação do Decreto 12.069/2024. A nota não atribui exclusividade de gates à matriz e não afirma validação empírica. O caso usa a escala como ilustração, não como certificação.

**Verificação realizada:** inspeção estática constatou oito capacidades, IDs únicos e âncoras internas resolvidas. O Playwright estava disponível, mas seu navegador não estava instalado; tentativa de abrir o servidor local no navegador remoto retornou conexão recusada. Por isso, não se alegam teste visual, teclado, contraste, zoom, impressão ou QA de acessibilidade, e a página continua em v1.2.1. O conjunto completo de gates da v1.3 permanece pendente.


## Continuidade editorial — 29/10/2026

A página v1.2.1 ganhou entradas diretas para apresentação, instrumento e fontes, além de um resumo executivo autônomo em HTML com CSS de impressão. O exemplo fictício distingue ausência efetiva de ausência de evidência. A direção visual permanece carta e atlas; nenhuma reclassificação para v1.3 foi feita. Testes amplos de responsividade, impressão, teclado, zoom e acessibilidade continuam necessários antes da promoção.

**Imagem social:** `soberaniacognitiva-og.jpg`, composição editorial abstrata gerada por IA em 29/10/2026 a pedido da autora, sem logotipos ou fotografia de terceiros. Metadados OG e Twitter vinculados ao arquivo. Visualização pelas plataformas de compartilhamento permanece por verificar.

## Resultado do QA real — 29/10/2026 (adendo após o Work)

O Chromium/Playwright executou cinco larguras (320, 375, 768, 1024, 1440 px), teclado com foco no link de pular, `details` via Enter, conteúdo sem JavaScript, reflow aproximado a 200/400%, impressão A4 de 18 páginas, árvore de acessibilidade e axe-core nas larguras 375/1440. O contraste de `.capability-question` estava abaixo de 4,5:1 e a âncora pulava sem focar o `main`: ambos foram corrigidos e revalidados no domínio público. O axe não encontrou violações automáticas WCAG A/AA, mas marcou múltiplos elementos com contraste `incomplete`; não houve leitor de tela humano nem revisão visual completa do impresso. **Não promover para v1.3 ainda.** Evidência e critérios: [relatório de QA](./soberaniacognitiva-qa-2026-10-29.md). A pesquisa jurídica agora tem [dossiê de PDFs oficiais efetivamente lidos](./soberaniacognitiva-legislacao-2026-10-29.md), distinguindo PL original e texto vigente.
