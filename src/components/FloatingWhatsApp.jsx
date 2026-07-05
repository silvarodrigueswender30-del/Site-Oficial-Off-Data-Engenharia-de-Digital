import React, { useState, useEffect, useCallback } from 'react';
import { trackEvent } from '../utils/analytics';
import './FloatingWhatsApp.css';

const WHATSAPP_NUMBER = '5534992362596';

const SERVICE_MAP = {
  '/criacao-de-sites-uberlandia': 'criação de sites profissionais',
  '/seo-local-uberlandia': 'SEO local em Uberlândia',
  '/trafego-pago-uberlandia': 'gestão de tráfego pago',
  '/landing-pages-high-ticket': 'landing pages high ticket',
  '/performance-web': 'performance web',
  '/automacao-comercial-b2b': 'automação comercial B2B',
  '/conteudo-tecnico': 'conteúdo técnico para SEO',
  '/estrategias/seo-local-imobiliarias-luxo': 'SEO local para imobiliárias de luxo',
  '/estrategias/sites-imersivos-clinicas-medicas': 'sites imersivos para clínicas médicas',
  '/estrategias/trafego-alta-intencao-b2b': 'tráfego de alta intenção B2B',
  '/estrategias/performance-web-marcas-high-ticket': 'performance web para marcas high ticket',
};

const getServiceFromPath = (path) => SERVICE_MAP[path] || 'consultoria digital';

const FloatingWhatsApp = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isBalloonOpen, setIsBalloonOpen] = useState(true);
  const [hasTrackedView, setHasTrackedView] = useState(false);
  const [imgSrc, setImgSrc] = useState('/imagens/botaowhats1.svg');
  const [imgFailed, setImgFailed] = useState(false);

  /* --- Visibility: 5s timer OR 30% scroll, whichever first --- */
  useEffect(() => {
    let cancelled = false;

    const show = () => {
      if (!cancelled) setIsVisible(true);
    };

    const timerId = setTimeout(show, 5000);

    const handleScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable > 0 && (window.scrollY / scrollable) * 100 >= 30) {
        show();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      cancelled = true;
      clearTimeout(timerId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  /* --- GA4 view event (once) --- */
  useEffect(() => {
    if (isVisible && !hasTrackedView) {
      const path = window.location.pathname.replace(/\/+$/, '') || '/';
      trackEvent('whatsapp_floating_button_view', {
        component: 'floating_whatsapp',
        source_page: window.location.pathname,
        service_context: getServiceFromPath(path),
        trigger: window.scrollY > 0 ? 'scroll_30_percent' : 'delay_5s',
      });
      setHasTrackedView(true);
    }
  }, [isVisible, hasTrackedView]);

  /* --- Image fallback (SVG → PNG, once) --- */
  const handleImgError = useCallback(() => {
    if (!imgFailed) {
      setImgSrc('/imagens/botaowhats.png');
      setImgFailed(true);
    }
  }, [imgFailed]);

  if (!isVisible) return null;

  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  const serviceContext = getServiceFromPath(path);
  const message = `Olá! Vim pelo site da Off-Data e gostaria de saber mais sobre ${serviceContext}`;
  const encodedMessage = encodeURIComponent(message);

  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    window.innerWidth < 768;

  const linkUrl = isMobile
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`
    : `https://web.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodedMessage}`;

  const handleClick = () => {
    trackEvent('whatsapp_floating_button_click', {
      component: 'floating_whatsapp',
      source_page: window.location.pathname,
      service_context: serviceContext,
      device_type: isMobile ? 'mobile' : 'desktop',
      destination: isMobile ? 'whatsapp_app' : 'whatsapp_web',
    });
  };

  const closeBalloon = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBalloonOpen(false);
  };

  return (
    <div className="floating-whatsapp-container">
      {isBalloonOpen && (
        <div className="floating-whatsapp-balloon">
          <button
            className="floating-whatsapp-close"
            onClick={closeBalloon}
            aria-label="Fechar balão"
            type="button"
          >
            ×
          </button>
          <div className="floating-whatsapp-title">
            Quer um Raio X gratuito do seu site?
          </div>
          <div className="floating-whatsapp-subtitle">
            Fale com a Off-Data pelo WhatsApp.
          </div>
        </div>
      )}
      <a
        href={linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp-button"
        onClick={handleClick}
        aria-label="Fale com a Off-Data pelo WhatsApp"
      >
        <img
          src={imgSrc}
          alt="Fale com a Off-Data pelo WhatsApp"
          className="floating-whatsapp-img"
          width="68"
          height="68"
          loading="eager"
          decoding="async"
          onError={handleImgError}
        />
      </a>
    </div>
  );
};

export default FloatingWhatsApp;
