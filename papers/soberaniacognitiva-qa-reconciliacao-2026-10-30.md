# PR-007 | QA complementar e auditoria dos vínculos externos — 30/10/2026

**Alvo:** `papers/soberaniacognitiva.html` na branch `pr007-integration-review-2026-10-30`. **Publicação:** HOLD. Este relatório não substitui o QA renderizado da branch anterior nem aprovação humana.

## Integridade da integração

- A candidata anterior divergira da `main` em 7 commits para cada lado. A branch nova foi criada a partir da `main` em `507880fb`; o diff de leitura posterior contra a `main` mostrou **ahead 5, behind 0**, alterando somente arquivos sob `papers/`. Beacon preservado.
- O HTML de integração apresenta DOCTYPE HTML, 27 IDs sem duplicatas, 18 links de fragmento com destinos existentes, 8 `details` e 8 `summary`, contagens estruturais de `section`, `main`, `header`, `footer` e `article` balanceadas.
- São 47 URLs HTTPS absolutas e nenhuma referência externa a Google Drive/Docs privado. Integração China–BRICS, PL 2338, Gradiente e distinção `não avaliado`/zero presentes.
- DateModified de JSON-LD foi alterado para 2026-10-30. O campo version permanece 1.2.1 por não ter sido publicado um novo release.

## Contraste: falhas materiais encontradas e correção

Foi inspecionado o CSS real e calculada a razão de contraste WCAG para textos claros semitransparentes sobre o fundo-base do hero (`#272b30`). Esta **não é uma medição renderizada**: gradientes, antialiasing e todas as combinações de cores ainda requerem nova passagem no navegador.

| Seletor | Antes | Após correção | Razão aproximada sobre o fundo-base |
| --- | --- | --- | --- |
| `.masthead::after` (texto pequeno) | `rgba(244,239,230,.42)` | `rgba(244,239,230,.70)` | ~3,47:1 → ~6,90:1 |
| `.hero-meta span` (texto pequeno) | `rgba(244,239,230,.48)` | `rgba(244,239,230,.70)` | ~4,07:1 → ~6,90:1 |

O seletor `.folio` com opacidade .56 foi observado em ~4,99:1 sobre o fundo-base e não alterado. **Não declarar WCAG AA integral**: 27/20 resultados inconclusivos do axe anterior ainda precisam de verificação contextual.

## Tentativa de validação de todos os 47 links

Cada um dos **47 URLs distintos do HTML** foi submetido a uma tentativa de abertura na ferramenta de navegação em 30/10/2026. **22 retornaram conteúdo acessível** nessa ferramenta e **25 tiveram acesso inconclusivo** por bloqueio, timeout, CAPTCHA, necessidade de login, restrição editorial, resposta 502 ou ausência de cache. *Falha de acesso do robô não equivale automaticamente a link quebrado para um navegador humano.*

Acessos de leitura bem-sucedidos incluem fontes da China e da Índia sobre BRICS 2026, PDF oficial do PL 2338 na Câmara, a ficha legislativa do PL, fontes parlamentares, LNCC, White House, BIS (740/748), União Europeia, OECD, UNESCO, NIST, livro CyberBRICS/FGV e quatro páginas da ENGD. O PDF da declaração BRICS de 2025 na URL brics.br devolveu 502, mas o índice institucional está disponível e foi encontrada cópia da declaração integral em https://infobrics.org/pt/document/115/ . A classificação como `link_broken` fica suspensa até confirmação humana.

Casos a reabrir manualmente por sua importância: PDF BRICS 2025 (`brics.br`, 502); `soberania.serpro.gov.br` e avaliador (timeouts); recursos `gov.br/mcti` com desafio JavaScript; página E-IA_1.0 com login; legislação no `planalto.gov.br` com WAF; fontes Reuters e artigos ACM/ScienceDirect com bloqueio editorial/403; uma ficha da Câmara (PL 4364/2026) e repositório GitHub/live page com falha do fetch web (sendo o conteúdo do GitHub, em contraste, legível via conector autenticado).

## Gates de entrega

- **PASS estrutural:** integridade de commits, cherry-pick editorial, unicidade IDs, âncoras, disclosures, ausência de URLs privadas.
- **PATCHED, reteste pendente:** dois contrastes de texto pequeno.
- **PARTIAL / INCONCLUSIVE:** HTTP/links externos, acessibilidade com axe, preview Open Graph, CI/head status.
- **UNOBSERVED nesta branch:** navegação visual de ponta a ponta, PDF impresso e inspeção de suas 19 páginas, leitor de tela real, contraste de todos os elementos sobre gradientes.
- **HOLD publicação e outbound:** aprovar editorialmente a candidata, executar QA visual/manual, abrir preview social e validar readback público após merge/deploy; nenhum contato externo antes de autorização humana por alvo.

## Roteamento e contato

Sete rascunhos institucionais preexistentes foram lidos e preservados em `DRAFT`. Em 30/10, foi adicionado `contato@marianacontipsol.com.br` ao rascunho Mariana Conti, canal listado no site público da parlamentar, e `carlos-rodrigo.lima@serpro.gov.br` no rascunho Serpro, endereço listado na página oficial da Superintendência de IA. Ambos receberam apenas edição de rascunho; nenhum envio. CPQD oferece formulário oficial https://www.cpqd.com.br/fale-conosco/ ; nenhum e-mail de equipe de IA foi comprovado e seu draft permanece sem destinatário.

**Estado final deste checkpoint:** prova de construção robusta, QA importante ainda aberto; `ready_for_human_send_approval = false`. Nenhum merge, deploy, email ou endosso institucional foi realizado.
