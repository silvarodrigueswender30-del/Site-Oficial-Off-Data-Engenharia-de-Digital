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
