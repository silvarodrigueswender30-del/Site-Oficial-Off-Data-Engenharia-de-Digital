import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SeoLocalMissionSection = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !imageRef.current) return undefined;
    const context = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      gsap.fromTo(imageRef.current, { yPercent: 0 }, {
        yPercent: 6,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
      });
    }, section);
    return () => context.revert();
  }, []);

  return (
    <section id="agency-mission" className="agency-mission-section" ref={sectionRef}>
      <style>{`
        .agency-mission-section{display:flex;gap:0;padding:19em 1.75rem 7em;background:var(--black);color:var(--white)}
        .agency-mission-image{width:48%;height:60em;overflow:hidden}.agency-mission-image img{width:100%;height:106%;object-fit:cover;transform-origin:center top;will-change:transform}
        .agency-mission-copy{width:50%;margin-left:auto}.agency-mission-copy__tag{display:flex;align-items:center;gap:1em;font-family:'Fragment Mono',monospace;font-size:.75em;text-transform:uppercase}
        .agency-mission-copy__tag:before{content:'';width:.375em;height:.375em;border-radius:1px;background:var(--white)}
        .agency-mission-copy__statement{max-width:18ch;margin-top:2.5em;font-size:2.6em;font-weight:400;line-height:1.1}
        .agency-mission-copy__columns{display:grid;grid-template-columns:1fr 1fr;gap:2em;margin-top:16em}.agency-mission-copy__columns p{margin:0;font-size:.9em;font-weight:500;line-height:1.3}
        @media(max-width:767px){.agency-mission-section{flex-direction:column;padding:12em 1rem 6rem}.agency-mission-image{width:100%;height:76em}.agency-mission-copy{width:70%;margin-top:2rem;margin-left:0}.agency-mission-copy__tag{font-size:1.35em}.agency-mission-copy__statement{font-size:3.7em}.agency-mission-copy__columns{grid-template-columns:1fr;gap:1.3rem;width:71%}.agency-mission-copy__columns p{font-size:1.9em}}
        @media(max-width:479px){.agency-mission-section{padding-top:3.8rem}.agency-mission-image{height:106em}.agency-mission-copy{width:100%;margin-top:1.5rem}.agency-mission-copy__tag{font-size:3em}.agency-mission-copy__statement{margin-top:2.2rem;font-size:5.3em}.agency-mission-copy__columns{width:81%;margin-top:3.8rem}.agency-mission-copy__columns p{font-size:3.7em}}
      `}</style>
      <div className="agency-mission-image">
        <img ref={imageRef} src="/imagens/imagem-servico/seo-local.avif" width="1792" height="2400" alt="Imagem representando SEO local em Uberlândia" loading="lazy" decoding="async" />
      </div>
      <div className="agency-mission-copy">
        <div className="agency-mission-copy__tag">Direção</div>
        <div className="agency-mission-copy__statement">Transformar presença regional em uma base orgânica clara, encontrável e preparada para evoluir.</div>
        <div className="agency-mission-copy__columns">
          <p>Estruturamos SEO local para aproximar empresas das buscas que já revelam intenção por seus serviços em Uberlândia e no Triângulo Mineiro.</p>
          <p>Nosso trabalho combina otimização técnica, conteúdo estratégico e autoridade regional para sustentar relevância no Google ao longo do tempo.</p>
        </div>
      </div>
    </section>
  );
};

export default SeoLocalMissionSection;
