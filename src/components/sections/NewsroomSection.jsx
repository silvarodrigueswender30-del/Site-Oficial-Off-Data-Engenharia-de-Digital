import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import arrowDiagonal from '../../assets/images/arrow-diagonal.svg';

gsap.registerPlugin(ScrollTrigger);

const COLS = 25;
const ROWS = 6;
const REVEAL_RATIO = 0.5;

const articles = [
  {
    category: 'Sites',
    dateShort: '7.13.26',
    dateLong: '7.13.2026',
    dateISO: '2026-07-13',
    title: 'Site para Construtora em Uberlândia',
    image: '/imagens/imagem-estrategia/criacao-de-site-construtora-hero.avif',
    imageWidth: 1600,
    imageHeight: 894,
    alt: 'Engenharia digital para construtoras em Uberlândia — Off-Data',
    url: '/estrategias/criacao-de-site-para-construtora',
  },
  {
    category: 'Sites',
    dateShort: '7.09.26',
    dateLong: '7.09.2026',
    dateISO: '2026-07-09',
    title: 'Site para Imobiliária de Luxo em Uberlândia',
    image: '/imagens/imagem-estrategia/criacao-de-site-imobiliaria-hero.avif',
    imageWidth: 1600,
    imageHeight: 894,
    alt: 'Design imersivo e site de alto padrão para imobiliárias de luxo em Uberlândia',
    url: '/estrategias/criacao-de-site-para-imobiliaria',
  },
  {
    category: 'SEO',
    dateShort: '5.25.26',
    dateLong: '5.25.2026',
    dateISO: '2026-05-25',
    title: 'SEO Local para Imobiliárias de Luxo Premium',
    image: '/imagens/seo-arquitetura.avif',
    imageWidth: 1600,
    imageHeight: 894,
    alt: 'Arquitetura de luxo representando estratégia de SEO local para imobiliárias premium',
    url: '/estrategias/seo-local-imobiliarias-luxo',
  },
  {
    category: 'Clínicas',
    dateShort: '5.10.26',
    dateLong: '5.10.2026',
    dateISO: '2026-05-10',
    title: 'Sites Imersivos para Clínicas Médicas de Alto Padrão em Uberlândia e Região',
    image: '/imagens/seo-clinica.avif',
    imageWidth: 1600,
    imageHeight: 894,
    alt: 'Clínica médica de alto padrão representando sites imersivos e SEO local em Uberlândia',
    url: '/estrategias/sites-imersivos-clinicas-medicas',
  },
  {
    category: 'Mídia',
    dateShort: '4.25.26',
    dateLong: '4.25.2026',
    dateISO: '2026-04-25',
    title: 'Tráfego de Alta Intenção para Operações B2B no Triângulo Mineiro',
    image: '/imagens/trafego-b2b-triangulo-mineiro.avif',
    imageWidth: 1600,
    imageHeight: 894,
    alt: 'Operações logísticas, agroindústria e tráfego B2B conectados no Triângulo Mineiro',
    url: '/estrategias/trafego-alta-intencao-b2b',
  },
  {
    category: 'Web',
    dateShort: '4.21.26',
    dateLong: '4.21.2026',
    dateISO: '2026-04-21',
    title: 'Performance Web para Marcas High-Ticket Regionais Premium',
    image: '/imagens/performance-web-marcas-regionais.avif',
    imageWidth: 1600,
    imageHeight: 894,
    alt: 'Empresas regionais conectadas por experiências digitais e sites de alta performance',
    url: '/estrategias/performance-web-marcas-high-ticket',
  },
  {
    category: 'Autoridade',
    dateShort: '3.18.26',
    dateLong: '3.18.2026',
    dateISO: '2026-03-18',
    title: 'Como SEO Técnico Sustenta Autoridade em Mercados de Confiança',
    image: '/imagens/seo-tecnico-autoridade-digital.avif',
    imageWidth: 1600,
    imageHeight: 894,
    alt: 'Edifício corporativo conectado representando autoridade digital sustentada por SEO técnico',
    url: '/estrategias/seo-tecnico-autoridade-digital',
  },
  {
    category: 'Operações',
    dateShort: '2.18.26',
    dateLong: '2.18.2026',
    dateISO: '2026-02-18',
    url: '/estrategias/automacao-operacoes-comerciais',
    title: 'Arquitetura Digital para Agro, Facilities e Clínicas que Vendem Alto Valor em Uberlândia',
    image: '/imagens/arquitetura-digital-operacoes-uberlandia.avif',
    imageWidth: 1600,
    imageHeight: 894,
    alt: 'Agro, logística e empresas conectadas por arquitetura digital em Uberlândia',
  },
];

const NewsroomSection = () => {
  const pixelTransitionRef = useRef(null);
  const mobileTrackRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const wrap = pixelTransitionRef.current;
    const grid = wrap?.querySelector('.pixel-grid');
    if (!wrap || !grid) return undefined;

    let isActive = true;
    let resizeTimer = null;
    let trigger = null;

    const clamp01 = (value) => Math.min(1, Math.max(0, value));

    const seededRandom = (seed) => {
      let t = seed % 2147483647;
      if (t <= 0) t += 2147483646;
      return () => {
        t = (t * 16807) % 2147483647;
        return (t - 1) / 2147483646;
      };
    };

    const shuffle = (items, rnd) => {
      const shuffled = items.slice();
      for (let i = shuffled.length - 1; i > 0; i -= 1) {
        const j = Math.floor(rnd() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };

    const buildPattern = (rnd) => {
      const pattern = [];
      for (let r = 0; r < ROWS; r += 1) {
        const row = [];
        for (let c = 0; c < COLS; c += 1) {
          let type = null;
          if (r >= ROWS - 2) {
            type = 1;
          } else {
            const appear = r === 0 ? 0.34 : r === 1 ? 0.5 : 0.7;
            if (rnd() < appear) {
              const p = rnd();
              type = p < 0.55 ? 1 : p < 0.82 ? 2 : 3;
            }
          }
          row.push(type);
        }
        pattern.push(row);
      }
      return pattern;
    };

    const pxCount = (progress, length) => {
      if (!length) return 0;
      const p = clamp01(progress);
      if (p >= 0.997) return length;
      return Math.floor(p * length);
    };

    const progressToState = (progress, revealOrder, whiteOrder, state) => {
      const p = clamp01(progress);
      const r = clamp01(REVEAL_RATIO);
      const revealProgress = clamp01(r > 0 ? p / r : p);
      state.revealCount = pxCount(revealProgress, revealOrder.length);

      if (p <= r) {
        state.whiteCount = 0;
        state.solid = false;
        return;
      }

      const whiteProgress = clamp01((p - r) / (1 - r));
      state.whiteCount = pxCount(whiteProgress, whiteOrder.length);
      state.solid = whiteProgress >= 0.997;
    };

    const sizeGrid = (from) => {
      const containerWidth =
        wrap.clientWidth ||
        wrap.parentElement?.clientWidth ||
        Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

      const cell = Math.max(18, Math.ceil(containerWidth / COLS));
      const draw = cell + 2;
      const gridW = draw * COLS;
      const gridH = draw * ROWS;
      const leftPad = Math.max(0, Math.round((containerWidth - gridW) / 2));

      grid.style.gridTemplateColumns = `repeat(${COLS}, ${draw}px)`;
      grid.style.gridTemplateRows = `repeat(${ROWS}, ${draw}px)`;
      grid.style.width = `${gridW}px`;
      grid.style.height = `${gridH}px`;
      grid.style.marginLeft = `${leftPad}px`;
      grid.style.marginRight = '0px';

      wrap.style.setProperty('--px-from', from);
      wrap.style.height = `${gridH}px`;
    };

    const initTransition = () => {
      if (!isActive) return;

      const from = wrap.dataset.from || '#044AB3';
      const to = wrap.dataset.to || '#FFFFFF';
      const accent = wrap.dataset.accent || '#6FE3FF';
      const triggerEl = document.getElementById(wrap.dataset.triggerId || '');
      const targetEl = document.getElementById(wrap.dataset.targetId || '');

      if (!triggerEl || !targetEl) return;

      if (trigger) {
        trigger.kill();
        trigger = null;
      }

      wrap.style.setProperty('--px-solid', to);
      wrap.classList.remove('is-solid');
      grid.innerHTML = '';

      const pattern = buildPattern(seededRandom(102));
      const allPixels = [];
      const activePixels = [];

      for (let r = 0; r < ROWS; r += 1) {
        for (let c = 0; c < COLS; c += 1) {
          const type = pattern[r][c];
          const el = document.createElement('div');
          el.className = 'pixel';

          if (type) {
            el.dataset.base = type === 1 ? to : type === 2 ? from : accent;
            activePixels.push(el);
          } else {
            el.dataset.base = from;
          }

          el.style.backgroundColor = from;
          el.style.boxShadow = `0 0 0 1px ${from}`;
          allPixels.push(el);
          grid.appendChild(el);
        }
      }

      sizeGrid(from);

      const revealOrder = shuffle(activePixels, seededRandom(202));
      const whiteOrder = shuffle(activePixels, seededRandom(302));
      const state = {
        revealCount: 0,
        whiteCount: 0,
        solid: false,
      };

      const render = () => {
        if (state.solid) {
          wrap.classList.add('is-solid');
          return;
        }

        wrap.classList.remove('is-solid');

        const revealSet = new Set(revealOrder.slice(0, state.revealCount));
        const whiteSet = new Set(whiteOrder.slice(0, state.whiteCount));

        allPixels.forEach((el) => {
          const isRevealed = revealSet.has(el);
          const color = isRevealed ? (whiteSet.has(el) ? to : el.dataset.base) : from;
          el.style.backgroundColor = color;
          el.style.boxShadow = `0 0 0 1px ${color}`;
        });
      };

      const setProgress = (progress) => {
        progressToState(progress, revealOrder, whiteOrder, state);
        render();
      };

      trigger = ScrollTrigger.create({
        id: 'px-cutting-edge-light',
        trigger: triggerEl,
        endTrigger: targetEl,
        start: 'bottom bottom',
        end: 'top top',
        scrub: 0.35,
        invalidateOnRefresh: true,
        onRefreshInit: () => sizeGrid(from),
        onRefresh: (self) => {
          sizeGrid(from);
          setProgress(self.progress);
        },
        onUpdate: (self) => setProgress(self.progress),
        onEnter: (self) => setProgress(self.progress),
        onLeave: () => setProgress(1),
        onEnterBack: (self) => {
          wrap.classList.remove('is-solid');
          setProgress(self.progress);
        },
        onLeaveBack: () => {
          wrap.classList.remove('is-solid');
          setProgress(0);
        },
      });

      requestAnimationFrame(() => setProgress(trigger.progress));
      ScrollTrigger.refresh();
    };

    const scheduleInit = () => {
      if (!isActive) return;
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (!isActive) return;
        requestAnimationFrame(initTransition);
      }, 180);
    };

    initTransition();
    window.addEventListener('resize', scheduleInit, { passive: true });
    window.addEventListener('load', scheduleInit, { passive: true });

    return () => {
      isActive = false;
      clearTimeout(resizeTimer);
      if (trigger) trigger.kill();
      window.removeEventListener('resize', scheduleInit);
      window.removeEventListener('load', scheduleInit);
    };
  }, []);

  useEffect(() => {
    const track = mobileTrackRef.current;
    if (!track) return undefined;

    let resetTimer = null;

    const resetMobileTrack = () => {
      window.clearTimeout(resetTimer);
      resetTimer = window.setTimeout(() => {
        track.scrollLeft = 0;
        setActiveSlide(0);
      }, 80);
    };

    resetMobileTrack();
    window.addEventListener('resize', resetMobileTrack, { passive: true });
    window.addEventListener('orientationchange', resetMobileTrack, { passive: true });

    return () => {
      window.clearTimeout(resetTimer);
      window.removeEventListener('resize', resetMobileTrack);
      window.removeEventListener('orientationchange', resetMobileTrack);
    };
  }, []);

  const updateMobileSlide = () => {
    const track = mobileTrackRef.current;
    if (!track) return;

    const slides = Array.from(track.querySelectorAll('.splide__slide.newsroom_carousel'));
    if (!slides.length) return;

    const closest = slides.reduce(
      (best, slide, index) => {
        const distance = Math.abs(slide.offsetLeft - track.scrollLeft);
        return distance < best.distance ? { distance, index } : best;
      },
      { distance: Number.POSITIVE_INFINITY, index: 0 }
    );

    setActiveSlide(closest.index);
  };

  const scrollMobileNews = (direction) => {
    const track = mobileTrackRef.current;
    if (!track) return;

    const slides = Array.from(track.querySelectorAll('.splide__slide.newsroom_carousel'));
    if (!slides.length) return;

    const nextIndex = (activeSlide + direction + slides.length) % slides.length;

    track.scrollTo({
      left: slides[nextIndex].offsetLeft,
      behavior: 'smooth',
    });
    setActiveSlide(nextIndex);
  };

  const goToMobileSlide = (index) => {
    const track = mobileTrackRef.current;
    const slide = track?.querySelectorAll('.splide__slide.newsroom_carousel')?.[index];
    if (!track || !slide) return;

    track.scrollTo({
      left: slide.offsetLeft,
      behavior: 'smooth',
    });
    setActiveSlide(index);
  };

  const renderArticleCard = (article, index, mobile = false) => (
    <article
      key={`${mobile ? 'mobile' : 'desktop'}-${article.title}`}
      role={mobile ? "group" : undefined}
      className={mobile ? 'splide__slide newsroom_carousel w-dyn-item' : 'article_item w-dyn-item'}
      aria-label={mobile ? `${index + 1} of ${articles.length}` : undefined}
      aria-labelledby={mobile ? `mobile-strategy-title-${index}` : undefined}
    >
      <a href={article.url} className="article_link w-inline-block">
        <div className="image_article">
          <img
            src={article.image}
            width={article.imageWidth}
            height={article.imageHeight}
            loading="lazy"
            decoding="async"
            alt={article.alt}
            className="image"
          />
        </div>
        <div className="content_article">
          <div className="tags_higlight">
            <div className="news_tag">{article.category}</div>
            <div className="dot_separator" />
            <time className="news_date" dateTime={article.dateISO}>
              {mobile ? article.dateLong : article.dateShort}
            </time>
          </div>
          <h3 id={`${mobile ? 'mobile' : 'desktop'}-strategy-title-${index}`} className="article_title">
            {article.title}
          </h3>
        </div>
      </a>
    </article>
  );

  return (
    <div id="light--theme" data-section="light" className="light--theme">
      <style>{`
        .light--theme {
          position: relative;
          background: var(--white);
          color: var(--blue);
        }

        .light--theme .transition_cubes {
          z-index: 15;
          margin-top: 21em;
          position: relative;
        }

        .light--theme .transition_cubes::after {
          content: '';
          position: absolute;
          z-index: 3;
          left: 0;
          right: 0;
          bottom: -1px;
          height: 3px;
          background: var(--white);
          pointer-events: none;
        }

        .light--theme .pixel-transition {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 2;
          pointer-events: none;
          overflow: hidden;
          background: var(--px-from, #044ab3);
        }

        .light--theme .pixel-grid {
          position: relative;
          display: grid;
          justify-content: start;
          margin: 0;
          gap: 0 !important;
          line-height: 0;
          font-size: 0;
          transform: none !important;
        }

        .light--theme .pixel {
          display: block;
          margin: 0;
          position: relative;
          box-sizing: border-box;
          transform: none;
          backface-visibility: hidden;
          border: none !important;
          outline: none !important;
          box-shadow: none !important;
          background-clip: padding-box;
        }

        .light--theme .pixel-transition.is-solid,
        .light--theme .pixel-transition.is-solid .pixel-grid {
          background: var(--px-solid, #ffffff) !important;
        }

        .light--theme .pixel-transition.is-solid .pixel {
          background: var(--px-solid, #ffffff) !important;
          box-shadow: 0 0 0 1px var(--px-solid, #ffffff) !important;
        }

        .newsroom {
          background: var(--white);
          margin-top: 0;
          min-height: 38rem;
          overflow: hidden;
        }

        .newsroom .wrapper_general.newsroom_f {
          padding: 7em 1.75rem 8em;
        }

        .newsroom .h2.blue {
          color: var(--blue);
          width: 15ch;
          font-size: 4.5em;
          font-weight: 500;
          line-height: .9;
          margin: 0;
        }

        .newsroom .cms_newsroom {
          margin-top: 2em;
        }

        .newsroom .cms_newsroom.mobile_ver {
          display: none;
        }

        .newsroom .articles_grid.general_home {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1em;
        }

        .newsroom .article_item,
        .newsroom .article_link {
          width: 100%;
          height: 100%;
        }

        .newsroom .article_item {
          border-radius: .25em;
          overflow: hidden;
        }

        .newsroom .article_link {
          display: block;
          padding: 1em 1em 1.45em;
          background-color: rgba(4, 74, 179, .08);
          color: var(--blue);
          text-decoration: none;
          transition: background-color .45s ease;
        }

        .newsroom .article_link:hover {
          background-color: rgba(4, 74, 179, .15);
        }

        .newsroom .image_article {
          width: 100%;
          height: 23em;
          border-radius: .25em;
          overflow: hidden;
          background: rgba(4, 74, 179, .08);
        }

        .newsroom .image {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .newsroom .content_article {
          margin-top: .875em;
        }

        .newsroom .tags_higlight {
          display: flex;
          align-items: center;
          gap: .25em;
          margin-bottom: .75em;
        }

        .newsroom .news_tag {
          color: var(--blue);
          background-color: rgba(4, 74, 179, .1);
          border-radius: .1875em;
          padding: .63em .7em .6em;
          font-size: .78em;
          font-weight: 500;
          line-height: 1;
          text-transform: none;
        }

        .newsroom .dot_separator {
          width: .25em;
          height: .25em;
          border-radius: 50%;
          background: var(--blue);
          opacity: .45;
        }

        .newsroom .news_date {
          color: var(--blue);
          font-size: .78em;
          font-weight: 500;
          line-height: 1;
          opacity: .75;
        }

        .newsroom .article_title {
          color: var(--blue);
          margin: 0;
          font-size: 1.4em;
          font-weight: 500;
          line-height: 1.3;
          letter-spacing: 0;
        }

        .newsroom .splide__arrows,
        .newsroom .splide__pagination {
          display: none;
        }

        .newsroom .slider1 {
          position: relative;
        }

        .newsroom .arrow_button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 2.6rem;
          height: 2.6rem;
          border: 0;
          border-radius: .1875rem;
          background: rgba(4, 74, 179, .08);
          color: var(--blue);
          cursor: pointer;
        }

        .newsroom .arrow_button:disabled {
          opacity: .35;
          cursor: default;
        }

        .newsroom .arrow_button.next img {
          transform: rotate(0deg);
        }

        .newsroom .arrow_button.prev img {
          transform: rotate(180deg);
        }

        .newsroom .arrow_button img {
          width: 1.05rem;
          height: 1.05rem;
          object-fit: contain;
        }

        @media (max-width: 767px) {
          .light--theme .transition_cubes {
            margin-top: calc(24vw + 12px);
          }

          .newsroom {
            min-height: 0;
          }

          .newsroom .wrapper_general.newsroom_f {
            padding: 3.35rem 0 4.75rem 1rem;
          }

          .newsroom .h2.blue {
            width: 100%;
            max-width: 8.2ch;
            font-size: clamp(3.25rem, 14.5vw, 4.85rem);
            line-height: .92;
          }

          .newsroom .cms_newsroom.desktop_ver {
            display: none;
          }

          .newsroom .cms_newsroom.mobile_ver {
            display: block;
            margin-top: 3em;
          }

          .newsroom .container.newsroom_carousel {
            width: 100vw;
            overflow: visible;
            padding: .1rem 0;
          }

          .newsroom .slider1 {
            padding-bottom: 4.7rem;
          }

          .newsroom .splide__track {
            width: 100%;
            overflow-x: auto;
            overflow-y: hidden;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }

          .newsroom .splide__track::-webkit-scrollbar {
            display: none;
          }

          .newsroom .splide__list {
            display: flex;
            gap: 1rem;
            width: max-content;
            padding-right: 1rem;
          }

          .newsroom .splide__slide.newsroom_carousel {
            flex: 0 0 auto;
            width: min(19rem, calc(100vw - 2rem));
            scroll-snap-align: start;
          }

          .newsroom .article_link {
            padding: .85rem .85rem 1rem;
          }

          .newsroom .image_article {
            height: clamp(13.5rem, 58vw, 22rem);
          }

          .newsroom .content_article {
            margin-top: .8rem;
          }

          .newsroom .news_tag,
          .newsroom .news_date {
            font-size: .68rem;
          }

          .newsroom .article_title {
            font-size: clamp(1.25rem, 5vw, 1.95rem);
            line-height: 1.12;
          }

          .newsroom .splide__arrows {
            display: flex;
            justify-content: flex-end;
            align-items: stretch;
            gap: .75rem;
            margin: 0;
            padding-right: 0;
            position: absolute;
            right: 1.85rem;
            bottom: 0;
          }

          .newsroom .splide__pagination {
            display: flex;
            gap: 1.5rem;
            margin: 0;
            padding: 0;
            list-style: none;
            position: absolute;
            left: 0;
            bottom: 1.07rem;
          }

          .newsroom .splide__pagination li {
            display: inline-flex;
            align-items: center;
            justify-content: center;
          }

          .newsroom .splide__pagination__page {
            width: .42rem;
            height: .42rem;
            border: 0;
            border-radius: 50%;
            padding: 0;
            background: rgba(4, 74, 179, .3);
            position: relative;
            cursor: pointer;
          }

          .newsroom .splide__pagination__page::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 40px;
            height: 40px;
          }

          .newsroom .splide__pagination__page.is-active {
            background: var(--blue);
          }
        }

        @media (min-width: 768px) and (max-width: 991px) {
          .newsroom .wrapper_general.newsroom_f {
            padding: 6em 1.5rem 7em;
          }

          .newsroom .h2.blue {
            font-size: 4.1em;
          }

          .newsroom .articles_grid.general_home {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .newsroom .image_article {
            height: 21rem;
          }
        }
      `}</style>

      <div className="transition_cubes">
        <div className="w-embed">
          <div
            ref={pixelTransitionRef}
            className="pixel-transition"
            data-from="#044AB3"
            data-to="#FFFFFF"
            data-accent="#6FE3FF"
            data-trigger-id="cutting-edge"
            data-target-id="light--theme"
          >
            <div className="pixel-grid" />
          </div>
        </div>
      </div>

      <section className="newsroom" aria-labelledby="strategies-title">
        <div className="wrapper_general newsroom_f">
          <div className="hewsroom_heading">
            <h2 id="strategies-title" className="h2 blue">Estratégias</h2>
          </div>
          <div className="cms_newsroom desktop_ver">
            <div className="w-dyn-list">
              <div fs-list-element="list" className="articles_grid general_home w-dyn-items">
                {articles.map((article, index) => renderArticleCard(article, index))}
              </div>
            </div>
          </div>
          <div className="cms_newsroom mobile_ver">
            <div className="container newsroom_carousel">
              <div className="splide slider1">
                <div className="splide__track w-dyn-list" ref={mobileTrackRef} onScroll={updateMobileSlide}>
                  <div className="splide__list w-dyn-items">
                    {articles.map((article, index) => renderArticleCard(article, index, true))}
                  </div>
                </div>
                <ul className="splide__pagination">
                  {articles.map((article, index) => (
                    <li key={`dot-${article.title}`}>
                      <button
                        type="button"
                        className={`splide__pagination__page${activeSlide === index ? ' is-active' : ''}`}
                        aria-label={`Go to slide ${index + 1}`}
                        aria-current={activeSlide === index}
                        onClick={() => goToMobileSlide(index)}
                      />
                    </li>
                  ))}
                </ul>
                <div className="splide__arrows">
                  <button
                    type="button"
                    className="arrow_button prev"
                    aria-label="Previous slide"
                    onClick={() => scrollMobileNews(-1)}
                  >
                    <img src={arrowDiagonal} alt="" aria-hidden="true" width="14" height="14" decoding="async" loading="lazy" />
                  </button>
                  <button
                    type="button"
                    className="arrow_button next"
                    aria-label="Next slide"
                    onClick={() => scrollMobileNews(1)}
                  >
                    <img src={arrowDiagonal} alt="" aria-hidden="true" width="14" height="14" decoding="async" loading="lazy" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsroomSection;
