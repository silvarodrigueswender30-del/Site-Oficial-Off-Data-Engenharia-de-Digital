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
