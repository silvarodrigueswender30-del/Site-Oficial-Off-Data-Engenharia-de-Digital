import React, { useEffect } from 'react';
import Header from '../../Header';
import FooterSection from '../../sections/FooterSection';
import B2BHighIntentTrafficHero from './B2BHighIntentTrafficHero';
import B2BHighIntentTrafficIntro from './B2BHighIntentTrafficIntro';
import B2BHighIntentTrafficPillars from './B2BHighIntentTrafficPillars';
import B2BHighIntentTrafficQuestionSections from './B2BHighIntentTrafficQuestionSections';
import B2BHighIntentTrafficFaq, { faqItems } from './B2BHighIntentTrafficFaq';
import styles from './B2BHighIntentTrafficPage.module.css';

const title = 'Tráfego Pago B2B de Alta Intenção no Triângulo Mineiro | Off-Data Digital';
const description = 'Gestão de tráfego pago para empresas B2B no Triângulo Mineiro. Campanhas no Google e Meta focadas em leads qualificados de alto valor para sua operação.';
const canonical = 'https://www.offdata.digital/estrategias/trafego-alta-intencao-b2b';
  const image = 'https://www.offdata.digital/imagens/imagem-estrategia/trafego-alta-intencao-b2b-hero.avif';
const imageAlt = 'Operação B2B regional conectada por dados e tráfego de alta intenção';
const schema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Tráfego Pago B2B de Alta Intenção no Triângulo Mineiro',
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

const B2BHighIntentTrafficPage = () => {
  useEffect(() => {
    const targets = [
      [document.querySelector('meta[name="description"]'), 'content', description],
      [document.querySelector('link[rel="canonical"]'), 'href', canonical],
      [document.querySelector('meta[property="og:title"]'), 'content', title],
      [document.querySelector('meta[property="og:description"]'), 'content', description],
      [document.querySelector('meta[property="og:url"]'), 'content', canonical],
      [document.querySelector('meta[property="og:image"]'), 'content', image],
      [document.querySelector('meta[property="og:image:secure_url"]'), 'content', image],
      [document.querySelector('meta[property="og:image:alt"]'), 'content', imageAlt],
      [document.querySelector('meta[name="twitter:card"]'), 'content', 'summary_large_image'],
      [document.querySelector('meta[name="twitter:title"]'), 'content', title],
      [document.querySelector('meta[name="twitter:description"]'), 'content', description],
      [document.querySelector('meta[name="twitter:image"]'), 'content', image],
      [document.querySelector('meta[name="twitter:image:alt"]'), 'content', imageAlt],
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
        <B2BHighIntentTrafficHero />
        <B2BHighIntentTrafficIntro />
        <B2BHighIntentTrafficPillars />
        <B2BHighIntentTrafficQuestionSections />
        <B2BHighIntentTrafficFaq />
      </main>
      <FooterSection />
    </div>
  );
};

export default B2BHighIntentTrafficPage;
