import React, { useLayoutEffect, useRef } from 'react';
import SeoLocalWorkSection from '../seo-local/SeoLocalWorkSection';

const workAreas = [
  {
    tag: 'Posicionamento',
    title: 'Conhecimento técnico traduzido com clareza',
    text: 'Entramos no contexto da empresa para compreender especialidade, oferta e linguagem. Assim, transformamos conhecimento complexo em mensagens claras sem perder profundidade.',
  },
  {
    tag: 'Intenção',
    title: 'Conteúdo conectado às buscas certas',
    text: 'Mapeamos dúvidas, termos e contextos de decisão para criar conteúdos que respondem ao que clientes procuram e fortalecem presença orgânica regional.',
  },
  {
    tag: 'Arquitetura',
    title: 'Páginas organizadas para construir autoridade',
    text: 'Estruturamos temas, páginas de serviço e conteúdos institucionais em uma jornada coerente, capaz de apoiar SEO, tráfego pago e conversão.',
  },
  {
    tag: 'Evolução',
    title: 'Estratégia editorial preparada para crescer',
    text: 'Organizamos prioridades e oportunidades para que o conteúdo evolua com consistência, preserve a linguagem da marca e acompanhe novos objetivos comerciais.',
  },
];

const TechnicalContentWorkSection = () => {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const headingLines = root.querySelectorAll('.agency-work__heading-line');
    const headingParagraph = root.querySelector('.agency-work__heading p');
    const cards = root.querySelectorAll('.agency-work-card');

    if (headingLines[0]) headingLines[0].textContent = 'Criamos conteúdo técnico para empresas';
    if (headingLines[1]) headingLines[1].textContent = 'que precisam construir autoridade';
    if (headingParagraph) {
      headingParagraph.textContent = 'Conectamos clareza, estratégia e intenção de busca para transformar conhecimento em presença digital relevante e confiável.';
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

export default TechnicalContentWorkSection;
