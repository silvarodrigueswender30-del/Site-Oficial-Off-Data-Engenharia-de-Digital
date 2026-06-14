import React, { useLayoutEffect, useRef } from 'react';
import SeoLocalMissionSection from '../seo-local/SeoLocalMissionSection';

const TechnicalContentMissionSection = () => {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const image = root.querySelector('.agency-mission-image img');
    const tag = root.querySelector('.agency-mission-copy__tag');
    const statement = root.querySelector('.agency-mission-copy__statement');
    const columns = root.querySelectorAll('.agency-mission-copy__columns p');

    if (image) {
      image.src = '/imagens/imagem-servico/conteudo-tecnico.avif';
      image.alt = 'Imagem representando conteúdo técnico para SEO';
    }
    if (tag) tag.textContent = 'Direção';
    if (statement) statement.textContent = 'Transformar conhecimento técnico em uma presença digital clara, encontrável e capaz de gerar confiança.';
    if (columns[0]) {
      columns[0].textContent = 'Criamos conteúdo para explicar serviços complexos, organizar argumentos e aproximar empresas das buscas feitas por clientes qualificados.';
    }
    if (columns[1]) {
      columns[1].textContent = 'Nosso trabalho integra estratégia editorial, SEO e linguagem de marca para sustentar autoridade ao longo do tempo.';
    }
  }, []);

  return <div ref={rootRef}><SeoLocalMissionSection /></div>;
};

export default TechnicalContentMissionSection;
