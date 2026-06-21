import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './RealEstateSeoPage.module.css';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  ['Intenção local', 'Mapear como compradores descrevem bairros, tipos de imóvel, características e objetivos permite estruturar páginas alinhadas a buscas reais, sem reduzir a comunicação premium a palavras-chave genéricas.'],
  ['Arquitetura de páginas', 'Páginas de localização, categorias e imóveis precisam formar uma estrutura coerente. Essa organização facilita a leitura do Google e ajuda visitantes a avançarem entre contexto regional, portfólio e atendimento.'],
  ['Autoridade regional', 'Conteúdo útil sobre regiões, estilo de vida, infraestrutura e critérios de compra tende a fortalecer a percepção de especialidade. O foco deve ser informar com precisão, não apenas repetir nomes de cidades.'],
  ['Presença no Google', 'Um Perfil da Empresa completo, consistente e atualizado complementa o site. Informações corretas, imagens adequadas e avaliações legítimas tornam a jornada local mais clara para quem pesquisa.'],
  ['Evolução contínua', 'SEO local exige acompanhamento técnico e editorial. Mudanças no portfólio, nas áreas atendidas e no comportamento de busca orientam novas prioridades sem comprometer a consistência construída.'],
];

const RealEstateSeoPillars = () => {
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
      <div className={styles.sectionHeading}><h2>O que sustenta uma estratégia local premium?</h2></div>
      <div className={styles.pillarsLayout}>
        <div className={styles.sideImage}>
          <img ref={imageRef} src="/imagens/imagem-estrategia/seo-local-imobiliarias-luxo-img2.avif" width="2048" height="2048" alt="Mercado regional de alto valor em Uberlândia" loading="lazy" decoding="async" />
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

export default RealEstateSeoPillars;
