---
name: mini-site-motion
description: Diretrizes de animação e micro-interações usando a biblioteca Motion (versão atualizada com import path 'motion/react').
---

# Motion (ex-Framer Motion) para Mini Sites Premium

> **ATENÇÃO DE IMPORT**: O pacote `motion` deve ser importado EXCLUSIVAMENTE via `'motion/react'`. NÃO utilize `'framer-motion'` nos novos componentes.

## 1. Importação Correta

```javascript
// ✅ CORRETO
import { motion, AnimatePresence } from 'motion/react';

// ❌ INCORRETO (obsoleto para projetos novos)
// import { motion } from 'framer-motion';
```

## 2. Padrões de Animação Mobile (390px)

### Entradas Suaves de Elementos (Fade Up)
```jsx
<motion.div
  initial={{ opacity: 0, y: 16 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
>
  {/* Conteúdo do Card */}
</motion.div>
```

### Micro-interações ao Toque (Tap feedback)
```jsx
<motion.button
  whileTap={{ scale: 0.96 }}
  transition={{ type: "spring", stiffness: 400, damping: 25 }}
  className="btn-primary"
>
  Agendar Atendimento
</motion.button>
```

### Animação de Lista Escalada (Stagger Children)
```jsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};
```

## 3. Diretrizes de Performance Mobile
- Animar apenas propriedades compostas pela GPU: `transform` (`x`, `y`, `scale`) e `opacity`.
- Evite animar `width`, `height`, `margin` ou `padding`.
- Sempre utilize `AnimatePresence` com `mode="wait"` para transições de telas ou drawers.
