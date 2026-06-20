import React, { useLayoutEffect, useRef } from 'react';
import CtaBoxSection from '../../sections/CtaBoxSection';
import { WHATSAPP_MESSAGES } from '../../../constants/contact';

const PaidTrafficCtaBox = () => {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const tag = root.querySelector('.tag_txt > div:last-child');
    const heading = root.querySelector('.heading_cta h2');
    const button = root.querySelector('.heading_cta .flex_button_general > div:first-child');
    const paragraph = root.querySelector('.paragraph_last p');

    if (tag) tag.textContent = 'tráfego de precisão';
    if (heading) heading.textContent = 'Transforme investimento em oportunidades reais';
    if (button) button.textContent = 'Quero campanhas mais precisas';
    if (paragraph) {
      paragraph.textContent = 'A Off-Data estrutura gestão de tráfego pago para empresas que precisam gerar leads qualificados e reduzir desperdício de verba em Uberlândia e no Triângulo Mineiro.';
    }
  }, []);

  return <div ref={rootRef}><CtaBoxSection whatsappMessage={WHATSAPP_MESSAGES.paidTraffic} /></div>;
};

export default PaidTrafficCtaBox;
