import React, { useLayoutEffect, useRef } from 'react';
import CtaBoxSection from '../../sections/CtaBoxSection';

const B2BAutomationCtaBox = () => {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const tag = root.querySelector('.tag_txt > div:last-child');
    const heading = root.querySelector('.heading_cta h2');
    const button = root.querySelector('.heading_cta .flex_button_general > div:first-child');
    const paragraph = root.querySelector('.paragraph_last p');

    if (tag) tag.textContent = 'operação integrada';
    if (heading) heading.textContent = 'Organize seu comercial para vender com mais previsibilidade';
    if (button) button.textContent = 'Quero automatizar meu comercial';
    if (paragraph) {
      paragraph.textContent = 'A Off-Data estrutura automação comercial B2B para empresas que precisam integrar atendimento, qualificar leads e organizar processos de vendas.';
    }
  }, []);

  return <div ref={rootRef}><CtaBoxSection /></div>;
};

export default B2BAutomationCtaBox;
