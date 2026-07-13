import React, { useEffect, Suspense, lazy } from 'react';
import Header from './components/Header';
import HeroSection from './components/sections/HeroSection';
import BuiltForSection from './components/sections/BuiltForSection';
import ProductsSection from './components/sections/ProductsSection';
import CuttingEdgeSection from './components/sections/CuttingEdgeSection';
import NewsroomSection from './components/sections/NewsroomSection';
import CtaBoxSection from './components/sections/CtaBoxSection';
import FooterSection from './components/sections/FooterSection';
import { WHATSAPP_MESSAGES } from './constants/contact';
import './styles/globals.css';
import FloatingWhatsApp from './components/FloatingWhatsApp';

const LegalPage = lazy(() => import('./components/legal/LegalPage'));
const AgencyPage = lazy(() => import('./components/agency/AgencyPage'));
const ImmersiveSitesPage = lazy(() => import('./components/services/immersive-sites/ImmersiveSitesPage'));
const SeoLocalPage = lazy(() => import('./components/services/seo-local/SeoLocalPage'));
const PaidTrafficPage = lazy(() => import('./components/services/paid-traffic/PaidTrafficPage'));
const LandingPagesPage = lazy(() => import('./components/services/landing-pages/LandingPagesPage'));
const PerformanceWebPage = lazy(() => import('./components/services/performance-web/PerformanceWebPage'));
const B2BAutomationPage = lazy(() => import('./components/services/b2b-automation/B2BAutomationPage'));
const TechnicalContentPage = lazy(() => import('./components/services/technical-content/TechnicalContentPage'));
const RealEstateSeoPage = lazy(() => import('./components/strategies/real-estate-seo/RealEstateSeoPage'));
const RealEstateWebsitePage = lazy(() => import('./components/strategies/real-estate-website/RealEstateWebsitePage'));
const ClinicsImmersiveSitesPage = lazy(() => import('./components/strategies/clinics-immersive-sites/ClinicsImmersiveSitesPage'));
const B2BHighIntentTrafficPage = lazy(() => import('./components/strategies/b2b-high-intent-traffic/B2BHighIntentTrafficPage'));
const HighTicketWebPerformancePage = lazy(() => import('./components/strategies/high-ticket-web-performance/HighTicketWebPerformancePage'));
const AuthorityPage = lazy(() => import('./components/strategies/seo-tecnico-autoridade-digital/AuthorityPage'));
const OperationsPage = lazy(() => import('./components/strategies/automacao-operacoes-comerciais/OperationsPage'));
const ConstructionWebsitePage = lazy(() => import('./components/strategies/construction-website/ConstructionWebsitePage'));

function NotFound() {
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => document.head.removeChild(meta);
  }, []);

  return (
    <div className="app" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--blue, #044ab3)', color: 'white', textAlign: 'center' }}>
      <Header />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>404</h1>
        <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Página não encontrada</p>
        <a href="/" style={{ padding: '0.75rem 1.5rem', backgroundColor: 'white', color: 'var(--blue, #044ab3)', textDecoration: 'none', borderRadius: '4px', fontWeight: 'bold' }}>Voltar ao Início</a>
      </main>
      <FooterSection />
    </div>
  );
}

function AppContent() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  const previewPage = new URLSearchParams(window.location.search).get('page');
  const legalPaths = ['/privacy-policy', '/terms-and-conditions', '/cookie-policy'];

  if (legalPaths.includes(path)) {
    return (
      <Suspense fallback={null}>
        <LegalPage path={path} />
      </Suspense>
    );
  }

  if (path === '/agencia' || previewPage === 'agencia') {
    return (
      <Suspense fallback={null}>
        <AgencyPage />
      </Suspense>
    );
  }

  if (path === '/criacao-de-sites-uberlandia' || previewPage === 'criacao-de-sites-uberlandia') {
    return (
      <Suspense fallback={null}>
        <ImmersiveSitesPage />
      </Suspense>
    );
  }

  if (path === '/seo-local-uberlandia' || previewPage === 'seo-local-uberlandia') {
    return (
      <Suspense fallback={null}>
        <SeoLocalPage />
      </Suspense>
    );
  }

  if (path === '/trafego-pago-uberlandia' || previewPage === 'trafego-pago-uberlandia') {
    return (
      <Suspense fallback={null}>
        <PaidTrafficPage />
      </Suspense>
    );
  }

  if (path === '/landing-pages-high-ticket' || previewPage === 'landing-pages-high-ticket') {
    return (
      <Suspense fallback={null}>
        <LandingPagesPage />
      </Suspense>
    );
  }

  if (path === '/performance-web' || previewPage === 'performance-web') {
    return (
      <Suspense fallback={null}>
        <PerformanceWebPage />
      </Suspense>
    );
  }

  if (path === '/automacao-comercial-b2b' || previewPage === 'automacao-comercial-b2b') {
    return (
      <Suspense fallback={null}>
        <B2BAutomationPage />
      </Suspense>
    );
  }

  if (path === '/conteudo-tecnico' || previewPage === 'conteudo-tecnico') {
    return (
      <Suspense fallback={null}>
        <TechnicalContentPage />
      </Suspense>
    );
  }

  if (path === '/estrategias/seo-local-imobiliarias-luxo' || previewPage === 'estrategias/seo-local-imobiliarias-luxo') {
    return (
      <Suspense fallback={null}>
        <RealEstateSeoPage />
      </Suspense>
    );
  }

  if (path === '/estrategias/criacao-de-site-para-imobiliaria' || previewPage === 'estrategias/criacao-de-site-para-imobiliaria') {
    return (
      <Suspense fallback={null}>
        <RealEstateWebsitePage />
      </Suspense>
    );
  }

  if (path === '/estrategias/criacao-de-site-para-construtora' || previewPage === 'estrategias/criacao-de-site-para-construtora') {
    return (
      <Suspense fallback={null}>
        <ConstructionWebsitePage />
      </Suspense>
    );
  }

  if (path === '/estrategias/sites-imersivos-clinicas-medicas' || previewPage === 'estrategias/sites-imersivos-clinicas-medicas') {
    return (
      <Suspense fallback={null}>
        <ClinicsImmersiveSitesPage />
      </Suspense>
    );
  }

  if (path === '/estrategias/trafego-alta-intencao-b2b' || previewPage === 'estrategias/trafego-alta-intencao-b2b') {
    return (
      <Suspense fallback={null}>
        <B2BHighIntentTrafficPage />
      </Suspense>
    );
  }

  if (path === '/estrategias/performance-web-marcas-high-ticket' || previewPage === 'estrategias/performance-web-marcas-high-ticket') {
    return (
      <Suspense fallback={null}>
        <HighTicketWebPerformancePage />
      </Suspense>
    );
  }

  if (path === '/estrategias/seo-tecnico-autoridade-digital' || previewPage === 'estrategias/seo-tecnico-autoridade-digital') {
    return (
      <Suspense fallback={null}>
        <AuthorityPage />
      </Suspense>
    );
  }

  if (path === '/estrategias/automacao-operacoes-comerciais' || previewPage === 'estrategias/automacao-operacoes-comerciais') {
    return (
      <Suspense fallback={null}>
        <OperationsPage />
      </Suspense>
    );
  }

  if (path === '/') {
    return (
      <div className="app">
        <Header />
        <main>
          <HeroSection />
          <BuiltForSection />
          <ProductsSection />
          <CuttingEdgeSection />
          <NewsroomSection />
          <CtaBoxSection whatsappMessage={WHATSAPP_MESSAGES.home} />
        </main>
        <FooterSection />
      </div>
    );
  }

  return <NotFound />;
}

function App() {
  return (
    <>
      <AppContent />
      <FloatingWhatsApp />
    </>
  );
}

export default App;
