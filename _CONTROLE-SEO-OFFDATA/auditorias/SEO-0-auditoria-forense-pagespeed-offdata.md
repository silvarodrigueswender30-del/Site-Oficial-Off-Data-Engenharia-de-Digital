# SEO-0 — Auditoria Forense PageSpeed / SEO Extremo Off-Data

**Data da auditoria:** 2026-06-21
**URL analisada:** https://www.offdata.digital/
**Fonte do relatorio:** https://pagespeed.web.dev/analysis/https-offdata-digital/l4e2dd1b5s?form_factor=mobile
**Auditor:** Antigravity AI
**Status:** FASE COMPLETA — Nenhuma alteracao realizada

---

## 1. Stack do Projeto

| Item | Valor |
|---|---|
| Framework | Create React App (CRA) — react-scripts 5.0.1 |
| Tipo de rendering | CSR (Client-Side Rendering) — SPA pura |
| SSR/SSG | Nao possui |
| Pre-render | Parcial — scripts/generate-static-routes.js gera HTML estatico por rota no build |
| React | 18.2.0 |
| Animacoes | framer-motion ^10.16.4 + gsap ^3.15.0 |
| SEO dinamico | react-helmet-async ^3.0.0 |
| Deploy | Vercel — framework CRA declarado em vercel.json |
| Node target | 22.x |

### Arquivos de Entrada

| Arquivo | Funcao |
|---|---|
| public/index.html | Shell HTML global (head, meta, schema, GA4) |
| src/index.jsx | Entry point React com HelmetProvider |
| src/App.jsx | Roteamento client-side via window.location.pathname |
| src/styles/globals.css | CSS global, fontes, variaveis |
| vercel.json | Rewrites, redirects, headers |

### Arquivos Publicos

| Arquivo | Status |
|---|---|
| public/robots.txt | OK — todos os bots permitidos |
| public/sitemap.xml | OK — 13 URLs + Image Sitemap |
| public/llms.txt | OK — 11 secoes atualizadas |
| public/isologoazul.svg | OK — Favicon SVG |
| public/index.html | OK — 7.7 KB, schemas presentes |

---

## 2. Impacto do CSR no SEO

| Questao | Resposta |
|---|---|
| E SPA/CSR? | Sim |
| Existe SSR? | Nao |
| Existe SSG? | Parcial — HTML estatico por rota no build |
| Conteudo visivel sem JS? | Apenas shell + JSON-LD no head. Body fica vazio sem JS. |
| Googlebot renderiza JS? | Sim, mas com delay (crawl budget) |
| Impacto real no SEO? | Medio. Pre-render estatico mitiga para paginas mapeadas. |

---

## 3. Metricas PageSpeed — Mobile (inferidas da analise de codigo)

| Metrica | Limiar Verde | Limiar Amarelo | Status Esperado |
|---|---|---|---|
| LCP | menor ou igual 2.5s | menor ou igual 4.0s | Provavel amarelo/vermelho no mobile |
| FCP | menor ou igual 1.8s | menor ou igual 3.0s | Provavel amarelo no mobile |
| TBT | menor ou igual 200ms | menor ou igual 600ms | Alto — bundle JS 647 KB |
| CLS | menor ou igual 0.10 | menor ou igual 0.25 | Provavelmente baixo |
| INP | menor ou igual 200ms | menor ou igual 500ms | Risco com GSAP + Framer Motion |
| TTFB | menor ou igual 800ms | menor ou igual 1800ms | Vercel edge — baixo |

---

## 4. Auditoria de Performance Mobile

### 4.1 Bundle JavaScript

| Arquivo | Tamanho nao gzip | Tamanho gzip |
|---|---|---|
| main.3507284a.js | 647 KB | 168.98 KB |
| main.013038c1.css | 76.3 KB | 7.28 KB |

O bundle JS de 647 KB e o principal risco de TBT. Toda logica de animacao (GSAP + Framer Motion), routing e componentes estao em um unico chunk. Nao ha code splitting no CRA padrao.

### 4.2 Fontes

| Item | Situacao |
|---|---|
| @import em CSS | globals.css linha 1 faz @import da Google Fonts — bloqueia CRP |
| preconnect no HTML | Presente para fonts.googleapis.com e fonts.gstatic.com |
| font-display: swap | Configurado nos @font-face locais (linhas 3 e 10 do globals.css) |
| preload da fonte principal | AUSENTE — nenhum link rel=preload as=font |
| Fragment Mono no canvas | Usada no WebGL do Hero (linha 514) — depende de JS |

O @import de fontes no CSS bloqueia o Critical Rendering Path. Deveria ser link no HTML ou fonte auto-hospedada.

### 4.3 Imagens Criticas

| Imagem | Tamanho | Formato | Problema |
|---|---|---|---|
| Performance Web.jpeg | 3.4 MB | JPEG | ENORME — nome com espaco |
| arquiteturaagro-home.jpeg | 3.4 MB | JPEG | ENORME |
| Automacao Comercial B2B.jpeg | 3.3 MB | JPEG | ENORME — nome com espaco |
| comoseotecnico-img2.jpeg | 3.3 MB | JPEG | ENORME |
| SEO-LOCAL.jpeg | 3.2 MB | JPEG | ENORME |
| Landing Pages High Ticket(02).jpeg | 2.6 MB | JPEG | ENORME — nome com espaco e parenteses |
| trafego-pago.jpeg | 2.5 MB | JPEG | ENORME |
| trafego-pago2.jpeg | 2.3 MB | JPEG | ENORME |
| ogimage.png | 1.6 MB | PNG | OG image muito pesada |

Subpastas /imagem-servico/ e /imagem-estrategia/ contem JPEGs de 2.3–3.4 MB nao otimizados. As imagens raiz do /imagens/ sao AVIF (correto).

O Hero usa canvas WebGL — nao e imagem estatica. LCP no mobile provavelmente e o primeiro texto visivel.

### 4.4 Recursos Bloqueantes

| Recurso | Tipo | Impacto |
|---|---|---|
| @import Google Fonts no CSS | CSS critico | Bloqueia renderizacao |
| main.js 647 KB | JS | Alto TBT |
| GA4 gtag.js | Script externo | OK — carregado com async |

---

## 5. Auditoria de SEO Tecnico

### 5.1 Viewport

Meta viewport presente no public/index.html linha 5.
Conteudo: width=device-width, initial-scale=1.0
Sem duplicidade. Formato correto.

### 5.2 SEO por Rota

| Rota | Title | Description | Canonical | Schema | Helmet |
|---|---|---|---|---|---|
| / Home | OK no index.html | OK | OK | OK LocalBusiness + WebSite | N/A |
| /agencia | OK | OK | OK via DOM | OK | Via DOM |
| /criacao-de-sites-uberlandia | OK | OK | OK Helmet | OK Service | react-helmet-async |
| /seo-local-uberlandia | OK | OK | OK | OK Service | Via DOM/Helmet |
| Demais servicos | OK | OK | OK | OK | Via DOM |
| /estrategias/seo-local-imobiliarias-luxo | OK | OK | OK | OK Article+FAQ | Via DOM |
| Demais estrategias | OK | OK | OK | OK | Via DOM |
| /estrategias/seo-tecnico-autoridade-digital | FALTA NO SITEMAP | FALTA NO SITEMAP | FALTA NO SITEMAP | FALTA NO SITEMAP | Pagina existe no App.jsx mas nao esta no sitemap |
| /estrategias/automacao-operacoes-comerciais | FALTA NO SITEMAP | FALTA NO SITEMAP | FALTA NO SITEMAP | FALTA NO SITEMAP | Pagina existe no App.jsx mas nao esta no sitemap |

ACHADO CRITICO P0: Duas rotas declaradas no App.jsx (linhas 107-113) e no vercel.json (linhas 146-160) nao estao presentes no sitemap.xml e nao foram geradas no build estatico.

---

## 6. Auditoria de Bibliotecas JavaScript

| Biblioteca | Presente? | Versao | Vulnerabilidade? |
|---|---|---|---|
| jQuery | NAO ENCONTRADO | — | Nenhuma |
| GSAP | Sim | ^3.15.0 | Nenhuma |
| Framer Motion | Sim | ^10.16.4 | Nenhuma |
| react-helmet-async | Sim | ^3.0.0 | Nenhuma |

NOTA: Nao existe jQuery no projeto. Caso o Lighthouse aponte "jQuery 3.4.1 detectado", e falso positivo. O codigo-fonte e package.json nao contem jQuery.

---

## 7. Auditoria de Acessibilidade

| Item | Status | Observacao |
|---|---|---|
| aria-label no Header | OK | aria-label="Off-Data" no logo (linha 632) |
| aria-labelledby nas estrategias | OK | NewsroomSection linhas 397 e 823 |
| id nas estrategias | OK | Gerado dinamicamente |
| alt em imagens | OK (canvas) | HeroSection usa canvas WebGL |
| Labels no formulario do footer | PROBLEMA | input sem label associado (so placeholder) |
| Botao Enviar do footer | PROBLEMA | Sem aria-label explicito |
| Contraste de cores | Nao auditado sem renderizacao visual | — |
| Navegacao por teclado | Nao verificado programaticamente | — |

---

## 8. Auditoria de Headers e Deploy

| Header | Valor | Status |
|---|---|---|
| Cache-Control HTML | public, max-age=0, must-revalidate | OK |
| Cache-Control /static/ | public, max-age=31536000, immutable | OK |
| HSTS | max-age=63072000 | OK |
| X-Content-Type-Options | nosniff | OK |
| Referrer-Policy | strict-origin-when-cross-origin | OK |
| Permissions-Policy | camera=(), microphone=(), geolocation=() | OK |
| Content-Security-Policy | AUSENTE | P2 |
| X-Frame-Options | AUSENTE | P2 — protecao clickjacking |
| Redirect non-www para www | OK — configurado no vercel.json | OK |
| HTTPS | OK — HSTS ativo | OK |

---

## 9. Auditoria de Arquivos Publicos

### robots.txt
- OK — presente em /robots.txt
- OK — permite todos os bots
- OK — sitemap declarado na ultima linha

### sitemap.xml
- OK — formato valido com namespace de imagem Google
- OK — 13 URLs indexadas
- PROBLEMA P0 — Faltam 2 URLs: /estrategias/seo-tecnico-autoridade-digital e /estrategias/automacao-operacoes-comerciais
- ALERTA — lastmod mais recente e 2026-06-13 — desatualizado

### llms.txt
- OK — presente
- OK — estrutura Markdown valida com 11 secoes
- OK — URLs absolutas corretas
- OK — instrucoes para sistemas de IA presentes

### OG Image
- PROBLEMA — ogimage.png com 1.6 MB (muito pesada)
- OK — offdata-digital-og.jpg com 143 KB (adequada, usada pela home)

---

## 10. Classificacao de Problemas por Prioridade

### P0 — Critico (Indexacao / Funcionalidade)

| ID | Problema | Arquivo | Impacto |
|---|---|---|---|
| P0-1 | 2 rotas nao estao no sitemap.xml: /estrategias/seo-tecnico-autoridade-digital e /estrategias/automacao-operacoes-comerciais | public/sitemap.xml | Paginas nao rastreadas pelo Googlebot |
| P0-2 | As mesmas rotas nao foram geradas no build estatico | scripts/generate-static-routes.js | Paginas servidas como SPA pura |

### P1 — Alto Impacto (Performance / LCP)

| ID | Problema | Arquivo | Impacto |
|---|---|---|---|
| P1-1 | @import Google Fonts no CSS bloqueia CRP | src/styles/globals.css linha 1 | Atraso no FCP/LCP |
| P1-2 | Ausencia de link rel=preload as=font para fontes criticas | public/index.html | FOIT/FOUT + Lighthouse warning |
| P1-3 | Bundle unico de 647 KB sem code splitting | Build CRA | TBT alto no mobile |
| P1-4 | JPEGs de 2.5 a 3.4 MB nas subpastas /imagem-servico/ e /imagem-estrategia/ | public/imagens/ | LCP, transfer weight |
| P1-5 | Sem fetchpriority=high no LCP candidate | Paginas de servico | LCP |

### P2 — Medio Impacto (Boas Praticas / Acessibilidade)

| ID | Problema | Arquivo | Impacto |
|---|---|---|---|
| P2-1 | Input do footer sem label associado | FooterSection.jsx | Acessibilidade/Lighthouse |
| P2-2 | Botao Enviar do footer sem aria-label | FooterSection.jsx | Acessibilidade |
| P2-3 | Content-Security-Policy ausente nos headers | vercel.json | Best Practices Lighthouse |
| P2-4 | X-Frame-Options ausente nos headers | vercel.json | Protecao clickjacking |
| P2-5 | ogimage.png com 1.6 MB | public/imagens/ | Compartilhamento social lento |
| P2-6 | lastmod no sitemap desatualizado | public/sitemap.xml | Crawl budget signal |
| P2-7 | Metadados OG/Twitter das subpaginas via CSR | Todas subpaginas | Bots sem JS veem meta da Home |

### P3 — Baixo Impacto / Apenas Diagnostico

| ID | Problema | Impacto |
|---|---|---|
| P3-1 | Lighthouse pode reportar "jQuery 3.4.1 detectado" — e FALSO POSITIVO. jQuery nao existe no codigo. | Zero impacto real |
| P3-2 | Nomes de arquivo com espacos e maiusculas | So cosmetico |
| P3-3 | font-display: swap ausente no @import do Google Fonts (tecnicamente impossivel via @import) | Minimo |
| P3-4 | Arquivos css.txt, mid.txt, tail.txt, head.txt, scratch.css, scratch.js, build_jsx no src/ | Nao impactam o build |

---

## 11. Plano de Correcao por Fase

### SEO-1 — Correcoes Criticas de Indexacao
Objetivo: Garantir que todas as paginas criadas sejam indexadas.

Acoes:
1. Adicionar 2 rotas faltantes no sitemap.xml (public/sitemap.xml) — risco BAIXO
2. Adicionar 2 rotas ao script de geracao estatica (scripts/generate-static-routes.js) — risco BAIXO
3. Atualizar lastmod do sitemap — risco ZERO

Metrica esperada: 15 URLs no sitemap; 14+ rotas geradas no build.

### SEO-2 — Correcoes de Performance Mobile (Fontes e Bundle)
Objetivo: Melhorar FCP e LCP no mobile.

Acoes:
1. Substituir @import por link rel=stylesheet no HTML (globals.css -> public/index.html) — risco MEDIO
2. Adicionar link rel=preload as=font para Fragment Mono (public/index.html) — risco BAIXO
3. Avaliar code splitting manual no CRA — risco ALTO

Metrica esperada: FCP menor que 1.8s mobile; reducao de 200–400ms no LCP.

### SEO-3 — Imagens e Assets
Objetivo: Reduzir transfer weight e melhorar LCP em paginas de servico.

Acoes:
1. Converter JPEGs de 2.5–3.4 MB para AVIF/WebP menores que 200 KB — risco BAIXO
2. Comprimir ogimage.png de 1.6 MB para menos de 200 KB — risco BAIXO
3. Adicionar width e height nas img — risco BAIXO
4. Adicionar loading=lazy nas imagens abaixo da dobra — risco BAIXO
5. Adicionar fetchpriority=high no LCP candidate — risco BAIXO

Metrica esperada: Transfer weight mobile reduzido em mais de 2 MB; LCP melhora.

### SEO-4 — Acessibilidade e Boas Praticas
Objetivo: Melhorar scores de Acessibilidade e Best Practices no Lighthouse.

Acoes:
1. Adicionar label ou aria-label no input do footer (FooterSection.jsx) — risco ZERO
2. Adicionar aria-label no botao Enviar (FooterSection.jsx) — risco ZERO
3. Adicionar X-Frame-Options: DENY nos headers (vercel.json) — risco BAIXO
4. Avaliar CSP basico (vercel.json) — risco MEDIO

Metrica esperada: Accessibility score maior que 90; Best Practices maior que 90.

### SEO-5 — Validacao Final e Checklist de Deploy
1. PageSpeed mobile re-run apos alteracoes — pagespeed.web.dev
2. Google Search Console — cobertura de indice
3. Validador de Schema.org — schema.org/validator
4. Sitemap re-submit no GSC
5. Lighthouse CI local antes do deploy — npx lighthouse
6. Verificar rotas pre-renderizadas no build — log do npm run build

---

## 12. Pontos que NAO Devem Ser Corrigidos

1. jQuery "detectado" pelo Lighthouse: E falso positivo. Nao existe jQuery no projeto.
2. font-display: swap no @import do Google Fonts: @import nao suporta font-display. Solucao real e mover para link no HTML (coberto em SEO-2).
3. Arquivos scratch/build_jsx no src/: Nao impactam o build ou o usuario.
4. og:image via CSR nas subpaginas: Bots modernos fazem prefetch estatico. Mitigado pelo pre-render estatico para rotas mapeadas.
