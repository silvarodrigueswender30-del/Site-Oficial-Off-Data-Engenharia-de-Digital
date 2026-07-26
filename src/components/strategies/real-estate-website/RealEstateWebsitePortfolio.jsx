import React from 'react';
import styles from './RealEstateWebsitePortfolio.module.css';
import SharedPortfolioCarousel from '../../SharedPortfolioCarousel';
import { realEstatePortfolioItems } from '../../../constants/portfolioData';

const RealEstateWebsitePortfolio = () => {
  return (
    <section className={styles.portfolioSection}>
      <div className={styles.headingContainer}>
        <h2>{"Referências que elevam o padrão do site imobiliário"}</h2>
        <p>{"Modelos e conceitos visuais que inspiram a construção de um site à altura de um portfólio de alto padrão."}</p>
      </div>

      <SharedPortfolioCarousel items={realEstatePortfolioItems} />
    </section>
  );
};

export default RealEstateWebsitePortfolio;
