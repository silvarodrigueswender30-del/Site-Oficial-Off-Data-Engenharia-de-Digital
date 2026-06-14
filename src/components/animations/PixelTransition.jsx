import React, { useEffect, useRef } from 'react';

/* ──────────────────────────────────────────────────────────
   PixelTransition — forensic parity with C8 Registry
   Ref: COLS=25, ROWS=6, pixels ~18–22px each
        data-from="#151515" → data-to="#044AB3" accent="#6FE3FF"
        ScrollTrigger: start "bottom 130%", end "bottom top"
        Reveal ratio 0.5 (two phases: reveal color → flip to solid)
   We replicate with IntersectionObserver (no GSAP dependency)
   ────────────────────────────────────────────────────────── */

const COLS = 25;
const ROWS = 4;
const REVEAL_RATIO = 0.5;

function seededRandom(seed) {
  let t = seed % 2147483647;
  if (t <= 0) t += 2147483646;
  return function () {
    t = (t * 16807) % 2147483647;
    return (t - 1) / 2147483646;
  };
}

function shuffle(arr, rnd) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildPattern(rnd) {
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
}

const PixelTransition = ({
  triggerId,
  targetId,
  fromColor = '#111111',
  toColor = '#044ab3',
  accentColor = '#6fe3ff',
}) => {
  const containerRef = useRef(null);
  const gridRef = useRef(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    const grid = gridRef.current;
    if (!container || !grid) return;

    /* Compute cell size exactly like C8: Math.max(18, ceil(vw / COLS)) */
    const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const cell = Math.max(18, Math.ceil(vw / COLS));
    const draw = cell + 2;
    const gridW = draw * COLS;
    const gridH = draw * ROWS;
    const leftPad = Math.max(0, Math.round((vw - gridW) / 2));

    grid.style.gridTemplateColumns = `repeat(${COLS}, ${draw}px)`;
    grid.style.gridTemplateRows = `repeat(${ROWS}, ${draw}px)`;
    grid.style.width = `${gridW}px`;
    grid.style.height = `${gridH}px`;
    grid.style.marginLeft = `${leftPad}px`;

    container.style.height = `${gridH}px`;
    container.style.background = fromColor;

    /* Build pixel elements */
    grid.innerHTML = '';
    const rnd = seededRandom(100);
    const pattern = buildPattern(rnd);
    const allPixels = [];
    const active = [];

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const t = pattern[r][c];
        const el = document.createElement('div');
        el.style.display = 'block';
        el.style.backgroundColor = fromColor;
        el.style.boxShadow = `0 0 0 1px ${fromColor}`;
        el.style.backfaceVisibility = 'hidden';
        el.style.boxSizing = 'border-box';

        if (t) {
          el._targetColor = t === 1 ? toColor : t === 2 ? fromColor : accentColor;
          active.push(el);
        } else {
          el._targetColor = fromColor;
        }

        allPixels.push(el);
        grid.appendChild(el);
      }
    }

    const revealOrder = shuffle(active, seededRandom(200));
    const blackOrder = shuffle(active, seededRandom(300));

    /* Animate when trigger enters viewport */
    const triggerEl = document.getElementById(triggerId);
    if (!triggerEl) return;

    const animate = () => {
      if (animatedRef.current) return;
      animatedRef.current = true;

      const totalSteps = revealOrder.length;
      const revealEnd = Math.floor(totalSteps * REVEAL_RATIO);

      /* Phase 1: reveal colored pixels */
      revealOrder.forEach((el, i) => {
        setTimeout(() => {
          el.style.transition = 'background 160ms ease, box-shadow 160ms ease';
          el.style.backgroundColor = el._targetColor;
          el.style.boxShadow = `0 0 0 1px ${el._targetColor}`;
        }, i * 10);
      });

      /* Phase 2: flip everything to toColor */
      setTimeout(() => {
        blackOrder.forEach((el, i) => {
          setTimeout(() => {
            el.style.transition = 'background 120ms ease, box-shadow 120ms ease';
            el.style.backgroundColor = toColor;
            el.style.boxShadow = `0 0 0 1px ${toColor}`;
          }, i * 8);
        });
        /* After all done, set solid bg so next section blends */
        setTimeout(() => {
          container.style.background = toColor;
        }, blackOrder.length * 8 + 200);
      }, revealEnd * 10 + 200);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) animate();
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px 0px 0px' }
    );

    observer.observe(triggerEl);

    return () => observer.unobserve(triggerEl);
  }, [triggerId, fromColor, toColor, accentColor]);

  return (
    <div
      ref={containerRef}
      id={targetId}
      style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        zIndex: 2,
      }}
    >
      <div
        ref={gridRef}
        style={{
          position: 'relative',
          display: 'grid',
          justifyContent: 'start',
          lineHeight: 0,
          fontSize: 0,
        }}
      />
    </div>
  );
};

export default PixelTransition;
