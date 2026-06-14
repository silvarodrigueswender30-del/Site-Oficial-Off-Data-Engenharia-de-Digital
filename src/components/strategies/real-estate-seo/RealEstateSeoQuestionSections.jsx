import React from 'react';
import styles from './RealEstateSeoPage.module.css';

const questions = [
  {
    title: 'Por que imobiliárias de luxo precisam de SEO local diferenciado?',
    paragraphs: [
      'Imóveis premium raramente são escolhidos por uma única informação. O comprador avalia localização, arquitetura, privacidade, infraestrutura, reputação da imobiliária e qualidade do atendimento antes de iniciar uma conversa. Por isso, a presença orgânica precisa apresentar contexto e autoridade, não apenas uma lista de propriedades.',
      'Uma estratégia diferenciada organiza esse universo em páginas específicas e úteis. Ela conecta buscas por bairros, condomínios, estilos de imóvel e necessidades de compra a uma experiência digital coerente. Também preserva a linguagem da marca, evitando páginas repetitivas ou excessivamente orientadas a termos de busca.',
    ],
  },
  {
    title: 'Como o comprador premium pesquisa imóveis hoje?',
    paragraphs: [
      'A jornada costuma alternar entre pesquisas amplas e consultas muito específicas. Uma pessoa pode começar explorando imóveis de luxo em Uberlândia, aprofundar-se em determinada região, comparar condomínios e retornar depois procurando características precisas. Em cada etapa, clareza e consistência ajudam a imobiliária a permanecer relevante.',
      'Esse comportamento exige páginas rápidas, responsivas e informativas. Fotografias, descrições, localização e diferenciais precisam trabalhar em conjunto. Conteúdos regionais também ajudam a responder perguntas que surgem antes do contato, tornando a experiência mais útil sem pressionar a decisão.',
    ],
  },
  {
    title: 'SEO local vs anúncios pagos para imobiliárias: qual converte mais?',
    paragraphs: [
      'SEO local e mídia paga cumprem funções diferentes. Anúncios podem gerar exposição imediata para campanhas, lançamentos ou imóveis prioritários. A presença orgânica constrói uma base permanente de páginas, conteúdo e autoridade que continua apoiando novas pesquisas ao longo do tempo.',
      'A melhor combinação depende dos objetivos, do portfólio e da maturidade digital da imobiliária. Quando as duas frentes compartilham mensagens, páginas de destino e critérios de mensuração, a operação ganha mais clareza. O SEO reduz dependência exclusiva de mídia, enquanto os anúncios ajudam a testar demandas e acelerar aprendizados.',
    ],
  },
];

const RealEstateSeoQuestionSections = () => (
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

export default RealEstateSeoQuestionSections;
