import React, { useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/sections/HeroSection';
import BuiltForSection from './components/sections/BuiltForSection';
import ProductsSection from './components/sections/ProductsSection';
import CuttingEdgeSection from './components/sections/CuttingEdgeSection';
import NewsroomSection from './components/sections/NewsroomSection';
import CtaBoxSection from './components/sections/CtaBoxSection';
import FooterSection from './components/sections/FooterSection';
import LegalPage from './components/legal/LegalPage';
import AgencyPage from './components/agency/AgencyPage';
import ImmersiveSitesPage from './components/services/immersive-sites/ImmersiveSitesPage';
import SeoLocalPage from './components/services/seo-local/SeoLocalPage';
import PaidTrafficPage from './components/services/paid-traffic/PaidTrafficPage';
import LandingPagesPage from './components/services/landing-pages/LandingPagesPage';
import PerformanceWebPage from './components/services/performance-web/PerformanceWebPage';
import B2BAutomationPage from './components/services/b2b-automation/B2BAutomationPage';
import TechnicalContentPage from './components/services/technical-content/TechnicalContentPage';
import RealEstateSeoPage from './components/strategies/real-estate-seo/RealEstateSeoPage';
import ClinicsImmersiveSitesPage from './components/strategies/clinics-immersive-sites/ClinicsImmersiveSitesPage';
import B2BHighIntentTrafficPage from './components/strategies/b2b-high-intent-traffic/B2BHighIntentTrafficPage';
import HighTicketWebPerformancePage from './components/strategies/high-ticket-web-performance/HighTicketWebPerformancePage';
import AuthorityPage from './components/strategies/seo-tecnico-autoridade-digital/AuthorityPage';
import OperationsPage from './components/strategies/automacao-operacoes-comerciais/OperationsPage';
import { WHATSAPP_MESSAGES } from './constants/contact';
import './styles/globals.css';

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

function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  const previewPage = new URLSearchParams(window.location.search).get('page');
  const legalPaths = ['/privacy-policy', '/terms-and-conditions', '/cookie-policy'];

  if (legalPaths.includes(path)) {
    return <LegalPage path={path} />;
  }

  if (path === '/agencia' || previewPage === 'agencia') {
    return <AgencyPage />;
  }

  if (path === '/criacao-de-sites-uberlandia' || previewPage === 'criacao-de-sites-uberlandia') {
    return <ImmersiveSitesPage />;
  }

  if (path === '/seo-local-uberlandia' || previewPage === 'seo-local-uberlandia') {
    return <SeoLocalPage />;
  }

  if (path === '/trafego-pago-uberlandia' || previewPage === 'trafego-pago-uberlandia') {
    return <PaidTrafficPage />;
  }

  if (path === '/landing-pages-high-ticket' || previewPage === 'landing-pages-high-ticket') {
    return <LandingPagesPage />;
  }

  if (path === '/performance-web' || previewPage === 'performance-web') {
    return <PerformanceWebPage />;
  }

  if (path === '/automacao-comercial-b2b' || previewPage === 'automacao-comercial-b2b') {
    return <B2BAutomationPage />;
  }

  if (path === '/conteudo-tecnico' || previewPage === 'conteudo-tecnico') {
    return <TechnicalContentPage />;
  }

  if (path === '/estrategias/seo-local-imobiliarias-luxo' || previewPage === 'estrategias/seo-local-imobiliarias-luxo') {
    return <RealEstateSeoPage />;
  }

  if (path === '/estrategias/sites-imersivos-clinicas-medicas' || previewPage === 'estrategias/sites-imersivos-clinicas-medicas') {
    return <ClinicsImmersiveSitesPage />;
  }

  if (path === '/estrategias/trafego-alta-intencao-b2b' || previewPage === 'estrategias/trafego-alta-intencao-b2b') {
    return <B2BHighIntentTrafficPage />;
  }

  if (path === '/estrategias/performance-web-marcas-high-ticket' || previewPage === 'estrategias/performance-web-marcas-high-ticket') {
    return <HighTicketWebPerformancePage />;
  }

  if (path === '/estrategias/seo-tecnico-autoridade-digital' || previewPage === 'estrategias/seo-tecnico-autoridade-digital') {
    return <AuthorityPage />;
  }

  if (path === '/estrategias/automacao-operacoes-comerciais' || previewPage === 'estrategias/automacao-operacoes-comerciais') {
    return <OperationsPage />;
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

export default App;
