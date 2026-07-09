import React, { useState } from 'react';
import styles from './RealEstateWebsitePortfolio.module.css';
import arrowBlue from '../../../assets/images/arrow-blue.svg';

const portfolioItems = [
  {
    image: '/imagens/imagem-estrategia/portfolio-imobiliaria-1.avif',
    alt: 'Referência de design minimalista para imobiliária',
    title: 'Interface de Listagem',
    subtitle: 'Navegação minimalista e filtros avançados de busca'
  },
  {
    image: '/imagens/imagem-estrategia/portfolio-imobiliaria-2.avif',
    alt: 'Visualização de portfólio premium de imóveis',
    title: 'Galeria Imersiva',
    subtitle: 'Visualização de alta resolução e plantas interativas'
  },
  {
    image: '/imagens/imagem-estrategia/portfolio-imobiliaria-3.avif',
    alt: 'Página de detalhes de imóvel de alto padrão',
    title: 'Página do Imóvel',
    subtitle: 'Foco em tipografia premium e storytelling do espaço'
  },
  {
    image: '/imagens/imagem-estrategia/portfolio-imobiliaria-4.avif',
    alt: 'Fluxo de conversão e contato imobiliário B2B',
    title: 'Conversão e Agendamento',
    subtitle: 'Agendamento de visitas com fluxo de qualificação B2B'
  },
  {
    image: '/imagens/imagem-estrategia/portfolio-imobiliaria-5.avif',
    alt: 'Apresentação de plantas interativas e renderizações 3D',
    title: 'Apresentação de Plantas',
    subtitle: 'Plantas humanizadas e perspectivas 3D interativas'
  },
  {
    image: '/imagens/imagem-estrategia/portfolio-imobiliaria-6.avif',
    alt: 'Seção de localização com mapas integrados',
    title: 'Destaque de Localização',
    subtitle: 'Integração de mapas personalizados e pontos de interesse'
  },
  {
    image: '/imagens/imagem-estrategia/portfolio-imobiliaria-7.avif',
    alt: 'Interface de tour virtual 360 graus para imóvel de luxo',
    title: 'Tour Virtual Integrado',
    subtitle: 'Experiência imersiva 360° em alta definição'
  }
];

// Double the items for infinite marquee on desktop
const desktopItems = [...portfolioItems, ...portfolioItems];

const RealEstateWebsitePortfolio = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const handlePrev = () => {
    setActiveSlide((prev) => (prev === 0 ? portfolioItems.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev === portfolioItems.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className={styles.portfolioSection}>
      <div className={styles.headingContainer}>
        <h2>{"Referências que elevam o padrão do site imobiliário"}</h2>
        <p>{"Modelos e conceitos visuais que inspiram a construção de um site à altura de um portfólio de alto padrão."}</p>
      </div>

      {/* Desktop Marquee Track */}
      <div className={styles.desktopContainer}>
        <div className={styles.marquee}>
          <div className={styles.marqueeTrack}>
            {desktopItems.map((item, idx) => (
              <div key={`desktop-${idx}`} className={styles.portfolioCard}>
                <div className={styles.imageWrapper}>
                  {/* Fallback gray div while image doesn't exist */}
                  <div className={styles.imageFallback} />
                  <img
                    src={item.image}
                    alt={item.alt}
                    className={styles.cardImage}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
                <div className={styles.cardContent}>
                  <h3>{item.title}</h3>
                  <p>{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile / Tablet Swipe Slider */}
      <div className={styles.mobileContainer}>
        <div className={styles.sliderWindow}>
          <div 
            className={styles.sliderTrack}
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          >
            {portfolioItems.map((item, idx) => (
              <div key={`mobile-${idx}`} className={styles.portfolioCardMobile}>
                <div className={styles.imageWrapper}>
                  <div className={styles.imageFallback} />
                  <img
                    src={item.image}
                    alt={item.alt}
                    className={styles.cardImage}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
                <div className={styles.cardContent}>
                  <h3>{item.title}</h3>
                  <p>{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile controls: Pagination dots & arrow buttons */}
        <div className={styles.controlsContainer}>
          <div className={styles.paginationDots}>
            {portfolioItems.map((_, idx) => (
              <button
                key={`dot-${idx}`}
                type="button"
                className={`${styles.dot} ${activeSlide === idx ? styles.activeDot : ''}`}
                onClick={() => setActiveSlide(idx)}
                aria-label={`Ir para o slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className={styles.arrowButtons}>
            <button
              type="button"
              className={`${styles.arrowButton} ${styles.prev}`}
              onClick={handlePrev}
              aria-label="Slide anterior"
            >
              <img src={arrowBlue} alt="" aria-hidden="true" width="14" height="14" />
            </button>
            <button
              type="button"
              className={`${styles.arrowButton} ${styles.next}`}
              onClick={handleNext}
              aria-label="Próximo slide"
            >
              <img src={arrowBlue} alt="" aria-hidden="true" width="14" height="14" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RealEstateWebsitePortfolio;
