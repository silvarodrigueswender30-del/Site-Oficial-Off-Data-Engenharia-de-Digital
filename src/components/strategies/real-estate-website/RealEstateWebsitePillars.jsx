import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './RealEstateWebsitePage.module.css';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  ['{{PILLAR_1_NAME}}', '{{PILLAR_1_DESC}}'],
  ['{{PILLAR_2_NAME}}', '{{PILLAR_2_DESC}}'],
  ['{{PILLAR_3_NAME}}', '{{PILLAR_3_DESC}}'],
  ['{{PILLAR_4_NAME}}', '{{PILLAR_4_DESC}}'],
  ['{{PILLAR_5_NAME}}', '{{PILLAR_5_DESC}}'],
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
      <div className={styles.sectionHeading}><h2>{"{{PILLARS_TITLE}}"}</h2></div>
      <div className={styles.pillarsLayout}>
        <div className={styles.sideImage}>
          <img ref={imageRef} src="/imagens/imagem-estrategia/criacao-de-site-imobiliaria-img2.avif" width="2048" height="2048" alt="{{PILLARS_IMAGE_ALT}}" loading="lazy" decoding="async" />
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
