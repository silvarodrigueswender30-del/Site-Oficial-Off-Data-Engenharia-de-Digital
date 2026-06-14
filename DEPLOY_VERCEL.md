# Checklist de Deploy na Vercel

## Status técnico

- [x] Projeto React reconhecível pela Vercel
- [x] `package.json` e `package-lock.json` consistentes
- [x] Node.js fixado em `22.x`
- [x] Build de produção executado com sucesso
- [x] Pasta de saída: `build`
- [x] Nenhum segredo ou arquivo `.env` incluído
- [x] `.gitignore` exclui `node_modules`, `build`, `.env` e logs
- [x] Domínio canônico, sitemap e robots atualizados para `www.offdata.digital`
- [x] Imagem dedicada para compartilhamento social (`og:image`)
- [x] Navegação interna aponta para seções existentes e para a página `/agencia`
- [x] Imagens externas utilizadas pelos cards da home preservadas e validadas
- [x] Rotas diretas e páginas jurídicas configuradas
- [x] Rota `/agencia` gera HTML estático com metadados sociais e SEO próprios
- [x] Dependências e lockfile validados com instalação limpa

## Dependências

O projeto utiliza Create React App 5. Os alertas remanescentes do `npm audit` pertencem
à cadeia legada de ferramentas de build e teste do `react-scripts`. O comando
`npm audit fix --force` não deve ser utilizado, pois substituiria o pacote por uma
versão inválida e quebraria o build. Esses pacotes não são executados como servidor
no deploy estático da Vercel.

## Configuração recomendada na Vercel

Se o repositório Git contiver apenas o conteúdo da pasta `SITE`, importe normalmente.

Se o repositório contiver a pasta superior inteira, configure:

- Root Directory: `SITE`
- Framework Preset: Create React App
- Build Command: `npm run build`
- Output Directory: `build`
- Node.js Version: `22.x`

O arquivo `vercel.json` já fixa essas configurações e utiliza
`npm ci --no-audit --no-fund --loglevel=error` para uma instalação determinística,
mantendo no log da Vercel apenas erros que exigem ação.

## Domínio

Após o primeiro deploy:

1. Adicione `www.offdata.digital` em **Project Settings > Domains**.
2. Adicione `offdata.digital` e configure redirecionamento permanente para `www.offdata.digital`.
3. Na GoDaddy, use exatamente os registros DNS mostrados pela Vercel.
4. Aguarde a verificação DNS e a emissão automática do certificado SSL.

## Pendências antes do lançamento público

- Configurar e testar o endereço `privacidade@offdata.digital`.
- Submeter Política de Privacidade, Termos de Uso e Política de Cookies à revisão jurídica final.
- Conectar o formulário do rodapé a um serviço real.
