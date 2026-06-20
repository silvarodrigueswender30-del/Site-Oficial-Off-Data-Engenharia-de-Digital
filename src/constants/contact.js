import { trackEvent } from '../utils/analytics';

export const WHATSAPP_NUMBER = '5534992362596';

export const WHATSAPP_MESSAGES = {
  generic: 'Olá, vim pelo site da Off-Data e quero falar com a equipe sobre soluções digitais para minha empresa.',
  home: 'Olá, vim pela página inicial do site da Off-Data e quero entender melhor como vocês podem ajudar minha empresa.',
  agency: 'Olá, vim pela página Agência da Off-Data e quero conhecer melhor as soluções digitais da empresa.',
  immersiveSites: 'Olá, vim pela página de Criação de Sites da Off-Data e tenho interesse em um site profissional para minha empresa.',
  seoLocal: 'Olá, vim pela página de SEO Local da Off-Data e quero melhorar o posicionamento da minha empresa no Google.',
  paidTraffic: 'Olá, vim pela página de Tráfego Pago da Off-Data e quero atrair mais clientes com anúncios.',
  landingPages: 'Olá, vim pela página de Landing Pages High Ticket da Off-Data e quero uma página premium para converter melhor.',
  performanceWeb: 'Olá, vim pela página de Performance Web da Off-Data e quero otimizar a velocidade e eficiência do meu site.',
  b2bAutomation: 'Olá, vim pela página de Automação Comercial B2B da Off-Data e quero organizar meu comercial para vender com mais previsibilidade.',
  technicalContent: 'Olá, vim pela página de Conteúdo Técnico para SEO da Off-Data e quero fortalecer a autoridade digital da minha empresa.',
  realEstateSeo: 'Olá, vim pela página de estratégia para Imobiliárias de Luxo da Off-Data e quero entender como gerar mais leads qualificados.',
  clinicsImmersiveSites: 'Olá, vim pela página de estratégia para Clínicas Médicas da Off-Data e quero melhorar minha presença digital.',
  b2bHighIntentTraffic: 'Olá, vim pela página de estratégia para empresas B2B da Off-Data e quero atrair clientes com maior intenção de compra.',
  highTicketWebPerformance: 'Olá, vim pela página de estratégia para Marcas High Ticket da Off-Data e quero posicionar minha empresa de forma mais premium.',
  authorityDigital: 'Olá, vim pela página de Autoridade Digital da Off-Data e quero fortalecer a presença, confiança e posicionamento da minha empresa no Google.',
  commercialOperations: 'Olá, vim pela página de Operações Comerciais da Off-Data e quero organizar melhor meus processos digitais, atendimento e geração de oportunidades.',
};

export function getWhatsAppUrl(message = WHATSAPP_MESSAGES.generic) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function getWhatsAppLinkProps(message = WHATSAPP_MESSAGES.generic) {
  const href = getWhatsAppUrl(message);
  return {
    href,
    target: '_blank',
    rel: 'noopener noreferrer',
    onClick: () => {
      trackEvent('click_whatsapp', {
        source_page: typeof window !== 'undefined' ? window.location.pathname : '',
        link_url: href,
        cta_text: 'WhatsApp (via getWhatsAppLinkProps)'
      });
    }
  };
}

export const WHATSAPP_URL = getWhatsAppUrl();

export const WHATSAPP_LINK_PROPS = getWhatsAppLinkProps();
