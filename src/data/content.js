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
    'Sou desenvolvedora focada na criação de interfaces modernas, experiências interativas e produtos digitais com forte atenção a usabilidade, performance e consistência visual.',
    'Desenvolvo aplicações web que unem interface, interação e engenharia de produto, participando tanto da construção frontend quanto da integração de APIs, arquitetura de dados e soluções backend.',
    'Tenho experiência trabalhando em diferentes contextos, desde plataformas internas e sistemas de gestão até experiências mais imersivas e orientadas à interação, sempre buscando transformar fluxos complexos em experiências intuitivas, funcionais e visualmente refinadas.',
    'Acredito que boas interfaces não servem apenas para funcionar — elas também comunicam, orientam e criam experiência.'
  ],
};

export const experience = [
  {
    company: 'SFE',
    role: 'Desenvolvedora Frontend',
    period: '2021 — 2023',
    description: 'O Sistema da Ferramentaria Elétrica é uma plataforma web desenvolvida para gerenciamento e controle operacional, centralizando processos internos relacionados a organização, acompanhamento do fluxo de obtenção de equipamentos de proteção individual',
    subDescription: [
      'A aplicação foi construída com foco em usabilidade, performance e padronização operacional, incluindo desenvolvimento de interfaces interativas, integração de APIs, manipulação de dados em tempo real e estruturação de fluxos voltados para experiência do usuário e eficiência do processo interno', 
      'O projeto envolveu atuação tanto no frontend quanto na integração de funcionalidades backend, trabalhando com arquitetura de componentes, gerenciamento de estado, autenticação, persistência de dados e evolução contínua da experiência do produto'
    ],
    videoUrl: '../../assets/videos/experience_videos/SFE_video.mp4',
  },
  {
    company: 'EscolaWeb',
    role: 'Desenvolvedora Web',
    period: '2025 — 2026',
    description: 'Participação no desenvolvimento frontend da plataforma de gestão escolar da Escolaweb, atuando na construção e evolução de módulos voltados para operação interna de instituições de ensino',
    subDescription: [
      'Atuação focada no desenvolvimento de interfaces para fluxos complexos de negócio, trabalhando na implementação de regras operacionais, organização de informações, integração com APIs e estruturação de experiências voltadas para eficiência e usabilidade em ambientes de gestão escolar',
      'O sistema requeriu desenvolvimento de funcionalidades relacionadas a processos financeiros, gerenciamento administrativo da plataforma, com forte atenção a clareza operacional, componentização e consistência da interface em diferentes contextos de uso'
    ],
    videoUrl: '../../assets/videos/experience_videos/Escolaweb_video.mp4',
  },
  {
    company: 'Ecommerce',
    role: 'Desenvolvedora Web',
    period: '2026 — 2027',
    description: 'Participação no desenvolvimento frontend de uma plataforma de e-commerce voltada para cantinas escolares, permitindo realização de pedidos, acompanhamento de compras, gerenciamento de fluxo de consumo e integração com pagamentos',
    subDescription: [
      'Atuação focada na construção da interface da aplicação, desenvolvimento de fluxos de compra, experiência do usuário e integração com APIs, trabalhando em funcionalidades relacionadas a catálogo de produtos, carrinho, acompanhamento de pedidos, autenticação e geração de pagamentos. O projeto também envolveu implementação de responsividade e adaptação da interface para diferentes dispositivos, garantindo uma experiência fluida e consistente em ambientes desktop e mobile',
      'A aplicação foi desenvolvida com foco em usabilidade, clareza operacional e fluidez da experiência de compra, buscando oferecer uma navegação intuitiva tanto para responsáveis quanto para operação administrativa da plataforma'
    ],
    videoUrl: '../../assets/videos/experience_videos/ecommerce-recording.mp4',
  },
];

export const projects = [
  {
    id: 1,
    title: 'Geeo',
    description:
      'Landing page institucional desenvolvida para a Geeo, projeto selecionado como um dos vencedores do Programa Centelha. O trabalho envolveu criação da interface, definição visual da marca, desenvolvimento da logo e estruturação da experiência da página, buscando transmitir uma identidade moderna, tecnológica e alinhada ao posicionamento do produto. A aplicação foi construída com foco em responsividade, refinamento visual e fluidez da navegação, trabalhando elementos de UI, hierarquia de informação, consistência visual e apresentação estratégica dos conteúdos da plataforma.',
    tags: ['React', 'TypeScript', 'SCSS', 'Branding'],
    liveUrl: null,
    githubUrl: 'https://github.com/KeziaOliveira',
  },
  {
    id: 2,
    title: 'GOLD',
    description:
      'Desenvolvimento de landing page institucional para o projeto GOLD — Grupo Orgulho, Liberdade e Dignidade, realizado no contexto de atividades voltadas ao SENAC. Atuação focada na construção frontend da interface, organização visual do conteúdo e desenvolvimento de uma experiência acessível, clara e acolhedora, alinhada à proposta institucional e social do projeto. A aplicação foi desenvolvida com foco em responsividade, hierarquia de informação e consistência visual, buscando facilitar a comunicação das iniciativas, conteúdos e objetivos do grupo em diferentes dispositivos.',
    tags: ['React', 'JavaScript', 'Tailwind CSS', 'Accessibility'],
    liveUrl: null,
    githubUrl: 'https://github.com/KeziaOliveira',
  },
  {
    id: 3,
    title: 'Glenso',
    description:
      'Assistente virtual interativo desenvolvido com foco em experiências imersivas e interfaces conversacionais, unindo frontend, interação em tempo real e elementos 3D para construção de uma experiência mais viva e memorável. O projeto envolveu desenvolvimento de interface interativa com utilização de Three.js para renderização e manipulação de elementos tridimensionais, criando uma identidade visual inspirada em um assistente alienígena integrado à navegação da aplicação. Atuei na construção da experiência frontend, integração de interações conversacionais, estruturação visual da interface e refinamento dos fluxos de interação entre usuário e assistente, buscando equilibrar identidade visual, performance e fluidez da experiência. A aplicação foi desenvolvida com foco em interatividade, motion design e integração entre interface e comportamento do assistente virtual, explorando uma abordagem mais imersiva para experiências baseadas em IA.',
    tags: ['React', 'Three.js', '3D Interface', 'IA integrations'],
    liveUrl: null,
    githubUrl: 'https://github.com/KeziaOliveira',
  },
  {
    id: 4,
    title: 'Scoreboard',
    description:
      'Aplicação desenvolvida para gerenciamento e transmissão em tempo real de placares de partidas de beach tennis, com foco em acompanhamento ao vivo, controle de partidas e experiência visual voltada para eventos esportivos. O projeto envolveu desenvolvimento frontend da interface do sistema, implementação de autenticação de usuários, integração com banco de dados e sincronização em tempo real das informações do placar, permitindo atualização instantânea entre diferentes telas e dispositivos. A aplicação também contou com estruturação de fluxos relacionados a gerenciamento de partidas, controle de pontuação e transmissão visual do scoreboard ao vivo, buscando garantir clareza das informações, responsividade e fluidez da experiência durante os jogos.Além da lógica operacional, o projeto explorou elementos de interatividade, feedback visual e experiência imersiva, combinando performance, usabilidade e atualização em tempo real para construção de uma experiência dinâmica de acompanhamento esportivo.',
    tags: ['React', 'Supabase', 'Live Sync', 'Authentication'],
    liveUrl: null,
    githubUrl: 'https://github.com/KeziaOliveira',
  },
];

export const social = {
  linkedin: 'https://linkedin.com/in/kezia',
  github: 'https://github.com/KeziaOliveira',
  email: 'kezia@email.com',
};
