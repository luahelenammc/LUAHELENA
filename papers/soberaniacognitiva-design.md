# Soberania Cognitiva Brasileira — implementação e direção de design

**Página:** `papers/soberaniacognitiva.html`  
**Versão:** 1.0 — 18/07/2026  
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

