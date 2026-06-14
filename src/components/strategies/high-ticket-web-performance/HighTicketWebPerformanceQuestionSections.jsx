import React from 'react';
import styles from './HighTicketWebPerformancePage.module.css';

const questions = [
  {
    title: 'O que é performance web e por que impacta diretamente suas vendas?',
    paragraphs: [
      'Performance web é a capacidade do site de carregar, responder e permanecer visualmente estável durante a navegação. Ela afeta a facilidade com que uma pessoa acessa informações, compara serviços e avança para um contato. Quando a experiência apresenta atrasos ou falhas, o visitante pode encontrar mais atrito para compreender a oferta e tomar uma decisão.',
      'Isso não significa que velocidade, sozinha, gera vendas. Posicionamento, copy, proposta, confiança e processo comercial continuam essenciais. A performance sustenta essas camadas ao garantir que o conteúdo esteja disponível de forma consistente. Para marcas high-ticket, uma execução técnica cuidadosa ajuda a alinhar a experiência digital ao nível de atenção esperado em serviços de alto valor.',
    ],
  },
  {
    title: 'Como os Core Web Vitals influenciam a experiência digital em 2026?',
    paragraphs: [
      'Core Web Vitals são indicadores usados para observar aspectos importantes da experiência técnica. O LCP acompanha quando o principal conteúdo visível aparece; o INP ajuda a avaliar a resposta do site às interações; e o CLS observa mudanças inesperadas no layout. Juntos, eles oferecem sinais úteis para identificar gargalos e priorizar melhorias.',
      'Esses indicadores não devem ser tratados como uma promessa de score, ranqueamento ou resultado comercial. Uma leitura responsável considera dados reais de usuários, testes controlados, tecnologia utilizada e intenção da página. O objetivo é encontrar equilíbrio entre velocidade, estabilidade, interação e riqueza visual sem simplificar a experiência apenas para perseguir uma nota.',
    ],
  },
  {
    title: 'Como a velocidade do site afeta a percepção de marcas premium?',
    paragraphs: [
      'Marcas premium constroem percepção por meio de detalhes. Se o site demora a responder, apresenta imagens pesadas ou move elementos durante a leitura, a experiência pode parecer menos cuidadosa do que a proposta da empresa. Uma navegação fluida ajuda o visitante a concentrar atenção na mensagem, nos serviços e na qualidade visual.',
      'O desafio não é remover personalidade para ganhar velocidade. É planejar mídia, animações, fontes, scripts e componentes para que cada elemento tenha função clara. Esse equilíbrio permite preservar sofisticação enquanto reduz atritos técnicos. O resultado precisa ser avaliado no contexto da marca, dos dispositivos utilizados e dos objetivos de cada página.',
    ],
  },
];

const HighTicketWebPerformanceQuestionSections = () => (
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

export default HighTicketWebPerformanceQuestionSections;
