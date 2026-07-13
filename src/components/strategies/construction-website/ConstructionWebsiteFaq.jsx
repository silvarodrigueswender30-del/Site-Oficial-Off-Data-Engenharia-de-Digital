import React from 'react';
import styles from './ConstructionWebsitePage.module.css';

export const faqItems = [
  {
    question: 'Quanto custa um site para construtora?',
    answer: 'O investimento depende do número de empreendimentos a serem apresentados, da quantidade de conteúdo (plantas, renders, vídeos) e das integrações necessárias. A Off-Data apresenta uma proposta específica após o diagnóstico do portfólio da construtora em Uberlândia.',
  },
  {
    question: 'Quanto tempo leva para o site ficar pronto?',
    answer: 'Projetos institucionais com um ou mais empreendimentos costumam levar entre 4 e 8 semanas, variando conforme a quantidade de material a ser estruturado e o número de páginas de lançamento.',
  },
  {
    question: 'É possível criar uma página específica para cada empreendimento?',
    answer: 'Sim. Cada empreendimento pode ter sua própria página, com plantas, memorial descritivo, galeria e formulário de contato específico, o que facilita tanto a navegação do comprador quanto o acompanhamento de leads por lançamento.',
  },
  {
    question: 'O site ajuda a vender unidades mais rápido?',
    answer: 'Um site bem estruturado reduz o tempo entre o interesse do comprador e o primeiro contato qualificado com o corretor, apresentando as informações que normalmente seriam repassadas manualmente. Isso agiliza o processo comercial, embora a decisão final continue dependendo do trabalho da equipe de vendas.',
  },
  {
    question: 'A construtora pode usar o mesmo site para empreendimentos em outras cidades do Triângulo Mineiro?',
    answer: 'Sim. A estrutura permite adicionar novos empreendimentos em outras cidades da região, com páginas e SEO local específicos para cada localidade, mantendo a mesma identidade institucional da construtora.',
  },
];

const ConstructionWebsiteFaq = () => (
  <section id="faq" className={styles.faq}>
    <div className={styles.faqInner}>
      <div className={styles.faqHeading}>
        <span>FAQ</span>
        <h2>{"Perguntas frequentes sobre criação de site para construtora"}</h2>
      </div>
      <div className={styles.faqList}>
        {faqItems.map((item, index) => (
          <details key={item.question} className={styles.faqItem}>
            <summary><span>0{index + 1}</span><h3>{item.question}</h3><b aria-hidden="true">+</b></summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
);

export default ConstructionWebsiteFaq;
