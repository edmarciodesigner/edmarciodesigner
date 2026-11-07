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

export interface SiteContent {
  readonly name: string;
  readonly locationLabel: string;
  readonly introduction: string;
  readonly contact: {
    readonly href: string;
    readonly label: string;
    readonly description: string;
    readonly nextSteps: string;
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
  };
}

export const site: SiteContent = {
  name: 'Edmarcio Oliveira',
  locationLabel: 'Designer gráfico · Itaboraí, RJ',
  introduction: 'Sou Edmarcio Oliveira. Crio identidades visuais, conteúdo e landing pages para empresas que querem se apresentar com clareza e personalidade.',
  contact: {
    href: 'https://edmarciodesigner.com.br/',
    label: 'Acessar meu site e conversar ↗',
    description: 'Precisa de uma identidade visual, conteúdo ou uma landing page? Acesse meu site e use o canal de contato disponível para contar sua ideia.',
    nextSteps: 'Atendimento a empresas de Itaboraí e região. Para começar, envie uma descrição do projeto, suas referências e o prazo desejado pelo canal de contato disponível no site.',
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
      src: null,
      alt: 'Edmarcio Oliveira em sua fotografia original, usando óculos e roupa preta.',
      width: 536,
      height: 495,
      source: 'https://www.figma.com/design/lqu0L4HSdTn6OPZdVxOOcr/CONTE%C3%9ADOS-EDMARCIO-2025?node-id=319-874',
      sourceNode: '319:874',
      pendingLabel: 'Fotografia original · material pendente',
    },
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
    title: 'Identidade visual',
    description: 'Logo, cores, tipografia e aplicações para dar consistência e personalidade à sua marca.',
  },
  {
    number: '02',
    title: 'Conteúdo & social',
    description: 'Direção visual e peças para apresentar seus serviços, explicar sua oferta e conversar com seu público.',
  },
  {
    number: '03',
    title: 'Landing pages',
    description: 'Páginas objetivas para organizar sua mensagem, destacar sua oferta e facilitar o contato.',
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
