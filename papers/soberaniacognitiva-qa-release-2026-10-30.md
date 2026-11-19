# PR-007 | Release QA v1.3.0 | 30/10/2026

**Target:** `papers/soberaniacognitiva.html` + `papers/soberaniacognitiva-resumo.html`.  
**Branch de integração:** `pr007-integration-review-2026-10-30` (GitHub PR #81).  
**Origem:** leitura HTTP 200 do conteúdo bruto da branch e execução real Chromium 156 / Playwright 1.64.1, axe-core 4.10.3.  
**SHA-256 da página HTML v1.3.0 retestada:** `7356b32cae4a6f52c0032b5a887f9f05c1e7c921e696f36ce6c345bff4d2d936`.


## Checkpoint da revisão web · 19/11/2026

**Escopo:** edição pública v1.3.0 pós-Mesa e [sincronização editorial](https://github.com/luahelenammc/LUAHELENA/commit/c450767e75af328f1ba20c71e3764d054edf5481). O [deploy do resumo](https://github.com/luahelenammc/LUAHELENA/actions/runs/44582076335) e a [geração do PDF do HTML vigente](https://github.com/luahelenammc/LUAHELENA/actions/runs/44577191119) concluíram com sucesso.

- **Web:** domínio público conferido para paper e resumo. O Chrome confirmou a data da revisão, autoria, regra atual e funcionamento por Enter do primeiro disclosure da matriz, com foco mantido. A análise do HTML servido encontrou oito capacidades, 18 cartões de circulação, IDs únicos e destinos existentes para todas as âncoras internas. Metadados canônicos e Open Graph do paper conferidos. A imagem OG foi recuperada como JPEG 1734 × 907. O preview em redes sociais e o acesso exaustivo às referências externas não foram testados.
- **Resumo:** contraste calculado sobre o fundo uniforme para texto, links, rótulo e contorno de foco entre 6,55:1 e 14,88:1. A folha incorpora regra de impressão A4. Falta conferir a paginação impressa do resumo.
- **PDF integral servido:** 16 páginas A4, nenhuma vazia, texto extraível e nenhuma caixa de palavra a menos de 7 pt da borda. A extração contém a regra de evidência insuficiente, o comparador do piloto e a Lei 15.504/2026. SHA-256 `b62883948c97cebe5ac8bfdf2b87fa035b2169d42edf27e0a8ee9a390cf63ec0`. O PDF não está etiquetado. A verificação geométrica não substitui inspeção visual de cada página.
- **Limites do QA atual:** Chromium local não iniciou porque o ambiente bloqueou o socket do processo. As larguras de 320, 375, 390, tablet e desktop controlado, a inspeção visual completa de contraste e overflow, a impressão do resumo, a navegação sem JavaScript e a emulação de movimento reduzido permanecem sem reteste nesta edição. A regra de movimento reduzido está presente no código. Os testes históricos abaixo conservam seu próprio escopo. Nenhuma certificação WCAG é reivindicada.

A proposta está disponível para leitura crítica com esses limites registrados. A comparação empírica com Serpro e CTS-FGV é pesquisa futura e a interlocução especializada segue sem envios.

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
