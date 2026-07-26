---
name: mini-site-image-pipeline
description: Pipeline de otimização de imagem e geração de blur placeholders com Sharp e Plaiceholder para carregamento instantâneo.
---

# Sharp & Plaiceholder — Otimização de Imagens

Garante carregamento rápido com placeholders desfocados (blur-up) antes do carregamento da imagem completa.

## 1. Geração de Blur Placeholder (Node.js / Build / Server Script)

```javascript
import fs from 'node:fs/promises';
import { getPlaiceholder } from 'plaiceholder';
import sharp from 'sharp';

export async function processImage(imagePath) {
  // 1. Redimensiona e otimiza via Sharp
  const optimizedBuffer = await sharp(imagePath)
    .resize(780) // 2x para telas Retina no frame 390px
    .toFormat('avif', { quality: 80 })
    .toBuffer();

  // 2. Gera o placeholder desfocado Base64 via Plaiceholder
  const { base64 } = await getPlaiceholder(optimizedBuffer);

  return {
    base64,
    optimizedBuffer
  };
}
```

## 2. Exemplo de Componente React com Blur Placeholder

```jsx
import React, { useState } from 'react';

export function BlurImage({ src, blurDataURL, alt, ...props }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative overflow-hidden bg-gray-100 rounded-2xl">
      {/* Blur Placeholder */}
      {!loaded && (
        <img
          src={blurDataURL}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover filter blur-lg scale-105"
        />
      )}
      {/* Imagem Real */}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        {...props}
      />
    </div>
  );
}
```
