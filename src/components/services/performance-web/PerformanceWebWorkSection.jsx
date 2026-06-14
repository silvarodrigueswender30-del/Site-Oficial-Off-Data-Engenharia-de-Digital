import React, { useLayoutEffect, useRef } from 'react';
import SeoLocalWorkSection from '../seo-local/SeoLocalWorkSection';

const workAreas = [
  {
    tag: 'Diagnóstico',
    title: 'Gargalos técnicos identificados na base',
    text: 'Analisamos carregamento, estrutura, scripts, fontes e assets para localizar os pontos que tornam o site lento, instável ou menos eficiente para usuários e mecanismos de busca.',
  },
  {
    tag: 'Velocidade',
    title: 'Carregamento otimizado com precisão',
    text: 'Reduzimos peso e complexidade desnecessários para melhorar velocidade percebida, entrega de conteúdo e Core Web Vitals sem comprometer a experiência visual.',
  },
  {
    tag: 'Experiência',
    title: 'Navegação estável em cada dispositivo',
    text: 'Ajustamos responsividade, estabilidade visual e interações para que a experiência mobile permaneça clara, fluida e preparada para conduzir decisões sem atrito técnico.',
  },
  {
    tag: 'Evolução',
    title: 'Performance acompanhada continuamente',
    text: 'Organizamos mensuração e prioridades técnicas para orientar melhorias contínuas, proteger resultados de SEO e manter o site eficiente conforme conteúdo e operação evoluem.',
  },
];

const PerformanceWebWorkSection = () => {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const headingLines = root.querySelectorAll('.agency-work__heading-line');
    const headingParagraph = root.querySelector('.agency-work__heading p');
    const cards = root.querySelectorAll('.agency-work-card');

    if (headingLines[0]) headingLines[0].textContent = 'Otimizamos sites para experiências';
    if (headingLines[1]) headingLines[1].textContent = 'mais rápidas, estáveis e estratégicas';
    if (headingParagraph) {
      headingParagraph.textContent = 'Conectamos engenharia, experiência e performance para reduzir atrito técnico e fortalecer SEO, navegação e conversão.';
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

export default PerformanceWebWorkSection;
