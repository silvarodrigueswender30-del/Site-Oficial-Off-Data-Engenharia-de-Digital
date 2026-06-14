import React, { useEffect } from 'react';
import Header from '../Header';
import FooterSection from '../sections/FooterSection';
import CtaBoxSection from '../sections/CtaBoxSection';
import AgencyHero from './AgencyHero';
import AgencyWorkSection from './AgencyWorkSection';
import AgencyMissionSection from './AgencyMissionSection';
import AgencyPixelTransition from './AgencyPixelTransition';

const AgencyPage = () => {
  useEffect(() => {
    const title = 'Agência Digital em Uberlândia | Off-Data Engenharia Digital';
    const descriptionText = 'Conheça a Off-Data, agência de engenharia digital em Uberlândia especializada em sites de alta performance, SEO local e aquisição para empresas B2B e high-ticket.';
    const canonicalUrl = 'https://www.offdata.digital/agencia';
    const imageUrl = 'https://www.offdata.digital/imagens/offdata-digital-og.jpg';
    const targets = [
      [document.querySelector('meta[name="description"]'), 'content', descriptionText],
      [document.querySelector('link[rel="canonical"]'), 'href', canonicalUrl],
      [document.querySelector('meta[property="og:title"]'), 'content', title],
      [document.querySelector('meta[property="og:description"]'), 'content', descriptionText],
      [document.querySelector('meta[property="og:url"]'), 'content', canonicalUrl],
      [document.querySelector('meta[property="og:image"]'), 'content', imageUrl],
      [document.querySelector('meta[property="og:image:secure_url"]'), 'content', imageUrl],
      [document.querySelector('meta[property="og:image:alt"]'), 'content', 'Off-Data: agência digital e engenharia web em Uberlândia'],
      [document.querySelector('meta[name="twitter:title"]'), 'content', title],
      [document.querySelector('meta[name="twitter:description"]'), 'content', descriptionText],
      [document.querySelector('meta[name="twitter:image"]'), 'content', imageUrl],
      [document.querySelector('meta[name="twitter:image:alt"]'), 'content', 'Off-Data: agência digital e engenharia web em Uberlândia'],
    ];
    const previousTitle = document.title;
    const previous = targets.map(([element, attribute]) => [element, attribute, element?.getAttribute(attribute)]);
    const schema = document.createElement('script');

    schema.id = 'agency-page-schema';
    schema.type = 'application/ld+json';
    schema.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      '@id': `${canonicalUrl}#page`,
      url: canonicalUrl,
      name: title,
      description: descriptionText,
      inLanguage: 'pt-BR',
      isPartOf: { '@id': 'https://www.offdata.digital/#website' },
      about: { '@id': 'https://www.offdata.digital/#business' },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: imageUrl,
      },
      mainEntity: {
        '@type': 'ProfessionalService',
        '@id': 'https://www.offdata.digital/#business',
        name: 'Off-Data Engenharia Digital',
        url: 'https://www.offdata.digital/',
        areaServed: ['Uberlândia', 'Triângulo Mineiro'],
        serviceType: [
          'Engenharia digital',
          'Desenvolvimento de sites de alta performance',
          'SEO local',
          'Aquisição digital B2B',
        ],
      },
    });

    document.title = title;
    targets.forEach(([element, attribute, value]) => element?.setAttribute(attribute, value));
    document.head.appendChild(schema);
    if (window.location.hash) {
      window.requestAnimationFrame(() => document.querySelector(window.location.hash)?.scrollIntoView());
    } else {
      window.scrollTo(0, 0);
    }

    return () => {
      document.title = previousTitle;
      previous.forEach(([element, attribute, value]) => value && element?.setAttribute(attribute, value));
      schema.remove();
    };
  }, []);

  return (
    <div className="agency-page">
      <style>{`
        .agency-page{background:var(--blue);color:var(--white);overflow:hidden;letter-spacing:-.01em}
        .agency-page main{font-size:1vw}
        .agency-company-block{position:relative;background:var(--black);color:var(--white)}
      `}</style>

      <Header />
      <main>
        <AgencyHero />

        <section id="mission-section" className="agency-company-block">
          <AgencyWorkSection />
          <AgencyMissionSection />
          <AgencyPixelTransition />
        </section>
        <CtaBoxSection />
      </main>
      <FooterSection />
    </div>
  );
};

export default AgencyPage;
