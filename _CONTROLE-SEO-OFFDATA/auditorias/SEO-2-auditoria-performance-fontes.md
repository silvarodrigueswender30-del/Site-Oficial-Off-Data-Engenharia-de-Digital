# SEO-2 — Auditoria de Performance: Fontes Criticas Off-Data Digital

**Data:** 2026-06-21
**URL base:** https://www.offdata.digital/
**Fase:** SEO-2 — Performance Mobile e Desbloqueio de Rendering
**Status:** CONCLUIDA — Build aprovado e fontes otimizadas

---

## 1. Contexto e Problema Identificado

Na auditoria SEO-0, foi identificado um problema classificado como P1 (Alto Impacto na Performance):
O arquivo src/styles/globals.css carregava a fonte "Fragment Mono" utilizando a diretiva @import.
O uso de @import no CSS bloqueia o Critical Rendering Path, pois o navegador precisa baixar e interpretar o CSS inteiro antes de iniciar o download da fonte, impactando negativamente as metricas de First Contentful Paint (FCP) e Largest Contentful Paint (LCP) no mobile.

---

## 2. Acoes Realizadas

### 2.1 Remocao do @import
- Arquivo modificado: src/styles/globals.css
- Acao: A linha @import da Google Fonts foi removida e substituida por um comentario.
- As definicoes locais de @font-face para "PP Neue Montreal" permaneceram inalteradas, mantendo a regra font-display: swap.

### 2.2 Adicao de Links no HTML
- Arquivo modificado: public/index.html
- Acao: Adicao da tag link rel=stylesheet correspondente a "Fragment Mono" com a diretiva display=swap.
- As tags link rel=preconnect para fonts.googleapis.com e fonts.gstatic.com ja existiam e foram mantidas.

### 2.3 Decisao sobre Preload
- Tentativa inicial: Foi planejado adicionar link rel=preload para os arquivos locais da "PP Neue Montreal".
- Problema tecnico detectado: O processo de build do CRA adiciona hashes dinamicos aos nomes dos arquivos woff2.
- Resolucao: Links de preload estaticos causariam erros 404 em producao. Como as diretivas locais ja incluem font-display: swap, o fallback ja esta otimizado. Optou-se por nao adicionar preloads manuais.

---

## 3. Validacao do Build

- Comando executado: npm run build
- Resultado: Compilacao bem-sucedida.
- O CSS gerado nao contem mais a instrucao @import. O tamanho do arquivo CSS reduziu de 8.28 kB para 8.21 kB.
- As tags de link no index.html foram preservadas e incorporadas adequadamente.

---

## 4. Validacao Visual

- Nenhuma familia tipografica foi alterada.
- O carregamento da tipografia da HeroSection e demais elementos foi mantido idêntico.

---

## 5. Resumo das Modificacoes

| Arquivo | Mudanca | Impacto |
| --- | --- | --- |
| src/styles/globals.css | Remocao do @import da Fragment Mono. | Evita bloqueio do rendering. |
| public/index.html | Adicao de link rel=stylesheet para Fragment Mono. | Carrega a fonte em paralelo. |

---

## 6. Proximos Passos

- Proxima Fase Sugerida (SEO-3): Otimizacao de imagens e assets. Conversao dos arquivos JPEG gigantes para AVIF/WebP.
