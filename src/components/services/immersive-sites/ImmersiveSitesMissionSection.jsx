import React, { useLayoutEffect, useRef } from 'react';
import SeoLocalMissionSection from '../seo-local/SeoLocalMissionSection';

const ImmersiveSitesMissionSection = () => {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const image = root.querySelector('.agency-mission-image img');
    const tag = root.querySelector('.agency-mission-copy__tag');
    const statement = root.querySelector('.agency-mission-copy__statement');
    const columns = root.querySelectorAll('.agency-mission-copy__columns p');

    if (image) {
      image.src = '/imagens/imagem-servico/sites-imersivos.avif';
      image.alt = 'Imagem representando criação de sites premium em Uberlândia';
    }
    if (tag) tag.textContent = 'Direção';
    if (statement) statement.textContent = 'Construir experiências digitais que façam a percepção de valor da marca acontecer antes da primeira conversa.';
    if (columns[0]) {
      columns[0].textContent = 'Criamos sites que organizam argumentos, apresentam diferenciais e conduzem visitantes com clareza até a próxima decisão.';
    }
    if (columns[1]) {
      columns[1].textContent = 'Nossa abordagem integra expressão visual, engenharia de performance e estrutura de SEO para sustentar resultados no longo prazo.';
    }
  }, []);

  return <div ref={rootRef}><SeoLocalMissionSection /></div>;
};

export default ImmersiveSitesMissionSection;
