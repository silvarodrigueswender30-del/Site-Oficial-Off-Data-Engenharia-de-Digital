import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ConstructionWebsitePage.module.css';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  ['Apresentação de Empreendimentos', 'Páginas dedicadas a cada empreendimento, com plantas, memorial descritivo e galeria organizados para facilitar a decisão do comprador.'],
  ['SEO Técnico Local', 'Estrutura otimizada para posicionar a construtora nas buscas de Uberlândia e do Triângulo Mineiro relacionadas a novos lançamentos.'],
  ['Performance Web', 'Carregamento rápido de imagens e plantas em alta resolução, sem comprometer a velocidade de navegação em nenhum dispositivo.'],
  ['GEO — Otimização para IAs', 'Estruturação de dados para que assistentes de IA reconheçam e recomendam os empreendimentos em buscas conversacionais.'],
  ['Captação Integrada', 'Formulários por empreendimento conectados ao WhatsApp e ao CRM da construtora, agilizando o contato com o corretor responsável.'],
];

const ConstructionWebsitePillars = () => {
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
      <div className={styles.sectionHeading}><h2>{"O que sustenta um site institucional de construtora?"}</h2></div>
      <div className={styles.pillarsLayout}>
        <div className={styles.sideImage}>
          <img ref={imageRef} src="/imagens/imagem-estrategia/criacao-de-site-construtora-img2.avif" width="2048" height="2048" alt="Mercado regional de alto valor em Uberlândia" loading="lazy" decoding="async" />
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

export default ConstructionWebsitePillars;
