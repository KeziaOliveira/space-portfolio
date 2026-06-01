export const personal = {
  name: 'Kezia',
  role: 'Desenvolvedora Frontend',
  headline: 'Desenvolvedora em construção de universos digitais',
  subheadline:
    'Transformando fluxos complexos em experiências intuitivas, funcionais e visualmente refinadas.',
  resumeUrl: '/curriculo.pdf',
};

export const about = {
  paragraphs: [
    /*
    'Sou desenvolvedora focada na criação de interfaces modernas, experiências interativas e produtos digitais com forte atenção a usabilidade, performance e consistência visual.',
    'Desenvolvo aplicações web que unem interface, interação e engenharia de produto, participando tanto da construção frontend quanto da integração de APIs, arquitetura de dados e soluções backend.',
    'Tenho experiência trabalhando em diferentes contextos, desde plataformas internas e sistemas de gestão até experiências mais imersivas e orientadas à interação, sempre buscando transformar fluxos complexos em experiências intuitivas, funcionais e visualmente refinadas.',
    'Acredito que boas interfaces não servem apenas para funcionar — elas também comunicam, orientam e criam experiência.'
    */
    'UX/UI Designer and Product Designer with experience designing enterprise platforms and transactional systems for operational, educational, and administrative environments.',
    'Skilled in user-centered design, user research, wireframing, prototyping, design systems, information architecture, and usability testing.',
    'Experienced in collaborating with stakeholders, gathering requirements, validating user needs, and transforming complex workflows into intuitive digital experiences.',
    'Strong background in Figma, Agile methodologies, design thinking, and iterative product improvement through user validation and feedback analysis.'
  ],
};

export const experience = [
  {
    company: 'Electrical Tooling System – Vale', // Antigo SFE
    role: 'Product Designer | UX/UI Designer', // Antigo: Desenvolvedora Frontend
    period: '2021 — 2023',
    description: 'Collaborated with stakeholders to identify user needs, define requirements, and improve operational workflows.', // Antigo: 'O Sistema da Ferramentaria Elétrica é uma plataforma web desenvolvida para gerenciamento e controle operacional, centralizando processos internos relacionados a organização, acompanhamento do fluxo de obtenção de equipamentos de proteção individual',
    subDescription: [
      /*
      'A aplicação foi construída com foco em usabilidade, performance e padronização operacional, incluindo desenvolvimento de interfaces interativas, integração de APIs, manipulação de dados em tempo real e estruturação de fluxos voltados para experiência do usuário e eficiência do processo interno', 
      'O projeto envolveu atuação tanto no frontend quanto na integração de funcionalidades backend, trabalhando com arquitetura de componentes, gerenciamento de estado, autenticação, persistência de dados e evolução contínua da experiência do produto'
      */
      'Designed user flows, wireframes, prototypes, and scalable interface components using user-centered design principles.',
      'Conducted usability testing, user validation, and iterative design improvements based on feedback analysis.',
      'Contributed to a transactional enterprise system that increased process transparency and generated approximately R$31,000 in annual savings.'
    ],
    videoUrl: '../../assets/videos/experience_videos/SFE_video.mp4',
  },
  {
    company: 'EscolaWeb',
    role: 'Product Designer & Frontend Developer', // Antigo: Desenvolvedora Web
    period: '2025 — 2026',
    description: 'Designed interfaces and interaction patterns for educational and administrative enterprise workflows.', // Antigo: 'Participação no desenvolvimento frontend da plataforma de gestão escolar da Escolaweb, atuando na construção e evolução de módulos voltados para operação interna de instituições de ensino',
    subDescription: [
      /*
      'Atuação focada no desenvolvimento de interfaces para fluxos complexos de negócio, trabalhando na implementação de regras operacionais, organização de informações, integração com APIs e estruturação de experiências voltadas para eficiência e usabilidade em ambientes de gestão escolar',
      'O sistema requeriu desenvolvimento de funcionalidades relacionadas a processos financeiros, gerenciamento administrativo da plataforma, com forte atenção a clareza operacional, componentização e consistência da interface em diferentes contextos de uso'
      */
      'Created wireframes, reusable UI components, and information architecture solutions to improve usability and consistency.',
      'Collaborated with business teams to translate complex requirements into intuitive digital experiences.',
      'Applied usability testing and feedback analysis to refine user journeys and optimize operational efficiency.'
    ],
    videoUrl: '../../assets/videos/experience_videos/Escolaweb_video.mp4',
  },
  {
    company: 'Ecommerce',
    role: 'Product Designer & Frontend Developer', // Antigo: Desenvolvedora Web
    period: '2026 — 2027',
    description: 'Designed end-to-end user experiences for purchasing, payment, and order management workflows.', // Antigo: 'Participação no desenvolvimento frontend de uma plataforma de e-commerce voltada para cantinas escolares, permitindo realização de pedidos, acompanhamento de compras, gerenciamento de fluxo de consumo e integração com pagamentos',
    subDescription: [
      /*
      'Atuação focada na construção da interface da aplicação, desenvolvimento de fluxos de compra, experiência do usuário e integração com APIs, trabalhando em funcionalidades relacionadas a catálogo de produtos, carrinho, acompanhamento de pedidos, autenticação e geração de pagamentos. O projeto também envolveu implementação de responsividade e adaptação da interface para diferentes dispositivos, garantindo uma experiência fluida e consistente em ambientes desktop e mobile',
      'A aplicação foi desenvolvida com foco em usabilidade, clareza operacional e fluidez da experiência de compra, buscando oferecer uma navegação intuitiva tanto para responsáveis quanto para operação administrativa da plataforma'
      */
      'Developed responsive interfaces focused on accessibility, usability, and customer-centric solutions.',
      'Conducted user validation and iterative design improvements to optimize navigation and conversion flows.',
      'Collaborated with stakeholders to align business objectives with user experience goals.'
    ],
    videoUrl: '../../assets/videos/experience_videos/ecommerce-recording.mp4',
  },
];

export const projects = [
  {
    title: 'Glenso',
    description:
      // 'Assistente virtual interativo desenvolvido com foco em experiências imersivas e interfaces conversacionais, unindo frontend, interação em tempo real e elementos 3D para construção de uma experiência mais viva e memorável. Atuei na construção da experiência frontend, integração de interações conversacionais, estruturação visual da interface e refinamento dos fluxos de interação entre usuário e assistente, buscando equilibrar identidade visual, performance e fluidez da experiência. A aplicação foi desenvolvida com foco em interatividade, motion design e integração entre interface e comportamento do assistente virtual.',
      'Interactive conversational platform designed to explore more natural and engaging interactions between users and AI assistants. The project focused on user experience, conversational flows, interface architecture, and visual interaction design, combining immersive elements with intuitive navigation patterns. Responsible for designing user journeys, interaction flows, and interface structures that balanced usability, engagement, and visual consistency. The experience was continuously refined through iterative design decisions focused on clarity, accessibility, and user engagement.',
    tags: ['React', 'Three.js', '3D Interface', 'IA integrations'],
  },
  {
    title: 'Scoreboard',
    description:
      // 'Aplicação desenvolvida para gerenciamento e transmissão em tempo real de placares de partidas de beach tennis, com foco em acompanhamento ao vivo, controle de partidas e experiência visual voltada para eventos esportivos. O projeto envolveu desenvolvimento frontend da interface do sistema, implementação de autenticação de usuários, integração com banco de dados e sincronização em tempo real das informações do placar, permitindo atualização instantânea entre diferentes telas e dispositivos.',
      'Real-time sports management platform designed to support match control, live score tracking, and event broadcasting workflows. The project focused on organizing critical information, reducing cognitive load, and enabling fast interactions in time-sensitive environments. Responsible for designing information architecture, interaction patterns, and responsive interfaces that allowed users to manage matches efficiently across multiple devices. The solution prioritized usability, visibility of system status, and real-time data synchronization to support operational accuracy.',
    tags: ['React', 'Supabase', 'Live Sync', 'Authentication'],
  },
  {
    title: 'GOLD',
    description:
      // 'Desenvolvimento de landing page institucional para o projeto GOLD — Grupo Orgulho, Liberdade e Dignidade, realizado no contexto de atividades voltadas ao SENAC. Atuação focada na construção frontend da interface, organização visual do conteúdo e desenvolvimento de uma experiência acessível, clara e acolhedora, alinhada à proposta institucional e social do projeto. A aplicação foi desenvolvida com foco em responsividade, hierarquia de informação e consistência visual, buscando facilitar a comunicação das iniciativas, conteúdos e objetivos do grupo em diferentes dispositivos.',
      'Institutional platform designed to communicate initiatives, resources, and community activities for the GOLD project. The experience was designed with a strong focus on accessibility, information hierarchy, and inclusive communication.Responsible for structuring content, defining navigation patterns, and creating a user-centered interface that improved content discoverability and facilitated access to information across different devices and user profiles.',
    tags: ['React', 'JavaScript', 'Tailwind CSS', 'Accessibility'],
  },
  {
    title: 'Geeo',
    description:
      // 'Landing page institucional desenvolvida para a Geeo, projeto selecionado como um dos vencedores do Programa Centelha. O trabalho envolveu criação da interface, definição visual da marca, desenvolvimento da logo e estruturação da experiência da página, buscando transmitir uma identidade moderna, tecnológica e alinhada ao posicionamento do produto. A aplicação foi construída com foco em responsividade, refinamento visual e fluidez da navegação, trabalhando elementos de UI, hierarquia de informação, consistência visual e apresentação estratégica dos conteúdos da plataforma.',
      'Healthcare startup platform selected through the Centelha innovation program. The project focused on translating complex business concepts into a clear and accessible digital experience, balancing brand identity, information architecture, and user needs. Responsible for designing the visual identity, user interface, navigation structure, and responsive experience. Created wireframes, high-fidelity layouts, and content organization strategies that improved clarity, usability, and communication',
    tags: ['React', 'TypeScript', 'SCSS', 'Branding'],
  },
];

export const social = {
  linkedin: 'https://linkedin.com/in/kezia',
  github: 'https://github.com/KeziaOliveira',
  email: 'kezia@email.com',
};
