import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import arrowBlue from '../../assets/images/arrow-blue.svg';
import { getWhatsAppLinkProps, WHATSAPP_MESSAGES } from '../../constants/contact';

gsap.registerPlugin(ScrollTrigger);

const CtaLines = () => (
  <svg
    className="cta-lines-svg"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1920 1190"
    fill="none"
    preserveAspectRatio="xMidYMid meet"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="ctaPaint0" x1="3.06343" y1="883" x2="1922" y2="883.001" gradientUnits="userSpaceOnUse">
        <stop stopColor="#044AB3" stopOpacity="0" />
        <stop offset="0.5" stopColor="#044AB3" />
        <stop offset="1" stopColor="#044AB3" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="ctaPaint1" x1="-16.9366" y1="903" x2="1902" y2="903.001" gradientUnits="userSpaceOnUse">
        <stop stopColor="#044AB3" stopOpacity="0" />
        <stop offset="0.5" stopColor="#044AB3" />
        <stop offset="1" stopColor="#044AB3" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="ctaPaint2" x1="1917" y1="563.863" x2="4.49983" y2="563.862" gradientUnits="userSpaceOnUse">
        <stop stopColor="#044AB3" stopOpacity="0" />
        <stop offset="0.5" stopColor="#044AB3" />
        <stop offset="1" stopColor="#044AB3" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="ctaPaint3" x1="1937" y1="583.863" x2="24.4998" y2="583.862" gradientUnits="userSpaceOnUse">
        <stop stopColor="#044AB3" stopOpacity="0" />
        <stop offset="0.5" stopColor="#044AB3" />
        <stop offset="1" stopColor="#044AB3" stopOpacity="0" />
      </linearGradient>
      <clipPath id="ctaClip">
        <rect width="1920" height="1190" />
      </clipPath>
    </defs>

    <g className="cta-base-group" clipPath="url(#ctaClip)">
      <path className="cta-base" d="M2174.5 1146.5H1530.5C1519.45 1146.5 1510.5 1137.55 1510.5 1126.5V996C1510.5 984.954 1501.55 976 1490.5 976H1224.5C1213.45 976 1204.5 967.046 1204.5 956V741C1204.5 729.954 1195.55 721 1184.5 721H721C709.954 721 701 729.954 701 741V839C701 850.046 692.046 859 681 859H430C418.954 859 410 850.046 410 839V534C410 522.954 401.046 514 390 514H-98" stroke="url(#ctaPaint0)" strokeWidth="1" />
      <path className="cta-base" d="M2154.5 1166.5H1510.5C1499.45 1166.5 1490.5 1157.55 1490.5 1146.5V1016C1490.5 1004.95 1481.55 996 1470.5 996H1204.5C1193.45 996 1184.5 987.046 1184.5 976V761C1184.5 749.954 1175.55 741 1164.5 741H701C689.954 741 681 749.954 681 761V859C681 870.046 672.046 879 661 879H410C398.954 879 390 870.046 390 859V554C390 542.954 381.046 534 370 534H-118" stroke="url(#ctaPaint1)" strokeOpacity="0.35" strokeWidth="1" />
      <path className="cta-base" d="M-398 216H246C257.046 216 266 224.954 266 236V406.5C266 417.546 274.954 426.5 286 426.5H547C558.046 426.5 567 435.454 567 446.5V661.5C567 672.546 575.954 681.5 587 681.5H1185.5C1196.55 681.5 1205.5 672.546 1205.5 661.5V563.5C1205.5 552.454 1214.45 543.5 1225.5 543.5H1490.5C1501.55 543.5 1510.5 552.454 1510.5 563.5V868.5C1510.5 879.546 1519.45 888.5 1530.5 888.5H2254.5" stroke="url(#ctaPaint2)" strokeWidth="1" />
      <path className="cta-base" d="M-378 236H266C277.046 236 286 244.954 286 256V426.5C286 437.546 294.954 446.5 306 446.5H567C578.046 446.5 587 455.454 587 466.5V681.5C587 692.546 595.954 701.5 607 701.5H1205.5C1216.55 701.5 1225.5 692.546 1225.5 681.5V583.5C1225.5 572.454 1234.45 563.5 1245.5 563.5H1510.5C1521.55 563.5 1530.5 572.454 1530.5 583.5V888.5C1530.5 899.546 1539.45 908.5 1550.5 908.5H2274.5" stroke="url(#ctaPaint3)" strokeOpacity="0.35" strokeWidth="1" />
    </g>

    <g className="cta-pulse-group" clipPath="url(#ctaClip)">
      <path className="cta-pulse-path" d="M2174.5 1146.5H1530.5C1519.45 1146.5 1510.5 1137.55 1510.5 1126.5V996C1510.5 984.954 1501.55 976 1490.5 976H1224.5C1213.45 976 1204.5 967.046 1204.5 956V741C1204.5 729.954 1195.55 721 1184.5 721H721C709.954 721 701 729.954 701 741V839C701 850.046 692.046 859 681 859H430C418.954 859 410 850.046 410 839V534C410 522.954 401.046 514 390 514H-98" stroke="#044AB3" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0" />
      <path className="cta-pulse-path" d="M2154.5 1166.5H1510.5C1499.45 1166.5 1490.5 1157.55 1490.5 1146.5V1016C1490.5 1004.95 1481.55 996 1470.5 996H1204.5C1193.45 996 1184.5 987.046 1184.5 976V761C1184.5 749.954 1175.55 741 1164.5 741H701C689.954 741 681 749.954 681 761V859C681 870.046 672.046 879 661 879H410C398.954 879 390 870.046 390 859V554C390 542.954 381.046 534 370 534H-118" stroke="#044AB3" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0" strokeOpacity="0.9" />
      <path className="cta-pulse-path" d="M-398 216H246C257.046 216 266 224.954 266 236V406.5C266 417.546 274.954 426.5 286 426.5H547C558.046 426.5 567 435.454 567 446.5V661.5C567 672.546 575.954 681.5 587 681.5H1185.5C1196.55 681.5 1205.5 672.546 1205.5 661.5V563.5C1205.5 552.454 1214.45 543.5 1225.5 543.5H1490.5C1501.55 543.5 1510.5 552.454 1510.5 563.5V868.5C1510.5 879.546 1519.45 888.5 1530.5 888.5H2254.5" stroke="#044AB3" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0" />
      <path className="cta-pulse-path" d="M-378 236H266C277.046 236 286 244.954 286 256V426.5C286 437.546 294.954 446.5 306 446.5H567C578.046 446.5 587 455.454 587 466.5V681.5C587 692.546 595.954 701.5 607 701.5H1205.5C1216.55 701.5 1225.5 692.546 1225.5 681.5V583.5C1225.5 572.454 1234.45 563.5 1245.5 563.5H1510.5C1521.55 563.5 1530.5 572.454 1530.5 583.5V888.5C1530.5 899.546 1539.45 908.5 1550.5 908.5H2274.5" stroke="#044AB3" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0" strokeOpacity="0.9" />
    </g>

    <g className="cta-captions-svg" pointerEvents="none" fill="#044AB3" fontFamily="Fragment Mono, ui-monospace, SFMono-Regular, Menlo, monospace" fontWeight="400">
      <text className="cta-cap cta-cap--1" opacity="0" letterSpacing="0.08em" x="216" y="578">SEO LOCAL</text>
      <text className="cta-cap cta-cap--2" opacity="0" letterSpacing="0.08em" x="465" y="486">WEB</text>
      <text className="cta-cap cta-cap--3" opacity="0" letterSpacing="0.08em" textAnchor="middle" x="1436" y="598">MÍDIA</text>
      <text className="cta-cap cta-cap--4" opacity="0" letterSpacing="0.08em" textAnchor="middle" x="1346" y="948">CONVERSÃO</text>
    </g>
  </svg>
);

const CtaBoxSection = ({ whatsappMessage = WHATSAPP_MESSAGES.generic } = {}) => {
  const sectionRef = useRef(null);
  const whatsappLinkProps = getWhatsAppLinkProps(whatsappMessage);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root || root.dataset.ctaLinesInit === 'true') return undefined;
    root.dataset.ctaLinesInit = 'true';

    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const mobileNoDraw = window.matchMedia?.('(max-width: 767px)').matches;
    const basePaths = gsap.utils.toArray(root.querySelectorAll('.cta-base'));
    const pulsePaths = gsap.utils.toArray(root.querySelectorAll('.cta-pulse-path'));
    const captions = gsap.utils.toArray(root.querySelectorAll('.cta-cap'));
    const tweens = [];
    let started = false;

    const pathLen = (path) => {
      try {
        return path.getTotalLength();
      } catch (error) {
        return 0;
      }
    };

    const startPulseLoops = () => {
      pulsePaths.forEach((path, index) => {
        const len = pathLen(path);
        if (!len) return;
        const seg = Math.max(48, len * 0.045);
        path.style.strokeDasharray = `${seg} ${len}`;
        path.style.strokeDashoffset = '0';
        gsap.set(path, { opacity: 1 });
        tweens.push(
          gsap.to(path, {
            strokeDashoffset: -(len + seg),
            duration: 3.4 + index * 0.15,
            ease: 'none',
            repeat: -1,
          })
        );
      });
    };

    const showCaptions = () => {
      tweens.push(
        gsap.to(captions, {
          opacity: 1,
          duration: 0.55,
          stagger: 0.1,
          ease: 'power2.out',
        })
      );
    };

    const drawLines = () => {
      if (reduceMotion || mobileNoDraw) {
        basePaths.forEach((path) => {
          gsap.set(path, { clearProps: 'strokeDasharray,strokeDashoffset' });
        });
        showCaptions();
        startPulseLoops();
        return;
      }

      basePaths.forEach((path) => {
        const len = pathLen(path);
        if (!len) return;
        path.style.strokeDasharray = String(len);
        path.style.strokeDashoffset = String(len);
      });

      const tl = gsap.timeline({
        onComplete: () => {
          basePaths.forEach((path) => {
            path.style.strokeDasharray = '';
            path.style.strokeDashoffset = '';
          });
          showCaptions();
          startPulseLoops();
        },
      });

      basePaths.forEach((path, index) => {
        const len = pathLen(path);
        if (!len) return;
        tl.to(path, { strokeDashoffset: 0, duration: 2.75, ease: 'power2.inOut' }, index * 0.18);
      });
      tweens.push(tl);
    };

    const runOnce = () => {
      if (started) return;
      started = true;
      drawLines();
    };

    const isPastStart = () => {
      const rect = root.getBoundingClientRect();
      return rect.top < window.innerHeight * 0.85;
    };

    const trigger = ScrollTrigger.create({
      trigger: root,
      start: 'top 85%',
      once: true,
      onEnter: runOnce,
    });

    if (isPastStart()) {
      runOnce();
    }

    ScrollTrigger.refresh();

    return () => {
      trigger.kill();
      tweens.forEach((tween) => tween.kill());
      delete root.dataset.ctaLinesInit;
    };
  }, []);

  return (
    <section id="cta-section" data-section="light" className="cta_box" ref={sectionRef}>
      <style>{`
        .cta_box {
          position: relative;
          width: 100vw;
          min-height: 125vh;
          overflow: hidden;
          background: var(--white);
          color: var(--blue);
        }

        .cta_box .wrapper_cta {
          position: relative;
          z-index: 3;
          display: flex;
          flex-direction: column;
          height: 100%;
          min-height: 125vh;
          padding: 6.5em 1.75rem 4em;
        }

        .cta_box .flex_cta {
          display: flex;
          width: 100%;
        }

        .cta_box .tagline.blue {
          color: var(--blue);
          position: relative;
          z-index: 4;
        }

        .cta_box .tag_txt {
          display: flex;
          align-items: center;
          gap: .65rem;
          font-family: var(--font-mono);
          font-size: .62rem;
          line-height: 1;
          letter-spacing: .08em;
          text-transform: uppercase;
        }

        .cta_box .cube_tag.blue {
          width: .38rem;
          height: .38rem;
          background: var(--blue);
          border-radius: 1px;
          animation: ctaCubeTagFlickerSmooth 1.2s ease-in-out infinite;
          will-change: opacity, filter;
        }

        .cta_box .heading_cta {
          display: flex;
          flex-direction: column;
          gap: 1.25em;
          width: 50%;
          margin-left: auto;
        }

        .cta_box .h2.blue {
          color: var(--blue);
          margin: 0;
          width: 15ch;
          font-size: clamp(3.75rem, 4.5vw, 4.9rem);
          font-weight: 500;
          line-height: .9;
          letter-spacing: 0;
        }

        .cta_box .button_wrap {
          width: fit-content;
        }

        .cta_box .button.blue {
          display: block;
          color: var(--white);
          background: var(--blue);
          border-radius: .2em;
          text-decoration: none;
          padding: .25em .25em .25em 1em;
        }

        .cta_box .flex_button_general {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 4.5em;
          min-width: 12.7em;
          font-weight: 500;
          line-height: 1;
        }

        .cta_box .arrow_button.white {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.375em;
          height: 2.375em;
          border-radius: .1875em;
          background: var(--white);
          position: relative;
          overflow: hidden;
        }

        .cta_box .arrow_button.white img {
          width: 1.05em;
          height: 1.05em;
          transition: transform .45s cubic-bezier(.22, 1, .36, 1), opacity .28s ease;
        }

        .cta_box .arrow_button.white::after {
          content: "";
          position: absolute;
          width: 1.05em;
          height: 1.05em;
          background: url('${arrowBlue}') center / contain no-repeat;
          transform: translate(-145%, 145%);
          opacity: 0;
          transition: transform .45s cubic-bezier(.22, 1, .36, 1), opacity .28s ease;
        }

        .cta_box .button.blue:hover .arrow_button.white img,
        .cta_box .button.blue:focus-visible .arrow_button.white img {
          transform: translate(145%, -145%);
          opacity: 0;
        }

        .cta_box .button.blue:hover .arrow_button.white::after,
        .cta_box .button.blue:focus-visible .arrow_button.white::after {
          transform: translate(0, 0);
          opacity: 1;
        }

        .cta_box .cta-lines {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          min-width: 0;
        }

        .cta_box .cta-lines-svg {
          position: absolute;
          left: 0;
          top: 0;
          display: block;
          width: 100%;
          max-width: 100%;
          height: auto;
        }

        .cta_box .cta-cap {
          font-family: var(--font-mono);
          font-size: 13px;
          line-height: 1;
          letter-spacing: .08em;
          text-transform: uppercase;
          fill: var(--blue);
          paint-order: stroke fill;
        }

        .cta_box .paragraph_last {
          position: relative;
          z-index: 4;
          width: 34ch;
          margin-top: auto;
        }

        .cta_box .p_gen.blue {
          color: var(--blue);
          margin: 0;
          font-size: 1em;
          font-weight: 500;
          line-height: 1.2;
        }

        @keyframes ctaCubeTagFlickerSmooth {
          0%, 100% {
            opacity: 1;
            filter: brightness(1);
          }
          25% {
            opacity: .52;
            filter: brightness(1.08);
          }
          50% {
            opacity: .25;
            filter: brightness(1.16);
          }
          75% {
            opacity: .9;
            filter: brightness(1.06);
          }
        }

        @media (max-width: 991px) {
          .cta_box {
            min-height: 90vh;
          }

          .cta_box .wrapper_cta {
            min-height: 90vh;
            padding: 8em 1.25rem 3.5em;
          }

          .cta_box .heading_cta {
            width: 55%;
            gap: 2.7em;
          }

          .cta_box .cta-lines-svg {
            width: 160%;
            max-width: none;
          }

          .cta_box .paragraph_last {
            width: 54ch;
          }
        }

        @media (max-width: 767px) {
          .cta_box {
            min-height: 85vh;
          }

          .cta_box .wrapper_cta {
            min-height: 85vh;
            padding: 4.7rem 1rem 3rem;
          }

          .cta_box .flex_cta {
            display: block;
          }

          .cta_box .tag_txt {
            font-size: .72rem;
            gap: .55rem;
          }

          .cta_box .cube_tag.blue {
            width: .45rem;
            height: .45rem;
          }

          .cta_box .heading_cta {
            width: min(100%, 25rem);
            margin-left: 0;
            gap: 1.7rem;
            margin-top: 1.65rem;
          }

          .cta_box .h2.blue {
            width: auto;
            font-size: clamp(3.15rem, 14vw, 5rem);
            line-height: .94;
            max-width: 8.6ch;
          }

          .cta_box .button_wrap {
            width: min(100%, 34rem);
          }

          .cta_box .button.blue {
            padding: .25rem;
          }

          .cta_box .flex_button_general {
            min-width: 0;
            width: 100%;
            min-height: 3.4rem;
            justify-content: space-between;
            gap: 1rem;
            padding-left: 1rem;
            font-size: .9rem;
          }

          .cta_box .arrow_button.white {
            width: 2.9rem;
            height: 2.9rem;
          }

          .cta_box .cta-lines {
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .cta_box .cta-lines-svg {
            position: relative;
            left: auto;
            top: auto;
            width: 100%;
            max-width: none;
            transform: scale(2);
            transform-origin: center center;
          }

          .cta_box .cta-cap--1,
          .cta_box .cta-cap--2,
          .cta_box .cta-cap--3,
          .cta_box .cta-cap--4 {
            display: none;
          }

          .cta_box .paragraph_last {
            width: 100%;
            max-width: 26rem;
            margin-top: auto;
          }

          .cta_box .p_gen.blue {
            font-size: .95rem;
            line-height: 1.22;
          }
        }

        @media (max-width: 479px) {
          .cta_box {
            min-height: 90vh;
          }

          .cta_box .wrapper_cta {
            min-height: 90vh;
            padding: 4.35rem 16px 2.75rem;
          }

          .cta_box .h2.blue {
            font-size: clamp(3rem, 15vw, 4.45rem);
          }

          .cta_box .button_wrap {
            width: 100%;
            max-width: 34rem;
          }

          .cta_box .cta-lines-svg {
            transform: scale(2.5);
          }
        }
      `}</style>

      <div className="wrapper_cta">
        <div className="flex_cta">
          <div className="tagline blue">
            <div className="tag_txt">
              <div className="cube_tag blue" />
              <div>vamos construir</div>
            </div>
          </div>
          <div className="heading_cta">
            <h2 className="h2 blue">Comece sua presença digital premium</h2>
            <div className="button_wrap">
              <a {...whatsappLinkProps} className="button blue w-inline-block">
                <div className="flex_button_general">
                  <div>Entre em contato</div>
                  <div className="arrow_button white">
                    <img src={arrowBlue} alt="" aria-hidden="true" width="16" height="16" decoding="async" loading="lazy" />
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="cta-lines">
          <CtaLines />
        </div>

        <div className="paragraph_last">
          <p className="p_gen blue">
            A Off-Data cria infraestrutura digital para empresas high-ticket em Uberlândia e no Triângulo Mineiro.
            Unimos estratégia, tecnologia e performance para transformar presença online em oportunidades qualificadas.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CtaBoxSection;
