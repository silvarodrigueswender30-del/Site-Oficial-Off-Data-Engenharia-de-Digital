---
name: mini-site-lenis-smooth-scroll
description: Configuração e otimização do Lenis Smooth Scroll para rolagem fluida em Mini Sites Premium (390px).
---

# Lenis Smooth Scroll — Mini Sites Premium

O `lenis` entrega rolagem com física inercial suave em páginas longas de Mini Sites.

## 1. Inicialização em React

```jsx
import React, { useEffect } from 'react';
import Lenis from 'lenis';

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);
}
```

## 2. Ajuste para Viewport Mobile (390px)
- Mantenha `touchMultiplier` calibrado em `1.5` a `2.0` para resposta precisa ao polegar no mobile.
- Certifique-se de pausar a rolagem do Lenis ao abrir Modais ou Drawers da biblioteca `vaul`.
