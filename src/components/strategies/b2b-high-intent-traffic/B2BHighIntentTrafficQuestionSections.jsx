import React from 'react';
import styles from './B2BHighIntentTrafficPage.module.css';

const questions = [
  {
    title: 'Por que o tráfego B2B exige uma estratégia diferente do B2C?',
    paragraphs: [
      'Compras B2B costumam envolver risco operacional, avaliação técnica, orçamento, negociação e mais de uma pessoa na decisão. Um clique raramente representa uma venda imediata. A campanha precisa considerar o estágio da demanda, o papel de quem pesquisa e as informações necessárias para que a empresa avalie se existe aderência antes de avançar.',
      'Isso muda a escolha de palavras-chave, anúncios, páginas e indicadores. Em vez de buscar apenas volume, a estratégia deve observar qualidade das conversas, origem das oportunidades e evolução do funil. O processo também exige integração com a equipe comercial, porque aprendizados das reuniões ajudam a refinar mensagens, segmentações e critérios de qualificação.',
    ],
  },
  {
    title: 'Google Ads ou LinkedIn Ads: qual funciona melhor para B2B regional?',
    paragraphs: [
      'A resposta depende de onde a demanda se manifesta. Google Ads pode fazer sentido quando decisores pesquisam ativamente uma solução, um serviço ou um fornecedor. LinkedIn Ads pode contribuir quando a estratégia precisa alcançar perfis por cargo, setor ou empresa, especialmente em ciclos consultivos. Meta Ads pode apoiar reconhecimento, distribuição de conteúdo e remarketing regional.',
      'Nenhum canal é automaticamente superior. Ticket, tamanho do público, oferta, verba, maturidade da categoria e capacidade comercial influenciam a escolha. Um diagnóstico ajuda a definir o papel de cada plataforma, evitando distribuir investimento apenas por presença e sem uma hipótese clara de audiência, mensagem e próximo passo.',
    ],
  },
  {
    title: 'Como qualificar leads B2B antes do contato comercial?',
    paragraphs: [
      'A qualificação começa antes do formulário. Anúncios e páginas precisam explicar para quem a solução foi criada, quais problemas atende, onde a operação atua e que tipo de conversa acontece depois. Essa clareza reduz contatos desalinhados e permite que o decisor avalie se vale avançar sem depender de uma abordagem genérica.',
      'Formulários podem coletar informações úteis, como segmento, necessidade, localização e contexto do projeto, respeitando privacidade e facilidade de preenchimento. A integração com CRM organiza origem e histórico para que marketing e vendas analisem o funil em conjunto. O objetivo é melhorar a qualidade das decisões, não criar barreiras desnecessárias ou prometer oportunidades prontas.',
    ],
  },
];

const B2BHighIntentTrafficQuestionSections = () => (
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

export default B2BHighIntentTrafficQuestionSections;
