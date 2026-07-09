import React from 'react';
import styles from './RealEstateWebsitePage.module.css';

export const faqItems = [
  {
    question: 'Quanto custa um site para imobiliária de luxo?',
    answer: 'O investimento varia conforme o número de imóveis, integrações necessárias e nível de personalização visual. A Off-Data apresenta uma proposta específica após entender o portfólio e os objetivos da imobiliária em Uberlândia, evitando pacotes genéricos que não refletem o posicionamento da marca.',
  },
  {
    question: 'Quanto tempo leva para o site ficar pronto?',
    answer: 'Projetos de site para imobiliária costumam levar entre 4 e 8 semanas, dependendo da complexidade do portfólio e da quantidade de conteúdo a ser estruturado. O prazo exato é definido logo após o diagnóstico inicial.',
  },
  {
    question: 'Como funciona a integração do site com o WhatsApp e o CRM da imobiliária?',
    answer: 'O site é construído com formulários e botões conectados diretamente ao WhatsApp da equipe comercial, e pode ser integrado a sistemas de CRM já utilizados pela imobiliária. Isso garante que nenhum contato gerado pelo site fique sem retorno.',
  },
  {
    question: 'O site realmente ajuda a vender mais imóveis de alto padrão?',
    answer: 'Um site bem estruturado reduz o atrito entre o interesse do comprador e o agendamento da visita, apresentando o imóvel com a qualidade visual e a informação que esse público espera. Isso não substitui o trabalho do corretor, mas qualifica o lead antes do primeiro contato.',
  },
  {
    question: 'O site funciona também para imobiliárias que atuam fora de Uberlândia, em cidades como Uberaba ou Araguari?',
    answer: 'Sim. A estrutura de SEO local é construída para abranger as cidades do Triângulo Mineiro em que a imobiliária atua, com páginas e dados estruturados que ajudam o site a aparecer nas buscas dessas regiões específicas.',
  },
];

const RealEstateWebsiteFaq = () => (
  <section id="faq" className={styles.faq}>
    <div className={styles.faqInner}>
      <div className={styles.faqHeading}>
        <span>FAQ</span>
        <h2>{"Perguntas frequentes sobre criação de site imobiliário"}</h2>
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

export default RealEstateWebsiteFaq;
