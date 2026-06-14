import React, { useEffect } from 'react';
import Header from '../../Header';
import FooterSection from '../../sections/FooterSection';
import RealEstateSeoHero from './RealEstateSeoHero';
import RealEstateSeoIntro from './RealEstateSeoIntro';
import RealEstateSeoPillars from './RealEstateSeoPillars';
import RealEstateSeoQuestionSections from './RealEstateSeoQuestionSections';
import RealEstateSeoFaq, { faqItems } from './RealEstateSeoFaq';
import styles from './RealEstateSeoPage.module.css';

const title = 'SEO Local para Imobiliárias de Luxo em Uberlândia | Off-Data Digital';
const description = 'Estratégia de SEO local para imobiliárias premium em Uberlândia. Apareça no Google quando compradores de alto padrão buscarem imóveis na sua região.';
const canonical = 'https://www.offdata.digital/estrategias/seo-local-imobiliarias-luxo';
  const image = 'https://www.offdata.digital/imagens/imagem-estrategia/seo-local-imobiliarias-luxo-hero.avif';
const schema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'SEO Local para Imobiliárias de Luxo em Uberlândia e Triângulo Mineiro',
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
};

const RealEstateSeoPage = () => {
  useEffect(() => {
    const targets = [
      [document.querySelector('meta[name="description"]'), 'content', description],
      [document.querySelector('link[rel="canonical"]'), 'href', canonical],
      [document.querySelector('meta[property="og:title"]'), 'content', title],
      [document.querySelector('meta[property="og:description"]'), 'content', description],
      [document.querySelector('meta[property="og:url"]'), 'content', canonical],
      [document.querySelector('meta[property="og:image"]'), 'content', image],
      [document.querySelector('meta[property="og:image:secure_url"]'), 'content', image],
      [document.querySelector('meta[property="og:image:alt"]'), 'content', 'Arquitetura premium representando SEO local para imobiliárias de luxo'],
      [document.querySelector('meta[name="twitter:card"]'), 'content', 'summary_large_image'],
      [document.querySelector('meta[name="twitter:title"]'), 'content', title],
      [document.querySelector('meta[name="twitter:description"]'), 'content', description],
      [document.querySelector('meta[name="twitter:image"]'), 'content', image],
      [document.querySelector('meta[name="twitter:image:alt"]'), 'content', 'Arquitetura premium representando SEO local para imobiliárias de luxo'],
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
        <RealEstateSeoHero />
        <RealEstateSeoIntro />
        <RealEstateSeoPillars />
        <RealEstateSeoQuestionSections />
        <RealEstateSeoFaq />
      </main>
      <FooterSection />
    </div>
  );
};

export default RealEstateSeoPage;
