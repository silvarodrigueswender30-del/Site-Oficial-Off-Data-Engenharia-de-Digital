import React, { useLayoutEffect, useRef } from 'react';
import AgencyHero from '../../agency/AgencyHero';

const PerformanceWebHero = () => {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const title = root.querySelector('.agency-about-hero__title');
    const statement = root.querySelector('.agency-about-hero__statement p');
    const foundationTitle = root.querySelector('.agency-about-hero__foundation h2');
    const foundationParagraphs = root.querySelectorAll('.agency-about-hero__foundation p');

    if (title) title.textContent = 'Performance Web';
    if (statement) statement.textContent = 'Otimizamos velocidade, estabilidade e experiência para sites mais eficientes e preparados para conversão.';
    if (foundationTitle) {
      foundationTitle.replaceChildren(
        document.createTextNode('Precisão técnica'),
        document.createElement('br'),
        document.createTextNode('em cada acesso')
      );
    }
    if (foundationParagraphs[0]) {
      foundationParagraphs[0].textContent = 'Analisamos carregamento, Core Web Vitals e comportamento da interface para identificar atritos que comprometem experiência e SEO.';
    }
    if (foundationParagraphs[1]) {
      foundationParagraphs[1].textContent = 'A otimização preserva a sofisticação visual enquanto torna o site mais rápido, estável e preparado para decisões comerciais.';
    }
  }, []);

  return <div ref={rootRef}><AgencyHero /></div>;
};

export default PerformanceWebHero;
