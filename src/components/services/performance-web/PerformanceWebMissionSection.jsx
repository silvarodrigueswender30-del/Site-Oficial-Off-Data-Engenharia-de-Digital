import React, { useLayoutEffect, useRef } from 'react';
import SeoLocalMissionSection from '../seo-local/SeoLocalMissionSection';

const PerformanceWebMissionSection = () => {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const image = root.querySelector('.agency-mission-image img');
    const tag = root.querySelector('.agency-mission-copy__tag');
    const statement = root.querySelector('.agency-mission-copy__statement');
    const columns = root.querySelectorAll('.agency-mission-copy__columns p');

    if (image) {
      image.src = '/imagens/imagem-servico/performance-web.avif';
      image.alt = 'Imagem representando performance web';
    }
    if (tag) tag.textContent = 'Direção';
    if (statement) statement.textContent = 'Transformar velocidade e estabilidade em uma base prática para experiência, SEO e conversão.';
    if (columns[0]) {
      columns[0].textContent = 'Otimizamos sites para entregar conteúdo com mais eficiência, reduzir fricção e sustentar uma experiência consistente em cada dispositivo.';
    }
    if (columns[1]) {
      columns[1].textContent = 'Nosso trabalho combina Core Web Vitals, engenharia e monitoramento para preservar performance conforme a presença digital evolui.';
    }
  }, []);

  return <div ref={rootRef}><SeoLocalMissionSection /></div>;
};

export default PerformanceWebMissionSection;
