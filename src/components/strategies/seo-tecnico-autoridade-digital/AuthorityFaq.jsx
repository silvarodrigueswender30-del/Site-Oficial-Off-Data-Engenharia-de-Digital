import React from 'react';
import styles from './AuthorityPage.module.css';

export const faqItems = [
  {
    question: 'O que é autoridade digital?',
    answer: 'Autoridade digital é a percepção construída quando uma empresa apresenta informação útil, estrutura técnica consistente, presença regional clara e comunicação coerente com sua especialidade. Ela não depende de um único conteúdo ou métrica. É resultado de site, SEO, performance, linguagem, confiança e evolução contínua trabalhando juntos.',
  },
  {
    question: 'SEO técnico garante primeira posição no Google?',
    answer: 'Não. SEO técnico melhora a base de leitura, indexação, velocidade e organização do site, mas não garante posição específica. O desempenho depende de concorrência, autoridade existente, qualidade do conteúdo, intenção de busca, histórico do domínio e mudanças dos algoritmos. A leitura correta é tratar técnica como fundamento, não promessa.',
  },
  {
    question: 'Essa estratégia serve para empresas locais?',
    answer: 'Sim, especialmente quando a empresa atende mercados regionais e precisa ser encontrada com confiança. Em Uberlândia e no Triângulo Mineiro, autoridade digital pode conectar serviços, localização, diferenciais e conteúdo técnico. A estratégia precisa refletir atuação real, evitando páginas genéricas para cidades ou segmentos sem aderência.',
  },
  {
    question: 'Qual a diferença entre conteúdo comum e conteúdo estratégico?',
    answer: 'Conteúdo comum costuma falar de temas soltos, sem conexão clara com a jornada de decisão. Conteúdo estratégico responde dúvidas reais, organiza critérios de escolha, fortalece tópicos importantes e se encaixa em uma arquitetura de páginas. Ele informa, posiciona e ajuda o visitante a entender por que a empresa é relevante.',
  },
  {
    question: 'Quando faz sentido contratar um diagnóstico de autoridade?',
    answer: 'Faz sentido quando o site não reflete mais o valor da empresa, quando conteúdos não geram clareza, quando páginas importantes não aparecem no Google ou quando a presença digital depende de ações isoladas. O diagnóstico identifica gargalos técnicos, editoriais e comerciais para priorizar uma evolução realista.',
  },
];

const AuthorityFaq = () => (
  <section id="faq" className={styles.faq}>
    <div className={styles.faqInner}>
      <div className={styles.faqHeading}>
        <span>FAQ</span>
        <h2>Perguntas frequentes sobre autoridade digital</h2>
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

export default AuthorityFaq;
