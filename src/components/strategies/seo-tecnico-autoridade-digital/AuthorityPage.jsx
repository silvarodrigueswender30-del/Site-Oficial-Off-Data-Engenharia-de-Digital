import React, { useEffect } from 'react';
import Header from '../../Header';
import FooterSection from '../../sections/FooterSection';
import AuthorityHero from './AuthorityHero';
import AuthorityIntro from './AuthorityIntro';
import AuthorityPillars from './AuthorityPillars';
import AuthorityQuestionSections from './AuthorityQuestionSections';
import AuthorityFaq, { faqItems } from './AuthorityFaq';
import styles from './AuthorityPage.module.css';

const title = 'SEO Técnico e Autoridade Digital para Empresas Premium | Off-Data';
const description = 'Estratégia de SEO técnico, conteúdo e autoridade digital para empresas premium em Uberlândia e Triângulo Mineiro que precisam ser encontradas, compreendidas e escolhidas com mais confiança.';
const canonical = 'https://www.offdata.digital/estrategias/seo-tecnico-autoridade-digital';
const image = 'https://www.offdata.digital/imagens/imagem-estrategia/seo-tecnico-autoridade-digital-hero.avif';
const imageAlt = 'Estrutura corporativa conectada representando SEO técnico e autoridade digital';
const schema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'SEO Técnico e Autoridade Digital para Empresas Premium',
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

const AuthorityPage = () => {
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
        <AuthorityHero />
        <AuthorityIntro />
        <AuthorityPillars />
        <AuthorityQuestionSections />
        <AuthorityFaq />
      </main>
      <FooterSection />
    </div>
  );
};

export default AuthorityPage;
