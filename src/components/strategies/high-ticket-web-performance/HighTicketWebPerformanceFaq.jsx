import React from 'react';
import styles from './HighTicketWebPerformancePage.module.css';

export const faqItems = [
  {
    question: 'O que são Core Web Vitals e por que minha empresa precisa se preocupar com isso?',
    answer: 'Core Web Vitals ajudam a avaliar carregamento, resposta às interações e estabilidade visual. LCP observa a exibição do conteúdo principal, INP acompanha a resposta do site e CLS identifica mudanças inesperadas de layout. Eles ajudam a localizar gargalos, mas precisam ser analisados junto com UX, conteúdo e contexto técnico.',
  },
  {
    question: 'Um site lento realmente afasta clientes de alto padrão?',
    answer: 'A lentidão pode aumentar atrito, reduzir confiança e prejudicar a navegação, especialmente quando o visitante espera uma experiência cuidadosa. Ainda assim, a decisão depende de diversos fatores. Melhorar performance ajuda a remover obstáculos técnicos, mas não garante contato, conversão ou escolha da marca.',
  },
  {
    question: 'Qual é o tempo de carregamento ideal para um site de marca premium?',
    answer: 'Existem boas práticas e indicadores de referência, mas a meta adequada depende do tipo de página, peso visual, recursos, servidor, framework, imagens, scripts e experiência desejada. Em geral, quanto menor o tempo de espera e menor o atrito, melhor tende a ser a navegação. O diagnóstico deve considerar dados reais e prioridades do projeto.',
  },
  {
    question: 'Performance web e design visual sofisticado são compatíveis?',
    answer: 'Sim. O equilíbrio exige planejamento de imagens, vídeos, animações, fontes, código e carregamento. Formatos modernos, priorização de recursos e implementação cuidadosa ajudam a preservar uma experiência visual sofisticada sem tratar velocidade e design como objetivos opostos.',
  },
  {
    question: 'Como saber se o site da minha empresa tem problema de performance?',
    answer: 'Ferramentas como PageSpeed Insights ajudam a identificar gargalos e indicadores técnicos. A leitura, porém, deve ser combinada com testes em dispositivos reais, experiência visual, comportamento dos usuários, arquitetura do site e objetivos comerciais. Uma nota isolada não descreve toda a qualidade da experiência.',
  },
];

const HighTicketWebPerformanceFaq = () => (
  <section id="faq" className={styles.faq}>
    <div className={styles.faqInner}>
      <div className={styles.faqHeading}>
        <span>FAQ</span>
        <h2>Perguntas frequentes sobre performance web</h2>
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

export default HighTicketWebPerformanceFaq;
