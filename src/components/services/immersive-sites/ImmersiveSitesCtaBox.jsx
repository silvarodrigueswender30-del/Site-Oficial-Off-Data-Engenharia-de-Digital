import React, { useLayoutEffect, useRef } from 'react';
import CtaBoxSection from '../../sections/CtaBoxSection';

const ImmersiveSitesCtaBox = () => {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const tag = root.querySelector('.tag_txt > div:last-child');
    const heading = root.querySelector('.heading_cta h2');
    const button = root.querySelector('.heading_cta .flex_button_general > div:first-child');
    const paragraph = root.querySelector('.paragraph_last p');

    if (tag) tag.textContent = 'presença digital premium';
    if (heading) heading.textContent = 'Transforme seu site na melhor expressão da sua marca';
    if (button) button.textContent = 'Quero um site premium';
    if (paragraph) {
      paragraph.textContent = 'A Off-Data cria sites profissionais em Uberlândia para empresas que precisam unir presença digital premium, performance, SEO e conversão.';
    }
  }, []);

  return <div ref={rootRef}><CtaBoxSection /></div>;
};

export default ImmersiveSitesCtaBox;
