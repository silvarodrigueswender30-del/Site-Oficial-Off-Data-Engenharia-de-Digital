import React, { useState, useId } from 'react';
import styles from './SharedPortfolioCarousel.module.css';
import arrowBlue from '../assets/images/arrow-blue.svg';

const SharedPortfolioCarousel = ({ items }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const baseId = useId();

  const handlePrev = () => {
    setActiveSlide((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  if (!items || items.length === 0) return null;

  return (
    <>
      {/* Desktop Marquee Track */}
      <div className={styles.desktopContainer} aria-label="Carrossel de portfólio de projetos">
        <div className={styles.marquee}>
          <div className={styles.marqueeTrack}>
            {/* Lista Original (acessível) */}
            {items.map((item, idx) => (
              <div key={`${baseId}-orig-${idx}`} className={styles.portfolioCard}>
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
            {/* Lista Duplicada para criar o loop (escondida de leitores de tela) */}
            {items.map((item, idx) => (
              <div key={`${baseId}-dup-${idx}`} className={styles.portfolioCard} aria-hidden="true">
                <div className={styles.imageWrapper}>
                  <div className={styles.imageFallback} />
                  <img
                    src={item.image}
                    alt="" /* alt vazio na cópia por segurança a11y */
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
      <div className={styles.mobileContainer} aria-label="Slider de portfólio mobile">
        <div className={styles.sliderWindow}>
          <div 
            className={styles.sliderTrack}
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          >
            {items.map((item, idx) => (
              <div key={`${baseId}-mob-${idx}`} className={styles.portfolioCardMobile} aria-hidden={activeSlide !== idx}>
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
          <div className={styles.paginationDots} role="tablist" aria-label="Paginação do portfólio">
            {items.map((_, idx) => (
              <button
                key={`${baseId}-dot-${idx}`}
                type="button"
                className={`${styles.dot} ${activeSlide === idx ? styles.activeDot : ''}`}
                onClick={() => setActiveSlide(idx)}
                role="tab"
                aria-selected={activeSlide === idx}
                aria-label={`Ir para o projeto ${idx + 1}`}
              />
            ))}
          </div>

          <div className={styles.arrowButtons}>
            <button
              type="button"
              className={`${styles.arrowButton} ${styles.prev}`}
              onClick={handlePrev}
              aria-label="Projeto anterior"
            >
              <img src={arrowBlue} alt="" aria-hidden="true" width="14" height="14" />
            </button>
            <button
              type="button"
              className={`${styles.arrowButton} ${styles.next}`}
              onClick={handleNext}
              aria-label="Próximo projeto"
            >
              <img src={arrowBlue} alt="" aria-hidden="true" width="14" height="14" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SharedPortfolioCarousel;
