import React, { useEffect } from 'react';
import Header from '../../Header';
import FooterSection from '../../sections/FooterSection';
import ConstructionWebsiteHero from './ConstructionWebsiteHero';
import ConstructionWebsiteIntro from './ConstructionWebsiteIntro';
import ConstructionWebsitePillars from './ConstructionWebsitePillars';
import ConstructionWebsitePortfolio from './ConstructionWebsitePortfolio';
import ConstructionWebsiteQuestionSections from './ConstructionWebsiteQuestionSections';
import ConstructionWebsiteFaq, { faqItems } from './ConstructionWebsiteFaq';
import styles from './ConstructionWebsitePage.module.css';

const title = 'Criação de Site para Construtora em Uberlândia | Off-Data';
const description = 'Sites para construtoras em Uberlândia com design imersivo e SEO técnico que apresentam empreendimentos com credibilidade. Fale com a Off-Data Digital.';
const canonical = 'https://www.offdata.digital/estrategias/criacao-de-site-para-construtora';
const image = 'https://www.offdata.digital/imagens/imagem-estrategia/criacao-de-site-construtora-hero.avif';

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      headline: 'Criação de Site para Construtora em Uberlândia | Off-Data',
      description,
      url: canonical,
      inLanguage: 'pt-BR',
      image,
      author: {
        '@type': 'Organization',
        '@id': 'https://www.offdata.digital/#business',
        name: 'Off-Data Engenharia Digital',
        url: 'https://www.offdata.digital/',
      },
      publisher: {
        '@type': 'Organization',
        '@id': 'https://www.offdata.digital/#business',
        name: 'Off-Data Engenharia Digital',
        url: 'https://www.offdata.digital/',
      },
      mainEntity: {
        '@type': 'FAQPage',
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
    },
    {
      '@type': 'Service',
      name: 'Criação de Site para Construtora',
      description: 'Desenvolvimento de sites institucionais e de empreendimentos para construtoras em Uberlândia, com SEO técnico, design imersivo e otimização para IAs.',
      areaServed: 'Uberlândia, MG',
      provider: {
        '@id': 'https://www.offdata.digital/#business',
      },
    }
  ]
};

const ConstructionWebsitePage = () => {
  useEffect(() => {
    const targets = [
      [document.querySelector('meta[name="description"]'), 'content', description],
      [document.querySelector('link[rel="canonical"]'), 'href', canonical],
      [document.querySelector('meta[property="og:title"]'), 'content', title],
      [document.querySelector('meta[property="og:description"]'), 'content', description],
      [document.querySelector('meta[property="og:url"]'), 'content', canonical],
      [document.querySelector('meta[property="og:image"]'), 'content', image],
      [document.querySelector('meta[property="og:image:secure_url"]'), 'content', image],
      [document.querySelector('meta[property="og:image:alt"]'), 'content', 'Engenharia digital para construtoras em Uberlândia — Off-Data'],
      [document.querySelector('meta[name="twitter:card"]'), 'content', 'summary_large_image'],
      [document.querySelector('meta[name="twitter:title"]'), 'content', title],
      [document.querySelector('meta[name="twitter:description"]'), 'content', description],
      [document.querySelector('meta[name="twitter:image"]'), 'content', image],
      [document.querySelector('meta[name="twitter:image:alt"]'), 'content', 'Engenharia digital para construtoras em Uberlândia — Off-Data'],
    ];
    const previousTitle = document.title;
    const previous = targets.map(([element, attribute]) => [element, attribute, element?.getAttribute(attribute)]);
    const existingSchemas = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
    const primarySchema = existingSchemas[0] || document.createElement('script');
    const createdSchema = existingSchemas.length === 0;
    const previousSchema = primarySchema.textContent;
    const extras = existingSchemas.slice(1).map((item) => [item, item.parentNode, item.nextSibling]);

    primarySchema.type = 'application/ld+json';
    primarySchema.textContent = JSON.stringify(schema);
    if (!primarySchema.parentNode) document.head.appendChild(primarySchema);
    extras.forEach(([item]) => item.remove());
    document.title = title;
    targets.forEach(([element, attribute, value]) => element?.setAttribute(attribute, value));
    window.scrollTo(0, 0);

    return () => {
      document.title = previousTitle;
      previous.forEach(([element, attribute, value]) => value && element?.setAttribute(attribute, value));
      if (createdSchema) primarySchema.remove();
      else primarySchema.textContent = previousSchema;
      extras.forEach(([item, parent, sibling]) => parent?.insertBefore(item, sibling));
    };
  }, []);

  return (
    <div className={styles.page}>
      <Header />
      <main>
        <ConstructionWebsiteHero />
        <ConstructionWebsiteIntro />
        <ConstructionWebsitePillars />
        <ConstructionWebsitePortfolio />
        <ConstructionWebsiteQuestionSections />
        <ConstructionWebsiteFaq />
      </main>
      <FooterSection />
    </div>
  );
};

export default ConstructionWebsitePage;
