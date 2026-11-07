export const projectCategories = [
  { id: 'identidade-visual', label: 'Identidade Visual' },
  { id: 'branding', label: 'Branding' },
  { id: 'social-media', label: 'Social Media' },
  { id: 'direcao-de-arte', label: 'Direção de Arte' },
  { id: 'websites', label: 'Websites' },
  { id: 'campanhas', label: 'Campanhas' },
] as const;

export type ProjectCategoryId = typeof projectCategories[number]['id'];

export interface ProjectImage {
  /** Caminho local ou URL permanente de um arquivo real; preferir WebP ou AVIF. */
  readonly src: string;
  readonly alt: string;
  /** Dimensões intrínsecas positivas, em pixels, para reservar a proporção. */
  readonly width: number;
  readonly height: number;
  /** Variantes existentes do mesmo recorte, com descritores de largura: arquivo.webp 640w. */
  readonly srcSet?: string;
  /** Opcional: largura de exibição; os componentes fornecem padrões para card e galeria. */
  readonly sizes?: string;
  readonly caption?: string;
}

interface ProjectBase {
  readonly slug: string;
  readonly title: string;
  readonly category: ProjectCategoryId;
  readonly description: string;
  readonly images: readonly ProjectImage[];
  readonly year?: number;
  readonly client?: string;
  readonly challenge?: string;
  readonly concept?: string;
  readonly applications?: readonly string[];
  readonly results?: string;
}

export interface PlaceholderProject extends ProjectBase {
  readonly kind: 'placeholder';
  readonly placeholderLines: readonly string[];
  readonly visualTone: 'cyan' | 'graphite';
}

export interface PublishedProject extends ProjectBase {
  readonly kind: 'project';
}

export type Project = PlaceholderProject | PublishedProject;

// Demonstrações permanentes: não representam clientes, entregas ou resultados.
// Ao cadastrar um trabalho real, crie outro registro com slug próprio e kind: 'project'.
// Imagens e campos opcionais devem receber somente materiais reais autorizados.
export const projects: readonly Project[] = [
  {
    slug: 'identidade-demonstracao',
    kind: 'placeholder',
    title: 'Identidade em destaque',
    category: 'identidade-visual',
    description: 'Demonstração de composição tipográfica para identidade visual. Este placeholder não representa um trabalho realizado para um cliente.',
    images: [],
    placeholderLines: ['FORMA', 'QUE', 'MARCA.'],
    visualTone: 'cyan',
  },
  {
    slug: 'presenca-demonstracao',
    kind: 'placeholder',
    title: 'Presença digital',
    category: 'social-media',
    description: 'Demonstração de composição editorial para presença digital. Este placeholder não representa uma campanha ou um trabalho realizado para um cliente.',
    images: [],
    placeholderLines: ['FEITO', 'PARA', 'APARECER.'],
    visualTone: 'graphite',
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getProjectCategoryLabel(category: ProjectCategoryId): string {
  return projectCategories.find((item) => item.id === category)?.label ?? category;
}

export function getProjectHref(slug: string): string {
  return `?projeto=${encodeURIComponent(slug)}`;
}
