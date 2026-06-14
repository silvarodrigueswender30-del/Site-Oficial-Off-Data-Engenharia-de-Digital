import React, { useLayoutEffect, useRef } from 'react';
import SeoLocalWorkSection from '../seo-local/SeoLocalWorkSection';

const workAreas = [
  {
    tag: 'Diagnóstico',
    title: 'Oferta compreendida antes da página',
    text: 'Entramos no contexto do negócio para compreender proposta, público, objeções e ciclo de decisão. Assim, a landing page nasce conectada ao valor real da oferta.',
  },
  {
    tag: 'Arquitetura',
    title: 'Jornada desenhada para a decisão',
    text: 'Organizamos hierarquia, argumentos, provas disponíveis e chamadas para ação em uma sequência clara, capaz de conduzir o interesse sem simplificar demais serviços complexos.',
  },
  {
    tag: 'Expressão',
    title: 'Copy e direção visual com autoridade',
    text: 'Unimos mensagem estratégica e design sofisticado para comunicar diferenciação, reduzir objeções e construir confiança ao longo de cada seção da página.',
  },
  {
    tag: 'Performance',
    title: 'Base preparada para converter',
    text: 'Construímos páginas rápidas, responsivas e mensuráveis, prontas para receber tráfego pago, integrar ferramentas e evoluir conforme a jornada comercial revela oportunidades.',
  },
];

const LandingPagesWorkSection = () => {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const headingLines = root.querySelectorAll('.agency-work__heading-line');
    const headingParagraph = root.querySelector('.agency-work__heading p');
    const cards = root.querySelectorAll('.agency-work-card');

    if (headingLines[0]) headingLines[0].textContent = 'Criamos landing pages para ofertas';
    if (headingLines[1]) headingLines[1].textContent = 'que precisam comunicar alto valor';
    if (headingParagraph) {
      headingParagraph.textContent = 'Estruturamos páginas de conversão que conectam clareza, autoridade e sofisticação visual à jornada de decisão do lead.';
    }

    cards.forEach((card, index) => {
      const area = workAreas[index];
      if (!area) return;
      const tag = card.querySelector('.agency-work-card__tag');
      const title = card.querySelector('h3');
      const text = card.querySelector('p');
      if (tag) tag.textContent = area.tag;
      if (title) title.textContent = area.title;
      if (text) text.textContent = area.text;
    });
  }, []);

  return <div ref={rootRef}><SeoLocalWorkSection /></div>;
};

export default LandingPagesWorkSection;
