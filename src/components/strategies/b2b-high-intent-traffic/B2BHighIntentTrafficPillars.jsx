import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './B2BHighIntentTrafficPage.module.css';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  ['Intenção comercial', 'Mapear como gestores e compradores pesquisam fornecedores ajuda a separar curiosidade de demanda ativa. Termos, mensagens e negativas precisam refletir problemas reais, contexto regional e maturidade da decisão.'],
  ['Segmentação regional', 'Cidades, áreas atendidas e características da operação orientam a distribuição da mídia. A segmentação ajuda a reduzir desperdício, mas precisa ser combinada com oferta, linguagem e dados de desempenho.'],
  ['Landing pages B2B', 'Uma página de destino deve explicar solução, aplicação, diferenciais e próximo passo sem ruído. Conteúdo técnico claro ajuda o decisor a avaliar aderência e prepara uma conversa comercial mais objetiva.'],
  ['Rastreamento de origem', 'Eventos, conversões e integração com CRM permitem acompanhar de onde surgem contatos e oportunidades. A mensuração correta ajuda a avaliar eficiência e orientar decisões sem transformar métricas isoladas em garantia de retorno.'],
  ['Qualificação comercial', 'Formulários, mensagens e critérios de encaminhamento podem organizar informações antes do contato. A qualificação melhora quando campanha, landing page e processo comercial compartilham definições e aprendizados.'],
];

const B2BHighIntentTrafficPillars = () => {
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
      <div className={styles.sectionHeading}><h2>O que sustenta mídia B2B de alta intenção?</h2></div>
      <div className={styles.pillarsLayout}>
        <div className={styles.sideImage}>
          <img ref={imageRef} src="/imagens/imagem-estrategia/trafego-alta-intencao-b2b-img2.avif" alt="Operações corporativas conectadas por arquitetura digital e dados em Uberlândia" loading="lazy" decoding="async" />
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

export default B2BHighIntentTrafficPillars;
