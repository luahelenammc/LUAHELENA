# PR-007 | Auditoria de navegador e acessibilidade do paper

**Data de execução:** 29/10/2026 · **Ambiente:** Chromium 156, Playwright Python, axe-core 4.10.3 e PDF A4 gerado em Chromium.  
**Versão do paper testada:** v1.2.1, com correções de contraste e foco aplicadas em 29/10. URL: https://www.luahelena.com.br/papers/soberaniacognitiva.html  
**Natureza:** QA automatizado e observação de comportamento real. **Não é certificação WCAG, auditoria jurídica ou teste humano com NVDA/VoiceOver.**

## 1. Resultados positivos confirmados

| Teste | Método e evidência | Resultado |
|---|---|---|
| Mobile 320 px | Navegador real, `innerWidth=320` e `documentElement.scrollWidth=320` | Sem overflow horizontal; 8 capacidades presentes |
| Mobile 375 px | `innerWidth=375` e `scrollWidth=375` | Sem overflow horizontal; 8 capacidades presentes |
| Tablet 768 px | `innerWidth=768` e `scrollWidth=768` | Sem overflow horizontal; 8 capacidades presentes |
| Desktop 1024 px | `innerWidth=1024` e `scrollWidth=1024` | Sem overflow horizontal; 8 capacidades presentes |
| Desktop 1440 px | `innerWidth=1440` e `scrollWidth=1440` | Sem overflow horizontal; 8 capacidades presentes |
| Teclado | Primeiro Tab encontra “Pular para o conteúdo”; outline CSS `solid`; Enter navega para `#conteudo` e foco **MAIN** após correção | Passou |
| Oito `details` | Foco em `summary` e Enter para abrir/fechar | Passou |
| JavaScript desligado | `java_script_enabled=false`; 18.506 caracteres de texto do `main`, 8 `details`, sem overflow a 375 px | Conteúdo essencial presente |
| Falhas JS | Captura de `pageerror` no uso de teclado e botões | Nenhuma capturada no fluxo testado |
| Redução de movimento | Contexto `reduced_motion='reduce'`, `matchMedia` true | CSS preparado; preferência reconhecida |
| Semântica no navegador | Árvore de acessibilidade via CDP (Chromium) | 1 `main`, 2 navegações, 32 títulos, 61 links, 4 botões |
| Impressão A4 | `page.pdf(format='A4', print_background=true)`; leitura de PDF com pypdf | 18 páginas, 23.179 caracteres extraíveis, conteúdo das capacidades presente |
| Zoom 200% | Simulação de reflow com CSS `zoom=2` em 1024 e 1280 px | Sem overflow horizontal |
| Zoom 400% | Simulação de reflow com CSS `zoom=4` em 1280 e 1440 px, equivalente a aproximadamente 320–360 CSS px | Sem overflow horizontal |
| Resumo executivo | GET de `soberaniacognitiva-resumo.html` | HTTP 200 |
| Imagem social | GET `soberaniacognitiva-og.jpg`; JPEG 1734×907 px, 327.623 bytes | HTTP 200; metadados OG/Twitter presentes |
| Axe-core 4.10.3 (375 px) | WCAG 2.0/2.1 A e AA, browser real | 0 violações automáticas, 27 regras com pass; `color-contrast` com nós `incomplete` |
| Axe-core 4.10.3 (1440 px) | Mesmo perfil | 0 violações automáticas, 26 regras com pass; `color-contrast` com nós `incomplete` |

## 2. Falhas reais e correções efetuadas

**Foco do skip link:** antes, a tecla Enter modificava o hash para `#conteudo`, mas o destino não recebia foco (document.activeElement era BODY). O HTML recebeu `tabindex="-1"` no elemento `<main id="conteudo">`. Reteste no domínio: hash `#conteudo`, elemento ativo `MAIN#conteudo`. Commit: [650649b](https://github.com/luahelenammc/LUAHELENA/commit/650649becbd3396604f1f707e418da7a9235100b).

**Contraste de texto secundário:** amostra calculada da classe `.capability-question` indicou razão aproximada 3,91:1 com papel claro, abaixo de 4,5:1 para texto normal. A variável `--muted` foi escurecida de `#7b7d7d` para `#5b6064` no mesmo commit. O domínio público foi relido e confirmou cor computada `rgb(91,96,100)`. Verificação posterior de todos os casos cromáticos, inclusive superfícies com gradientes, continua recomendada.

## 3. Limites de interpretação

- O detector axe não encontrou violações A/AA nas duas larguras, **mas sinalizou 27 nós a 375 px e 20 nós a 1440 px como `incomplete` na análise de contraste**. Gradientes, fundos complexos e transparências podem exigir inspeção humana. Não transformar ausência de violações automatizadas em “WCAG AA comprovado”.
- A árvore de acessibilidade do Chromium foi inspecionada, mas **não houve teste operacional com leitor de tela real** (NVDA, VoiceOver ou Orca).
- A inspeção gerou capturas nas larguras menores, mas não houve revisão visual manual exaustiva de cada seção/página. A checagem de overflow é uma dimensão da responsividade, não revisão tipográfica de todas as quebras.
- O zoom foi aproximado pela propriedade CSS `zoom`. É um teste real de reflow do Chromium, não substitui o zoom nativo controlado pelo usuário em todos os sistemas.
- O PDF A4 foi renderizado e texto extraído; isso não certifica PDF/UA nem garante ausência de linhas órfãs ou cabeçalhos cortados em todas as 18 páginas. Recomendável inspeção visual amostral do PDF e revisão do resumo impresso.
- O botão “Copiar citação” exibiu fallback manual no navegador sem permissão de área de transferência do ambiente de testes. Isso demonstra o fallback, não falha comprovada da API em navegação normal.
- A presença de uma imagem OG no servidor não confirma como Facebook/WhatsApp/LinkedIn efetivamente montarão seu card.
- Os resultados têm data, versão e ambiente definidos; mudanças futuras exigem nova rodada de QA.

## 4. Gates da v1.3

**Aprovados com evidência:** cinco larguras e overflow, âncoras/IDs estáticos, teclado/skip link, `details`, conteúdo sem JS, geração de A4, zoom aproximado, serviços HTTP, árvore AX, axe sem violações automáticas detectadas.

**Ainda abertos:** revisão visual manual do impresso e quebras relevantes; contraste em elementos `incomplete` do axe; leitor de tela real e eventuais problemas semânticos encontrados; checagem externa de card social, atualização bibliográfica/legislativa suficientemente qualificada e revisão final editorial/humanizadora.

**Decisão:** manter o paper em `v1.2.1` até o fechamento desses gates. É incorreto promover para v1.3 apenas pelo sucesso do deploy ou por zero violações automáticas.

## 5. Dependências e correspondências

- [Leitura de textos primários dos PLs e RIC](./soberaniacognitiva-legislacao-2026-10-29.md)
- [Roadmap](./soberaniacognitiva-roadmap.md)
- [Direção visual](./soberaniacognitiva-design.md)

**Mudança de estado:** QA real executado e documentado; não houve envio institucional, exposição de dados privados, formulário ou pedido de reunião. O PR-007 segue `outreach_not_yet_sent`.
