import React, { useLayoutEffect, useRef } from 'react';
import AgencyHero from '../../agency/AgencyHero';

const PaidTrafficHero = () => {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const title = root.querySelector('.agency-about-hero__title');
    const statement = root.querySelector('.agency-about-hero__statement p');
    const foundationTitle = root.querySelector('.agency-about-hero__foundation h2');
    const foundationParagraphs = root.querySelectorAll('.agency-about-hero__foundation p');

    if (title) title.textContent = 'Tráfego Cirúrgico';
    if (statement) statement.textContent = 'Planejamos campanhas de Google Ads e Meta Ads para gerar oportunidades qualificadas em Uberlândia.';
    if (foundationTitle) {
      foundationTitle.replaceChildren(
        document.createTextNode('Precisão antes'),
        document.createElement('br'),
        document.createTextNode('do investimento')
      );
    }
    if (foundationParagraphs[0]) {
      foundationParagraphs[0].textContent = 'Conectamos oferta, público, canal e mensagem para direcionar verba às buscas e audiências com maior intenção de compra.';
    }
    if (foundationParagraphs[1]) {
      foundationParagraphs[1].textContent = 'Cada campanha nasce com uma jornada clara, mensuração consistente e espaço para evoluir com base em oportunidades reais.';
    }
  }, []);

  return <div ref={rootRef}><AgencyHero /></div>;
};

export default PaidTrafficHero;
