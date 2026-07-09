import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './RealEstateWebsitePage.module.css';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  ['Design Imersivo', 'Apresentação visual dos imóveis com hierarquia clara de informação, fotografia em destaque e navegação pensada para o comprador de alto padrão.'],
  ['SEO Técnico Local', 'Estrutura de site otimizada para posicionar a imobiliária nas buscas de Uberlândia e do Triângulo Mineiro, com foco em quem já está pronto para comprar.'],
  ['Performance Web', 'Carregamento rápido em qualquer dispositivo, essencial para reter um comprador que avalia várias opções em poucos minutos.'],
  ['GEO — Otimização para IAs', 'Estruturação de conteúdo e dados para que assistentes de IA reconheçam e recomendem a imobiliária em buscas conversacionais.'],
  ['Integração com Captação', 'Formulários e fluxos de contato conectados diretamente ao WhatsApp e ao CRM da imobiliária, reduzindo o tempo entre interesse e contato.'],
];

const RealEstateWebsitePillars = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    if (!imageRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const context = gsap.context(() => {
      gsap.fromTo(imageRef.current, { yPercent: 0 }, {
        yPercent: 6,
        ease: 'none',
        scrollTrigger: { trigger: imageRef.current.parentElement, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
      });
    });
    return () => context.revert();
  }, []);

  return (
    <section className={styles.editorial}>
      <div className={styles.sectionHeading}><h2>{"O que sustenta um site de imobiliária de alto padrão?"}</h2></div>
      <div className={styles.pillarsLayout}>
        <div className={styles.sideImage}>
          <img ref={imageRef} src="/imagens/imagem-estrategia/criacao-de-site-imobiliaria-img2.avif" width="2048" height="2048" alt="Mercado regional de alto valor em Uberlândia" loading="lazy" decoding="async" />
        </div>
        <ol className={styles.pillars}>
          {pillars.map(([title, text], index) => (
            <li key={title}>
              <span className={styles.number}>{index + 1}</span>
              <div><h3>{title}</h3><p>{text}</p></div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default RealEstateWebsitePillars;
