import React, { useLayoutEffect, useRef } from 'react';
import SeoLocalMissionSection from '../seo-local/SeoLocalMissionSection';

const PaidTrafficMissionSection = () => {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const image = root.querySelector('.agency-mission-image img');
    const tag = root.querySelector('.agency-mission-copy__tag');
    const statement = root.querySelector('.agency-mission-copy__statement');
    const columns = root.querySelectorAll('.agency-mission-copy__columns p');

    if (image) {
      image.src = '/imagens/imagem-servico/trafego-cirurgico.avif';
      image.alt = 'Imagem representando gestão de tráfego pago em Uberlândia';
    }
    if (tag) tag.textContent = 'Direção';
    if (statement) statement.textContent = 'Transformar mídia paga em uma operação mensurável, precisa e conectada ao crescimento comercial.';
    if (columns[0]) {
      columns[0].textContent = 'Estruturamos campanhas para aproximar empresas das pessoas que já demonstram intenção, interesse ou potencial real de compra.';
    }
    if (columns[1]) {
      columns[1].textContent = 'Nosso trabalho integra Google Ads, Meta Ads, páginas de destino e análise de retorno para orientar cada próxima decisão.';
    }
  }, []);

  return <div ref={rootRef}><SeoLocalMissionSection /></div>;
};

export default PaidTrafficMissionSection;
