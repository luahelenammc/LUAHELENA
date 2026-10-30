# PR-007 | QA browser pós-integração, contrastes e impressão

**Data:** 30/10/2026  
**Referência:** `pr007-integration-review-2026-10-30`, draft GitHub PR #81  
**Fonte renderizada:** `papers/soberaniacognitiva.html` obtido via `raw.githubusercontent.com` após correção de impressão  
**SHA-256 do HTML ensaiado:** `6a697f16a075dd526703c1234347f8adc3c447ecf01552a4bb1a60d68986b861`  
**Motor:** Chromium 156 (Playwright Python 1.64.1); `axe-core 4.10.3`; PyMuPDF para contagem/extração e inspeção geométrica do PDF. Teste executado sobre o arquivo local derivado da branch, **não** sobre a produção.

## 1. Navegação e layout

| Verificação | Observado | Estado |
| --- | --- | --- |
| Viewports 320, 375, 768, 1024 e 1440 px | `document.documentElement.scrollWidth === innerWidth` nas cinco; sem elementos de texto detectados ultrapassando a viewport | PASS |
| Estrutura e âncoras | 39 `section`, 8 `details.capability`, zero fragmentos quebrados, zero IDs duplicados | PASS |
| Teclado | Primeiro Tab: “Pular para o conteúdo”; Enter foca `MAIN#conteudo`; primeiro disclosure abre/fecha via Enter | PASS amostral |
| Sem JavaScript | 8 disclosures preservados; `main` com 20.593 caracteres; sem overflow em 375 px | PASS |
| Zoom CSS 2× e 4× | Sem overflow em viewport de 1280 px | PASS como aproximação, **não** teste de zoom nativo |
| `axe-core` WCAG 2/2.1 A/AA, 375 px | 0 violações automatizadas; 27 nós `color-contrast` inconclusivos pela análise padrão | PASS automatizado / INCOMPLETE automático |
| `axe-core` WCAG 2/2.1 A/AA, 1440 px | 0 violações automatizadas; 20 nós `color-contrast` inconclusivos pela análise padrão | PASS automatizado / INCOMPLETE automático |

### Inspeção complementar de contraste

As **47 ocorrências** de contraste inconclusivo (27 mobile + 20 desktop) foram avaliadas sobre o navegador efetivamente renderizado. O procedimento capturou a área de cada elemento com texto visível e com o texto temporariamente transparente, comparou os pixels alterados pela pintura das letras e calculou a razão ideal de cor do texto composto sobre o fundo local. Considerou os pixels de maior cobertura da fonte, descartando bordas de antialiasing (que não são uma nova cor do design).

- Menor razão encontrada nos pixels examinados: **4,76:1**, no fólio do desktop (texto normal, referência WCAG AA 4,5:1).
- Em mobile, navegação lateral convertida em links horizontais: **5,08:1** na área real das letras. Um mínimo bruto próximo de 1:1 anterior correspondia a pixels decorativos fora do texto, não à tinta das letras.
- Os títulos maiores ultrapassaram 3:1; demais amostras de texto examinadas ultrapassaram 4,5:1.
- O script não configura perícia universal de acessibilidade, não percorre todas as combinações de estado, nem substitui teste de leitor de tela. Os 27/20 resultados do axe continuam registrados como *incomplete* do motor automático, **com inspeção pontual complementar favorável**. Não declarar certificação WCAG.

## 2. PDF e correção descoberta

O Chromium gerou um PDF A4 de **19 páginas** com texto extraível. Uma inspeção visual em grade das 19 páginas foi realizada. O exame geométrico por PyMuPDF não identificou palavras ultrapassando a área de 8 pt das bordas, e não foram detectadas páginas vazias. As referências ocupam páginas densas, mas legíveis como texto, com margens preservadas.

**Defeito real descoberto:** o link fixo de acessibilidade “Pular para o conteúdo” surgia no rodapé de **18 páginas impressas**. Foi corrigido no CSS de impressão, incluindo `.skip-link` entre os elementos ocultos por `display:none!important`. Reteste após o commit: PDF permaneceu em 19 páginas, **0 ocorrências** do link espúrio e **0 palavras ultrapassando as margens medidas**. O fólio de revisão foi sincronizado com **30.10.2026**.

A inspeção em grade e o exame geométrico verificam os principais defeitos visíveis e de encaixe, mas não equivalem a uma avaliação humana de cada página em escala de impressão real.

## 3. Links e apresentação social

- **46 URLs de âncoras HTTP(S)** foram submetidas a uma rodada de GET com resposta parcial (`Range: bytes=0-1023`), timeout de 15 s e user agent explícito.
- **33 URLs** retornaram HTTP 200 ou 206 (18 respostas 200; 15 respostas 206, esta última representando resposta parcial solicitada).
- **6 Reuters** responderam 401; **4** fontes acadêmicas/OECD responderam 403. Restrições de acesso editorial ou anti-bot **não** comprovam que os endereços estejam quebrados.
- **3 inconclusivas**: PDF BRICS 2025 (`brics.br`, DNS sem resposta nesse ambiente) e duas páginas do Gradiente do Serpro (cadeia TLS não confiável neste cliente). A declaração BRICS está indexada pelo buscador na URL oficial e no índice público do BRICS; as páginas Serpro também estão indexadas e exibem o Framework V3 e o avaliador. Nenhuma URL de Google Drive/Docs privado está no HTML.
- O HTML declara `og:title`, `og:description`, `og:image`, `og:url` e Twitter Card; a imagem OG responde **HTTP 200**, JPEG **1734×907**, coerente com a proporção 1,91:1, e o favicon responde 200. O resumo público e o paper publicados atualmente também respondem 200.
- **Preview real em plataformas sociais e readback público da v1.3 são pós-publicação**. Metadados presentes e imagem válida não provam o resultado do crawler de cada rede.

## 4. Revisão de conteúdo e proveniência

A integração preserva a distinção entre anúncio chinês China–BRICS (proposta, não plataforma implementada), declaração multilateral de 2025, texto final do Senado do PL 2338/2023 (em tramitação, não lei) e anterioridade do Gradiente Serpro. Não se reivindicam pioneirismo geral, superioridade comprovada, aplicação real, endosso ou adesão brasileira a uma plataforma anunciada.

O HTML permanece identificado como versão pública **1.2.1** enquanto a candidata não for promovida; isso evita falsificar um lançamento. O escopo de mudança do draft PR #81 é restrito a `papers/`; não reverte arquivos do Beacon.

## 5. Gates residuais reais

**QA técnico de navegador e impressão: aprovado com limites explicitados.** Ficam apenas:
1. **Aceite editorial e autorização de integração** pela autora, após revisão do diff e do conteúdo final. Até lá, GitHub PR #81 continua draft e não ocorre publicação v1.3.
2. **Leitor de tela real:** não executado. Restrição sobre alegar acessibilidade abrangente, mas o próprio gate canônico permite registrar a limitação sem torná-la um bloqueio permanente para uma proposta exploratória.
3. **Depois de publicar:** conferir URL final, HTML, recursos, apresentação social e estado canônico; se a publicação for convertida em v1.3, atualizar version/datas em JSON-LD, fólio e comunicação editorial antes do merge.
4. **Outreach:** revisar sete rascunhos com texto/versão final efetivamente pública e solicitar autorização humana por destinatário; o CPQD continua roteado ao formulário oficial, sem inventar e-mail. **Zero envios.**

**Veredito operacional:** `qa_browser_substantially_passed__human_editorial_gate_pending__merge_hold__outbound_hold`. Não declarar `ready_for_send` até a aprovação editorial e checagem pós-publicação.
