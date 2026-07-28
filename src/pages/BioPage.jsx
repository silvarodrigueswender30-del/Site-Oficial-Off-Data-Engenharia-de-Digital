import React, { useState } from 'react';
import MobileLinkLayout from '../app/(mobile-link)/layout';
import VideoHero from '../components/mini-site/VideoHero';
import AnimatedCard from '../components/mini-site/AnimatedCard';
import CatalogDrawer from '../components/mini-site/CatalogDrawer';
import ProductCarousel from '../components/mini-site/ProductCarousel';
import WhatsappCTA from '../components/mini-site/WhatsappCTA';
import { QRCodeSVG } from 'qrcode.react';
import { 
  Globe, 
  Building2, 
  Stethoscope, 
  Zap, 
  BarChart3, 
  Share2
} from 'lucide-react';

const portfolioItems = [
  {
    title: 'Imobiliária de Luxo',
    subtitle: 'SEO Local & Design Imersivo',
    image: '/imagens/imagem-estrategia/portfolio-imobiliaria-1.avif',
    href: 'https://www.offdata.digital/estrategias/criacao-de-site-para-imobiliaria'
  },
  {
    title: 'Construtora High Ticket',
    subtitle: 'Lançamentos & Plantas 3D',
    image: '/imagens/imagem-estrategia/portfolio-construtora-1.avif',
    href: 'https://www.offdata.digital/estrategias/criacao-de-site-para-construtora'
  },
  {
    title: 'Clínica Médica Premium',
    subtitle: 'Sites Imersivos & Agendamento',
    image: '/imagens/seo-clinica.avif',
    href: 'https://www.offdata.digital/estrategias/sites-imersivos-clinicas-medicas'
  }
];

const serviceDetails = {
  sites: {
    title: 'Criação de Sites Imersivos High Ticket',
    description: 'Desenvolvimento de sites de altíssimo padrão com arquitetura React de alta velocidade, SEO nativo e design focado em autoridade e conversão.',
    features: [
      'Design exclusivo (Mobile Grid 390px + Desktop)',
      'Otimização Core Web Vitals (Carregamento instantâneo)',
      'Arquitetura de conteúdo focada em conversão High Ticket',
      'Integração direta com WhatsApp comercial e CRM',
      'Indexação rápida nos buscadores (Google e Bing IndexNow)'
    ]
  },
  imobiliaria: {
    title: 'Engenharia Digital para Imobiliárias & Construtoras',
    description: 'Solução completa de captação orgânica e apresentação de imóveis de luxo e lançamentos imobiliários no Triângulo Mineiro.',
    features: [
      'Páginas individuais para empreendimentos com plantas 3D',
      'SEO Local cirúrgico para compradores de alto padrão',
      'Formulários e botões de contato qualificados por imóvel',
      'Experiência fluida e imersiva sem travamentos'
    ]
  },
  clinicas: {
    title: 'Presença Digital para Clínicas Médicas',
    description: 'Sites imersivos que transmitem confiança, autoridade e elegância para atrair pacientes particulares qualificados.',
    features: [
      'Comunicação visual sofisticada alinhada ao público premium',
      'Estrutura preparada para agendamento online de consultas',
      'Conformidade com diretrizes técnicas e institucionais',
      'SEO local para destaque nas pesquisas regionais'
    ]
  }
};

export default function BioPage() {
  const [activeDrawer, setActiveDrawer] = useState(null);
  const [showQR, setShowQR] = useState(false);

  return (
    <MobileLinkLayout>
      {/* 1. Hero Section (Full Bleed Background + Padding 24px no conteúdo) */}
      <VideoHero />

      {/* 2. Conteúdo com Padding de 24px fixos e Grid Responsivo (max-width: 430px) */}
      <div className="ms-content" style={{ marginTop: '16px', paddingBottom: '32px' }}>
        {/* Grid de Serviços e Links (4 colunas) */}
        <div className="ms-grid-4">
          {/* Card 1 — Sites Profissionais (4 colunas) */}
          <AnimatedCard 
            cols={4}
            title="Criação de Sites Profissionais"
            subtitle="Sites de alta velocidade e design imersivo para vendas"
            icon={Globe}
            badge="Principal"
            onClick={() => setActiveDrawer('sites')}
          />

          {/* Card 2 — Imobiliárias & Luxo (2 colunas) */}
          <AnimatedCard 
            cols={2}
            title="Imobiliárias de Luxo"
            subtitle="SEO & Lançamentos"
            icon={Building2}
            onClick={() => setActiveDrawer('imobiliaria')}
          />

          {/* Card 3 — Clínicas Médicas (2 colunas) */}
          <AnimatedCard 
            cols={2}
            title="Clínicas Médicas"
            subtitle="Pacientes Premium"
            icon={Stethoscope}
            onClick={() => setActiveDrawer('clinicas')}
          />

          {/* Card 4 — SEO Local (2 colunas) */}
          <AnimatedCard 
            cols={2}
            title="SEO Local Uberlândia"
            subtitle="Primeira página do Google"
            icon={Zap}
            href="https://www.offdata.digital/seo-local-uberlandia"
          />

          {/* Card 5 — Tráfego Pago (2 colunas) */}
          <AnimatedCard 
            cols={2}
            title="Tráfego Pago B2B"
            subtitle="Leads de alta intenção"
            icon={BarChart3}
            href="https://www.offdata.digital/trafego-pago-uberlandia"
          />
        </div>

        {/* Carrossel de Projetos Embla */}
        <ProductCarousel items={portfolioItems} />

        {/* Call To Action WhatsApp */}
        <WhatsappCTA label="Solicitar Diagnóstico no WhatsApp" />

        {/* Botão de Compartilhar / QR Code */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <button
            onClick={() => setShowQR(!showQR)}
            style={{
              background: 'none',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '999px',
              color: '#9ca3af',
              padding: '8px 16px',
              fontSize: '12px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Share2 size={14} />
            <span>{showQR ? 'Ocultar QR Code' : 'Exibir QR Code de Compartilhamento'}</span>
          </button>

          {showQR && (
            <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ padding: '16px', backgroundColor: '#ffffff', borderRadius: '20px' }}>
                <QRCodeSVG 
                  value="https://www.offdata.digital/bio" 
                  size={160}
                  bgColor="#FFFFFF"
                  fgColor="#044AB3"
                  level="H"
                />
              </div>
              <p style={{ fontSize: '11px', color: '#6b7280', marginTop: '8px' }}>
                https://www.offdata.digital/bio
              </p>
            </div>
          )}
        </div>

        {/* Footer Minimalista Isolado */}
        <footer style={{ marginTop: 'auto', paddingBottom: '24px', textAlign: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '16px' }}>
          <p style={{ fontSize: '11px', color: '#4b5563', margin: 0 }}>
            Off-Data Engenharia Digital © {new Date().getFullYear()} — Triângulo Mineiro
          </p>
        </footer>
      </div>

      {/* Drawer de Detalhes (Vaul) */}
      {activeDrawer && (
        <CatalogDrawer 
          open={!!activeDrawer}
          onOpenChange={(open) => !open && setActiveDrawer(null)}
          title={serviceDetails[activeDrawer].title}
          description={serviceDetails[activeDrawer].description}
          features={serviceDetails[activeDrawer].features}
        />
      )}
    </MobileLinkLayout>
  );
}
