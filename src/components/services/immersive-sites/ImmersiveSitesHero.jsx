import React, { useLayoutEffect, useRef } from 'react';
import AgencyHero from '../../agency/AgencyHero';

const ImmersiveSitesHero = () => {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const title = root.querySelector('.agency-about-hero__title');
    const statement = root.querySelector('.agency-about-hero__statement p');
    const foundationTitle = root.querySelector('.agency-about-hero__foundation h2');
    const foundationParagraphs = root.querySelectorAll('.agency-about-hero__foundation p');

    if (title) title.textContent = 'Sites Imersivos';
    if (statement) statement.textContent = 'Criamos experiências digitais de alto padrão para marcas que precisam transmitir autoridade, ranquear no Google e converter.';
    if (foundationTitle) {
      foundationTitle.replaceChildren(
        document.createTextNode('Presença premium'),
        document.createElement('br'),
        document.createTextNode('desde a estrutura')
      );
    }
    if (foundationParagraphs[0]) {
      foundationParagraphs[0].textContent = 'Unimos direção visual, narrativa e experiência de uso para transformar o site em uma expressão precisa do valor da marca.';
    }
    if (foundationParagraphs[1]) {
      foundationParagraphs[1].textContent = 'Cada página nasce preparada para performance, SEO e conversão, sem abrir mão de uma presença digital memorável.';
    }
  }, []);

  return <div ref={rootRef}><AgencyHero /></div>;
};

export default ImmersiveSitesHero;
