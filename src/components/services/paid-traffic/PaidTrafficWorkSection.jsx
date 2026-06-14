import React, { useLayoutEffect, useRef } from 'react';
import SeoLocalWorkSection from '../seo-local/SeoLocalWorkSection';

const workAreas = [
  {
    tag: 'Diagnóstico',
    title: 'Oferta, público e canal analisados na base',
    text: 'Entramos no contexto comercial para compreender margem, ciclo de decisão e perfil de cliente. Assim, definimos onde a mídia paga pode gerar demanda qualificada sem dispersar investimento.',
  },
  {
    tag: 'Estratégia',
    title: 'Campanhas estruturadas por intenção',
    text: 'Organizamos objetivos, segmentações, mensagens e jornadas para conectar Google Ads e Meta Ads ao momento de compra de cada público em Uberlândia e no Triângulo Mineiro.',
  },
  {
    tag: 'Conversão',
    title: 'Criativos que conduzem à oportunidade',
    text: 'Desenvolvemos mensagens e direcionamentos coerentes com a oferta, levando cada clique a uma página de destino preparada para transformar interesse em contato comercial.',
  },
  {
    tag: 'Otimização',
    title: 'Verba orientada por sinais reais',
    text: 'Acompanhamos campanhas, qualidade dos leads e eficiência da jornada para reduzir desperdícios e direcionar investimento aos canais, públicos e mensagens mais relevantes.',
  },
];

const PaidTrafficWorkSection = () => {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const headingLines = root.querySelectorAll('.agency-work__heading-line');
    const headingParagraph = root.querySelector('.agency-work__heading p');
    const cards = root.querySelectorAll('.agency-work-card');

    if (headingLines[0]) headingLines[0].textContent = 'Estruturamos tráfego pago para empresas';
    if (headingLines[1]) headingLines[1].textContent = 'que precisam gerar oportunidades reais';
    if (headingParagraph) {
      headingParagraph.textContent = 'Conectamos estratégia, mídia e conversão para transformar investimento em campanhas mais precisas e demanda comercial qualificada.';
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

export default PaidTrafficWorkSection;
