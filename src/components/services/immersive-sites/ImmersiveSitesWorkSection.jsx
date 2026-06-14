import React, { useLayoutEffect, useRef } from 'react';
import SeoLocalWorkSection from '../seo-local/SeoLocalWorkSection';

const workAreas = [
  {
    tag: 'Diagnóstico',
    title: 'Estratégia alinhada ao valor da marca',
    text: 'Compreendemos posicionamento, oferta e objetivos comerciais para definir uma presença digital que comunique valor com clareza.',
  },
  {
    tag: 'Experiência',
    title: 'Arquitetura visual premium e intuitiva',
    text: 'Desenhamos jornadas imersivas, hierarquias claras e interações precisas para gerar impacto sem comprometer a facilidade de navegação.',
  },
  {
    tag: 'Estrutura',
    title: 'SEO e copy integrados desde o início',
    text: 'Organizamos páginas, mensagens e conteúdo para facilitar a leitura, fortalecer relevância no Google e conduzir decisões.',
  },
  {
    tag: 'Performance',
    title: 'Tecnologia preparada para converter e evoluir',
    text: 'Construímos experiências responsivas, rápidas e consistentes, prontas para acompanhar campanhas, novos serviços e o crescimento da empresa.',
  },
];

const ImmersiveSitesWorkSection = () => {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const headingLines = root.querySelectorAll('.agency-work__heading-line');
    const headingParagraph = root.querySelector('.agency-work__heading p');
    const cards = root.querySelectorAll('.agency-work-card');

    if (headingLines[0]) headingLines[0].textContent = 'Criamos sites para marcas que exigem';
    if (headingLines[1]) headingLines[1].textContent = 'presença, performance e conversão';
    if (headingParagraph) {
      headingParagraph.textContent = 'Conectamos estratégia, design e tecnologia para transformar o site em uma experiência de marca capaz de gerar confiança e oportunidades.';
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

export default ImmersiveSitesWorkSection;
