import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './HighTicketWebPerformancePage.module.css';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  ['Core Web Vitals', 'LCP, INP e CLS ajudam a observar carregamento, resposta às interações e estabilidade visual. Esses indicadores orientam o diagnóstico técnico, mas precisam ser interpretados junto com conteúdo, design e contexto de uso.'],
  ['Primeira dobra estável', 'O início da página precisa apresentar a mensagem principal sem atrasos desnecessários ou mudanças bruscas de layout. Priorização de recursos e estrutura visual contribuem para uma entrada mais fluida.'],
  ['Mídia otimizada', 'Imagens, vídeos e animações podem preservar qualidade visual com formatos, dimensões e estratégias de carregamento adequadas. O equilíbrio evita que a estética premium se transforme em peso técnico excessivo.'],
  ['Experiência mobile', 'Conexões, telas e formas de interação variam no celular. Navegação, tipografia, mídia e respostas ao toque precisam funcionar com consistência para manter a experiência clara fora do desktop.'],
  ['Código e rastreabilidade', 'Uma base organizada facilita manutenção, SEO técnico e diagnóstico de gargalos. Monitoramento e rastreamento ajudam a identificar mudanças de desempenho sem depender apenas de uma nota isolada.'],
];

const HighTicketWebPerformancePillars = () => {
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
      <div className={styles.sectionHeading}><h2>O que sustenta uma experiência digital rápida?</h2></div>
      <div className={styles.pillarsLayout}>
        <div className={styles.sideImage}>
          <img ref={imageRef} src="/imagens/imagem-estrategia/performance-web-marcas-high-ticket-img2.avif" width="2048" height="2048" alt="Arquitetura digital corporativa representando performance, estabilidade e rastreabilidade" loading="lazy" decoding="async" />
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

export default HighTicketWebPerformancePillars;
