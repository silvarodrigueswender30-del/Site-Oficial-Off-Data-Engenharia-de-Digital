import React from 'react';
import styles from './ClinicsImmersiveSitesPage.module.css';

const questions = [
  {
    title: 'O que diferencia o site de uma clínica premium das demais?',
    paragraphs: [
      'Um site premium não se diferencia apenas por uma estética sofisticada. Ele transforma informações complexas em uma experiência organizada, respeitosa e fácil de compreender. A pessoa consegue identificar o perfil da clínica, conhecer suas áreas de atuação, entender como funciona o atendimento e localizar os canais corretos sem enfrentar excesso de estímulos ou linguagem pouco clara.',
      'Também existe uma diferença importante na execução técnica. O site precisa funcionar bem em diferentes telas, carregar com estabilidade e manter consistência entre conteúdo, identidade visual e navegação. Fotografias, textos, movimentos e interações devem apoiar a leitura, não competir com ela. Essa combinação ajuda a transmitir profissionalismo antes do contato, embora a decisão do paciente continue dependendo de fatores pessoais, clínicos e relacionais.',
    ],
  },
  {
    title: 'Como o design influencia a decisão do paciente de alto padrão?',
    paragraphs: [
      'O design influencia a forma como informações são percebidas e compreendidas. Em uma clínica de alto padrão, uma apresentação coerente pode contribuir para a percepção de cuidado, organização e atenção aos detalhes. Isso inclui desde a legibilidade dos textos até a qualidade das imagens, a clareza dos botões e o equilíbrio entre conteúdo institucional e orientações práticas.',
      'Essa influência não deve ser confundida com garantia de escolha ou de agendamento. Pacientes avaliam indicações, especialidade, localização, disponibilidade, confiança profissional e muitas outras variáveis. O papel do design é reduzir ruídos, facilitar a comparação responsável e apresentar a clínica com honestidade. Uma experiência digital calma e clara tende a apoiar uma decisão mais informada.',
    ],
  },
  {
    title: 'Quais elementos são obrigatórios em sites de clínicas médicas que convertem?',
    paragraphs: [
      'Uma estrutura eficiente começa com informações essenciais: identificação clara da clínica, áreas de atendimento, localização, contatos, horários e orientações sobre agendamento. Também deve oferecer páginas institucionais consistentes, conteúdo legível, navegação móvel e recursos de acessibilidade. Quando houver integração com plataformas externas, o fluxo precisa deixar claro para onde a pessoa será direcionada e como seus dados serão tratados.',
      'O conteúdo deve respeitar as normas de publicidade médica aplicáveis, evitando garantias, sensacionalismo e afirmações inadequadas. Aspectos técnicos como segurança, performance, SEO local e manutenção também sustentam a experiência. Nenhum elemento isolado garante conversão; juntos, eles reduzem atritos, organizam a jornada e ajudam a clínica a apresentar sua atuação de maneira responsável.',
    ],
  },
];

const ClinicsImmersiveSitesQuestionSections = () => (
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

export default ClinicsImmersiveSitesQuestionSections;
