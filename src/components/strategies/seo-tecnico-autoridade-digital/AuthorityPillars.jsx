import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './AuthorityPage.module.css';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  ['Base técnica indexável', 'Rastreamento, arquitetura, velocidade, links internos e marcações ajudam mecanismos de busca a compreender o site. Sem essa base, até conteúdos fortes podem perder clareza técnica.'],
  ['Conteúdo com intenção real', 'Temas devem responder dúvidas que surgem na jornada de decisão. Conteúdo estratégico traduz especialidade, contexto comercial e critérios de escolha sem repetir palavras-chave de forma artificial.'],
  ['Autoridade regional', 'Empresas premium precisam mostrar relação real com Uberlândia e Triângulo Mineiro. Páginas, cases, linguagem e sinais locais ajudam a sustentar relevância sem criar conteúdo genérico.'],
  ['Performance e confiança', 'Uma experiência rápida, estável e legível reduz atrito antes do contato. Performance não garante conversão, mas protege a percepção de cuidado, organização e profissionalismo.'],
  ['Clareza para decisão', 'Estrutura semântica, hierarquia visual e mensagens objetivas ajudam o visitante a entender serviços, diferenciais e próximos passos. Autoridade cresce quando a escolha fica menos confusa.'],
];

const AuthorityPillars = () => {
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
      <div className={styles.sectionHeading}><h2>O que sustenta autoridade digital confiável?</h2></div>
      <div className={styles.pillarsLayout}>
        <div className={styles.sideImage}>
          <img ref={imageRef} src="/imagens/imagem-estrategia/seo-tecnico-autoridade-digital-img2.avif" width="2048" height="2048" alt="Arquitetura digital corporativa representando autoridade, conteúdo e indexação" loading="lazy" decoding="async" />
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

export default AuthorityPillars;
