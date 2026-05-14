/**
 * Dados centralizados do portfólio.
 * Edite este arquivo para atualizar todo o conteúdo do site.
 */

export const personal = {
  name: 'Kezia',
  role: 'Desenvolvedora Frontend',
  headline: 'Desenvolvedora em construção de universos digitais',
  subheadline:
    'Focada em interfaces que resolvem problemas reais — com código limpo, atenção ao detalhe e vontade de evoluir a cada projeto.',
  resumeUrl: '/curriculo.pdf',
};

export const about = {
  paragraphs: [
    'Sou desenvolvedora frontend com experiência prática em projetos que vão de plataformas educacionais a sistemas de gestão. Meu foco é criar interfaces que funcionem bem para quem usa — claras, responsivas e construídas com propósito.',
    'Trabalho com React, Angular e TypeScript no dia a dia, e tenho contato com backend em Node.js e .NET. Gosto de entender o contexto completo de um produto, não só a tela.',
    'Estou em busca de oportunidades onde eu possa contribuir com entregas consistentes, aprender com times experientes e crescer como profissional. Se faz sentido, vamos conversar.',
  ],
};

export const experience = [
  {
    company: 'SFE',
    role: 'Desenvolvedora Web',
    period: '2021 — 2023',
    description: 'Desenvolvimento de sistema de força de vendas com foco em performance e agilidade na gestão de pedidos em campo.',
    videoUrl: '../../assets/videos/experience_videos/SFE_video.mp4',
  },
  {
    company: 'Ecommerce',
    role: 'Desenvolvedora Web',
    period: '2021 — 2023',
    description: 'Implementação de vitrine de produtos, fluxos de checkout e gestão de pedidos para plataforma de e-commerce escolar.',
    videoUrl: '../../assets/videos/experience_videos/ecommerce-recording.mp4',
  },
  {
    company: 'EscolaWeb',
    role: 'Desenvolvedora Web',
    period: '2021 — 2023',
    description: 'Contribuição no desenvolvimento de módulos de gestão escolar, incluindo sistemas de e-ticket e fluxos de autenticação escaláveis.',
    videoUrl: '../../assets/videos/experience_videos/Escolaweb_video.mp4',
  },
];

export const projects = [
  {
    id: 1,
    title: 'EscolaWeb',
    description:
      'Plataforma educacional completa que centraliza gestão escolar, e-commerce e sistema de e-ticket em um único produto. Desenvolvi módulos de autenticação independente, vitrine de produtos e fluxo de recarga — reduzindo a necessidade de múltiplas ferramentas para a administração escolar.',
    tags: ['Angular', 'TypeScript', 'SCSS', 'REST API'],
    liveUrl: null,
    githubUrl: 'https://github.com/KeziaOliveira',
  },
  {
    id: 2,
    title: 'ScoreBoard BT',
    description:
      'Sistema de gerenciamento de torneios de tênis com placar atualizado em tempo real via WebSocket. Inclui overlays customizáveis com chroma key para transmissões ao vivo e controle completo de partidas — eliminando a necessidade de anotações manuais durante os jogos.',
    tags: ['React', 'JavaScript', 'WebSocket', 'CSS'],
    liveUrl: null,
    githubUrl: 'https://github.com/KeziaOliveira',
  },
  {
    id: 3,
    title: 'Gear Workshop',
    description:
      'Plataforma de ordens de serviço criada para oficinas organizarem seu fluxo de trabalho. Conta com dashboard Kanban para visualização de status, rastreamento público por token de acesso e timeline unificada — substituindo controles em planilha por um processo digital integrado.',
    tags: ['React', 'Node.js', 'REST API', 'CSS'],
    liveUrl: null,
    githubUrl: 'https://github.com/KeziaOliveira',
  },
  {
    id: 4,
    title: 'Portfólio Espacial',
    description:
      'Este portfólio que você está navegando. Construído do zero com React e CSS puro, sem frameworks de UI. Arquitetura componentizada e dados centralizados, pensado para escalar futuramente com uma camada 3D interativa.',
    tags: ['React', 'CSS', 'Vite', 'Responsive'],
    liveUrl: null,
    githubUrl: 'https://github.com/KeziaOliveira',
  },
];

export const skills = {
  frontend: {
    label: 'Frontend',
    items: [
      { name: 'React', icon: '⚛️' },
      { name: 'Angular', icon: '🅰️' },
      { name: 'TypeScript', icon: '🔷' },
      { name: 'JavaScript', icon: '🟨' },
      { name: 'HTML5', icon: '🌐' },
      { name: 'CSS3 / SCSS', icon: '🎨' },
    ],
  },
  backend: {
    label: 'Backend & APIs',
    items: [
      { name: 'Node.js', icon: '🟩' },
      { name: 'C# / .NET', icon: '🟣' },
      { name: 'REST APIs', icon: '🔗' },
    ],
  },
  tools: {
    label: 'Ferramentas & Workflow',
    items: [
      { name: 'Git / GitHub', icon: '📦' },
      { name: 'VS Code', icon: '💻' },
      { name: 'Figma', icon: '🎯' },
      { name: 'Vite', icon: '⚡' },
    ],
  },
};

export const social = {
  linkedin: 'https://linkedin.com/in/kezia',
  github: 'https://github.com/KeziaOliveira',
  email: 'kezia@email.com',
};
