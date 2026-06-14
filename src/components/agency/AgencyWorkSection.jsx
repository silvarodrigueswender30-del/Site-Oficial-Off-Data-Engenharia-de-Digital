import React from 'react';

const workAreas = [
  {
    tag: 'Posicionamento',
    title: 'Estratégia digital conectada ao negócio',
    text: 'Entramos no contexto da empresa para compreender mercado, oferta e ciclo comercial. A partir disso, estruturamos uma presença digital que organiza a mensagem, diferencia a marca e aproxima oportunidades qualificadas.',
  },
  {
    tag: 'Experiência',
    title: 'Sites que comunicam valor com precisão',
    text: 'Projetamos experiências digitais próprias para empresas que precisam transmitir confiança antes da primeira conversa. Design, conteúdo e navegação trabalham juntos para tornar decisões complexas mais claras.',
  },
  {
    tag: 'Aquisição',
    title: 'SEO local e mídia orientados por intenção',
    text: 'Construímos caminhos para que a empresa seja encontrada por quem já procura uma solução. Busca orgânica, conteúdo técnico e campanhas são conectados à jornada comercial, não tratados como ações isoladas.',
  },
  {
    tag: 'Infraestrutura',
    title: 'Engenharia preparada para evoluir',
    text: 'Cada implementação considera velocidade, segurança, mensuração e continuidade. Criamos uma base capaz de receber novas páginas, integrações, automações e estratégias sem comprometer a operação.',
  },
];

const AgencyWorkSection = () => {
  return (
    <section className="agency-work">
      <style>{`
        .agency-work {
          position: relative;
          background: var(--black);
          color: var(--white);
        }

        .agency-work__wrapper {
          padding: 4.5em 1.75rem 0;
        }

        .agency-work__layout {
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
        }

        .agency-work__heading {
          position: sticky;
          top: 6.5rem;
          width: 46%;
        }

        .agency-work__heading h2 {
          width: 100%;
          margin: 0;
          font-size: clamp(2rem, 2.35vw, 3.1em);
          font-weight: 500;
          line-height: 1;
          letter-spacing: 0;
        }

        .agency-work__heading-line {
          display: block;
          white-space: nowrap;
        }

        .agency-work__heading p {
          width: 30ch;
          margin: 16em 0 0;
          font-size: 1.4em;
          font-weight: 500;
          line-height: 1.1;
        }

        .agency-work__cards {
          width: 50%;
          margin-left: auto;
        }

        .agency-work__list {
          display: flex;
          flex-direction: column;
          gap: .5em;
        }

        .agency-work-card {
          padding: 1.25em;
          border-radius: .375em;
          background: var(--blue);
        }

        .agency-work-card__content {
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
        }

        .agency-work-card__tag {
          flex: none;
          padding: .6em .8em;
          border-radius: .25em;
          background: var(--white);
          color: var(--blue);
          font-size: .8em;
          font-weight: 500;
          line-height: 1;
        }

        .agency-work-card__main {
          display: flex;
          flex-direction: column;
          width: 62%;
          margin-left: auto;
        }

        .agency-work-card h3 {
          width: 19ch;
          margin: 0;
          font-size: 2em;
          font-weight: 400;
          line-height: 1;
          letter-spacing: 0;
        }

        .agency-work-card p {
          width: 43ch;
          margin: 6em 0 0;
          font-size: .9em;
          font-weight: 500;
          line-height: 1.3;
        }

        @media (max-width: 991px) {
          .agency-work__wrapper {
            padding-right: 1.25rem;
            padding-left: 1.25rem;
            padding-bottom: 0;
          }

          .agency-work-card {
            padding: 1rem;
            border-radius: 3px;
          }

          .agency-work-card__content {
            flex-direction: column;
          }

          .agency-work-card__tag {
            font-size: 1.2em;
          }

          .agency-work-card__main {
            width: 100%;
            margin-top: 4rem;
          }

          .agency-work-card h3 {
            width: 22ch;
            font-size: 2.5em;
          }

          .agency-work-card p {
            width: 100%;
            margin-top: .7rem;
            font-size: .9em;
          }

          .agency-work__list {
            gap: 1em;
          }

          .agency-work__heading p {
            font-size: 1.8em;
          }
        }

        @media (max-width: 767px) {
          .agency-work__wrapper {
            padding: 3rem 1rem 0;
          }

          .agency-work__layout {
            flex-direction: column;
          }

          .agency-work__heading {
            position: static;
            width: 100%;
          }

          .agency-work__heading h2 {
            width: 100%;
            font-size: 7.3em;
          }

          .agency-work__heading-line {
            white-space: normal;
          }

          .agency-work__heading p {
            width: 50%;
            margin-top: 5rem;
            font-size: 2.6em;
          }

          .agency-work__cards {
            width: 100%;
            margin-top: 32px;
            margin-left: 0;
          }

          .agency-work-card__content {
            flex-direction: row;
          }

          .agency-work-card__tag {
            border-radius: .2rem;
            font-size: 1.6em;
          }

          .agency-work-card__main {
            width: 65%;
            margin-top: 0;
            margin-left: auto;
          }

          .agency-work-card h3 {
            width: auto;
            font-size: 4em;
          }

          .agency-work-card p {
            width: 96%;
            margin-top: 5rem;
            font-size: 1.9em;
          }
        }

        @media (max-width: 479px) {
          .agency-work__heading h2 {
            width: 100%;
          }

          .agency-work__heading p {
            width: 80%;
            margin-top: 4rem;
            font-size: 4em;
            line-height: 1.2;
          }

          .agency-work-card {
            padding: .85rem;
          }

          .agency-work-card__content {
            flex-direction: column;
          }

          .agency-work-card__tag {
            font-size: 3.4em;
          }

          .agency-work__list {
            gap: 2em;
          }

          .agency-work-card__main {
            width: 100%;
            margin-top: 3rem;
          }

          .agency-work-card h3 {
            width: 100%;
            font-size: 5.4em;
          }

          .agency-work-card p {
            width: 100%;
            margin-top: 8px;
            font-size: 3.7em;
          }
        }
      `}</style>

      <div className="agency-work__wrapper">
        <div className="agency-work__layout">
          <div className="agency-work__heading">
            <h2>
              <span className="agency-work__heading-line">Trabalhamos diretamente com empresas</span>
              <span className="agency-work__heading-line">para construir operações digitais mais fortes</span>
            </h2>
            <p>Nosso trabalho nasce da colaboração próxima com cada negócio, criando soluções que se integram à operação comercial em vez de adicionar complexidade.</p>
          </div>

          <div className="agency-work__cards">
            <div className="agency-work__list">
              {workAreas.map((area) => (
                <article className="agency-work-card" key={area.tag}>
                  <div className="agency-work-card__content">
                    <div className="agency-work-card__tag">{area.tag}</div>
                    <div className="agency-work-card__main">
                      <h3>{area.title}</h3>
                      <p>{area.text}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgencyWorkSection;
