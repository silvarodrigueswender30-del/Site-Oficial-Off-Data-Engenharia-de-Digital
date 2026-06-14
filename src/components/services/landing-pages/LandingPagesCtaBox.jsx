import React, { useLayoutEffect, useRef } from 'react';
import CtaBoxSection from '../../sections/CtaBoxSection';

const LandingPagesCtaBox = () => {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const tag = root.querySelector('.tag_txt > div:last-child');
    const heading = root.querySelector('.heading_cta h2');
    const button = root.querySelector('.heading_cta .flex_button_general > div:first-child');
    const paragraph = root.querySelector('.paragraph_last p');

    if (tag) tag.textContent = 'página de conversão';
    if (heading) heading.textContent = 'Apresente sua oferta com o valor que ela merece';
    if (button) button.textContent = 'Quero uma landing premium';
    if (paragraph) {
      paragraph.textContent = 'A Off-Data cria landing pages premium para empresas e profissionais que precisam comunicar ofertas High Ticket com clareza, autoridade e foco em conversão.';
    }
  }, []);

  return <div ref={rootRef}><CtaBoxSection /></div>;
};

export default LandingPagesCtaBox;
