import React from 'react';
import styles from './OperationsPage.module.css';

const questions = [
  {
    title: 'Por que operação comercial não depende apenas de gerar leads?',
    paragraphs: [
      'Gerar contatos é apenas uma parte da jornada. Se a empresa não registra origem, contexto, necessidade e próximo passo, uma oportunidade pode se perder mesmo quando chegou pelo canal certo. Em negócios B2B, essa perda costuma aparecer em respostas demoradas, mensagens repetidas, falta de histórico e dificuldade para entender quais ações realmente alimentam conversas relevantes.',
      'Uma operação comercial digital organiza o que acontece antes, durante e depois do contato. Ela conecta captação, atendimento, qualificação e acompanhamento para que o time tenha mais clareza sobre prioridade, estágio e responsabilidade. A geração de leads continua importante, mas passa a fazer parte de um sistema mais amplo de leitura e evolução comercial.',
    ],
  },
  {
    title: 'Como automação ajuda a reduzir perdas no atendimento?',
    paragraphs: [
      'Automação bem aplicada não substitui a conversa humana. Ela ajuda a organizar tarefas repetitivas, direcionar mensagens, registrar informações e acionar follow-ups com mais consistência. Quando usada com cuidado, reduz esquecimentos e melhora a continuidade entre site, WhatsApp, formulário, CRM e equipe comercial, sem transformar o relacionamento em uma sequência fria de respostas automáticas.',
      'O ponto central é definir quais etapas realmente precisam de automação e quais dependem de interpretação humana. Confirmações, triagens, alertas internos e registros podem ganhar estrutura, enquanto diagnóstico, negociação e decisão continuam exigindo escuta. Esse equilíbrio ajuda a preservar contexto e qualidade no atendimento.',
    ],
  },
  {
    title: 'Quando uma empresa B2B precisa organizar seus processos digitais?',
    paragraphs: [
      'O momento costuma aparecer quando os canais começam a crescer, mas a rotina comercial fica difícil de acompanhar. Leads chegam por diferentes fontes, cada pessoa registra de um jeito, oportunidades somem entre mensagens e a gestão não consegue saber com clareza quais contatos avançaram, quais esfriaram e quais precisam de retorno.',
      'Nesses casos, organizar processos digitais cria uma base mais confiável para medir, aprender e priorizar. Não é necessário começar com uma estrutura complexa. Muitas empresas evoluem melhor quando definem fluxos essenciais, campos mínimos, responsáveis, integrações simples e uma rotina de acompanhamento compatível com sua operação real.',
    ],
  },
];

const OperationsQuestionSections = () => (
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

export default OperationsQuestionSections;
