import React, { useEffect, useRef } from 'react';
import arrowDiagonal from '../../assets/images/arrow-diagonal.svg';

const HeroSection = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // ─── WebGL Circle — Cantor8 Hero Animation ───────────────────────────────
    const PAGE_BG = "#044AB3";
    const BASE_COLOR = "#FFFFFF";

    const CFG = {
      radiusFactor: 0.43,
      radiusFactorDesktop: 0.30,
      countDesktop: 130,
      countMobile: 110,
      dotMin: 2.0,
      dotMax: 3.3,
      lineWidth: 1.0,
      windAmpPx: 52,
      windFreq: 0.16,
      windPhaseDrift: 0.06,
      stiffness: 12.0,
      damping: 4.8,
      maxBendPx: 300,
      midBoost: 1.95,
      mouseRadius: 155,
      impulseForce: 3900,
      impulseFalloff: 1.7,
      globalRotateSpeed: 0.055,
      flowSpeed: 0.2,
      flowWidth: 0.3,
      flowBaseAlpha: 0.14,
      flowPeakAlpha: 0.58,
      labelPad: 10,
      labelOffsetMin: 26,
      labelOffsetMax: 40,
      labelClamp: 12,
      labelMinGapPx: 44,
      labelEdgePad: 14,
      labelClearDotPx: 8,
      labelNudgeStepPx: 3,
      labelNudgeMaxIters: 64,
      labelBatchSizeDesktop: 5,
      labelBatchSizeMobile: 3,
      labelInDur: 0.45,
      labelOutDur: 0.55,
      labelShowHoldMin: 1.0,
      labelShowHoldMax: 2.0,
      labelInStaggerMin: 0.14,
      labelInStaggerMax: 0.42,
      labelOutStaggerMin: 0.12,
      labelOutStaggerMax: 0.38,
      labelBatchGap: 0.25,
      resizeFullMinPx: 48,
      resizeFullMinRatio: 0.06,
      labelFontBreakpoints: [
        { minWidth: 0, px: 9 },
        { minWidth: 480, px: 10 },
        { minWidth: 768, px: 11 },
        { minWidth: 1024, px: 12 },
        { minWidth: 1280, px: 14 },
        { minWidth: 1536, px: 14 },
      ],
    };

    const TOKENS = [
      "SEO LOCAL...", "TRÁFEGO...", "PERFORMANCE...", "CONVERSÃO...",
      "DADOS...", "UX PREMIUM...", "WEBGL...", "AUTOMAÇÃO...",
      "RANQUEAMENTO...", "LEADS...", "ESTRATÉGIA...", "CRO...",
      "THREE.JS...", "GSAP...", "PRECISÃO...", "AQUISIÇÃO...",
    ];

    const wrap = document.getElementById("strings-wrap");
    const canvas = document.getElementById("strings-canvas");
    if (!wrap || !canvas) return;

    // eslint-disable-next-line no-unused-vars
    const viewport = wrap.closest(".strings-viewport") || wrap;

    const ctx = canvas.getContext("2d", { alpha: false });

    let w = 1, h = 1, cx = 0, cy = 0, R = 1, dpr = 1;
    let raf = 0, lastTs = performance.now(), rotation = 0;

    let isInViewport = true;
    let isPageVisible = document.visibilityState !== "hidden";
    let io = null;

    let nodes = [];
    let labels = [];
    let batchEndAt = 0;

    let resizeRaf = 0;
    let lastW = 0;
    let lastH = 0;
    let lastIsMobile = null;

    const mouse = { x: -9999, y: -9999, active: false, vx: 0, vy: 0, px: -9999, py: -9999 };
    const enablePointerFx = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const isTouchLike = !enablePointerFx;

    const mqDesktopRing = window.matchMedia("(min-width: 991px)");
    const mqMobile = window.matchMedia("(max-width: 767px)");

    function isMobile() {
      return mqMobile.matches;
    }

    function ringFactorForViewport() {
      return mqDesktopRing.matches ? CFG.radiusFactorDesktop : CFG.radiusFactor;
    }

    function labelFontPx() {
      const width = wrap.clientWidth;
      let px = CFG.labelFontBreakpoints[0].px;
      for (let i = 0; i < CFG.labelFontBreakpoints.length; i++) {
        const step = CFG.labelFontBreakpoints[i];
        if (width >= step.minWidth) px = step.px;
      }
      return px;
    }

    function textBounds(text, x, y, align) {
      const m = ctx.measureText(text);
      const fh = labelFontPx();
      const tw = m.width;
      const ascent = m.actualBoundingBoxAscent ?? fh * 0.72;
      const descent = m.actualBoundingBoxDescent ?? fh * 0.28;
      let left;
      let right;
      if (align === "left") {
        left = x;
        right = x + tw;
      } else {
        right = x;
        left = x - tw;
      }
      return {
        left,
        right,
        top: y - ascent,
        bottom: y + descent,
      };
    }

    function circleIntersectsRect(px, py, pr, b) {
      const closestX = Math.max(b.left, Math.min(px, b.right));
      const closestY = Math.max(b.top, Math.min(py, b.bottom));
      const dx = px - closestX;
      const dy = py - closestY;
      return dx * dx + dy * dy < pr * pr;
    }

    function clampLabelDrawXY(text, x, y, nx) {
      const align = nx >= 0 ? "left" : "right";
      const padX = CFG.labelClamp;
      const fh = labelFontPx();
      const padY = Math.max(CFG.labelClamp, fh * 0.65);
      const m = ctx.measureText(text);
      const tw = m.width;

      let tx = x;
      if (align === "left") {
        if (tx < padX) tx = padX;
        if (tx + tw > w - padX) tx = w - padX - tw;
      } else {
        if (tx > w - padX) tx = w - padX;
        if (tx - tw < padX) tx = padX + tw;
      }

      let ty = y;
      const ascent = m.actualBoundingBoxAscent ?? fh * 0.72;
      const descent = m.actualBoundingBoxDescent ?? fh * 0.28;
      if (ty - ascent < padY) ty = padY + ascent;
      if (ty + descent > h - padY) ty = h - padY - descent;

      return { x: tx, y: ty, align };
    }

    function placeLabelClearDot(text, x0, y0, nx, ny, ex, ey, dotR) {
      const step = CFG.labelNudgeStepPx;
      const maxIters = CFG.labelNudgeMaxIters;
      const rr = dotR + CFG.labelClearDotPx;

      let x = x0;
      let y = y0;

      for (let k = 0; k < maxIters; k++) {
        const placed = clampLabelDrawXY(text, x, y, nx);
        const b = textBounds(text, placed.x, placed.y, placed.align);
        if (!circleIntersectsRect(ex, ey, rr, b)) return placed;
        x += nx * step;
        y += ny * step;
      }

      return clampLabelDrawXY(text, x, y, nx);
    }

    function labelRadialBase() {
      const fh = labelFontPx();
      return Math.max(22 + CFG.labelPad, CFG.dotMax + CFG.labelClearDotPx + fh * 0.85);
    }

    function hash(n) {
      const x = Math.sin(n * 127.1) * 43758.5453123;
      return x - Math.floor(x);
    }

    function rand(min, max) {
      return min + Math.random() * (max - min);
    }

    function shuffle(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = (Math.random() * (i + 1)) | 0;
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    }

    function resize() {
      w = Math.max(1, wrap.clientWidth);
      h = Math.max(1, wrap.clientHeight);
      cx = w * 0.5;
      cy = h * 0.5;
      R = Math.min(w, h) * ringFactorForViewport();

      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function buildNodes() {
      const count = isMobile() ? CFG.countMobile : CFG.countDesktop;
      nodes = new Array(count);

      for (let i = 0; i < count; i++) {
        const baseAngle = (i / count) * Math.PI * 2;
        const seed = i * 19.37;

        nodes[i] = {
          baseAngle,
          dotR: CFG.dotMin + hash(seed + 9.9) * (CFG.dotMax - CFG.dotMin),
          nx: 0, ny: 0,
          bend: 0, vel: 0,
          phase: hash(seed + 1.1) * Math.PI * 2,
          freqJ: 0.65 + hash(seed + 2.7) * 0.7,
          ampJ: 0.75 + hash(seed + 4.8) * 0.8,
        };
      }
    }

    function endpointForIndex(i) {
      const n = nodes[i];
      const a = n.baseAngle + rotation;
      return { a, x: cx + Math.cos(a) * R, y: cy + Math.sin(a) * R };
    }

    function pointLineDistanceWithT(px, py, x1, y1, x2, y2) {
      const vx = x2 - x1, vy = y2 - y1;
      const wx = px - x1, wy = py - y1;
      const c2 = vx * vx + vy * vy || 1;
      let t = (wx * vx + wy * vy) / c2;
      if (t < 0) t = 0;
      if (t > 1) t = 1;
      const sx = x1 + t * vx;
      const sy = y1 + t * vy;
      return { d: Math.hypot(px - sx, py - sy), t };
    }

    function updatePointerFromClient(clientX, clientY) {
      const r = canvas.getBoundingClientRect();

      if (clientX < r.left || clientX > r.right || clientY < r.top || clientY > r.bottom) {
        mouse.active = false;
        mouse.vx = mouse.vy = 0;
        return;
      }

      const sx = w / r.width;
      const sy = h / r.height;
      const nx = (clientX - r.left) * sx;
      const ny = (clientY - r.top) * sy;

      mouse.vx = nx - mouse.px;
      mouse.vy = ny - mouse.py;
      mouse.px = nx;
      mouse.py = ny;
      mouse.x = nx;
      mouse.y = ny;
      mouse.active = true;
    }

    function pickLabelText() {
      return TOKENS[(Math.random() * TOKENS.length) | 0];
    }

    function canPlaceLabel(x, y, chosen) {
      for (let i = 0; i < chosen.length; i++) {
        const d = Math.hypot(x - chosen[i].x, y - chosen[i].y);
        if (d < CFG.labelMinGapPx) return false;
      }
      return true;
    }

    function minLabelSpawnRadial() {
      return labelRadialBase() + CFG.labelOffsetMin * 0.35;
    }

    function buildLabelBatch(nowSec) {
      const batchSize = isMobile() ? CFG.labelBatchSizeMobile : CFG.labelBatchSizeDesktop;
      const chosen = [];
      const usedNode = new Set();
      let tries = 0;

      const r0 = minLabelSpawnRadial();

      while (chosen.length < batchSize && tries < 1600) {
        tries++;
        const nodeIndex = (Math.random() * nodes.length) | 0;
        if (usedNode.has(nodeIndex)) continue;

        const ep = endpointForIndex(nodeIndex);
        const nx = Math.cos(ep.a);
        const ny = Math.sin(ep.a);

        let x = ep.x + nx * (rand(r0, r0 + (CFG.labelOffsetMax - CFG.labelOffsetMin)) + CFG.labelPad);
        let y = ep.y + ny * (rand(CFG.labelOffsetMin, CFG.labelOffsetMax) + CFG.labelPad);

        if (Math.abs(nx) < 0.35) x += (nx >= 0 ? 1 : -1) * 10;
        y += rand(-10, 10);

        x = Math.max(CFG.labelEdgePad, Math.min(w - CFG.labelEdgePad, x));
        y = Math.max(CFG.labelEdgePad, Math.min(h - CFG.labelEdgePad, y));

        if (!canPlaceLabel(x, y, chosen)) continue;

        chosen.push({ nodeIndex, text: pickLabelText(), x, y });
        usedNode.add(nodeIndex);
      }

      while (chosen.length < batchSize) {
        const nodeIndex = (Math.random() * nodes.length) | 0;
        const ep = endpointForIndex(nodeIndex);
        const nx = Math.cos(ep.a);
        const ny = Math.sin(ep.a);
        const rr = minLabelSpawnRadial();
        let x = ep.x + nx * (rand(rr, rr + 24) + CFG.labelPad);
        let y = ep.y + ny * (rand(CFG.labelOffsetMin, CFG.labelOffsetMax) + CFG.labelPad);
        x = Math.max(CFG.labelEdgePad, Math.min(w - CFG.labelEdgePad, x));
        y = Math.max(CFG.labelEdgePad, Math.min(h - CFG.labelEdgePad, y));
        chosen.push({ nodeIndex, text: pickLabelText(), x, y });
      }

      const inOrder = shuffle([...Array(batchSize).keys()]);
      const outOrder = shuffle([...Array(batchSize).keys()]);
      const inDelay = new Array(batchSize).fill(0);
      const outDelay = new Array(batchSize).fill(0);

      let accIn = 0;
      for (let k = 0; k < batchSize; k++) {
        const idx = inOrder[k];
        inDelay[idx] = accIn;
        accIn += rand(CFG.labelInStaggerMin, CFG.labelInStaggerMax);
      }

      const hold = rand(CFG.labelShowHoldMin, CFG.labelShowHoldMax);
      let accOut = accIn + hold;
      for (let k = 0; k < batchSize; k++) {
        const idx = outOrder[k];
        outDelay[idx] = accOut;
        accOut += rand(CFG.labelOutStaggerMin, CFG.labelOutStaggerMax);
      }

      labels = chosen.map((c, i) => ({
        ...c,
        inStart: nowSec + inDelay[i],
        inEnd: nowSec + inDelay[i] + CFG.labelInDur,
        outStart: nowSec + outDelay[i],
        outEnd: nowSec + outDelay[i] + CFG.labelOutDur,
      }));

      batchEndAt = Math.max(...labels.map((l) => l.outEnd)) + CFG.labelBatchGap;
    }

    function labelAlpha(nowSec, lb) {
      if (nowSec < lb.inStart) return 0;
      if (nowSec < lb.inEnd) return (nowSec - lb.inStart) / Math.max(0.0001, CFG.labelInDur);
      if (nowSec < lb.outStart) return 1;
      if (nowSec < lb.outEnd) return 1 - (nowSec - lb.outStart) / Math.max(0.0001, CFG.labelOutDur);
      return 0;
    }

    function cycDist(a, b) {
      const d = Math.abs(a - b);
      return Math.min(d, 1 - d);
    }

    function pulseAlpha(u, phase, width, base, peak) {
      const d = cycDist(u, phase);
      const x = Math.max(0, 1 - d / width);
      const s = x * x * (3 - 2 * x);
      return base + (peak - base) * s;
    }

    function stopLoop() {
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    }

    function startLoop() {
      if (!raf && isInViewport && isPageVisible) {
        lastTs = performance.now();
        raf = requestAnimationFrame(draw);
      }
    }

    function syncLoopState() {
      if (isInViewport && isPageVisible) startLoop();
      else stopLoop();
    }

    function draw(ts) {
      const dt = Math.min(0.033, (ts - lastTs) / 1000);
      lastTs = ts;
      const t = ts * 0.001;
      const flowPhase = (t * CFG.flowSpeed) % 1;

      rotation += CFG.globalRotateSpeed * dt;

      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
      ctx.fillStyle = PAGE_BG;
      ctx.fillRect(0, 0, w, h);

      const drift = t * CFG.windPhaseDrift;
      ctx.lineWidth = CFG.lineWidth;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const a = n.baseAngle + rotation;
        const ex = cx + Math.cos(a) * R;
        const ey = cy + Math.sin(a) * R;

        const dx = ex - cx;
        const dy = ey - cy;
        const len = Math.hypot(dx, dy) || 1;
        n.nx = -dy / len;
        n.ny = dx / len;

        const baseBend = Math.sin(t * CFG.windFreq * n.freqJ + n.phase + drift) * (CFG.windAmpPx * n.ampJ);

        if (enablePointerFx && mouse.active) {
          const hit = pointLineDistanceWithT(mouse.x, mouse.y, cx, cy, ex, ey);
          if (hit.d < CFG.mouseRadius) {
            const f = 1 - hit.d / CFG.mouseRadius;
            const falloff = Math.pow(f, CFG.impulseFalloff);
            const along = Math.sin(Math.PI * hit.t);
            const side = Math.sign((mouse.x - cx) * dy - (mouse.y - cy) * dx) || 1;
            const mouseSpeed = Math.hypot(mouse.vx, mouse.vy);
            const speedGain = Math.min(2.2, 0.55 + mouseSpeed * 0.085);
            const impulse = side * falloff * along * CFG.impulseForce * speedGain;
            n.vel += impulse * dt;
          }
        }

        const acc = -CFG.stiffness * (n.bend - baseBend) - CFG.damping * n.vel;
        n.vel += acc * dt;
        n.bend += n.vel * dt;

        if (n.bend > CFG.maxBendPx) n.bend = CFG.maxBendPx;
        if (n.bend < -CFG.maxBendPx) n.bend = -CFG.maxBendPx;

        const mx = (cx + ex) * 0.5;
        const my = (cy + ey) * 0.5;
        const cpx = mx + n.nx * n.bend * CFG.midBoost;
        const cpy = my + n.ny * n.bend * CFG.midBoost;

        const g = ctx.createLinearGradient(cx, cy, ex, ey);
        const stops = 5;
        for (let si = 0; si <= stops; si++) {
          const u = si / stops;
          const aPulse = pulseAlpha(u, flowPhase, CFG.flowWidth, CFG.flowBaseAlpha, CFG.flowPeakAlpha);
          g.addColorStop(u, `rgba(255,255,255,${aPulse.toFixed(4)})`);
        }

        ctx.strokeStyle = g;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.quadraticCurveTo(cpx, cpy, ex, ey);
        ctx.stroke();
      }

      ctx.fillStyle = BASE_COLOR;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i].baseAngle + rotation;
        const ex = cx + Math.cos(a) * R;
        const ey = cy + Math.sin(a) * R;
        ctx.beginPath();
        ctx.arc(ex, ey, nodes[i].dotR, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!labels.length || t >= batchEndAt) buildLabelBatch(t);

      ctx.font = `${labelFontPx()}px "FRAGMENT Mono", "Fragment Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`;
      ctx.textBaseline = "middle";
      ctx.fillStyle = BASE_COLOR;

      const radBase = labelRadialBase();

      for (let i = 0; i < labels.length; i++) {
        const lb = labels[i];
        const a = labelAlpha(t, lb);
        if (a <= 0.001) continue;

        const ep = endpointForIndex(lb.nodeIndex);
        const nx = Math.cos(ep.a);
        const ny = Math.sin(ep.a);

        let x = ep.x + nx * radBase;
        let y = ep.y + ny * radBase;

        if (Math.abs(nx) < 0.35) x += (nx >= 0 ? 1 : -1) * 10;

        x = Math.max(CFG.labelClamp, Math.min(w - CFG.labelClamp, x));
        y = Math.max(CFG.labelClamp, Math.min(h - CFG.labelClamp, y));

        const dotR = nodes[lb.nodeIndex].dotR;
        const placed = placeLabelClearDot(lb.text, x, y, nx, ny, ep.x, ep.y, dotR);
        ctx.textAlign = placed.align;
        ctx.globalAlpha = a * 0.95;
        ctx.fillText(lb.text, placed.x, placed.y);
        ctx.globalAlpha = 1;
      }

      ctx.fillStyle = BASE_COLOR;
      ctx.beginPath();
      ctx.arc(cx, cy, 2.2, 0, Math.PI * 2);
      ctx.fill();

      if (isInViewport && isPageVisible) {
        raf = requestAnimationFrame(draw);
      } else {
        raf = 0;
      }
    }

    function start() {
      stopLoop();
      resize();
      buildNodes();
      labels = [];
      batchEndAt = 0;
      lastIsMobile = isMobile();
      lastW = w;
      lastH = h;
      syncLoopState();
    }

    function resizeSoft() {
      resize();
      const m = isMobile();
      if (lastIsMobile !== null && m !== lastIsMobile) {
        buildNodes();
        labels = [];
        batchEndAt = 0;
      }
      lastIsMobile = m;
      lastW = w;
      lastH = h;
      syncLoopState();
    }

    function scheduleStart() {
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => {
        resizeRaf = 0;
        start();
      });
    }

    function isBigResize(nextW, nextH) {
      const dw = Math.abs(nextW - lastW);
      const dh = Math.abs(nextH - lastH);
      const minPx = CFG.resizeFullMinPx;
      const ratio = CFG.resizeFullMinRatio;
      return (
        dw >= minPx ||
        dh >= minPx ||
        dw / Math.max(1, lastW) >= ratio ||
        dh / Math.max(1, lastH) >= ratio
      );
    }

    function smartResize() {
      const nextW = Math.max(1, wrap.clientWidth);
      const nextH = Math.max(1, wrap.clientHeight);

      if (!lastW || !lastH) {
        scheduleStart();
        return;
      }

      const dw = Math.abs(nextW - lastW);
      const dh = Math.abs(nextH - lastH);

      if (!isTouchLike) {
        if (isBigResize(nextW, nextH)) scheduleStart();
        else if (dw >= 1 || dh >= 1) resizeSoft();
        return;
      }

      if (dw >= 2) {
        scheduleStart();
        return;
      }

      const hThreshold = Math.max(80, lastH * 0.12);
      if (dh >= hThreshold) scheduleStart();
    }

    // ── Event Listeners ──────────────────────────────────────────────────────
    const onMouseMove = (e) => updatePointerFromClient(e.clientX, e.clientY);
    const onMouseLeave = () => { mouse.active = false; mouse.vx = mouse.vy = 0; };
    const onBlur = () => { mouse.active = false; mouse.vx = mouse.vy = 0; };
    const onVisibilityChange = () => {
      isPageVisible = document.visibilityState !== "hidden";
      syncLoopState();
    };

    if (enablePointerFx) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseleave", onMouseLeave);
      window.addEventListener("blur", onBlur);
    }

    mqDesktopRing.addEventListener("change", resizeSoft);
    mqMobile.addEventListener("change", resizeSoft);

    const ro = new ResizeObserver(smartResize);
    ro.observe(wrap);

    window.addEventListener("resize", smartResize, { passive: true });
    let vvResizeAdded = false;
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", smartResize, { passive: true });
      vvResizeAdded = true;
    }

    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          const e = entries[0];
          isInViewport = !!(e && e.isIntersecting);
          syncLoopState();
        },
        { root: null, threshold: [0, 0.01, 0.05, 0.1, 0.25, 0.5] },
      );
      io.observe(wrap);
    }

    document.addEventListener("visibilitychange", onVisibilityChange);

    start();

    // ── Cleanup ──────────────────────────────────────────────────────────────
    return () => {
      stopLoop();
      if (resizeRaf) { cancelAnimationFrame(resizeRaf); resizeRaf = 0; }

      if (enablePointerFx) {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseleave", onMouseLeave);
        window.removeEventListener("blur", onBlur);
      }

      mqDesktopRing.removeEventListener("change", resizeSoft);
      mqMobile.removeEventListener("change", resizeSoft);

      ro.disconnect();

      window.removeEventListener("resize", smartResize);
      if (vvResizeAdded) {
        window.visualViewport.removeEventListener("resize", smartResize);
      }

      if (io) { io.disconnect(); io = null; }

      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  // ─── Line-reveal for hero button (global scope, matching original) ────────
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 992px) and (hover: hover) and (pointer: fine)");
    if (!mq.matches) return;

    function wrapLineRevealText(el) {
      if (!el || el.querySelector(".line-inner")) return;
      const txt = (el.textContent || "").trim();
      if (!txt) return;
      el.textContent = "";
      const inner = document.createElement("span");
      inner.className = "line-inner";
      inner.dataset.text = txt;
      inner.textContent = txt;
      el.appendChild(inner);
    }

    // Small delay to ensure DOM is rendered
    const timer = setTimeout(() => {
      document.querySelectorAll(".button .flex_button_general > div:first-child").forEach(wrapLineRevealText);
    }, 150);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main id="home" className="hero" data-w-id="73460546-1c27-b984-0a91-f8223b58b0eb">
      <style>{`
        .hero {
          width: 100vw;
          height: 100vh;
          position: relative;
          overflow: hidden;
          background-color: transparent;
        }

        .wrapper_hero {
          z-index: 15;
          flex-flow: column;
          width: 100%;
          height: 100%;
          padding: 8.5rem 1.75rem 2.5em;
          display: flex;
          position: relative;
        }

        .flexbox_hero {
          justify-content: flex-end;
          align-items: flex-end;
          margin-top: auto;
          display: flex;
        }

        .heading_hero {
          grid-row-gap: 1.25em;
          flex-flow: column;
          justify-content: flex-start;
          align-items: flex-start;
          margin-top: auto;
          display: flex;
          width: 100%;
        }

        .hero_headline {
          width: 100%;
        }

        .h1 {
          font-size: 3.9em;
          color: #fff;
          font-weight: 400;
          margin: 0;
        }

        .button_wrap {
          justify-content: flex-start;
          align-items: flex-start;
          display: flex;
        }

        .button {
          background-color: var(--white);
          color: var(--blue);
          letter-spacing: 0;
          border-radius: .1875em;
          padding: .25em .25em .25em 1em;
          font-size: .95em;
          font-weight: 500;
          text-decoration: none;
          transition: opacity 320ms;
        }

        .button:hover {
          opacity: 0.9;
        }

        .flex_button_general {
          grid-column-gap: 4.5em;
          justify-content: flex-start;
          align-items: center;
          display: flex;
        }

        .arrow_button {
          background-color: var(--blue);
          border-radius: .1875em;
          width: 2.375em;
          height: 2.375em;
          padding: .625em;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .arrow_icon {
          background-image: url('${arrowDiagonal}');
          background-position: 50%;
          background-repeat: no-repeat;
          background-size: contain;
          width: 100%;
          height: 100%;
        }

        .caption {
          opacity: .65;
          letter-spacing: -.02em;
          text-transform: uppercase;
          margin-left: auto;
          font-family: 'Fragment Mono', sans-serif;
          font-size: .82em;
        }

        .background_webgl {
          position: absolute;
          inset: 0;
          z-index: 5;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .main {
          width: 100vw;
          height: 100vh;
          margin-bottom: 0;
        }

        .strings-viewport {
          width: 100%;
          height: 100vh;
          min-height: 560px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #044ab3;
          --strings-scale: clamp(0.72, 0.62 + 0.45vw, 0.9);
        }

        @media (min-width: 991px) {
          .strings-viewport {
            --strings-scale: 0.64;
          }
        }

        #strings-wrap {
          width: calc(100% / var(--strings-scale));
          height: calc(100vh / var(--strings-scale));
          min-height: calc(560px / var(--strings-scale));
          transform: scale(var(--strings-scale));
          transform-origin: center center;
          will-change: transform;
        }

        #strings-canvas {
          display: block;
          width: 100%;
          height: 100%;
        }

        @media (max-width: 990px) {
          .strings-viewport {
            --strings-scale: 0.58;
          }
          .wrapper_hero {
            padding: 7rem 1.25rem 4em;
          }
          .arrow_button {
            border-radius: 3px;
          }
          .heading_hero {
            grid-row-gap: 2.5em;
          }
          .h1 {
            font-size: 5.6em;
          }
          .caption {
            font-size: 1.25em;
          }
        }

        @media (max-width: 767px) {
          .wrapper_hero {
            padding: 6.5rem 1rem 4em;
          }

          .caption {
            display: none;
          }

          .button_wrap {
            width: min(100%, 34rem);
          }

          .button {
            width: 100%;
          }

          .flex_button_general {
            justify-content: space-between;
            gap: 1rem;
            width: 100%;
          }
        }

        @media (max-width: 479px) {
          .strings-viewport {
            --strings-scale: 0.94;
          }
          .background_webgl {
            margin-top: -6em;
            margin-bottom: 0;
            bottom: 0%;
          }
          .wrapper_hero {
            height: 100svh;
            padding: 0 0.75rem 0.75rem;
          }
          .arrow_button {
            width: 42px;
            height: 42px;
            margin-left: auto;
            padding: .8rem;
          }
          .button {
            width: 100%;
            min-width: 0;
            font-size: 1.15em;
          }
          .button_wrap {
            width: 100%;
            max-width: 23rem;
          }
          .heading_hero {
            grid-row-gap: 14px;
            width: 100%;
          }
          .h1 {
            font-size: clamp(2.35rem, 10.3vw, 3.15rem);
            line-height: 1;
          }
          .flexbox_hero {
            flex-flow: column;
            justify-content: flex-end;
            align-items: flex-start;
            min-height: 100%;
          }
          .caption {
            position: absolute;
            right: 1rem;
            bottom: 0.8rem;
            display: none;
            width: 10ch;
            margin-top: 0;
            font-size: 0.58rem;
            line-height: 1.05;
          }
          .hero_headline {
            width: 100%;
            max-width: 30rem;
          }
        }

        /* ═══════════════════════════════════════════════════════════════════
           HERO BUTTON — Arrow hover animation (ported from original)
           ═══════════════════════════════════════════════════════════════════ */
        @media (min-width: 992px) and (hover: hover) and (pointer: fine) {
          .button_wrap .button .arrow_button {
            position: relative;
            width: 38px;
            height: 38px;
            overflow: hidden;
          }
          .button_wrap .button .arrow_button .arrow_icon {
            position: absolute;
            left: 50%;
            top: 50%;
            width: 16px;
            height: 16px;
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
            transition: transform 620ms cubic-bezier(0.22, 1, 0.36, 1),
                        opacity 620ms cubic-bezier(0.22, 1, 0.36, 1);
            z-index: 2;
          }
          .button_wrap .button .arrow_button::after {
            content: "";
            position: absolute;
            left: 50%;
            top: 50%;
            width: 16px;
            height: 16px;
            background: url('${arrowDiagonal}') center/contain no-repeat;
            transform: translate(calc(-50% - 24px), calc(-50% + 24px)) scale(.85);
            opacity: 0;
            transition: transform 620ms cubic-bezier(0.22, 1, 0.36, 1),
                        opacity 620ms cubic-bezier(0.22, 1, 0.36, 1);
            z-index: 1;
          }
          .button_wrap .button:hover .arrow_button .arrow_icon,
          .button_wrap .button:focus-visible .arrow_button .arrow_icon {
            transform: translate(calc(-50% + 24px), calc(-50% - 24px)) scale(.85);
            opacity: 0;
          }
          .button_wrap .button:hover .arrow_button::after,
          .button_wrap .button:focus-visible .arrow_button::after {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }

          /* Hero button line-reveal */
          .button .flex_button_general > div:first-child {
            position: relative;
            display: block;
            overflow: hidden;
            height: 1.25em;
            line-height: 1.25em;
          }
          .button .flex_button_general > div:first-child .line-inner {
            position: relative;
            display: block;
            transform: translateY(0%);
            transition: transform 950ms cubic-bezier(0.16, 1, 0.3, 1);
            will-change: transform;
          }
          .button .flex_button_general > div:first-child .line-inner::after {
            content: attr(data-text);
            position: absolute;
            left: 0;
            top: 100%;
            white-space: nowrap;
          }
          .button:hover .flex_button_general > div:first-child .line-inner,
          .button:focus-visible .flex_button_general > div:first-child .line-inner {
            transform: translateY(-100%);
          }
        }
      `}</style>

      <div className="wrapper_hero">
        <div className="flexbox_hero">
          <div className="heading_hero">
            <div className="hero_headline">
              <h1 className="h1">
                Engenharia Digital<br />
                de Alto Padrão
              </h1>
            </div>
            <div className="button_wrap">
              <a href="#cta-section" className="button w-inline-block">
                <div className="flex_button_general">
                  <div>Entre em contato</div>
                  <div className="arrow_button">
                    <div className="arrow_icon"></div>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div className="caption">
            <div>role para baixo</div>
          </div>
        </div>
      </div>

      <div className="background_webgl">
        <div className="main webgl_fin w-embed">
          <div className="strings-viewport">
            <div id="strings-wrap">
              <canvas
                ref={canvasRef}
                id="strings-canvas"
                style={{
                  display: 'block',
                  width: '100%',
                  height: '100%',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HeroSection;
