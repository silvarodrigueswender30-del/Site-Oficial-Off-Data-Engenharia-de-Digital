import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import arrowDiagonal from '../../assets/images/arrow-diagonal.svg';
import arrowBlue from '../../assets/images/arrow-blue.svg';

const COLS = 25;
const ROWS = 6;
const REVEAL_RATIO = 0.5;

const ProductsSection = () => {
  const sectionRef = useRef(null);
  const pixelTransitionRef = useRef(null);
  const mobileCarouselRef = useRef(null);
  const [activeMobileSlide, setActiveMobileSlide] = useState(0);

  // Pixel transition synced with scroll, matching the original Webflow embed.
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const wrap = pixelTransitionRef.current;
    const grid = wrap?.querySelector(".pixel-grid");
    if (!wrap || !grid) return;

    let isActive = true;
    let resizeTimer;
    let st = null;

    const seededRandom = (seed) => {
      let t = seed % 2147483647;
      if (t <= 0) t += 2147483646;
      return () => {
        t = (t * 16807) % 2147483647;
        return (t - 1) / 2147483646;
      };
    };

    const shuffle = (arr, rnd) => {
      const a = arr.slice();
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(rnd() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    };

    const buildPattern = (rnd) => {
      const pattern = [];
      for (let r = 0; r < ROWS; r++) {
        const row = [];
        for (let c = 0; c < COLS; c++) {
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

    const clamp01 = (v) => Math.min(1, Math.max(0, v));

    const pxCount = (progress, len) => {
      if (!len) return 0;
      const p = clamp01(progress);
      if (p >= 0.997) return len;
      return Math.floor(p * len);
    };

    const progressToState = (pRaw, revealOrder, blackOrder, state) => {
      const p = clamp01(pRaw);
      const r = clamp01(REVEAL_RATIO);
      const pr = clamp01(r > 0 ? p / r : p);

      state.revealCount = pxCount(pr, revealOrder.length);

      if (p <= r) {
        state.blackCount = 0;
        state.solid = false;
        return;
      }

      const pb = clamp01((p - r) / (1 - r));
      state.blackCount = pxCount(pb, blackOrder.length);
      state.solid = pb >= 0.997;
    };

    const getViewportWidth = () => Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

    const sizeGrid = (from) => {
      const containerWidth =
        wrap.clientWidth ||
        wrap.parentElement?.clientWidth ||
        getViewportWidth();

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
      grid.style.marginRight = "0px";

      wrap.style.setProperty("--px-from", from);
      wrap.style.height = `${gridH}px`;
    };

    const initTransition = () => {
      if (!isActive) return;

      const from = wrap.dataset.from || "#044AB3";
      const to = wrap.dataset.to || "#FFFFFF";
      const accent = wrap.dataset.accent || "#6FE3FF";
      const triggerEl = document.getElementById(wrap.dataset.triggerId || "");
      const targetEl = document.getElementById(wrap.dataset.targetId || "") || sectionRef.current;

      if (!triggerEl || !targetEl) return;

      if (st) {
        st.kill();
        st = null;
      }

      wrap.style.setProperty("--px-solid", to);
      wrap.classList.remove("is-solid");
      grid.innerHTML = "";

      const rnd = seededRandom(100);
      const pattern = buildPattern(rnd);
      const allPixels = [];
      const active = [];

      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const type = pattern[r][c];
          const el = document.createElement("div");
          el.className = "pixel";

          if (type) {
            el.dataset.base = type === 1 ? to : type === 2 ? from : accent;
            active.push(el);
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

      const revealOrder = shuffle(active, seededRandom(200));
      const blackOrder = shuffle(active, seededRandom(300));
      const state = {
        revealCount: 0,
        blackCount: 0,
        solid: false,
      };

      const render = () => {
        if (state.solid) {
          wrap.classList.add("is-solid");
          return;
        }

        wrap.classList.remove("is-solid");

        const revealSet = new Set(revealOrder.slice(0, state.revealCount));
        const blackSet = new Set(blackOrder.slice(0, state.blackCount));

        allPixels.forEach((el) => {
          const isRevealed = revealSet.has(el);
          const color = isRevealed ? (blackSet.has(el) ? to : el.dataset.base) : from;

          el.style.backgroundColor = color;
          el.style.boxShadow = `0 0 0 1px ${color}`;
        });
      };

      const setProgress = (progress) => {
        progressToState(progress, revealOrder, blackOrder, state);
        render();
      };

      st = ScrollTrigger.create({
        id: "px-main-products",
        trigger: triggerEl,
        endTrigger: targetEl,
        start: "bottom bottom",
        end: "top top",
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
          wrap.classList.remove("is-solid");
          setProgress(self.progress);
        },
        onLeaveBack: () => {
          wrap.classList.remove("is-solid");
          setProgress(0);
        },
      });

      requestAnimationFrame(() => setProgress(st.progress));
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

    if (document.fonts?.ready) {
      document.fonts.ready.then(scheduleInit);
    }

    window.addEventListener("resize", scheduleInit, { passive: true });
    window.addEventListener("load", scheduleInit, { passive: true });

    return () => {
      isActive = false;
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", scheduleInit);
      window.removeEventListener("load", scheduleInit);
      if (st) st.kill();
      grid.innerHTML = "";
      wrap.classList.remove("is-solid");
      wrap.removeAttribute("style");
    };
  }, []);

  // Horizontal Scroll Carousel Animation for Products (Desktop Only)
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 992px)", () => {
      let raf = 0;
      let ticking = false;
      let currentX = 0;
      let targetX = 0;
      let startX = 0;
      let endX = 0;
      let moveX = 0;

      const wrapper = section.querySelector(".products_wrapper");
      const cardsBox = section.querySelector(".cms_products");
      const track = cardsBox?.querySelector(".products_list");
      const items = track ? Array.from(track.querySelectorAll(".product_item")) : [];

      if (!wrapper || !cardsBox || !track || !items.length) return undefined;

      const clamp = gsap.utils.clamp;
      const lerp = gsap.utils.interpolate;

      function getAutoY(i) {
        const pattern = [0, 100, 0, -120];
        return pattern[i % pattern.length];
      }

      function getCardScale(vx, cardW, vw) {
        const center = vx + cardW * 0.5;
        const fromX = vw + cardW * 0.5;
        const toX = Math.max(120, vw * 0.22);
        const t = clamp(0, 1, (fromX - center) / (fromX - toX));
        return 0.7 + 0.3 * t;
      }

      function measure() {
        const third = items[2] || items[items.length - 1];
        const last = items[items.length - 1];
        if (!third || !last) return false;

        const rightPad = 16;
        const thirdRight = third.offsetLeft + third.offsetWidth;
        startX = cardsBox.clientWidth - thirdRight - rightPad;

        const lastRight = last.offsetLeft + last.offsetWidth;
        const rightInset = cardsBox.clientWidth * 0.15;
        endX = cardsBox.clientWidth - rightInset - lastRight;
        moveX = Math.max(1, startX - endX);

        return true;
      }

      function render(force = false) {
        ticking = false;
        currentX = force ? targetX : lerp(currentX, targetX, 0.14);

        const boxLeft = cardsBox.getBoundingClientRect().left;
        const vw = window.innerWidth;

        items.forEach((el, i) => {
          const y = getAutoY(i);
          const vx = boxLeft + el.offsetLeft + currentX;
          const scale = getCardScale(vx, el.offsetWidth, vw);

          gsap.set(el, {
            x: currentX,
            y,
            scale,
            force3D: true,
          });
        });

        if (!force && Math.abs(currentX - targetX) > 0.2) {
          ticking = true;
          raf = requestAnimationFrame(() => render());
        } else {
          raf = 0;
        }
      }

      function requestRender(progress) {
        targetX = startX - moveX * progress;
        if (!ticking) {
          ticking = true;
          raf = requestAnimationFrame(() => render());
        }
      }

      const carouselTrigger = ScrollTrigger.create({
        trigger: cardsBox,
        start: "top top",
        end: () => `+=${Math.max(window.innerHeight, wrapper.offsetHeight - cardsBox.offsetTop - window.innerHeight)}`,
        pin: cardsBox,
        pinSpacing: false,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onRefresh: (self) => {
          if (!measure()) return;
          targetX = startX - moveX * self.progress;
          currentX = targetX;
          render(true);
        },
        onUpdate: (self) => {
          requestRender(self.progress);
        },
      });

      measure();
      requestRender(carouselTrigger.progress);
      ScrollTrigger.refresh();

      return () => {
        if (raf) cancelAnimationFrame(raf);
        carouselTrigger.kill();
        gsap.set(items, { clearProps: "transform" });
      };
    });

    return () => mm.revert();
  }, []);

  useEffect(() => {
    const track = mobileCarouselRef.current;
    if (!track) return;

    const media = window.matchMedia("(max-width: 991px)");
    let raf = 0;

    const updateActiveSlide = () => {
      if (!media.matches) return;

      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const slides = Array.from(track.querySelectorAll(".products_mobile_slide"));
        if (!slides.length) return;

        const trackLeft = track.getBoundingClientRect().left;
        const closest = slides.reduce(
          (best, slide, index) => {
            const distance = Math.abs(slide.getBoundingClientRect().left - trackLeft);
            return distance < best.distance ? { index, distance } : best;
          },
          { index: 0, distance: Infinity }
        );

        setActiveMobileSlide(closest.index);
      });
    };

    updateActiveSlide();
    track.addEventListener("scroll", updateActiveSlide, { passive: true });
    window.addEventListener("resize", updateActiveSlide, { passive: true });

    return () => {
      if (raf) cancelAnimationFrame(raf);
      track.removeEventListener("scroll", updateActiveSlide);
      window.removeEventListener("resize", updateActiveSlide);
    };
  }, []);

  const scrollMobileProducts = (indexOrDirection) => {
    const track = mobileCarouselRef.current;
    if (!track) return;

    const slides = Array.from(track.querySelectorAll(".products_mobile_slide"));
    if (!slides.length) return;

    const nextIndex =
      typeof indexOrDirection === "number"
        ? indexOrDirection
        : activeMobileSlide + indexOrDirection;
    const clampedIndex = Math.max(0, Math.min(slides.length - 1, nextIndex));

    slides[clampedIndex].scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  };

  const products = [
    {
      id: 1,
      slug: 'c8-enterprise-wallet',
      url: '/criacao-de-sites-uberlandia',
      title: 'Sites Imersivos Premium',
      category: 'WEB',
      description: 'Experiências em Next.js, Three.js e GSAP para marcas premium que precisam vender autoridade antes da primeira reunião comercial.',
      image: 'https://cdn.prod.website-files.com/69e8d4ff1e2b0b76c046017e/69e8e7c60a6abb7aa2a22804_1.avif',
      srcset: 'https://cdn.prod.website-files.com/69e8d4ff1e2b0b76c046017e/69e8e7c60a6abb7aa2a22804_1-p-500.png 500w, https://cdn.prod.website-files.com/69e8d4ff1e2b0b76c046017e/69e8e7c60a6abb7aa2a22804_1.avif 744w',
    },
    {
      id: 2,
      slug: 'c8-registry',
      url: '/seo-local-uberlandia',
      title: 'SEO Local',
      category: 'LOCAL',
      description: 'Estratégia de SEO local para Uberlândia e Triângulo Mineiro, posicionando serviços premium diante de decisores prontos para comprar.',
      image: 'https://cdn.prod.website-files.com/69e8d4ff1e2b0b76c046017e/69e8e7e111ff24e3c98f554f_2.avif',
      srcset: 'https://cdn.prod.website-files.com/69e8d4ff1e2b0b76c046017e/69e8e7e111ff24e3c98f554f_2-p-500.png 500w, https://cdn.prod.website-files.com/69e8d4ff1e2b0b76c046017e/69e8e7e111ff24e3c98f554f_2.avif 744w',
    },
    {
      id: 3,
      slug: 'c8-vault',
      url: '/trafego-pago-uberlandia',
      title: 'Tráfego Cirúrgico',
      category: 'MÍDIA',
      description: 'Campanhas de alta intenção com segmentação cirúrgica, criadas para gerar oportunidades comerciais qualificadas sem desperdiçar verba local.',
      image: 'https://cdn.prod.website-files.com/69e8d4ff1e2b0b76c046017e/69e8e7fa4812ec414dd4259a_3.avif',
    },
    {
      id: 4,
      slug: 'private-transfer-infrastructure',
      url: '/landing-pages-high-ticket',
      title: 'Landing Pages High Ticket',
      category: 'CONVERSÃO',
      description: 'Páginas desenhadas para ofertas high-ticket, com narrativa executiva, prova visual e estrutura focada em conversão local mensurável B2B.',
      image: 'https://cdn.prod.website-files.com/69e8d4ff1e2b0b76c046017e/69e8e81fe098f5b0efd912cb_4.avif',
    },
    {
      id: 5,
      slug: 'daml-smart-contract-development',
      url: '/performance-web',
      title: 'Performance Web de Precisão',
      category: 'VELOCIDADE',
      description: 'Otimização técnica para velocidade, responsividade e estabilidade, protegendo ranqueamento, experiência mobile e performance em campanhas locais ativas.',
      image: 'https://cdn.prod.website-files.com/69e8d4ff1e2b0b76c046017e/69e8e836bfb42beb22debfda_5.avif',
    },
    {
      id: 6,
      slug: 'validator-nodes',
      url: '/conteudo-tecnico',
      title: 'Conteúdo Técnico',
      category: 'AUTORIDADE',
      description: 'Textos estratégicos para comunicar autoridade, especialização e diferenciação em mercados B2B regionais competitivos premium.',
      image: 'https://cdn.prod.website-files.com/69e8d4ff1e2b0b76c046017e/69e8e850581a392f2a2ade3b_6.avif',
      srcset: 'https://cdn.prod.website-files.com/69e8d4ff1e2b0b76c046017e/69e8e850581a392f2a2ade3b_6-p-500.png 500w, https://cdn.prod.website-files.com/69e8d4ff1e2b0b76c046017e/69e8e850581a392f2a2ade3b_6.avif 744w',
    },
    {
      id: 7,
      slug: 'swap-exchange-modules',
      url: '/automacao-comercial-b2b',
      title: 'Automação Comercial B2B Integrada',
      category: 'OPERAÇÃO',
      description: 'Integrações e rotinas digitais que conectam captação, atendimento e mensuração para operações comerciais mais previsíveis locais.',
      image: 'https://cdn.prod.website-files.com/69e8d4ff1e2b0b76c046017e/69e8e8712b289d1273ca9a19_7.avif',
      srcset: 'https://cdn.prod.website-files.com/69e8d4ff1e2b0b76c046017e/69e8e8712b289d1273ca9a19_7-p-500.png 500w, https://cdn.prod.website-files.com/69e8d4ff1e2b0b76c046017e/69e8e8712b289d1273ca9a19_7.avif 744w',
    },
  ];

  return (
    <section ref={sectionRef} id="products" className="products">
      <style>{`
        .products {
          position: relative;
          background-color: var(--black);
          z-index: 2;
        }

        .transition_cubes {
          z-index: 15;
          margin-top: 21em;
          position: relative;
        }

        .pixel-transition {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 2;
          pointer-events: none;
          overflow: hidden;
          background: var(--px-from, #044ab3);
        }

        .pixel-grid {
          position: relative;
          display: grid;
          justify-content: start;
          margin: 0;
          gap: 0 !important;
          line-height: 0;
          font-size: 0;
          transform: none !important;
        }

        .pixel {
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

        .pixel-transition.is-solid,
        .pixel-transition.is-solid .pixel-grid {
          background: var(--px-solid, #151515) !important;
        }

        .pixel-transition.is-solid .pixel {
          background: var(--px-solid, #151515) !important;
          box-shadow: 0 0 0 1px var(--px-solid, #151515) !important;
        }

        .products_wrapper {
          padding: 13em 0;
          position: relative;
          overflow: visible;
          z-index: 1;
          min-height: 420vh;
        }

        .flex_products {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          padding-left: 1.75rem;
          padding-right: 1.75rem;
        }

        .products_headline {
          display: flex;
          flex-direction: column;
          gap: 1em;
        }

        .products_heading {
          color: #fff;
          font-size: 6em;
          font-weight: 400;
          line-height: 1;
          margin: 0;
          position: static;
        }

        .p_right_products {
          display: flex;
          flex-direction: column;
          gap: 1.25em;
          width: 42ch;
        }

        .p_gen {
          color: var(--white);
          letter-spacing: -0.005em;
          font-size: 0.9em;
          font-weight: 500;
          line-height: 1.3;
        }

        .products .button {
          display: block;
          color: var(--blue);
          background: var(--white);
          border-radius: .1875em;
          padding: .25em .25em .25em 1em;
          text-decoration: none;
          font-weight: 500;
          line-height: 1;
        }

        .products .flex_button_general {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 4.5em;
        }

        .products .arrow_button {
          background: var(--blue);
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

        .products .arrow_icon {
          width: 100%;
          height: 100%;
          background: url('${arrowDiagonal}') center / contain no-repeat;
          transition: transform .45s cubic-bezier(.22, 1, .36, 1), opacity .28s ease;
        }

        .products .arrow_button::after {
          content: "";
          position: absolute;
          width: calc(100% - 1.25em);
          height: calc(100% - 1.25em);
          background: url('${arrowDiagonal}') center / contain no-repeat;
          transform: translate(-145%, 145%);
          opacity: 0;
          transition: transform .45s cubic-bezier(.22, 1, .36, 1), opacity .28s ease;
        }

        .products .button:hover .arrow_button .arrow_icon,
        .products .button:focus-visible .arrow_button .arrow_icon {
          transform: translate(145%, -145%);
          opacity: 0;
        }

        .products .button:hover .arrow_button::after,
        .products .button:focus-visible .arrow_button::after {
          transform: translate(0, 0);
          opacity: 1;
        }

        .cms_products {
          position: relative;
          height: 100vh;
          min-height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          overflow-x: clip;
          width: 100vw;
          max-width: 100vw;
          margin-top: 5em;
          margin-left: calc(50% - 50vw);
          clip-path: inset(0);
          contain: paint;
        }

        .collection_products {
          width: 100%;
          height: 100%;
          overflow: visible;
          padding-left: clamp(120px, 10vw, 320px);
          box-sizing: border-box;
        }

        .products_list {
          position: relative;
          height: 100%;
          display: flex;
          align-items: center;
          gap: 62px;
          width: max-content;
          will-change: transform;
        }

        .product_item {
          flex: 0 0 clamp(240px, 20vw, 340px);
          transform-origin: left center;
          will-change: transform;
        }

        .product_card {
          display: flex;
          flex-direction: column;
          background-color: var(--blue);
          border-radius: 0.375em;
          transition: transform 400ms cubic-bezier(0.22, 1, 0.36, 1);
          text-decoration: none;
          color: var(--white);
          width: 100%;
          height: 100%;
          position: relative;
          overflow: hidden;
        }

        .product_card:hover {
          transform: translateY(-4px);
        }

        .tag_link {
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
          width: 100%;
          height: 100%;
          padding: 0.5em 0.5em 1em 1.25em;
          position: absolute;
          inset: 0;
          z-index: 2;
        }

        .tagline_product {
          font-size: 0.6em;
          color: var(--white);
          text-transform: uppercase;
          letter-spacing: 0.01em;
          font-family: 'Fragment Mono', monospace;
          background-color: rgba(255, 255, 255, 0.15);
          border-radius: 0.1875em;
          margin-top: 0.375em;
          padding: 0.55em 0.8em;
        }

        .product_arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--white);
          border-radius: 3px;
          width: 2.25em;
          height: 2.25em;
          margin-left: auto;
          padding: 0.625em;
          position: relative;
          overflow: hidden;
        }

        .product_content {
          width: 100%;
          margin-top: 0;
        }

        .product_visual {
          width: 100%;
          height: auto;
          aspect-ratio: 1 / 1;
          background-color: transparent;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .product_visual .image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .arrow_product_link {
          width: 100%;
          height: 100%;
          display: block;
          transition: transform .45s cubic-bezier(.22, 1, .36, 1), opacity .28s ease;
        }

        .product_arrow::after {
          content: "";
          position: absolute;
          width: calc(100% - 1.25em);
          height: calc(100% - 1.25em);
          background: url('${arrowBlue}') center / contain no-repeat;
          transform: translate(-145%, 145%);
          opacity: 0;
          transition: transform .45s cubic-bezier(.22, 1, .36, 1), opacity .28s ease;
        }

        .product_card:hover .product_arrow .arrow_product_link,
        .product_card:focus-visible .product_arrow .arrow_product_link {
          transform: translate(145%, -145%);
          opacity: 0;
        }

        .product_card:hover .product_arrow::after,
        .product_card:focus-visible .product_arrow::after {
          transform: translate(0, 0);
          opacity: 1;
        }

        .about_product {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 1.5em;
          padding: 0.5em 1.25em 1.25em;
        }

        .product_title {
          letter-spacing: 0;
          width: 21ch;
          font-size: 1.3em;
        }

        .product_title_card {
          color: #fff;
        }

        .product_desc {
          letter-spacing: 0;
          width: 38ch;
          font-size: 1vw;
          line-height: 1.5;
        }

        .text_desc {
          color: rgba(255, 255, 255, 0.72);
          font-size: 1em;
          line-height: 1.5;
        }

        .products_mobile_container {
          display: none;
        }

        @media (max-width: 991px) {
          .flex_products {
            display: flex;
            flex-direction: column;
            gap: 2em;
            align-items: flex-start;
            padding-left: 20px;
            padding-right: 20px;
          }

          .cms_products.only_desktop {
            display: none;
          }

          .products_wrapper {
            padding: 13em 0;
            min-height: auto;
          }

          .products_mobile_container {
            display: block;
            width: 100vw;
            max-width: 100vw;
            margin-top: 92px;
            padding: 0 0 3.25rem 20px;
            overflow: hidden;
          }

          .products_mobile_track {
            display: flex;
            align-items: stretch;
            gap: 12px;
            width: 100%;
            overflow-x: auto;
            overflow-y: hidden;
            padding-right: 20px;
            scroll-snap-type: x mandatory;
            scroll-padding-left: 0;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }

          .products_mobile_track::-webkit-scrollbar {
            display: none;
          }

          .products_mobile_slide {
            flex: 0 0 45em;
            width: 45em;
            height: 54em;
            scroll-snap-align: start;
          }

          .products_mobile_slide .product_card {
            height: 100%;
          }

          .products_mobile_controls {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 1rem;
            margin-top: 2.4rem;
            padding-right: 20px;
          }

          .products_mobile_pagination {
            display: flex;
            align-items: center;
            gap: 1.5rem;
            padding: 0;
            margin: 0;
          }

          .products_mobile_dot {
            width: 0.45rem;
            height: 0.45rem;
            border: 0;
            border-radius: 100%;
            background: rgba(4, 74, 179, 0.35);
            padding: 0;
            position: relative;
            cursor: pointer;
          }

          .products_mobile_dot::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 40px;
            height: 40px;
          }

          .products_mobile_dot.is-active {
            background: var(--blue);
          }

          .products_mobile_arrows {
            display: flex;
            align-items: center;
            gap: 0.75rem;
          }

          .products_mobile_arrow {
            width: 2.6rem;
            height: 2.6rem;
            border: 0;
            border-radius: 3px;
            background: rgba(4, 74, 179, 0.08);
            color: var(--blue);
            font-family: 'Fragment Mono', monospace;
            font-size: 1rem;
            line-height: 1;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .products_mobile_arrow:disabled {
            opacity: 0.35;
          }
        }

        @media (max-width: 767px) {
          .products .products_wrapper {
            padding: 5.25rem 0 1rem;
          }

          .products .products_heading {
            font-size: clamp(4.25rem, 18vw, 5.9rem);
            line-height: 1.02;
            max-width: 7ch;
            overflow-wrap: break-word;
          }

          .products .p_right_products {
            gap: 1.6rem;
            width: 100%;
            margin-top: 8px;
          }

          .products .p_gen {
            font-size: clamp(1.15rem, 4.7vw, 1.55rem);
            line-height: 1.28;
          }

          .products .button,
          .products .button.blue {
            font-size: 1.12rem;
          }

          .products .product_visual {
            height: 18.5rem;
            aspect-ratio: auto;
          }

          .products .product_desc {
            width: 100%;
          }

          .products .tagline_product {
            font-size: 0.72rem;
          }

          .products .product_arrow {
            width: 2.9rem;
            height: 2.9rem;
            padding: .72rem;
          }

          .products .text_desc {
            font-size: 0.98rem;
            line-height: 1.32;
          }

          .products .product_title {
            width: 100%;
          }

          .products .product_title_card {
            font-size: 1.65rem;
            line-height: 1.08;
          }
        }

        @media (max-width: 479px) {
          .products .flex_products {
            padding-left: 16px;
            padding-right: 16px;
          }

          .products .products_heading {
            font-size: clamp(4.65rem, 19.5vw, 6.25rem);
            max-width: 7ch;
          }

          .products .p_right_products {
            gap: 1.45rem;
            margin-top: 20px;
          }

          .products .p_gen {
            font-size: clamp(1.18rem, 5vw, 1.55rem);
          }

          .products .button {
            width: 100%;
            font-size: 1.15rem;
          }

          .products .button_wrap {
            width: 100%;
          }

          .products .flex_button_general {
            width: 100%;
            justify-content: space-between;
          }

          .products .arrow_button {
            width: 42px;
            height: 42px;
            margin-left: auto;
            padding: .8rem;
          }

          .products .products_mobile_container {
            margin-top: 52px;
            padding-left: 16px;
            padding-bottom: 3.25rem;
          }

          .products .products_mobile_track {
            padding-right: 16px;
          }

          .products .products_mobile_slide {
            flex-basis: min(88vw, 27.5rem);
            width: min(88vw, 27.5rem);
            height: clamp(34rem, 121vw, 41.5rem);
          }

          .products .tagline_product {
            font-size: 0.78rem;
          }

          .products .product_arrow {
            width: 3.25rem;
            height: 3.25rem;
            padding: 0.82rem;
          }

          .products .product_visual {
            height: clamp(18rem, 62vw, 22rem);
          }

          .products .about_product {
            margin-top: auto;
            padding: 0.75rem 1rem 1.15rem;
            gap: 0.85rem;
          }

          .products .text_desc {
            font-size: clamp(0.95rem, 4.05vw, 1.2rem);
            line-height: 1.32;
          }

          .products .product_title_card {
            font-size: clamp(1.75rem, 7.3vw, 2.2rem);
          }

          .products .product_desc {
            width: 100%;
            font-size: 1rem;
          }

          .products .products_mobile_controls {
            margin-top: 1.7rem;
            padding-right: 16px;
          }
        }
      `}</style>

      {/* Pixel Transition */}
      <div className="transition_cubes">
        <div
          ref={pixelTransitionRef}
          className="pixel-transition"
          data-from="#044AB3"
          data-to="#151515"
          data-accent="#6FE3FF"
          data-trigger-id="built-for"
          data-target-id="products"
        >
          <div className="pixel-grid" />
        </div>
      </div>

      {/* Products Content */}
      <div className="products_wrapper">
        <div className="flex_products">
          {/* Headline */}
          <div className="products_headline">
            <h2 className="h2 products_heading">
              Serviços<br />
              Digitais
            </h2>
          </div>

          {/* Description */}
          <div className="p_right_products">
            <div className="p_gen">
              Um conjunto completo de serviços digitais para marcas high-ticket em Uberlândia e no Triângulo Mineiro. A Off-Data integra sites imersivos, SEO local e tráfego de alta intenção para transformar presença digital em autoridade, demanda qualificada e crescimento mensurável.
            </div>
            <div className="button_wrap">
              <a href="#products" className="button w-inline-block">
                <div className="flex_button_general">
                  <div>Ver Serviços</div>
                  <div className="arrow_button">
                    <div className="arrow_icon"></div>
                  </div>
                </div>
              </a>
            </div>
          </div>

        </div>

        {/* Products Grid */}
        <div className="cms_products only_desktop">
          <div className="collection_products w-dyn-list">
            <div className="products_list w-dyn-items">
            {products.map((product) => (
              <div key={product.id} className="product_item w-dyn-item">
                <a href={product.url || "#cta-section"} className="product_card w-inline-block">
                  <div className="tag_link">
                    <div className="tagline_product">{product.category}</div>
                    <div className="product_arrow">
                      <img
                        src={arrowBlue}
                        loading="lazy"
                        alt="Arrow pixelated, svg, blue primary"
                        className="arrow_product_link"
                      />
                    </div>
                  </div>

                  <div className="product_content">
                    <div className="product_visual">
                      <img
                        src={product.image}
                        srcSet={product.srcset}
                        sizes={product.srcset ? "(max-width: 767px) 100vw, 744px" : undefined}
                        loading="lazy"
                        alt={product.title}
                        className="image"
                      />
                    </div>
                  </div>

                  <div className="about_product">
                    <div className="product_title">
                      <div className="product_title_card">{product.title}</div>
                    </div>
                    <div className="product_desc">
                      <div className="text_desc">{product.description}</div>
                    </div>
                  </div>
                </a>
              </div>
            ))}
            </div>
          </div>
        </div>

        <div className="products_mobile_container">
          <div className="splide slider1">
            <div className="splide__track">
              <div ref={mobileCarouselRef} className="splide__list products_mobile_track">
                {products.map((product) => (
                  <div key={`mobile-${product.id}`} className="splide__slide products_mobile_slide">
                    <a href={product.url || "#cta-section"} className="product_card w-inline-block">
                      <div className="tag_link">
                        <div className="tagline_product">{product.category}</div>
                        <div className="product_arrow">
                          <img
                            src={arrowBlue}
                            loading="lazy"
                            alt="Arrow pixelated, svg, blue primary"
                            className="arrow_product_link"
                          />
                        </div>
                      </div>

                      <div className="product_content">
                        <div className="product_visual">
                          <img
                            src={product.image}
                            srcSet={product.srcset}
                            sizes={product.srcset ? "(max-width: 767px) 100vw, 744px" : undefined}
                            loading="lazy"
                            alt={product.title}
                            className="image"
                          />
                        </div>
                      </div>

                      <div className="about_product">
                        <div className="product_title">
                          <div className="product_title_card">{product.title}</div>
                        </div>
                        <div className="product_desc">
                          <div className="text_desc">{product.description}</div>
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div className="products_mobile_controls">
              <div className="splide__pagination products_mobile_pagination" aria-label="Product slides">
                {products.map((product, index) => (
                  <button
                    key={`dot-${product.id}`}
                    className={`splide__pagination__page products_mobile_dot${activeMobileSlide === index ? ' is-active' : ''}`}
                    type="button"
                    aria-label={`Go to product ${index + 1}`}
                    aria-current={activeMobileSlide === index ? 'true' : undefined}
                    onClick={() => scrollMobileProducts(index)}
                  />
                ))}
              </div>

              <div className="splide__arrows products_mobile_arrows">
                <button
                  className="splide__arrow splide__arrow--prev products_mobile_arrow"
                  type="button"
                  aria-label="Previous product"
                  disabled={activeMobileSlide === 0}
                  onClick={() => scrollMobileProducts(-1)}
                >
                  &larr;
                </button>
                <button
                  className="splide__arrow splide__arrow--next products_mobile_arrow"
                  type="button"
                  aria-label="Next product"
                  disabled={activeMobileSlide === products.length - 1}
                  onClick={() => scrollMobileProducts(1)}
                >
                  &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="cutting_edge_bridge">
        <div className="wrapper_general sides">
          <div className="sides_company">
            <div className="left_side">
              <div className="image_box">
                <img
                  src="/imagens/mercados-high-ticket-uberlandia.avif"
                  width="1600"
                  height="894"
                  loading="lazy"
                  decoding="async"
                  alt="Centro empresarial premium conectado por infraestrutura digital em Uberlândia"
                  className="image"
                />
              </div>
            </div>
            <div className="right_side">
              <div className="heading_side">
                <h2 className="h2 smallest">Feito para mercados high-ticket</h2>
              </div>
              <div className="content_bottom">
                <div className="bottom_flex">
                  <div className="p_gen">
                    A Off-Data estrutura presença digital para imobiliárias de luxo, clínicas
                    premium, agronegócios e operações industriais em Uberlândia. Cada projeto
                    combina performance, autoridade local e conversão para ciclos comerciais de maior valor.
                  </div>
                  <div className="button_wrap">
                    <a href="#built-for" className="button w-inline-block">
                      <div className="flex_button_general">
                        <div>Nichos</div>
                        <div className="arrow_button">
                          <div className="arrow_icon"></div>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
