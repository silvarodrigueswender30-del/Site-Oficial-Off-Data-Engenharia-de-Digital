# SEO-3A — Auditoria: Varredura de Imagens Orfas (JPG/JPEG/PNG)

**Data:** 2026-06-21
**Fase:** SEO-3A — Diagnostico de Imagens Antigas e Orfas
**Status:** CONCLUIDA (Apenas Mapeamento, sem alteracoes)

---

## 1. Contexto

Apos a otimizacao de performance na SEO-2, o foco mudou para reducao do peso do repositorio e da pasta public. Inumeras imagens originais pesadas (.jpeg, .png) permaneceram na pasta `public/imagens` mesmo apos terem sido substituidas por versoes `.avif` no codigo-fonte. 
Nenhuma acao destrutiva ou de movimentacao foi realizada nesta fase, apenas o levantamento forense.

---

## 2. Estatisticas Gerais

- Total de JPG/JPEG/PNG encontrados: 16 arquivos
- Total de AVIF encontrados: 26 arquivos
- Imagens acima de 2 MB: 14 arquivos
- Imagens entre 1 MB e 2 MB: 1 arquivo (`ogimage.png`)
- Imagens abaixo de 500 KB: 1 arquivo (`offdata-digital-og.jpg`)

- Status "ATIVO": 1 arquivo (`offdata-digital-og.jpg`)
- Status "ORFAO PROVAVEL": 15 arquivos

**Economia Potencial de Espaco (se isolados):** ~41.6 MB de reducao na pasta `public`.

---

## 3. Tabela de Mapeamento de Imagens Pesadas

| Arquivo | Peso | Caminho | AVIF equivalente provavel | Referenciado no codigo? | Onde aparece | Status | Recomendacao |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Performance Web.jpeg | 3.33 MB | public/imagens/imagem-servico/ | performance-web.avif | Nao | - | ORFAO PROVAVEL | Isolar em backup |
| arquiteturaagro-home.jpeg | 3.31 MB | public/imagens/imagem-estrategia/ | seo-local-imobiliarias-luxo-hero.avif (hipotese) | Nao | - | ORFAO PROVAVEL | Isolar em backup |
| Automacao Comercial B2B.jpeg | 3.25 MB | public/imagens/imagem-servico/ | automacao-comercial-b2b.avif | Nao | - | ORFAO PROVAVEL | Isolar em backup |
| comoseotecnico-img2.jpeg | 3.25 MB | public/imagens/imagem-estrategia/ | seo-tecnico-autoridade-digital-img2.avif (hipotese) | Nao | - | ORFAO PROVAVEL | Isolar em backup |
| SEO-LOCAL.jpeg | 3.13 MB | public/imagens/imagem-servico/ | seo-local.avif | Nao | - | ORFAO PROVAVEL | Isolar em backup |
| arquiteturaagro-img2.jpeg | 2.95 MB | public/imagens/imagem-estrategia/ | seo-local-imobiliarias-luxo-img2.avif (hipotese) | Nao | - | ORFAO PROVAVEL | Isolar em backup |
| comoseotecnico-hero.jpeg | 2.91 MB | public/imagens/imagem-estrategia/ | seo-tecnico-autoridade-digital-hero.avif (hipotese) | Nao | - | ORFAO PROVAVEL | Isolar em backup |
| Landing Pages High Ticket.jpeg | 2.88 MB | public/imagens/imagem-servico/ | landing-pages-high-ticket.avif | Nao | - | ORFAO PROVAVEL | Isolar em backup |
| Sites Imersivos.jpeg | 2.64 MB | public/imagens/imagem-servico/ | sites-imersivos.avif | Nao | - | ORFAO PROVAVEL | Isolar em backup |
| trafego-cirurgico-.jpeg | 2.60 MB | public/imagens/imagem-servico/ | trafego-cirurgico.avif | Nao | - | ORFAO PROVAVEL | Isolar em backup |
| Conteudo Tecnico.jpeg | 2.59 MB | public/imagens/imagem-servico/ | conteudo-tecnico.avif | Nao | - | ORFAO PROVAVEL | Isolar em backup |
| Landing Pages High Ticket(02).jpeg | 2.54 MB | public/imagens/ | landing-pages-high-ticket.avif | Nao | - | ORFAO PROVAVEL | Isolar em backup |
| trafego-pago.jpeg | 2.44 MB | public/imagens/ | trafego-pago-uberlandia (hipotese) | Nao | - | ORFAO PROVAVEL | Isolar em backup |
| trafego-pago2.jpeg | 2.19 MB | public/imagens/ | trafego-pago-uberlandia (hipotese) | Nao | - | ORFAO PROVAVEL | Isolar em backup |
| ogimage.png | 1.58 MB | public/imagens/ | offdata-digital-og.jpg (atual) | Nao | - | ORFAO PROVAVEL | Isolar em backup |
| offdata-digital-og.jpg | 0.14 MB | public/imagens/ | (nao aplica) | Sim | index.html e js | ATIVO | Manter |

---

## 4. Validacao de Referencias

- Busca Rigorosa (`Select-String`): Uma varredura completa foi executada nos arquivos `.js, .jsx, .html, .css, .xml`. 
- Resultado: Apenas a imagem `offdata-digital-og.jpg` e ativamente referenciada (em `public/index.html` e `scripts/generate-static-routes.js`). Todas as outras listadas acima não apresentam nenhuma ocorrencia no codigo.
- **Nota:** Os `.png` referenciados em `ProductsSection.jsx` sao originados de um CDN externo (website-files.com) e nao possuem relacao com os arquivos locais mapeados.

---

## 5. Proxima Fase Sugerida

A recomendacao tecnica segura e avancar para a Fase **SEO-3B — Isolamento Seguro de Imagens Originais Pesadas**, onde os 15 arquivos isolados serao retirados de `public/imagens` e transferidos para uma pasta dedicada de backup.
