import React, { useLayoutEffect, useRef } from 'react';
import AgencyHero from '../../agency/AgencyHero';

const B2BAutomationHero = () => {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const title = root.querySelector('.agency-about-hero__title');
    const statement = root.querySelector('.agency-about-hero__statement p');
    const foundationTitle = root.querySelector('.agency-about-hero__foundation h2');
    const foundationParagraphs = root.querySelectorAll('.agency-about-hero__foundation p');

    if (title) title.textContent = 'Automação Comercial B2B';
    if (statement) statement.textContent = 'Integramos processos, canais e fluxos para operações comerciais mais organizadas, eficientes e previsíveis.';
    if (foundationTitle) {
      foundationTitle.replaceChildren(
        document.createTextNode('Processos conectados'),
        document.createElement('br'),
        document.createTextNode('desde a entrada')
      );
    }
    if (foundationParagraphs[0]) {
      foundationParagraphs[0].textContent = 'Mapeamos atendimento, qualificação e distribuição de oportunidades para reduzir tarefas manuais e organizar a jornada comercial.';
    }
    if (foundationParagraphs[1]) {
      foundationParagraphs[1].textContent = 'Site, formulários, WhatsApp e CRM passam a trabalhar como partes de um fluxo claro, mensurável e preparado para evoluir.';
    }
  }, []);

  return <div ref={rootRef}><AgencyHero /></div>;
};

export default B2BAutomationHero;
