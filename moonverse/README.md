# True Moonverse · Prototype v0.3

Este diretório abriga o protótipo estático do **True Moonverse**: um site-palácio navegável para transformar Moonpedia, memórias, projetos, álbuns e esferas em experiência web.

## O que este MVP prova agora

- **Hall / entrada simbólica**: apresenta o Moonverse como casa-arquivo.
- **Mansão navegável**: salas clicáveis com jurisdição semântica.
- **Atlas Moonpedia**: busca textual + filtros por tipo de página.
- **Dispositivos de memória**: álbum físico simulado e Máquina Mnésica.
- **Páginas físicas**: cada página abre como arquivo próprio em `pages/*.html`, com `target="_blank"` na home.
- **Página elementar**: `Lunar Editorial Wiki`, combinando leitura editorial e navegação contextual.
- **Modo leitura / modo conhecimento**: alterna entre foco textual e leitura com trilhos laterais nas páginas físicas.
- **Camada de dados**: conteúdo separado em `data/*.json`, preparando integração futura com Moonpedia/Notion.
- **Recursos compartilhados**: todas as páginas usam `styles.css` e `page.js`, evitando duplicação de layout.

## Regra arquitetônica atual

> Home é portal; página é documento.

A home (`index.html`) não deve embutir verbetes completos. Ela deve orientar, buscar, sortear e encaminhar. Os verbetes/artigos/memórias/projetos devem abrir em páginas próprias, preferencialmente em nova aba quando acessados a partir da home.

## Arquivos

- `index.html` — portal do Moonverse: Hall, Mansão, Atlas, Álbuns e Máquina Mnésica.
- `styles.css` — estética lunar/editorial/wiki, responsividade, Atlas, modo leitura e páginas físicas.
- `app.js` — carregamento dos dados e renderização da home/portal.
- `page.js` — renderizador compartilhado das páginas físicas.
- `data/rooms.json` — salas da mansão e links semânticos.
- `data/memories.json` — cápsulas de memória usadas no álbum e na Máquina Mnésica.
- `data/pages.json` — conteúdo das páginas do modelo Lunar Editorial Wiki.
- `pages/*.html` — invólucros físicos das páginas, cada um com `data-page-id`.

## Páginas físicas criadas

- `pages/maresia.html`
- `pages/moon-source.html`
- `pages/sims.html`
- `pages/me-tornando.html`
- `pages/casa-arca.html`
- `pages/lithia.html`

## Como abrir

Abra `moonverse/index.html` diretamente no navegador ou publique via GitHub Pages apontando para este repositório/pasta.

## Doutrina de design

> A mansão encanta; a página sustenta.

O True Moonverse não deve ser apenas uma interface bonita. Ele precisa ser explorável como jogo, legível como revista, orientável como wiki moderna e seguro como arquivo com camadas de privacidade.

## Próximos passos sugeridos

1. Criar assets reais/gerados para hero images, álbuns e esferas.
2. Refinar mobile em dispositivos reais.
3. Transformar páginas-piloto em conteúdo mais próximo do Moonpedia/Notion.
4. Automatizar criação de wrappers `pages/*.html` para novos IDs em `data/pages.json`.
5. Acrescentar estados de privacidade visual: público, sanitizado, privado-referencial, não publicável.
6. Criar coleção de álbuns, não apenas um álbum da infância.
7. Integrar um pipeline semi-manual Notion/Moonpedia → JSON.
