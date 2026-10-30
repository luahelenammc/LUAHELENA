# PR-007 | Release QA v1.3.0 | 30/10/2026

**Target:** `papers/soberaniacognitiva.html` + `papers/soberaniacognitiva-resumo.html`.  
**Branch de integração:** `pr007-integration-review-2026-10-30` (GitHub PR #81).  
**Origem:** leitura HTTP 200 do conteúdo bruto da branch e execução real Chromium 156 / Playwright 1.64.1, axe-core 4.10.3.  
**SHA-256 da página HTML v1.3.0 retestada:** `7356b32cae4a6f52c0032b5a887f9f05c1e7c921e696f36ce6c345bff4d2d936`.

## Reteste após sincronizar v1.3.0
- **PASS:** 320 / 375 / 768 / 1024 / 1440 px; `scrollWidth=innerWidth`; 8 disclosures, 39 sections, sem IDs duplicados, âncoras internas íntegros.
- **PASS amostral:** primeiro Tab = `Pular para o conteúdo`; Enter move foco a `MAIN#conteudo`; Enter abre/fecha disclosure.
- **PASS:** sem JS, 20.593 caracteres em `main`, 8 disclosures; sem overflow; aproximação CSS zoom 2×/4× sem overflow.
- **PASS automatizado, limitação:** axe WCAG 2/2.1 A/AA = 0 violações nas larguras 375 e 1440; 27/20 nós `color-contrast` permanecem inconclusivos no motor. O QA complementar anterior analisou a coloração de 47 ocorrências por amostras de pixels sobre fundos renderizados; menor relação amostrada 4,76:1 (texto normal), acima de 4,5:1. Não equivale a certificação WCAG nem substitui leitor de tela humano.
- **PASS:** PDF Chromium A4 = 19 páginas com texto, 0 ocorrências da `skip-link` no PDF e 0 palavras ultrapassando margem de 8pt no exame geométrico. Foi inspecionada a grade das 19 páginas na revisão precedente; no novo reteste apenas versão e metadados textuais mudaram.
- **PASS:** as quatro referências textuais `1.2.1` no HTML foram substituídas consistentemente por `1.3.0`: JSON-LD, navegação, destaque e citação; data revisada 30/10/2026. Resumo executivo atualizado também para versão 1.3.0, com limites BRICS/PL 2338.
- **PASS estrutural:** a branch nasceu da main atual e manteve o Beacon fora do diff. O link OG já respondeu 200 (JPEG 1734×907) e resumo/paper anteriores responderam 200; **não** se confunde isso com verificação da produção pós-merge.

## Verificação externa (30/10)
- Câmara: PL 2338/2023 **em tramitação**, aguardando parecer da comissão especial. Fonte https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=2487262 .
- Fala chinesa 13/09/2026: **propostas** de comunidade open-source de IA e plataforma de nuvem BRICS, não comprovação de adesão brasileira ou operação. Fonte https://english.www.gov.cn/news/202609/13/content_WS6aa64922c6d00ca5f9a0d2b3.html .
- REQ 41/2026 (seminário de datacenters em SP) aprovado em 13/05; não há prova de realização no registro consultado. https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=2620527 .
- PEC de Sâmia noticiada em 28/10: número e íntegra oficial continuam sem confronto documental. Não inferir que direitos são invenção desta matriz.

## Restrições explícitas
1. Não há teste com NVDA/Orca/VoiceOver em interação humana real; proíbe alegar certificação ou acessibilidade integral demonstrada.
2. Links Reuters/ACM/ScienceDirect e alguns órgãos podem responder com WAF, 401, 403 ou erros de TLS ao robô. A auditoria anterior classificou esses eventos como acesso inconclusivo, não automaticamente link quebrado.
3. Preview social em rede de terceiros e readback da produção **só podem ser verificados após deploy**.
4. **Outreach institucional mantém gate independente**: sete rascunhos, sem envio; canal CPQD disponível por formulário oficial, sem e-mail técnico comprovado; nenhuma parceria, aval, submissão ou piloto.

**Veredito pré-publicação:** construção/reteste técnico substancialmente aprovados para integrar versão 1.3 como *proposta exploratória*, com limitações relatadas. A instrução da autora para prosseguir com todas as pendências autoriza executar os passos editoriais/técnicos da publicação, não substitui autorização nominal individual para sete e-mails externos. Publicação somente após conferir ausência de divergência e efetuar merge; após merge, readback obrigatório.
