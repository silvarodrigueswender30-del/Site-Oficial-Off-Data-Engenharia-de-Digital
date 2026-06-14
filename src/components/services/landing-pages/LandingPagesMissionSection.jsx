import React, { useLayoutEffect, useRef } from 'react';
import SeoLocalMissionSection from '../seo-local/SeoLocalMissionSection';

const LandingPagesMissionSection = () => {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const image = root.querySelector('.agency-mission-image img');
    const tag = root.querySelector('.agency-mission-copy__tag');
    const statement = root.querySelector('.agency-mission-copy__statement');
    const columns = root.querySelectorAll('.agency-mission-copy__columns p');

    if (image) {
      image.src = '/imagens/imagem-servico/landing-pages-high-ticket.avif';
      image.alt = 'Imagem representando landing pages high ticket';
    }
    if (tag) tag.textContent = 'Direção';
    if (statement) statement.textContent = 'Transformar ofertas de alto valor em páginas claras, sofisticadas e preparadas para a decisão.';
    if (columns[0]) {
      columns[0].textContent = 'Criamos landing pages que organizam argumentos, antecipam objeções e ajudam o lead a compreender por que a oferta merece atenção.';
    }
    if (columns[1]) {
      columns[1].textContent = 'Nosso trabalho integra copy, design, performance e mensuração para conectar percepção premium a uma jornada comercial consistente.';
    }
  }, []);

  return <div ref={rootRef}><SeoLocalMissionSection /></div>;
};

export default LandingPagesMissionSection;
