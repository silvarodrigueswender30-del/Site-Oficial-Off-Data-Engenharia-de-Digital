const fs = require('fs');
const path = require('path');

const buildDir = path.resolve(__dirname, '..', 'build');
const sourcePath = path.join(buildDir, 'index.html');

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const setMeta = (html, attribute, key, content) => {
  const pattern = new RegExp(`<meta\\b[^>]*${attribute}="${escapeRegExp(key)}"[^>]*>`, 'i');
  return html.replace(pattern, (tag) => tag.replace(/content="[^"]*"/i, `content="${content}"`));
};

const generateRoute = (routePath, meta) => {
  const outDir = path.join(buildDir, routePath);
  const outPath = path.join(outDir, 'index.html');
  
  let html = fs.readFileSync(sourcePath, 'utf8');
  
  // Replace Title
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${meta.title}</title>`);
  
  // Replace Canonical
  html = html.replace(
    /<link\b[^>]*rel="canonical"[^>]*>/i,
    `<link rel="canonical" href="${meta.canonical}" />`
  );
  
  // Replace Standard Metas
  html = setMeta(html, 'name', 'description', meta.description);
  
  // Replace OG Metas
  html = setMeta(html, 'property', 'og:title', meta.title);
  html = setMeta(html, 'property', 'og:description', meta.description);
  html = setMeta(html, 'property', 'og:url', meta.canonical);
  if (meta.image) {
    html = setMeta(html, 'property', 'og:image', meta.image);
    html = setMeta(html, 'property', 'og:image:secure_url', meta.image);
    html = setMeta(html, 'property', 'og:image:alt', meta.imageAlt);
    html = setMeta(html, 'name', 'twitter:image', meta.image);
    html = setMeta(html, 'name', 'twitter:image:alt', meta.imageAlt);
  }
  
  html = setMeta(html, 'name', 'twitter:title', meta.title);
  html = setMeta(html, 'name', 'twitter:description', meta.description);

  // Remove existing JSON-LD
  html = html.replace(
    /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
    ''
  );

  // Inject new JSON-LD
  if (meta.schema) {
    html = html.replace(
      '</head>',
      `    <script type="application/ld+json">${JSON.stringify(meta.schema)}</script>\n  </head>`
    );
  }

  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outPath, html);
  console.log(`Generated static SEO route: build/${routePath}/index.html`);
};

// --- Agencia ---
generateRoute('agencia', {
  title: 'Agência Digital em Uberlândia | Off-Data Engenharia Digital',
  description: 'Conheça a Off-Data, agência de engenharia digital em Uberlândia especializada em sites de alta performance, SEO local e aquisição para empresas B2B e high-ticket.',
  canonical: 'https://www.offdata.digital/agencia',
  image: 'https://www.offdata.digital/imagens/offdata-digital-og.jpg',
  imageAlt: 'Off-Data: agência digital e engenharia web em Uberlândia',
  schema: {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': 'https://www.offdata.digital/agencia#page',
    url: 'https://www.offdata.digital/agencia',
    name: 'Agência Digital em Uberlândia | Off-Data Engenharia Digital',
    description: 'Conheça a Off-Data, agência de engenharia digital em Uberlândia especializada em sites de alta performance, SEO local e aquisição para empresas B2B e high-ticket.',
    inLanguage: 'pt-BR',
    isPartOf: { '@id': 'https://www.offdata.digital/#website' },
    about: { '@id': 'https://www.offdata.digital/#business' },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: 'https://www.offdata.digital/imagens/offdata-digital-og.jpg',
    },
  }
});

// --- Immersive Sites ---
generateRoute('criacao-de-sites-uberlandia', {
  title: 'Criação de Sites em Uberlândia | Off-Data Digital',
  description: 'Criação de sites profissionais em Uberlândia para empresas que precisam de presença digital premium, performance, SEO e conversão.',
  canonical: 'https://www.offdata.digital/criacao-de-sites-uberlandia',
  image: 'https://www.offdata.digital/imagens/offdata-digital-og.jpg',
  imageAlt: 'Criação de sites imersivos premium pela Off-Data Digital',
  schema: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Criação de Sites Imersivos Premium',
    description: 'Criação de sites profissionais em Uberlândia para empresas que precisam de presença digital premium, performance, SEO e conversão.',
    provider: {
      '@type': 'ProfessionalService',
      '@id': 'https://www.offdata.digital/#business',
      name: 'Off-Data Engenharia Digital',
      url: 'https://www.offdata.digital/'
    },
    areaServed: [
      { '@type': 'City', name: 'Uberlândia' },
      { '@type': 'AdministrativeArea', name: 'Triângulo Mineiro' }
    ],
    url: 'https://www.offdata.digital/criacao-de-sites-uberlandia'
  }
});

// --- Local SEO ---
generateRoute('seo-local-uberlandia', {
  title: 'SEO Local em Uberlândia | Off-Data Digital',
  description: 'Estratégias de SEO local em Uberlândia para empresas aparecerem no Google, fortalecerem autoridade regional e atraírem clientes qualificados.',
  canonical: 'https://www.offdata.digital/seo-local-uberlandia',
  image: 'https://www.offdata.digital/imagens/offdata-digital-og.jpg',
  imageAlt: 'SEO local em Uberlândia pela Off-Data Digital',
  schema: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'SEO Local em Uberlândia',
    description: 'Estratégias de SEO local em Uberlândia para empresas aparecerem no Google, fortalecerem autoridade regional e atraírem clientes qualificados.',
    provider: {
      '@type': 'ProfessionalService',
      '@id': 'https://www.offdata.digital/#business',
      name: 'Off-Data Engenharia Digital',
      url: 'https://www.offdata.digital/'
    },
    areaServed: [
      { '@type': 'City', name: 'Uberlândia' },
      { '@type': 'AdministrativeArea', name: 'Triângulo Mineiro' }
    ],
    url: 'https://www.offdata.digital/seo-local-uberlandia'
  }
});

// --- Paid Traffic ---
generateRoute('trafego-pago-uberlandia', {
  title: 'Gestão de Tráfego Pago em Uberlândia | Off-Data Digital',
  description: 'Gestão de tráfego pago em Uberlândia com campanhas no Google Ads e Meta Ads focadas em geração de leads, vendas e ROI.',
  canonical: 'https://www.offdata.digital/trafego-pago-uberlandia',
  image: 'https://www.offdata.digital/imagens/offdata-digital-og.jpg',
  imageAlt: 'Gestão de tráfego pago em Uberlândia pela Off-Data Digital',
  schema: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Tráfego Cirúrgico em Uberlândia',
    description: 'Gestão de tráfego pago em Uberlândia com campanhas no Google Ads e Meta Ads focadas em geração de leads, vendas e ROI.',
    provider: {
      '@type': 'ProfessionalService',
      '@id': 'https://www.offdata.digital/#business',
      name: 'Off-Data Engenharia Digital',
      url: 'https://www.offdata.digital/'
    },
    areaServed: [
      { '@type': 'City', name: 'Uberlândia' },
      { '@type': 'AdministrativeArea', name: 'Triângulo Mineiro' }
    ],
    url: 'https://www.offdata.digital/trafego-pago-uberlandia'
  }
});

// --- High Ticket Landing Pages ---
generateRoute('landing-pages-high-ticket', {
  title: 'Landing Pages High Ticket | Off-Data Digital',
  description: 'Landing pages premium para ofertas High Ticket, criadas com estratégia, design sofisticado, copy persuasiva e foco em conversão.',
  canonical: 'https://www.offdata.digital/landing-pages-high-ticket',
  image: 'https://www.offdata.digital/imagens/offdata-digital-og.jpg',
  imageAlt: 'Landing Pages High Ticket criadas pela Off-Data Digital',
  schema: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Landing Pages High Ticket',
    description: 'Landing pages premium para ofertas High Ticket, criadas com estratégia, design sofisticado, copy persuasiva e foco em conversão.',
    provider: {
      '@type': 'ProfessionalService',
      '@id': 'https://www.offdata.digital/#business',
      name: 'Off-Data Engenharia Digital',
      url: 'https://www.offdata.digital/'
    },
    areaServed: [
      { '@type': 'City', name: 'Uberlândia' },
      { '@type': 'AdministrativeArea', name: 'Triângulo Mineiro' }
    ],
    url: 'https://www.offdata.digital/landing-pages-high-ticket'
  }
});

// --- Web Performance ---
generateRoute('performance-web', {
  title: 'Performance Web de Precisão | Off-Data Digital',
  description: 'Otimização de performance web para sites mais rápidos, estáveis e preparados para SEO, conversão e melhor experiência do usuário.',
  canonical: 'https://www.offdata.digital/performance-web',
  image: 'https://www.offdata.digital/imagens/offdata-digital-og.jpg',
  imageAlt: 'Performance Web de Precisão pela Off-Data Digital',
  schema: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Performance Web de Precisão',
    description: 'Otimização de performance web para sites mais rápidos, estáveis e preparados para SEO, conversão e melhor experiência do usuário.',
    provider: {
      '@type': 'ProfessionalService',
      '@id': 'https://www.offdata.digital/#business',
      name: 'Off-Data Engenharia Digital',
      url: 'https://www.offdata.digital/'
    },
    areaServed: [
      { '@type': 'City', name: 'Uberlândia' },
      { '@type': 'AdministrativeArea', name: 'Triângulo Mineiro' }
    ],
    url: 'https://www.offdata.digital/performance-web'
  }
});

// --- B2B Commercial Automation ---
generateRoute('automacao-comercial-b2b', {
  title: 'Automação Comercial B2B Integrada | Off-Data Digital',
  description: 'Automação comercial B2B para empresas que precisam integrar atendimento, qualificar leads, organizar processos e vender com mais previsibilidade.',
  canonical: 'https://www.offdata.digital/automacao-comercial-b2b',
  image: 'https://www.offdata.digital/imagens/offdata-digital-og.jpg',
  imageAlt: 'Automação Comercial B2B Integrada pela Off-Data Digital',
  schema: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Automação Comercial B2B Integrada',
    description: 'Automação comercial B2B para empresas que precisam integrar atendimento, qualificar leads, organizar processos e vender com mais previsibilidade.',
    provider: {
      '@type': 'ProfessionalService',
      '@id': 'https://www.offdata.digital/#business',
      name: 'Off-Data Engenharia Digital',
      url: 'https://www.offdata.digital/'
    },
    areaServed: [
      { '@type': 'City', name: 'Uberlândia' },
      { '@type': 'AdministrativeArea', name: 'Triângulo Mineiro' }
    ],
    url: 'https://www.offdata.digital/automacao-comercial-b2b'
  }
});

// --- Technical Content ---
generateRoute('conteudo-tecnico', {
  title: 'Conteúdo Técnico para SEO | Off-Data Digital',
  description: 'Conteúdo técnico e estratégico para empresas que precisam fortalecer autoridade, melhorar SEO e explicar serviços complexos com clareza.',
  canonical: 'https://www.offdata.digital/conteudo-tecnico',
  image: 'https://www.offdata.digital/imagens/offdata-digital-og.jpg',
  imageAlt: 'Conteúdo Técnico para SEO pela Off-Data Digital',
  schema: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Conteúdo Técnico para SEO',
    description: 'Conteúdo técnico e estratégico para empresas que precisam fortalecer autoridade, melhorar SEO e explicar serviços complexos com clareza.',
    provider: {
      '@type': 'ProfessionalService',
      '@id': 'https://www.offdata.digital/#business',
      name: 'Off-Data Engenharia Digital',
      url: 'https://www.offdata.digital/'
    },
    areaServed: [
      { '@type': 'City', name: 'Uberlândia' },
      { '@type': 'AdministrativeArea', name: 'Triângulo Mineiro' }
    ],
    url: 'https://www.offdata.digital/conteudo-tecnico'
  }
});

// --- Strategy: Local SEO for Luxury Real Estate ---
generateRoute('estrategias/seo-local-imobiliarias-luxo', {
  title: 'SEO Local para Imobiliárias de Luxo em Uberlândia | Off-Data Digital',
  description: 'Estratégia de SEO local para imobiliárias premium em Uberlândia. Apareça no Google quando compradores de alto padrão buscarem imóveis na sua região.',
  canonical: 'https://www.offdata.digital/estrategias/seo-local-imobiliarias-luxo',
  image: 'https://www.offdata.digital/imagens/seo-arquitetura.avif',
  imageAlt: 'Arquitetura premium representando SEO local para imobiliárias de luxo',
  schema: {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'SEO Local para Imobiliárias de Luxo em Uberlândia e Triângulo Mineiro',
    description: 'Estratégia de SEO local para imobiliárias premium em Uberlândia. Apareça no Google quando compradores de alto padrão buscarem imóveis na sua região.',
    url: 'https://www.offdata.digital/estrategias/seo-local-imobiliarias-luxo',
    inLanguage: 'pt-BR',
    image: 'https://www.offdata.digital/imagens/seo-arquitetura.avif',
    author: {
      '@type': 'Organization',
      '@id': 'https://www.offdata.digital/#business',
      name: 'Off-Data Engenharia Digital',
      url: 'https://www.offdata.digital/'
    },
    publisher: {
      '@type': 'Organization',
      '@id': 'https://www.offdata.digital/#business',
      name: 'Off-Data Engenharia Digital',
      url: 'https://www.offdata.digital/'
    },
    mainEntity: {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Quanto tempo leva para uma imobiliária aparecer no Google em Uberlândia?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Não existe um prazo universal para ranqueamento. A evolução depende da concorrência, da autoridade do domínio, da condição técnica do site, da qualidade do conteúdo e da consistência da estratégia. Um diagnóstico inicial ajuda a identificar prioridades e a acompanhar sinais de avanço sem transformar estimativas em promessas.'
          }
        },
        {
          '@type': 'Question',
          name: 'Vale mais a pena investir em SEO ou em anúncios pagos para vender imóveis premium?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'As duas frentes podem trabalhar juntas. Anúncios oferecem alcance imediato para campanhas específicas, enquanto o SEO estrutura uma presença orgânica que tende a fortalecer autoridade e cobertura ao longo do tempo. A decisão deve considerar objetivos comerciais, portfólio, orçamento e maturidade digital.'
          }
        },
        {
          '@type': 'Question',
          name: 'O que é Google Meu Negócio e por que é essencial para imobiliárias?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Hoje chamado Perfil da Empresa no Google, ele reúne informações exibidas na Busca e no Maps. Para imobiliárias, manter endereço, horários, contatos, categorias, imagens e atualizações consistentes melhora a clareza da presença local e facilita o contato de pessoas que pesquisam na região.'
          }
        },
        {
          '@type': 'Question',
          name: 'SEO local funciona para imobiliárias que atendem cidades diferentes no Triângulo Mineiro?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sim, desde que cada cidade tenha relevância real para a operação. A cobertura pode ser ampliada com páginas específicas, informações próprias e conteúdo útil para cada mercado atendido. Evitar páginas duplicadas é essencial para preservar qualidade e demonstrar conhecimento regional verdadeiro.'
          }
        },
        {
          '@type': 'Question',
          name: 'Como as avaliações no Google afetam o ranqueamento de uma imobiliária?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Avaliações legítimas ajudam compradores a compreender a experiência oferecida e enviam sinais de confiança sobre a empresa. Frequência, qualidade das respostas e consistência do perfil podem contribuir para a presença local. O processo deve ser ético, contínuo e nunca baseado em avaliações artificiais.'
          }
        }
      ]
    }
  }
});

// --- Strategy: Website Creation for Real Estate ---
generateRoute('estrategias/criacao-de-site-para-imobiliaria', {
  title: 'Criação de Site para Imobiliária em Uberlândia | Off-Data',
  description: 'Sites para imobiliárias de alto padrão em Uberlândia. Design imersivo e SEO técnico que convertem o comprador antes da visita. Fale com a Off-Data.',
  canonical: 'https://www.offdata.digital/estrategias/criacao-de-site-para-imobiliaria',
  image: 'https://www.offdata.digital/imagens/imagem-estrategia/criacao-de-site-imobiliaria-hero.avif',
  imageAlt: 'Design imersivo e site de alto padrão para imobiliárias de luxo em Uberlândia',
  schema: {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: 'Site para Imobiliária de Luxo em Uberlândia',
        description: 'Sites para imobiliárias de alto padrão em Uberlândia. Design imersivo e SEO técnico que convertem o comprador antes da visita. Fale com a Off-Data.',
        url: 'https://www.offdata.digital/estrategias/criacao-de-site-para-imobiliaria',
        inLanguage: 'pt-BR',
        image: 'https://www.offdata.digital/imagens/imagem-estrategia/criacao-de-site-imobiliaria-hero.avif',
        author: {
          '@type': 'Organization',
          '@id': 'https://www.offdata.digital/#business',
          name: 'Off-Data Engenharia Digital',
          url: 'https://www.offdata.digital/'
        },
        publisher: {
          '@type': 'Organization',
          '@id': 'https://www.offdata.digital/#business',
          name: 'Off-Data Engenharia Digital',
          url: 'https://www.offdata.digital/'
        },
        mainEntity: {
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'Quanto custa um site para imobiliária de luxo?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'O investimento varia conforme o número de imóveis, integrações necessárias e nível de personalização visual. A Off-Data apresenta uma proposta específica após entender o portfólio e os objetivos da imobiliária em Uberlândia, evitando pacotes genéricos que não refletem o posicionamento da marca.'
              }
            },
            {
              '@type': 'Question',
              name: 'Quanto tempo leva para o site ficar pronto?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Projetos de site para imobiliária costumam levar entre 4 e 8 semanas, dependendo da complexidade do portfólio e da quantidade de conteúdo a ser estruturado. O prazo exato é definido logo após o diagnóstico inicial.'
              }
            },
            {
              '@type': 'Question',
              name: 'Como funciona a integração do site com o WhatsApp e o CRM da imobiliária?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'O site é construído com formulários e botões conectados diretamente ao WhatsApp da equipe comercial, e pode ser integrado a sistemas de CRM já utilizados pela imobiliária. Isso garante que nenhum contato gerado pelo site fique sem retorno.'
              }
            },
            {
              '@type': 'Question',
              name: 'O site realmente ajuda a vender mais imóveis de alto padrão?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Um site bem estruturado reduz o atrito entre o interesse do comprador e o agendamento da visita, apresentando o imóvel com a qualidade visual e a informação que esse público espera. Isso não substitui o trabalho do corretor, mas qualifica o lead antes do primeiro contato.'
              }
            },
            {
              '@type': 'Question',
              name: 'O site funciona também para imobiliárias que atuam fora de Uberlândia, em cidades como Uberaba ou Araguari?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Sim. A estrutura de SEO local é construída para abranger as cidades do Triângulo Mineiro em que a imobiliária atua, com páginas e dados estruturados que ajudam o site a aparecer nas buscas dessas regiões específicas.'
              }
            }
          ]
        }
      },
      {
        '@type': 'Service',
        name: 'Criação de Site para Imobiliária de Luxo',
        description: 'Desenvolvimento de sites de alto padrão para imobiliárias de luxo em Uberlândia, com SEO técnico, design imersivo e otimização para IAs.',
        areaServed: 'Uberlândia, MG',
        provider: {
          '@id': 'https://www.offdata.digital/#business'
        }
      }
    ]
  }
});

// --- Strategy: Immersive Sites for Medical Clinics ---
generateRoute('estrategias/sites-imersivos-clinicas-medicas', {
  title: 'Sites para Clínicas Médicas de Alto Padrão em Uberlândia | Off-Data Digital',
  description: 'Criação de sites imersivos para clínicas médicas premium em Uberlândia. Design de alto padrão que transmite confiança e converte pacientes de alto valor.',
  canonical: 'https://www.offdata.digital/estrategias/sites-imersivos-clinicas-medicas',
  image: 'https://www.offdata.digital/imagens/seo-clinica.avif',
  imageAlt: 'Clínica médica de alto padrão representando uma experiência digital imersiva',
  schema: {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Sites para Clínicas Médicas de Alto Padrão em Uberlândia',
    description: 'Criação de sites imersivos para clínicas médicas premium em Uberlândia. Design de alto padrão que transmite confiança e converte pacientes de alto valor.',
    url: 'https://www.offdata.digital/estrategias/sites-imersivos-clinicas-medicas',
    inLanguage: 'pt-BR',
    image: 'https://www.offdata.digital/imagens/seo-clinica.avif',
    author: {
      '@type': 'Organization',
      '@id': 'https://www.offdata.digital/#business',
      name: 'Off-Data Engenharia Digital',
      url: 'https://www.offdata.digital/'
    },
    publisher: {
      '@type': 'Organization',
      '@id': 'https://www.offdata.digital/#business',
      name: 'Off-Data Engenharia Digital',
      url: 'https://www.offdata.digital/'
    },
    mainEntity: {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Quanto custa criar um site profissional para clínica médica em Uberlândia?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'O investimento depende do escopo, da quantidade de páginas, do nível de personalização, das integrações e da condição técnica da presença digital existente. Um diagnóstico permite definir prioridades e estimar o projeto com transparência. O valor não deve ser associado a promessas de pacientes, agendamentos ou retorno garantido.'
          }
        },
        {
          '@type': 'Question',
          name: 'Um site bonito realmente influencia na escolha do paciente?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Uma apresentação visual coerente pode contribuir para a percepção de organização, cuidado e confiança, principalmente quando facilita a leitura e o acesso às informações. Ainda assim, a escolha depende de diversos fatores, como indicação, especialidade, localização, disponibilidade e relação com a equipe. O design apoia a decisão, mas não a determina.'
          }
        },
        {
          '@type': 'Question',
          name: 'É possível integrar agendamento online ao site da clínica?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sim. O site pode direcionar ou integrar plataformas de agendamento já utilizadas pela clínica, desde que o fluxo seja tecnicamente compatível e trate dados com o cuidado necessário. A integração tende a reduzir etapas de contato, mas sua configuração deve considerar processos internos, privacidade e a experiência real da equipe e dos pacientes.'
          }
        },
        {
          '@type': 'Question',
          name: 'Como o SEO local ajuda clínicas médicas a atrair mais pacientes em Uberlândia?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'SEO local organiza páginas, informações institucionais e sinais de localização para ajudar a clínica a ser compreendida em pesquisas relevantes da região. Uma presença consistente pode melhorar a descoberta e facilitar o contato, mas o desempenho depende da especialidade, da concorrência, da autoridade existente e da qualidade contínua do site e do perfil da empresa.'
          }
        },
        {
          '@type': 'Question',
          name: 'O site precisa seguir alguma norma do CFM (Conselho Federal de Medicina)?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A comunicação digital da área médica precisa respeitar as normas aplicáveis à publicidade médica, evitando promessas de resultado, sensacionalismo e afirmações inadequadas. Como as regras podem mudar e cada contexto possui particularidades, o conteúdo final deve ser validado pelo responsável técnico ou jurídico da clínica quando necessário.'
          }
        }
      ]
    }
  }
});

// --- Strategy: High-Intent B2B Traffic ---
generateRoute('estrategias/trafego-alta-intencao-b2b', {
  title: 'Tráfego Pago B2B de Alta Intenção no Triângulo Mineiro | Off-Data Digital',
  description: 'Gestão de tráfego pago para empresas B2B no Triângulo Mineiro. Campanhas no Google e Meta focadas em leads qualificados de alto valor para sua operação.',
  canonical: 'https://www.offdata.digital/estrategias/trafego-alta-intencao-b2b',
  image: 'https://www.offdata.digital/imagens/trafego-b2b-triangulo-mineiro.avif',
  imageAlt: 'Operação B2B regional conectada por dados e tráfego de alta intenção',
  schema: {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Tráfego Pago B2B de Alta Intenção no Triângulo Mineiro',
    description: 'Gestão de tráfego pago para empresas B2B no Triângulo Mineiro. Campanhas no Google e Meta focadas em leads qualificados de alto valor para sua operação.',
    url: 'https://www.offdata.digital/estrategias/trafego-alta-intencao-b2b',
    inLanguage: 'pt-BR',
    image: 'https://www.offdata.digital/imagens/trafego-b2b-triangulo-mineiro.avif',
    author: {
      '@type': 'Organization',
      '@id': 'https://www.offdata.digital/#business',
      name: 'Off-Data Engenharia Digital',
      url: 'https://www.offdata.digital/'
    },
    publisher: {
      '@type': 'Organization',
      '@id': 'https://www.offdata.digital/#business',
      name: 'Off-Data Engenharia Digital',
      url: 'https://www.offdata.digital/'
    },
    mainEntity: {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'O que é tráfego de alta intenção e por que é importante para B2B?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Tráfego de alta intenção reúne visitas originadas por sinais de necessidade mais claros, como pesquisas por soluções, fornecedores ou parceiros. Para B2B, essa leitura ajuda a priorizar mensagens e páginas alinhadas ao contexto de decisão. Ainda assim, intenção não garante oportunidade: oferta, aderência e processo comercial continuam determinantes.'
          }
        },
        {
          '@type': 'Question',
          name: 'Quanto tempo leva para ver resultados em campanhas B2B no Google Ads?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Os primeiros sinais podem surgir conforme a campanha começa a acumular dados, mas não existe prazo universal para avaliar resultado. A análise depende de verba, segmento, oferta, concorrência, página de destino, ciclo comercial e qualidade do acompanhamento. Decisões consistentes exigem observar conversões e evolução do funil ao longo do tempo.'
          }
        },
        {
          '@type': 'Question',
          name: 'Vale a pena anunciar no LinkedIn para empresas do Triângulo Mineiro?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Pode fazer sentido para ofertas de maior valor, públicos definidos por cargo ou empresa e ciclos consultivos. Google pode atender melhor demandas ativas, enquanto Meta pode apoiar distribuição e remarketing regional. A escolha depende do tamanho da audiência, objetivo, orçamento e capacidade de transformar atenção em conversas relevantes.'
          }
        },
        {
          '@type': 'Question',
          name: 'Como saber se meu investimento em tráfego pago está gerando retorno?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A avaliação começa com rastreamento de conversões, integração com CRM e registro da origem dos contatos. Além do custo por conversão, é importante observar qualidade, avanço entre etapas, oportunidades geradas e resultados comerciais confirmados. A mensuração correta permite avaliar eficiência, mas nenhum indicador isolado garante retorno futuro.'
          }
        },
        {
          '@type': 'Question',
          name: 'É possível segmentar campanhas por cidade dentro do Triângulo Mineiro?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sim. As plataformas permitem configurar segmentações geográficas por cidades e outras áreas disponíveis. Essa definição ajuda a reduzir desperdício e alinhar a mídia à região atendida, mas precisa ser validada com dados de entrega, demanda real e capacidade operacional para evitar públicos excessivamente restritos ou pouco relevantes.'
          }
        }
      ]
    }
  }
});

// --- Strategy: High-Ticket Web Performance ---
generateRoute('estrategias/performance-web-marcas-high-ticket', {
  title: 'Performance Web para Marcas Premium em Uberlândia | Off-Data Digital',
  description: 'Sites de alta performance para marcas premium em Uberlândia. Velocidade, Core Web Vitals e experiência que convertem visitantes em clientes de alto valor.',
  canonical: 'https://www.offdata.digital/estrategias/performance-web-marcas-high-ticket',
  image: 'https://www.offdata.digital/imagens/performance-web-marcas-regionais.avif',
  imageAlt: 'Marcas regionais conectadas por uma experiência digital de alta performance',
  schema: {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Performance Web para Marcas Premium e High-Ticket em Uberlândia',
    description: 'Sites de alta performance para marcas premium em Uberlândia. Velocidade, Core Web Vitals e experiência que convertem visitantes em clientes de alto valor.',
    url: 'https://www.offdata.digital/estrategias/performance-web-marcas-high-ticket',
    inLanguage: 'pt-BR',
    image: 'https://www.offdata.digital/imagens/performance-web-marcas-regionais.avif',
    author: {
      '@type': 'Organization',
      '@id': 'https://www.offdata.digital/#business',
      name: 'Off-Data Engenharia Digital',
      url: 'https://www.offdata.digital/'
    },
    publisher: {
      '@type': 'Organization',
      '@id': 'https://www.offdata.digital/#business',
      name: 'Off-Data Engenharia Digital',
      url: 'https://www.offdata.digital/'
    },
    mainEntity: {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'O que são Core Web Vitals e por que minha empresa precisa se preocupar com isso?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Core Web Vitals ajudam a avaliar carregamento, resposta às interações e estabilidade visual. LCP observa a exibição do conteúdo principal, INP acompanha a resposta do site e CLS identifica mudanças inesperadas de layout. Eles ajudam a localizar gargalos, mas precisam ser analisados junto com UX, conteúdo e contexto técnico.'
          }
        },
        {
          '@type': 'Question',
          name: 'Um site lento realmente afasta clientes de alto padrão?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A lentidão pode aumentar atrito, reduzir confiança e prejudicar a navegação, especialmente quando o visitante espera uma experiência cuidadosa. Ainda assim, a decisão depende de diversos fatores. Melhorar performance ajuda a remover obstáculos técnicos, mas não garante contato, conversão ou escolha da marca.'
          }
        },
        {
          '@type': 'Question',
          name: 'Qual é o tempo de carregamento ideal para um site de marca premium?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Existem boas práticas e indicadores de referência, mas a meta adequada depende do tipo de página, peso visual, recursos, servidor, framework, imagens, scripts e experiência desejada. Em geral, quanto menor o tempo de espera e menor o atrito, melhor tende a ser a navegação. O diagnóstico deve considerar dados reais e prioridades do projeto.'
          }
        },
        {
          '@type': 'Question',
          name: 'Performance web e design visual sofisticado são compatíveis?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sim. O equilíbrio exige planejamento de imagens, vídeos, animações, fontes, código e carregamento. Formatos modernos, priorização de recursos e implementação cuidadosa ajudam a preservar uma experiência visual sofisticada sem tratar velocidade e design como objetivos opostos.'
          }
        },
        {
          '@type': 'Question',
          name: 'Como saber se o site da minha empresa tem problema de performance?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ferramentas como PageSpeed Insights ajudam a identificar gargalos e indicadores técnicos. A leitura, porém, deve ser combinada com testes em dispositivos reais, experiência visual, comportamento dos usuários, arquitetura do site e objetivos comerciais. Uma nota isolada não descreve toda a qualidade da experiência.'
          }
        }
      ]
    }
  }
});

// --- Strategy: Technical SEO and Digital Authority ---
generateRoute('estrategias/seo-tecnico-autoridade-digital', {
  title: 'SEO Técnico e Autoridade Digital para Empresas Premium | Off-Data',
  description: 'Estratégia de SEO técnico, conteúdo e autoridade digital para empresas premium em Uberlândia e Triângulo Mineiro que precisam ser encontradas, compreendidas e escolhidas com mais confiança.',
  canonical: 'https://www.offdata.digital/estrategias/seo-tecnico-autoridade-digital',
  image: 'https://www.offdata.digital/imagens/imagem-estrategia/seo-tecnico-autoridade-digital-hero.avif',
  imageAlt: 'Estrutura corporativa conectada representando SEO técnico e autoridade digital',
  schema: {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'SEO Técnico e Autoridade Digital para Empresas Premium',
    description: 'Estratégia de SEO técnico, conteúdo e autoridade digital para empresas premium em Uberlândia e Triângulo Mineiro que precisam ser encontradas, compreendidas e escolhidas com mais confiança.',
    url: 'https://www.offdata.digital/estrategias/seo-tecnico-autoridade-digital',
    inLanguage: 'pt-BR',
    image: 'https://www.offdata.digital/imagens/imagem-estrategia/seo-tecnico-autoridade-digital-hero.avif',
    author: {
      '@type': 'Organization',
      '@id': 'https://www.offdata.digital/#business',
      name: 'Off-Data Engenharia Digital',
      url: 'https://www.offdata.digital/'
    },
    publisher: {
      '@type': 'Organization',
      '@id': 'https://www.offdata.digital/#business',
      name: 'Off-Data Engenharia Digital',
      url: 'https://www.offdata.digital/'
    },
    mainEntity: {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'O que é autoridade digital?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Autoridade digital é a percepção construída quando uma empresa apresenta informação útil, estrutura técnica consistente, presença regional clara e comunicação coerente com sua especialidade. Ela não depende de um único conteúdo ou métrica. É resultado de site, SEO, performance, linguagem, confiança e evolução contínua trabalhando juntos.'
          }
        },
        {
          '@type': 'Question',
          name: 'SEO técnico garante primeira posição no Google?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Não. SEO técnico melhora a base de leitura, indexação, velocidade e organização do site, mas não garante posição específica. O desempenho depende de concorrência, autoridade existente, qualidade do conteúdo, intenção de busca, histórico do domínio e mudanças dos algoritmos. A leitura correta é tratar técnica como fundamento, não promessa.'
          }
        },
        {
          '@type': 'Question',
          name: 'Essa estratégia serve para empresas locais?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sim, especialmente quando a empresa atende mercados regionais e precisa ser encontrada com confiança. Em Uberlândia e no Triângulo Mineiro, autoridade digital pode conectar serviços, localização, diferenciais e conteúdo técnico. A estratégia precisa refletir atuação real, evitando páginas genéricas para cidades ou segmentos sem aderência.'
          }
        },
        {
          '@type': 'Question',
          name: 'Qual a diferença entre conteúdo comum e conteúdo estratégico?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Conteúdo comum costuma falar de temas soltos, sem conexão clara com a jornada de decisão. Conteúdo estratégico responde dúvidas reais, organiza critérios de escolha, fortalece tópicos importantes e se encaixa em uma arquitetura de páginas. Ele informa, posiciona e ajuda o visitante a entender por que a empresa é relevante.'
          }
        },
        {
          '@type': 'Question',
          name: 'Quando faz sentido contratar um diagnóstico de autoridade?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Faz sentido quando o site não reflete mais o valor da empresa, quando conteúdos não geram clareza, quando páginas importantes não aparecem no Google ou quando a presença digital depende de ações isoladas. O diagnóstico identifica gargalos técnicos, editoriais e comerciais para priorizar uma evolução realista.'
          }
        }
      ]
    }
  }
});

// --- Strategy: Commercial Operations Automation ---
generateRoute('estrategias/automacao-operacoes-comerciais', {
  title: 'Automação e Operações Comerciais para Empresas B2B | Off-Data',
  description: 'Estratégia de automação, organização comercial e operações digitais para empresas B2B em Uberlândia e Triângulo Mineiro que precisam captar, qualificar e acompanhar oportunidades com mais previsibilidade.',
  canonical: 'https://www.offdata.digital/estrategias/automacao-operacoes-comerciais',
  image: 'https://www.offdata.digital/imagens/imagem-estrategia/automacao-operacoes-comerciais-hero.avif',
  imageAlt: 'Operações comerciais digitais conectadas por automação e processos B2B',
  schema: {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Automação e Operações Comerciais para Empresas B2B',
    description: 'Estratégia de automação, organização comercial e operações digitais para empresas B2B em Uberlândia e Triângulo Mineiro que precisam captar, qualificar e acompanhar oportunidades com mais previsibilidade.',
    url: 'https://www.offdata.digital/estrategias/automacao-operacoes-comerciais',
    inLanguage: 'pt-BR',
    image: 'https://www.offdata.digital/imagens/imagem-estrategia/automacao-operacoes-comerciais-hero.avif',
    author: {
      '@type': 'Organization',
      '@id': 'https://www.offdata.digital/#business',
      name: 'Off-Data Engenharia Digital',
      url: 'https://www.offdata.digital/'
    },
    publisher: {
      '@type': 'Organization',
      '@id': 'https://www.offdata.digital/#business',
      name: 'Off-Data Engenharia Digital',
      url: 'https://www.offdata.digital/'
    },
    mainEntity: {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'O que são operações comerciais digitais?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Operações comerciais digitais são processos, ferramentas e rotinas que organizam como oportunidades entram, são qualificadas, atendidas e acompanhadas. Elas conectam canais como site, WhatsApp, formulários, CRM e follow-up para dar mais clareza ao time comercial. A estrutura não garante vendas, mas melhora a leitura e a continuidade da jornada.'
          }
        },
        {
          '@type': 'Question',
          name: 'Automação substitui o atendimento humano?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Não. Automação deve apoiar o atendimento, não substituir conversas importantes. Ela pode ajudar com registros, alertas, triagens, respostas iniciais e organização de próximos passos. Diagnóstico, negociação, relacionamento e decisão continuam dependendo de escuta, contexto e julgamento humano.'
          }
        },
        {
          '@type': 'Question',
          name: 'Essa estratégia serve para empresas locais?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sim. Empresas locais e regionais também lidam com múltiplos canais, demandas diferentes e ciclos comerciais que precisam de acompanhamento. Em Uberlândia e no Triângulo Mineiro, organizar a operação ajuda negócios B2B a entender melhor origem, qualidade e evolução dos contatos recebidos.'
          }
        },
        {
          '@type': 'Question',
          name: 'Preciso ter CRM para começar?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Não necessariamente. Um CRM pode ajudar bastante, mas o diagnóstico pode começar avaliando canais, formulários, WhatsApp, planilhas, responsáveis e rotina de follow-up. Em alguns casos, a prioridade é ajustar o processo antes de escolher ou configurar uma ferramenta mais robusta.'
          }
        },
        {
          '@type': 'Question',
          name: 'Quando faz sentido contratar um diagnóstico de operações?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Faz sentido quando a empresa recebe contatos por vários canais, perde histórico de conversas, tem dificuldade para priorizar oportunidades ou não sabe quais ações geram conversas qualificadas. O diagnóstico identifica gargalos e propõe uma evolução realista para processos, integrações e acompanhamento comercial.'
          }
        }
      ]
    }
  }
});
