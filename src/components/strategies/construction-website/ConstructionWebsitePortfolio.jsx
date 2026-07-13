import React, { useState } from 'react';
import styles from './ConstructionWebsitePortfolio.module.css';
import arrowBlue from '../../../assets/images/arrow-blue.svg';

const portfolioItems = [
  {
    image: '/imagens/imagem-estrategia/portfolio-construtora-1.avif',
    alt: 'Referência de site institucional para construtora 1',
    title: 'Referência de site institucional para construtora 1',
    subtitle: 'Página do Empreendimento — Apresentação de plantas, memorial descritivo e galeria em destaque'
  },
  {
    image: '/imagens/imagem-estrategia/portfolio-construtora-2.avif',
    alt: 'Referência de site institucional para construtora 2',
    title: 'Referência de site institucional para construtora 2',
    subtitle: 'Tour Virtual Integrado — Experiência imersiva 360° do apartamento decorado'
  },
  {
    image: '/imagens/imagem-estrategia/portfolio-construtora-3.avif',
    alt: 'Referência de site institucional para construtora 3',
    title: 'Referência de site institucional para construtora 3',
    subtitle: 'Linha do Tempo da Obra — Acompanhamento visual do cronograma de entrega'
  },
  {
    image: '/imagens/imagem-estrategia/portfolio-construtora-4.avif',
    alt: 'Referência de site institucional para construtora 4',
    title: 'Referência de site institucional para construtora 4',
    subtitle: 'Localização e Bairro — Mapas personalizados e pontos de interesse ao redor do empreendimento'
  },
  {
    image: '/imagens/imagem-estrategia/portfolio-construtora-5.avif',
    alt: 'Referência de site institucional para construtora 5',
    title: 'Referência de site institucional para construtora 5',
    subtitle: 'Plantas Humanizadas — Perspectivas 3D interativas por tipologia de unidade'
  },
  {
    image: '/imagens/imagem-estrategia/portfolio-construtora-6.avif',
    alt: 'Referência de site institucional para construtora 6',
    title: 'Referência de site institucional para construtora 6',
    subtitle: 'Captação e Agendamento — Fluxo de contato com qualificação de lead por empreendimento'
  },
  {
    image: '/imagens/imagem-estrategia/portfolio-construtora-7.avif',
    alt: 'Referência de site institucional para construtora 7',
    title: 'Referência de site institucional para construtora 7',
    subtitle: 'Portfólio de Lançamentos — Visão institucional de todos os empreendimentos ativos'
  }
];

// Double the items for infinite marquee on desktop
const desktopItems = [...portfolioItems, ...portfolioItems];

const ConstructionWebsitePortfolio = () => {
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
        <h2>{"Referências que elevam o padrão do site institucional"}</h2>
        <p>{"Modelos e conceitos visuais que inspiram a construção de um site à altura de uma construtora de referência."}</p>
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

export default ConstructionWebsitePortfolio;
