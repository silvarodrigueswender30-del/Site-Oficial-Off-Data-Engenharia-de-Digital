import React, { useEffect } from 'react';
import Header from '../../Header';
import FooterSection from '../../sections/FooterSection';
import OperationsHero from './OperationsHero';
import OperationsIntro from './OperationsIntro';
import OperationsPillars from './OperationsPillars';
import OperationsQuestionSections from './OperationsQuestionSections';
import OperationsFaq, { faqItems } from './OperationsFaq';
import styles from './OperationsPage.module.css';

const title = 'Automação e Operações Comerciais para Empresas B2B | Off-Data';
const description = 'Estratégia de automação, organização comercial e operações digitais para empresas B2B em Uberlândia e Triângulo Mineiro que precisam captar, qualificar e acompanhar oportunidades com mais previsibilidade.';
const canonical = 'https://www.offdata.digital/estrategias/automacao-operacoes-comerciais';
const image = 'https://www.offdata.digital/imagens/imagem-estrategia/automacao-operacoes-comerciais-hero.avif';
const imageAlt = 'Operações comerciais digitais conectadas por automação e processos B2B';
const schema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Automação e Operações Comerciais para Empresas B2B',
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

const OperationsPage = () => {
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
        <OperationsHero />
        <OperationsIntro />
        <OperationsPillars />
        <OperationsQuestionSections />
        <OperationsFaq />
      </main>
      <FooterSection />
    </div>
  );
};

export default OperationsPage;
