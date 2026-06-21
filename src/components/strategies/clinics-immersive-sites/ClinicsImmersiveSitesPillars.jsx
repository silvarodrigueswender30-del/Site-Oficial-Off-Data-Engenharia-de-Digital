import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ClinicsImmersiveSitesPage.module.css';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  ['Posicionamento premium', 'A linguagem visual e editorial precisa refletir o nível de cuidado da clínica sem transformar sofisticação em excesso. Tipografia, imagens, ritmo e conteúdo devem sustentar uma presença segura, clara e compatível com o posicionamento institucional.'],
  ['Jornada clara', 'Especialidades, localização, horários, canais de contato e orientações iniciais precisam estar organizados para reduzir dúvidas. Uma navegação previsível ajuda cada pessoa a encontrar informações relevantes sem depender de caminhos confusos.'],
  ['Design que transmite confiança', 'Uma interface consistente ajuda a comunicar atenção aos detalhes. Hierarquia visual, legibilidade e escolhas cuidadosas de imagem contribuem para uma primeira impressão profissional, sem substituir a qualidade clínica ou fazer promessas sobre resultados.'],
  ['SEO local médico', 'Páginas úteis, dados consistentes e um Perfil da Empresa bem cuidado podem fortalecer a presença em pesquisas locais. A estratégia deve respeitar a realidade da clínica, suas especialidades e as normas aplicáveis à publicidade médica.'],
  ['Performance e acessibilidade', 'Velocidade, estabilidade, contraste, leitura móvel e compatibilidade com tecnologias assistivas fazem parte da experiência. Uma base técnica sólida reduz atritos e permite que o conteúdo seja acessado com mais clareza em diferentes contextos.'],
];

const ClinicsImmersiveSitesPillars = () => {
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
      <div className={styles.sectionHeading}><h2>O que sustenta uma experiência médica premium?</h2></div>
      <div className={styles.pillarsLayout}>
        <div className={styles.sideImage}>
          <img ref={imageRef} src="/imagens/imagem-estrategia/sites-imersivos-clinicas-medicas-img2.avif" width="2048" height="2048" alt="Ambiente clínico sofisticado representando confiança e experiência digital" loading="lazy" decoding="async" />
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

export default ClinicsImmersiveSitesPillars;
