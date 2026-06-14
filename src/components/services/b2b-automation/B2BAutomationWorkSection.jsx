import React, { useLayoutEffect, useRef } from 'react';
import SeoLocalWorkSection from '../seo-local/SeoLocalWorkSection';

const workAreas = [
  {
    tag: 'Diagnóstico',
    title: 'Processo comercial compreendido na base',
    text: 'Mapeamos canais, etapas, responsabilidades e pontos de atrito para entender onde tarefas manuais atrasam o atendimento e comprometem a continuidade das oportunidades.',
  },
  {
    tag: 'Integração',
    title: 'Canais conectados ao fluxo comercial',
    text: 'Integramos site, formulários, WhatsApp e CRM para que informações relevantes acompanhem cada lead e cheguem à equipe certa com mais organização.',
  },
  {
    tag: 'Qualificação',
    title: 'Oportunidades organizadas por contexto',
    text: 'Estruturamos critérios, distribuição e follow-up para ajudar equipes comerciais a reconhecer prioridades e conduzir cada oportunidade com informações mais claras.',
  },
  {
    tag: 'Evolução',
    title: 'Automação preparada para o negócio',
    text: 'Criamos fluxos mensuráveis e ajustáveis para reduzir tarefas repetitivas, apoiar decisões comerciais e evoluir conforme processos, canais e operação amadurecem.',
  },
];

const B2BAutomationWorkSection = () => {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const headingLines = root.querySelectorAll('.agency-work__heading-line');
    const headingParagraph = root.querySelector('.agency-work__heading p');
    const cards = root.querySelectorAll('.agency-work-card');

    if (headingLines[0]) headingLines[0].textContent = 'Estruturamos automações comerciais';
    if (headingLines[1]) headingLines[1].textContent = 'para operações B2B mais previsíveis';
    if (headingParagraph) {
      headingParagraph.textContent = 'Conectamos atendimento, qualificação e CRM para transformar tarefas dispersas em uma jornada comercial mais clara e eficiente.';
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

export default B2BAutomationWorkSection;
