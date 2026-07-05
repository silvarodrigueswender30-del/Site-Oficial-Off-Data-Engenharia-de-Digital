# SPEC 001 — Extração e Normalização Visual do Header/Footer

## Contexto
O site institucional (React/CRA) vai receber um blog em `/blog`, implementado em Astro,
via rewrite na Vercel (sem alterar o código do site principal). O blog precisa reutilizar
o Design System atual — cores, tipografia, espaçamentos — mas o CSS do Header (e Footer,
se existir) está embutido via `<style>{...}</style>` dentro do próprio componente `.jsx`,
misturando `var(--cor)` com valores hardcoded (ex: `#00000047`).

Esta sessão é **somente análise e documentação**. Nenhum código deve ser criado, alterado
ou movido nesta etapa. O objetivo é produzir um relatório que o Codex vai consumir depois
para reimplementar `Header.astro` e `Footer.astro` fielmente.

## Escopo
Arquivos a analisar (projeto SITE, React/CRA):
- `src/components/Header.jsx` (738 linhas — já mapeado em auditoria anterior)
- Componente de Footer equivalente, se existir (localizar via busca por "Footer", "footer")
- `src/styles/globals.css` (já mapeado — variáveis `--white`, `--blue: #044ab3`,
  `--black: #151515`, declarações de `@font-face` para PP Neue Montreal)

## Tarefas de extração

### 1. Inventário de cores
Para cada cor usada no CSS embutido do Header/Footer:
- Registrar o valor exato como aparece no código (ex: `var(--blue, #044ab3)`, `#00000047`)
- Classificar como:
  - **Mapeada**: já corresponde a uma variável existente em `globals.css`
  - **Órfã**: valor hardcoded sem variável correspondente — precisa decidir se vira
    variável nova (ex: `--overlay-dark: #00000047`) ou é um caso pontual
- Listar todas as cores órfãs encontradas, com o contexto de uso (ex: "overlay do menu mobile")

### 2. Inventário de tipografia
- Fontes, pesos (`font-weight`), tamanhos (`font-size`) e `line-height` usados no
  Header/Footer, com o seletor/elemento onde aparecem
- Confirmar se todos usam `PP Neue Montreal` ou se há fontes alternativas/fallbacks

### 3. Inventário de espaçamento e layout
- Paddings, margins, gaps e breakpoints de media query usados
- Identificar se seguem uma escala consistente (ex: múltiplos de 4px/8px) ou são
  valores arbitrários

### 4. Inventário de comportamento/interatividade
- Estados (`hover`, `active`, `focus`), transições e animações CSS presentes
- Lógica de menu mobile (breakpoint de colapso, animação de abertura)
- Qualquer dependência de JS para estilo (ex: classes condicionais aplicadas via estado React)

### 5. Estrutura HTML/semântica
- Hierarquia de elementos do Header/Footer (nav, links, logo, CTA, redes sociais etc.)
- Ordem e agrupamento visual, para preservar fidelidade na reimplementação

## Restrições
- **Não modificar nenhum arquivo** do projeto SITE nesta sessão
- Não sugerir refatoração do CRA — o site institucional permanece inalterado
- Não instalar dependências (Tailwind, etc.) — fora de escopo, já descartado

## Formato de saída esperado (REPORT-001)
Um único arquivo `REPORT-001-header-footer.md` contendo:

1. Tabela de cores (valor original → variável mapeada ou proposta)
2. Tabela de tipografia (elemento → fonte/peso/tamanho/line-height)
3. Tabela de espaçamento e breakpoints
4. Lista de estados/interações e suas regras CSS
5. Diagrama textual da estrutura HTML (hierarquia de elementos)
6. Lista de "cores órfãs" e recomendação de nome de variável nova para cada uma
7. Observações de qualquer inconsistência encontrada (ex: mesma cor com valores
   levemente diferentes em lugares distintos)

## Critério de conclusão
A sessão está completa quando o REPORT-001 contém informação suficiente para o Codex
escrever `Header.astro` e `Footer.astro` sem precisar reabrir o `Header.jsx` original.
