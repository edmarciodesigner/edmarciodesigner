export const site = {
  name: 'Edmarcio Oliveira',
  locationLabel: 'Designer gráfico · Itaboraí, RJ',
  introduction: 'Sou Edmarcio Oliveira. Crio identidades visuais, conteúdo e landing pages para empresas que querem se apresentar com clareza e personalidade.',
  contact: {
    href: 'https://edmarciodesigner.com.br/',
    label: 'Acessar meu site e conversar ↗',
    description: 'Precisa de uma identidade visual, conteúdo ou uma landing page? Acesse meu site e use o canal de contato disponível para contar sua ideia.',
    nextSteps: 'Atendimento a empresas de Itaboraí e região. Para começar, envie uma descrição do projeto, suas referências e o prazo desejado pelo canal de contato disponível no site.',
  },
} as const;

export const navigation = [
  { href: '#servicos', label: 'Serviços' },
  { href: '#projetos', label: 'Projetos' },
  { href: '#contato', label: 'Vamos conversar ↗' },
] as const;

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
