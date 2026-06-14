import React, { useLayoutEffect, useRef } from 'react';
import AgencyHero from '../../agency/AgencyHero';

const TechnicalContentHero = () => {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const title = root.querySelector('.agency-about-hero__title');
    const statement = root.querySelector('.agency-about-hero__statement p');
    const foundationTitle = root.querySelector('.agency-about-hero__foundation h2');
    const foundationParagraphs = root.querySelectorAll('.agency-about-hero__foundation p');

    if (title) title.textContent = 'Conteúdo Técnico';
    if (statement) statement.textContent = 'Transformamos conhecimento complexo em conteúdo claro, indexável e preparado para construir autoridade.';
    if (foundationTitle) {
      foundationTitle.replaceChildren(
        document.createTextNode('Clareza que sustenta'),
        document.createElement('br'),
        document.createTextNode('posicionamento')
      );
    }
    if (foundationParagraphs[0]) {
      foundationParagraphs[0].textContent = 'Conectamos conhecimento técnico, intenção de busca e linguagem de marca para explicar serviços complexos com precisão.';
    }
    if (foundationParagraphs[1]) {
      foundationParagraphs[1].textContent = 'Cada conteúdo organiza ideias, fortalece presença no Google e ajuda clientes qualificados a compreender o valor da empresa.';
    }
  }, []);

  return <div ref={rootRef}><AgencyHero /></div>;
};

export default TechnicalContentHero;
