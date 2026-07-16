/**
 * ServicoLanding.jsx — Template de Landing Page Off-Data
 * =========================================================
 * INSTRUÇÕES DE USO:
 *  1. Duplique este arquivo e renomeie: ex. SeoLocalLanding.jsx
 *  2. Substitua todos os textos entre [colchetes] pelo copy real
 *  3. Substitua todas as divs .img-placeholder pelas imagens reais
 *  4. Ajuste NOME_DO_SERVICO na constante abaixo
 *
 * IDENTIDADE VISUAL: Off-Data Design System v1.0
 *   --blue:  #044ab3  --black: #151515  --white: #ffffff
 *   Fontes: PP Neue Montreal (principal) + Fragment Mono (técnica)
 *   Breakpoints: 991px | 767px | 479px
 * =========================================================
 */

import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import offDataWhiteLogo from '../assets/images/Off - Data-branca.svg';
import SharedPortfolioCarousel from '../components/SharedPortfolioCarousel';
import { realEstatePortfolioItems } from '../constants/portfolioData';

function useCountUp(targetString, duration = 1800) {
  const [value, setValue] = useState("0");
  const hasAnimatedRef = useRef(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setValue(targetString);
      return;
    }

    const match = targetString.match(/^(\D*)(\d+)(\D*)$/);
    if (!match) {
      setValue(targetString);
      return;
    }

    const prefix = match[1] || '';
    const targetNumber = parseInt(match[2], 10);
    const suffix = match[3] || '';

    setValue(`${prefix}0${suffix}`);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          
          let startTime = null;
          const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            
            const currentNumber = Math.floor(easedProgress * targetNumber);
            setValue(`${prefix}${currentNumber}${suffix}`);
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setValue(targetString);
            }
          };
          
          requestAnimationFrame(animate);
          if (elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        }
      },
      { threshold: 0.4 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [targetString, duration]);

  return { ref: elementRef, value };
}

/* ── Constante de configuração rápida ─────────────────── */
const CONFIG = {
  nomePagina:     'Criação de Sites em Uberlândia',           // Ex: "SEO Local Uberlândia"
  whatsappUrl:    'https://wa.me/5534992362596?text=Ol%C3%A1%2C%20vim%20pela%20Landing%20Page%20da%20Off-Data%20e%20quero%20falar%20com%20a%20equipe.',
  logoUrl:        null,                          // Passar URL do logo SVG ou null
  logoAlt:        'Off-Data',
};

const heroDesktopImg = '/imagens/home-pagina-venda01.avif';
const heroMobileImg = '/imagens/home-pagina-venda01-mobile.avif';

/* ═══════════════════════════════════════════════════════
   ESTILOS GLOBAIS — injetados via <style> para garantir
   que os tokens Off-Data funcionem sem Tailwind config
   ═══════════════════════════════════════════════════════ */
const GLOBAL_CSS = `
  /* ── Tokens Off-Data ── */
  :root {
    --blue:             #044ab3;
    --black:            #151515;
    --white:            #ffffff;
    --gray-light:       #aaa;
    --gray-lighter:     #666;
    --font-main:        'PP Neue Montreal', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    --font-mono:        'Fragment Mono', 'Courier New', monospace;
    --radius-btn:       0.1875em;
    --radius-card:      0.375em;
    --radius-pill:      0.25em;
    --ease-spring:      cubic-bezier(0.22, 1, 0.36, 1);
    --transition-hover: opacity 320ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  /* ── Reset mínimo ── */
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }
  img, svg { display: block; max-width: 100%; height: auto; }
  a { color: inherit; text-decoration: none; }

  /* ── Body ── */
  .lp-root {
    font-family: var(--font-main);
    font-size: 1vw;
    line-height: 1;
    color: var(--white);
    background: var(--black);
    overflow-x: hidden;
  }

  @media (max-width: 991px)  { .lp-root { font-size: 1.6vw; } }
  @media (max-width: 767px)  { .lp-root { font-size: 2.2vw; } }
  @media (max-width: 479px)  { .lp-root { font-size: 3.5vw; } }

  /* ══════════════════════════════════════════════════════
     CONTAINER PADRÃO
  ══════════════════════════════════════════════════════ */
  .offdata-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 6.5em 1.75rem;
    width: 100%;
  }
  @media (max-width: 767px) { .offdata-container { padding: 5em 1.25rem; } }
  @media (max-width: 479px) { .offdata-container { padding: 4em 0.75rem; } }

  .offdata-container--hero   { padding-top: 8.5rem; padding-bottom: 2.5em; }
  .offdata-container--tight  { padding-top: 6em; padding-bottom: 6em; }
  .offdata-container--footer { padding-top: 4.5em; padding-bottom: 1.5em; }

  /* ══════════════════════════════════════════════════════
     SEÇÕES
  ══════════════════════════════════════════════════════ */
  .offdata-section          { position: relative; width: 100%; }
  .offdata-section--dark    { background: var(--black); color: var(--white); }
  .offdata-section--blue    { background: var(--blue);  color: var(--white); }
  .offdata-section--light   { background: var(--white); color: var(--blue);  }
  .offdata-section--hero    {
    background: linear-gradient(135deg, #0a0f20 0%, #044ab3 60%, #0a1a3a 100%);
    color: var(--white);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  /* ══════════════════════════════════════════════════════
     TIPOGRAFIA
  ══════════════════════════════════════════════════════ */
  .offdata-h1 {
    font-size: 3.9em;
    font-weight: 400;
    color: var(--white);
    line-height: 1.0;
    margin: 0;
    letter-spacing: -0.02em;
  }
  @media (max-width: 479px) {
    .offdata-h1 { font-size: clamp(2.35rem, 10.3vw, 3.15rem); }
  }

  .offdata-h2 {
    font-size: clamp(2.5rem, 4vw, 3.2em);
    font-weight: 400;
    line-height: 1.05;
    letter-spacing: -0.025em;
    color: currentColor;
    margin: 0;
  }

  .offdata-h2--big {
    font-size: clamp(3rem, 6.5vw, 6em);
    letter-spacing: -0.03em;
    line-height: 1.0;
  }

  .offdata-body {
    font-size: 1em;
    font-weight: 400;
    line-height: 1.55;
    color: rgba(255,255,255,0.65);
  }

  .offdata-body--blue { color: rgba(4, 74, 179, 0.75); }
  .offdata-body--muted { color: rgba(255,255,255,0.45); }

  /* ══════════════════════════════════════════════════════
     TAG / CAPTION TÉCNICA
  ══════════════════════════════════════════════════════ */
  .offdata-tag {
    display: inline-flex;
    align-items: center;
    gap: 0.5em;
    font-family: var(--font-mono);
    font-size: 0.82em;
    letter-spacing: -0.02em;
    text-transform: uppercase;
    opacity: 0.65;
    color: currentColor;
  }

  .offdata-tag--blue  { color: var(--blue); opacity: 1; }
  .offdata-tag--white { color: var(--white); opacity: 0.9; }

  .offdata-tag__cube {
    width: 0.6em;
    height: 0.6em;
    background: var(--blue);
    flex-shrink: 0;
    animation: cubePulse 1.2s ease-in-out infinite;
  }

  .offdata-tag--white .offdata-tag__cube { background: var(--white); }
  .offdata-tag--blue  .offdata-tag__cube { background: var(--blue); }

  @keyframes cubePulse {
    0%,100% { opacity: 1;    filter: brightness(1); }
    25%      { opacity: 0.52; filter: brightness(1.08); }
    50%      { opacity: 0.25; filter: brightness(1.16); }
    75%      { opacity: 0.9;  filter: brightness(1.06); }
  }

  @keyframes pulseGlow {
    0%, 100% { box-shadow: 0 4px 24px rgba(4,74,179,0.4), 0 0 0 1px rgba(255,255,255,0.08); }
    50%       { box-shadow: 0 4px 36px rgba(4,74,179,0.75), 0 0 0 1px rgba(255,255,255,0.15); }
  }

  /* Botão CTA principal do Hero — azul vibrante com glow animado (isolado em ::before) */
  .lp-hero__cta {
    display: inline-flex;
    align-items: center;
    gap: 3em;
    background: var(--blue);
    color: var(--white);
    border-radius: var(--radius-btn);
    padding: 0.25em 0.25em 0.25em 1.2em;
    font-size: 0.95em;
    font-weight: 600;
    font-family: var(--font-main);
    text-decoration: none;
    border: none;
    cursor: pointer;
    line-height: 1.25;
    white-space: nowrap;
    position: relative;
    /* Força renderização nítida do texto em camada própria */
    transform: translateZ(0);
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    /* Apenas transform/opacity — sem animar box-shadow no elemento pai */
    transition: transform 200ms ease, opacity 200ms ease;
    /* Garante que filtros de filhos não vazem */
    isolation: isolate;
  }

  /* Glow animado em pseudo-elemento separado — não interfere no texto */
  .lp-hero__cta::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    /* O glow fica aqui, ATRÁS do conteúdo */
    z-index: -1;
    animation: pulseGlow 2.6s ease-in-out infinite;
    /* Texto acima desta camada permanece nítido */
    pointer-events: none;
  }

  .lp-hero__cta:hover {
    transform: scale(1.035) translateZ(0);
    opacity: 0.93;
  }

  .lp-hero__cta:hover .lp-hero__cta-arrow {
    transform: translate(2px, -2px);
  }

  /* Garante que o texto dentro do botão nunca herda blur */
  .lp-hero__cta > span {
    filter: none;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    position: relative;
    z-index: 1;
  }

  .lp-hero__cta-arrow {
    background: rgba(255,255,255,0.18);
    color: var(--white);
    border-radius: var(--radius-btn);
    width: 2.375em;
    height: 2.375em;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1em;
    flex-shrink: 0;
    transition: transform 200ms ease;
    position: relative;
    z-index: 1;
    /* Seta também isolada */
    filter: none;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }

  /* ══════════════════════════════════════════════════════
     BOTÕES
  ══════════════════════════════════════════════════════ */
  .offdata-btn {
    display: inline-flex;
    align-items: center;
    gap: 4.5em;
    background: var(--white);
    color: var(--blue);
    border-radius: var(--radius-btn);
    padding: 0.25em 0.25em 0.25em 1em;
    font-size: 0.95em;
    font-weight: 500;
    font-family: var(--font-main);
    text-decoration: none;
    transition: var(--transition-hover);
    cursor: pointer;
    border: none;
    line-height: 1.25;
  }

  .offdata-btn:hover { opacity: 0.9; }

  .offdata-btn__arrow {
    background: var(--blue);
    color: var(--white);
    border-radius: var(--radius-btn);
    width: 2.375em;
    height: 2.375em;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1em;
    flex-shrink: 0;
  }

  .offdata-btn--blue {
    background: var(--blue);
    color: var(--white);
  }

  .offdata-btn--blue .offdata-btn__arrow {
    background: var(--white);
    color: var(--blue);
  }

  .offdata-btn--ghost {
    background: transparent;
    color: var(--white);
    border: 1px solid rgba(255,255,255,0.3);
  }

  .offdata-btn--ghost .offdata-btn__arrow {
    background: rgba(255,255,255,0.15);
    color: var(--white);
  }

  /* ══════════════════════════════════════════════════════
     CARDS
  ══════════════════════════════════════════════════════ */
  .offdata-cards-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1em;
  }
  @media (max-width: 767px) { .offdata-cards-grid { grid-template-columns: 1fr; gap: 1.5em; } }
  @media (max-width: 991px) and (min-width: 768px) { .offdata-cards-grid { grid-template-columns: repeat(2, 1fr); } }

  .offdata-cards-grid--4 {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: 991px) { .offdata-cards-grid--4 { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 479px) { .offdata-cards-grid--4 { grid-template-columns: 1fr; } }

  .offdata-card {
    background: rgba(255,255,255,0.08);
    border-radius: var(--radius-card);
    padding: 1.15em;
    display: flex;
    flex-direction: column;
    min-height: 14em;
    border: 1px solid rgba(255,255,255,0.1);
    transition: transform 400ms var(--ease-spring), background 300ms ease;
  }

  .offdata-card:hover {
    transform: translateY(-4px);
    background: rgba(255,255,255,0.12);
  }

  .offdata-card--blue {
    background: var(--blue);
    border: 1px solid rgba(255,255,255,0.15);
  }

  .offdata-card--light {
    background: rgba(4, 74, 179, 0.05);
    border: 1px solid rgba(4, 74, 179, 0.15);
    color: var(--blue);
  }

  .offdata-card__img {
    width: 100%;
    aspect-ratio: 16 / 9;
    border-radius: 0.25em;
    overflow: hidden;
    margin-bottom: 1em;
    flex-shrink: 0;
  }

  .offdata-card__number {
    font-family: var(--font-mono);
    font-size: 0.72em;
    color: rgba(255,255,255,0.4);
    letter-spacing: 0.05em;
    text-transform: uppercase;
    line-height: 1;
    margin-bottom: 0.5em;
  }

  .offdata-card__title {
    font-family: var(--font-main);
    font-size: 1em;
    font-weight: 500;
    color: var(--white);
    letter-spacing: -0.01em;
    line-height: 1.2;
    margin-bottom: 0.5em;
  }

  .offdata-card__desc {
    font-family: var(--font-main);
    font-size: 0.82em;
    font-weight: 400;
    line-height: 1.5;
    color: rgba(255,255,255,0.6);
    margin-top: auto;
  }

  /* ══════════════════════════════════════════════════════
     VISÃO GERAL DO SERVIÇO (OVERVIEW)
  ══════════════════════════════════════════════════════ */
  .lp-overview {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4em;
    /* stretch: coluna de imagens fica com mesma altura do bloco de texto */
    align-items: stretch;
  }
  @media (max-width: 767px) {
    .lp-overview {
      grid-template-columns: 1fr;
      gap: 3em;
    }
  }

  .lp-overview__content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5em;
  }

  /* Colagem lado a lado: ocupa 100% da altura da coluna (= mesma altura do texto) */
  .lp-overview__images {
    display: flex;
    flex-direction: row;
    gap: 0.75em;
    /* Preenche a altura total da célula do grid */
    height: 100%;
    min-height: 28em;
  }
  @media (max-width: 767px) {
    .lp-overview__images {
      min-height: 20em;
    }
  }

  /* Imagem principal — 60% da largura, altura total */
  .lp-overview__img-1 {
    flex: 0 0 60%;
    overflow: hidden;
    border-radius: 0.375em;
  }

  /* Imagem secundária — 40% restante, mesma altura */
  .lp-overview__img-2 {
    flex: 1;
    overflow: hidden;
    border-radius: 0.375em;
    /* Remove o margin-bottom assimétrico anterior */
    margin-bottom: 0;
  }

  /* ══════════════════════════════════════════════════════
     PLACEHOLDER DE IMAGEM
  ══════════════════════════════════════════════════════ */
  .img-placeholder {
    background: rgba(255,255,255,0.07);
    border: 2px dashed rgba(255,255,255,0.2);
    border-radius: 0.375em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5em;
    color: rgba(255,255,255,0.35);
    font-family: var(--font-mono);
    font-size: 0.7em;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    text-align: center;
    padding: 1em;
  }

  .img-placeholder--light {
    background: rgba(4,74,179,0.06);
    border-color: rgba(4,74,179,0.2);
    color: rgba(4,74,179,0.4);
  }

  .img-placeholder__icon {
    font-size: 2em;
    opacity: 0.5;
  }

  /* ══════════════════════════════════════════════════════
     HEADER
  ══════════════════════════════════════════════════════ */
  .lp-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99;
    transition: background 350ms ease, backdrop-filter 350ms ease;
  }

  .lp-header.is-scrolled {
    background: rgba(21, 21, 21, 0.85);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(255,255,255,0.08);
  }

  .lp-header__inner {
    max-width: 1400px;
    margin: 0 auto;
    padding: 1em 1.75rem;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    gap: 1em;
  }

  .lp-header__logo {
    display: flex;
    align-items: center;
    gap: 0.5em;
    font-size: 1.1em;
    font-weight: 500;
    letter-spacing: -0.02em;
    color: var(--white);
    text-decoration: none;
    transition: opacity 280ms ease;
  }
  .lp-header__logo:hover { opacity: 0.75; }

  .lp-header__logo-mark {
    width: 1.8em;
    height: 1.8em;
    background: var(--blue);
    border-radius: 0.25em;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-mono);
    font-size: 0.75em;
    letter-spacing: 0;
    color: var(--white);
    font-weight: 400;
  }

  .lp-header__nav {
    display: flex;
    align-items: center;
    gap: 0.25em;
    background: rgba(1, 30, 76, 0.82);
    backdrop-filter: blur(7px);
    -webkit-backdrop-filter: blur(7px);
    border-radius: 0.25em;
    padding: 0.25em;
  }

  .lp-header__link {
    color: var(--white);
    font-size: 0.84em;
    font-weight: 500;
    padding: 0.75em 1.125em;
    border-radius: 0.18em;
    text-decoration: none;
    transition: background 280ms ease, color 280ms ease;
    line-height: 1;
    white-space: nowrap;
  }

  .lp-header__link:hover {
    background: rgba(255,255,255,0.1);
  }

  .lp-header__cta {
    display: flex;
    justify-content: flex-end;
  }

  @media (max-width: 767px) {
    .lp-header__nav { display: none; }
    .lp-header__inner { grid-template-columns: 1fr auto; }
    .lp-header__cta { justify-content: flex-end; }
  }

  /* ══════════════════════════════════════════════════════
     HERO — layout full-bleed completo (imagem cobre 100%)
  ══════════════════════════════════════════════════════ */
  .lp-hero {
    min-height: 100vh;
    position: relative;
    overflow: hidden;
    /* Fundo base escuro enquanto a imagem carrega (sem faixa azul lateral) */
    background: #0a0f20;
    display: flex;
    flex-direction: column;
  }

  /* Painel de imagem — cobre 100% da seção (full-bleed) */
  .lp-hero__image-panel {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 0;
  }

  /* A img dentro do painel cobre 100% sem distorcer */
  .lp-hero__image-panel > *, .lp-hero__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
    border-radius: 0;
  }

  /* Scrim localizado: gradiente suave APENAS na área do texto (esquerda), some antes das pessoas */
  .lp-hero__scrim {
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    /* Aparece à esquerda e dissolve-se antes de atingir o lado direito (foto) */
    background:
      linear-gradient(
        90deg,
        rgba(4,10,25,0.62) 0%,
        rgba(4,10,25,0.40) 30%,
        rgba(4,10,25,0.12) 48%,
        rgba(4,10,25,0) 58%
      );
  }

  /* Vinheta sutil de bordas: escurece levemente os 4 cantos para direcionar o olhar */
  .lp-hero__vignette {
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    background: radial-gradient(
      ellipse at 50% 50%,
      transparent 55%,
      rgba(0,0,0,0.18) 100%
    );
  }

  /* Mobile: scrim vira gradiente vertical (escurece topo onde fica o texto) */
  @media (max-width: 767px) {
    .lp-hero__scrim {
      background: linear-gradient(
        to bottom,
        rgba(10, 14, 26, 0.75) 0%,
        rgba(10, 14, 26, 0.55) 40%,
        rgba(10, 14, 26, 0.1) 70%,
        transparent 100%
      );
    }

    .lp-hero__image {
      object-position: center top;
    }

    .lp-hero__eyebrow,
    .lp-hero__content > p {
      background: rgba(10, 14, 26, 0.35);
      backdrop-filter: blur(8px);
      border-radius: 8px;
      padding: 0.25rem 0.75rem;
      width: fit-content;
    }
  }

  /* Container de texto — z-index acima da imagem e dos scrims */
  .lp-hero__inner {
    position: relative;
    z-index: 2;
    max-width: 1400px;
    margin: 0 auto;
    padding: 8.5rem 1.75rem 5em;
    width: 100%;
    display: flex;
    align-items: center;
    flex: 1;
  }

  .lp-hero__content {
    display: flex;
    flex-direction: column;
    gap: 1.5em;
    max-width: 50%;
  }

  .lp-hero__actions {
    display: flex;
    flex-direction: column;
    gap: 1em;
    align-items: flex-start;
  }

  .lp-hero__action-block {
    display: flex;
    flex-direction: column;
    gap: 1.5em;
  }

  /* Mobile: imagem continua full-bleed, texto sobreposto */
  @media (max-width: 767px) {
    .lp-hero {
      min-height: 100dvh;
      background: #0a0f20;
      padding-bottom: env(safe-area-inset-bottom, 1.5rem);
    }

    .lp-hero__image-panel {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
    }

    .lp-hero__image-panel > *, .lp-hero__image {
      height: 100%;
      object-position: 65% center;
    }

    .lp-hero__inner {
      padding: 7rem 1.25rem 0;
      align-items: flex-start;
    }

    .lp-hero__content {
      max-width: 100%;
      min-height: calc(100dvh - 85px - 7rem);
    }

    .lp-hero__action-block {
      margin-top: auto;
      padding-top: 2rem;
    }
  }

  /* ══════════════════════════════════════════════════════
     MARQUEE INFINITO
  ══════════════════════════════════════════════════════ */
  .offdata-marquee {
    background: var(--white);
    color: var(--blue);
    padding: 1.5em 0;
    overflow: hidden;
    max-width: 1400px;
    margin: 0 auto;
  }

  .offdata-marquee__track {
    display: flex;
    width: max-content;
    animation: scroll 42s linear infinite;
  }

  .offdata-marquee__list {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .offdata-marquee__list li {
    font-family: var(--font-mono);
    font-size: clamp(0.85rem, 1.6vw, 1.05rem);
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: -0.02em;
    display: flex;
    align-items: center;
    white-space: nowrap;
  }

  .offdata-marquee__list li::after {
    content: "·";
    opacity: 0.35;
    color: var(--blue);
    margin: 0 1.25em;
  }

  @keyframes scroll {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }

  @media (prefers-reduced-motion: reduce) {
    .offdata-marquee__track {
      animation: none;
    }
  }

  /* ══════════════════════════════════════════════════════
     SEÇÃO PROVA SOCIAL / NÚMEROS — fundo branco
  ══════════════════════════════════════════════════════ */
  .lp-metrics-section {
    background: var(--white);
    color: var(--black);
  }

  /* Título de posicionamento: comedido, não gigante */
  .lp-metrics-section .lp-sec-header--center { margin-bottom: 2.5em; }

  .lp-metrics-title {
    font-size: clamp(1.4rem, 2.2vw, 2em);
    font-weight: 400;
    line-height: 1.2;
    letter-spacing: -0.02em;
    color: var(--black);
    text-align: center;
    max-width: 38ch;
    margin: 0 auto;
  }

  /* Tag adaptada para fundo claro */
  .lp-metrics-section .offdata-tag {
    color: var(--blue);
    opacity: 0.85;
  }

  .lp-metrics-section .offdata-tag__cube { background: var(--blue); }

  /* Grid de 4 colunas */
  .lp-metrics__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5em;
    margin-top: 2.5em;
  }

  @media (max-width: 767px) {
    .lp-metrics__grid { grid-template-columns: repeat(2, 1fr); gap: 1.25em; }
  }

  /* Card de métrica — fundo branco, borda suave */
  .lp-metric {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0.75em;
    padding: 2em 1.25em 1.75em;
    border: 1px solid rgba(4, 74, 179, 0.12);
    border-radius: var(--radius-card);
    background: var(--white);
    transition: box-shadow 320ms ease, transform 320ms ease;
  }

  .lp-metric:hover {
    box-shadow: 0 8px 28px rgba(4, 74, 179, 0.1);
    transform: translateY(-3px);
  }

  .lp-metrics__grid > div {
    border-radius: var(--radius-card, 0.375em);
    box-shadow: 0 0 0 rgba(4, 74, 179, 0);
    transition: box-shadow 0.3s ease;
  }
  
  @media (prefers-reduced-motion: no-preference) {
    .lp-metrics__grid > div {
      animation: metricGlowPulse 3.2s ease-in-out infinite;
    }
    /* leve dessincronização entre os 4 cards para não pulsarem em uníssono */
    .lp-metrics__grid > div:nth-child(2) { animation-delay: 0.5s; }
    .lp-metrics__grid > div:nth-child(3) { animation-delay: 1s; }
    .lp-metrics__grid > div:nth-child(4) { animation-delay: 1.5s; }
  }
  
  @keyframes metricGlowPulse {
    0%, 100% {
      box-shadow: 0 0 14px rgba(4, 74, 179, 0.12),
                  0 0 2px rgba(4, 74, 179, 0.05);
    }
    50% {
      box-shadow: 0 0 28px rgba(4, 74, 179, 0.28),
                  0 0 8px rgba(4, 74, 179, 0.12);
    }
  }
  
  @media (max-width: 767px) {
    @keyframes metricGlowPulse {
      0%, 100% {
        box-shadow: 0 0 10px rgba(4, 74, 179, 0.10);
      }
      50% {
        box-shadow: 0 0 22px rgba(4, 74, 179, 0.24);
      }
    }
  }

  /* Badge circular com ícone */
  .lp-metric__badge {
    width: 3em;
    height: 3em;
    min-width: 42px;
    min-height: 42px;
    border-radius: 50%;
    background: var(--blue);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: var(--white);
  }

  .lp-metric__badge svg {
    width: 1.2em;
    height: 1.2em;
    flex-shrink: 0;
  }

  /* Número grande — azul, destaque */
  .lp-metric__value {
    font-size: 2.8em;
    font-weight: 500;
    line-height: 1;
    letter-spacing: -0.03em;
    color: var(--blue);
    font-family: var(--font-main);
  }

  /* Label em Fragment Mono, cor discreta */
  .lp-metric__label {
    font-family: var(--font-mono);
    font-size: clamp(0.78rem, 0.95vw, 0.9rem);
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.02em;
    color: rgba(21, 21, 21, 0.68);
    line-height: 1.4;
  }

  /* ══════════════════════════════════════════════════════
     SEÇÃO CAPACIDADES (icons)
  ══════════════════════════════════════════════════════ */
  /* ══════════════════════════════════════════════════════
     LISTA DE SERVIÇOS (Zigue-zague)
  ══════════════════════════════════════════════════════ */
  .lp-services-list {
    display: flex;
    flex-direction: column;
    gap: 8em;
    margin-top: 5em;
  }
  @media (max-width: 767px) {
    .lp-services-list { gap: 5em; margin-top: 3em; }
  }

  .lp-service-item {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4em;
    align-items: center;
  }
  @media (max-width: 991px) {
    .lp-service-item { gap: 2.5em; }
  }
  @media (max-width: 767px) {
    .lp-service-item {
      grid-template-columns: 1fr;
    }
  }

  .lp-service-item__img-col {
    width: 100%;
    aspect-ratio: 16 / 10;
    border-radius: var(--radius-card, 0.375em);
    overflow: hidden;
    box-shadow: 0 0 0 rgba(4, 74, 179, 0);
    transition: box-shadow 0.3s ease;
  }

  @media (prefers-reduced-motion: no-preference) {
    .lp-service-item__img-col {
      animation: serviceImgGlowPulse 3.6s ease-in-out infinite;
    }
    /* dessincronizar levemente entre os 3 blocos de serviço */
    .lp-service-item:nth-of-type(2) .lp-service-item__img-col { animation-delay: 0.7s; }
    .lp-service-item:nth-of-type(3) .lp-service-item__img-col { animation-delay: 1.4s; }
  }

  @keyframes serviceImgGlowPulse {
    0%, 100% {
      box-shadow: 0 0 14px rgba(4, 74, 179, 0.12),
                  0 0 2px rgba(4, 74, 179, 0.05);
    }
    50% {
      box-shadow: 0 0 28px rgba(4, 74, 179, 0.28),
                  0 0 8px rgba(4, 74, 179, 0.12);
    }
  }

  @media (max-width: 767px) {
    @keyframes serviceImgGlowPulse {
      0%, 100% {
        box-shadow: 0 0 10px rgba(4, 74, 179, 0.10);
      }
      50% {
        box-shadow: 0 0 22px rgba(4, 74, 179, 0.24);
      }
    }
  }
  
  .lp-service-item--reverse .lp-service-item__img-col {
    order: 2;
  }
  .lp-service-item--reverse .lp-service-item__text-col {
    order: 1;
  }

  /* No mobile, imagem sempre vem primeiro */
  @media (max-width: 767px) {
    .lp-service-item--reverse .lp-service-item__img-col { order: 1; }
    .lp-service-item--reverse .lp-service-item__text-col { order: 2; }
  }

  .lp-service-item__text-col {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.25em;
  }

  .lp-service-item__title {
    font-size: clamp(1.8rem, 2.5vw, 2.5em);
    font-weight: 400;
    line-height: 1.1;
    letter-spacing: -0.02em;
    color: var(--black);
    margin: 0;
  }

  .lp-service-item__desc {
    font-size: 1em;
    font-weight: 400;
    line-height: 1.55;
    color: rgba(21, 21, 21, 0.7);
    max-width: 44ch;
  }

  /* ══════════════════════════════════════════════════════
     CTA BANNER INTERMEDIÁRIO
  ══════════════════════════════════════════════════════ */
  .lp-cta-banner {
    position: relative;
    overflow: hidden;
    min-height: 45vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 6em 1.25rem;
  }

  .lp-cta-banner__bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  .lp-cta-banner__bg > div {
    width: 100%;
    height: 100%;
  }

  .lp-cta-banner__bg .img-placeholder {
    border-radius: 0;
    border: none;
  }

  .lp-cta-banner__overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to right,
      #0a0f20 0%,
      rgba(4, 74, 179, 0.7) 40%,
      rgba(4, 74, 179, 0.5) 100%
    );
    z-index: 2;
  }

  .lp-cta-banner__inner {
    position: relative;
    z-index: 3;
    max-width: 800px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2.5em;
  }

  .lp-cta-banner__title {
    font-size: clamp(2.2rem, 3.5vw, 3.5em);
    font-weight: 500;
    line-height: 1.1;
    letter-spacing: -0.02em;
    color: var(--white);
    margin: 0;
  }
  
  @media (max-width: 767px) {
    .lp-cta-banner { min-height: 50vh; padding: 4em 1.25rem; }
  }

  /* ══════════════════════════════════════════════════════
     GALERIA / PORTFÓLIO
  ══════════════════════════════════════════════════════ */
  .lp-gallery__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1em;
    margin-top: 3em;
  }

  @media (max-width: 991px) { .lp-gallery__grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 479px) { .lp-gallery__grid { grid-template-columns: 1fr; } }

  .lp-gallery-item {
    display: flex;
    flex-direction: column;
    gap: 0.75em;
  }

  .lp-gallery-item__img {
    aspect-ratio: 4/3;
    border-radius: 0.375em;
    overflow: hidden;
    transition: transform 400ms var(--ease-spring);
  }

  .lp-gallery-item:hover .lp-gallery-item__img { transform: scale(1.02); }

  .lp-gallery-item__caption {
    font-family: var(--font-mono);
    font-size: 0.72em;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: rgba(255,255,255,0.45);
    line-height: 1.35;
  }

  .lp-gallery__dots {
    display: flex;
    justify-content: center;
    gap: 0.5em;
    margin-top: 2em;
  }

  .lp-dot {
    width: 0.5em;
    height: 0.5em;
    border-radius: 50%;
    background: rgba(255,255,255,0.25);
    cursor: pointer;
    transition: background 280ms ease, transform 280ms ease;
  }

  .lp-dot.active {
    background: var(--white);
    transform: scale(1.25);
  }

  /* ══════════════════════════════════════════════════════
     FOOTER
  ══════════════════════════════════════════════════════ */
  .lp-footer {
    background: var(--black);
    color: var(--white);
    border-top: 1px solid rgba(255,255,255,0.08);
  }

  .lp-footer__cta-strip {
    background: var(--blue);
    padding: 3.5em 1.25rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.5em;
  }

  .lp-footer__inner {
    max-width: 1400px;
    margin: 0 auto;
    padding: 3.5em 1.75rem 2em;
    display: flex;
    justify-content: space-between;
    gap: 4em;
  }

  @media (max-width: 991px) {
    .lp-footer__inner { flex-direction: column; gap: 3em; }
  }

  .lp-footer__brand {
    font-family: var(--font-main);
    font-weight: 500;
    font-size: 2.2em;
    color: var(--white);
    letter-spacing: -0.04em;
    line-height: 1;
  }

  .lp-footer__grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 3em;
    flex-grow: 1;
  }

  @media (max-width: 991px) {
    .lp-footer__grid { grid-template-columns: repeat(3, 1fr); gap: 2em; }
  }

  @media (max-width: 767px) {
    .lp-footer__grid { grid-template-columns: repeat(2, 1fr); gap: 2em; }
  }

  .lp-footer-col__title {
    font-family: var(--font-mono);
    font-size: 0.72em;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: rgba(255,255,255,0.4);
    margin-bottom: 0.75em;
    line-height: 1;
  }

  .lp-footer-col__links {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  }

  .lp-footer-col__links a {
    font-size: 0.85em;
    font-weight: 500;
    color: rgba(255,255,255,0.7);
    line-height: 1.2;
    text-decoration: none;
    transition: opacity 250ms ease;
  }

  .lp-footer-col__links a:hover { opacity: 0.5; }

  .lp-footer__bottom {
    border-top: 1px solid rgba(255,255,255,0.08);
    padding: 1.5em 1.75rem;
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1em;
  }

  @media (max-width: 767px) {
    .lp-footer__bottom { flex-direction: column; align-items: flex-start; }
  }

  .lp-footer__copy {
    font-size: 0.82em;
    font-weight: 500;
    color: rgba(255,255,255,0.35);
    line-height: 1;
  }

  .lp-footer__socials {
    display: flex;
    align-items: center;
    gap: 0.5em;
  }

  .lp-social-btn {
    width: 2em;
    height: 2em;
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 0.25em;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255,255,255,0.5);
    font-size: 0.9em;
    transition: border-color 280ms ease, color 280ms ease;
    cursor: pointer;
  }

  .lp-social-btn:hover {
    border-color: rgba(255,255,255,0.5);
    color: var(--white);
  }

  /* ══════════════════════════════════════════════════════
     SEÇÃO HEADER INTERNO (section-header reutilizável)
  ══════════════════════════════════════════════════════ */
  .lp-sec-header {
    display: flex;
    flex-direction: column;
    gap: 0.75em;
    margin-bottom: 3em;
  }

  .lp-sec-header--center {
    align-items: center;
    text-align: center;
    max-width: 52ch;
    margin-left: auto;
    margin-right: auto;
  }

  /* ══════════════════════════════════════════════════════
     DIVISOR DE BORDA
  ══════════════════════════════════════════════════════ */
  .lp-divider {
    border: none;
    border-top: 1px solid rgba(255,255,255,0.1);
    margin: 0;
  }
`;

/* ═══════════════════════════════════════════════════════
   ÍCONES INLINE (SVG simples — substituir por lib real)
   ═══════════════════════════════════════════════════════ */
const IconCheck = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
    <path d="M1.5 5L4 7.5L8.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconArrow = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconPlaceholder = ({ label }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.5 }}>
    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const IconInstagram = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
  </svg>
);

const IconLinkedin = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="2" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M7 10v7M7 7v.5M12 17v-4c0-1.1.9-2 2-2s2 .9 2 2v4M12 10v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const FOOTER_COLUMNS = [
  {
    title: 'Empresa',
    links: ['Início', 'Sobre nós', 'Nossa visão', 'Carreiras'],
  },
  {
    title: 'Serviços',
    links: ['Site Institucional', 'Landing Page', 'E-commerce'],
  },
  {
    title: 'Recursos',
    links: ['Central de ajuda', 'Guias e eBooks'],
  },
  {
    title: 'Suporte',
    links: ['Fale conosco', 'Documentação', 'Parceiros'],
  },
  {
    title: 'Contato',
    links: ['LinkedIn', 'Instagram'],
  }
];

/* ═══════════════════════════════════════════════════════
   DADOS DE PLACEHOLDER
   (Substituir pelos dados reais de cada serviço)
   ═══════════════════════════════════════════════════════ */

const METRIC_ICONS = [
  /* Caixa / Entrega */
  <svg viewBox="0 0 24 24" fill="none"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><polyline points="3.27 6.96 12 12.01 20.73 6.96" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><line x1="12" y1="22.08" x2="12" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  /* Pessoas / Usuários */
  <svg viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  /* Gráfico / Crescimento */
  <svg viewBox="0 0 24 24" fill="none"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><polyline points="17 6 23 6 23 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  /* Check / Sucesso (aperto de mão simplificado) */
  <svg viewBox="0 0 24 24" fill="none"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><polyline points="22 4 12 14.01 9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
];

const METRICS = [
  { value: '40+',    label: 'Empresas atendidas em Uberlândia' },
  { value: '180%',   label: 'Aumento médio de tráfego orgânico' },
  { value: '2x',     label: 'Mais contatos pelo site' },
  { value: '15d',    label: 'Prazo médio de entrega' },
];

const SERVICE_CARDS = [
  {
    id: '01',
    title: '[Serviço / Benefício 1]',
    desc:  '[Descrição curta de 1-2 linhas explicando o valor principal deste ponto]',
  },
  {
    id: '02',
    title: '[Serviço / Benefício 2]',
    desc:  '[Descrição curta de 1-2 linhas explicando o valor principal deste ponto]',
  },
  {
    id: '03',
    title: '[Serviço / Benefício 3]',
    desc:  '[Descrição curta de 1-2 linhas explicando o valor principal deste ponto]',
  },
];

const SERVICE_LIST = [
  {
    title: 'Site Institucional',
    desc: 'Ideal para empresas que querem passar credibilidade e centralizar informações. Estrutura otimizada para aparecer no Google quando alguém busca pelo seu serviço em Uberlândia.',
    ctaText: 'Saiba mais',
    ctaPrimary: false,
    images: [
      {
        src800: '/assets/services/site-institucional/img-1-800w.avif',
        src1400: '/assets/services/site-institucional/img-1-1400w.avif',
        alt: 'Site institucional profissional criado para empresa em Uberlândia — página inicial'
      },
      {
        src800: '/assets/services/site-institucional/img-2-800w.avif',
        src1400: '/assets/services/site-institucional/img-2-1400w.avif',
        alt: 'Site institucional profissional criado para empresa em Uberlândia — página interna'
      }
    ],
  },
  {
    title: 'Landing Page de Vendas',
    desc: 'Página única focada em conversão, para campanhas de tráfego pago ou lançamento de um produto/serviço específico. Copy persuasiva e formulário de captura integrado.',
    ctaText: 'Saiba mais',
    ctaPrimary: false,
    images: [
      {
        src800: '/assets/services/landing-page/img-1-800w.avif',
        src1400: '/assets/services/landing-page/img-1-1400w.avif',
        alt: 'Landing page de alta conversão criada para produto em Uberlândia — hero principal'
      },
      {
        src800: '/assets/services/landing-page/img-2-800w.avif',
        src1400: '/assets/services/landing-page/img-2-1400w.avif',
        alt: 'Landing page de alta conversão criada para produto em Uberlândia — seção de captura'
      }
    ],
  },
  {
    title: 'Loja Virtual / E-commerce',
    desc: 'Site preparado para vender online, com catálogo, carrinho, pagamento integrado e otimização para buscas locais e nacionais.',
    ctaText: 'Solicitar agora',
    ctaPrimary: true,
    images: [
      {
        src800: '/assets/services/loja-virtual/img-1-800w.avif',
        src1400: '/assets/services/loja-virtual/img-1-1400w.avif',
        alt: 'Loja virtual moderna e responsiva criada em Uberlândia — vitrine de produtos'
      },
      {
        src800: '/assets/services/loja-virtual/img-2-800w.avif',
        src1400: '/assets/services/loja-virtual/img-2-1400w.avif',
        alt: 'Loja virtual moderna e responsiva criada em Uberlândia — checkout e carrinho'
      }
    ],
  },
];


const PROCESS_STEPS = [
  { title: 'Diagnóstico', text: 'Entendemos seu negócio, seus concorrentes e o objetivo do site (vender, captar contato ou gerar autoridade).' },
  { title: 'Planejamento e Design', text: <>Criamos a estrutura e o layout do site, já pensando em <a href="/seo-local-uberlandia" className="lp-interlink" style={{ textDecoration: 'underline', color: 'inherit' }}>SEO e conversão</a> desde o início.</> },
  { title: 'Desenvolvimento', text: <>Construímos o site com foco extremo em <a href="/performance-web" className="lp-interlink" style={{ textDecoration: 'underline', color: 'inherit' }}>performance web</a>, responsividade e otimização técnica para Google.</> },
  { title: 'Lançamento e Suporte', text: 'Site no ar em até 15 dias, com acompanhamento e ajustes nas primeiras semanas.' },
];

const FAQ_ITEMS = [
  { question: 'Quanto custa criar um site para empresa em Uberlândia?', answer: 'O valor varia conforme o tipo de site (institucional, landing page ou e-commerce) e as funcionalidades necessárias. Fazemos um diagnóstico gratuito antes de fechar a proposta, para garantir um orçamento justo para o seu projeto.' },
  { question: 'Quanto tempo demora para o site ficar pronto?', answer: 'Em média, entregamos sites institucionais em até 15 dias úteis após a aprovação do briefing e do conteúdo. Projetos mais complexos, como e-commerce, podem levar mais tempo.' },
  { question: 'Vocês atendem empresas fora de Uberlândia?', answer: 'Sim. Além de Uberlândia, atendemos empresas em toda a região do Triângulo Mineiro, com reuniões remotas ou presenciais, conforme a necessidade do cliente.' },
  { question: 'O site vai aparecer no Google?', answer: 'Todos os nossos sites são construídos com estrutura técnica otimizada para SEO desde o início (velocidade, responsividade, tags corretas). Isso cria a base para o site rankear — os resultados de posicionamento também dependem de conteúdo e tempo.' },
  { question: 'Preciso fornecer o conteúdo (textos e imagens) do site?', answer: 'Você pode fornecer o material ou contar com o nosso apoio para estruturar os textos e sugerir imagens, garantindo uma comunicação clara e alinhada ao seu negócio.' },
];

const TESTIMONIALS = [
  { 
    name: 'Roberto Alves', 
    role: 'Diretor Comercial', 
    company: 'Alves Imóveis', 
    avatar: '/assets/testimonials/client-1.avif',
    text: 'Antes a gente dependia só de portal imobiliário e perdia muito cliente para a concorrência. O pessoal da Off-Data criou nosso site profissional do zero, já focado em captar lead aqui na região do Santa Mônica. Em menos de três meses, nosso volume de contatos pelo WhatsApp triplicou porque o site passa muita credibilidade.', 
    rating: 5 
  },
  { 
    name: 'Dra. Mariana Costa', 
    role: 'Odontopediatra e Sócia', 
    company: 'Sorriso & Saúde Clínica', 
    avatar: '/assets/testimonials/client-2.avif',
    text: 'Nossa clínica aqui no centro de Uberlândia já era conhecida, mas na internet a gente não existia. Precisávamos de um site que facilitasse o agendamento de consultas. A entrega foi super rápida, o layout ficou com a nossa cara e, hoje, mais da metade dos novos pacientes nos encontram pelo Google e agendam direto pelo site.', 
    rating: 5 
  },
  { 
    name: 'Thiago Freitas', 
    role: 'Proprietário', 
    company: 'Urbano & Co. Vestuário', 
    avatar: '/assets/testimonials/client-3.avif',
    text: 'A gente vendia muito pelo Instagram, mas o controle de estoque era um caos e limitava nosso crescimento. Contratamos a loja virtual com a Off-Data e resolvemos isso. O site carrega super rápido no celular (que é de onde vem 90% das clientes) e as vendas fluem no automático pra todo o Brasil, mas com o suporte rápido de uma agência aqui do Fundinho.', 
    rating: 5 
  },
];

/* ═══════════════════════════════════════════════════════
   COMPONENTE PRINCIPAL
   ═══════════════════════════════════════════════════════ */
const MetricCard = ({ metric, icon }) => {
  const { ref, value } = useCountUp(metric.value, 1800);
  
  return (
    <div ref={ref} className="lp-metric">
      <div className="lp-metric__badge" aria-hidden="true">
        {icon}
      </div>
      <span className="lp-metric__value">{value}</span>
      <span className="lp-metric__label">{metric.label}</span>
    </div>
  );
};

const ImageRotator = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !isIntersecting) return;

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [isIntersecting, images.length]);

  return (
    <div
      ref={containerRef}
      className="img-rotator"
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden'
      }}
    >
      {images.map((img, i) => {
        const isActive = i === activeIndex;
        return (
          <picture
            key={i}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: isActive ? 1 : 0,
              transition: 'opacity 900ms ease-in-out',
              zIndex: isActive ? 1 : 0,
              display: 'block',
              width: '100%',
              height: '100%',
            }}
          >
            <source srcSet={`${img.src800} 800w, ${img.src1400} 1400w`} sizes="(max-width: 767px) 100vw, 50vw" type="image/avif" />
            <img
              src={img.src1400}
              alt={img.alt}
              loading={i === 0 ? "eager" : "lazy"}
              fetchpriority={i === 0 ? "high" : "auto"}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block'
              }}
            />
          </picture>
        );
      })}
    </div>
  );
};

const ServicoLanding = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  // Estados do Carrossel de Depoimentos
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) setActiveTestimonial((p) => (p + 1) % TESTIMONIALS.length);
    if (isRightSwipe) setActiveTestimonial((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Schema JSON-LD para SEO (FAQ e Service)
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        mainEntity: FAQ_ITEMS.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
      {
        '@type': 'Service',
        name: 'Criação de Sites Profissionais em Uberlândia',
        provider: {
          '@id': 'https://www.offdata.digital/#business'
        },
        areaServed: [
          { '@type': 'City', name: 'Uberlândia' },
          { '@type': 'AdministrativeArea', name: 'Triângulo Mineiro' }
        ]
      }
    ]
  };

  const pageTitle = "Criação de Site Profissional em Uberlândia | Off-Data";
  const pageDescription = "Criação de sites profissionais e imersivos para empresas em Uberlândia e no Triângulo Mineiro. Aumente suas vendas com um site premium focado em conversão.";
  const pageCanonical = "https://www.offdata.digital/criacao-de-sites-uberlandia";

  return (
    <div className="lp-root">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={pageCanonical} />
        
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content="https://www.offdata.digital/imagens/offdata-digital-og.jpg" />
        <meta property="og:url" content={pageCanonical} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="pt_BR" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="https://www.offdata.digital/imagens/offdata-digital-og.jpg" />

        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      </Helmet>

      {/* Injeção dos estilos globais */}
      <style>{GLOBAL_CSS}</style>

      {/* ═══════════════════════════════════════════════
          1. HEADER FIXO
      ═══════════════════════════════════════════════ */}
      <header className={`lp-header ${isScrolled ? 'is-scrolled' : ''}`}>
        <div className="lp-header__inner">

          {/* Logo */}
          <a href="/" className="lp-header__logo" aria-label="Off-Data">
            <img src={offDataWhiteLogo} alt="Off-Data" style={{ height: '32px', width: 'auto' }} />
          </a>

          {/* Nav central */}
          <nav className="lp-header__nav" aria-label="Navegação da página">
            <a href="#servicos"   className="lp-header__link">Serviços</a>
            <a href="#beneficios" className="lp-header__link">Benefícios</a>
            <a href="#portfolio"  className="lp-header__link">Portfólio</a>
            <a href="#contato"    className="lp-header__link">Contato</a>
          </nav>

          {/* CTA header */}
          <div className="lp-header__cta">
            <a href={CONFIG.whatsappUrl} target="_blank" rel="noopener noreferrer" className="offdata-btn" aria-label="Fale conosco pelo WhatsApp">
              <span>Solicitar orçamento</span>
              <span className="offdata-btn__arrow" aria-hidden="true">
                <IconArrow />
              </span>
            </a>
          </div>

        </div>
      </header>

      <main>

        {/* ═══════════════════════════════════════════
            2. HERO
        ═══════════════════════════════════════════ */}
        <section id="hero" className="lp-hero" aria-label="Hero — Proposta de valor principal">

          {/* ── Painel de imagem full-bleed (lado direito, posição absoluta) ── */}
          <picture className="lp-hero__image-panel" aria-hidden="true">
            <source media="(max-width: 767px)" srcSet={heroMobileImg} />
            <img
              src={heroDesktopImg}
              alt="Criação de site profissional para empresas em Uberlândia — Off-Data"
              className="lp-hero__image"
              fetchpriority="high"
            />
          </picture>

          {/* ── Scrim localizado: gradiente sutil que some antes da área das pessoas/monitor ── */}
          <div className="lp-hero__scrim" aria-hidden="true" />

          {/* ── Vinheta de bordas sutil para direcionar o olhar ── */}
          <div className="lp-hero__vignette" aria-hidden="true" />

          {/* ── Conteúdo de texto (z-index acima dos scrims) ── */}
          <div className="lp-hero__inner">
            <div className="lp-hero__content">

              {/* Heading Group */}
              <div className="lp-hero__heading-group" style={{ display: 'flex', flexDirection: 'column', gap: '1.5em' }}>
                {/* Tag de contexto */}
                <div className="offdata-tag offdata-tag--white lp-hero__eyebrow" style={{ textShadow: '0 1px 10px rgba(0,0,0,0.7), 0 1px 3px rgba(0,0,0,0.9)' }}>
                  <span className="offdata-tag__cube" aria-hidden="true" style={{ boxShadow: '0 1px 6px rgba(0,0,0,0.7)' }} />
                  <span>CRIAÇÃO DE SITES EM UBERLÂNDIA</span>
                </div>

                {/* H1 */}
                <h1 className="offdata-h1" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8), 0 1px 4px rgba(0,0,0,0.95)' }}>
                  Criação de Sites em Uberlândia para Empresas que Querem Vender Mais
                </h1>
              </div>

              {/* Subtexto */}
              <p className="offdata-body" style={{ maxWidth: '42ch', textShadow: '0 1px 10px rgba(0,0,0,0.7), 0 1px 3px rgba(0,0,0,0.9)' }}>
                Desenvolvemos sites profissionais, rápidos e otimizados para Google, feitos para transformar visitantes em clientes. Atendimento local, prazo definido e suporte contínuo.
              </p>

              <div className="lp-hero__action-block">
                {/* Cards de Diferenciais — glassmorphism denso */}
                <div style={{
                background: 'rgba(10,15,30,0.75)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                borderRadius: '0.375em',
                padding: '1.25em 1.35em',
                display: 'flex',
                gap: '1em',
                maxWidth: '38em',
                border: '1px solid rgba(255,255,255,0.15)',
              }}>
                {/* Diferencial 1 */}
                <div style={{ flex: 1, display: 'flex', gap: '0.65em', alignItems: 'flex-start' }}>
                  <span aria-hidden="true" style={{
                    flexShrink: 0,
                    width: '1.25em',
                    height: '1.25em',
                    marginTop: '0.1em',
                    borderRadius: '50%',
                    background: 'var(--blue)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.62em',
                    color: '#fff',
                    fontWeight: 700,
                  }}>✓</span>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72em', textTransform: 'uppercase', letterSpacing: '-0.01em', color: '#fff', fontWeight: 400, lineHeight: 1.2, marginBottom: '0.35em' }}>
                      Site 100% otimizado para SEO
                    </div>
                    <div style={{ fontFamily: 'var(--font-main)', fontSize: '0.68em', lineHeight: 1.45, color: 'rgba(255,255,255,0.70)' }}>
                      Estrutura pensada para aparecer no Google desde o primeiro dia.
                    </div>
                  </div>
                </div>

                {/* Divisor vertical */}
                <div aria-hidden="true" style={{ width: '1px', background: 'rgba(255,255,255,0.12)', alignSelf: 'stretch', flexShrink: 0 }} />

                {/* Diferencial 2 */}
                <div style={{ flex: 1, display: 'flex', gap: '0.65em', alignItems: 'flex-start' }}>
                  <span aria-hidden="true" style={{
                    flexShrink: 0,
                    width: '1.25em',
                    height: '1.25em',
                    marginTop: '0.1em',
                    borderRadius: '50%',
                    background: 'var(--blue)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.62em',
                    color: '#fff',
                    fontWeight: 700,
                  }}>✓</span>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72em', textTransform: 'uppercase', letterSpacing: '-0.01em', color: '#fff', fontWeight: 400, lineHeight: 1.2, marginBottom: '0.35em' }}>
                      Entrega em até 15 dias
                    </div>
                    <div style={{ fontFamily: 'var(--font-main)', fontSize: '0.68em', lineHeight: 1.45, color: 'rgba(255,255,255,0.70)' }}>
                      Do briefing ao ar, com acompanhamento em cada etapa.
                    </div>
                  </div>
                </div>
              </div>

              {/* Ações */}
              <div className="lp-hero__actions">
                {/* CTA principal — botão azul vibrante com glow animado */}
                <a
                  href={CONFIG.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lp-hero__cta"
                >
                  <span>Solicitar orçamento do meu site</span>
                  <span className="lp-hero__cta-arrow" aria-hidden="true"><IconArrow /></span>
                </a>

                <div className="offdata-tag offdata-tag--white" style={{ opacity: 0.85, fontSize: '0.72em', textShadow: '0 1px 8px rgba(0,0,0,0.75), 0 1px 3px rgba(0,0,0,0.9)' }}>
                  <span className="offdata-tag__cube" aria-hidden="true" style={{ boxShadow: '0 1px 6px rgba(0,0,0,0.7)' }} />
                  <span>+40 empresas de Uberlândia já têm site com a Off-Data</span>
                </div>
              </div>
              </div>

            </div>
          </div>

        </section>

        {/* ═══════════════════════════════════════════
            MARQUEE INFINITO
        ═══════════════════════════════════════════ */}
        <section className="offdata-marquee" aria-label="Nossos serviços e área de atendimento">
          <div className="offdata-marquee__track">
            <ul className="offdata-marquee__list">
              <li>Sites Institucionais</li>
              <li>Landing Pages</li>
              <li>Lojas Virtuais</li>
              <li>Uberlândia</li>
              <li>SEO Técnico Incluso</li>
            </ul>
            <ul className="offdata-marquee__list" aria-hidden="true">
              <li>Sites Institucionais</li>
              <li>Landing Pages</li>
              <li>Lojas Virtuais</li>
              <li>Uberlândia</li>
              <li>SEO Técnico Incluso</li>
            </ul>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            3. PROVA SOCIAL EM NÚMEROS
        ═══════════════════════════════════════════ */}
        <section id="numeros" className="offdata-section lp-metrics-section" aria-label="Prova social — métricas">
          <div className="offdata-container offdata-container--tight">

            <div className="lp-sec-header lp-sec-header--center">

              {/* Tag adaptada para fundo claro */}
              <div className="offdata-tag" style={{ margin: '0 auto' }}>
                <span className="offdata-tag__cube" aria-hidden="true" />
                <span>RESULTADOS COMPROVADOS</span>
              </div>

              {/* H2 comedido — não gigante, máx 2 linhas */}
              <p className="lp-metrics-title">
                Sites que não só existem — trabalham para trazer clientes todos os dias
              </p>

            </div>

            <div className="lp-metrics__grid">
              {METRICS.map((m, i) => (
                <MetricCard key={i} metric={m} icon={METRIC_ICONS[i]} />
              ))}
            </div>

          </div>
        </section>


        {/* ═══════════════════════════════════════════
            4. VISÃO GERAL DO SERVIÇO
        ═══════════════════════════════════════════ */}
        <section id="servicos" className="offdata-section offdata-section--light" aria-label="Visão geral do serviço">
          <div className="offdata-container">

            <div className="lp-overview">
              
              {/* Coluna de texto */}
              <div className="lp-overview__content">
                <h2 className="offdata-h2" style={{ color: 'var(--black)' }}>
                  Site profissional feito sob medida para a sua empresa em Uberlândia
                </h2>
                <p className="offdata-body" style={{ color: 'rgba(21, 21, 21, 0.75)', maxWidth: '48ch' }}>
                  Cada negócio tem um objetivo diferente: vender online, gerar contato, mostrar autoridade ou captar clientes locais. Por isso criamos cada site do zero, alinhado à sua estratégia comercial — não usamos templates genéricos.
                </p>
                <p className="offdata-body" style={{ color: 'rgba(21, 21, 21, 0.75)', maxWidth: '48ch' }}>
                  Trabalhamos com pequenas e médias empresas de Uberlândia e região, com suporte próximo e comunicação direta durante todo o projeto.
                </p>
                <a href={CONFIG.whatsappUrl} target="_blank" rel="noopener noreferrer" className="offdata-btn offdata-btn--ghost" style={{ marginTop: '0.5em', border: '1px solid var(--black)', color: 'var(--black)' }}>
                  <span>Saiba como funciona</span>
                  <span className="offdata-btn__arrow" aria-hidden="true" style={{ background: 'var(--black)', color: 'var(--white)' }}>
                    <IconArrow />
                  </span>
                </a>
              </div>
              
              {/* Coluna de imagens em colagem */}
              <div className="lp-overview__images">
                {/* Imagem principal — 60% da largura, altura total da colagem */}
                <div className="lp-overview__img-1" style={{ display: 'flex', flexDirection: 'column' }}>
                  <picture style={{ width: '100%', flex: 1, display: 'block', minHeight: 0 }}>
                    <source srcSet="/assets/services/servico-overview-1.avif" type="image/avif" />
                    <img 
                      src="/assets/services/servico-overview-1.avif" 
                      alt="Operação principal da empresa em Uberlândia" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '0.375em' }}
                      loading="lazy"
                    />
                  </picture>
                </div>
                {/* Imagem secundária — 40% restante, mesma altura */}
                <div className="lp-overview__img-2" style={{ display: 'flex', flexDirection: 'column' }}>
                  <picture style={{ width: '100%', flex: 1, display: 'block', minHeight: 0 }}>
                    <source srcSet="/assets/services/servico-overview-2.avif" type="image/avif" />
                    <img 
                      src="/assets/services/servico-overview-2.avif" 
                      alt="Detalhe de equipe ou estrutura em campo" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '0.375em' }}
                      loading="lazy"
                    />
                  </picture>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ═══════════════════════════════════════════
            5. LISTA DE CAPACIDADES (com ícone)
        ═══════════════════════════════════════════ */}
        <section id="lista-servicos" className="offdata-section offdata-section--light" aria-label="Nossos Serviços">
          <div className="offdata-container">

            <div className="lp-sec-header lp-sec-header--center">
              <h2 className="offdata-h2" style={{ color: 'var(--black)' }}>
                Nossos serviços de criação de sites em Uberlândia
              </h2>
            </div>

            <div className="lp-services-list">
              {SERVICE_LIST.map((svc, i) => (
                <div key={i} className={`lp-service-item ${i % 2 !== 0 ? 'lp-service-item--reverse' : ''}`}>
                  
                  {/* Coluna de Imagem */}
                  <div className="lp-service-item__img-col">
                    <ImageRotator images={svc.images} />
                  </div>

                  {/* Coluna de Texto */}
                  <div className="lp-service-item__text-col">
                    <h3 className="lp-service-item__title">{svc.title}</h3>
                    <p className="lp-service-item__desc">{svc.desc}</p>
                    <a
                      href={CONFIG.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`offdata-btn ${svc.ctaPrimary ? 'offdata-btn--blue' : 'offdata-btn--ghost'}`}
                      style={!svc.ctaPrimary ? { border: '1px solid var(--black)', color: 'var(--black)' } : {}}
                    >
                      <span>{svc.ctaText}</span>
                      <span className="offdata-btn__arrow" aria-hidden="true" style={!svc.ctaPrimary ? { background: 'var(--black)', color: 'var(--white)' } : {}}>
                        <IconArrow />
                      </span>
                    </a>
                  </div>

                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ═══════════════════════════════════════════
            6. GALERIA / PORTFÓLIO
        ═══════════════════════════════════════════ */}
        <section id="portfolio" className="offdata-section offdata-section--light" aria-label="Portfólio e galeria">
          <div className="offdata-container">

            <div className="lp-sec-header lp-sec-header--center">
              <div className="offdata-tag" style={{ margin: '0 auto' }}>
                <span className="offdata-tag__cube" aria-hidden="true" />
                <span>CASOS DE SUCESSO</span>
              </div>
              <h2 className="offdata-h2" style={{ color: 'var(--black)', textAlign: 'center' }}>
                Sites que já entregamos para empresas de Uberlândia
              </h2>
              <p className="offdata-body" style={{ textAlign: 'center', maxWidth: '48ch', color: 'rgba(21, 21, 21, 0.75)' }}>
                Cada projeto abaixo foi construído para resolver um problema real de negócio — não só 'ficar bonito'.
              </p>
            </div>

            <SharedPortfolioCarousel items={realEstatePortfolioItems} />

          </div>
        </section>

        {/* ═══════════════════════════════════════════
            NOVA SEÇÃO — COMO FUNCIONA
        ═══════════════════════════════════════════ */}
        <section id="processo" className="offdata-section offdata-section--light" aria-label="Processo de trabalho">
          <div className="offdata-container">
            <div className="lp-sec-header lp-sec-header--center">
              <h2 className="offdata-h2" style={{ color: 'var(--black)', textAlign: 'center' }}>
                Como funciona a criação do seu site
              </h2>
              <p className="offdata-body" style={{ textAlign: 'center', color: 'rgba(21, 21, 21, 0.75)', maxWidth: '48ch', margin: '1em auto 0' }}>
                Um processo simples, transparente e com prazo definido — do primeiro contato ao site no ar.
              </p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2.5rem', marginTop: '4rem' }}>
              {PROCESS_STEPS.map((step, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                  <div style={{ display: 'grid', placeItems: 'center', width: '2.5em', height: '2.5em', borderRadius: '4px', background: 'var(--blue)', color: 'var(--white)', fontWeight: 500, fontSize: '1.2em' }}>
                    {idx + 1}
                  </div>
                  <h3 style={{ fontSize: '1.6em', fontWeight: 500, color: 'var(--black)', margin: 0, lineHeight: 1.1 }}>{step.title}</h3>
                  <p className="offdata-body" style={{ color: 'rgba(21, 21, 21, 0.75)', margin: 0 }}>{step.text}</p>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4.5rem' }}>
              <a href={CONFIG.whatsappUrl} target="_blank" rel="noopener noreferrer" className="offdata-btn offdata-btn--blue">
                <span>Quero começar meu projeto</span>
                <span className="offdata-btn__arrow" aria-hidden="true"><IconArrow /></span>
              </a>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            NOVA SEÇÃO — FAQ
        ═══════════════════════════════════════════ */}
        <section id="faq" className="offdata-section offdata-section--light" aria-label="Perguntas Frequentes">
          <div className="offdata-container offdata-container--tight">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '4rem' }}>
              <div className="offdata-tag offdata-tag--blue">
                <span className="offdata-tag__cube" aria-hidden="true" />
                <span>[FAQ]</span>
              </div>
              <h2 className="offdata-h2" style={{ color: 'var(--black)', maxWidth: '24ch' }}>
                Perguntas frequentes sobre criação de sites em Uberlândia
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75em' }}>
              {FAQ_ITEMS.map((item, idx) => (
                <details key={idx} style={{ background: 'rgba(4, 74, 179, 0.1)', borderRadius: '0.25em', overflow: 'hidden' }} className="lp-faq-item">
                  <summary style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: '1.5rem', alignItems: 'center', padding: '1.65em 2em', cursor: 'pointer', listStyle: 'none' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9em', color: 'var(--blue)', opacity: 0.8 }}>0{idx + 1}</span>
                    <h3 style={{ fontSize: '1.4em', fontWeight: 500, color: 'var(--blue)', margin: 0, lineHeight: 1.2 }}>{item.question}</h3>
                    <b aria-hidden="true" style={{ fontSize: '1.8em', fontWeight: 400, color: 'var(--blue)', transition: 'transform 0.3s ease' }}>+</b>
                  </summary>
                  <p className="offdata-body" style={{ color: 'var(--blue)', padding: '0 2em 2em 4.2rem', margin: 0, maxWidth: '65ch', opacity: 0.85 }}>{item.answer}</p>
                </details>
              ))}
            </div>

            <style>{`
              .lp-faq-item summary::-webkit-details-marker { display: none; }
              .lp-faq-item[open] b { transform: rotate(45deg); }
            `}</style>
          </div>
        </section>


        {/* ═══════════════════════════════════════════
            NOVA SEÇÃO — DEPOIMENTOS
        ═══════════════════════════════════════════ */}
        <section id="depoimentos" className="offdata-section offdata-section--light" aria-label="Depoimentos de clientes">
          <div className="offdata-container">
            <div className="lp-sec-header lp-sec-header--center" style={{ marginBottom: '3rem' }}>
              <div className="offdata-tag offdata-tag--blue" style={{ margin: '0 auto' }}>
                <span className="offdata-tag__cube" aria-hidden="true" />
                <span>[DEPOIMENTOS]</span>
              </div>
              <h2 className="offdata-h2" style={{ color: 'var(--black)', textAlign: 'center', maxWidth: '30ch' }}>
                O que dizem as empresas de Uberlândia que já criaram site com a gente
              </h2>
              <p className="offdata-body" style={{ textAlign: 'center', color: 'rgba(21, 21, 21, 0.75)' }}>
                Resultado real, contado por quem contratou.
              </p>
            </div>

            {/* Carrossel Container */}
            <div 
              style={{ position: 'relative', width: '100%', maxWidth: '1200px', margin: '0 auto' }}
            >
              
              <div style={{ overflow: 'hidden' }} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
                <div className="lp-test-track" style={{ '--idx': activeTestimonial }}>
                  {TESTIMONIALS.map((t, idx) => (
                    <div key={idx} className="lp-test-card">
                      <div style={{ background: 'var(--white)', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '0.75em', padding: '2.5em', width: '100%', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', position: 'relative' }}>
                        
                        {/* Selo Google */}
                        <div style={{ position: 'absolute', top: '1.5em', right: '1.5em', display: 'flex', alignItems: 'center', gap: '0.4em' }}>
                          <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.7 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
                          {/* Label técnico de fonte — font-mono correto para caption curta */}
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72em', letterSpacing: '-0.01em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.35)' }}>Google Review</span>
                        </div>

                        {/* Header do Card */}
                        <div style={{ display: 'flex', gap: '1em', alignItems: 'center', marginBottom: '1.5em' }}>
                          {/* Avatar com foto */}
                          <picture style={{ width: '3.5em', height: '3.5em', borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '2px solid rgba(4, 74, 179, 0.1)' }}>
                            <source srcSet={t.avatar} type="image/avif" />
                            <img src={t.avatar} alt={`Foto de perfil de ${t.name}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                          </picture>
                          <div>
                            {/* Nome — font-main, peso 500, tamanho em */}
                            <div style={{ fontFamily: 'var(--font-main)', fontWeight: 500, color: 'var(--black)', fontSize: '1em', lineHeight: 1.2 }}>{t.name}</div>
                            {/* Cargo — font-mono, label técnico curto */}
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72em', letterSpacing: '-0.01em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.45)', marginTop: '0.3em' }}>{t.role}, {t.company}</div>
                          </div>
                        </div>

                        {/* Estrelas */}
                        <div style={{ display: 'flex', gap: '0.2em', marginBottom: '1em' }} aria-label={`${t.rating} estrelas`}>
                          {[...Array(t.rating)].map((_, i) => (
                            <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#FBBC04"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                          ))}
                        </div>

                        {/* Texto do depoimento — font-main (corpo de texto, não label) */}
                        <p className="offdata-body" style={{ fontFamily: 'var(--font-main)', color: 'var(--black)', fontSize: '0.95em', lineHeight: 1.6, margin: 0, fontStyle: 'italic', fontWeight: 400 }}>"{t.text}"</p>
                        
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Setas (absolutas sobrepostas) */}
              <button 
                onClick={() => setActiveTestimonial((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                style={{ position: 'absolute', left: '-1rem', top: '50%', transform: 'translateY(-50%)', width: '48px', height: '48px', borderRadius: '50%', background: 'var(--white)', border: '1px solid rgba(0,0,0,0.1)', display: 'grid', placeItems: 'center', cursor: 'pointer', zIndex: 10, boxShadow: '0 4px 12px rgba(0,0,0,0.05)', color: 'var(--black)' }}
                aria-label="Depoimento anterior"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
              </button>
              
              <button 
                onClick={() => setActiveTestimonial((p) => (p + 1) % TESTIMONIALS.length)}
                style={{ position: 'absolute', right: '-1rem', top: '50%', transform: 'translateY(-50%)', width: '48px', height: '48px', borderRadius: '50%', background: 'var(--white)', border: '1px solid rgba(0,0,0,0.1)', display: 'grid', placeItems: 'center', cursor: 'pointer', zIndex: 10, boxShadow: '0 4px 12px rgba(0,0,0,0.05)', color: 'var(--black)' }}
                aria-label="Próximo depoimento"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>

            </div>

            {/* Dots */}
            <div className="lp-gallery__dots" role="tablist" aria-label="Paginação de depoimentos" style={{ marginTop: '2.5rem' }}>
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  className={`lp-dot ${activeTestimonial === i ? 'active' : ''}`}
                  style={{ borderColor: 'var(--black)', background: activeTestimonial === i ? 'var(--blue)' : 'transparent' }}
                  onClick={() => setActiveTestimonial(i)}
                  role="tab"
                  aria-selected={activeTestimonial === i}
                  aria-label={`Depoimento ${i + 1}`}
                />
              ))}
            </div>

            <style>{`
              .lp-test-track {
                display: flex;
                transition: transform 0.4s var(--ease-spring);
              }
              .lp-test-card {
                flex: 0 0 100%;
                padding: 0 1rem;
                display: flex;
                justify-content: center;
              }
              @media (max-width: 767px) {
                .lp-test-track { transform: translateX(calc(-100% * var(--idx))); }
              }
              @media (min-width: 768px) and (max-width: 1023px) {
                .lp-test-card { flex: 0 0 50%; }
                .lp-test-track { transform: translateX(calc(-50% * var(--idx))); }
              }
              @media (min-width: 1024px) {
                .lp-test-card { flex: 0 0 33.3333%; }
                .lp-test-track { transform: translateX(calc(-33.3333% * var(--idx))); }
              }
            `}</style>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            7. CTA BANNER FINAL
        ═══════════════════════════════════════════ */}
        <section id="cta" className="lp-cta-banner" aria-label="CTA — Chamada para ação" style={{ minHeight: '45vh', display: 'flex', alignItems: 'center' }}>
          
          <div className="lp-cta-banner__bg" aria-hidden="true">
            <picture style={{ width: '100%', height: '100%', display: 'block' }}>
              <source srcSet="/assets/services/cta-bg.avif" type="image/avif" />
              <img 
                src="/assets/services/cta-bg.avif" 
                alt="Equipe operando em negócios" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                loading="lazy"
              />
            </picture>
          </div>
          
          <div className="lp-cta-banner__overlay" aria-hidden="true" style={{ background: 'rgba(0,0,0,0.65)' }}></div>

          <div className="lp-cta-banner__inner" style={{ textAlign: 'center', margin: '0 auto' }}>
            <h2 className="lp-cta-banner__title" style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', lineHeight: 1.1, marginBottom: '0.4em', maxWidth: '32ch' }}>
              Pronto para ter um site que trabalha para o seu negócio?
            </h2>
            <p className="offdata-body" style={{ marginBottom: '2em', fontSize: '1.1rem', opacity: 0.9 }}>
              Fale com a nossa equipe em Uberlândia e receba uma proposta personalizada, sem compromisso.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <a href={CONFIG.whatsappUrl} target="_blank" rel="noopener noreferrer" className="offdata-btn offdata-btn--blue">
                <span>Fale conosco agora</span>
                <span className="offdata-btn__arrow" aria-hidden="true"><IconArrow /></span>
              </a>
            </div>
          </div>

        </section>

      </main>

      {/* ═══════════════════════════════════════════════
          8. FOOTER
      ═══════════════════════════════════════════════ */}
      <footer id="contato" className="lp-footer" role="contentinfo" style={{ paddingTop: '4em' }}>

        {/* Links do footer */}
        <div className="lp-footer__inner">

          {/* Coluna Logo (Esquerda) */}
          <div className="lp-footer__brand" style={{ display: 'flex', alignItems: 'center' }}>
            <img src={offDataWhiteLogo} alt="Off-Data" style={{ height: '40px', width: 'auto' }} />
          </div>

          {/* Colunas de Links (Direita / Abaixo no Mobile) */}
          <nav className="lp-footer__grid" aria-label="Links do rodapé">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title}>
                <div className="lp-footer-col__title">{col.title}</div>
                <ul className="lp-footer-col__links" role="list">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <a href="#">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

        </div>

        {/* Bottom bar (Copyright & Social) */}
        <div className="lp-footer__bottom">

          <span className="lp-footer__copy">
            © {new Date().getFullYear()} Off-Data. Todos os direitos reservados.
          </span>

          <div className="lp-footer__socials" aria-label="Redes sociais">
            <a href="#" className="lp-social-btn" aria-label="LinkedIn Off-Data" rel="noopener noreferrer" target="_blank">
              <IconLinkedin />
            </a>
            <a href="#" className="lp-social-btn" aria-label="Facebook Off-Data" rel="noopener noreferrer" target="_blank">
              {/* Fake FB Icon */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/offdata.digital_/" className="lp-social-btn" aria-label="Instagram Off-Data" rel="noopener noreferrer" target="_blank">
              <IconInstagram />
            </a>
          </div>

        </div>

      </footer>
    </div>
  );
};

export default ServicoLanding;
