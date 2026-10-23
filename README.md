# Off-Data Engenharia Digital

Site institucional da Off-Data, construído em React e preparado para deploy na Vercel.

## Desenvolvimento local

```bash
npm ci
npm start
```

## Build de produção

```bash
npm run build
```

O build otimizado é gerado na pasta `build/`.

## Propostas Comerciais Dedicadas

As propostas comerciais interativas (ex.: Carolina — Pousadas Paraty) são desenvolvidas como micro-apps independentes (Vite + React) e servidas sob subcaminhos dedicados em `public/`:

- Rota: `/proposta-carolina-k8m3vq`
- Arquivos estáticos em: `public/proposta-carolina-k8m3vq/`
- Para atualizar o build da proposta a partir do repositório de desenvolvimento:
  ```bash
  npm run build:proposta
  ```
- O roteamento no `vercel.json` direciona a rota para o `index.html` correspondente e injeta cabeçalhos HTTP de segurança (`X-Robots-Tag: noindex, nofollow, noarchive`). A proposta não é indexada por motores de busca nem exposta no `sitemap.xml`.


## Deploy na Vercel

Ao importar o repositório, use a pasta `SITE` como **Root Directory** caso ela não seja a raiz do repositório.

A Vercel detecta automaticamente o Create React App:

- Install Command: `npm install` ou `npm ci`
- Build Command: `npm run build`
- Output Directory: `build`
- Node.js: `22.x`

Após o primeiro deploy, adicione `www.offdata.digital` ao projeto e configure os registros DNS indicados pela Vercel na GoDaddy.

## Antes do lançamento público

- Configurar o endereço `privacidade@offdata.digital` e realizar a revisão jurídica final das páginas legais.
- Substituir ou validar os parceiros e links externos exibidos na seção de mercados.
- Conectar o formulário do rodapé a um serviço real de captação.
