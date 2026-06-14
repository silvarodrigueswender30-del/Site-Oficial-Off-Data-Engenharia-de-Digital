import React, { useLayoutEffect, useRef } from 'react';
import CtaBoxSection from '../../sections/CtaBoxSection';

const PerformanceWebCtaBox = () => {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const tag = root.querySelector('.tag_txt > div:last-child');
    const heading = root.querySelector('.heading_cta h2');
    const button = root.querySelector('.heading_cta .flex_button_general > div:first-child');
    const paragraph = root.querySelector('.paragraph_last p');

    if (tag) tag.textContent = 'performance web';
    if (heading) heading.textContent = 'Transforme lentidão em uma experiência mais eficiente';
    if (button) button.textContent = 'Quero otimizar meu site';
    if (paragraph) {
      paragraph.textContent = 'A Off-Data otimiza performance web para empresas que precisam de sites mais rápidos, estáveis e preparados para SEO e conversão.';
    }
  }, []);

  return <div ref={rootRef}><CtaBoxSection /></div>;
};

export default PerformanceWebCtaBox;
