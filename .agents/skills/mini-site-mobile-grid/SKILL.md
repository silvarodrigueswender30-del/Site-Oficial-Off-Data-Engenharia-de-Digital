---
name: mini-site-mobile-grid
description: Regra absoluta de grid e layout para Mini Sites Premium (Link-in-Bio). Frame fixo de 390px, 4 colunas, 24px de margem, 20px de gutter e regras de mídia/vídeo.
---

# Mini Site Mobile Grid System

> **Regra Absoluta**: Este layout é **mobile-only**. Não existe breakpoint desktop funcional — apenas um frame fixo centralizado de 390px simulando a experiência nativa de aplicativo.

## 1. Tokens do Grid (iPhone 14 / Android Large — 390px)

| Token | Valor | Fórmula |
|---|---|---|
| **Frame Width** | `390px` | Referência fixa e inegociável |
| **Margin** | `24px` | Fixo em cada lado (`margin-left` e `margin-right`) |
| **Box Width** | `342px` | `390 - (24 * 2)` (Área útil) |
| **Gutter** | `20px` | Fixo entre colunas |
| **Column Width** | `71px` | `(342 - (20 * 3)) / 4` = 70.5px → arredondado para `71px` |
| **Columns** | `4` | Fixo (4 colunas) |

## 2. CSS Custom Properties (:root)

```css
:root {
  --frame-width: 390px;
  --grid-margin: 24px;
  --grid-gutter: 20px;
  --grid-columns: 4;
  --grid-box-width: calc(var(--frame-width) - (var(--grid-margin) * 2));
  --grid-column-width: calc(
    (var(--grid-box-width) - (var(--grid-gutter) * 3)) / var(--grid-columns)
  );
}

/* Container Principal do Mini Site */
.mini-site-container {
  width: 100%;
  max-width: var(--frame-width);
  margin: 0 auto;
  padding-left: var(--grid-margin);
  padding-right: var(--grid-margin);
  box-sizing: border-box;
  position: relative;
  min-height: 100vh;
}
```

## 3. Tailwind Configuration (Extend)

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      maxWidth: {
        frame: "390px",
      },
      spacing: {
        "grid-margin": "24px",
        "grid-gutter": "20px",
      },
      gridTemplateColumns: {
        "mini-site": "repeat(4, minmax(0, 1fr))",
      },
    },
  },
};
```

## 4. Regras Não-Negociáveis
1. **Nunca use `%` para margins/gutters** — use estritamente os tokens fixos (`24px` e `20px`).
2. **Container raiz sempre `max-width: 390px; margin: 0 auto;`** — mesmo em monitores 4K.
3. **Largura de Cards**: Cards e módulos podem ocupar **1, 2 ou 4 colunas** (nunca 3 colunas) para manter ritmo visual simétrico.
4. **Vídeos de Fundo (`<video>`)**:
   - Atributos obrigatórios: `muted playsInline loop autoPlay`
   - OBRIGATÓRIO: `poster` estático otimizado para o primeiro carregamento.
   - Formato comprimido (WebM/H.264, máximo 2-3MB).
5. **Validação Visual**: Toda validação visual deve ser feita simulando a viewport em **390px** exatos (iPhone 14 / Android Large).
