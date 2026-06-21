# SEO-3B — Auditoria: Isolamento Seguro de Imagens Orfas

**Data:** 2026-06-21
**Fase:** SEO-3B — Isolamento de Imagens Originais Pesadas
**Status:** CONCLUIDA (Arquivos isolados com seguranca)

---

## 1. Contexto

Apos o mapeamento da SEO-3A, foram confirmadas 15 imagens pesadas orfas (sem referencias no codigo-fonte) que permaneceram na pasta `public/imagens` como resquicios de substituicoes por AVIF e otimizacoes anteriores. O objetivo desta fase era remover com seguranca esses arquivos da esteira de build do projeto, preservando-os em uma pasta de backup externa isolada, reduzindo drasticamente o tamanho do repositorio e os assets inuteis.

---

## 2. Acoes Realizadas

1.  **Criacao do Backup Local:**
    - Pasta criada: `_backup-imagens-originais-nao-usadas/public-imagens`
    - Sub-arvore de diretorios espelhada para manter o contexto dos originais (`imagem-estrategia`, `imagem-servico`).

2.  **Isolamento de Arquivos:**
    - Comando executado: `Move-Item` (recorte puro, sem delete).
    - 15 arquivos pesados JPG/JPEG/PNG (.jpeg, .png) movidos com sucesso.
    - Peso total isolado e poupado do build: **aproximadamente 41.6 MB**.

3.  **Preservacao Intacta:**
    - A imagem `offdata-digital-og.jpg` permaneceu intocada em `public/imagens/`.
    - Codigo, sitemap, llms.txt e componentes React nao foram modificados.

---

## 3. Arquivos Movidos para o Backup

1. `Performance Web.jpeg` (3.33 MB)
2. `arquiteturaagro-home.jpeg` (3.31 MB)
3. `Automacao Comercial B2B.jpeg` (3.25 MB)
4. `comoseotecnico-img2.jpeg` (3.25 MB)
5. `SEO-LOCAL.jpeg` (3.13 MB)
6. `arquiteturaagro-img2.jpeg` (2.95 MB)
7. `comoseotecnico-hero.jpeg` (2.91 MB)
8. `Landing Pages High Ticket.jpeg` (2.88 MB)
9. `Sites Imersivos.jpeg` (2.64 MB)
10. `trafego-cirurgico-.jpeg` (2.60 MB)
11. `Conteudo Tecnico.jpeg` (2.59 MB)
12. `Landing Pages High Ticket(02).jpeg` (2.54 MB)
13. `trafego-pago.jpeg` (2.44 MB)
14. `trafego-pago2.jpeg` (2.19 MB)
15. `ogimage.png` (1.58 MB)

---

## 4. Validacao Final do Processo

-  Busca em `public/imagens`: Apenas o arquivo ativo `offdata-digital-og.jpg` resta na categoria JPG/PNG. Todas as 15 orfas sairam do escopo.
-  Build de Validacao: Executado (`npm run build`). Sucesso sem erros de missing files.
-  Integridade de Referencias (`Select-String`): Validado que a OG Image ativa continua com 14 referencias validas (`index.html` e `scripts`), enquanto as orfas ausentaram de referencias inativas na stack.

---

## 5. Pendencias e Proximos Passos

Nenhuma pendencia deixada. Processo concluido com sucesso e sem incidentes.

**Proxima fase recomendada (SEO-3C):** Revisar as imagens `AVIF` ativas, garantindo a implementacao de `width`, `height`, `loading="lazy"` ou `fetchpriority="high"` (especialmente para Hero images) visando maximo rating de LCP no Pagespeed mobile.
