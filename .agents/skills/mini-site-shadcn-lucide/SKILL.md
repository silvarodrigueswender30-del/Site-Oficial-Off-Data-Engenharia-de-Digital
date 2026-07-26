---
name: mini-site-shadcn-lucide
description: Padrões de uso de ícones Lucide (lucide-react) e componentes shadcn/ui adaptados ao frame de 390px.
---

# shadcn/ui & Lucide React — Mini Sites Premium

## 1. Lucide Icons (`lucide-react`)
Importe os ícones diretamente do pacote `lucide-react` garantindo tree-shaking:

```jsx
import { Instagram, MapPin, Phone, ShoppingBag, ArrowRight } from 'lucide-react';

export function ActionButtons() {
  return (
    <div className="flex gap-2">
      <Instagram className="w-5 h-5 text-pink-600" strokeWidth={1.75} />
      <MapPin className="w-5 h-5 text-blue-600" strokeWidth={1.75} />
    </div>
  );
}
```

### Regras para Ícones no Grid de 390px:
- **Tamanho padrão de ícones**: `20px` (utilize `w-5 h-5` no Tailwind) para botões de ação rápidos.
- **Ícones de destaque**: `24px` (`w-6 h-6`).
- **Stroke Width**: `1.75` ou `2.0` para manter visual limpo em telas OLED de alta densidade.

## 2. shadcn/ui Adaptações Mobile
- Todos os dialogs, popovers e cards de shadcn/ui devem ser restringidos a `max-w-[342px]` (área útil do grid).
- Utilize estilos com bordas suaves (`rounded-2xl` ou `rounded-3xl`) alinhados ao visual de apps nativos iOS/Android.
