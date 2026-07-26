---
name: mini-site-vaul-drawer
description: Guia de implementação da biblioteca Vaul (Drawer / Bottom Sheet) para exibições de catálogo, menus e detalhes de produtos em Mini Sites.
---

# Vaul (Bottom Sheet / Drawer) — Mini Sites Premium

A biblioteca `vaul` é a ferramenta oficial para abas inferiores (Bottom Sheets) nativas estilo iOS/Android.

## 1. Exemplo de Implementação em React

```jsx
import { Drawer } from 'vaul';

export function ProductDrawer({ trigger, title, children }) {
  return (
    <Drawer.Root shouldScaleBackground>
      <Drawer.Trigger asChild>
        {trigger}
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm" />
        <Drawer.Content className="bg-white flex flex-col rounded-t-[20px] h-[85vh] fixed bottom-0 left-0 right-0 max-w-[390px] mx-auto z-50 outline-none">
          <div className="p-4 bg-white rounded-t-[20px] flex-1 overflow-y-auto">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-6" />
            <div className="max-w-md mx-auto">
              <Drawer.Title className="font-semibold text-lg mb-2">{title}</Drawer.Title>
              {children}
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
```

## 2. Boas Práticas Mobile
- Mantenha `max-w-[390px] mx-auto` no `Drawer.Content` para garantir alinhamento com a moldura do Mini Site em telas desktop.
- Inclua o indicador de arrastar (Handle bar: `w-12 h-1.5 bg-gray-300`).
- Utilize snap points quando necessário para pré-visualizações parciais.
