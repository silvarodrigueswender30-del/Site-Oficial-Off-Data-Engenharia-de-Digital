import React from 'react';
import styles from './OperationsPage.module.css';

const OperationsIntro = () => (
  <section id="diagnostico" className={styles.editorial}>
    <div className={styles.splitIntro}>
      <div className={styles.introTitle}>
        <h2>Oportunidades precisam chegar com contexto e destino claro</h2>
      </div>
      <div className={styles.introCopy}>
        <p>Operações comerciais digitais organizam a entrada, a leitura e o acompanhamento das oportunidades que chegam pelo site, WhatsApp, formulários, campanhas e indicações. Para empresas B2B em Uberlândia e no Triângulo Mineiro, essa estrutura ajuda a reduzir perda de contexto no atendimento e cria uma base mais clara para priorizar contatos.</p>
        <p>Quando cada canal funciona de forma isolada, informações importantes podem se perder entre mensagens, planilhas, caixas de entrada e conversas comerciais. A Off-Data estrutura fluxos para conectar captação, qualificação, atendimento e follow-up, sempre considerando a realidade do time, a maturidade do processo e o tipo de venda consultiva envolvida.</p>
        <p>A proposta não é prometer automação milagrosa, vendas garantidas ou ROI fixo. O diagnóstico identifica gargalos, pontos de integração e prioridades possíveis para que site, formulários, CRM, WhatsApp e rotina comercial trabalhem com mais clareza. O resultado esperado é uma operação mais legível, acompanhável e preparada para decisões melhores.</p>
      </div>
    </div>
  </section>
);

export default OperationsIntro;
