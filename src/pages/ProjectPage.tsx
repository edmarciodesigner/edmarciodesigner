import { useEffect, useRef, useState } from 'react';
import { ProjectVisual } from '../components/SelectedWorks';
import { ResponsiveImage } from '../components/ResponsiveImage';
import { getProjectBySlug, getProjectCategoryLabel, type ProjectImage } from '../data/projects';

function GalleryImage({ image }: { image: ProjectImage }) {
  const [failedSource, setFailedSource] = useState<string | null>(null);

  return (
    <figure className="project-detail-image">
      {failedSource === image.src ? (
        <p className="project-detail-image-error">Imagem indisponível: {image.alt}</p>
      ) : (
        <ResponsiveImage
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          srcSet={image.srcSet}
          sizes={image.sizes ?? '(max-width: 640px) calc(100vw - 24px), (max-width: 1328px) calc(100vw - 48px), 1280px'}
          onError={() => setFailedSource(image.src)}
        />
      )}
      {image.caption && <figcaption>{image.caption}</figcaption>}
    </figure>
  );
}

export function ProjectPage({ slug }: { slug: string }) {
  const project = getProjectBySlug(slug);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const previousTitle = document.title;
    const restoreMetadata: Array<() => void> = [];
    const setMetadata = (attribute: 'name' | 'property', key: string, value: string) => {
      const existing = document.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
      const element = existing ?? document.createElement('meta');
      const previousContent = element.getAttribute('content');
      element.setAttribute(attribute, key);
      element.setAttribute('content', value);
      if (!existing) document.head.appendChild(element);

      restoreMetadata.push(() => {
        if (!existing) {
          element.remove();
        } else if (previousContent === null) {
          element.removeAttribute('content');
        } else {
          element.setAttribute('content', previousContent);
        }
      });
    };

    const title = project
      ? `${project.title}${project.kind === 'placeholder' ? ' · Placeholder' : ''} | Edmarcio Oliveira`
      : 'Projeto não encontrado | Edmarcio Oliveira';
    const description = project?.description ?? 'Projeto não encontrado. Volte à galeria de Edmarcio Oliveira para explorar os itens disponíveis.';

    document.title = title;
    setMetadata('name', 'description', description);
    setMetadata('property', 'og:title', title);
    setMetadata('property', 'og:description', description);
    setMetadata('name', 'twitter:title', title);
    setMetadata('name', 'twitter:description', description);
    setMetadata('name', 'robots', project?.kind === 'project' ? 'index, follow' : 'noindex, follow');
    titleRef.current?.focus({ preventScroll: true });

    return () => {
      document.title = previousTitle;
      restoreMetadata.reverse().forEach((restore) => restore());
    };
  }, [slug, project]);

  if (!project) {
    return (
      <article className="project-detail project-detail-not-found" aria-labelledby="project-page-title">
        <div className="institutional-content">
          <a className="project-detail-back" href="./#projetos">← VOLTAR À GALERIA</a>
          <p className="institutional-eyebrow">PROJETO INDISPONÍVEL</p>
          <h1 className="project-detail-title" id="project-page-title" ref={titleRef} tabIndex={-1}>Projeto não encontrado.</h1>
          <p className="project-detail-description">Este endereço não corresponde a um projeto disponível. Volte à galeria para explorar os itens publicados.</p>
          <a className="brand-action" href="./#projetos">EXPLORAR PROJETOS <span aria-hidden="true">↗</span></a>
        </div>
      </article>
    );
  }

  const textFields = [
    { title: 'Cliente', value: project.client },
    { title: 'Desafio', value: project.challenge },
    { title: 'Conceito criativo', value: project.concept },
    { title: 'Resultados', value: project.results },
  ];
  const missingFields = textFields.filter((field) => !field.value?.trim()).map((field) => field.title);
  if (!project.applications?.length) missingFields.push('Aplicações');

  return (
    <article className="project-detail" aria-labelledby="project-page-title">
      <div className="institutional-content">
        <a className="project-detail-back" href="./#projetos">← VOLTAR À GALERIA</a>
        <header className="project-detail-header">
          <p className="institutional-eyebrow">PORTFÓLIO / {getProjectCategoryLabel(project.category)}</p>
          {project.kind === 'placeholder' && <p className="selected-work-badge">PLACEHOLDER / DEMONSTRAÇÃO</p>}
          <h1 className="project-detail-title" id="project-page-title" ref={titleRef} tabIndex={-1}>{project.title}</h1>
          <p className="project-detail-description">{project.description}</p>
          <dl className="project-detail-meta">
            <div><dt>Categoria</dt><dd>{getProjectCategoryLabel(project.category)}</dd></div>
            {project.year !== undefined && <div><dt>Ano</dt><dd>{project.year}</dd></div>}
            <div><dt>Tipo</dt><dd>{project.kind === 'placeholder' ? 'Demonstração visual; não é um trabalho de cliente.' : 'Projeto'}</dd></div>
          </dl>
        </header>
        {project.images.length > 0 ? (
          <div className="project-detail-gallery" aria-label="Imagens do projeto">
            {project.images.map((image, index) => <GalleryImage key={`${image.src}-${index}`} image={image} />)}
          </div>
        ) : (
          <figure className="project-detail-demo">
            <ProjectVisual key={project.slug} project={project} />
            <figcaption>
              {project.kind === 'placeholder'
                ? 'Placeholder tipográfico. Não representa identidade visual, mockups ou aplicações de um cliente real.'
                : 'As imagens deste projeto ainda não estão disponíveis.'}
            </figcaption>
          </figure>
        )}
        <div className="project-detail-story">
          {textFields.filter((field) => field.value?.trim()).map((field) => (
            <section className="project-detail-section" key={field.title}>
              <h2>{field.title}</h2>
              <p>{field.value}</p>
            </section>
          ))}
          {Boolean(project.applications?.length) && (
            <section className="project-detail-section">
              <h2>Aplicações</h2>
              <ul>{project.applications?.map((application, index) => <li key={`${index}-${application}`}>{application}</li>)}</ul>
            </section>
          )}
        </div>
        {(missingFields.length > 0 || project.images.length === 0) && (
          <aside className="project-detail-pending" aria-labelledby="project-pending-title">
            <h2 id="project-pending-title">Materiais pendentes.</h2>
            <p>{project.kind === 'placeholder'
              ? 'Esta página demonstra a apresentação de um projeto. Informações profissionais e imagens serão exibidas somente com materiais reais.'
              : 'Os conteúdos abaixo serão apresentados quando estiverem disponíveis.'}</p>
            <ul>
              {missingFields.map((field) => <li key={field}>{field}</li>)}
              {project.images.length === 0 && <li>Identidade visual, mockups e galeria de imagens</li>}
            </ul>
          </aside>
        )}
        <a className="project-detail-back project-detail-back-bottom" href="./#projetos">← VOLTAR AOS PROJETOS SELECIONADOS</a>
      </div>
    </article>
  );
}
