import React, { useLayoutEffect, useRef } from 'react';
import SeoLocalMissionSection from '../seo-local/SeoLocalMissionSection';

const B2BAutomationMissionSection = () => {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const image = root.querySelector('.agency-mission-image img');
    const tag = root.querySelector('.agency-mission-copy__tag');
    const statement = root.querySelector('.agency-mission-copy__statement');
    const columns = root.querySelectorAll('.agency-mission-copy__columns p');

    if (image) {
      image.src = '/imagens/imagem-servico/automacao-comercial-b2b.avif';
      image.alt = 'Imagem representando automação comercial B2B';
    }
    if (tag) tag.textContent = 'Direção';
    if (statement) statement.textContent = 'Transformar processos manuais em uma operação comercial integrada, clara e preparada para evoluir.';
    if (columns[0]) {
      columns[0].textContent = 'Estruturamos automações para organizar a entrada, qualificação e continuidade dos leads ao longo do funil comercial B2B.';
    }
    if (columns[1]) {
      columns[1].textContent = 'Nosso trabalho conecta ferramentas e equipes para reduzir dispersão, preservar contexto e apoiar vendas com mais previsibilidade.';
    }
  }, []);

  return <div ref={rootRef}><SeoLocalMissionSection /></div>;
};

export default B2BAutomationMissionSection;
