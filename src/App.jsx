import React from 'react';
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
import './styles/globals.css';

function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  const legalPaths = ['/privacy-policy', '/terms-and-conditions', '/cookie-policy'];

  if (legalPaths.includes(path)) {
    return <LegalPage path={path} />;
  }

  if (path === '/agencia') {
    return <AgencyPage />;
  }

  return (
    <div className="app">
      <Header />
      <HeroSection />
      <BuiltForSection />
      <ProductsSection />
      <CuttingEdgeSection />
      <NewsroomSection />
      <CtaBoxSection />
      <FooterSection />
    </div>
  );
}

export default App;
