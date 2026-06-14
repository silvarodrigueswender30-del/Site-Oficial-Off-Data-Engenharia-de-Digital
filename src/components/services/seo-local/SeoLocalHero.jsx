import React, { useLayoutEffect, useRef } from 'react';
import AgencyHero from '../../agency/AgencyHero';

const SeoLocalHero = () => {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const title = root.querySelector('.agency-about-hero__title');
    const statement = root.querySelector('.agency-about-hero__statement p');
    const foundationTitle = root.querySelector('.agency-about-hero__foundation h2');
    const foundationParagraphs = root.querySelectorAll('.agency-about-hero__foundation p');

    if (title) title.textContent = 'SEO Local';
    if (statement) statement.textContent = 'Estruturamos presença orgânica regional para empresas que precisam aparecer no Google em Uberlândia.';
    if (foundationTitle) {
      foundationTitle.replaceChildren(
        document.createTextNode('Presença local'),
        document.createElement('br'),
        document.createTextNode('desde a base')
      );
    }
    if (foundationParagraphs[0]) {
      foundationParagraphs[0].textContent = 'Conectamos arquitetura técnica, conteúdo estratégico e sinais regionais para fortalecer a relevância da empresa nas buscas locais.';
    }
    if (foundationParagraphs[1]) {
      foundationParagraphs[1].textContent = 'O objetivo é ser encontrado por clientes qualificados em Uberlândia e no Triângulo Mineiro, com uma presença orgânica preparada para evoluir.';
    }
  }, []);

  return <div ref={rootRef}><AgencyHero /></div>;
};

export default SeoLocalHero;
