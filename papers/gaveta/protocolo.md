# Protocolo prospectivo de avaliação e critérios de refutação

**Artigo:** Continuidade contextual entre fontes e instituições
**Autoria:** Lua Helena Moon Martins Cardoso
**Versão:** 0.1, 03/11/2026
**Estado:** metodologia proposta; nenhum estudo com participantes ou dados reais foi executado.

## Pergunta e hipóteses

Testar se o registro explícito de raízes documentais, contradições, versões e revisões humanas melhora a reconstrução de hipóteses documentais em relação a uma síntese convencional competente.

H1 candidata: a condição contextual reduz falsa corroboração e falhas de atualização de hipóteses. H0: não apresenta benefício incremental consistente, ou o custo excede o benefício. Nenhum resultado deste artigo permite rejeitar H0.

## Materiais

O arquivo corpus-sintetico.json preserva os 13 registros fictícios F01 a F13 e as quatro hipóteses do ensaio PR-016 V1.1. Três organizações inventadas, identificadas por A, B e C, trocam informações sobre uma caixa rotulada E-17.

A afirmação documental CLM-001 possui cinco registros vinculados: F02, F04, F05, F07 e F12. Eles representam apenas **uma raiz documental** para essa afirmação. F07 é retificação de F02; F12 é recibo de retificação, não corroboração. F06 e F09 são fontes contraditórias em raízes diferentes. A conclusão apropriada é que o destino e a localização precisa de E-17 permanecem desconhecidos. Uma raiz documental não é certificação de independência factual, autenticidade ou valor probatório.

## Condições de comparação

| Eixo | A: documento convencional | B: contrato contextual |
| --- | --- | --- |
| Material | Mesmo corpus F01–F13 | Mesmo corpus F01–F13 |
| Síntese | Prosa clara e histórico simples | Afirmações ligadas a raízes e versões |
| Contradições | Indicações no texto | Ligações explícitas aos documentos |
| Retificação | Notas de revisão | Transição temporal e propagação limitada |
| Perguntas e tempo | Idênticos | Idênticos |

**Regra de desenho:** não enfraquecer deliberadamente a condição A para favorecer a condição B.

## Procedimento futuro (não realizado)

1. Predefinir amostra, critérios de inclusão, medidas primárias, método de análise e plano de exclusões.
2. Obter revisão ética e consentimento cabíveis, minimizando o armazenamento de dados de participantes.
3. Randomizar A/B em grupos ou contrabalancear ordem em desenho intra-sujeitos; medir efeitos de aprendizagem.
4. Apresentar instruções equivalentes e perguntas idênticas sem revelar a preferência do autor.
5. Exigir resposta à origem e independência de CLM-001, ao papel de F06 e F09, à retificação F07, ao recibo F12 e à conclusão legítima sobre E-17.
6. Medir acurácia, retorno à fonte, preservação de contradições, tempo, autoconfiança e carga de trabalho.
7. Usar gabarito congelado e correção cega por avaliadores independentes com adjudicação de desacordos.
8. Publicar resultados negativos e incertezas, com análise predefinida e sem afirmar impacto operacional.

Sem participantes, é possível apenas testar consistência computacional das regras, não melhora do julgamento humano.

## Indicadores operacionais

- Falsa independência: frequência com que F02, F04, F05, F07 e F12 são contados como múltiplas confirmações.
- Rastreio: precisão do vínculo entre sínteses e fontes originais.
- Revisão temporal: identificação de hipóteses afetadas pela retificação.
- Reconhecimento de contradição: incorporação de F06/F09 sem fingir que os registros são automaticamente conclusivos.
- Abstenção: reconhecimento do estado desconhecido.
- Custos: tempo, erro, sobrecarga e falsa confiança.

## Critérios de falsificação

A proposta perde força se a linha de base competente alcança desempenho semelhante; se o custo e o risco de manutenção aumentam; se a genealogia é confundida com confiabilidade; se houver duplicação funcional com instituições já existentes; se a circulação contrariar competências, finalidade ou sigilo; ou se a estrutura aumentar confiança subjetiva sem melhorar precisão.

## Segurança e ética

Este corpus não contém pessoas reais, dados policiais, inteligência ou procedimento de investigação. Não usar para detecção de suspeitos, perfilamento, decisões coercitivas ou segurança de sistemas reais. Qualquer controle de acesso dentro do HTML é apenas visual, pois o corpus é legível no código. Estudos com pessoas e instituições exigem governança e exame jurídico e ético próprios.

## Estado de prova

- Observado no material de origem: QA de 33 testes do demonstrador fictício PR-016 V1.1, ligado ao comportamento de interface e consistência.
- Proposto neste artigo: protocolo A/B com avaliadores.
- Não observado: melhora cognitiva, interoperabilidade, eficácia policial, revisão por pares ou validação institucional.

## Reprodutibilidade

Congele versão e SHA-256 do arquivo JSON antes do estudo. Preserve os documentos fictícios, pré-registre as respostas corretas e publique erros e resultados nulos. Não vincule números de mensagens institucionais, respostas privadas ou endereços de pessoas a este repositório.

## Referências iniciais

- W3C PROV-O: https://www.w3.org/TR/prov-o/
- Buneman, Khanna & Tan (2001): https://doi.org/10.1007/3-540-44503-X_20
- Doyle (1979): https://doi.org/10.1016/0004-3702(79)90008-0
- Alchourrón, Gärdenfors & Makinson (1985): https://www.cambridge.org/core/journals/journal-of-symbolic-logic/article/abs/on-the-logic-of-theory-change-partial-meet-contraction-and-revision-functions/7ED837BAD5FB6D9A7C77906D73527F9C
- Dung (1995): https://doi.org/10.1016/0004-3702(94)00041-X
- Lei 13.675/2018: https://legis.senado.gov.br/norma/27394952/publicacao/27397218
- Portaria Infoseg 1.248/2026: https://bibliotecadigital.mj.gov.br/handle/1/17378
- PEC 18/2025: https://www25.senado.leg.br/web/atividade/materias/-/materia/172997/votacoes

**Fronteira:** protocolo de pesquisa, não protocolo policial.