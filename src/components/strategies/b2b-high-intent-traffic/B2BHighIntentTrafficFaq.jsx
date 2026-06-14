import React from 'react';
import styles from './B2BHighIntentTrafficPage.module.css';

export const faqItems = [
  {
    question: 'O que é tráfego de alta intenção e por que é importante para B2B?',
    answer: 'Tráfego de alta intenção reúne visitas originadas por sinais de necessidade mais claros, como pesquisas por soluções, fornecedores ou parceiros. Para B2B, essa leitura ajuda a priorizar mensagens e páginas alinhadas ao contexto de decisão. Ainda assim, intenção não garante oportunidade: oferta, aderência e processo comercial continuam determinantes.',
  },
  {
    question: 'Quanto tempo leva para ver resultados em campanhas B2B no Google Ads?',
    answer: 'Os primeiros sinais podem surgir conforme a campanha começa a acumular dados, mas não existe prazo universal para avaliar resultado. A análise depende de verba, segmento, oferta, concorrência, página de destino, ciclo comercial e qualidade do acompanhamento. Decisões consistentes exigem observar conversões e evolução do funil ao longo do tempo.',
  },
  {
    question: 'Vale a pena anunciar no LinkedIn para empresas do Triângulo Mineiro?',
    answer: 'Pode fazer sentido para ofertas de maior valor, públicos definidos por cargo ou empresa e ciclos consultivos. Google pode atender melhor demandas ativas, enquanto Meta pode apoiar distribuição e remarketing regional. A escolha depende do tamanho da audiência, objetivo, orçamento e capacidade de transformar atenção em conversas relevantes.',
  },
  {
    question: 'Como saber se meu investimento em tráfego pago está gerando retorno?',
    answer: 'A avaliação começa com rastreamento de conversões, integração com CRM e registro da origem dos contatos. Além do custo por conversão, é importante observar qualidade, avanço entre etapas, oportunidades geradas e resultados comerciais confirmados. A mensuração correta permite avaliar eficiência, mas nenhum indicador isolado garante retorno futuro.',
  },
  {
    question: 'É possível segmentar campanhas por cidade dentro do Triângulo Mineiro?',
    answer: 'Sim. As plataformas permitem configurar segmentações geográficas por cidades e outras áreas disponíveis. Essa definição ajuda a reduzir desperdício e alinhar a mídia à região atendida, mas precisa ser validada com dados de entrega, demanda real e capacidade operacional para evitar públicos excessivamente restritos ou pouco relevantes.',
  },
];

const B2BHighIntentTrafficFaq = () => (
  <section id="faq" className={styles.faq}>
    <div className={styles.faqInner}>
      <div className={styles.faqHeading}>
        <span>FAQ</span>
        <h2>Perguntas frequentes sobre tráfego pago B2B</h2>
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

export default B2BHighIntentTrafficFaq;
