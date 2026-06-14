import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const COLS = 25;
const ROWS = 6;
const REVEAL_RATIO = 0.5;

const AgencyPixelTransition = () => {
  const transitionRef = useRef(null);

  useEffect(() => {
    const wrap = transitionRef.current;
    const grid = wrap?.querySelector('.agency-pixel-grid');
    if (!wrap || !grid) return undefined;

    let trigger = null;
    let resizeTimer = null;

    const clamp01 = (value) => Math.min(1, Math.max(0, value));

    const seededRandom = (seed) => {
      let current = seed % 2147483647;
      if (current <= 0) current += 2147483646;
      return () => {
        current = (current * 16807) % 2147483647;
        return (current - 1) / 2147483646;
      };
    };

    const shuffle = (items, random) => {
      const shuffled = items.slice();
      for (let index = shuffled.length - 1; index > 0; index -= 1) {
        const swapIndex = Math.floor(random() * (index + 1));
        const item = shuffled[index];
        shuffled[index] = shuffled[swapIndex];
        shuffled[swapIndex] = item;
      }
      return shuffled;
    };

    const buildPattern = (random) => {
      const pattern = [];
      for (let row = 0; row < ROWS; row += 1) {
        const cells = [];
        for (let column = 0; column < COLS; column += 1) {
          let type = null;

          if (row >= ROWS - 2) {
            type = 1;
          } else {
            const appear = row === 0 ? 0.34 : row === 1 ? 0.5 : 0.7;
            if (random() < appear) {
              const value = random();
              type = value < 0.55 ? 1 : value < 0.82 ? 2 : 3;
            }
          }

          cells.push(type);
        }
        pattern.push(cells);
      }
      return pattern;
    };

    const pxCount = (progress, length) => {
      if (!length) return 0;
      const safeProgress = clamp01(progress);
      if (safeProgress >= 0.997) return length;
      return Math.floor(safeProgress * length);
    };

    const progressToState = (rawProgress, revealOrder, solidOrder, state) => {
      const progress = clamp01(rawProgress);
      const revealProgress = clamp01(progress / REVEAL_RATIO);

      state.revealCount = pxCount(revealProgress, revealOrder.length);

      if (progress <= REVEAL_RATIO) {
        state.solidCount = 0;
        state.solid = false;
        return;
      }

      const solidProgress = clamp01((progress - REVEAL_RATIO) / (1 - REVEAL_RATIO));
      state.solidCount = pxCount(solidProgress, solidOrder.length);
      state.solid = solidProgress >= 0.997;
    };

    const sizeGrid = (from) => {
      const containerWidth =
        wrap.clientWidth ||
        wrap.parentElement?.clientWidth ||
        Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

      const cell = Math.max(18, Math.ceil(containerWidth / COLS));
      const draw = cell + 2;
      const gridWidth = draw * COLS;
      const gridHeight = draw * ROWS;
      const leftPad = Math.max(0, Math.round((containerWidth - gridWidth) / 2));

      grid.style.gridTemplateColumns = `repeat(${COLS}, ${draw}px)`;
      grid.style.gridTemplateRows = `repeat(${ROWS}, ${draw}px)`;
      grid.style.width = `${gridWidth}px`;
      grid.style.height = `${gridHeight}px`;
      grid.style.marginLeft = `${leftPad}px`;
      grid.style.marginRight = '0px';

      wrap.style.setProperty('--agency-px-from', from);
      wrap.style.height = `${gridHeight}px`;
    };

    const initTransition = () => {
      const from = wrap.dataset.from || '#151515';
      const to = wrap.dataset.to || '#FFFFFF';
      const accent = wrap.dataset.accent || '#6FE3FF';
      const triggerEl = document.getElementById(wrap.dataset.triggerId || '');

      if (!triggerEl) return;

      if (trigger) {
        trigger.kill();
        trigger = null;
      }

      wrap.style.setProperty('--agency-px-solid', to);
      wrap.classList.remove('is-solid');
      grid.innerHTML = '';

      const pattern = buildPattern(seededRandom(101));
      const allPixels = [];
      const activePixels = [];

      for (let row = 0; row < ROWS; row += 1) {
        for (let column = 0; column < COLS; column += 1) {
          const type = pattern[row][column];
          const pixel = document.createElement('span');
          pixel.className = 'agency-pixel';

          if (type) {
            pixel.dataset.base = type === 1 ? to : type === 2 ? from : accent;
            activePixels.push(pixel);
          } else {
            pixel.dataset.base = from;
          }

          pixel.style.backgroundColor = from;
          pixel.style.boxShadow = `0 0 0 1px ${from}`;

          allPixels.push(pixel);
          grid.appendChild(pixel);
        }
      }

      sizeGrid(from);

      const revealOrder = shuffle(activePixels, seededRandom(201));
      const solidOrder = shuffle(activePixels, seededRandom(301));
      const state = {
        revealCount: 0,
        solidCount: 0,
        solid: false,
      };

      const render = () => {
        if (state.solid) {
          wrap.classList.add('is-solid');
          return;
        }

        wrap.classList.remove('is-solid');

        const revealSet = new Set(revealOrder.slice(0, state.revealCount));
        const solidSet = new Set(solidOrder.slice(0, state.solidCount));

        allPixels.forEach((pixel) => {
          const revealed = revealSet.has(pixel);
          const color = revealed ? (solidSet.has(pixel) ? to : pixel.dataset.base) : from;
          pixel.style.backgroundColor = color;
          pixel.style.boxShadow = `0 0 0 1px ${color}`;
        });
      };

      const setProgress = (progress) => {
        progressToState(progress, revealOrder, solidOrder, state);
        render();
      };

      trigger = ScrollTrigger.create({
        id: 'px-agency-to-cta',
        trigger: triggerEl,
        start: 'bottom 130%',
        end: 'bottom top',
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
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => requestAnimationFrame(initTransition), 180);
    };

    initTransition();
    document.fonts?.ready?.then(scheduleInit);
    window.addEventListener('resize', scheduleInit, { passive: true });
    window.addEventListener('orientationchange', scheduleInit);

    return () => {
      if (trigger) trigger.kill();
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', scheduleInit);
      window.removeEventListener('orientationchange', scheduleInit);
      grid.innerHTML = '';
      wrap.removeAttribute('style');
    };
  }, []);

  return (
    <div
      className="agency-pixel-transition"
      ref={transitionRef}
      data-from="#151515"
      data-to="#FFFFFF"
      data-accent="#044ab3"
      data-trigger-id="mission-section"
      data-target-id="cta-section"
      aria-hidden="true"
    >
      <style>{`
        .agency-pixel-transition {
          position: relative;
          z-index: 2;
          width: 100%;
          overflow: hidden;
          background: var(--agency-px-from, #151515);
          pointer-events: none;
        }

        .agency-pixel-grid {
          position: relative;
          display: grid;
          justify-content: start;
          gap: 0 !important;
          margin: 0;
          font-size: 0;
          line-height: 0;
          transform: none !important;
        }

        .agency-pixel {
          position: relative;
          display: block;
          box-sizing: border-box;
          margin: 0;
          border: none !important;
          outline: none !important;
          background-clip: padding-box;
          backface-visibility: hidden;
          transform: none;
        }

        .agency-pixel-transition.is-solid,
        .agency-pixel-transition.is-solid .agency-pixel-grid {
          background: var(--agency-px-solid, #ffffff) !important;
        }

        .agency-pixel-transition.is-solid .agency-pixel {
          background: var(--agency-px-solid, #ffffff) !important;
          box-shadow: 0 0 0 1px var(--agency-px-solid, #ffffff) !important;
        }
      `}</style>
      <div className="agency-pixel-grid" />
    </div>
  );
};

export default AgencyPixelTransition;
