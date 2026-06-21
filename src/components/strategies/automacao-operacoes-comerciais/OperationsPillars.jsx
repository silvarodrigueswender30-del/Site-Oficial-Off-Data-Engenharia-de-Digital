import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './OperationsPage.module.css';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  ['Fluxos comerciais claros', 'Mapear origem, responsabilidade e próximo passo evita que oportunidades circulem sem dono. Fluxos simples ajudam marketing, atendimento e vendas a enxergar o que acontece depois do primeiro contato.'],
  ['Captação com contexto', 'Formulários, páginas e mensagens precisam trazer informações úteis sem criar atrito desnecessário. O objetivo é permitir que o time entenda necessidade, segmento, urgência e aderência antes da abordagem.'],
  ['Qualificação de oportunidades', 'Critérios de qualificação ajudam a separar contatos exploratórios de demandas com maior encaixe. Essa leitura melhora a priorização comercial e reduz decisões baseadas apenas em volume de mensagens.'],
  ['Integração com atendimento', 'WhatsApp, site, CRM e follow-up devem compartilhar dados essenciais. Quando a informação acompanha a jornada, o atendimento tende a ser mais objetivo, consistente e menos dependente de memória operacional.'],
  ['Acompanhamento e previsibilidade', 'Registros organizados permitem acompanhar origem, estágio, responsáveis e próximos passos. Essa base não garante resultado, mas melhora a leitura da jornada comercial e orienta decisões mais conscientes.'],
];

const OperationsPillars = () => {
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
      <div className={styles.sectionHeading}><h2>O que sustenta uma operação comercial mais previsível?</h2></div>
      <div className={styles.pillarsLayout}>
        <div className={styles.sideImage}>
          <img ref={imageRef} src="/imagens/imagem-estrategia/automacao-operacoes-comerciais-img2.avif" width="2048" height="2048" alt="Processos comerciais B2B organizados por integração entre canais digitais, CRM e atendimento" loading="lazy" decoding="async" />
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

export default OperationsPillars;
