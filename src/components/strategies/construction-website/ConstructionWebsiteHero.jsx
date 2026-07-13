import React from 'react';
import styles from './ConstructionWebsitePage.module.css';
import { getWhatsAppLinkProps, WHATSAPP_MESSAGES } from '../../../constants/contact';

const whatsappLinkProps = getWhatsAppLinkProps(WHATSAPP_MESSAGES.constructionWebsite);

const ConstructionWebsiteHero = () => (
  <>
    <section className={styles.hero} data-section="light">
      <div className={styles.heroInner}>
        <div className={styles.heroHeading}>
          <h1>{"Site para Construtora em Uberlândia"}</h1>
          <a className={styles.primaryButton} {...whatsappLinkProps}>
            <span>{"Solicitar diagnóstico digital"}</span><span aria-hidden="true">↗</span>
          </a>
        </div>
        <svg className={styles.heroLines} viewBox="0 0 1920 360" preserveAspectRatio="none" aria-hidden="true">
          <path d="M-40 20H340Q365 20 365 45V145Q365 170 390 170H890Q915 170 915 195V390" />
          <path d="M1960 20H1580Q1555 20 1555 45V145Q1555 170 1530 170H1030Q1005 170 1005 195V390" />
          <path className={styles.linePulse} d="M-40 20H340Q365 20 365 45V145Q365 170 390 170H890Q915 170 915 195V390" pathLength="1" />
          <path className={styles.linePulse} d="M1960 20H1580Q1555 20 1555 45V145Q1555 170 1530 170H1030Q1005 170 1005 195V390" pathLength="1" />
        </svg>
        <div className={styles.heroDots}><span /><span /></div>
      </div>
    </section>
    <div className={styles.panorama}>
      <img src="/imagens/imagem-estrategia/criacao-de-site-construtora-hero.avif" width="2752" height="1536" alt="Engenharia digital que apresenta seus empreendimentos com a solidez e a credibilidade que o comprador espera antes de assinar qualquer contrato." loading="eager" decoding="async" fetchPriority="high" />
    </div>
  </>
);

export default ConstructionWebsiteHero;
