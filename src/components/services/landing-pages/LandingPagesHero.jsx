import React, { useLayoutEffect, useRef } from 'react';
import AgencyHero from '../../agency/AgencyHero';

const LandingPagesHero = () => {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const title = root.querySelector('.agency-about-hero__title');
    const statement = root.querySelector('.agency-about-hero__statement p');
    const foundationTitle = root.querySelector('.agency-about-hero__foundation h2');
    const foundationParagraphs = root.querySelectorAll('.agency-about-hero__foundation p');

    if (title) title.textContent = 'Landing Pages High Ticket';
    if (statement) statement.textContent = 'Criamos páginas de conversão premium para apresentar ofertas de alto valor com clareza e autoridade.';
    if (foundationTitle) {
      foundationTitle.replaceChildren(
        document.createTextNode('Conversão começa'),
        document.createElement('br'),
        document.createTextNode('pela estrutura')
      );
    }
    if (foundationParagraphs[0]) {
      foundationParagraphs[0].textContent = 'Conectamos estratégia, copy e direção visual para transformar ofertas complexas em jornadas claras, relevantes e persuasivas.';
    }
    if (foundationParagraphs[1]) {
      foundationParagraphs[1].textContent = 'Cada seção conduz a decisão com precisão, sustenta percepção de valor e prepara o lead para avançar com confiança.';
    }
  }, []);

  return <div ref={rootRef}><AgencyHero /></div>;
};

export default LandingPagesHero;
