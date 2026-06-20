import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../Header';
import FooterSection from '../sections/FooterSection';
import PixelTransition from '../animations/PixelTransition';
import styles from '../../styles/ImmersiveSites.module.css';
import { getWhatsAppLinkProps, WHATSAPP_MESSAGES } from '../../constants/contact';

/* ──────────────────────────────────────────────────────────
   DATA — Operational Capabilities
   Ref: list_capabilities items (6 items, uppercase, mono)
   ────────────────────────────────────────────────────────── */
const capabilities = [
  'Arquitetura visual premium',
  'SEO técnico estrutural',
  'Performance e Core Web Vitals',
  'Conversão estratégica',
  'Tracking e analytics',
  'Evolução e manutenção contínua',
];

/* ──────────────────────────────────────────────────────────
   DATA — System Properties (Cards numerados)
   Ref: .card_box, .title_card_temp, .desc_card_temp
   Grid: 4 colunas, 2 linhas (6 cards, 2 posições vazias no grid)
   ────────────────────────────────────────────────────────── */
const systemCards = [
  {
    n: '01',
    title: 'Arquitetura Visual Premium',
    text: 'Design sofisticado que transmite o valor real do negócio. Estética construída para reter a atenção e gerar percepção de autoridade imediata.',
  },
  {
    n: '02',
    title: 'Alta Performance Web',
    text: 'Sites construídos para carregamento extremo. Aprovação do Google em Core Web Vitals com fluidez e estabilidade em qualquer dispositivo.',
  },
  {
    n: '03',
    title: 'SEO Local Nativo',
    text: 'Estrutura técnica planejada desde a base para dominar buscas orgânicas em Uberlândia e no Triângulo Mineiro.',
  },
  {
    n: '04',
    title: 'Conversão Estratégica',
    text: 'Cada interação arquitetada para conduzir o visitante à ação. Funis otimizados, hierarquia visual e CTAs precisos.',
  },
  {
    n: '05',
    title: 'Tracking e Analytics',
    text: 'Rastreamento preciso para decisões baseadas em comportamento real. Controle total sobre os dados.',
  },
  {
    n: '06',
    title: 'Evolução Contínua',
    text: 'Seu site como ativo que valoriza. Suporte técnico contínuo e atualizações de performance.',
  },
];

/* ──────────────────────────────────────────────────────────
   SVG CTA Lines — autoral Off-Data
   Ref: complex orthogonal SVG paths with blue gradient stroke
   Linha de referência: duas curvas paralelas em diagonal,
   formando um circuito técnico. Replicamos a lógica com paths
   autorais usando as mesmas cores (#044ab3, gradiente fade).
   ────────────────────────────────────────────────────────── */
const CtaLinesSvg = () => (
  <svg
    className={styles.ctaLinesSvg}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1920 1190"
    fill="none"
    preserveAspectRatio="xMidYMid meet"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="odGrad1" x1="0" y1="883" x2="1920" y2="883" gradientUnits="userSpaceOnUse">
        <stop stopColor="#044ab3" stopOpacity="0" />
        <stop offset="0.5" stopColor="#044ab3" />
        <stop offset="1" stopColor="#044ab3" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="odGrad2" x1="1920" y1="903" x2="0" y2="903" gradientUnits="userSpaceOnUse">
        <stop stopColor="#044ab3" stopOpacity="0" />
        <stop offset="0.5" stopColor="#044ab3" />
        <stop offset="1" stopColor="#044ab3" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="odGrad3" x1="1920" y1="563" x2="0" y2="563" gradientUnits="userSpaceOnUse">
        <stop stopColor="#044ab3" stopOpacity="0" />
        <stop offset="0.5" stopColor="#044ab3" />
        <stop offset="1" stopColor="#044ab3" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="odGrad4" x1="0" y1="583" x2="1920" y2="583" gradientUnits="userSpaceOnUse">
        <stop stopColor="#044ab3" stopOpacity="0" />
        <stop offset="0.5" stopColor="#044ab3" />
        <stop offset="1" stopColor="#044ab3" stopOpacity="0" />
      </linearGradient>
      <clipPath id="odClip">
        <rect width="1920" height="1190" />
      </clipPath>
    </defs>
    <g clipPath="url(#odClip)">
      {/* Path 1 — diagonal circuit top-right to bottom-left */}
      <path
        d="M2200 1146H1530C1519 1146 1510 1137 1510 1126V996C1510 985 1501 976 1490 976H1224C1213 976 1204 967 1204 956V741C1204 730 1195 721 1184 721H720C709 721 700 730 700 741V839C700 850 691 859 680 859H430C419 859 410 850 410 839V534C410 523 401 514 390 514H-98"
        stroke="url(#odGrad1)"
        strokeWidth="1"
      />
      {/* Path 2 — parallel offset */}
      <path
        d="M2180 1166H1510C1499 1166 1490 1157 1490 1146V1016C1490 1005 1481 996 1470 996H1204C1193 996 1184 987 1184 976V761C1184 750 1175 741 1164 741H700C689 741 680 750 680 761V859C680 870 671 879 660 879H410C399 879 390 870 390 859V554C390 543 381 534 370 534H-118"
        stroke="url(#odGrad2)"
        strokeOpacity="0.15"
        strokeWidth="1"
      />
      {/* Path 3 — bottom-left to top-right */}
      <path
        d="M-398 216H246C257 216 266 225 266 236V406C266 417 275 426 286 426H547C558 426 567 435 567 446V661C567 672 576 681 587 681H1186C1197 681 1206 672 1206 661V563C1206 552 1215 543 1226 543H1490C1501 543 1510 552 1510 563V868C1510 879 1519 888 1530 888H2254"
        stroke="url(#odGrad3)"
        strokeWidth="1"
      />
      {/* Path 4 — parallel offset */}
      <path
        d="M-378 236H266C277 236 286 245 286 256V426C286 437 295 446 306 446H567C578 446 587 455 587 466V681C587 692 596 701 607 701H1206C1217 701 1226 692 1226 681V583C1226 572 1235 563 1246 563H1510C1521 563 1530 572 1530 583V888C1530 899 1539 908 1550 908H2274"
        stroke="url(#odGrad4)"
        strokeOpacity="0.15"
        strokeWidth="1"
      />
      {/* Labels within the diagram */}
      <text x="350" y="500" fill="#044ab3" fontSize="11" fontFamily="'Fragment Mono', 'Courier New', monospace" letterSpacing="2" opacity="0.6">SEO BASE</text>
      <text x="750" y="700" fill="#044ab3" fontSize="11" fontFamily="'Fragment Mono', 'Courier New', monospace" letterSpacing="2" opacity="0.6">UX FLOW</text>
      <text x="1250" y="940" fill="#044ab3" fontSize="11" fontFamily="'Fragment Mono', 'Courier New', monospace" letterSpacing="2" opacity="0.6">CORE WEB</text>
      <text x="1450" y="520" fill="#044ab3" fontSize="11" fontFamily="'Fragment Mono', 'Courier New', monospace" letterSpacing="2" opacity="0.6">CONVERSÃO</text>
      <text x="600" y="400" fill="#044ab3" fontSize="11" fontFamily="'Fragment Mono', 'Courier New', monospace" letterSpacing="2" opacity="0.6">INDEXAÇÃO</text>
      <text x="1100" y="800" fill="#044ab3" fontSize="11" fontFamily="'Fragment Mono', 'Courier New', monospace" letterSpacing="2" opacity="0.6">PERFORMANCE</text>
      
      {/* Small tech rectangles at intersections */}
      <rect x="408" y="532" width="4" height="4" fill="#044ab3" opacity="0.5"/>
      <rect x="1508" y="561" width="4" height="4" fill="#044ab3" opacity="0.5"/>
      <rect x="1202" y="974" width="4" height="4" fill="#044ab3" opacity="0.5"/>
      <rect x="698" y="739" width="4" height="4" fill="#044ab3" opacity="0.5"/>
    </g>
  </svg>
);

/* ──────────────────────────────────────────────────────────
   PAGE COMPONENT
   ────────────────────────────────────────────────────────── */
const ImmersiveSitesPage = () => {
  const whatsappLinkProps = getWhatsAppLinkProps(WHATSAPP_MESSAGES.immersiveSites);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Criação de Sites Imersivos Premium',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Off-Data Engenharia Digital',
      image: 'https://www.offdata.digital/logo.png',
    },
    description:
      'Criação de sites profissionais em Uberlândia para empresas que precisam de presença digital premium, performance, SEO e conversão.',
    areaServed: { '@type': 'City', name: 'Uberlândia' },
  };

  return (
    <div className={styles.pageContainer}>
      <Helmet>
        <title>Criação de Sites em Uberlândia | Off-Data Digital</title>
        <meta
          name="description"
          content="Criação de sites profissionais em Uberlândia para empresas que precisam de presença digital premium, performance, SEO e conversão."
        />
        <link rel="canonical" href="https://www.offdata.digital/criacao-de-sites-uberlandia" />
        <meta property="og:title" content="Criação de Sites em Uberlândia | Off-Data Digital" />
        <meta
          property="og:description"
          content="Criação de sites profissionais em Uberlândia para empresas que precisam de presença digital premium, performance, SEO e conversão."
        />
        <meta property="og:url" content="https://www.offdata.digital/criacao-de-sites-uberlandia" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Criação de Sites em Uberlândia | Off-Data Digital" />
        <meta
          name="twitter:description"
          content="Criação de sites profissionais em Uberlândia para empresas que precisam de presença digital premium, performance, SEO e conversão."
        />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <Header />

      <main>

        {/* ══════════════════════════════════════════════════
            HERO — Dark, flex row
            Ref: .hero_section.product_template_page
                 .template_product → padding: 10em 1.75rem 1.75rem, display: flex
                 .left_info → width: 50–55%
                 .right_visual → width: 30–35%, height: 45–55%, margin-top: auto
            ══════════════════════════════════════════════════ */}
        <section className={styles.heroSection}>

          {/* LEFT — text + short caps */}
          <div className={styles.heroLeft}>
            {/* Tag line — Ref: .tag_txt */}
            <div className={styles.heroTag}>
              <span className={styles.tagCube} aria-hidden="true" />
              Sites Profissionais · Uberlândia
            </div>

            {/* H1 — Off-Data: weight 400, PP Neue Montreal, conciso */}
            <h1 className={styles.heroH1}>
              Sites Imersivos Premium
            </h1>

            {/* Subtítulo — Ref Off-Data: desc abaixo do H1, menor e mais refinado */}
            <p className={styles.heroDesc}>
              Para empresas que precisam de presença digital de alto padrão, performance técnica e
              conversão real em Uberlândia e no Triângulo Mineiro.
            </p>

            {/* Short caps — Ref: .box_short (2 colunas) */}
            <div className={styles.heroShortCaps}>
              {/* Left cap — Ref: .left_side_template .left_capt */}
              <div className={styles.shortCap}>
                <div className={styles.shortCapTitle}>Presença de Autoridade</div>
                <div className={styles.shortCapText}>
                  Criação de sites para empresas B2B e mercados high-ticket no Triângulo Mineiro.
                </div>
              </div>
              {/* Right cap — Ref: .right_capt */}
              <div className={styles.shortCap}>
                <div className={styles.shortCapTitle}>Performance e SEO</div>
                <div className={styles.shortCapText}>
                  Arquitetura técnica planejada para ranquear, carregar rápido e converter.
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — video — Ref: .right_visual */}
          <div className={styles.heroRight}>
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              src="/videos/video-seo01.mp4"
            />
            <div className={styles.videoFallback} aria-hidden="true" />
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            OPERATIONAL CAPABILITIES
            Ref: .opertional → background: #111 (--black)
                 .flex_opertional → flex-flow: column
                 .flex_second → gap: 2.5em
                 .heading_opertional → width: 50%
                 .list_opertional → margin-top: 9em
                 .right_list → width: 50%, margin-left: auto
            ══════════════════════════════════════════════════ */}
        <section id="capabilities" className={styles.operational}>
          <div className={styles.operationalInner}>
            {/* Top: tag + h2 */}
            <div className={styles.operationalTop}>
              <div className={styles.sectionTagLine}>
                <span className={styles.tagCube} aria-hidden="true" />
                Infraestrutura
              </div>
              <h2 className={styles.operationalH2}>
                Capacidades<br />Operacionais
              </h2>
            </div>

            {/* Bottom: desc (left) + list (right) — Ref: .list_opertional */}
            <div className={styles.operationalBottom}>
              {/* Ref: .op_p */}
              <p className={styles.operationalDesc}>
                Desenvolvemos sites para empresas que buscam liderança de mercado. Cada entrega
                integra SEO técnico, design focado em conversão e performance de alto nível.
              </p>

              {/* Ref: .right_list → .list_capabilities_cms → .list_capabilities */}
              <ul className={styles.capabilitiesList}>
                {capabilities.map((cap) => (
                  <li key={cap} className={styles.capabilityItem}>
                    <span className={styles.tagCube} aria-hidden="true" />
                    {cap}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            PIXEL TRANSITION — dark (#111) → blue (#044ab3)
            Ref: data-from="#151515" data-to="#044AB3" data-accent="#6FE3FF"
            ══════════════════════════════════════════════════ */}
        <PixelTransition
          triggerId="capabilities"
          targetId="properties-section"
          fromColor="#151515"
          toColor="#044ab3"
          accentColor="#6fe3ff"
        />

        {/* ══════════════════════════════════════════════════
            SYSTEM PROPERTIES — Blue section
            Ref: .properties background: --blue = #044ab3
                 .middle_properties text-align: center
                 .grid_system 4-col grid
                 .card_box background: #ffffff1a
                 .title_desc_card margin-top: 8em (!)
            ══════════════════════════════════════════════════ */}
        <section id="properties-section" className={styles.propertiesSection}>
          <div className={styles.propertiesInner}>
            {/* Ref: .middle_properties text-align: center */}
            <div className={styles.propertiesHeadingWrap}>
              <h2 className={styles.propertiesHeading}>
                Propriedades<br />do Sistema
              </h2>
            </div>

            {/* Ref: .grid_system 4 cols, .card_box */}
            <div className={styles.cardsGrid}>
              {systemCards.map((card) => (
                <div key={card.n} className={styles.card}>
                  {/* Ref: .top_side_card */}
                  <div className={styles.cardTop}>
                    {/* Ref: .number_card */}
                    <div className={styles.cardNumber}>{card.n}</div>
                  </div>
                  {/* Ref: .title_desc_card margin-top: 8em */}
                  <div className={styles.cardBody}>
                    <h3 className={styles.cardTitle}>{card.title}</h3>
                    <p className={styles.cardText}>{card.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            CTA WHITE SECTION
            Ref: .cta_box height: 90vh
                 .wrapper_cta padding: 8em 1.25rem 3.5em
                 .heading_cta width: 55%, gap: 2.7em
                 .cta-lines position: absolute, inset: 0
                 .paragraph_last width: 54ch
            ══════════════════════════════════════════════════ */}
        <section className={styles.ctaSection}>
          {/* SVG technical background lines */}
          <div className={styles.ctaLines} aria-hidden="true">
            <CtaLinesSvg />
          </div>

          <div className={styles.ctaInner}>
            <div className={styles.ctaContentGrid}>
              <div className={styles.ctaTagLine}>
                <span className={styles.ctaTagCube} aria-hidden="true" />
                vamos construir juntos
              </div>

              <h2 className={styles.ctaH2}>
                Comece a transformar sua presença digital com a Off-Data
              </h2>

              <div className={styles.ctaButtonWrap}>
                <a {...whatsappLinkProps} className={styles.ctaButton}>
                  <div>Falar com um especialista</div>
                  <div className={styles.ctaArrow}>↗</div>
                </a>
              </div>

            </div>
          </div>
        </section>

      </main>

      <FooterSection />
    </div>
  );
};

export default ImmersiveSitesPage;
