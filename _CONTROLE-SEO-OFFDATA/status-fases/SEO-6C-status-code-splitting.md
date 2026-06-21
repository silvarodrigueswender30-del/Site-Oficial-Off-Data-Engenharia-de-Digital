# SEO-6C — Status do Code Splitting

**Data:** 2026-06-21
**Fase:** SEO-6C
**Status:** VALIDADA COM SUCESSO

- **Home Limpa:** O usuário acessando a raiz \ agora faz o download somente dos recursos ligados à Home.
- **Isolamento de Páginas:** 15 Rotas agora possuem Lazy Loading Nativo, empacotando separadamente seus Componentes e dependências (Framer Motion local, GSAP local, etc).
- **Bundle Principal:** Queda dramática na latência TTI, com o main.js perdendo ~30% de gordura.
- **Próximo Passo Absoluto:** O Canvas (HeroSection) que paralisa a UI thread no equestAnimationFrame. Com a Home mais limpa, é momento de lidar com esse bloqueio.

**Próxima Etapa Recomendada:** Executar SEO-6D (Canvas/WebGL Optimization).
