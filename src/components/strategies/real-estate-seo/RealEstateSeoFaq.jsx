import React from 'react';
import styles from './RealEstateSeoPage.module.css';

export const faqItems = [
  {
    question: 'Quanto tempo leva para uma imobiliária aparecer no Google em Uberlândia?',
    answer: 'Não existe um prazo universal para ranqueamento. A evolução depende da concorrência, da autoridade do domínio, da condição técnica do site, da qualidade do conteúdo e da consistência da estratégia. Um diagnóstico inicial ajuda a identificar prioridades e a acompanhar sinais de avanço sem transformar estimativas em promessas.',
  },
  {
    question: 'Vale mais a pena investir em SEO ou em anúncios pagos para vender imóveis premium?',
    answer: 'As duas frentes podem trabalhar juntas. Anúncios oferecem alcance imediato para campanhas específicas, enquanto o SEO estrutura uma presença orgânica que tende a fortalecer autoridade e cobertura ao longo do tempo. A decisão deve considerar objetivos comerciais, portfólio, orçamento e maturidade digital.',
  },
  {
    question: 'O que é Google Meu Negócio e por que é essencial para imobiliárias?',
    answer: 'Hoje chamado Perfil da Empresa no Google, ele reúne informações exibidas na Busca e no Maps. Para imobiliárias, manter endereço, horários, contatos, categorias, imagens e atualizações consistentes melhora a clareza da presença local e facilita o contato de pessoas que pesquisam na região.',
  },
  {
    question: 'SEO local funciona para imobiliárias que atendem cidades diferentes no Triângulo Mineiro?',
    answer: 'Sim, desde que cada cidade tenha relevância real para a operação. A cobertura pode ser ampliada com páginas específicas, informações próprias e conteúdo útil para cada mercado atendido. Evitar páginas duplicadas é essencial para preservar qualidade e demonstrar conhecimento regional verdadeiro.',
  },
  {
    question: 'Como as avaliações no Google afetam o ranqueamento de uma imobiliária?',
    answer: 'Avaliações legítimas ajudam compradores a compreender a experiência oferecida e enviam sinais de confiança sobre a empresa. Frequência, qualidade das respostas e consistência do perfil podem contribuir para a presença local. O processo deve ser ético, contínuo e nunca baseado em avaliações artificiais.',
  },
];

const RealEstateSeoFaq = () => (
  <section id="faq" className={styles.faq}>
    <div className={styles.faqInner}>
      <div className={styles.faqHeading}>
        <span>FAQ</span>
        <h2>Perguntas frequentes sobre SEO local imobiliário</h2>
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

export default RealEstateSeoFaq;
