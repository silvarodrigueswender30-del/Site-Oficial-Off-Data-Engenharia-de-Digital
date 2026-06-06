import React, { useEffect, useRef } from 'react';
import arrowDiagonal from '../../assets/images/arrow-diagonal.svg';

/**
 * BuiltForSection
 *
 * Replica exata da seção BUILT_FOR do site Cantor8
 * - SVG animado com stroke-dasharray driven by scroll
 * - Padrão grid complexo para parceiros
 * - Responsividade completa (mobile, tablet, desktop)
 */

const BuiltForSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    // ─── Scroll-driven shrimp pulse animation (from original) ────────────
    let rafId = null;

    function clamp(v, min, max) {
      return Math.max(min, Math.min(max, v));
    }

    function getProgressForElement(el) {
      const rect = el.getBoundingClientRect();
      const start = window.innerHeight;
      const end = -rect.height;
      const raw = (start - rect.top) / (start - end);
      return clamp(raw, 0, 1);
    }

    function getProgressForHeading(heading) {
      const rect = heading.getBoundingClientRect();
      const vh = window.innerHeight;
      const startY = vh * 1.05;
      const endY = vh * 0.12;
      const raw = (startY - rect.top) / (startY - endY);
      return clamp(raw, 0, 1);
    }

    function initShrimpPulse() {
      const root = sectionRef.current?.querySelector('.wrapper_general');
      const heading = root?.querySelector('.execution_box');

      const pulseMain = document.getElementById('shrimpPulseMain');
      const pulseSub = document.getElementById('shrimpPulseSub');

      if (!root || !pulseMain || !pulseSub) return;

      if (rafId) cancelAnimationFrame(rafId);

      function getProgress() {
        const isMobile = window.matchMedia('(max-width: 767px)').matches;
        if (isMobile && heading) {
          return getProgressForHeading(heading);
        }
        return getProgressForElement(root);
      }

      function animate() {
        const progress = getProgress();
        const isMobile = window.matchMedia('(max-width: 767px)').matches;

        const mainOffsetStart = 1000;
        const subOffsetStart = 1040;
        const mainTravel = isMobile ? 1050 : 1000;
        const subTravel = isMobile ? 1020 : 980;

        pulseMain.style.strokeDashoffset = String(-mainOffsetStart + progress * mainTravel);
        pulseSub.style.strokeDashoffset = String(-subOffsetStart + progress * subTravel);

        pulseMain.style.opacity =
          progress > 0.82 ? String(1 - (progress - 0.82) / 0.18) : '1';
        pulseSub.style.opacity =
          progress > 0.82 ? String(1 - (progress - 0.82) / 0.18) : '1';

        rafId = requestAnimationFrame(animate);
      }

      animate();
    }

    initShrimpPulse();

    const handleResize = () => initShrimpPulse();
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Dados dos parceiros
  const partners = [
    { id: 1, name: 'Haja Arquitetura', href: 'https://www.hajaarquitetura.com.br/', logo: '/logos-parceiros/haja-arquitetura-branca.webp', logoWidth: '38%' },
    { id: 2, name: 'OM Arquitetos', href: 'https://www.omarquitetos.com.br/projetos', logo: '/logos-parceiros/om-arquitetos-branca.webp', logoWidth: '30%' },
    { id: 3, name: 'FRS Arquitetura e Design', href: 'https://arquiteturafrs.com.br/', logo: '/logos-parceiros/frs-arquitetura-branca.webp', logoWidth: '76%' },
    { id: 4, name: 'Andrade Arquitetos', href: 'https://andradearquitetosbr.com.br/', logo: '/logos-parceiros/andrade-arquitetos-branca.webp', logoWidth: '58%' },
    { id: 5, name: 'Bayer Brasil', href: 'https://www.bayer.com.br/pt/', logo: '/logos-parceiros/bayer-branca.svg', logoWidth: '34%' },
    { id: 6, name: 'Coperama', href: 'https://www.coperama.com.br/', logo: '/logos-parceiros/coperama-branca.webp', logoWidth: '72%' },
    { id: 7, name: 'GoAkira', href: 'https://goakira.com.br/', logo: '/logos-parceiros/goakira-branca.webp', logoWidth: '76%' },
  ];

  return (
    <section id="built-for" ref={sectionRef} className="built_for relative z-30 bg-black text-white">
      <style>{`
        /* CSS Customizado para BUILT_FOR */

        .built_for {
          background-color: var(--blue);
        }

        .wrapper_general {
          padding: 13.25em 1.75rem;
          position: relative;
        }

        .box_heading {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          gap: 32px;
          position: relative;
          z-index: 2;
        }

        .tagline {
          display: flex;
          align-items: center;
          gap: 0;
        }

        .tag_txt {
          display: flex;
          align-items: center;
          gap: 1em;
          font-family: 'Fragment Mono', monospace;
          font-size: 0.75em;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          color: var(--white);
        }

        .cube_tag {
          width: 0.375em;
          height: 0.375em;
          border-radius: 1px;
          background-color: var(--white);
          flex-shrink: 0;
        }

        .cube_tag.blue {
          background-color: var(--blue);
        }

        .heading {
          width: 77ch;
        }

        .h2 {
          color: var(--white);
          font-size: 5em;
          font-weight: 400;
          line-height: 1;
          margin: 0;
          font-family: 'PP Neue Montreal', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        .h2.small {
          font-size: 4.5em;
          text-align: center;
        }

        /* Shrimp Flow Animation */
        .shrimp-flow {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
        }

        .shrimp-flow--rtl {
          top: 8em;
        }

        .shrimp-svg {
          position: absolute;
          left: 50%;
          top: 0;
          width: 100%;
          height: auto;
          transform: translate(-50%, 220px);
          display: block;
        }

        .shrimp-svg--sub {
          transform: translate(-50%, 205px);
        }

        .shrimp-svg--main {
          transform: translate(-50%, 220px);
        }

        .shrimp-svg path {
          vector-effect: non-scaling-stroke;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .shrimp-pulse {
          fill: none;
          stroke: #fff;
          stroke-width: 1;
          pointer-events: none;
          vector-effect: non-scaling-stroke;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        #shrimpPulseMain {
          stroke-opacity: .9;
          stroke-dasharray: 120 880;
          stroke-dashoffset: 1000;
        }

        #shrimpPulseSub {
          stroke-opacity: .55;
          stroke-dasharray: 90 910;
          stroke-dashoffset: 1040;
        }

        /* Execution Box */
        .execution_box {
          position: relative;
          z-index: 2;
          margin-top: 17em;
        }

        .content_inside {
          width: 30%;
          margin-left: auto;
          margin-right: 15%;
        }

        .md_txt {
          font-size: 2.3em;
          font-weight: 400;
          line-height: 1.2;
          margin: 0;
          color: var(--white);
        }

        .heading_wrap {
          width: 42ch;
          margin-bottom: 0;
        }

        .p_wrap {
          margin-top: 14px;
          margin-bottom: 24px;
        }

        .p_wrap.lines_box {
          width: 42ch;
          margin-top: 0.875em;
          margin-bottom: 1.5em;
        }

        .p_gen {
          font-size: 0.9em;
          font-weight: 500;
          line-height: 1.3;
          letter-spacing: -0.005em;
          color: #aaa;
          margin: 0;
        }

        .built_for .button_wrap {
          margin-top: 24px;
        }

        .built_for .button {
          display: inline-flex;
          align-items: center;
          background-color: var(--white);
          color: var(--blue);
          letter-spacing: 0;
          border: 0;
          border-radius: .1875em;
          padding: .25em .25em .25em 1em;
          text-decoration: none;
          font-size: .95em;
          font-weight: 500;
          cursor: pointer;
        }

        .built_for .button:hover {
          opacity: 0.9;
        }

        .built_for .flex_button_general {
          display: flex;
          align-items: center;
          grid-column-gap: 4.5em;
          justify-content: flex-start;
        }

        .built_for .arrow_button {
          background-color: var(--blue);
          border-radius: .1875em;
          width: 2.375em;
          height: 2.375em;
          padding: .625em;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .built_for .arrow_icon {
          width: 100%;
          height: 100%;
          background: url('${arrowDiagonal}') center / contain no-repeat;
          transition: transform .45s cubic-bezier(.22, 1, .36, 1), opacity .28s ease;
        }

        .built_for .arrow_button::after {
          content: "";
          position: absolute;
          width: calc(100% - 1.25em);
          height: calc(100% - 1.25em);
          background: url('${arrowDiagonal}') center / contain no-repeat;
          transform: translate(-145%, 145%);
          opacity: 0;
          transition: transform .45s cubic-bezier(.22, 1, .36, 1), opacity .28s ease;
        }

        .built_for .button:hover .arrow_button .arrow_icon,
        .built_for .button:focus-visible .arrow_button .arrow_icon {
          transform: translate(145%, -145%);
          opacity: 0;
        }

        .built_for .button:hover .arrow_button::after,
        .built_for .button:focus-visible .arrow_button::after {
          transform: translate(0, 0);
          opacity: 1;
        }

        /* Partners Section */
        .partners {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1.25em;
          text-align: center;
        }

        .middle_p {
          text-align: center;
          width: 47ch;
          color: #aaa;
        }

        .cms_grid {
          margin-top: 124px;
        }

        /* Grid Pattern - Desktop */
        .grid_partners {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          grid-template-rows: auto auto auto;
          gap: 1em;
          grid-auto-flow: dense;
        }

        /* Padrão nth-child que se repete a cada 8 items */
        .partner_item:nth-child(8n + 1) { grid-column: 1; grid-row: 2; }
        .partner_item:nth-child(8n + 2) { grid-column: 2; grid-row: 2; }
        .partner_item:nth-child(8n + 3) { grid-column: 3; grid-row: 1; }
        .partner_item:nth-child(8n + 4) { grid-column: 4; grid-row: 2; }
        .partner_item:nth-child(8n + 5) { grid-column: 5; grid-row: 2; }
        .partner_item:nth-child(8n + 6) { grid-column: 6; grid-row: 2; }
        .partner_item:nth-child(8n + 7) { grid-column: 3; grid-row: 3; }
        .partner_item:nth-child(8n + 8) { grid-column: 5; grid-row: 3; }

        .partner_item {
          min-height: 88px;
        }

        .partner_box {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          padding: 5%;
        }

        .partner_link_external {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          background-color: rgba(241, 241, 241, 0.15);
          border-radius: 4px;
          transition: all 0.4s;
          text-decoration: none;
        }

        .partner_link_external:hover {
          background-color: rgba(241, 241, 241, 0.25);
        }

        .partner_logo {
          object-fit: contain;
          width: var(--partner-logo-width, 72%);
          height: 54px;
          max-width: 100%;
          max-height: 62%;
        }

        /* Responsive Tablet */
        @media (max-width: 991px) {
          .built_for .shrimp-flow--rtl {
            top: 16.2em;
          }
          .built_for .wrapper_general {
            padding: 8em 1.75rem;
            overflow: hidden;
          }

          .built_for .shrimp-svg {
            left: 50%;
            width: 185%;
            max-width: none;
            height: auto;
            transform: translate(-50%, 78px);
          }

          .built_for .shrimp-svg--sub {
            transform: translate(-50%, 66px);
          }

          .built_for .execution_box {
            margin-top: 12em;
          }

          .built_for .content_inside {
            width: 45%;
            margin-right: 5%;
          }

          .built_for .h2 {
            font-size: 3.5em;
          }

          .built_for .md_txt {
            font-size: 1.8em;
          }

          .built_for .grid_partners {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        /* Responsive Mobile */
        @media (max-width: 767px) {
          .built_for {
            background-color: var(--blue);
          }

          .built_for .shrimp-flow--rtl {
            top: 9.3em;
          }
          .built_for .wrapper_general {
            padding: 92px 1rem;
          }

          .built_for .box_heading {
            gap: 24px;
          }

          .built_for .cube_tag {
            width: 0.85em;
            height: 0.85em;
          }

          .built_for .tag_txt {
            font-size: 0.9em;
          }

          .built_for .heading {
            width: 100%;
            overflow-wrap: normal;
          }

          .built_for .h2 {
            font-size: clamp(3.8rem, 17vw, 5rem);
            line-height: 0.98;
          }

          .built_for .h2.small {
            font-size: clamp(2.6rem, 11vw, 4.25rem);
          }

          .built_for .md_txt {
            font-size: clamp(2rem, 8.6vw, 3rem);
            line-height: 1.05;
          }

          .built_for .shrimp-svg {
            width: 210%;
            transform: translate(-50%, 56px);
          }

          .built_for .shrimp-svg--sub {
            transform: translate(-50%, 46px);
          }

          .built_for .shrimp-pulse {
            stroke-width: 1;
          }

          .built_for .execution_box {
            margin-top: 40em;
          }

          .built_for .content_inside {
            width: 80%;
            margin-left: 0;
            margin-right: 0%;
            margin-left: auto;
          }

          .built_for .heading_wrap {
            width: 100%;
          }

          .built_for .p_wrap.lines_box {
            width: 100%;
            margin-top: 2em;
            margin-bottom: 3.5em;
          }

          .built_for .p_gen {
            color: var(--white);
            font-size: 1.9em;
          }

          .built_for .middle_p {
            width: 85ch;
          }

          .built_for .grid_partners {
            grid-template-columns: repeat(3, 1fr);
            gap: 0.75em;
          }

          .built_for .partner_item:nth-child(8n + 1),
          .built_for .partner_item:nth-child(8n + 2),
          .built_for .partner_item:nth-child(8n + 3),
          .built_for .partner_item:nth-child(8n + 4),
          .built_for .partner_item:nth-child(8n + 5),
          .built_for .partner_item:nth-child(8n + 6),
          .built_for .partner_item:nth-child(8n + 7),
          .built_for .partner_item:nth-child(8n + 8) {
            grid-column: auto;
            grid-row: auto;
          }

          .built_for .cms_grid {
            margin-top: 80px;
          }
        }

        @media (max-width: 479px) {
          .built_for .wrapper_general {
            padding: 6.2rem 1rem 6.8rem;
          }

          .built_for .cube_tag {
            width: 0.45rem;
            height: 0.45rem;
            font-size: initial;
          }

          .built_for .tag_txt {
            gap: 0.65rem;
            font-size: 0.78rem;
          }

          .built_for .h2 {
            font-size: clamp(3.25rem, 13.8vw, 4.05rem);
            line-height: 1.04;
            overflow-wrap: break-word;
            word-break: normal;
          }

          .built_for .h2.small {
            font-size: clamp(3.05rem, 12.6vw, 4rem);
            line-height: 1.05;
          }

          .built_for .shrimp-flow--rtl {
            top: 14rem;
          }

          .built_for .execution_box {
            margin-top: 29rem;
          }

          .built_for .content_inside {
            width: 80%;
            margin-left: auto;
            margin-right: 0%;
          }

          .built_for .md_txt {
            font-size: clamp(2rem, 7.7vw, 2.85rem);
            line-height: 1.08;
          }

          .built_for .p_gen {
            font-size: clamp(1.05rem, 4.4vw, 1.45rem);
            line-height: 1.24;
          }

          .built_for .heading_wrap {
            width: 100%;
          }

          .built_for .p_wrap.lines_box {
            width: 100%;
            margin-top: 1.35rem;
            margin-bottom: 1.85rem;
          }

          .built_for .button_wrap {
            width: 100%;
            margin-top: 0;
          }

          .built_for .button {
            width: 100%;
            font-size: 1.2rem;
          }

          .built_for .button .flex_button_general {
            width: 100%;
            justify-content: space-between;
            gap: 1rem;
          }

          .built_for .button .arrow_button {
            background-color: var(--blue);
            border-radius: 3px;
            width: 42px;
            height: 42px;
            padding: 0.8rem;
          }

          .built_for .button .arrow_icon {
            background-image: url('${arrowDiagonal}');
          }

          .built_for .partners {
            gap: 1.55rem;
          }

          .built_for .middle_p {
            width: 100%;
          }

          .built_for .grid_partners {
            grid-template-columns: 1fr 1fr;
            gap: 12px;
          }

          .built_for .partner_link_external {
            height: clamp(8.8rem, 36vw, 11rem);
          }

          .built_for .partner_box {
            padding: 10%;
          }
        }
      `}</style>

      {/* PRIMEIRA WRAPPER - Main Content */}
      <div className="wrapper_general">
        {/* Box Heading */}
        <div className="box_heading">
          <div className="tagline">
            <div className="tag_txt">
              <div className="cube_tag"></div>
              <div>FUNDAÇÃO</div>
            </div>
          </div>
          <div className="heading">
            <h2 className="h2">Arquitetura Digital de Precisão</h2>
          </div>
        </div>

        {/* SVG Animated Background */}
        <div className="shrimp-flow shrimp-flow--rtl">
          {/* SVG Secundária */}
          <svg
            className="shrimp-svg shrimp-svg--sub"
            viewBox="0 0 1920 914"
            fill="none"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient
                id="shrimpGradSub"
                x1="1926"
                y1="-47.4999"
                x2="43.5"
                y2="937"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="white" stopOpacity="0" />
                <stop offset="0.5" stopColor="white" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              id="shrimpPathSub"
              d="M-10 913H634C645.046 913 654 904.046 654 893V482.5C654 471.454 662.954 462.5 674 462.5H935C946.046 462.5 955 453.546 955 442.5V227.5C955 216.454 963.954 207.5 975 207.5H1573.5C1584.55 207.5 1593.5 216.454 1593.5 227.5V325.5C1593.5 336.546 1602.45 345.5 1613.5 345.5H1734.5C1745.55 345.5 1754.5 336.546 1754.5 325.5V20.5C1754.5 9.4543 1763.45 0.5 1774.5 0.5H2092.5"
              stroke="url(#shrimpGradSub)"
              strokeOpacity="0.15"
            />
            <path
              id="shrimpPulseSub"
              className="shrimp-pulse"
              d="M-10 913H634C645.046 913 654 904.046 654 893V482.5C654 471.454 662.954 462.5 674 462.5H935C946.046 462.5 955 453.546 955 442.5V227.5C955 216.454 963.954 207.5 975 207.5H1573.5C1584.55 207.5 1593.5 216.454 1593.5 227.5V325.5C1593.5 336.546 1602.45 345.5 1613.5 345.5H1734.5C1745.55 345.5 1754.5 336.546 1754.5 325.5V20.5C1754.5 9.4543 1763.45 0.5 1774.5 0.5H2092.5"
              stroke="white"
              fill="none"
              pathLength="1000"
              strokeDasharray="90 910"
              strokeDashoffset="1040"
            />
          </svg>

          {/* SVG Principal */}
          <svg
            className="shrimp-svg shrimp-svg--main"
            viewBox="0 0 1920 915"
            fill="none"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient
                id="shrimpGradMain"
                x1="1896"
                y1="-46.9999"
                x2="13.5"
                y2="937.5"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="white" stopOpacity="0" />
                <stop offset="0.5" stopColor="white" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              id="shrimpPathMain"
              d="M-40 913.5H604C615.046 913.5 624 904.546 624 893.5V483C624 471.954 632.954 463 644 463H905C916.046 463 925 454.046 925 443V228C925 216.954 933.954 208 945 208H1543.5C1554.55 208 1563.5 216.954 1563.5 228V326C1563.5 337.046 1572.45 346 1583.5 346H1704.5C1715.55 346 1724.5 337.046 1724.5 326V21C1724.5 9.9543 1733.45 1 1744.5 1H2062.5"
              stroke="url(#shrimpGradMain)"
              strokeOpacity="0.35"
              strokeWidth="1"
            />
            <path
              id="shrimpPulseMain"
              className="shrimp-pulse"
              d="M-40 913.5H604C615.046 913.5 624 904.546 624 893.5V483C624 471.954 632.954 463 644 463H905C916.046 463 925 454.046 925 443V228C925 216.954 933.954 208 945 208H1543.5C1554.55 208 1563.5 216.954 1563.5 228V326C1563.5 337.046 1572.45 346 1583.5 346H1704.5C1715.55 346 1724.5 337.046 1724.5 326V21C1724.5 9.9543 1733.45 1 1744.5 1H2062.5"
              stroke="white"
              fill="none"
              pathLength="1000"
              strokeDasharray="120 880"
              strokeDashoffset="1000"
            />
          </svg>
        </div>

        {/* Execution Box */}
        <div className="execution_box">
          <div className="content_inside">
            <div className="heading_wrap">
              <div className="md_txt">Do posicionamento local à conversão com sistemas imersivos confiáveis</div>
            </div>
            <div className="p_wrap lines_box">
              <div className="p_gen">
                A Off-Data projeta infraestrutura digital para marcas high-ticket em Uberlândia e no Triângulo Mineiro, unindo sites imersivos, SEO local e tráfego cirúrgico em uma operação mensurável. Cada entrega conecta design, tecnologia e aquisição, permitindo que clínicas, incorporadoras, agroindústrias e operações técnicas convertam atenção qualificada em oportunidades comerciais previsíveis.
              </div>
            </div>
            <div className="button_wrap">
              <a href="#cta-section" className="button">
                <div className="flex_button_general">
                  <div>A Agência</div>
                  <div className="arrow_button">
                    <div className="arrow_icon"></div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* SEGUNDA WRAPPER - Partners */}
      <div className="wrapper_general">
        <div className="partners">
          <h2 className="h2 small">Criado para<br />mercados exigentes</h2>
          <div className="middle_p">
            <div className="p_gen">
              Atuamos com empresas high-ticket em Uberlândia e no Triângulo Mineiro que precisam transformar presença digital em demanda qualificada. Nossa engenharia combina SEO local, interfaces imersivas e mídia de precisão para sustentar autoridade, diferenciação e crescimento em setores onde confiança define a decisão comercial.
            </div>
          </div>
        </div>

        <div className="cms_grid">
          <div className="grid_partners">
            {partners.map((partner) => (
              <div key={partner.id} className="partner_item">
                <a
                  href={partner.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="partner_link_external"
                  aria-label={partner.name}
                >
                  <div className="partner_box">
                    <img
                      src={partner.logo}
                      loading="lazy"
                      alt={partner.name}
                      className="partner_logo"
                      style={{ '--partner-logo-width': partner.logoWidth }}
                    />
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuiltForSection;
