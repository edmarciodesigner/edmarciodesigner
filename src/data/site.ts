export interface SiteLink {
  readonly href: string;
  readonly label: string;
}

export interface PortraitAsset {
  /** Preencher com a URL permanente da fotografia original, sem alterações faciais. */
  readonly src: string | null;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
  readonly source: string;
  readonly sourceNode: string;
  readonly pendingLabel: string;
}

export interface ContactChannel {
  readonly id: 'whatsapp' | 'instagram' | 'email';
  readonly label: string;
  /** URL real do canal; usar mailto: para e-mail. null mantém o estado não informado. */
  readonly href: string | null;
}

export interface CollaborationLogo {
  readonly id: string;
  readonly name: string;
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
}

export interface SiteContent {
  readonly name: string;
  readonly locationLabel: string;
  readonly introduction: string;
  readonly about: {
    readonly sectionLabel: string;
    readonly title: string;
    readonly paragraphs: readonly string[];
    readonly specialtiesLabel: string;
  };
  readonly contact: {
    readonly href: string;
    readonly label: string;
    readonly headline: string;
    readonly description: string;
    readonly nextSteps: string;
    readonly channels: readonly ContactChannel[];
  };
  readonly collaborations: {
    readonly sectionLabel: string;
    readonly title: string;
    readonly emptyTitle: string;
    readonly emptyDescription: string;
    readonly logos: readonly CollaborationLogo[];
  };
  readonly footer: {
    readonly discipline: string;
  };
  readonly identity: {
    readonly wordmark: string;
    readonly discipline: string;
    readonly initials: string;
  };
  readonly hero: {
    readonly id: string;
    readonly sectionLabel: string;
    readonly nameLines: readonly [string, string];
    readonly headline: string;
    readonly description: string;
    readonly complementary: string;
    readonly primaryCta: SiteLink;
    readonly secondaryCta: SiteLink;
    readonly navigationCta: SiteLink;
    readonly selectedLink: SiteLink;
    readonly scrollLink: SiteLink;
    readonly aboutLabel: string;
  };
  readonly assets: {
    readonly portrait: PortraitAsset;
    /** Fotografia adicional somente após validação da imagem original e de sua URL permanente. */
    readonly aboutPortrait: PortraitAsset | null;
  };
}

export const site: SiteContent = {
  name: 'Edmarcio Oliveira',
  locationLabel: 'Designer gráfico · Itaboraí, RJ',
  introduction: 'Sou Edmarcio Oliveira. Crio identidades visuais, conteúdo e landing pages para empresas que querem se apresentar com clareza e personalidade.',
  about: {
    sectionLabel: 'SOBRE / EDMARCIO OLIVEIRA',
    title: 'QUEM É EDMARCIO OLIVEIRA?',
    paragraphs: [
      'Sou designer especializado na criação de identidades visuais estratégicas, conteúdos para redes sociais e projetos visuais que fortalecem o posicionamento de marcas.',
      'Meu trabalho conecta criatividade, estratégia e comunicação para transformar negócios em referências visuais fortes, reconhecidas e memoráveis.',
    ],
    specialtiesLabel: 'ESPECIALIDADES',
  },
  contact: {
    href: 'https://edmarciodesigner.com.br/',
    label: 'INICIAR UM PROJETO',
    headline: 'VAMOS CRIAR ALGO EXTRAORDINÁRIO?',
    description: 'Tem uma ideia, projeto ou marca que precisa ganhar força? Vamos conversar.',
    nextSteps: 'Atendimento a empresas de Itaboraí e região. Para começar, envie uma descrição do projeto, suas referências e o prazo desejado pelo canal de contato de sua preferência.',
    channels: [
      { id: 'whatsapp', label: 'WhatsApp', href: null },
      { id: 'instagram', label: 'Instagram', href: null },
      { id: 'email', label: 'E-mail profissional', href: null },
    ],
  },
  collaborations: {
    sectionLabel: 'MARCAS / COLABORAÇÕES',
    title: 'MARCAS E COLABORAÇÕES.',
    emptyTitle: 'Logotipos ainda não disponíveis.',
    emptyDescription: 'Este espaço receberá as marcas e colaborações após a validação e inclusão dos logotipos originais.',
    logos: [],
  },
  footer: {
    discipline: 'Direção de Arte • Identidade Visual • Design Estratégico',
  },
  identity: {
    wordmark: 'EDMARCIO',
    discipline: 'DESIGNER',
    initials: 'EO',
  },
  hero: {
    id: 'home',
    sectionLabel: '01 / PORTFÓLIO',
    nameLines: ['EDMARCIO', 'DESIGNER'],
    headline: 'DESIGN QUE POSICIONA MARCAS.',
    description: 'Identidades visuais, direção de arte e experiências digitais que transformam negócios em marcas memoráveis.',
    complementary: 'Design estratégico. Identidade. Posicionamento.',
    primaryCta: { href: '#projetos', label: 'EXPLORAR PROJETOS' },
    secondaryCta: { href: '#contato', label: 'VAMOS CRIAR ALGO?' },
    navigationCta: { href: '#contato', label: 'INICIAR PROJETO' },
    selectedLink: { href: '#projetos', label: '02 / PROJETOS SELECIONADOS' },
    scrollLink: { href: '#sobre', label: 'ROLE PARA EXPLORAR' },
    aboutLabel: 'SOBRE / EDMARCIO OLIVEIRA',
  },
  assets: {
    portrait: {
      // A camada original foi identificada no Figma. Não persistir URLs temporárias
      // de exportação nem substituir a fotografia por imagens de outras pessoas.
      src: './assets/images/edmarcio-oliveira-retrato.webp',
      alt: 'Edmarcio Oliveira em sua fotografia original, usando óculos e roupa preta.',
      width: 536,
      height: 904,
      source: 'https://www.figma.com/design/lqu0L4HSdTn6OPZdVxOOcr/CONTE%C3%9ADOS-EDMARCIO-2025?node-id=319-874',
      sourceNode: '319:874',
      pendingLabel: 'Fotografia original · material pendente',
    },
    aboutPortrait: null,
  },
};

export interface NavigationItem extends SiteLink {
  readonly href: '#home' | '#sobre' | '#projetos' | '#servicos' | '#contato';
}

export const navigation = [
  { href: '#home', label: 'HOME' },
  { href: '#sobre', label: 'SOBRE' },
  { href: '#projetos', label: 'PROJETOS' },
  { href: '#servicos', label: 'SERVIÇOS' },
  { href: '#contato', label: 'CONTATO' },
] as const satisfies readonly NavigationItem[];

export const specialties = [
  'IDENTIDADE VISUAL',
  'SOCIAL MEDIA',
  'LANDING PAGES',
] as const;

export const services = [
  {
    number: '01',
    title: 'Identidade Visual',
    description: 'Logo, cores, tipografia e aplicações para dar consistência e personalidade à sua marca.',
  },
  {
    number: '02',
    title: 'Branding e Posicionamento',
    description: 'Estratégia e direção visual para comunicar a essência da marca e definir como ela se apresenta ao público.',
  },
  {
    number: '03',
    title: 'Social Media Design',
    description: 'Direção visual e peças para apresentar seus serviços, explicar sua oferta e conversar com seu público.',
  },
  {
    number: '04',
    title: 'Direção de Arte',
    description: 'Conceitos e orientação estética para conectar imagens, tipografia e composição em uma linguagem consistente.',
  },
  {
    number: '05',
    title: 'Websites e Landing Pages',
    description: 'Páginas objetivas para organizar sua mensagem, destacar sua oferta e facilitar o contato.',
  },
  {
    number: '06',
    title: 'Campanhas e Comunicação Visual',
    description: 'Conceitos e peças integradas para comunicar mensagens com clareza nos diferentes pontos de contato da marca.',
  },
] as const;

// Demonstrações gráficas: não representam clientes ou projetos realizados.
export const projectDemonstrations = [
  {
    id: 'identidade-demonstracao',
    posterClass: 'poster-one',
    lines: ['FORMA', 'QUE', 'MARCA.'],
    disciplines: 'IDENTIDADE · COR · EXPRESSÃO ↗',
    title: 'Identidade em destaque',
    status: 'Projeto ilustrativo',
  },
  {
    id: 'presenca-demonstracao',
    posterClass: 'poster-two',
    lines: ['FEITO', 'PARA', 'APARECER.'],
    disciplines: 'CONTEÚDO · DESIGN · PRESENÇA ↗',
    title: 'Presença digital',
    status: 'Projeto ilustrativo',
  },
] as const;

export const processSteps = [
  {
    number: '01',
    title: 'Entender',
    description: 'Conversamos sobre seu negócio, público, referências e o objetivo do projeto.',
  },
  {
    number: '02',
    title: 'Criar',
    description: 'Desenvolvemos a direção visual e apresentamos a proposta para sua avaliação.',
  },
  {
    number: '03',
    title: 'Colocar no mundo',
    description: 'Com a aprovação, organizamos os materiais finais para as aplicações combinadas.',
  },
] as const;
