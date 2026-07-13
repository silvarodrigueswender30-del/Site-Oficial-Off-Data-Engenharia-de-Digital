import React from 'react';
import styles from './ConstructionWebsitePage.module.css';

const questions = [
  {
    title: 'Por que uma construtora em Uberlândia precisa de um site institucional técnico?',
    paragraphs: [
      'O comprador de um imóvel na planta baseia grande parte de sua decisão em informações que só existem digitalmente: plantas, renderizações, prazo de entrega e reputação da construtora. Quando o site não apresenta essas informações com clareza e rapidez, o comprador associa essa falha à própria execução do empreendimento. Em Uberlândia, onde diversos lançamentos disputam o mesmo público, um site lento ou desorganizado pode custar a atenção do comprador antes mesmo do primeiro contato com o corretor. Um site institucional técnico, com estrutura pensada para cada empreendimento, reduz a incerteza natural de comprar algo que ainda será construído. Essa credibilidade digital se torna ainda mais relevante para construtoras que atuam também em outras cidades do Triângulo Mineiro, onde a reputação da marca muitas vezes chega antes do primeiro contato presencial.',
    ],
  },
  {
    title: 'Como funciona o processo de criação de um site para construtora?',
    paragraphs: [
      'O processo começa com o mapeamento dos empreendimentos ativos e futuros da construtora em Uberlândia, definindo como cada um será apresentado dentro do site. Em seguida, a Off-Data estrutura o SEO técnico da página, incluindo dados estruturados que ajudam buscadores e IAs a indexar corretamente cada empreendimento e sua localização. O design é construído sobre essa estrutura, priorizando a apresentação de plantas, renderizações e memorial descritivo de forma organizada e rápida de navegar. Por fim, o site é integrado aos canais comerciais da construtora — WhatsApp, formulários por empreendimento e, quando aplicável, CRM — garantindo que nenhum lead interessado em um lançamento específico se perca no processo.',
    ],
  },
  {
    title: 'Por que escolher a Off-Data Digital para o site da construtora?',
    paragraphs: [
      'A Off-Data Digital desenvolve sites para construtoras considerando o momento específico de cada empreendimento — pré-lançamento, lançamento ou obra em andamento — e ajustando a apresentação de acordo com essa fase. A combinação entre engenharia técnica, SEO estruturado e direção visual sofisticada evita o padrão genérico comum em sites do setor da construção civil. A Off-Data também estrutura os projetos considerando a otimização para buscas por IA (GEO), preparando a construtora para a forma como compradores estão pesquisando empreendimentos hoje. Para uma construtora que atua em Uberlândia e busca expandir sua presença para outras cidades do Triângulo Mineiro, isso significa um site capaz de sustentar múltiplos lançamentos com a mesma solidez institucional.',
    ],
  },
];

const ConstructionWebsiteQuestionSections = () => (
  <section className={styles.questions} data-section="light">
    <div className={styles.questionsInner}>
      {questions.map((item, index) => (
        <article className={styles.questionBlock} key={item.title}>
          <span className={styles.questionIndex}>0{index + 1}</span>
          <h2>{item.title}</h2>
          <div>{item.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
        </article>
      ))}
    </div>
  </section>
);

export default ConstructionWebsiteQuestionSections;
