---
name: mini-site-qrcode
description: Uso do qrcode.react para geração de QR Codes interativos de compartilhamento em Mini Sites.
---

# QR Code Generator — `qrcode.react`

Permite ao usuário exibir ou compartilhar o QR Code do seu Mini Site / Link-in-Bio de forma dinâmica.

## 1. Exemplo de Implementação em React

```jsx
import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

export function ShareQRCode({ url, logoUrl }) {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-3xl shadow-lg border border-gray-100">
      <QRCodeSVG
        value={url}
        size={200}
        bgColor="#FFFFFF"
        fgColor="#044AB3"
        level="H"
        includeMargin={true}
        imageSettings={logoUrl ? {
          src: logoUrl,
          x: undefined,
          y: undefined,
          height: 36,
          width: 36,
          excavate: true,
        } : undefined}
      />
      <p className="mt-4 text-xs font-medium text-gray-500 text-center">
        Escaneie o código para abrir o perfil oficial
      </p>
    </div>
  );
}
```

## 2. Boas Práticas
- Utilize contraste forte (`fgColor` escuro, `bgColor` claro).
- `level="H"` garante máxima resistência a ruídos para leitura rápida em câmeras de celular.
