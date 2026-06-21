import React from 'react';
import logo from '../../assets/images/Off - Data-branca.svg';
import { WHATSAPP_URL } from '../../constants/contact';

const footerMenus = [
  {
    title: 'Agência',
    links: [
      ['Início', '/#home'],
      ['Serviços', '/#products'],
      ['Nichos', '/#built-for'],
      ['Sobre', '/agencia'],
      ['Contato', WHATSAPP_URL],
    ],
  },
  {
    title: 'Serviços',
    links: [
      ['Sites Imersivos', '/#products'],
      ['SEO Local', '/#products'],
      ['Tráfego Cirúrgico', '/#products'],
      ['Landing Pages High-Ticket', '/#products'],
      ['Performance Web', '/#products'],
      ['Conteúdo Técnico', '/#products'],
      ['Automação B2B', '/#products'],
    ],
  },
  {
    title: 'Conteúdo',
    links: [
      ['Estratégias', '/#strategies-title'],
      ['Blog', '/#strategies-title'],
    ],
  },
  {
    title: 'Social',
    links: [
      ['Instagram, Off-Data', 'https://www.instagram.com/offdata.tsx/'],
      ['Perfil da Empresa, Off-Data', 'https://share.google/Sw8bCp5a2K4DAPCVn'],
    ],
  },
];

const FooterSection = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <style>{`
        .footer {
          width: 100vw;
          height: auto;
          background: var(--black);
          color: var(--white);
          overflow: hidden;
        }

        .footer .wrapper_footer {
          padding: 4.5em 1.75rem 1.5em;
        }

        .footer .flex_footer {
          display: flex;
          justify-content: space-between;
          gap: 5rem;
        }

        .footer .subscribe_newsletter {
          width: 35%;
        }

        .footer .form_subscribe {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          margin: 0;
        }

        .footer .title_subscribe {
          font-size: 2em;
          font-weight: 500;
          line-height: .9;
        }

        .footer .subscribe_form {
          display: flex;
          gap: .75em;
        }

        .footer .input_field {
          width: 100%;
          height: 3.12em;
          color: var(--white);
          background: transparent;
          border: 1px solid rgba(255, 255, 255, .25);
          border-radius: .25em;
          outline: none;
          padding: 0 1em;
          font: inherit;
        }

        .footer .input_field::placeholder {
          color: rgba(255, 255, 255, .45);
        }

        .footer .subscribe_button {
          height: 3.12em;
          color: var(--white);
          background: var(--blue);
          border: 0;
          border-radius: .25em;
          padding: .75em 2.5em;
          font: inherit;
          cursor: pointer;
        }

        .footer .menu_grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto auto;
          column-gap: 6em;
          row-gap: 5em;
        }

        .footer .menu_box {
          display: flex;
          flex-direction: column;
          gap: 1em;
        }

        .footer .title_menu {
          color: rgba(255, 255, 255, .45);
          font-size: .9em;
          font-weight: 500;
        }

        .footer .list_links {
          display: flex;
          flex-direction: column;
          gap: .42em;
        }

        .footer .footer_link,
        .footer .footer_last_link {
          color: var(--white);
          text-decoration: none;
          font-size: .95em;
          font-weight: 500;
          line-height: 1.2;
          transition: opacity .25s ease;
        }

        .footer .footer_link:hover,
        .footer .footer_last_link:hover {
          opacity: .65;
        }

        .footer .last_line {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-top: 20em;
          gap: 2rem;
        }

        .footer .flex_last,
        .footer .pp_et,
        .footer .last_pp {
          display: flex;
          align-items: flex-end;
          gap: 1.3em;
        }

        .footer .logo_footer {
          width: 20em;
        }

        .footer .logo_footer img {
          display: block;
          width: 100%;
          height: auto;
        }

        .footer .caption_box,
        .footer .footer_last_link {
          opacity: .45;
          font-size: .9em;
          font-weight: 500;
        }

        .footer .caption_box.only_mobile {
          display: none;
        }

        @media (max-width: 991px) {
          .footer .wrapper_footer {
            padding: 5rem 1.25rem 1.5rem;
          }

          .footer .subscribe_newsletter {
            width: 42%;
          }

          .footer .menu_grid {
            column-gap: 1em;
          }

          .footer .title_subscribe {
            font-size: 3em;
          }

          .footer .last_line {
            margin-top: 26em;
          }
        }

        @media (max-width: 767px) {
          .footer .wrapper_footer {
            padding: 4.5rem 1rem 1.5rem;
          }

          .footer .flex_footer {
            flex-direction: column;
            gap: 4.5rem;
          }

          .footer .subscribe_newsletter {
            width: 100%;
          }

          .footer .title_subscribe {
            font-size: clamp(2.7rem, 10vw, 4.5rem);
            line-height: .96;
          }

          .footer .subscribe_form {
            flex-direction: column;
            gap: .75rem;
          }

          .footer .input_field,
          .footer .subscribe_button {
            height: 3.4rem;
            font-size: .95rem;
          }

          .footer .menu_grid {
            width: 100%;
            grid-template-columns: .75fr 1fr;
            column-gap: 1em;
            row-gap: 4rem;
          }

          .footer .footer_link,
          .footer .title_menu {
            font-size: 1rem;
          }

          .footer .last_line {
            flex-direction: column;
            align-items: stretch;
            margin-top: 5.75rem;
            gap: .75rem;
          }

          .footer .flex_last,
          .footer .pp_et {
            flex-direction: column;
            align-items: stretch;
            gap: .75rem;
          }

          .footer .last_pp {
            flex-wrap: wrap;
            align-items: flex-start;
            gap: .75rem 1.2rem;
          }

          .footer .logo_footer {
            width: 100%;
          }

          .footer .caption_box,
          .footer .footer_last_link {
            font-size: .9rem;
          }

          .footer .caption_box.only_desktop {
            display: none;
          }

          .footer .caption_box.only_mobile {
            display: block;
          }
        }
      `}</style>

      <div className="wrapper_footer">
        <div className="flex_footer">
          <div className="subscribe_newsletter">
            <form
              className="form_subscribe"
              onSubmit={(event) => {
                event.preventDefault();
                
                const form = event.target;
                const emailInput = form.querySelector('input[type="email"]');
                const isEmailValid = emailInput && emailInput.value.trim() !== '' && emailInput.checkValidity();

                if (isEmailValid) {
                  import('../../utils/analytics').then(({ trackEvent }) => {
                    trackEvent('newsletter_submit', {
                      source_page: window.location.pathname,
                      form_name: 'newsletter_footer'
                    });
                  });
                }
                
                window.open(WHATSAPP_URL, '_blank', 'noopener,noreferrer');
                form.reset(); // Opcional, reseta o campo após o envio
              }}
            >
              <div className="title_subscribe">
                Fale com
                <br />
                a Off-Data em Uberlândia
              </div>
              <div className="subscribe_form">
                <input aria-label="Seu e-mail profissional para receber novidades da Off-Data" className="input_field w-input" placeholder="E-mail profissional" name="email" type="email" required />
                <button type="submit" className="subscribe_button w-button" aria-label="Enviar formulário para falar com a Off-Data">Enviar</button>
              </div>
            </form>
          </div>

          <div className="menu_grid">
            {footerMenus.map((menu) => (
              <div className="menu_box" key={menu.title}>
                <div className="title_menu">{menu.title}</div>
                <div className="list_links">
                  {menu.links.map(([label, href]) => (
                    <a
                      key={label}
                      href={href}
                      className="footer_link w-inline-block"
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href === WHATSAPP_URL ? 'noopener noreferrer' : href.startsWith('http') ? 'noreferrer' : undefined}
                      onClick={(e) => {
                        if (href === WHATSAPP_URL || href.includes('wa.me')) {
                          import('../../utils/analytics').then(({ trackEvent }) => {
                            trackEvent('click_whatsapp', {
                              source_page: window.location.pathname,
                              link_url: href,
                              cta_text: label
                            });
                          });
                        }
                      }}
                    >
                      <div>{label}</div>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="last_line">
          <div className="flex_last">
            <div className="logo_footer">
              <img src={logo} alt="Off-Data Logotype" />
            </div>
            <div className="mobile_line">
              <div className="caption_box">©{year} Off-Data</div>
              <div className="caption_box only_mobile">Todos os direitos reservados.</div>
            </div>
          </div>
          <div className="pp_et">
            <div className="last_pp">
              <a href="/privacy-policy" target="_blank" rel="noreferrer" className="footer_last_link w-inline-block">Política de Privacidade</a>
              <a href="/terms-and-conditions" target="_blank" rel="noreferrer" className="footer_last_link w-inline-block">Termos de Uso</a>
              <a href="/cookie-policy" target="_blank" rel="noreferrer" className="footer_last_link w-inline-block">Política de Cookies</a>
            </div>
            <div className="caption_box only_desktop">Todos os direitos reservados.</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
