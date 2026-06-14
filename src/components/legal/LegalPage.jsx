import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import whiteLogo from '../../assets/images/Off - Data-branca.svg';

const LAST_UPDATED = '6 de junho de 2026';
const PRIVACY_EMAIL = 'privacidade@offdata.digital';

const legalPages = {
  '/privacy-policy': {
    eyebrow: 'Privacidade e dados',
    title: 'Política de Privacidade',
    description: 'Como a Off-Data coleta, utiliza, protege e compartilha dados pessoais em suas interações digitais.',
    intro: 'Esta Política explica, de forma objetiva e transparente, como a Off-Data Engenharia Digital trata dados pessoais de visitantes, potenciais clientes, clientes e demais pessoas que interagem conosco.',
    sections: [
      {
        title: '1. Quem controla os dados',
        paragraphs: [
          'A Off-Data Engenharia Digital, com atuação em Uberlândia e no Triângulo Mineiro, é a controladora dos dados pessoais tratados por meio deste site e dos seus canais de atendimento.',
          `Dúvidas e solicitações relacionadas à privacidade podem ser enviadas para ${PRIVACY_EMAIL}.`,
        ],
      },
      {
        title: '2. Dados que podemos coletar',
        bullets: [
          'Dados fornecidos diretamente, como nome, e-mail profissional, telefone, empresa, cargo e conteúdo de mensagens.',
          'Dados técnicos, como endereço IP, tipo de dispositivo, navegador, páginas acessadas, data, horário e origem do acesso.',
          'Dados comerciais e contratuais necessários para elaborar propostas, prestar serviços, emitir documentos e manter o relacionamento.',
          'Preferências de comunicação e registros de consentimento, quando aplicável.',
        ],
      },
      {
        title: '3. Finalidades do tratamento',
        bullets: [
          'Responder contatos, solicitações e pedidos de proposta.',
          'Planejar, contratar, executar e aprimorar nossos serviços.',
          'Realizar comunicações institucionais e comerciais compatíveis com o relacionamento mantido.',
          'Mensurar desempenho, segurança e usabilidade do site.',
          'Cumprir obrigações legais, regulatórias, fiscais e contratuais.',
          'Prevenir fraudes, abusos e incidentes de segurança.',
        ],
      },
      {
        title: '4. Bases legais',
        paragraphs: [
          'Tratamos dados pessoais conforme as bases legais previstas na Lei Geral de Proteção de Dados Pessoais, incluindo execução de contrato e procedimentos preliminares, cumprimento de obrigação legal, exercício regular de direitos, legítimo interesse e consentimento, quando necessário.',
        ],
      },
      {
        title: '5. Compartilhamento de dados',
        paragraphs: [
          'Podemos compartilhar dados estritamente necessários com fornecedores de hospedagem, infraestrutura, comunicação, análise, gestão comercial, contabilidade e outros operadores que apoiem nossas atividades. Também poderemos compartilhar dados quando exigido por lei ou por autoridade competente.',
          'Exigimos que fornecedores adotem medidas adequadas de segurança e utilizem os dados somente para as finalidades contratadas.',
        ],
      },
      {
        title: '6. Armazenamento e segurança',
        paragraphs: [
          'Mantemos os dados pelo período necessário para cumprir as finalidades informadas, obrigações legais e exercício regular de direitos. Adotamos medidas técnicas e administrativas razoáveis para reduzir riscos de acesso não autorizado, perda, alteração ou divulgação indevida.',
          'Nenhum ambiente digital é completamente imune a incidentes. Caso ocorra evento relevante, adotaremos as medidas cabíveis conforme a legislação aplicável.',
        ],
      },
      {
        title: '7. Direitos do titular',
        bullets: [
          'Confirmar a existência de tratamento e acessar seus dados.',
          'Solicitar correção de dados incompletos, inexatos ou desatualizados.',
          'Solicitar anonimização, bloqueio ou eliminação, quando aplicável.',
          'Obter informações sobre compartilhamentos realizados.',
          'Revogar consentimento e solicitar eliminação de dados tratados com essa base legal.',
          'Apresentar oposição ou solicitar revisão de decisões automatizadas, quando aplicável.',
        ],
        note: `Para exercer seus direitos, envie uma solicitação para ${PRIVACY_EMAIL}. Poderemos pedir informações adicionais para confirmar sua identidade e proteger seus dados.`,
      },
      {
        title: '8. Transferências internacionais',
        paragraphs: [
          'Alguns fornecedores de tecnologia podem processar dados fora do Brasil. Nessas situações, buscamos utilizar fornecedores reconhecidos e adotar mecanismos compatíveis com a LGPD para proteção das informações.',
        ],
      },
      {
        title: '9. Atualizações desta Política',
        paragraphs: [
          'Esta Política poderá ser atualizada para refletir mudanças legais, tecnológicas ou operacionais. A versão vigente e sua data de atualização permanecerão disponíveis nesta página.',
        ],
      },
    ],
  },
  '/terms-and-conditions': {
    eyebrow: 'Regras de utilização',
    title: 'Termos de Uso',
    description: 'Condições para acesso e utilização do site institucional da Off-Data Engenharia Digital.',
    intro: 'Ao acessar este site, você declara ter lido e concordado com estes Termos de Uso. Caso não concorde, recomendamos que interrompa a navegação.',
    sections: [
      {
        title: '1. Finalidade do site',
        paragraphs: [
          'Este site apresenta informações institucionais, conteúdos, serviços e formas de contato da Off-Data Engenharia Digital. As informações possuem caráter geral e não constituem proposta comercial definitiva, garantia de resultado ou aconselhamento jurídico, financeiro ou técnico.',
        ],
      },
      {
        title: '2. Uso permitido',
        paragraphs: ['Você concorda em utilizar o site de forma ética, legal e compatível com sua finalidade. É proibido:'],
        bullets: [
          'Tentar obter acesso não autorizado a sistemas, dados ou áreas restritas.',
          'Inserir códigos maliciosos, realizar ataques, testes não autorizados ou interferir no funcionamento do site.',
          'Copiar, explorar ou distribuir conteúdos de forma que viole direitos da Off-Data ou de terceiros.',
          'Utilizar o site para atividades ilícitas, fraudulentas ou prejudiciais.',
        ],
      },
      {
        title: '3. Propriedade intelectual',
        paragraphs: [
          'Textos, identidade visual, marcas, logotipos, layouts, animações, códigos, imagens e demais conteúdos próprios são protegidos pela legislação aplicável. Nenhum direito de propriedade intelectual é transferido ao visitante pelo simples acesso ao site.',
          'Materiais de terceiros permanecem sujeitos aos direitos e licenças de seus respectivos titulares.',
        ],
      },
      {
        title: '4. Serviços e propostas comerciais',
        paragraphs: [
          'Escopos, valores, prazos, responsabilidades e condições de prestação de serviços somente serão vinculantes quando formalizados em proposta, contrato ou instrumento específico aceito pelas partes.',
          'Resultados de marketing, posicionamento, tráfego ou conversão dependem de múltiplos fatores e não podem ser garantidos de forma absoluta.',
        ],
      },
      {
        title: '5. Links e serviços de terceiros',
        paragraphs: [
          'O site pode conter links para páginas, plataformas e serviços externos. A Off-Data não controla e não se responsabiliza pelas práticas, disponibilidade, conteúdos ou políticas desses terceiros.',
        ],
      },
      {
        title: '6. Disponibilidade e limitações',
        paragraphs: [
          'Buscamos manter o site atualizado, seguro e disponível, mas não garantimos funcionamento ininterrupto ou ausência total de erros. Poderemos alterar, suspender ou remover conteúdos e funcionalidades sem aviso prévio.',
          'Na extensão permitida pela legislação, a Off-Data não será responsável por danos decorrentes do uso indevido do site, indisponibilidades externas ou decisões tomadas exclusivamente com base em conteúdos gerais aqui publicados.',
        ],
      },
      {
        title: '7. Privacidade',
        paragraphs: [
          'O tratamento de dados pessoais relacionado ao site segue nossa Política de Privacidade e nossa Política de Cookies, que integram estes Termos.',
        ],
      },
      {
        title: '8. Legislação e foro',
        paragraphs: [
          'Estes Termos são regidos pelas leis da República Federativa do Brasil. Eventuais controvérsias serão tratadas preferencialmente de forma amigável e, quando necessário, submetidas ao foro competente conforme a legislação aplicável.',
        ],
      },
      {
        title: '9. Contato e atualizações',
        paragraphs: [
          `Dúvidas sobre estes Termos podem ser enviadas para ${PRIVACY_EMAIL}. A versão vigente e sua data de atualização permanecerão disponíveis nesta página.`,
        ],
      },
    ],
  },
  '/cookie-policy': {
    eyebrow: 'Preferências digitais',
    title: 'Política de Cookies',
    description: 'Informações sobre cookies, tecnologias semelhantes e suas escolhas ao navegar no site da Off-Data.',
    intro: 'Cookies são pequenos arquivos ou identificadores armazenados no dispositivo durante a navegação. Eles podem ser utilizados para viabilizar funcionalidades, reforçar segurança e compreender o desempenho do site.',
    sections: [
      {
        title: '1. Como utilizamos cookies',
        paragraphs: [
          'No lançamento inicial, este site utiliza apenas recursos técnicos necessários ao seu funcionamento e poderá utilizar dados técnicos de acesso fornecidos pela infraestrutura de hospedagem e segurança.',
          'Caso ferramentas de análise, publicidade, formulários ou integrações de terceiros sejam ativadas, esta Política e os mecanismos de escolha serão atualizados antes ou no momento da ativação.',
        ],
      },
      {
        title: '2. Categorias de cookies',
        bullets: [
          'Necessários: viabilizam segurança, navegação e funcionamento essencial. Não podem ser desativados por nosso sistema quando indispensáveis.',
          'Preferências: lembram escolhas do visitante para personalizar a experiência.',
          'Desempenho e análise: ajudam a compreender acessos, páginas visitadas e desempenho agregado.',
          'Marketing: permitem medir campanhas e apresentar comunicações mais relevantes, quando utilizados mediante base legal adequada.',
        ],
      },
      {
        title: '3. Cookies de terceiros',
        paragraphs: [
          'Serviços incorporados ou acessados por links externos podem utilizar seus próprios cookies. Esses terceiros são responsáveis por suas práticas e políticas. Recomendamos consultar os documentos de privacidade de cada serviço.',
        ],
      },
      {
        title: '4. Suas escolhas',
        paragraphs: [
          'Você pode gerenciar ou excluir cookies diretamente nas configurações do navegador. O bloqueio de cookies necessários poderá afetar algumas funcionalidades.',
          'Quando cookies opcionais forem utilizados, disponibilizaremos mecanismo apropriado para aceitar, rejeitar ou ajustar preferências, conforme aplicável.',
        ],
      },
      {
        title: '5. Retenção',
        paragraphs: [
          'Cookies podem ser de sessão, eliminados ao fechar o navegador, ou persistentes, mantidos por prazo determinado. Sempre que possível, limitaremos sua duração ao necessário para a finalidade informada.',
        ],
      },
      {
        title: '6. Dados pessoais e direitos',
        paragraphs: [
          `Quando informações coletadas por cookies forem consideradas dados pessoais, o tratamento seguirá nossa Política de Privacidade e a LGPD. Solicitações podem ser enviadas para ${PRIVACY_EMAIL}.`,
        ],
      },
      {
        title: '7. Atualizações desta Política',
        paragraphs: [
          'Esta Política poderá ser atualizada conforme novas tecnologias ou ferramentas sejam incorporadas ao site. A versão vigente e sua data de atualização permanecerão disponíveis nesta página.',
        ],
      },
    ],
  },
};

const LegalPage = ({ path }) => {
  const page = legalPages[path] || legalPages['/privacy-policy'];

  useEffect(() => {
    const canonicalUrl = `https://www.offdata.digital${path}`;
    const previousTitle = document.title;
    const description = document.querySelector('meta[name="description"]');
    const canonical = document.querySelector('link[rel="canonical"]');
    const previousDescription = description?.getAttribute('content');
    const previousCanonical = canonical?.getAttribute('href');

    document.title = `${page.title} | Off-Data`;
    description?.setAttribute('content', page.description);
    canonical?.setAttribute('href', canonicalUrl);

    window.scrollTo(0, 0);

    return () => {
      document.title = previousTitle;
      if (previousDescription) description?.setAttribute('content', previousDescription);
      if (previousCanonical) canonical?.setAttribute('href', previousCanonical);
    };
  }, [page, path]);

  return (
    <div className="legal-page">
      <Helmet>
        <title>{page.title} | Off-Data</title>
        <meta name="description" content={page.description} />
        <link rel="canonical" href={`https://www.offdata.digital${path}`} />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <style>{`
        .legal-page {
          min-height: 100vh;
          background: var(--white);
          color: var(--blue);
        }

        .legal-nav {
          position: sticky;
          z-index: 10;
          top: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          padding: .85rem 1.75rem;
          background: rgba(4, 74, 179, .96);
          backdrop-filter: blur(12px);
        }

        .legal-nav__logo {
          display: block;
          width: 9rem;
        }

        .legal-nav__logo img {
          width: 100%;
        }

        .legal-nav__links {
          display: flex;
          align-items: center;
          gap: 1.3rem;
          font-family: 'Fragment Mono', monospace;
          font-size: .68rem;
          text-transform: uppercase;
        }

        .legal-nav__links a {
          padding: .55rem .7rem;
          border-radius: 3px;
          color: var(--white);
          transition: background-color .25s ease;
        }

        .legal-nav__links a:hover,
        .legal-nav__links a[aria-current="page"] {
          background: rgba(255, 255, 255, .16);
        }

        .legal-hero {
          display: grid;
          grid-template-columns: minmax(0, 1.2fr) minmax(18rem, .8fr);
          gap: 4rem;
          min-height: 34rem;
          padding: 6.5rem 1.75rem 4rem;
          border-bottom: 1px solid rgba(4, 74, 179, .22);
        }

        .legal-eyebrow {
          display: flex;
          align-items: center;
          gap: .65rem;
          margin-bottom: 1.6rem;
          font-family: 'Fragment Mono', monospace;
          font-size: .7rem;
          text-transform: uppercase;
        }

        .legal-eyebrow::before {
          content: '';
          width: .45rem;
          height: .45rem;
          border-radius: 1px;
          background: var(--blue);
        }

        .legal-title {
          max-width: 11ch;
          font-size: clamp(4rem, 8vw, 8.5rem);
          font-weight: 500;
          line-height: .84;
          letter-spacing: 0;
        }

        .legal-hero__meta {
          align-self: end;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          max-width: 38rem;
        }

        .legal-hero__description {
          font-size: clamp(1.25rem, 2vw, 2rem);
          line-height: 1.08;
        }

        .legal-updated {
          font-family: 'Fragment Mono', monospace;
          font-size: .72rem;
          text-transform: uppercase;
        }

        .legal-layout {
          display: grid;
          grid-template-columns: minmax(12rem, 22%) minmax(0, 1fr);
          gap: 5rem;
          padding: 5rem 1.75rem 8rem;
        }

        .legal-aside {
          align-self: start;
          position: sticky;
          top: 6rem;
        }

        .legal-aside__label {
          margin-bottom: 1rem;
          font-family: 'Fragment Mono', monospace;
          font-size: .68rem;
          text-transform: uppercase;
        }

        .legal-aside__intro {
          max-width: 28ch;
          font-size: 1rem;
          line-height: 1.35;
        }

        .legal-content {
          max-width: 58rem;
        }

        .legal-section {
          padding: 0 0 3.5rem;
          margin-bottom: 3.5rem;
          border-bottom: 1px solid rgba(4, 74, 179, .18);
        }

        .legal-section:last-child {
          margin-bottom: 0;
          border-bottom: 0;
        }

        .legal-section h2 {
          margin-bottom: 1.4rem;
          font-size: clamp(2rem, 3.2vw, 3.6rem);
          font-weight: 500;
          line-height: .94;
        }

        .legal-section p,
        .legal-section li {
          max-width: 72ch;
          font-size: clamp(1rem, 1.2vw, 1.2rem);
          line-height: 1.5;
        }

        .legal-section p + p {
          margin-top: 1rem;
        }

        .legal-section ul {
          display: grid;
          gap: .85rem;
          margin-top: 1.2rem;
          padding-left: 1.2rem;
        }

        .legal-note {
          margin-top: 1.5rem;
          padding: 1.1rem 1.2rem;
          border-left: 3px solid var(--blue);
          background: rgba(4, 74, 179, .07);
        }

        .legal-footer {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 2rem;
          padding: 4rem 1.75rem 1.75rem;
          background: var(--black);
          color: var(--white);
        }

        .legal-footer__logo {
          width: min(22rem, 48vw);
        }

        .legal-footer__logo img {
          width: 100%;
        }

        .legal-footer__links {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-end;
          gap: 1rem 1.5rem;
          font-size: .88rem;
        }

        @media (max-width: 767px) {
          .legal-nav {
            align-items: flex-start;
            padding: .8rem 1rem;
          }

          .legal-nav__logo {
            width: 7.5rem;
          }

          .legal-nav__links {
            justify-content: flex-end;
            flex-wrap: wrap;
            gap: .25rem;
            font-size: .56rem;
          }

          .legal-hero {
            grid-template-columns: 1fr;
            gap: 3rem;
            min-height: auto;
            padding: 5rem 1rem 3rem;
          }

          .legal-title {
            font-size: clamp(3.5rem, 17vw, 5.5rem);
          }

          .legal-layout {
            grid-template-columns: 1fr;
            gap: 3rem;
            padding: 3rem 1rem 5rem;
          }

          .legal-aside {
            position: static;
          }

          .legal-aside__intro {
            max-width: 42ch;
          }

          .legal-section {
            padding-bottom: 2.5rem;
            margin-bottom: 2.5rem;
          }

          .legal-section h2 {
            font-size: 2.25rem;
          }

          .legal-footer {
            align-items: flex-start;
            flex-direction: column;
            padding: 3rem 1rem 1.25rem;
          }

          .legal-footer__logo {
            width: 100%;
          }

          .legal-footer__links {
            justify-content: flex-start;
          }
        }
      `}</style>

      <nav className="legal-nav" aria-label="Navegação jurídica">
        <a className="legal-nav__logo" href="/" aria-label="Voltar para a página inicial da Off-Data">
          <img src={whiteLogo} alt="Off-Data" />
        </a>
        <div className="legal-nav__links">
          <a href="/privacy-policy" aria-current={path === '/privacy-policy' ? 'page' : undefined}>Privacidade</a>
          <a href="/terms-and-conditions" aria-current={path === '/terms-and-conditions' ? 'page' : undefined}>Termos</a>
          <a href="/cookie-policy" aria-current={path === '/cookie-policy' ? 'page' : undefined}>Cookies</a>
        </div>
      </nav>

      <header className="legal-hero">
        <div>
          <div className="legal-eyebrow">{page.eyebrow}</div>
          <h1 className="legal-title">{page.title}</h1>
        </div>
        <div className="legal-hero__meta">
          <p className="legal-hero__description">{page.description}</p>
          <div className="legal-updated">Última atualização: {LAST_UPDATED}</div>
        </div>
      </header>

      <main className="legal-layout">
        <aside className="legal-aside">
          <div className="legal-aside__label">Sobre este documento</div>
          <p className="legal-aside__intro">{page.intro}</p>
        </aside>
        <article className="legal-content">
          {page.sections.map((section) => (
            <section className="legal-section" key={section.title}>
              <h2>{section.title}</h2>
              {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.bullets && (
                <ul>
                  {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                </ul>
              )}
              {section.note && <p className="legal-note">{section.note}</p>}
            </section>
          ))}
        </article>
      </main>

      <footer className="legal-footer">
        <a className="legal-footer__logo" href="/" aria-label="Voltar para a página inicial da Off-Data">
          <img src={whiteLogo} alt="Off-Data" />
        </a>
        <div className="legal-footer__links">
          <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a>
          <a href="/privacy-policy">Privacidade</a>
          <a href="/terms-and-conditions">Termos</a>
          <a href="/cookie-policy">Cookies</a>
        </div>
      </footer>
    </div>
  );
};

export default LegalPage;
