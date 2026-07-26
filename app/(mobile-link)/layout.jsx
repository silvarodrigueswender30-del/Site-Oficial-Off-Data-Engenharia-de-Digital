import React from 'react';
import { Helmet } from 'react-helmet-async';
import './mini-site.css';

export default function MobileLinkLayout({ children }) {
  return (
    <div className="ms-root">
      <Helmet>
        <title>Off-Data Engenharia Digital | Link in Bio</title>
        <meta name="description" content="Agência de engenharia digital e presença online de alto padrão para negócios High Ticket no Triângulo Mineiro." />
        <meta property="og:title" content="Off-Data Engenharia Digital | Link in Bio" />
        <meta property="og:description" content="Engenharia digital e presença online de alto padrão no Triângulo Mineiro." />
        <meta property="og:image" content="https://www.offdata.digital/imagens/capa-hero-criacao-site-uberlandia.avif" />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://www.offdata.digital/bio" />
      </Helmet>

      {/* Frame Fixo de 390px estritamente isolado */}
      <main className="ms-container">
        {children}
      </main>
    </div>
  );
}
