# SEO-4 — Auditoria: Acessibilidade, Landmarks e Headers de Seguranca

**Data:** 2026-06-21
**Fase:** SEO-4
**Status:** CONCLUIDA

---

## 1. Contexto
Apos concluirmos a otimizacao massiva de performance das imagens nas fases SEO-3, focamos nesta fase no aprimoramento da acessibilidade, semantica do HTML5 (Landmarks) e cabecalhos de seguranca. O objetivo foi limpar alertas do Lighthouse sobre falta de rotulos e landmarks principais (`<main>`), alem de implementar bloqueio a `iframe` (clickjacking) sem comprometer o layout existente, a funcionalidade do GA4 ou do canvas WebGL.

---

## 2. Arquivos Analisados e Alterados

### Arquivos Analisados:
- `src/App.jsx`
- `src/components/sections/FooterSection.jsx`
- `src/components/Header.jsx`
- `src/components/sections/HeroSection.jsx`
- `src/components/agency/AgencyPage.jsx`
- `vercel.json`

### Arquivos Alterados:
- **`src/App.jsx`**: Inserida a tag `<main>` envolvendo as secoes da landing page e conteudo do 404.
- **`src/components/sections/HeroSection.jsx`**: Alterada a tag raiz de `<main>` para `<section id="home">`, evitando aninhamento de multiplos `<main>`.
- **`src/components/sections/FooterSection.jsx`**: Adicionados atributos `aria-label` no `input` de e-mail e no `button` de Enviar, assegurando rastreamento acessivel.
- **`vercel.json`**: Adicionado cabecalho `X-Frame-Options: DENY`.

---

## 3. Correcoes de Landmarks e Acessibilidade

**Landmarks Semanticos:**
Identificamos que a `Header.jsx` ja usava corretamente a tag `<header>` e o `FooterSection.jsx` ja usava a tag `<footer>`. Porem, a raiz do projeto (no `App.jsx`) estava empilhando componentes soltos numa `div`. Ajustamos agrupando todo o corpo visual do React no landmark `<main>`. A secao Hero (`HeroSection`), que atuava inadequadamente como `<main>`, foi transformada em `<section id="home">`.

**Formulario do Footer (Newsletter):**
Sem mexer nas mascaras visuais ou nos placeholders, injetamos:
- `input`: `aria-label="Seu e-mail profissional para receber novidades da Off-Data"`
- `button`: `aria-label="Enviar formulario para falar com a Off-Data"`
A validacao de preenchimento (`required`, `checkValidity`) e o tracking `newsletter_submit` no GA4 foram integralmente mantidos intocados.

---

## 4. Cabecalhos de Seguranca (Headers e CSP)

**X-Frame-Options:**
Em `vercel.json`, implementado globalmente o cabecalho `X-Frame-Options: DENY`, garantindo mitigacao imediata a clickjacking.

**Auditoria e Decisao sobre Content-Security-Policy (CSP):**
A arquitetura do projeto injeta blocos literais de `<style>` dentro do JSX (CSS-in-JS inline) e o `HeroSection` depende exclusivamente do DOM/WebGL via manipulacao inline pesada, o que exige politicas brandas com `'unsafe-inline'` para estilos e scripts (GA4). 
**Decisao Segura:** Conforme orientacao ("aplicar CSP somente se segura"), optamos por NAO aplicar o CSP global neste ciclo e apenas documentar o framework para a fase **SEO-4B**.

*CSP sugerida para homologacao (SEO-4B):*
`default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https:; connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self';`

---

## 5. Build e Validacao

- Build React `npm run build` executado e aprovado com sucesso.
- Estrutura preservada. Layout visual, GA4 e WebGL blindados (nenhum erro).

---

## 6. Proxima Fase Recomendada
Recomendamos a fase **SEO-5 — Validacao Final e Deploy**, garantindo o push de todas estas alteracoes combinadas em producao e monitoramento das taxas vitais na Search Console / Vercel Analytics apos o deploy. E recomendada homologacao posterior isolada para a criacao da policy fina de CSP (Fase SEO-4B).
