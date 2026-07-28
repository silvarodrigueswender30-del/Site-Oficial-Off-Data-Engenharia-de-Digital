---
name: mini-site-mobile-grid
description: Regra absoluta de grid e layout para Mini Sites Premium (Link-in-Bio). Frame de referência de 390px, container fluido max-width 430px, 4 colunas, 24px de margem lateral em ms-content e fundo Hero full-bleed.
---

# Mini Site Mobile Grid Skill

Esta skill define as regras inegociáveis de layout e grid para Mini Sites Premium (link-in-bio).

## Regras de Estrutura
- **Container Raiz (`.ms-container`)**: `width: 100%; max-width: 430px; margin: 0 auto; overflow-x: hidden;`
- **Vídeo/Fundo Hero**: Camada Full-Bleed sem padding (`absolute inset-0 w-full h-full`), cobrindo 100% da largura real do smartphone.
- **Conteúdo e Cards (`.ms-content`)**: `padding: 0 24px` e `grid-gap: 20px`.
- **4 Colunas**: 1, 2 ou 4 colunas por card (nunca 3).
- **Referência de Design**: 390px (iPhone 14 / Android Large) para cálculo visual.
