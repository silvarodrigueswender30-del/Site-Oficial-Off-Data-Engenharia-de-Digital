// IndexNow — Off-Data Digital
// Envia URLs automaticamente para o Bing sempre que houver novidade

const INDEXNOW_KEY = '90a859fdfdbc4145bb275ea7d256e75b';
const INDEXNOW_HOST = 'www.offdata.digital';
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

/**
 * Envia uma ou mais URLs para o IndexNow (Bing/Yandex)
 * @param {string[]} urls - Array de URLs absolutas para enviar
 * @returns {Promise<void>}
 */
export async function submitToIndexNow(urls) {
  if (!urls || urls.length === 0) return;

  const payload = {
    host: INDEXNOW_HOST,
    key: INDEXNOW_KEY,
    keyLocation: `https://${INDEXNOW_HOST}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  };

  try {
    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload),
    });

    if (response.status === 200) {
      console.log('[IndexNow] URLs enviadas com sucesso:', urls);
    } else if (response.status === 202) {
      console.log('[IndexNow] URLs recebidas, processamento em andamento');
    } else {
      console.warn('[IndexNow] Resposta inesperada:', response.status);
    }
  } catch (error) {
    console.error('[IndexNow] Erro ao enviar URLs:', error);
  }
}

/**
 * Lista de todas as URLs do site para envio em lote
 */
export const ALL_SITE_URLS = [
  'https://www.offdata.digital/',
  'https://www.offdata.digital/agencia',
  'https://www.offdata.digital/blog',
  'https://www.offdata.digital/criacao-de-sites-uberlandia',
  'https://www.offdata.digital/seo-local-uberlandia',
  'https://www.offdata.digital/trafego-pago-uberlandia',
  'https://www.offdata.digital/landing-pages-high-ticket',
  'https://www.offdata.digital/performance-web',
  'https://www.offdata.digital/conteudo-tecnico',
  'https://www.offdata.digital/automacao-comercial-b2b',
  'https://www.offdata.digital/estrategias/seo-local-imobiliarias-luxo',
  'https://www.offdata.digital/estrategias/sites-imersivos-clinicas-medicas',
  'https://www.offdata.digital/estrategias/trafego-alta-intencao-b2b',
  'https://www.offdata.digital/estrategias/performance-web-marcas-high-ticket',
  'https://www.offdata.digital/estrategias/criacao-de-site-para-imobiliaria',
  'https://www.offdata.digital/estrategias/criacao-de-site-para-clinica',
  'https://www.offdata.digital/estrategias/criacao-de-loja-virtual',
  'https://www.offdata.digital/blog/criacao-de-sites-uberlandia-para-advogados',
  'https://www.offdata.digital/blog/criacao-de-sites-uberlandia-para-arquitetos',
  'https://www.offdata.digital/blog/criacao-de-sites-uberlandia-para-construtora',
  'https://www.offdata.digital/blog/criacao-de-sites-uberlandia-para-encanadores',
  'https://www.offdata.digital/blog/criacao-de-sites-uberlandia-para-imobiliaria',
  'https://www.offdata.digital/blog/criacao-de-sites-uberlandia-para-loja-de-roupa',
  'https://www.offdata.digital/blog/criacao-de-sites-uberlandia-para-loja-de-tenis',
  'https://www.offdata.digital/blog/criacao-de-sites-uberlandia-para-paisagistas',
  'https://www.offdata.digital/blog/criacao-de-sites-uberlandia-para-psicologos',
];
