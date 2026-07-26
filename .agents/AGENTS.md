# Regras de Antigravity — Off-Data Digital

## Regra Absoluta: Submissão Automática de URLs ao IndexNow

Sempre que uma nova página, rota ou artigo de blog for criado ou publicado neste projeto, é OBRIGATÓRIO executar a notificação automática ao IndexNow para rápida indexação no Bing e Yandex.

### Instruções de Implementação:
1. Importar a função de submissão do utilitário:
   ```javascript
   import { submitToIndexNow } from '../utils/indexnow';
   ```

2. Disparar a submissão com a URL absoluta correspondente:
   ```javascript
   submitToIndexNow(['https://www.offdata.digital/blog/nome-da-nova-pagina-ou-post']);
   ```

3. Em rotas estáticas ou dinâmicas criadas em scripts de automação, adicionar a chamada automática de `submitToIndexNow` após o processo de criação/deploy da nova URL.

---

## Regra Absoluta: Mini Sites Premium (Link-in-Bio) & Grid Mobile-Only

Em qualquer projeto ou página categorizada como **Mini Site Premium (link-in-bio)**, as seguintes regras são inegociáveis:

### 1. Grid e Layout Mobile (390px)
- **Base de referência**: iPhone 14 / Android Large = `390px`.
- **Margens laterais**: `24px` fixos.
- **Área útil (Box width)**: `342px` (`390 - 48`).
- **Gutter entre colunas**: `20px` fixos.
- **Colunas**: `4 colunas` de `71px` cada.
- **Container Raiz**: Sempre `max-width: 390px; margin: 0 auto;`. Nunca esticar em desktop.
- **Tamanho de Cards**: Ocupar obrigatoriamente **1, 2 ou 4 colunas** (nunca 3 colunas).

### 2. Stack Oficial de Bibliotecas
- **Motion**: Importar exclusivamente via `'motion/react'` (NÃO usar `'framer-motion'`).
- **Embla Carousel**: Utilizado para carrosséis de cards/produtos (`embla-carousel-react`).
- **Vaul**: Bottom sheets / drawers nativos para exibição de catálogos ou cardápios (`vaul`).
- **Lenis**: Rolagem inercial e suave (`lenis`).
- **Lucide Icons**: Ícones vetorizados via `lucide-react`.
- **Sharp + Plaiceholder**: Pipeline de otimização de imagem e geração de blur placeholders.
- **qrcode.react**: Geração de QR Code dinâmico para compartilhamento.
