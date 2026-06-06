import React, { useEffect } from 'react';
import Header from '../Header';
import FooterSection from '../sections/FooterSection';
import arrowDiagonal from '../../assets/images/arrow-diagonal.svg';

const capabilities = [
  ['01', 'Posicionamento', 'Estratégia antes da interface', 'Traduzimos objetivos comerciais, diferenciais e contexto competitivo em uma arquitetura digital clara, preparada para atrair as pessoas certas.'],
  ['02', 'Experiência', 'Design que comunica valor', 'Criamos sites e landing pages com linguagem visual própria, navegação precisa e uma experiência compatível com empresas premium e mercados high-ticket.'],
  ['03', 'Aquisição', 'SEO local e mídia orientados por intenção', 'Conectamos conteúdo, busca orgânica e campanhas a jornadas reais de decisão para gerar oportunidades mais qualificadas em Uberlândia e região.'],
  ['04', 'Tecnologia', 'Performance para sustentar crescimento', 'Construímos uma base rápida, segura e mensurável, pronta para evoluir com integrações, automações e novas frentes comerciais.'],
];

const AgencyButton = ({ children }) => (
  <a className="agency-button" href="/#cta-section">
    <span>{children}</span>
    <span className="agency-button__icon"><img src={arrowDiagonal} alt="" aria-hidden="true" /></span>
  </a>
);

const AgencyPage = () => {
  useEffect(() => {
    const title = 'Agência Digital em Uberlândia | Off-Data Engenharia Digital';
    const descriptionText = 'Conheça a Off-Data, agência de engenharia digital em Uberlândia especializada em sites de alta performance, SEO local e aquisição para empresas B2B e high-ticket.';
    const canonicalUrl = 'https://www.offdata.digital/agencia';
    const targets = [
      [document.querySelector('meta[name="description"]'), 'content', descriptionText],
      [document.querySelector('link[rel="canonical"]'), 'href', canonicalUrl],
      [document.querySelector('meta[property="og:title"]'), 'content', title],
      [document.querySelector('meta[property="og:description"]'), 'content', descriptionText],
      [document.querySelector('meta[property="og:url"]'), 'content', canonicalUrl],
    ];
    const previousTitle = document.title;
    const previous = targets.map(([element, attribute]) => [element, attribute, element?.getAttribute(attribute)]);

    document.title = title;
    targets.forEach(([element, attribute, value]) => element?.setAttribute(attribute, value));
    window.scrollTo(0, 0);

    return () => {
      document.title = previousTitle;
      previous.forEach(([element, attribute, value]) => value && element?.setAttribute(attribute, value));
    };
  }, []);

  return (
    <div className="agency-page">
      <style>{`
        .agency-page{background:var(--blue);color:var(--white);overflow:hidden}
        .agency-page .agency-wrap{padding-inline:1.75rem}
        .agency-tag{display:flex;align-items:center;gap:.65rem;font-family:'Fragment Mono',monospace;font-size:.66rem;line-height:1;text-transform:uppercase}
        .agency-tag:before{content:'';width:.42rem;height:.42rem;background:currentColor;border-radius:1px}
        .agency-hero{position:relative;display:grid;grid-template-columns:minmax(0,1.1fr) minmax(19rem,.45fr);align-items:end;gap:4rem;min-height:100vh;padding:9rem 1.75rem 2.2rem}
        .agency-hero:after{content:'';position:absolute;inset:auto 0 0;height:1px;background:rgba(255,255,255,.34)}
        .agency-hero__title{max-width:10ch;font-size:clamp(5rem,10.4vw,11rem);font-weight:500;line-height:.82;letter-spacing:0}
        .agency-hero__aside{display:flex;flex-direction:column;align-items:flex-start;gap:2rem;padding-bottom:.4rem}
        .agency-hero__copy{max-width:33ch;font-size:clamp(1.15rem,1.55vw,1.65rem);font-weight:500;line-height:1.08}
        .agency-button{display:inline-flex;align-items:center;gap:3.5rem;padding:.28rem .28rem .28rem 1rem;border-radius:3px;background:var(--white);color:var(--blue);font-size:.86rem;font-weight:500}
        .agency-button__icon{display:grid;place-items:center;width:2.35rem;height:2.35rem;border-radius:2px;background:var(--blue)}
        .agency-button__icon img{width:.9rem;height:.9rem}
        .agency-foundation{display:grid;grid-template-columns:.55fr 1fr;gap:5rem;min-height:90vh;padding-block:7rem;background:var(--white);color:var(--blue)}
        .agency-foundation__content{max-width:68rem}
        .agency-foundation h2,.agency-region h2{max-width:12ch;font-size:clamp(3.8rem,7.1vw,8rem);font-weight:500;line-height:.86}
        .agency-foundation__lead{max-width:47ch;margin:5rem 0 0 auto;font-size:clamp(1.3rem,2vw,2.15rem);line-height:1.08}
        .agency-capabilities{padding-block:7rem 8rem;background:var(--black)}
        .agency-capabilities__heading{display:grid;grid-template-columns:.55fr 1fr;gap:5rem;margin-bottom:6rem}
        .agency-capabilities h2{max-width:10ch;font-size:clamp(4rem,7.2vw,8rem);font-weight:500;line-height:.86}
        .agency-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));border-top:1px solid rgba(255,255,255,.3);border-left:1px solid rgba(255,255,255,.3)}
        .agency-card{display:flex;flex-direction:column;min-height:27rem;padding:1.25rem;border-right:1px solid rgba(255,255,255,.3);border-bottom:1px solid rgba(255,255,255,.3)}
        .agency-card__top{display:flex;justify-content:space-between;gap:2rem;font-family:'Fragment Mono',monospace;font-size:.65rem;text-transform:uppercase}
        .agency-card h3{max-width:12ch;margin-top:auto;font-size:clamp(2.4rem,3.7vw,4.5rem);font-weight:500;line-height:.9}
        .agency-card p{max-width:48ch;margin-top:1.5rem;color:rgba(255,255,255,.72);font-size:.98rem;line-height:1.3}
        .agency-mission{display:grid;grid-template-columns:1.2fr .8fr;min-height:100vh;background:var(--black)}
        .agency-mission__image{min-height:100vh;background:url('/imagens/mercados-high-ticket-uberlandia.avif') center/cover no-repeat}
        .agency-mission__content{display:flex;flex-direction:column;justify-content:space-between;gap:5rem;padding:7rem 1.75rem 2.2rem 3rem}
        .agency-mission h2{max-width:9ch;font-size:clamp(4rem,6vw,7rem);font-weight:500;line-height:.86}
        .agency-mission__bottom{display:grid;grid-template-columns:.6fr 1fr;gap:2rem}
        .agency-mission__bottom p{max-width:39ch;font-size:1rem;font-weight:500;line-height:1.25}
        .agency-region{display:grid;grid-template-columns:.55fr 1fr;gap:5rem;padding-block:7rem 8rem;background:var(--white);color:var(--blue)}
        .agency-region__content{display:flex;flex-direction:column;align-items:flex-start;gap:3rem}
        .agency-region__content p{max-width:49ch;margin-left:auto;font-size:clamp(1.2rem,1.8vw,1.9rem);line-height:1.12}
        .agency-region .agency-button{margin-left:auto;background:var(--blue);color:var(--white)}
        .agency-region .agency-button__icon{background:var(--white)}
        .agency-region .agency-button__icon img{filter:invert(25%) sepia(95%) saturate(1730%) hue-rotate(201deg) brightness(75%)}
        @media(max-width:991px){
          .agency-hero{grid-template-columns:1fr;align-content:end;gap:4rem}
          .agency-foundation,.agency-capabilities__heading,.agency-region{grid-template-columns:1fr;gap:3rem}
          .agency-foundation__lead,.agency-region__content p,.agency-region .agency-button{margin-left:0}
          .agency-mission{grid-template-columns:1fr}.agency-mission__image{min-height:70vh}
        }
        @media(max-width:767px){
          .agency-page .agency-wrap{padding-inline:1rem}.agency-hero{min-height:92vh;padding:6.5rem 1rem 1.5rem}
          .agency-hero__title{font-size:clamp(4.4rem,21vw,7rem);line-height:.86}.agency-hero__copy{max-width:29ch}
          .agency-foundation,.agency-capabilities,.agency-region{padding-block:4.5rem 5rem}
          .agency-foundation h2,.agency-capabilities h2,.agency-region h2{font-size:clamp(3.5rem,16vw,5.5rem)}
          .agency-foundation__lead{margin-top:3rem}.agency-capabilities__heading{margin-bottom:3.5rem}.agency-grid{grid-template-columns:1fr}.agency-card{min-height:22rem}
          .agency-mission__image{min-height:63vh}.agency-mission__content{min-height:72vh;padding:4.5rem 1rem 1.5rem}
          .agency-mission h2{font-size:clamp(3.8rem,16vw,5.6rem)}.agency-mission__bottom{grid-template-columns:1fr}
        }
      `}</style>

      <Header />
      <main>
        <section className="agency-hero">
          <h1 className="agency-hero__title">Engenharia digital para negócios reais</h1>
          <div className="agency-hero__aside">
            <div className="agency-tag">Agência digital em Uberlândia</div>
            <p className="agency-hero__copy">A Off-Data une estratégia, design e tecnologia para transformar presença digital em autoridade, demanda e crescimento sustentável.</p>
            <AgencyButton>Fale com a Off-Data</AgencyButton>
          </div>
        </section>

        <section className="agency-foundation agency-wrap" data-section="light">
          <div className="agency-tag">O que sustenta nosso trabalho</div>
          <div className="agency-foundation__content">
            <h2>Digital com profundidade comercial</h2>
            <p className="agency-foundation__lead">Não criamos apenas páginas bonitas. Estruturamos experiências digitais capazes de comunicar valor, facilitar decisões e apoiar o processo comercial de empresas que vendem soluções complexas.</p>
          </div>
        </section>

        <section className="agency-capabilities agency-wrap">
          <div className="agency-capabilities__heading">
            <div className="agency-tag">Como construímos</div>
            <h2>Uma operação integrada</h2>
          </div>
          <div className="agency-grid">
            {capabilities.map(([index, label, title, text]) => (
              <article className="agency-card" key={index}>
                <div className="agency-card__top"><span>{index}</span><span>{label}</span></div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="agency-mission">
          <div className="agency-mission__image" role="img" aria-label="Centro empresarial representando empresas atendidas pela Off-Data em Uberlândia" />
          <div className="agency-mission__content">
            <h2>Feito para mercados de maior valor</h2>
            <div className="agency-mission__bottom">
              <div className="agency-tag">Nossa direção</div>
              <p>Trabalhamos próximos a cada operação para compreender o negócio antes de definir a solução. Assim, tecnologia e comunicação deixam de ser peças isoladas e passam a funcionar como infraestrutura comercial.</p>
            </div>
          </div>
        </section>

        <section className="agency-region agency-wrap" data-section="light">
          <div className="agency-tag">Uberlândia e Triângulo Mineiro</div>
          <div className="agency-region__content">
            <h2>Presença local. Padrão digital sem fronteiras.</h2>
            <p>Ajudamos empresas da região a competir pela atenção, pela confiança e pelas melhores oportunidades com sites de alta performance, SEO local e aquisição digital orientada por estratégia.</p>
            <AgencyButton>Inicie um projeto</AgencyButton>
          </div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
};

export default AgencyPage;
