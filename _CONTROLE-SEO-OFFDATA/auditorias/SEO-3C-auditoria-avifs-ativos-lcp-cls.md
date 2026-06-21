# SEO-3C — Auditoria: Otimizacao de AVIFs Ativos / LCP / CLS

**Data:** 2026-06-21
**Fase:** SEO-3C
**Status:** CONCLUIDA

---

## 1. Contexto
Apos removermos as imagens pesadas e orfas na fase SEO-3B, focamos exclusivamente nas imagens `AVIF` ativas (presentes nos arquivos `.jsx`). O objetivo principal foi blindar os Core Web Vitals (LCP e CLS) aplicando os atributos seguros `width`, `height`, `loading`, `decoding` e `fetchpriority` sem modificar o layout estrutural.

---

## 2. AVIFs Ativos Encontrados e Dimensoes

Atraves da leitura dos arquivos `.jsx` e ferramenta Node CLI, levantamos:

**Heroes (2752x1536):**
- `seo-tecnico-autoridade-digital-hero.avif`
- `automacao-operacoes-comerciais-hero.avif`
- `trafego-alta-intencao-b2b-hero.avif`
- `sites-imersivos-clinicas-medicas-hero.avif`
- `performance-web-marcas-high-ticket-hero.avif`
- `seo-local-imobiliarias-luxo-hero.avif`

**Pillars (2048x2048):**
- `seo-tecnico-autoridade-digital-img2.avif`
- `automacao-operacoes-comerciais-img2.avif`
- `trafego-alta-intencao-b2b-img2.avif`
- `sites-imersivos-clinicas-medicas-img2.avif`
- `performance-web-marcas-high-ticket-img2.avif`
- `seo-local-imobiliarias-luxo-img2.avif`

**Servicos / Estrategias Internas:**
- `seo-local.avif` (1792x2400)
- `performance-web-marcas-regionais.avif` (1600x894)

---

## 3. Alteracoes Realizadas

**Imagens Above-the-fold (LCP Candidates):**
Para as imagens nos componentes de Hero das estrategias, foram adicionados/mantidos os seguintes atributos:
- `width="2752"` e `height="1536"`
- `loading="eager"`
- `decoding="async"`
- `fetchPriority="high"`

**Imagens Abaixo da Dobra:**
Para imagens em secoes de Pilares e Missao da Agencia, garantimos a marcacao lazy load:
- `width` e `height` preenchidos com suas dimensoes exatas.
- `loading="lazy"`
- `decoding="async"`

**O Caso Especifico da Home:**
Conforme orientacao e analise estrutural do arquivo `HeroSection.jsx`, constatou-se que o visual principal ("hero") utiliza animacao `Canvas/WebGL` via React e nao uma tag `<img>`. Portanto, a metrica de LCP da Home depende da injecao textual/canvas, nao sendo aplicado `fetchPriority="high"` a imagens neste nivel.

---

## 4. Validacao

- Build aprovado.
- Imagens mantiveram integridade visual. Nao foram tocados CSS ou `src` de assets.
- Adicao nativa de `width` e `height` minimiza Cumulative Layout Shift (CLS) nativo.

---

## 5. Proxima Fase Recomendada
Recomendamos prosseguir com a **SEO-4: Acessibilidade e Headers**, validando a injecao estrita de landmarks ARIA e refinamentos na estrutura de tags de cabecalho para varredura logica perfeita pelo Googlebot.
