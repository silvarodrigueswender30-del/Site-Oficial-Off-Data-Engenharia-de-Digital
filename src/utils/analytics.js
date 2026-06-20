/**
 * Helper para eventos do Google Analytics 4 (GA4).
 * Envia eventos via gtag.js caso disponível globalmente.
 */

export const trackEvent = (eventName, params = {}) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  } else if (process.env.NODE_ENV === 'development') {
    console.log(`[GA4 Event] ${eventName}`, params);
  }
};
