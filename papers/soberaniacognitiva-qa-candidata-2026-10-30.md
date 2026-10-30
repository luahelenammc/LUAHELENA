# PR-007 | QA renderizado da candidata BRICS e nota de travas

**Execução:** 30/10/2026, branch `pr007-brics-editorial-qa`. **Alvo:** `papers/soberaniacognitiva.html`, texto pós-commit `e013f8a69c0adf4d3f4350b414647fb2a63803c8`. **Não publicado na main.**

## Evidências e método

O modo Chat usou Chromium 156 via Playwright em sandbox isolado, carregando o HTML obtido diretamente da URL `raw.githubusercontent.com` da branch (HTTP 200, não o HTML publicado em produção). Os testes ocorreram em duas passagens, antes e depois da inserção editorial sobre o PL 2338/2023. Nenhuma autenticação ou segurança de site foi contornada. Foram usados DOM real, teclado, layout viewport, impressão do motor Chromium e axe-core 4.10.3.

| Gate | Resultado observado | Estado |
| --- | --- | --- |
| Viewports 320 / 375 / 768 / 1024 / 1440 px | `document.documentElement.scrollWidth === innerWidth`; 8 `details.capability` em todas | PASS |
| Teclado | primeiro Tab foca `Pular para o conteúdo`, outline solid; Enter move foco para `MAIN#conteudo` | PASS |
| Disclosures | Enter abre e fecha primeiro `summary`; 8 blocos presentes | PASS amostral |
| Sem JavaScript | em 375 px, main preservou 20.593 caracteres e 8 disclosures, sem overflow | PASS |
| Âncoras e IDs | zero âncoras `#...` quebradas, zero duplicatas | PASS |
| Canonical e OG | canonical declarado para `www.luahelena.com.br/papers/soberaniacognitiva.html`; meta OG aponta para JPG existente em main | PASS presença; preview social não observado |
| `prefers-reduced-motion` | media query reconhecida sob contexto `reduce` | PASS reconhecimento; leitura humana pendente |
| Zoom | CSS `zoom=2` e `zoom=4` sob 1280 px: sem overflow | PASS reflow aproximado; não equivale a browser zoom em sistemas diversos |
| Impressão A4 | Chromium gerou **19 páginas**, texto extraível (25.596 caracteres); menções a BRICS e PL 2338 presentes | PASS geração e extração; inspeção visual de cada página pendente |
| Axe-core 375 px | **0 violações automáticas WCAG 2/2.1 A/AA**, 27 regras com pass; contraste com **27 nós `incomplete`** | PARTIAL |
| Axe-core 1440 px | **0 violações automáticas WCAG 2/2.1 A/AA**, 26 regras com pass; contraste com **20 nós `incomplete`** | PARTIAL |
| Leitor de tela real | não executado; árvore AX/axe não o substituem | UNOBSERVED |
| Inspeção visual integral de capturas e PDF | não houve inspeção humana equivalente a todas as páginas, apesar dos arquivos gerados no sandbox | UNOBSERVED |
| Links externos | fontes BRICS/PL verificadas por acesso independente; não houve auditoria de todas as URLs externas | PARTIAL |

### Correção editorial que exigiu reteste

O texto final aprovado pelo Senado do PL 2338/2023 foi encontrado **com camada textual**, em PDF oficial da Câmara (36 páginas; 279.835 bytes; 98.733 caracteres extraídos), permitindo confrontar artigos efetivos e superar bloqueio anterior do autógrafo digitalizado. O texto inclui art. 3º (supervisão, auditabilidade, contestabilidade); arts. 5º–8º (direitos à informação, explicação, contestação e revisão humana, segundo risco). A candidata passou a reconhecer esse antecedente com escopo explícito: **proposta legislativa em tramitação, não lei**. Fonte: https://www.camara.leg.br/proposicoesWeb/prop_mostrarintegra?codteor=2868197&filename=Tramitacao-2-PL-2338-2023 .

### Fatos da China–BRICS

A candidata já diferencia anúncio chinês de 13/09/2026 e compromissos da Declaração de Nova Délhi. A URL usada para a declaração chinesa https://english.www.gov.cn/news/202609/13/content_WS6aa69ef0c6d00ca5f9a0d2d3.html é existente e contém as propostas. A declaração brasileira BRICS 2025 (jul/2025) antecede temas de autonomia intelectual, governança e direitos. A plataforma/comunidade anunciadas por Xi continuam **NOT_VERIFIED** quanto a constituição multilateral, governança, orçamento, operadores, acesso real e participação brasileira. Não confundir cooperação anterior do Centro China–BRICS e do LNCC com implementação da iniciativa recém-anunciada.

### Decisão de integração

**NÃO promover a `main` e NÃO renomear a página como v1.3 neste checkpoint.** Faltam: inspeção visual das 19 páginas impressas, análise manual dos contrastes `incomplete`, leitor de tela real quando disponível, revisão externa do card social, fechamento de comparação bibliográfica, validação factual pontual e aceitação editorial final. Esses são gates, não motivo para descartar o progresso da branch. A candidata está testada, com limitações declaradas; não está liberada para integração.

### Preservação operacional

- Ciclo de emails: sete drafts observados em Gmail, todos `DRAFT`, sem anexos; três sem destinatário.
- Nenhuma atualização de destinatários, anexo, envio, submissão ou agendamento foi autorizada.
- Reaches Registry segue `public_artifact_live__active_strategy__outreach_not_yet_sent`; a branch representa estado técnico candidato, não alcance institucional.

**Fonte de QA anterior da main**: https://github.com/luahelenammc/LUAHELENA/blob/main/papers/soberaniacognitiva-qa-2026-10-29.md .
