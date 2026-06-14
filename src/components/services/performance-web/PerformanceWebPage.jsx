import React, { useEffect } from 'react';
import Header from '../../Header';
import FooterSection from '../../sections/FooterSection';
import AgencyPixelTransition from '../../agency/AgencyPixelTransition';
import PerformanceWebHero from './PerformanceWebHero';
import PerformanceWebWorkSection from './PerformanceWebWorkSection';
import PerformanceWebMissionSection from './PerformanceWebMissionSection';
import PerformanceWebCtaBox from './PerformanceWebCtaBox';

const title = 'Performance Web de Precisão | Off-Data Digital';
const descriptionText = 'Otimização de performance web para sites mais rápidos, estáveis e preparados para SEO, conversão e melhor experiência do usuário.';
const canonicalUrl = 'https://www.offdata.digital/performance-web';
const imageUrl = 'https://www.offdata.digital/imagens/offdata-digital-og.jpg';
const imageAlt = 'Performance Web de Precisão pela Off-Data Digital';
const schemaData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Performance Web de Precisão',
  description: descriptionText,
  provider: {
    '@type': 'ProfessionalService',
    '@id': 'https://www.offdata.digital/#business',
    name: 'Off-Data Engenharia Digital',
    url: 'https://www.offdata.digital/',
  },
  areaServed: [
    { '@type': 'City', name: 'Uberlândia' },
    { '@type': 'AdministrativeArea', name: 'Triângulo Mineiro' },
  ],
  url: canonicalUrl,
};

const PerformanceWebPage = () => {
  useEffect(() => {
    const targets = [
      [document.querySelector('meta[name="description"]'), 'content', descriptionText],
      [document.querySelector('link[rel="canonical"]'), 'href', canonicalUrl],
      [document.querySelector('meta[property="og:title"]'), 'content', title],
      [document.querySelector('meta[property="og:description"]'), 'content', descriptionText],
      [document.querySelector('meta[property="og:url"]'), 'content', canonicalUrl],
      [document.querySelector('meta[property="og:image"]'), 'content', imageUrl],
      [document.querySelector('meta[property="og:image:secure_url"]'), 'content', imageUrl],
      [document.querySelector('meta[property="og:image:alt"]'), 'content', imageAlt],
      [document.querySelector('meta[name="twitter:card"]'), 'content', 'summary_large_image'],
      [document.querySelector('meta[name="twitter:title"]'), 'content', title],
      [document.querySelector('meta[name="twitter:description"]'), 'content', descriptionText],
      [document.querySelector('meta[name="twitter:image"]'), 'content', imageUrl],
      [document.querySelector('meta[name="twitter:image:alt"]'), 'content', imageAlt],
    ];
    const previousTitle = document.title;
    const previous = targets.map(([element, attribute]) => [element, attribute, element?.getAttribute(attribute)]);
    const existingSchemas = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
    const createdSchema = existingSchemas.length === 0;
    const primarySchema = existingSchemas[0] || document.createElement('script');
    const previousSchema = primarySchema.textContent;
    const extraSchemas = existingSchemas.slice(1).map((schema) => [schema, schema.parentNode, schema.nextSibling]);

    primarySchema.type = 'application/ld+json';
    primarySchema.textContent = JSON.stringify(schemaData);
    if (!primarySchema.parentNode) document.head.appendChild(primarySchema);
    extraSchemas.forEach(([schema]) => schema.remove());

    document.title = title;
    targets.forEach(([element, attribute, value]) => element?.setAttribute(attribute, value));
    if (window.location.hash) {
      window.requestAnimationFrame(() => document.querySelector(window.location.hash)?.scrollIntoView());
    } else {
      window.scrollTo(0, 0);
    }

    return () => {
      document.title = previousTitle;
      previous.forEach(([element, attribute, value]) => value && element?.setAttribute(attribute, value));
      if (createdSchema) {
        primarySchema.remove();
      } else {
        primarySchema.textContent = previousSchema;
      }
      extraSchemas.forEach(([schema, parent, nextSibling]) => parent?.insertBefore(schema, nextSibling));
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
        <PerformanceWebHero />
        <section id="mission-section" className="agency-company-block">
          <PerformanceWebWorkSection />
          <PerformanceWebMissionSection />
          <AgencyPixelTransition />
        </section>
        <PerformanceWebCtaBox />
      </main>
      <FooterSection />
    </div>
  );
};

export default PerformanceWebPage;
