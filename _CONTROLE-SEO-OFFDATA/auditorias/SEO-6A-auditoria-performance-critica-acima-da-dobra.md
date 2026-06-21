# SEO-6A — Auditoria de Performance Crítica Acima da Dobra (FCP/LCP)

**Data:** 2026-06-21
**Fase:** SEO-6A
**Status:** DIAGNÓSTICO CONCLUÍDO (Aguardando SEO-6B e 6C)

## 1. Resumo do PageSpeed Final (Mobile)
Após a SEO-5, o Lighthouse apontou:
- **Performance:** 73
- **FCP:** 4.0s (Gargalo principal)
- **LCP:** 4.5s
- **Speed Index:** 5.3s
- **TBT:** 40ms (Razoável)
- **CLS:** 0 (Perfeito)

## 2. Principal causa provável do FCP alto
- **Bundle Monolítico Inicial:** O Javascript possui um único arquivo de 648KB (descompactado) que deve ser baixado, parseado e compilado pelo navegador antes do app hidratar a tela inicial.
- **CPU Bound no Primeiro Paint:** O canvas do HeroSection.jsx agenda um equestAnimationFrame(draw) sincronamente no primeiro useEffect. Isso força a thread principal a processar frames 3D/partículas antes do navegador finalizar o FCP com tranquilidade.
- **CSS Bloqueante:** Um CSS principal (main.css) de 76KB precisa ser avaliado integralmente, além do bloqueio natural do https://fonts.googleapis.com.

## 3. Principal causa provável do LCP alto
O Maior Conteúdo Pintado (LCP) é arrastado pelo FCP. Como a thread principal está engasgada hidratando 648KB de React + renderizando canvas 60fps no JS, o LCP (que provavelmente é o título <h1> do Hero ou o próprio Node do Canvas) é renderizado com 4.5s.

## 4. Recursos Render-blocking
1. <link href="/static/css/main.03993234.css" rel="stylesheet">
2. <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fragment+Mono..." />
*(O JS está com defer, portanto atrasa a hidratação, mas não a construção inicial do DOM).*

## 5. Análise do HeroSection
- **Início Precoce:** O Canvas nativo inicia a malha de partículas (syncLoopState() -> startLoop()) no exato momento da montagem (useEffect). Não aguarda equestIdleCallback nem o FCP ser consolidado no navegador.
- **Sem Lazy Initialization:** A renderização visual entra logo no momento mais custoso do carregamento da página mobile.

## 6. Análise do Bundle e Imports
- **JS:** 1 chunk apenas (main.js ~648KB bruto / 172KB gzip).
- **CSS:** 1 chunk apenas (main.css ~76KB bruto / 8KB gzip).
- **Constatação:** O aplicativo não usa code-splitting. O React renderiza TODAS as rotas (incluindo todas as estratégias e serviços) num mesmo pacote, sem o uso de React.lazy() nem Suspense no App.jsx.

## 7. Imagens Restantes Sem Atributos
O PageSpeed acusa imagens sem width/height explícitos. O pente-fino encontrou as seguintes mídias (SVG/Ícones) que carecem dos atributos:
- logo no FooterSection.jsx (linha 371)
- rrowBlue no CtaBoxSection.jsx
- whiteLogo no LegalPage.jsx
- rrowDiagonal no NewsroomSection.jsx

## 8. Navegação Agêntica
- O botão de Hamburger Mobile (Header.jsx) é um <div className="hamburger_link" onClick={...}>. Ele não possui a tag <button>, não possui ole="button" nem ria-label. Isso inviabiliza que agentes de IA e leitores de tela entendam-no facilmente como clicável na carga agêntica.
- Os links do menu utilizam tags <a> corretas.

## 9. Plano de Correção por Prioridade

### SEO-6B: Correções Seguras (Baixo Risco)
1. Adicionar width e height fixos nas imagens logo, whiteLogo, rrowBlue e rrowDiagonal.
2. Converter a div do Hamburger Menu para uma estrutura semanticamente agêntica (<button aria-label="Abrir Menu"> ou aplicar ole="button" e 	abIndex="0").

### SEO-6C: Code Splitting (Risco Médio)
1. Refatorar o App.jsx aplicando React.lazy nas páginas e estratégias, reduzindo drasticamente o bundle inicial da Home de 648KB para ~200KB bruto.

### SEO-6D: Hero/Canvas Lazy Init (Risco Médio/Alto)
1. Adicionar um atraso intencional (setTimeout ou equestIdleCallback) na primeira chamada de animação do Canvas, garantindo que o CPU apenas inicie a renderização da particula após o FCP estar impresso.
