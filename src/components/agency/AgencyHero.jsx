import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AgencyLines = ({ mobile = false }) => {
  const suffix = mobile ? '-mobile' : '';
  const viewBox = mobile ? '0 0 393 1177' : '0 0 1920 1690';
  const lineOne = mobile
    ? 'M1055.57 126.82H434.687C427.054 126.82 420.866 133.008 420.866 140.641V192.813C420.866 200.446 414.679 206.634 407.046 206.634H166.224C158.592 206.634 152.404 212.821 152.404 220.454V465.076C152.404 472.709 146.216 478.897 138.584 478.897H31.8205C24.1876 478.897 18 485.084 18 492.717V1176'
    : 'M2117 273H1218.5C1207.45 273 1198.5 281.954 1198.5 293V368.5C1198.5 379.546 1189.55 388.5 1178.5 388.5H830C818.954 388.5 810 397.454 810 408.5V762.5C810 773.546 801.046 782.5 790 782.5H635.5C624.454 782.5 615.5 791.454 615.5 802.5V1690';
  const lineTwo = mobile
    ? 'M1069.39 113H448.507C440.874 113 434.687 119.188 434.687 126.82V178.993C434.687 186.626 428.499 192.813 420.866 192.813H180.045C172.412 192.813 166.224 199.001 166.224 206.634V451.256C166.224 458.889 160.037 465.076 152.404 465.076H45.6408C38.0079 465.076 31.8203 471.264 31.8203 478.897V1177'
    : 'M2137 253H1238.5C1227.45 253 1218.5 261.954 1218.5 273V348.5C1218.5 359.546 1209.55 368.5 1198.5 368.5H850C838.954 368.5 830 377.454 830 388.5V742.5C830 753.546 821.046 762.5 810 762.5H655.5C644.454 762.5 635.5 771.454 635.5 782.5V1690';

  return (
    <svg className={`agency-hero-lines__svg ${mobile ? 'is-mobile' : 'is-desktop'}`} viewBox={viewBox} preserveAspectRatio="xMidYMid meet" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={`agency-line-one${suffix}`} x1="100%" y1="0%" x2="0%" y2="100%">
          <stop stopColor="white" stopOpacity="0" />
          <stop offset=".5" stopColor="white" />
          <stop offset="1" stopColor="white" />
        </linearGradient>
        <linearGradient id={`agency-line-two${suffix}`} x1="100%" y1="0%" x2="0%" y2="100%">
          <stop stopColor="white" stopOpacity="0" />
          <stop offset=".5" stopColor="white" />
          <stop offset=".86" stopColor="white" stopOpacity=".78" />
          <stop offset="1" stopColor="white" />
        </linearGradient>
      </defs>
      <path d={lineOne} stroke={`url(#agency-line-one${suffix})`} strokeOpacity=".35" />
      <path d={lineTwo} stroke={`url(#agency-line-two${suffix})`} strokeOpacity=".15" />
      <path className="agency-hero-pulse agency-hero-pulse--one" d={lineOne} pathLength="1000" stroke="white" strokeWidth="1" strokeLinecap="round" strokeOpacity=".9" />
      <path className="agency-hero-pulse agency-hero-pulse--two" d={lineTwo} pathLength="1000" stroke="white" strokeWidth="1" strokeLinecap="round" strokeOpacity=".55" />
    </svg>
  );
};

const AgencyHero = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const context = gsap.context(() => {
      const content = gsap.utils.toArray('.agency-about-reveal');
      const pulses = gsap.utils.toArray('.agency-hero-pulse');

      gsap.set(pulses, { strokeDasharray: (_, element) => element.classList.contains('agency-hero-pulse--one') ? '90 910' : '70 930' });

      if (reduceMotion) {
        gsap.set(content, { opacity: 1, y: 0 });
        gsap.set(pulses, { strokeDashoffset: 300 });
        return;
      }

      gsap.fromTo(content, { opacity: 0, y: 28 }, {
        opacity: 1,
        y: 0,
        duration: 1.05,
        stagger: .1,
        ease: 'power3.out',
      });

      pulses.forEach((pulse, index) => {
        gsap.fromTo(pulse, { strokeDashoffset: index ? 1040 : 1000 }, {
          strokeDashoffset: index ? 40 : 0,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      });
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section className="agency-about-hero" ref={sectionRef}>
      <style>{`
        .agency-about-hero {
          position: relative;
          width: 100vw;
          height: 88em;
          min-height: 100vh;
          overflow: hidden;
          background: var(--blue);
          color: var(--white);
        }

        .agency-about-hero__wrapper {
          position: relative;
          z-index: 2;
          width: 100%;
          height: 100%;
          padding: 23em 1.75rem 4em;
        }

        .agency-about-hero__top {
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
        }

        .agency-about-hero__title {
          margin: 0;
          font-size: 3.9vw;
          font-weight: 400;
          line-height: .86;
        }

        .agency-about-hero__statement {
          width: 50%;
          margin-left: auto;
        }

        .agency-about-hero__statement p {
          width: 38ch;
          margin: 0;
          font-size: 1.7vw;
          font-weight: 500;
          line-height: 1.1;
        }

        .agency-about-hero__foundation {
          width: 60%;
          margin-top: 19em;
          margin-left: auto;
        }

        .agency-about-hero__foundation-inner {
          display: flex;
          flex-direction: column;
          gap: .5rem;
        }

        .agency-about-hero__foundation h2 {
          width: 33ch;
          margin: 0 0 .5rem;
          font-size: 2vw;
          font-weight: 500;
          line-height: .95;
        }

        .agency-about-hero__foundation p {
          width: 36ch;
          margin: 0;
          font-size: .9vw;
          font-weight: 500;
          line-height: 1.3;
        }

        .agency-hero-lines {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .agency-hero-lines__svg {
          width: 100%;
          height: 100%;
        }

        .agency-hero-lines__svg.is-mobile {
          display: none;
        }

        @media (max-width: 991px) {
          .agency-about-hero__wrapper {
            padding: 17rem 1.25rem 2rem;
          }

          .agency-about-hero__statement {
            width: 40%;
          }

          .agency-about-hero__statement p {
            width: 52ch;
            font-size: 2.2vw;
          }

          .agency-about-hero__foundation {
            width: 54%;
            margin-top: 15rem;
          }

          .agency-about-hero__foundation h2 {
            width: 44ch;
            font-size: 2.8vw;
          }

          .agency-about-hero__foundation p {
            width: 54ch;
            font-size: 1.45vw;
          }

          .agency-hero-lines {
            width: 135%;
            margin-left: -35%;
          }
        }

        @media (max-width: 767px) {
          .agency-about-hero {
            height: 75rem;
            min-height: 75rem;
          }

          .agency-about-hero__wrapper {
            padding: 14rem 1rem 2rem;
          }

          .agency-about-hero__top {
            flex-direction: column;
          }

          .agency-about-hero__title {
            font-size: 8.4vw;
          }

          .agency-about-hero__statement {
            width: 86%;
            margin-top: 25rem;
            margin-left: auto;
          }

          .agency-about-hero__statement p {
            width: 76%;
            font-size: 2.4vw;
            line-height: 1.15;
          }

          .agency-about-hero__foundation {
            width: 86%;
            margin-top: 6rem;
          }

          .agency-about-hero__foundation h2 {
            width: 71ch;
            font-size: 3.6vw;
          }

          .agency-about-hero__foundation p {
            width: 93%;
            font-size: 1.9vw;
          }

          .agency-hero-lines {
            width: 100%;
            height: 115%;
            margin-left: 0;
          }

          .agency-hero-lines__svg.is-desktop {
            display: none;
          }

          .agency-hero-lines__svg.is-mobile {
            display: block;
          }
        }

        @media (max-width: 479px) {
          .agency-about-hero__title {
            font-size: 11vw;
          }

          .agency-about-hero__statement p {
            font-size: 4.3vw;
          }

          .agency-about-hero__foundation h2 {
            font-size: 5.5vw;
          }

          .agency-about-hero__foundation p {
            font-size: 3.7vw;
          }
        }
      `}</style>

      <div className="agency-about-hero__wrapper">
        <div className="agency-about-hero__top">
          <h1 className="agency-about-hero__title agency-about-reveal">Off-Data</h1>
          <div className="agency-about-hero__statement agency-about-reveal">
            <p>Trabalhamos na interseção entre estratégia comercial, design e engenharia digital.</p>
          </div>
        </div>

        <div className="agency-about-hero__foundation">
          <div className="agency-about-hero__foundation-inner">
            <h2 className="agency-about-reveal">O que sustenta<br />a Off-Data</h2>
            <p className="agency-about-reveal">A Off-Data nasce da união entre pensamento estratégico, direção criativa e desenvolvimento de alta performance.</p>
            <p className="agency-about-reveal">Combinamos profundidade técnica com visão comercial para construir presenças digitais estruturadas, relevantes e preparadas para gerar valor real.</p>
          </div>
        </div>
      </div>

      <div className="agency-hero-lines">
        <AgencyLines />
        <AgencyLines mobile />
      </div>
    </section>
  );
};

export default AgencyHero;
