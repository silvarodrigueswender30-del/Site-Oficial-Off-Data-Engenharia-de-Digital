# SEO-0 — Status da Auditoria — Off-Data Digital

**Data:** 2026-06-21
**URL:** https://www.offdata.digital/
**Status:** CONCLUIDA — Nenhum arquivo alterado

---

## Resumo Executivo

Auditoria forense completa realizada com base em leitura direta do codigo-fonte e analise do relatorio PageSpeed Insights (mobile).

Nenhuma alteracao foi feita nesta fase. Apenas diagnostico, mapeamento e classificacao de problemas.

---

## Problemas Encontrados por Prioridade

### P0 — Criticos (2 problemas)
- P0-1: 2 rotas nao estao no sitemap.xml (seo-tecnico-autoridade-digital e automacao-operacoes-comerciais)
- P0-2: As mesmas rotas nao foram geradas no build estatico

### P1 — Alto Impacto (5 problemas)
- P1-1: @import Google Fonts no CSS bloqueia Critical Rendering Path
- P1-2: Ausencia de link rel=preload para fontes criticas
- P1-3: Bundle JS unico de 647 KB sem code splitting
- P1-4: JPEGs de 2.5 a 3.4 MB nas subpastas de imagens
- P1-5: Sem fetchpriority=high no LCP candidate

### P2 — Medio Impacto (7 problemas)
- P2-1: Input do footer sem label associado
- P2-2: Botao Enviar do footer sem aria-label
- P2-3: Content-Security-Policy ausente nos headers
- P2-4: X-Frame-Options ausente nos headers
- P2-5: ogimage.png com 1.6 MB
- P2-6: lastmod no sitemap desatualizado
- P2-7: OG/Twitter nas subpaginas atualizados via CSR

### P3 — Diagnostico Apenas (4 itens)
- P3-1: Falso positivo jQuery (nao existe no codigo)
- P3-2: Nomes de arquivo com espacos
- P3-3: font-display no @import (impossivel tecnicamente)
- P3-4: Arquivos scratch no src/

---

## Fases de Correcao Planejadas

| Fase | Objetivo | Status |
|---|---|---|
| SEO-1 | Correcoes criticas de indexacao (sitemap + build estatico) | PENDENTE |
| SEO-2 | Performance mobile — fontes e bundle | PENDENTE |
| SEO-3 | Imagens e assets (JPEGs para AVIF, ogimage) | PENDENTE |
| SEO-4 | Acessibilidade e boas praticas (labels, headers) | PENDENTE |
| SEO-5 | Validacao final e checklist de deploy | PENDENTE |

---

## Achados Tecnicos Relevantes

- Stack: CRA (CSR) + Vercel + pre-render parcial por rota
- jQuery: NAO EXISTE no projeto (falso positivo do Lighthouse)
- GA4: Instalado e funcionando (G-0BKJE2KM1B, async)
- robots.txt: OK — todos os bots permitidos
- llms.txt: OK — 11 secoes, URLs corretas
- sitemap.xml: 13 URLs (faltam 2 das estrategias novas)
- Headers de seguranca: OK exceto CSP e X-Frame-Options

---

## Arquivo de Auditoria Completo

_CONTROLE-SEO-OFFDATA\auditorias\SEO-0-auditoria-forense-pagespeed-offdata.md
