import React, { useState, useEffect, useRef, useCallback } from 'react';
import offDataWhiteLogo from '../assets/images/Off - Data-branca.svg';
import offDataBlueLogo from '../assets/images/offdataazul.svg';
import arrowDiagonal from '../assets/images/arrow-diagonal.svg';
import { WHATSAPP_LINK_PROPS } from '../constants/contact';

/**
 * Cabeçalho principal da Off-Data.
 *
 * Estrutura original preservada:
 * header > wrapper_header > flexbox_header
 *   - logo_box > logotype > svg_logo
 *   - menu (com capsule blur) > link_header (com w--current)
 *   - right_menu (com capsule blur) > link_header + button_primary
 *   - hamburger_link (mobile)
 */

const Header = () => {
  const isAgencyPage = window.location.pathname.replace(/\/+$/, '') === '/agencia'
    || new URLSearchParams(window.location.search).get('page') === 'agencia';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLightSection, setIsLightSection] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let frame = 0;

    const updateLogoTheme = () => {
      frame = 0;
      const header = headerRef.current;
      if (!header) return;

      const isDesktop = window.matchMedia("(min-width: 991px)").matches;
      if (!isDesktop) {
        setIsLightSection(false);
        return;
      }

      const logo = header.querySelector(".logotype");
      const rect = logo?.getBoundingClientRect() || header.getBoundingClientRect();
      const x = Math.max(0, Math.min(window.innerWidth - 1, rect.left + rect.width / 2));
      const y = Math.max(0, Math.min(window.innerHeight - 1, rect.bottom + 8));

      const isOverLightSection = document
        .elementsFromPoint(x, y)
        .some((element) => {
          if (header.contains(element)) return false;
          return Boolean(element.closest('[data-section="light"], .light--theme, .cta_box'));
        });

      setIsLightSection(isOverLightSection);
    };

    const scheduleUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateLogoTheme);
    };

    updateLogoTheme();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  // line-reveal hover effect (desktop only)
  const initLineReveal = useCallback(() => {
    if (!headerRef.current) return;
    const mq = window.matchMedia("(min-width: 992px) and (hover: hover) and (pointer: fine)");
    if (!mq.matches) return;

    const elements = headerRef.current.querySelectorAll("[data-line-reveal] > div");
    elements.forEach((el) => {
      if (el.querySelector(".line-inner")) return;
      const txt = (el.textContent || "").trim();
      if (!txt) return;
      el.textContent = "";
      const inner = document.createElement("span");
      inner.className = "line-inner";
      inner.dataset.text = txt;
      inner.textContent = txt;
      el.appendChild(inner);
    });

    // Also handle button_primary flex_button > div:first-child
    const btnElements = headerRef.current.querySelectorAll(".button_primary .flex_button > div:first-child");
    btnElements.forEach((el) => {
      if (el.querySelector(".line-inner")) return;
      const txt = (el.textContent || "").trim();
      if (!txt) return;
      el.textContent = "";
      const inner = document.createElement("span");
      inner.className = "line-inner";
      inner.dataset.text = txt;
      inner.textContent = txt;
      el.appendChild(inner);
    });
  }, []);

  useEffect(() => {
    // Small delay to ensure DOM is rendered
    const timer = setTimeout(initLineReveal, 100);
    return () => clearTimeout(timer);
  }, [initLineReveal]);

  return (
    <header className={`header ${isScrolled ? 'is-scrolled' : ''} ${isLightSection ? 'is-light-section' : ''}`} ref={headerRef}>
      <style>{`
        /* ═══════════════════════════════════════════════════════════════════
           HEADER OFF-DATA
           ═══════════════════════════════════════════════════════════════════ */

        .header {
          z-index: 99;
          position: fixed;
          inset: 0% 0% auto;
        }

        .header.is-scrolled {
          /* No original, header is always transparent over blue hero.
             When scrolled over light sections, .is-light-section adds blue bg.
             For scroll state, keep a subtle backdrop. */
        }

        .wrapper_header {
          padding: .875em 1.75rem;
          position: relative;
          z-index: 2;
        }

        .flexbox_header {
          grid-column-gap: 0px;
          grid-row-gap: 0px;
          grid-template-rows: auto;
          grid-template-columns: 1fr 1fr 1fr;
          grid-auto-columns: 1fr;
          justify-content: flex-start;
          place-items: stretch start;
          display: grid;
        }

        /* ── Logo ── */
        .logo_box {
          justify-content: flex-start;
          align-items: center;
          display: flex;
        }

        .logotype {
          width: 9em;
          height: 2em;
          display: inline-flex;
          align-items: center;
          text-decoration: none;
          transition: opacity 280ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .logotype:hover {
          opacity: 0.7;
        }

        .svg_logo {
          background-image: url('${offDataWhiteLogo}');
          background-position: 50%;
          background-repeat: no-repeat;
          background-size: contain;
          width: 100%;
          height: 100%;
        }

        /* ── Menu (centro) — Cápsula com blur ── */
        .menu {
          grid-column-gap: .25em;
          -webkit-backdrop-filter: blur(7px);
          backdrop-filter: blur(7px);
          background-color: #011E4CD0;
          border-radius: .25em;
          justify-content: flex-start;
          align-items: stretch;
          margin-left: 0;
          padding: .25em;
          display: flex;
        }

        /* ── Links do header ── */
        .link_header {
          color: var(--white, #fff);
          letter-spacing: 0;
          justify-content: center;
          align-items: center;
          padding: .75em 1.125em;
          font-size: .84em;
          font-weight: 500;
          line-height: 1;
          text-decoration: none;
          transition: all .4s;
          display: flex;
        }

        /* ── Estado ativo (Home) ── */
        .link_header.w--current {
          background-color: var(--white, #fff);
          color: var(--blue, #044ab3);
          border-radius: .18em;
        }

        /* ── Right menu — Cápsula com blur ── */
        .right_menu {
          grid-column-gap: .25em;
          -webkit-backdrop-filter: blur(7px);
          backdrop-filter: blur(7px);
          background-color: #011E4CD0;
          border-radius: .25em;
          justify-content: flex-start;
          align-items: stretch;
          margin-left: auto;
          padding: .25em .375em .25em .25em;
          display: flex;
        }

        /* ── Botão CTA (branco, texto azul) ── */
        .button_primary {
          background-color: var(--white, #fff);
          height: auto;
          color: var(--blue, #044ab3);
          letter-spacing: -.02em;
          border-radius: .1875em;
          justify-content: flex-start;
          align-items: stretch;
          padding: .25em .25em .25em .75em;
          font-size: .82em;
          font-weight: 500;
          text-decoration: none;
          display: flex;
          cursor: pointer;
          transition: opacity 320ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .button_primary:hover {
          opacity: 0.9;
        }

        .flex_button {
          grid-column-gap: 1.125em;
          letter-spacing: 0;
          justify-content: flex-start;
          align-items: stretch;
          display: flex;
        }

        .text_header {
          margin-top: auto;
          margin-bottom: auto;
          white-space: nowrap;
        }

        /* ── Icon arrow (quadrado azul com seta pixelada) ── */
        .icon_arrow {
          aspect-ratio: 1;
          background-color: var(--blue, #044ab3);
          border-radius: .1875em;
          justify-content: center;
          align-items: stretch;
          width: auto;
          height: auto;
          padding: .5em;
          font-size: 1vw;
          display: flex;
          overflow: hidden;
        }

        .arrow_primary {
          background-image: url('${arrowDiagonal}');
          background-position: 50%;
          background-repeat: no-repeat;
          background-size: contain;
          width: 100%;
          height: 100%;
        }

        /* ── Hamburger (mobile) ── */
        .hamburger_link {
          display: none;
          appearance: none;
          border: 0;
          background: transparent;
          padding: 0;
          font: inherit;
          cursor: pointer;
        }

        .hamburger {
          display: none;
        }

        .cube_hamb {
          background-color: var(--white, #fff);
          border-radius: .5px;
          width: 8px;
          height: 8px;
        }

        .close_txt {
          display: none;
          font-size: 0.9em;
          color: var(--white, #fff);
        }

        .open_txt {
          font-size: 0.9em;
          color: var(--white, #fff);
        }

        /* ── Header transitions for menu/right_menu ── */
        .header .menu,
        .header .right_menu {
          transition: background-color 420ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .header .svg_logo {
          transition: opacity 280ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        /* When over a light section, swap capsule bg to blue */
        .header.is-light-section .menu,
        .header.is-light-section .right_menu {
          background: #044ab3;
        }

        @media (min-width: 991px) {
          .header.is-light-section .svg_logo {
            background-image: url('${offDataBlueLogo}');
          }
        }

        /* ═══════════════════════════════════════════════════════════════════
           LINE-REVEAL hover animation (desktop only)
           ═══════════════════════════════════════════════════════════════════ */
        @media (min-width: 992px) and (hover: hover) and (pointer: fine) {
          [data-line-reveal] > div,
          .button_primary .flex_button > div:first-child {
            position: relative;
            display: block;
            overflow: hidden;
            height: 1.25em;
            line-height: 1.25em;
          }

          [data-line-reveal] .line-inner,
          .button_primary .flex_button > div:first-child .line-inner {
            position: relative;
            display: block;
            transform: translateY(0%);
            transition: transform 950ms cubic-bezier(0.16, 1, 0.3, 1);
            will-change: transform;
          }

          [data-line-reveal] .line-inner::after,
          .button_primary .flex_button > div:first-child .line-inner::after {
            content: attr(data-text);
            position: absolute;
            left: 0;
            top: 100%;
            white-space: nowrap;
          }

          [data-line-reveal]:hover .line-inner,
          [data-line-reveal]:focus-visible .line-inner,
          .button_primary:hover .flex_button > div:first-child .line-inner,
          .button_primary:focus-visible .flex_button > div:first-child .line-inner {
            transform: translateY(-100%);
          }

          /* Dim siblings on hover */
          .header [data-line-reveal] {
            transition: opacity 320ms cubic-bezier(0.22, 1, 0.36, 1);
          }

          .header:has([data-line-reveal]:hover) [data-line-reveal] {
            opacity: 0.65;
          }

          .header:has([data-line-reveal]:hover) [data-line-reveal]:hover,
          .header:has([data-line-reveal]:hover) [data-line-reveal]:focus-visible {
            opacity: 1;
          }

          /* Arrow animation on CTA hover */
          .icon_arrow {
            position: relative;
            width: 1.875em;
            height: 1.875em;
            overflow: hidden;
          }

          .icon_arrow .arrow_primary {
            position: absolute;
            left: 50%;
            top: 50%;
            width: 14px;
            height: 14px;
            opacity: 1;
            transform: translate(-50%, -50%);
            transition: transform 620ms cubic-bezier(0.22, 1, 0.36, 1),
                        opacity 620ms cubic-bezier(0.22, 1, 0.36, 1);
            z-index: 2;
          }

          .icon_arrow::after {
            content: "";
            position: absolute;
            left: 50%;
            top: 50%;
            width: 14px;
            height: 14px;
            background: url('${arrowDiagonal}') center / contain no-repeat;
            transform: translate(calc(-50% - 24px), calc(-50% + 24px));
            opacity: 0;
            transition: transform 620ms cubic-bezier(0.22, 1, 0.36, 1),
                        opacity 620ms cubic-bezier(0.22, 1, 0.36, 1);
            z-index: 1;
          }

          .button_primary:hover .icon_arrow .arrow_primary,
          .button_primary:focus-visible .icon_arrow .arrow_primary {
            transform: translate(calc(-50% + 24px), calc(-50% - 24px));
            opacity: 0;
          }

          .button_primary:hover .icon_arrow::after,
          .button_primary:focus-visible .icon_arrow::after {
            transform: translate(-50%, -50%);
            opacity: 1;
          }
        }

        /* ═══════════════════════════════════════════════════════════════════
           MOBILE MENU
           ═══════════════════════════════════════════════════════════════════ */
        .mobile_menu {
          position: fixed;
          inset: 0;
          z-index: 98;
          background-color: var(--blue, #044ab3);
          display: none;
          flex-direction: column;
          padding: 6em 1.75rem 2rem;
          overflow-y: auto;
        }

        .mobile_menu.is-open {
          display: flex;
        }

        .wrapper_mobile_menu {
          display: flex;
          flex-direction: column;
          gap: 2em;
        }

        .menu_links {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .mobile_link {
          color: var(--white, #fff);
          text-decoration: none;
          font-size: 1.6em;
          font-weight: 500;
          position: relative;
          display: inline-flex;
          align-items: center;
          padding-left: 0;
          transition: padding-left .25s ease;
        }

        .mobile_link .cube_active {
          position: absolute;
          left: 0;
          top: 50%;
          width: 8px;
          height: 8px;
          background-color: var(--white, #fff);
          transform: translateY(-50%) scale(.7);
          opacity: 0;
          pointer-events: none;
          transition: opacity .25s ease, transform .25s ease;
        }

        .mobile_link.w--current {
          padding-left: 20px;
        }

        .mobile_link.w--current .cube_active {
          opacity: 1;
          transform: translateY(-50%) scale(1);
        }

        /* ═══════════════════════════════════════════════════════════════════
           RESPONSIVE — 991px (Tablet)
           ═══════════════════════════════════════════════════════════════════ */
        @media screen and (max-width: 990px) {
          .header {
            background-color: var(--blue, #044ab3);
          }

          .wrapper_header {
            padding: 1rem 1.2rem;
          }

          .flexbox_header {
            display: flex;
          }

          .logotype {
            width: 16em;
            height: 2.8em;
          }

          .menu,
          .right_menu {
            display: none;
          }

          .hamburger {
            grid-column-gap: 0px;
            grid-row-gap: 0px;
            grid-template-rows: auto auto;
            grid-template-columns: 1fr 1fr;
            grid-auto-columns: 1fr;
            place-items: center;
            width: 32px;
            height: 32px;
            display: grid;
            position: relative;
          }

          .cube_hamb {
            background-color: var(--white, #fff);
            border-radius: .5px;
            width: 8px;
            height: 8px;
          }

          .cube_hamb.middle_cube {
            margin: auto;
            position: absolute;
            inset: 0%;
            transform: scale(0);
          }

          .hamburger_link {
            grid-column-gap: 12px;
            justify-content: flex-start;
            align-items: center;
            margin-left: auto;
            font-size: 1.85em;
            display: flex;
          }

          .close_txt {
            display: none;
          }

          /* Show close_txt when menu is open */
          .hamburger_link.is-open .close_txt {
            display: block;
          }

          .hamburger_link.is-open .open_txt {
            display: none;
          }
        }

        /* ═══════════════════════════════════════════════════════════════════
           RESPONSIVE — 767px (Mobile)
           ═══════════════════════════════════════════════════════════════════ */
        @media screen and (max-width: 767px) {
          .wrapper_header {
            padding: 0.8rem 1rem;
          }

          .logotype {
            width: 8.35em;
            height: 1.5em;
          }

          .hamburger_link {
            grid-column-gap: 10px;
            font-size: 1em;
          }

          .hamburger {
            width: 24px;
            height: 24px;
          }

          .cube_hamb {
            width: 6px;
            height: 6px;
          }
        }

        /* ═══════════════════════════════════════════════════════════════════
           RESPONSIVE — 479px (Small Mobile)
           ═══════════════════════════════════════════════════════════════════ */
        @media screen and (max-width: 479px) {
          .logotype {
            width: 8.1em;
            height: 1.45em;
          }

          .hamburger_link {
            font-size: 0.95em;
          }
        }
      `}</style>

      {/* Desktop/Tablet Header */}
      <div className="wrapper_header">
        <div className="flexbox_header">
          {/* Logo */}
          <div className="logo_box">
            <a aria-label="Off-Data" href="/" className="logotype w-inline-block">
              <div className="svg_logo"></div>
            </a>
          </div>

          {/* Menu central (com capsule blur) */}
          <div className="menu">
            <a data-line-reveal="" href="/#home" className={`link_header w-inline-block ${isAgencyPage ? '' : 'w--current'}`}>
              <div>Início</div>
            </a>
            <a data-line-reveal="" href="/#products" className="link_header w-inline-block">
              <div>Serviços</div>
            </a>
            <a data-line-reveal="" href="/#built-for" className="link_header w-inline-block">
              <div>Nichos</div>
            </a>
            <a data-line-reveal="" href="/#strategies-title" className="link_header w-inline-block">
              <div>Estratégias</div>
            </a>
            <a data-line-reveal="" href="/blog" className="link_header w-inline-block">
              <div>Blog</div>
            </a>
          </div>

          {/* Right menu (com capsule blur) */}
          <div className="right_menu">
            <a data-line-reveal="" href="/#cutting-edge" className="link_header w-inline-block">
              <div>Cases</div>
            </a>
            <a data-line-reveal="" href="/agencia" className={`link_header w-inline-block ${isAgencyPage ? 'w--current' : ''}`}>
              <div>Sobre</div>
            </a>
            <a {...WHATSAPP_LINK_PROPS} className="button_primary w-inline-block">
              <div className="flex_button">
                <div className="text_header">Entre em contato</div>
                <div className="icon_arrow">
                  <div className="arrow_primary"></div>
                </div>
              </div>
            </a>
          </div>

          {/* Hamburger (mobile/tablet) */}
          <button
            type="button"
            className={`hamburger_link ${isMenuOpen ? 'is-open' : ''}`}
            aria-label={isMenuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="close_txt">Fechar</div>
            <div className="open_txt">Menu</div>
            <div className="hamburger">
              <div className="cube_hamb"></div>
              <div className="cube_hamb"></div>
              <div className="cube_hamb middle_cube"></div>
              <div className="cube_hamb"></div>
              <div className="cube_hamb"></div>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div id="mobile-navigation" className={`mobile_menu ${isMenuOpen ? 'is-open' : ''}`}>
        <div className="wrapper_mobile_menu">
          <div className="menu_links">
            <a href="/#home" className={`mobile_link w-inline-block ${isAgencyPage ? '' : 'w--current'}`} onClick={() => setIsMenuOpen(false)}>
              <div className="cube_active"></div>
              <div>Início</div>
            </a>
            <a href="/#products" className="mobile_link w-inline-block" onClick={() => setIsMenuOpen(false)}>
              <div className="cube_active"></div>
              <div>Serviços</div>
            </a>
            <a href="/agencia" className={`mobile_link w-inline-block ${isAgencyPage ? 'w--current' : ''}`} onClick={() => setIsMenuOpen(false)}>
              <div className="cube_active"></div>
              <div>Sobre</div>
            </a>
            <a href="/#built-for" className="mobile_link w-inline-block" onClick={() => setIsMenuOpen(false)}>
              <div className="cube_active"></div>
              <div>Nichos</div>
            </a>
            <a href="/#cutting-edge" className="mobile_link w-inline-block" onClick={() => setIsMenuOpen(false)}>
              <div className="cube_active"></div>
              <div>Cases</div>
            </a>
            <a {...WHATSAPP_LINK_PROPS} className="mobile_link w-inline-block" onClick={() => setIsMenuOpen(false)}>
              <div className="cube_active"></div>
              <div>Contato</div>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
