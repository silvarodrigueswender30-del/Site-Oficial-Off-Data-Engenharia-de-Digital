import React, { useLayoutEffect, useRef } from 'react';
import CtaBoxSection from '../../sections/CtaBoxSection';

const TechnicalContentCtaBox = () => {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const tag = root.querySelector('.tag_txt > div:last-child');
    const heading = root.querySelector('.heading_cta h2');
    const button = root.querySelector('.heading_cta .flex_button_general > div:first-child');
    const paragraph = root.querySelector('.paragraph_last p');

    if (tag) tag.textContent = 'autoridade digital';
    if (heading) heading.textContent = 'Transforme conhecimento em posicionamento digital';
    if (button) button.textContent = 'Quero conteúdo estratégico';
    if (paragraph) {
      paragraph.textContent = 'A Off-Data cria conteúdo técnico e estratégico para empresas que precisam fortalecer autoridade, melhorar SEO e explicar serviços complexos com clareza.';
    }
  }, []);

  return <div ref={rootRef}><CtaBoxSection /></div>;
};

export default TechnicalContentCtaBox;
