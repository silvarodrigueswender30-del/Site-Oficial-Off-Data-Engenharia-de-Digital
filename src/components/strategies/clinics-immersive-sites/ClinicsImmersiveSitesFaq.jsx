import React from 'react';
import styles from './ClinicsImmersiveSitesPage.module.css';

export const faqItems = [
  {
    question: 'Quanto custa criar um site profissional para clínica médica em Uberlândia?',
    answer: 'O investimento depende do escopo, da quantidade de páginas, do nível de personalização, das integrações e da condição técnica da presença digital existente. Um diagnóstico permite definir prioridades e estimar o projeto com transparência. O valor não deve ser associado a promessas de pacientes, agendamentos ou retorno garantido.',
  },
  {
    question: 'Um site bonito realmente influencia na escolha do paciente?',
    answer: 'Uma apresentação visual coerente pode contribuir para a percepção de organização, cuidado e confiança, principalmente quando facilita a leitura e o acesso às informações. Ainda assim, a escolha depende de diversos fatores, como indicação, especialidade, localização, disponibilidade e relação com a equipe. O design apoia a decisão, mas não a determina.',
  },
  {
    question: 'É possível integrar agendamento online ao site da clínica?',
    answer: 'Sim. O site pode direcionar ou integrar plataformas de agendamento já utilizadas pela clínica, desde que o fluxo seja tecnicamente compatível e trate dados com o cuidado necessário. A integração tende a reduzir etapas de contato, mas sua configuração deve considerar processos internos, privacidade e a experiência real da equipe e dos pacientes.',
  },
  {
    question: 'Como o SEO local ajuda clínicas médicas a atrair mais pacientes em Uberlândia?',
    answer: 'SEO local organiza páginas, informações institucionais e sinais de localização para ajudar a clínica a ser compreendida em pesquisas relevantes da região. Uma presença consistente pode melhorar a descoberta e facilitar o contato, mas o desempenho depende da especialidade, da concorrência, da autoridade existente e da qualidade contínua do site e do perfil da empresa.',
  },
  {
    question: 'O site precisa seguir alguma norma do CFM (Conselho Federal de Medicina)?',
    answer: 'A comunicação digital da área médica precisa respeitar as normas aplicáveis à publicidade médica, evitando promessas de resultado, sensacionalismo e afirmações inadequadas. Como as regras podem mudar e cada contexto possui particularidades, o conteúdo final deve ser validado pelo responsável técnico ou jurídico da clínica quando necessário.',
  },
];

const ClinicsImmersiveSitesFaq = () => (
  <section id="faq" className={styles.faq}>
    <div className={styles.faqInner}>
      <div className={styles.faqHeading}>
        <span>FAQ</span>
        <h2>Perguntas frequentes sobre sites para clínicas médicas</h2>
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

export default ClinicsImmersiveSitesFaq;
