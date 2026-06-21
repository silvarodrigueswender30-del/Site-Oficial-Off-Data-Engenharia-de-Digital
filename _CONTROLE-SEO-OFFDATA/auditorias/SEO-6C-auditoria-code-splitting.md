# SEO-6C — Auditoria de Code Splitting

**Data:** 2026-06-21
**Fase:** SEO-6C
**Status:** CONCLUÍDA

## 1. Contexto e Problema Original
A aplicação inteira estava agrupada em um único bundle maciço (main.js ~ 648.6 KB). As rotas de serviços, agência, estratégias, políticas, todas eram inicializadas mesmo quando o usuário acessava apenas a Home, prejudicando brutalmente a performance mobile e elevando o FCP/LCP.

## 2. Arquivos Alterados
- src/App.jsx

## 3. Modificações de Code Splitting
- **Imports:** Foram substituídos os 15 import síncronos de páginas secundárias e estratégias por React.lazy(() => import('...')).
- **Renderização Condicional Suspense:** Todas as invocações destas 15 páginas dentro dos condicionais if (path === ...) receberam um Wrapper: <Suspense fallback={null}> <Page /> </Suspense>.
- **Fallback Invisível:** Utilizamos allback={null} para preservar completamente as métricas CLS (Cumulative Layout Shift). Isso previne a injeção de layouts provisórios durante o parser das páginas, garantindo troca nativa na DOM de maneira estática sob ótica visual.

## 4. Evolução do Bundle
- **Tamanho Anterior:** main.js possuía ~648.6 KB (172.22 KB GZIP).
- **Tamanho Atual:** main.js caiu para **453.4 KB** (134.55 KB GZIP).
- **Economia no Carga Inicial:** Quase 200 KB a menos sendo avaliados no dispositivo do usuário antes da Home abrir.
- **Chunks Gerados:** Foram gerados 14 chunks novos contendo estritamente o código e as regras CSS das respectivas páginas isoladas. O maior chunk pesa apenas ~28.8 KB.

## 5. Validação da Camada de Pre-Render
O script generate-static-routes.js foi auditado e executado. Ele edita diretamente as metatags das rotas no <head> das instâncias HTML clonadas a partir do build final. Ele é imune ao Code Splitting React (SPA Lazy Loading), pois opera via substituição de strings. O pre-render foi injetado com total integridade.
