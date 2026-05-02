# True Moonverse · Prototype v0.6

Este diretório abriga o protótipo estático do **True Moonverse**: um site-palácio navegável para transformar Moonpedia, memórias, projetos, álbuns e esferas em experiência web.

## O que este MVP prova agora

- **Hall / entrada editorial**: apresenta o Moonverse como revista-enciclopédia dentro de uma mansão viva.
- **Mansão navegável**: salas clicáveis com jurisdição semântica.
- **Atlas Moonpedia**: busca textual + filtros por tipo de página, com status editorial vindo do manifest.
- **Dispositivos de memória**: álbum físico simulado e Máquina Mnésica.
- **Páginas físicas**: cada página abre como arquivo próprio em `pages/*.html`, com `target="_blank"` na home.
- **Página elementar**: `Lunar Editorial Wiki`, combinando leitura editorial e navegação contextual.
- **Modo leitura / modo conhecimento**: alterna entre foco textual e leitura com trilhos laterais nas páginas físicas.
- **Camada de dados**: conteúdo separado em `data/*.json`, preparando integração futura com Moonpedia/Notion.
- **Manifest de governança**: `data/manifest.json` separa status, privacidade, tema, visibilidade e wrapper do conteúdo textual.
- **Vocabulários controlados**: `privacy-states.json`, `taxonomy.json` e `themes.json` reduzem inferência frágil por string solta.
- **Camada editorial v0.6**: `editorial.css` aplica o redesign Medium + Wikiwand + palácio mental sem destruir o CSS legado.
- **Sistema de imagens por tags**: `assets.json`, `image-prompts.json` e `image-sources.json` inauguram curadoria visual antes de importar imagens reais/geradas.
- **Recursos compartilhados**: home usa `styles.css` + `editorial.css` + `app.js`; páginas usam `styles.css` + `editorial.css` + `privacy.css` + `page.js`.
- **Estados de privacidade e status**: páginas físicas exibem selo/ficha de publicável, sanitizado, curadoria, restrito, rascunho, published, draft ou placeholder.
- **Validação automática**: `scripts/validate-data.mjs` verifica consistência entre dados, links e wrappers.
- **Build de páginas**: `scripts/build-pages.mjs` regenera wrappers e detecta drift, já incluindo `editorial.css`.

## Regra arquitetônica atual

> Home é portal; página é documento; schema protege a mansão; a imagem consagra.

A home (`index.html`) não deve embutir verbetes completos nem funcionar como README visual. Ela deve orientar, buscar, sortear e encaminhar. Os verbetes/artigos/memórias/projetos devem abrir em páginas próprias, preferencialmente em nova aba quando acessados a partir da home.

## Arquivos

- `index.html` — portal editorial do Moonverse: Hall, Mansão, Atlas, Álbuns e Máquina Mnésica.
- `styles.css` — camada visual legada/base.
- `editorial.css` — camada de redesign Medium + Wikiwand + palácio mental.
- `privacy.css` — estados visuais de privacidade e status das páginas físicas.
- `app.js` — carregamento dos dados e renderização da home/portal.
- `page.js` — renderizador compartilhado das páginas físicas, usando manifest, privacidade, temas e camada editorial.
- `package.json` — scripts de manutenção local.
- `data/manifest.json` — governança de páginas: status, privacy_state, theme_id, visibilidade e wrapper.
- `data/privacy-states.json` — vocabulário controlado de privacidade.
- `data/taxonomy.json` — vocabulário controlado de status, tipos, salas e relações.
- `data/themes.json` — registro de temas visuais reutilizáveis.
- `data/assets.json` — inventário curável de assets visuais.
- `data/image-prompts.json` — prompts/seeds por tags para candidatos visuais.
- `data/image-sources.json` — política de fontes de imagem.
- `data/rooms.json` — salas da mansão e links semânticos.
- `data/memories.json` — cápsulas de memória usadas no álbum e na Máquina Mnésica.
- `data/pages.json` — conteúdo das páginas do modelo Lunar Editorial Wiki.
- `pages/*.html` — invólucros físicos das páginas, cada um com `data-page-id`.
- `scripts/create-page-wrapper.mjs` — gerador inicial de wrappers físicos ausentes.
- `scripts/build-pages.mjs` — build/check de wrappers físicos a partir de `data/pages.json` e `manifest.json`.
- `scripts/validate-data.mjs` — validação estrutural de links, campos obrigatórios, taxonomia, manifest e wrappers.

## Sistema de imagens

Fluxo recomendado:

```text
tags -> prompt_seed -> candidatos -> aprovação -> assets.json -> renderização
```

Regra:

```text
Nenhuma imagem entra sem alt, tags, source, status, privacy_state e vínculo semântico.
```

A busca aleatória ao vivo por imagem não deve alimentar produção sem curadoria/licença/contexto.

## Como rodar localmente

Não confie em abrir `index.html` diretamente via `file://`, porque `fetch()` de JSON pode falhar dependendo do navegador.

Use GitHub Pages ou rode um servidor local dentro da pasta `moonverse/`:

```bash
npm run serve
```

Depois acesse:

```text
http://localhost:8000
```

## Comandos de manutenção

```bash
npm run validate      # valida dados, links e wrappers
npm run check:pages   # detecta drift entre data/pages.json e pages/*.html
npm run build:pages   # regenera wrappers físicos
npm run build         # valida e regenera wrappers
```

## Doutrina de design

> A mansão encanta; a página sustenta; o schema protege; a imagem consagra.

O True Moonverse não deve ser apenas uma interface bonita. Ele precisa ser explorável como jogo, legível como revista, orientável como wiki moderna e seguro como arquivo com camadas de privacidade, governança e curadoria visual.

## Próximos passos sugeridos

1. Renderizar assets reais quando `data/assets.json` tiver `src` aprovado.
2. Criar `data/albums.json`, para álbuns deixarem de ser chunks automáticos de memórias.
3. Criar links internos entre páginas relacionadas a partir de metadados.
4. Criar páginas de sala em `rooms/*.html` ou um renderizador físico equivalente.
5. Modularizar CSS em `styles/` quando a estética v0.6 estabilizar.
6. Expandir filtros do Atlas por status, privacidade e sala.
7. Transformar placeholders em conteúdo mais próximo do Moonpedia/Notion somente depois da estrutura visual estabilizar.
