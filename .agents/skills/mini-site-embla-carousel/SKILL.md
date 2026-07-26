---
name: mini-site-embla-carousel
description: Padrões de implementação do Embla Carousel para carrosséis de cards e produtos em Mini Sites Premium (390px).
---

# Embla Carousel — Mini Sites Premium

Utilize o `embla-carousel-react` para criar carrosséis de produtos, galerias de fotos e depoimentos adaptados perfeitamente ao grid de 390px.

## 1. Estrutura Padrão em React

```jsx
import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';

export function CardCarousel({ items }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: false,
    loop: false
  });

  return (
    <div className="embla overflow-hidden" ref={emblaRef}>
      <div className="embla__container flex gap-[20px]">
        {items.map((item, index) => (
          <div key={index} className="embla__slide flex-[0_0_280px] min-w-0">
            {/* Card Content */}
          </div>
        ))}
      </div>
    </div>
  );
}
```

## 2. Alinhamento com o Grid de 390px
- O container do Embla deve respeitar o `gap` de `20px` (variável `--grid-gutter`).
- O primeiro slide deve alinhar com a margem de `24px` (`--grid-margin`).
- Habilite o suporte a gestos de swipe com física suave (`containScroll: 'trimSnaps'`).
