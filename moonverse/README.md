# True Moonverse · Prototype v0.2

Este diretório abriga o protótipo estático do **True Moonverse**: um site-palácio navegável para transformar Moonpedia, memórias, projetos, álbuns e esferas em experiência web.

## O que este MVP prova agora

- **Hall / entrada simbólica**: apresenta o Moonverse como casa-arquivo.
- **Mansão navegável**: salas clicáveis com jurisdição semântica.
- **Atlas Moonpedia**: busca textual + filtros por tipo de página.
- **Dispositivos de memória**: álbum físico simulado e Máquina Mnésica.
- **Página elementar**: `Lunar Editorial Wiki`, combinando leitura editorial e navegação contextual.
- **Modo leitura / modo conhecimento**: alterna entre foco textual e leitura com trilhos laterais.
- **Camada de dados**: conteúdo separado em `data/*.json`, preparando integração futura com Moonpedia/Notion.
- **Estrutura estática simples**: HTML, CSS e JavaScript, sem framework e sem dependências externas.

## Arquivos

- `index.html` — estrutura do protótipo.
- `styles.css` — estética lunar/editorial/wiki, responsividade, Atlas e modo leitura.
- `app.js` — carregamento dos dados, renderização de salas, Atlas, álbum, sorteio e páginas.
- `data/rooms.json` — salas da mansão e links semânticos.
- `data/memories.json` — cápsulas de memória usadas no álbum e na Máquina Mnésica.
- `data/pages.json` — páginas-piloto do modelo Lunar Editorial Wiki.

## Como abrir

Abra `moonverse/index.html` diretamente no navegador ou publique via GitHub Pages apontando para este repositório/pasta.

## Doutrina de design

> A mansão encanta; a página sustenta.

O True Moonverse não deve ser apenas uma interface bonita. Ele precisa ser explorável como jogo, legível como revista, orientável como wiki moderna e seguro como arquivo com camadas de privacidade.

## Próximos passos sugeridos

1. Criar assets reais/gerados para hero images, álbuns e esferas.
2. Refinar mobile em dispositivos reais.
3. Transformar páginas-piloto em conteúdo mais próximo do Moonpedia/Notion.
4. Criar roteamento por hash ou páginas independentes para URLs compartilháveis.
5. Acrescentar estados de privacidade visual: público, sanitizado, privado-referencial, não publicável.
6. Criar coleção de álbuns, não apenas um álbum da infância.
7. Integrar um pipeline semi-manual Notion/Moonpedia → JSON.
