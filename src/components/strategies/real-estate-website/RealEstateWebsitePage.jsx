import React, { useEffect } from 'react';
import Header from '../../Header';
import FooterSection from '../../sections/FooterSection';
import RealEstateWebsiteHero from './RealEstateWebsiteHero';
import RealEstateWebsiteIntro from './RealEstateWebsiteIntro';
import RealEstateWebsitePillars from './RealEstateWebsitePillars';
import RealEstateWebsiteQuestionSections from './RealEstateWebsiteQuestionSections';
import RealEstateWebsiteFaq, { faqItems } from './RealEstateWebsiteFaq';
import styles from './RealEstateWebsitePage.module.css';

const title = '{{META_TITLE}}';
const description = '{{META_DESCRIPTION}}';
const canonical = 'https://www.offdata.digital/estrategias/criacao-de-site-para-imobiliaria';
const image = 'https://www.offdata.digital/imagens/imagem-estrategia/criacao-de-site-imobiliaria-hero.avif';

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      headline: '{{HERO_H1}}',
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
      name: '{{SERVICE_NAME}}',
      description: '{{SERVICE_DESCRIPTION}}',
      areaServed: '{{AREA_SERVED}}',
      provider: {
        '@id': 'https://www.offdata.digital/#business',
      },
    }
  ]
};

const RealEstateWebsitePage = () => {
  useEffect(() => {
    const targets = [
      [document.querySelector('meta[name="description"]'), 'content', description],
      [document.querySelector('link[rel="canonical"]'), 'href', canonical],
      [document.querySelector('meta[property="og:title"]'), 'content', title],
      [document.querySelector('meta[property="og:description"]'), 'content', description],
      [document.querySelector('meta[property="og:url"]'), 'content', canonical],
      [document.querySelector('meta[property="og:image"]'), 'content', image],
      [document.querySelector('meta[property="og:image:secure_url"]'), 'content', image],
      [document.querySelector('meta[property="og:image:alt"]'), 'content', '{{HERO_IMAGE_ALT}}'],
      [document.querySelector('meta[name="twitter:card"]'), 'content', 'summary_large_image'],
      [document.querySelector('meta[name="twitter:title"]'), 'content', title],
      [document.querySelector('meta[name="twitter:description"]'), 'content', description],
      [document.querySelector('meta[name="twitter:image"]'), 'content', image],
      [document.querySelector('meta[name="twitter:image:alt"]'), 'content', '{{HERO_IMAGE_ALT}}'],
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
        <RealEstateWebsiteHero />
        <RealEstateWebsiteIntro />
        <RealEstateWebsitePillars />
        <RealEstateWebsiteQuestionSections />
        <RealEstateWebsiteFaq />
      </main>
      <FooterSection />
    </div>
  );
};

export default RealEstateWebsitePage;
