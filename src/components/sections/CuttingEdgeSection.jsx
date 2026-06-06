import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import arrowDiagonal from '../../assets/images/arrow-diagonal.svg';

gsap.registerPlugin(ScrollTrigger);

const CuttingEdgeSection = () => {
  const sectionRef = useRef(null);
  const pixelTransitionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.box_align').forEach((box, i) => {
        gsap.from(box, {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: box,
            start: 'top 85%',
          }
        });
      });
    }, sectionRef);

    const COLS = 25;
    const ROWS = 6;
    const REVEAL_RATIO = 0.5;
    var rafId = null;
    var pixelResizeTimer = null;
    var pixelTrigger = null;
    var SCROLL_STRETCH = 6.0;
    var SCROLL_SLOW_PAD = 1200;
    var SCROLL_LEAD = 0;
    var MOTION_DELAY = 0.15;
    var PULSE_EDGE = 0.25;

    function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }
    function edgeK() { var k = PULSE_EDGE; if (k <= 0) return 0; return Math.min(k, 0.499); }
    function motionProg(prog) { if (MOTION_DELAY <= 0) return prog; return clamp((prog - MOTION_DELAY) / (1 - MOTION_DELAY), 0, 1); }

    function getProgressForElement(el) {
        if (!el) return 0;
        var rect = el.getBoundingClientRect();
        var h = rect.height;
        if (!h || h < 1) h = Math.max(1, el.clientHeight || 1);
        var start = window.innerHeight;
        var end = -(h * SCROLL_STRETCH + SCROLL_SLOW_PAD);
        var raw = (start - (rect.top - SCROLL_LEAD)) / (start - end);
        return clamp(raw, 0, 1);
    }

    function getProgressForHeading(heading) {
        if (!heading) return 0;
        var rect = heading.getBoundingClientRect();
        var vh = window.innerHeight;
        var startY = vh * 1.05;
        var endY = vh * 0.12;
        var raw = (startY - (rect.top - SCROLL_LEAD)) / (startY - endY);
        return clamp(raw, 0, 1);
    }

    function dashP(progress, dashDir) { return dashDir === -1 ? 1 - progress : progress; }

    function pulseOpacityFromP(p, dashDir) {
        var k = edgeK();
        if (k <= 0) return 1;
        if (dashDir === 1) {
            if (p < k) return clamp(p / k, 0, 1);
            if (p > 1 - k) return clamp((1 - p) / k, 0, 1);
            return 1;
        }
        if (p > 1 - k) return clamp((1 - p) / k, 0, 1);
        if (p < k) return clamp(p / k, 0, 1);
        return 1;
    }

    function q(svg, id) { return svg ? svg.querySelector("#" + id) : null; }

    function seededRandom(seed) {
        var t = seed % 2147483647;
        if (t <= 0) t += 2147483646;
        return function() {
            t = (t * 16807) % 2147483647;
            return (t - 1) / 2147483646;
        };
    }

    function shuffle(arr, rnd) {
        var a = arr.slice();
        for (var i = a.length - 1; i > 0; i--) {
            var j = Math.floor(rnd() * (i + 1));
            var tmp = a[i];
            a[i] = a[j];
            a[j] = tmp;
        }
        return a;
    }

    function buildPixelPattern(rnd) {
        var pattern = [];
        for (var r = 0; r < ROWS; r++) {
            var row = [];
            for (var c = 0; c < COLS; c++) {
                var type = null;
                if (r >= ROWS - 2) {
                    type = 1;
                } else {
                    var appear = r === 0 ? 0.34 : r === 1 ? 0.5 : 0.7;
                    if (rnd() < appear) {
                        var p = rnd();
                        type = p < 0.55 ? 1 : p < 0.82 ? 2 : 3;
                    }
                }
                row.push(type);
            }
            pattern.push(row);
        }
        return pattern;
    }

    function pxCount(progress, len) {
        if (!len) return 0;
        var p = clamp(progress, 0, 1);
        if (p >= 0.997) return len;
        return Math.floor(p * len);
    }

    function progressToPixelState(pRaw, revealOrder, blackOrder, state) {
        var p = clamp(pRaw, 0, 1);
        var r = clamp(REVEAL_RATIO, 0, 1);
        var pr = clamp(r > 0 ? p / r : p, 0, 1);
        state.revealCount = pxCount(pr, revealOrder.length);

        if (p <= r) {
            state.blackCount = 0;
            state.solid = false;
            return;
        }

        var pb = clamp((p - r) / (1 - r), 0, 1);
        state.blackCount = pxCount(pb, blackOrder.length);
        state.solid = pb >= 0.997;
    }

    function initProductsToCuttingPixel() {
        var wrap = pixelTransitionRef.current;
        var grid = wrap && wrap.querySelector(".pixel-grid");
        if (!wrap || !grid) return;

        var from = wrap.dataset.from || "#151515";
        var to = wrap.dataset.to || "#044AB3";
        var accent = wrap.dataset.accent || "#6FE3FF";
        var triggerEl = document.getElementById(wrap.dataset.triggerId || "");
        var targetEl = document.getElementById(wrap.dataset.targetId || "");
        if (!triggerEl || !targetEl) return;

        if (pixelTrigger) {
            pixelTrigger.kill();
            pixelTrigger = null;
        }

        function sizeGrid() {
            var containerWidth = wrap.clientWidth || wrap.parentElement?.clientWidth || Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
            var cell = Math.max(18, Math.ceil(containerWidth / COLS));
            var draw = cell + 2;
            var gridW = draw * COLS;
            var gridH = draw * ROWS;
            var leftPad = Math.max(0, Math.round((containerWidth - gridW) / 2));

            grid.style.gridTemplateColumns = "repeat(" + COLS + ", " + draw + "px)";
            grid.style.gridTemplateRows = "repeat(" + ROWS + ", " + draw + "px)";
            grid.style.width = gridW + "px";
            grid.style.height = gridH + "px";
            grid.style.marginLeft = leftPad + "px";
            grid.style.marginRight = "0px";
            wrap.style.setProperty("--px-from", from);
            wrap.style.setProperty("--px-solid", to);
            wrap.style.height = gridH + "px";
        }

        wrap.classList.remove("is-solid");
        grid.innerHTML = "";

        var rnd = seededRandom(101);
        var pattern = buildPixelPattern(rnd);
        var allPixels = [];
        var active = [];

        for (var r = 0; r < ROWS; r++) {
            for (var c = 0; c < COLS; c++) {
                var type = pattern[r][c];
                var el = document.createElement("div");
                el.className = "pixel";

                if (type) {
                    el.dataset.base = type === 1 ? to : type === 2 ? from : accent;
                    active.push(el);
                } else {
                    el.dataset.base = from;
                }

                el.style.backgroundColor = from;
                el.style.boxShadow = "0 0 0 1px " + from;
                allPixels.push(el);
                grid.appendChild(el);
            }
        }

        sizeGrid();

        var revealOrder = shuffle(active, seededRandom(201));
        var blackOrder = shuffle(active, seededRandom(301));
        var state = { revealCount: 0, blackCount: 0, solid: false };

        function render() {
            if (state.solid) {
                wrap.classList.add("is-solid");
                return;
            }

            wrap.classList.remove("is-solid");
            var revealSet = new Set(revealOrder.slice(0, state.revealCount));
            var blackSet = new Set(blackOrder.slice(0, state.blackCount));

            allPixels.forEach(function(el) {
                var isRevealed = revealSet.has(el);
                var color = isRevealed ? (blackSet.has(el) ? to : el.dataset.base) : from;
                el.style.backgroundColor = color;
                el.style.boxShadow = "0 0 0 1px " + color;
            });
        }

        function setProgress(progress) {
            progressToPixelState(progress, revealOrder, blackOrder, state);
            render();
        }

        pixelTrigger = ScrollTrigger.create({
            id: "px-products-cutting-edge",
            trigger: triggerEl,
            endTrigger: targetEl,
            start: "bottom bottom",
            end: "top top",
            scrub: 0.35,
            invalidateOnRefresh: true,
            onRefreshInit: sizeGrid,
            onRefresh: function(self) {
                sizeGrid();
                setProgress(self.progress);
            },
            onUpdate: function(self) { setProgress(self.progress); },
            onEnter: function(self) { setProgress(self.progress); },
            onLeave: function() { setProgress(1); },
            onEnterBack: function(self) {
                wrap.classList.remove("is-solid");
                setProgress(self.progress);
            },
            onLeaveBack: function() {
                wrap.classList.remove("is-solid");
                setProgress(0);
            },
        });

        requestAnimationFrame(function() { setProgress(pixelTrigger.progress); });
    }

    function scheduleProductsToCuttingPixel() {
        clearTimeout(pixelResizeTimer);
        pixelResizeTimer = setTimeout(initProductsToCuttingPixel, 180);
    }

    function initC8FlowPulses() {
        var section = sectionRef.current;
        if (!section) return;

        var wrapTop = section.querySelector(".flow2-wrap:not(.flow2-wrap--bottom)");
        var wrapBottom = section.querySelector(".flow2-wrap.flow2-wrap--bottom");

        var topSvg = wrapTop && wrapTop.querySelector("svg.c8-flow.c8-flow--top");
        var bottomSvg = wrapBottom && wrapBottom.querySelector("svg.c8-flow.c8-flow--bottom");

        var heading = section.querySelector(".execution_box");

        var topMain = q(topSvg, "c8pulseTopMain");
        var topSub = q(topSvg, "c8pulseTopSub");
        var botMain = q(bottomSvg, "c8pulseBottomMain");
        var botSub = q(bottomSvg, "c8pulseBottomSub");

        if ((!topMain || !topSub) && (!botMain || !botSub)) return;

        if (rafId) cancelAnimationFrame(rafId);

        function animate() {
            var isMobile = window.matchMedia("(max-width: 767px)").matches;
            var mainOffsetStart = 1000;
            var subOffsetStart = 1040;
            var mainTravel = isMobile ? 1050 : 1000;
            var subTravel = isMobile ? 1020 : 980;

            if (topMain && topSub) {
                var rootTop = wrapTop || topSvg || section;
                var progTop = isMobile && heading ? getProgressForHeading(heading) : getProgressForElement(rootTop);
                var mTop = motionProg(progTop);
                var pTop = dashP(mTop, 1);
                var fadeTop = pulseOpacityFromP(pTop, 1);

                topMain.style.strokeDashoffset = String(mainOffsetStart - pTop * mainTravel);
                topSub.style.strokeDashoffset = String(subOffsetStart - pTop * subTravel);
                topMain.style.opacity = String(fadeTop);
                topSub.style.opacity = String(fadeTop);
            }

            if (botMain && botSub) {
                var rootBot = wrapBottom || bottomSvg || section;
                var progBot = isMobile && heading ? getProgressForHeading(heading) : getProgressForElement(rootBot);
                var mBot = motionProg(progBot);
                var pBot = dashP(mBot, -1);
                var fadeBot = pulseOpacityFromP(pBot, -1);

                botMain.style.strokeDashoffset = String(mainOffsetStart - pBot * mainTravel);
                botSub.style.strokeDashoffset = String(subOffsetStart - pBot * subTravel);
                botMain.style.opacity = String(fadeBot);
                botSub.style.opacity = String(fadeBot);
            }

            rafId = requestAnimationFrame(animate);
        }

        animate();
    }

    initC8FlowPulses();
    initProductsToCuttingPixel();
    window.addEventListener("resize", initC8FlowPulses, { passive: true });
    window.addEventListener("resize", scheduleProductsToCuttingPixel, { passive: true });

    return () => {
      ctx.revert();
      if (rafId) cancelAnimationFrame(rafId);
      if (pixelTrigger) pixelTrigger.kill();
      clearTimeout(pixelResizeTimer);
      window.removeEventListener("resize", initC8FlowPulses);
      window.removeEventListener("resize", scheduleProductsToCuttingPixel);
    };
  }, []);

  return (
    <div ref={sectionRef}>
      <style>{`
        .cutting_edge_bridge {
          background: #151515;
          color: var(--white);
        }

        .cutting_edge_bridge .wrapper_general.sides {
          padding: 7em 1.75rem;
        }

        .cutting_edge_bridge .sides_company {
          display: flex;
          align-items: stretch;
          width: 100%;
        }

        .cutting_edge_bridge .left_side {
          width: 65%;
          height: 46em;
        }

        .cutting_edge_bridge .right_side {
          width: 35%;
          display: flex;
          flex-direction: column;
          padding: 0 1.75em;
        }

        .cutting_edge_bridge .image_box {
          border-radius: 4px;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .cutting_edge_bridge .image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .cutting_edge_bridge .heading_side {
          max-width: 58ch;
        }

        .cutting_edge_bridge .h2.smallest {
          color: var(--white);
          font-size: 2.875em;
          font-weight: 400;
          line-height: 1;
          letter-spacing: 0;
          margin: 0;
        }

        .cutting_edge_bridge .content_bottom {
          margin-top: auto;
        }

        .cutting_edge_bridge .bottom_flex {
          display: flex;
          flex-direction: column;
          gap: 1.25em;
          width: 44ch;
        }

        .cutting_edge_bridge .p_gen {
          color: var(--white);
          font-size: 1em;
          line-height: 1.25;
        }

        .cutting_edge_bridge .button {
          color: var(--blue);
          background: var(--white);
          border-radius: 4px;
          width: 14em;
          padding: .45em .45em .45em 1.1em;
          text-decoration: none;
          display: block;
        }

        .cutting_edge_bridge .flex_button_general {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1em;
        }

        .cutting_edge_bridge .arrow_button {
          background: var(--blue);
          border-radius: 3px;
          width: 3em;
          height: 3em;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .cutting_edge_bridge .arrow_icon {
          width: 1.15em;
          height: 1.15em;
          background: url('${arrowDiagonal}') center / contain no-repeat;
          transition: transform .45s cubic-bezier(.22, 1, .36, 1), opacity .28s ease;
        }

        .cutting_edge_bridge .arrow_button::after {
          content: "";
          position: absolute;
          width: 1.15em;
          height: 1.15em;
          background: url('${arrowDiagonal}') center / contain no-repeat;
          transform: translate(-145%, 145%);
          opacity: 0;
          transition: transform .45s cubic-bezier(.22, 1, .36, 1), opacity .28s ease;
        }

        .cutting_edge_bridge .button:hover .arrow_button .arrow_icon,
        .cutting_edge_bridge .button:focus-visible .arrow_button .arrow_icon {
          transform: translate(145%, -145%);
          opacity: 0;
        }

        .cutting_edge_bridge .button:hover .arrow_button::after,
        .cutting_edge_bridge .button:focus-visible .arrow_button::after {
          transform: translate(0, 0);
          opacity: 1;
        }

        .cutting_edge {
          background-color: var(--blue);
          width: auto;
          min-height: 159em;
          position: relative;
          overflow: visible;
          color: var(--white);
        }

        .cutting_edge .transition_cubes {
          z-index: 15;
          margin-top: 21em;
          position: relative;
        }

        .cutting_edge .pixel-transition {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 2;
          pointer-events: none;
          overflow: hidden;
          background: var(--px-from, #151515);
        }

        .cutting_edge .pixel-grid {
          position: relative;
          display: grid;
          justify-content: start;
          margin: 0;
          gap: 0 !important;
          line-height: 0;
          font-size: 0;
          transform: none !important;
        }

        .cutting_edge .pixel {
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

        .cutting_edge .pixel-transition.is-solid,
        .cutting_edge .pixel-transition.is-solid .pixel-grid {
          background: var(--px-solid, #044ab3) !important;
        }

        .cutting_edge .pixel-transition.is-solid .pixel {
          background: var(--px-solid, #044ab3) !important;
          box-shadow: 0 0 0 1px var(--px-solid, #044ab3) !important;
        }

        .cutting_edge .wrapper_general.cutting_edge_wrap {
          position: relative;
          padding: 13.25em 1.75rem 16em;
        }

        .cutting_edge .wrapper_general.cutting_edge_wrap > * {
          position: relative;
          z-index: 2;
        }

        .cutting_edge .heading_cutting {
          width: 70em;
        }

        .cutting_edge .h2 {
          color: var(--white);
          font-size: 5em;
          font-weight: 400;
          line-height: .95;
          letter-spacing: 0;
          margin: 0;
        }

        .cutting_edge .flow2-wrap {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
        }

        .cutting_edge .flow2-wrap.flow2-wrap--bottom {
          margin-top: -20.5em;
        }

        .cutting_edge .svg_flow {
          width: 100%;
          height: 100%;
        }

        .cutting_edge .c8-flow {
          position: absolute;
          left: 50%;
          top: 0;
          width: 100%;
          height: auto;
          display: block;
        }

        .cutting_edge .c8-flow--top {
          transform: translate(-50%, 220px);
        }

        .cutting_edge .c8-flow--bottom {
          transform: translate(-50%, 0);
        }

        .cutting_edge .c8-flow path {
          vector-effect: non-scaling-stroke;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .cutting_edge .c8-flow-pulse {
          fill: none;
          stroke: #fff;
          stroke-opacity: 1;
          stroke-width: .5;
          mix-blend-mode: screen;
          pointer-events: none;
          vector-effect: non-scaling-stroke;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .cutting_edge .content_ed {
          margin-top: 13.2em;
        }

        .cutting_edge .box_align.is-first {
          margin-left: 55%;
        }

        .cutting_edge .box_align.is-second {
          margin-top: 25em;
          margin-left: 20%;
        }

        .cutting_edge .box_align.is-third {
          margin-top: 15em;
          margin-left: 40%;
        }

        .cutting_edge .box_align.is-fourth {
          margin-top: 15em;
          margin-left: 20%;
        }

        .cutting_edge .content_box {
          display: flex;
          align-items: flex-start;
          gap: 1em;
        }

        .cutting_edge .cube_tag {
          background: var(--white);
          width: .7em;
          height: .7em;
          margin-top: .45em;
          flex: 0 0 auto;
        }

        .cutting_edge .flex_content {
          display: flex;
          flex-direction: column;
          gap: .625em;
        }

        .cutting_edge .txt_title {
          color: var(--white);
          font-size: 2.8em;
          font-weight: 400;
          line-height: 1.08;
          letter-spacing: 0;
        }

        .cutting_edge .p_ch {
          width: 40ch;
        }

        .cutting_edge .p_gen.smaller {
          color: var(--white);
          font-size: 1em;
          line-height: 1.22;
        }

        @media (max-width: 991px) {
          .cutting_edge_bridge .wrapper_general.sides {
            padding: 5em 1.25rem;
          }

          .cutting_edge_bridge .left_side {
            width: 50%;
            height: 42em;
          }

          .cutting_edge_bridge .right_side {
            width: 50%;
            padding: 0 2em;
          }

          .cutting_edge_bridge .bottom_flex {
            width: 54ch;
          }

          .cutting_edge .wrapper_general.cutting_edge_wrap {
            padding-top: 20em;
            padding-bottom: 35em;
          }

          .cutting_edge .h2 {
            font-size: 6.3em;
          }

          .cutting_edge .box_align.is-first {
            margin-left: 51%;
          }

          .cutting_edge .p_ch {
            width: 58ch;
          }

          .cutting_edge .c8-flow--top {
            transform: translate(-50%, 170px);
          }

          .cutting_edge .c8-flow--bottom {
            transform: translate(-50%, 420px);
          }
        }

        @media (max-width: 767px) {
          .cutting_edge_bridge .wrapper_general.sides {
            padding: 2rem 1rem 3.5rem;
          }

          .cutting_edge_bridge .sides_company {
            flex-direction: column;
          }

          .cutting_edge_bridge .left_side,
          .cutting_edge_bridge .right_side {
            width: 100%;
          }

          .cutting_edge_bridge .left_side {
            height: clamp(22rem, 88vw, 32rem);
          }

          .cutting_edge_bridge .right_side {
            margin-top: 2.25rem;
            padding: 0;
          }

          .cutting_edge_bridge .heading_side,
          .cutting_edge_bridge .bottom_flex {
            width: 100%;
            max-width: none;
          }

          .cutting_edge_bridge .h2.smallest {
            font-size: clamp(2.5rem, 10vw, 3.8rem);
          }

          .cutting_edge_bridge .content_bottom {
            margin-top: 2.25rem;
          }

          .cutting_edge_bridge .p_gen {
            font-size: clamp(1.02rem, 4vw, 1.25rem);
            line-height: 1.28;
          }

          .cutting_edge_bridge .button {
            width: 100%;
            font-size: 1.1rem;
            padding: .35rem .35rem .35rem 1rem;
          }

          .cutting_edge_bridge .arrow_button {
            width: 3rem;
            height: 3rem;
          }

          .cutting_edge {
            min-height: auto;
          }

          .cutting_edge .transition_cubes {
            margin-top: calc(24vw + 12px);
          }

          .cutting_edge .wrapper_general.cutting_edge_wrap {
            padding: 5.25rem 1rem 5rem;
          }

          .cutting_edge .heading_cutting {
            width: 100%;
          }

          .cutting_edge .h2 {
            font-size: clamp(3.5rem, 14vw, 4.5rem);
            line-height: 1.04;
          }

          .cutting_edge .flow2-wrap,
          .cutting_edge .flow2-wrap.flow2-wrap--bottom {
            display: none;
          }

          .cutting_edge .content_ed {
            margin-top: 4rem;
          }

          .cutting_edge .box_align.is-first,
          .cutting_edge .box_align.is-second,
          .cutting_edge .box_align.is-third,
          .cutting_edge .box_align.is-fourth {
            margin-left: 0;
            margin-top: 0;
          }

          .cutting_edge .box_align + .box_align {
            margin-top: 4.5rem;
          }

          .cutting_edge .content_box {
            gap: 1rem;
          }

          .cutting_edge .cube_tag {
            width: .45rem;
            height: .45rem;
            margin-top: .55rem;
          }

          .cutting_edge .txt_title {
            font-size: clamp(2rem, 8.5vw, 2.8rem);
          }

          .cutting_edge .p_ch {
            width: 100%;
          }

          .cutting_edge .p_gen.smaller {
            font-size: clamp(1rem, 4.1vw, 1.2rem);
            line-height: 1.3;
          }
        }

      `}</style>

<section id="cutting-edge" className="cutting_edge">

        <div className="transition_cubes">
            <div className="w-embed">
                <div ref={pixelTransitionRef} className="pixel-transition" data-from="#151515" data-to="#044AB3" data-accent="#6FE3FF" data-trigger-id="products" data-target-id="cutting-edge">
                    <div className="pixel-grid"></div>
                </div>
            </div>
        </div>
        <div className="wrapper_general cutting_edge_wrap">
            <div className="heading_cutting">
                <h2 className="h2">Engenharia avançada <br/>para mercados premium</h2>
            </div>
            <div className="flow2-wrap">
                <div className="svg_flow w-embed"><svg className="c8-flow c8-flow--top" width="100%" viewBox="0 0 1919 960" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
  <g clipPath="url(#c8clipTop)">
    <path id="c8flowTopMain" className="c8-flow-line c8-flow-line--top c8-flow-line--main" d="M2010.5 943.5H1366.5C1355.45 943.5 1346.5 934.546 1346.5 923.5V513C1346.5 501.954 1337.55 493 1326.5 493H1065.5C1054.45 493 1045.5 484.046 1045.5 473V258C1045.5 246.954 1036.55 238 1025.5 238H427C415.954 238 407 246.954 407 258V356C407 367.046 398.046 376 387 376H266C254.954 376 246 367.046 246 356V51C246 39.9543 237.046 31 226 31H-92" stroke="url(#c8gradTopMain)" strokeOpacity="0.35" strokeWidth="1" />
    <path id="c8flowTopSub" className="c8-flow-line c8-flow-line--top c8-flow-line--sub" d="M2037.5 926.5H1393.5C1382.45 926.5 1373.5 917.546 1373.5 906.5V496C1373.5 484.954 1364.55 476 1353.5 476H1092.5C1081.45 476 1072.5 467.046 1072.5 456V241C1072.5 229.954 1063.55 221 1052.5 221H454C442.954 221 434 229.954 434 241V339C434 350.046 425.046 359 414 359H293C281.954 359 273 350.046 273 339V34C273 22.9543 264.046 14 253 14H-65" stroke="url(#c8gradTopSub)" strokeOpacity="0.15" />

    <path id="c8pulseTopMain" className="c8-flow-pulse c8-flow-pulse--top c8-flow-pulse--main" d="M2010.5 943.5H1366.5C1355.45 943.5 1346.5 934.546 1346.5 923.5V513C1346.5 501.954 1337.55 493 1326.5 493H1065.5C1054.45 493 1045.5 484.046 1045.5 473V258C1045.5 246.954 1036.55 238 1025.5 238H427C415.954 238 407 246.954 407 258V356C407 367.046 398.046 376 387 376H266C254.954 376 246 367.046 246 356V51C246 39.9543 237.046 31 226 31H-92" stroke="white" fill="none" pathLength="1000" strokeDasharray="120 880" strokeDashoffset="1000" strokeWidth="0.5" />
    <path id="c8pulseTopSub" className="c8-flow-pulse c8-flow-pulse--top c8-flow-pulse--sub" d="M2037.5 926.5H1393.5C1382.45 926.5 1373.5 917.546 1373.5 906.5V496C1373.5 484.954 1364.55 476 1353.5 476H1092.5C1081.45 476 1072.5 467.046 1072.5 456V241C1072.5 229.954 1063.55 221 1052.5 221H454C442.954 221 434 229.954 434 241V339C434 350.046 425.046 359 414 359H293C281.954 359 273 350.046 273 339V34C273 22.9543 264.046 14 253 14H-65" stroke="white" fill="none" pathLength="1000" strokeDasharray="90 910" strokeDashoffset="1040" strokeWidth="0.5" />
  </g>
  <defs>
    <linearGradient id="c8gradTopMain" x1="74.5" y1="-16.9999" x2="1957" y2="967.5" gradientUnits="userSpaceOnUse">
      <stop stopColor="white" stopOpacity="0" />
      <stop offset="0.5" stopColor="white" />
      <stop offset="1" stopColor="white" stopOpacity="0" />
    </linearGradient>
    <linearGradient id="c8gradTopSub" x1="101.5" y1="-33.9999" x2="1984" y2="950.5" gradientUnits="userSpaceOnUse">
      <stop stopColor="white" stopOpacity="0" />
      <stop offset="0.5" stopColor="white" />
      <stop offset="1" stopColor="white" stopOpacity="0" />
    </linearGradient>
    <clipPath id="c8clipTop">
      <rect width="1919" height="960" fill="white" />
    </clipPath>
  </defs>
</svg></div>
                <div className="css_svgs w-embed">

                </div>
                <div className="gsap_svg w-embed w-script">

                </div>
            </div>
            <div className="content_ed">
                <div className="box_align is-first">
                    <div className="content_box">
                        <div className="cube_tag"></div>
                        <div className="flex_content">
                            <div>
                                <div className="txt_title">Sites Imersivos</div>
                            </div>
                            <div className="p_ch">
                                <div className="p_gen smaller">Desenvolvemos sites imersivos em Next.js, Three.js e GSAP para marcas high-ticket que precisam comunicar sofisticação técnica, velocidade e autoridade. Cada interface é planejada para ranquear localmente, impressionar decisores e converter visitas qualificadas.</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="box_align is-second">
                    <div className="content_box">
                        <div className="cube_tag"></div>
                        <div className="flex_content">
                            <div>
                                <div className="txt_title">SEO Local</div>
                            </div>
                            <div className="p_ch">
                                <div className="p_gen smaller">Estruturamos SEO local para Uberlândia e Triângulo Mineiro com arquitetura de páginas, conteúdo estratégico e sinais técnicos. O objetivo é posicionar serviços premium diante de buscas com intenção real de contratação.</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="box_align is-third">
                    <div className="content_box">
                        <div className="cube_tag"></div>
                        <div className="flex_content">
                            <div>
                                <div className="txt_title">Tráfego Cirúrgico</div>
                            </div>
                            <div className="p_ch">
                                <div className="p_gen smaller">Criamos campanhas para captar demanda qualificada com segmentação por região, nicho e intenção. A mídia trabalha integrada ao site, reduzindo dispersão e acelerando oportunidades comerciais.</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="box_align is-fourth">
                    <div className="content_box">
                        <div className="cube_tag"></div>
                        <div className="flex_content">
                            <div>
                                <div className="txt_title">Conversão Mensurável</div>
                            </div>
                            <div className="p_ch">
                                <div className="p_gen smaller">Conectamos performance, formulários, eventos e relatórios para medir cada etapa da jornada. Assim, a operação entende origem, qualidade e valor das oportunidades geradas pelo digital.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flow2-wrap flow2-wrap--bottom">
                <div className="svg_flow w-embed"><svg className="c8-flow c8-flow--bottom" width="100%" viewBox="0 0 1919 933" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
  <g clipPath="url(#c8clipBottom)">
    <path id="c8flowBottomMain" className="c8-flow-line c8-flow-line--bottom c8-flow-line--main" d="M2010.5 20H1366.5C1355.45 20 1346.5 28.9543 1346.5 40V450.5C1346.5 461.546 1337.55 470.5 1326.5 470.5H1065.5C1054.45 470.5 1045.5 479.454 1045.5 490.5V705.5C1045.5 716.546 1036.55 725.5 1025.5 725.5H427C415.954 725.5 407 716.546 407 705.5V607.5C407 596.454 398.046 587.5 387 587.5H266C254.954 587.5 246 596.454 246 607.5V912.5C246 923.546 237.046 932.5 226 932.5H-92" stroke="url(#c8gradBottomMain)" strokeOpacity="0.35" strokeWidth="1" />
    <path id="c8flowBottomSub" className="c8-flow-line c8-flow-line--bottom c8-flow-line--sub" d="M1983.5 37H1339.5C1328.45 37 1319.5 45.9543 1319.5 57V467.5C1319.5 478.546 1310.55 487.5 1299.5 487.5H1038.5C1027.45 487.5 1018.5 496.454 1018.5 507.5V722.5C1018.5 733.546 1009.55 742.5 998.5 742.5H400C388.954 742.5 380 733.546 380 722.5V624.5C380 613.454 371.046 604.5 360 604.5H239C227.954 604.5 219 613.454 219 624.5V929.5C219 940.546 210.046 949.5 199 949.5H-119" stroke="url(#c8gradBottomSub)" strokeOpacity="0.15" />

    <path id="c8pulseBottomMain" className="c8-flow-pulse c8-flow-pulse--bottom c8-flow-pulse--main" d="M2010.5 20H1366.5C1355.45 20 1346.5 28.9543 1346.5 40V450.5C1346.5 461.546 1337.55 470.5 1326.5 470.5H1065.5C1054.45 470.5 1045.5 479.454 1045.5 490.5V705.5C1045.5 716.546 1036.55 725.5 1025.5 725.5H427C415.954 725.5 407 716.546 407 705.5V607.5C407 596.454 398.046 587.5 387 587.5H266C254.954 587.5 246 596.454 246 607.5V912.5C246 923.546 237.046 932.5 226 932.5H-92" stroke="white" fill="none" pathLength="1000" strokeDasharray="120 880" strokeDashoffset="1000" strokeWidth="0.5" />
    <path id="c8pulseBottomSub" className="c8-flow-pulse c8-flow-pulse--bottom c8-flow-pulse--sub" d="M1983.5 37H1339.5C1328.45 37 1319.5 45.9543 1319.5 57V467.5C1319.5 478.546 1310.55 487.5 1299.5 487.5H1038.5C1027.45 487.5 1018.5 496.454 1018.5 507.5V722.5C1018.5 733.546 1009.55 742.5 998.5 742.5H400C388.954 742.5 380 733.546 380 722.5V624.5C380 613.454 371.046 604.5 360 604.5H239C227.954 604.5 219 613.454 219 624.5V929.5C219 940.546 210.046 949.5 199 949.5H-119" stroke="white" fill="none" pathLength="1000" strokeDasharray="90 910" strokeDashoffset="1040" strokeWidth="0.5" />
  </g>
  <defs>
    <linearGradient id="c8gradBottomMain" x1="74.5" y1="980.5" x2="1957" y2="-4.00009" gradientUnits="userSpaceOnUse">
      <stop stopColor="white" stopOpacity="0" />
      <stop offset="0.5" stopColor="white" />
      <stop offset="1" stopColor="white" stopOpacity="0" />
    </linearGradient>
    <linearGradient id="c8gradBottomSub" x1="47.5" y1="997.5" x2="1930" y2="12.9999" gradientUnits="userSpaceOnUse">
      <stop stopColor="white" stopOpacity="0" />
      <stop offset="0.5" stopColor="white" />
      <stop offset="1" stopColor="white" stopOpacity="0" />
    </linearGradient>
    <clipPath id="c8clipBottom">
      <rect width="1919" height="1007" fill="white" />
    </clipPath>
  </defs>
</svg></div>
            </div>
        </div>

</section>
    </div>
  );
};

export default CuttingEdgeSection;
