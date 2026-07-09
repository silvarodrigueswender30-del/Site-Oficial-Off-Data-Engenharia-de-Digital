import React from 'react';
import styles from './RealEstateWebsitePage.module.css';

const questions = [
  {
    title: 'Por que uma imobiliária de luxo em Uberlândia precisa de um site diferente do padrão de mercado?',
    paragraphs: [
      'O comprador de imóveis de alto padrão em Uberlândia não navega da mesma forma que o comprador de um imóvel popular. Ele compara referências internacionais, avalia a qualidade da apresentação visual e forma uma primeira impressão sobre o empreendimento — e sobre a imobiliária — em segundos.',
      'Um site genérico, construído em plataformas de template, comunica exatamente o oposto do posicionamento premium que a imobiliária deseja transmitir. Em um mercado como o do Triângulo Mineiro, onde a concorrência por esse público é limitada mas exigente, a apresentação digital se torna parte da experiência de compra. Um site tecnicamente bem construído reduz a distância entre o interesse inicial e a decisão de agendar uma visita, funcionando como uma extensão do atendimento presencial. É por isso que a criação de site para imobiliária de luxo em Uberlândia exige uma abordagem de engenharia digital, e não apenas de design.',
    ],
  },
  {
    title: 'Como funciona o processo de criação de um site para imobiliária premium?',
    paragraphs: [
      'O processo começa com o mapeamento do portfólio de imóveis e do perfil do comprador que a imobiliária deseja atrair em Uberlândia e nas cidades vizinhas do Triângulo Mineiro. A partir disso, é definida a arquitetura de informação: como os imóveis serão categorizados, quais dados aparecem primeiro e como o comprador navega entre eles.',
      'Em seguida, a Off-Data estrutura o SEO técnico da página, incluindo dados estruturados (schema) que ajudam o Google e as IAs a entender e indexar corretamente cada imóvel. O design é construído sobre essa estrutura, priorizando fotografia, tempo de carregamento e clareza visual. Por fim, o site é integrado aos canais de contato da imobiliária — WhatsApp, formulários e, quando aplicável, CRM — para que nenhum lead se perca entre o interesse e o atendimento.',
    ],
  },
  {
    title: 'Por que escolher a Off-Data Digital para o site da imobiliária?',
    paragraphs: [
      'A Off-Data Digital não trabalha com templates replicados para diferentes segmentos. Cada projeto de imobiliária em Uberlândia é desenvolvido considerando o posicionamento específico da marca, o perfil de imóvel comercializado e o comportamento do comprador local. A diferença está na combinação entre engenharia técnica — performance, SEO e estrutura de dados — e direção visual sofisticada, sem os clichês visuais comuns em sites do setor imobiliário.',
      'Além disso, a Off-Data já estrutura os projetos considerando a otimização para buscas por IA (GEO), garantindo que a imobiliária esteja preparada para a forma como as pesquisas estão mudando. Para uma imobiliária que atua no segmento de alto padrão em Uberlândia e no Triângulo Mineiro, isso significa um site que não apenas existe, mas trabalha ativamente pela conversão do comprador certo.',
    ],
  },
];

const RealEstateWebsiteQuestionSections = () => (
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

export default RealEstateWebsiteQuestionSections;
