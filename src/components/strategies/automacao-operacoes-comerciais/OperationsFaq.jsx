import React from 'react';
import styles from './OperationsPage.module.css';

export const faqItems = [
  {
    question: 'O que são operações comerciais digitais?',
    answer: 'Operações comerciais digitais são processos, ferramentas e rotinas que organizam como oportunidades entram, são qualificadas, atendidas e acompanhadas. Elas conectam canais como site, WhatsApp, formulários, CRM e follow-up para dar mais clareza ao time comercial. A estrutura não garante vendas, mas melhora a leitura e a continuidade da jornada.',
  },
  {
    question: 'Automação substitui o atendimento humano?',
    answer: 'Não. Automação deve apoiar o atendimento, não substituir conversas importantes. Ela pode ajudar com registros, alertas, triagens, respostas iniciais e organização de próximos passos. Diagnóstico, negociação, relacionamento e decisão continuam dependendo de escuta, contexto e julgamento humano.',
  },
  {
    question: 'Essa estratégia serve para empresas locais?',
    answer: 'Sim. Empresas locais e regionais também lidam com múltiplos canais, demandas diferentes e ciclos comerciais que precisam de acompanhamento. Em Uberlândia e no Triângulo Mineiro, organizar a operação ajuda negócios B2B a entender melhor origem, qualidade e evolução dos contatos recebidos.',
  },
  {
    question: 'Preciso ter CRM para começar?',
    answer: 'Não necessariamente. Um CRM pode ajudar bastante, mas o diagnóstico pode começar avaliando canais, formulários, WhatsApp, planilhas, responsáveis e rotina de follow-up. Em alguns casos, a prioridade é ajustar o processo antes de escolher ou configurar uma ferramenta mais robusta.',
  },
  {
    question: 'Quando faz sentido contratar um diagnóstico de operações?',
    answer: 'Faz sentido quando a empresa recebe contatos por vários canais, perde histórico de conversas, tem dificuldade para priorizar oportunidades ou não sabe quais ações geram conversas qualificadas. O diagnóstico identifica gargalos e propõe uma evolução realista para processos, integrações e acompanhamento comercial.',
  },
];

const OperationsFaq = () => (
  <section id="faq" className={styles.faq}>
    <div className={styles.faqInner}>
      <div className={styles.faqHeading}>
        <span>FAQ</span>
        <h2>Perguntas frequentes sobre operações comerciais digitais</h2>
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

export default OperationsFaq;
