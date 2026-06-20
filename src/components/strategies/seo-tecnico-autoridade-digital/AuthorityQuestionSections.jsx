import React from 'react';
import styles from './AuthorityPage.module.css';

const questions = [
  {
    title: 'Por que autoridade digital não é apenas publicar conteúdo?',
    paragraphs: [
      'Publicar com frequência pode ajudar uma marca a aparecer mais vezes, mas autoridade depende de coerência entre técnica, conteúdo e posicionamento. Uma empresa premium precisa mostrar domínio sobre temas relevantes, organizar informações com clareza e manter uma experiência confiável para quem pesquisa antes de iniciar uma conversa comercial.',
      'Sem arquitetura de páginas, intenção bem definida e sinais técnicos consistentes, o conteúdo pode ficar disperso. A estratégia precisa conectar tópicos, serviços, região atendida e critérios de decisão. Assim, cada página passa a cumprir um papel dentro da presença digital, em vez de funcionar como uma peça isolada.',
    ],
  },
  {
    title: 'Como o SEO técnico influencia confiança e posicionamento?',
    paragraphs: [
      'SEO técnico organiza a forma como o site é rastreado, interpretado e entregue ao visitante. Indexação, performance, estrutura semântica, dados estruturados, responsividade e estabilidade visual ajudam mecanismos de busca e pessoas a entenderem melhor a empresa, seus serviços e a relação entre suas páginas.',
      'Esses elementos não garantem primeira posição, mas reduzem ruídos que prejudicam a leitura da marca. Quando a base técnica é clara, o conteúdo tem mais condições de ser avaliado em seu contexto correto. Para negócios premium, isso também comunica cuidado, precisão e consistência antes do atendimento.',
    ],
  },
  {
    title: 'Quando uma empresa premium precisa revisar sua presença digital?',
    paragraphs: [
      'A revisão costuma fazer sentido quando o site já não representa o posicionamento atual, quando serviços complexos são explicados de forma superficial ou quando a empresa depende demais de indicações e mídia paga. Também é comum aparecer a necessidade quando conteúdos não ranqueiam, páginas importantes não convertem ou a experiência mobile gera atrito.',
      'O diagnóstico observa maturidade técnica, arquitetura de conteúdo, lacunas de busca, presença regional e clareza comercial. A partir disso, é possível priorizar ajustes sem refazer tudo ao mesmo tempo. O objetivo é construir uma base evolutiva, mensurável e coerente com o valor real da empresa.',
    ],
  },
];

const AuthorityQuestionSections = () => (
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

export default AuthorityQuestionSections;
