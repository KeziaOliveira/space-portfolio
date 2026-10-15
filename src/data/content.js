export const content = {
  en: {
    ui: {
      nav: {
        about: 'About',
        experience: 'Experience',
        projects: 'Projects',
        contact: 'Contact',
      },
      hero: {
        description: 'Developer building digital universes',
        subheadline:
          'Transforming complex workflows into intuitive, functional, and visually refined experiences',
        exploreButtonRing: 'NAVIGATE IN EXPLORATION MODE •',
      },
      about: {
        label: 'About',
        title: 'My Journey',
        role: 'Frontend & Fullstack Developer',
        stats: {
          projects: 'developed projects',
          years: 'years of experience',
          clients: 'clients served',
        },
      },
      experience: {
        title: 'Experience',
        subtitle:
          'A journey focused on creating memorable digital experiences and robust technical solutions.',
      },
      projects: {
        label: 'Showcase',
        title: 'Some recent projects',
      },
      contact: {
        title: 'Contact',
        subtitle:
          "Let's build something great together. I'm open to opportunities, freelance work, and good conversations.",
      },
      exploreMode: {
        backToPortfolio: 'Back to Portfolio',
        modeTag: 'EXPLORATION MODE',
        orbiting: 'ORBITING',
        hintKeyboard: 'Use the keyboard arrows',
        hintNavigate: 'to navigate between planets',
        hintClickTopics: 'Click the topics in the bar to fly to them',
        hintEscBack: 'Back to portfolio',
        gameCtaBadge: '⚠ THREAT DETECTED',
        gameCtaDesc: 'A swarm of bugs has been detected in the perimeter. Automatic containment systems have failed. We need an operator to take control',
        gameCtaButton: 'ACCEPT MISSION',
      },
      footer: {
        madeWithPrefix: 'Made with',
        madeWithSuffix: 'by Kezia',
      },
    },

    about: {
      paragraphs: [
        'I\'m Kezia, a frontend developer. I started in graphic design as a teenager and picked up code soon after, and the two grew together ever since. That\'s why I don\'t just implement screens: I design the interface, build it, and think through how it will actually be used.',
        'Along the way, I\'ve delivered everything from internal systems and SaaS platforms to e-commerces, landing pages, and interactive 3D and AI experiences. Among the projects I\'m proudest of are a platform for Vale that digitized PPE control and generated around R$31k in annual savings, and modules for a school management SaaS used by educational institutions.',
        'I hold a degree in Systems Analysis and Development, with a frontend specialization from Oracle and UX Design training from Google. I work mainly with React, Next.js, Angular, and TypeScript, and move into the backend with Node.js when a project calls for it. Outside of code, I also do branding, social media, and video editing, which helps me see the whole product, from the brand to the last click.',
      ],
    },

    experience: [
      {
        company: 'ETS – Vale',
        role: 'Fullstack Developer',
        period: '2021 — 2025',
        summary:
          'Fullstack platform for electrical equipment and PPE management at Vale\'s industrial operations — interactive interfaces, REST API integrations, real-time data flows, and full-stack implementation from authentication to data persistence. The system generated ~R$31,000 in annual savings and significantly reduced PPE wait times for field teams.',
        description:
          'Built a fullstack internal platform for electrical equipment management and PPE tracking, developed for Vale\'s industrial operations.',
        subDescription: [
          'Developed interactive interfaces, integrated REST APIs, and implemented real-time data flows with component-driven architecture focused on operational usability.',
          'Participated in backend implementation alongside the full frontend stack: state management, authentication flows, data persistence, and continuous product iteration.',
          'The system generated approximately R$31,000 in annual savings through workflow digitization and significantly reduced the time workers waited for PPE replenishment — improving both operational efficiency and day-to-day conditions for field teams.',
        ],
        videoUrl: '../../assets/videos/experience_videos/SFE_video.mp4',
      },
      {
        company: 'EscolaWeb',
        role: 'Frontend Developer',
        period: '2025 — 2026',
        summary:
          'Frontend modules for a school management SaaS — reusable components across financial, administrative, and operational workflows, with API integration and state management. Maintained interface consistency across complex business flows through continuous improvements based on user feedback.',
        description:
          'Developed frontend modules for a school management SaaS platform, working on complex operational workflows for educational institutions.',
        subDescription: [
          'Built reusable UI components and interfaces for financial, administrative, and operational modules with API integration and state management.',
          'Maintained interface consistency across multiple complex business flows, applying iterative improvements based on user feedback.',
        ],
        videoUrl: '../../assets/videos/experience_videos/Escolaweb_video.mp4',
      },
      {
        company: 'Ecommerce',
        role: 'Frontend Developer',
        period: '2025 — 2026',
        summary:
          'E-commerce platform for school canteens with QR code access, full purchasing flow, and integrated company payment voucher. Covered catalog, cart, checkout, and dual-view order tracking for customers and store operators — fully responsive with a focus on operational clarity.',
        description:
          'Built the frontend of an e-commerce platform for school canteens, covering QR code access, purchasing flows, order tracking, and an integrated company payment voucher system.',
        subDescription: [
          'Developed product catalog, cart, checkout with integrated company payment voucher, and QR code-based store access.',
          'Implemented order status tracking for both the customer (purchase history and real-time updates) and the store (order management and fulfillment).',
          'Built full responsiveness across devices, focused on operational clarity and a smooth experience for both buyers and administrative staff.',
        ],
        videoUrl: '../../assets/videos/experience_videos/ecommerce-recording.mp4',
      },
    ],

    projects: [
      {
        id: 1,
        title: 'Glenso',
        description:
          'Interactive AI assistant platform built with React and Three.js, exploring real-time conversational interfaces and immersive 3D elements. Responsible for frontend architecture, 3D integration, conversational interaction flows, and UI systems. Focused on balancing performance, visual engagement, and usability in a dynamic, interaction-heavy environment.',
        tags: ['React', 'Three.js', 'AI integrations'],
      },
      {
        id: 2,
        title: 'Petrocapixaba',
        description:
          'Institutional landing page and management system built for Petrocapixaba. Developed the full frontend, bringing together the public brand presentation and the company\'s internal operational management workflows, with a focus on performance and clear interface design.',
        tags: ['React', 'TypeScript', 'Management System'],
        link: 'https://petrocapixaba.com.br/',
      },
      {
        id: 3,
        title: 'Scoreboard',
        description:
          'Real-time beach tennis scoreboard built with React and Supabase, supporting live match control and multi-screen score synchronization. Implemented authentication, real-time database sync, and responsive interfaces designed for fast interaction in time-sensitive environments.',
        tags: ['React', 'Supabase', 'Live Sync'],
      },
      {
        id: 4,
        title: 'GOLD',
        description:
          'Institutional web platform for GOLD — a diversity and inclusion project linked to SENAC. Built with React and Tailwind CSS, focused on accessibility, clear information hierarchy, and responsive design across different devices and user profiles.',
        tags: ['React', 'Tailwind CSS', 'Accessibility'],
        link: 'https://keziaoliveira.github.io/gold-landing/',
      },
    ],
  },

  pt: {
    ui: {
      nav: {
        about: 'Sobre',
        experience: 'Experiência',
        projects: 'Projetos',
        contact: 'Contato',
      },
      hero: {
        description: 'Desenvolvedora construindo universos digitais',
        subheadline:
          'Transformando fluxos complexos em experiências intuitivas, funcionais e visualmente refinadas',
        exploreButtonRing: 'NAVEGAR EM MODO EXPLORAÇÃO •',
      },
      about: {
        label: 'Sobre',
        title: 'Minha trajetória',
        role: 'Desenvolvedora Frontend & Fullstack',
        stats: {
          projects: 'projetos desenvolvidos',
          years: 'anos de experiência',
          clients: 'clientes atendidos',
        },
      },
      experience: {
        title: 'Experiência',
        subtitle:
          'Uma trajetória focada em criar experiências digitais memoráveis e soluções técnicas robustas.',
      },
      projects: {
        label: 'Showcase',
        title: 'Alguns projetos recentes',
      },
      contact: {
        title: 'Contato',
        subtitle:
          'Vamos construir algo incrível juntos. Estou aberta a oportunidades, freelas e boas conversas.',
      },
      exploreMode: {
        backToPortfolio: 'Voltar ao Portfólio',
        modeTag: 'MODO EXPLORAÇÃO',
        orbiting: 'ORBITANDO',
        hintKeyboard: 'Use as setinhas do teclado',
        hintNavigate: 'para navegar entre os planetas',
        hintClickTopics: 'Clique nos tópicos da barra para voar até eles',
        hintEscBack: 'Voltar ao portfólio',
        gameCtaBadge: '⚠ AMEAÇA DETECTADA',
        gameCtaDesc: 'Uma frota de bugs foi detectada no perímetro. Os sistemas de contenção automática falharam. Precisamos de um operador para assumir o controle',
        gameCtaButton: 'ACEITAR MISSÃO',
      },
      footer: {
        madeWithPrefix: 'Feito com',
        madeWithSuffix: 'por Kezia',
      },
    },

    about: {
      paragraphs: [
        'Sou a Kezia, desenvolvedora frontend. Comecei no design gráfico ainda adolescente e pouco depois no código, e as duas coisas cresceram juntas. Por isso eu não só implemento telas: eu desenho a interface, construo e penso em como ela vai ser usada de verdade.',
        'Ao longo desse caminho, entreguei desde sistemas internos e plataformas SaaS até e-commerces, landing pages e experiências interativas com 3D e IA. Entre os projetos que mais me orgulham estão uma plataforma para a Vale que digitalizou o controle de EPIs e gerou cerca de R$31 mil de economia por ano, e módulos de um SaaS de gestão escolar usado por instituições de ensino.',
        'Sou formada em Análise e Desenvolvimento de Sistemas, com especialização em frontend pela Oracle e formação em UX Design pelo Google. Trabalho principalmente com React, Next.js, Angular e TypeScript, e vou pro backend com Node.js quando o projeto pede. Fora do código, também faço branding, social media e edição de vídeo, o que me ajuda a enxergar o produto inteiro, da marca ao último clique.',
      ],
    },

    experience: [
      {
        company: 'SFE – Vale',
        role: 'Desenvolvedora Fullstack',
        period: '2021 — 2025',
        summary:
          'Plataforma fullstack para gerenciamento de ferramentaria elétrica e EPIs nas operações da Vale — interfaces interativas, integrações REST, fluxos em tempo real e stack completo do frontend ao backend. O sistema gerou ~R$31 mil em economia anual e reduziu o tempo de espera dos trabalhadores por EPIs.',
        description:
          'Desenvolvi uma plataforma interna fullstack para gerenciamento de ferramentaria elétrica e controle de EPIs, para as operações industriais da Vale.',
        subDescription: [
          'Desenvolvi interfaces interativas, integrei APIs REST e implementei fluxos de dados em tempo real com arquitetura de componentes focada em usabilidade operacional.',
          'Participei da implementação do backend junto ao stack frontend completo: gerenciamento de estado, fluxos de autenticação, persistência de dados e evolução contínua do produto.',
          'O sistema gerou aproximadamente R$31 mil em economia anual através da digitalização de fluxos e reduziu significativamente o tempo de espera dos trabalhadores pela reposição de EPIs — melhorando a eficiência operacional e as condições do dia a dia das equipes de campo.',
        ],
        videoUrl: '../../assets/videos/experience_videos/SFE_video.mp4',
      },
      {
        company: 'EscolaWeb',
        role: 'Desenvolvedora Frontend',
        period: '2025 — 2026',
        summary:
          'Módulos frontend para um SaaS de gestão escolar — componentes reutilizáveis em fluxos financeiros, administrativos e operacionais, com integração de APIs e gerenciamento de estado. Consistência de interface mantida em fluxos complexos com melhorias contínuas baseadas em feedback.',
        description:
          'Desenvolvi módulos frontend para uma plataforma SaaS de gestão escolar, trabalhando em fluxos operacionais complexos para instituições de ensino.',
        subDescription: [
          'Construí componentes de UI reutilizáveis e interfaces para módulos financeiros, administrativos e operacionais, com integração de APIs e gerenciamento de estado.',
          'Mantive consistência de interface em múltiplos fluxos de negócio complexos, aplicando melhorias iterativas com base em feedback de usuários.',
        ],
        videoUrl: '../../assets/videos/experience_videos/Escolaweb_video.mp4',
      },
      {
        company: 'E-commerce',
        role: 'Desenvolvedora Frontend',
        period: '2025 — 2026',
        summary:
          'Plataforma de e-commerce para cantinas escolares com acesso por QR Code, fluxo completo de compras e ticket de pagamento integrado. Catálogo, carrinho, checkout e rastreamento de pedidos em duas visões — comprador e loja — com responsividade total e foco em clareza operacional.',
        description:
          'Desenvolvi o frontend de uma plataforma de e-commerce para cantinas escolares, com acesso por QR Code, fluxos de compra, rastreamento de pedidos e sistema de pagamento por ticket próprio da empresa.',
        subDescription: [
          'Implementei catálogo de produtos, carrinho, checkout com ticket de pagamento próprio da empresa e acesso à loja por QR Code.',
          'Desenvolvi acompanhamento de status de pedido para o comprador (histórico e atualizações em tempo real) e para a loja (gestão e fulfillment de pedidos).',
          'Responsividade completa para múltiplos dispositivos, com foco em clareza operacional e experiência fluida para compradores e equipe administrativa.',
        ],
        videoUrl: '../../assets/videos/experience_videos/ecommerce-recording.mp4',
      },
    ],

    projects: [
      {
        id: 1,
        title: 'Glenso',
        description:
          'Plataforma de assistente virtual interativo desenvolvida com React e Three.js, explorando interfaces conversacionais em tempo real e elementos 3D imersivos. Responsável pela arquitetura frontend, integração 3D, fluxos de interação e sistema de UI. Foco em equilibrar performance, engajamento visual e usabilidade em um ambiente dinâmico orientado à interação.',
        tags: ['React', 'Three.js', 'Integrações de IA'],
      },
      {
        id: 2,
        title: 'Petrocapixaba',
        description:
          'Landing page institucional e sistema de gestão desenvolvidos para a Petrocapixaba. Construí o frontend completo, unindo a apresentação da marca ao público com os fluxos internos de gestão operacional da empresa, com foco em performance e clareza de interface.',
        tags: ['React', 'TypeScript', 'Sistema de Gestão'],
        link: 'https://petrocapixaba.com.br/',
      },
      {
        id: 3,
        title: 'Scoreboard',
        description:
          'Placar de beach tennis em tempo real desenvolvido com React e Supabase, com controle de partidas ao vivo e sincronização entre múltiplas telas. Implementei autenticação, sincronização em tempo real com banco de dados e interfaces responsivas para interação rápida em ambientes esportivos.',
        tags: ['React', 'Supabase', 'Sincronização ao vivo'],
      },
      {
        id: 4,
        title: 'GOLD',
        description:
          'Plataforma web institucional para o GOLD — projeto de diversidade e inclusão vinculado ao SENAC. Desenvolvida com React e Tailwind CSS, com foco em acessibilidade, hierarquia de informação clara e design responsivo para diferentes dispositivos e perfis de usuário.',
        tags: ['React', 'Tailwind CSS', 'Acessibilidade'],
        link: 'https://keziaoliveira.github.io/gold-landing/',
      },
    ],
  },
};

export const social = {
  linkedin: 'https://www.linkedin.com/in/kezia-oliveira-dev',
  github: 'https://github.com/keziaoliveira',
  email: 'kezia2709@gmail.com',
};

export const skills = {
  frontend: {
    label: 'Frontend',
    items: [
      { name: 'React',       icon: '⚛️' },
      { name: 'Angular',     icon: '🅰️' },
      { name: 'TypeScript',  icon: '📘' },
      { name: 'JavaScript',  icon: '🟨' },
      { name: 'CSS / SCSS',  icon: '🎨' },
      { name: 'Three.js',    icon: '🔷' },
    ],
  },
  backend: {
    label: 'Backend',
    items: [
      { name: 'Node.js',  icon: '🟢' },
      { name: 'Python',   icon: '🐍' },
      { name: 'Java',     icon: '☕' },
      { name: 'SQL',      icon: '🗃️' },
    ],
  },
  tools: {
    label: 'Ferramentas',
    items: [
      { name: 'Git',    icon: '🔀' },
      { name: 'Figma',  icon: '🎭' },
      { name: 'Docker', icon: '🐳' },
    ],
  },
};
