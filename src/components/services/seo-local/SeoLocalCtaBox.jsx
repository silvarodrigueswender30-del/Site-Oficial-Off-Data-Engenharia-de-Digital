import React, { useLayoutEffect, useRef } from 'react';
import CtaBoxSection from '../../sections/CtaBoxSection';
import { WHATSAPP_MESSAGES } from '../../../constants/contact';

const SeoLocalCtaBox = () => {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const tag = root.querySelector('.tag_txt > div:last-child');
    const heading = root.querySelector('.heading_cta h2');
    const button = root.querySelector('.heading_cta .flex_button_general > div:first-child');
    const paragraph = root.querySelector('.paragraph_last p');

    if (tag) tag.textContent = 'presença local';
    if (heading) heading.textContent = 'Faça sua empresa aparecer no Google';
    if (button) button.textContent = 'Quero aparecer no Google';
    if (paragraph) {
      paragraph.textContent = 'A Off-Data estrutura SEO local para empresas que precisam fortalecer autoridade regional e atrair clientes qualificados em Uberlândia e no Triângulo Mineiro.';
    }
  }, []);

  return <div ref={rootRef}><CtaBoxSection whatsappMessage={WHATSAPP_MESSAGES.seoLocal} /></div>;
};

export default SeoLocalCtaBox;
