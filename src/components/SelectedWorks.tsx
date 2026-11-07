import { Fragment, useState } from 'react';
import {
  getProjectCategoryLabel,
  getProjectHref,
  projectCategories,
  projects,
  type Project,
  type ProjectCategoryId,
} from '../data/projects';

export function ProjectVisual({ project }: { project: Project }) {
  const [failedSource, setFailedSource] = useState<string | null>(null);
  const cover = project.images[0];
  const showCover = Boolean(cover && cover.src !== failedSource);
  const tone = project.kind === 'placeholder' ? project.visualTone : 'graphite';

  return (
    <div className={`selected-work-visual selected-work-visual--${tone}`}>
      {showCover && cover ? (
        <img
          src={cover.src}
          alt={cover.alt}
          width={cover.width}
          height={cover.height}
          loading="lazy"
          decoding="async"
          onError={() => setFailedSource(cover.src)}
        />
      ) : (
        <div className="selected-work-art" aria-hidden="true">
          <small>{project.kind === 'placeholder' ? 'CONCEITO VISUAL / DEMONSTRAÇÃO' : 'IMAGEM NÃO DISPONÍVEL'}</small>
          <strong>
            {project.kind === 'placeholder' ? project.placeholderLines.map((line, index) => (
              <Fragment key={`${index}-${line}`}>
                {index > 0 && <br />}
                {line}
              </Fragment>
            )) : project.title}
          </strong>
          <small>{getProjectCategoryLabel(project.category)}</small>
        </div>
      )}
    </div>
  );
}

export function ProjectCard({ project, number }: { project: Project; number: number }) {
  const placeholder = project.kind === 'placeholder';

  return (
    <a className="selected-work-card" href={getProjectHref(project.slug)}>
      <div className="selected-work-card-top">
        <span>{String(number).padStart(2, '0')} / {getProjectCategoryLabel(project.category)}</span>
        {project.year !== undefined && <span>{project.year}</span>}
      </div>
      <ProjectVisual project={project} />
      <div className="selected-work-caption">
        <div>
          {placeholder && <span className="selected-work-badge">PLACEHOLDER / DEMONSTRAÇÃO</span>}
          <h3>{project.title}</h3>
          <p>{getProjectCategoryLabel(project.category)}{project.year !== undefined ? ` · ${project.year}` : ''}</p>
        </div>
        <span className="selected-work-link">VER PROJETO <span aria-hidden="true">↗</span></span>
      </div>
      {placeholder && <p className="selected-work-disclaimer">Demonstração visual. Não representa trabalho de cliente.</p>}
    </a>
  );
}

export function SelectedWorks() {
  const [category, setCategory] = useState<ProjectCategoryId | 'all'>('all');
  const visibleProjects = projects.filter((project) => category === 'all' || project.category === category);
  const filters = [{ id: 'all', label: 'Todos' }, ...projectCategories] as const;

  return (
    <section className="selected-works" id="projetos" aria-labelledby="selected-works-title">
      <div className="institutional-content">
        <div className="section-head">
          <div>
            <p className="institutional-eyebrow">02 / PROJETOS SELECIONADOS</p>
            <h2 id="selected-works-title">SELECTED WORK.</h2>
          </div>
          <div className="selected-work-intro">
            <p>Projetos que transformam ideias em identidades marcantes.</p>
            {!projects.some((project) => project.kind === 'project') && (
              <p className="selected-work-note">Os itens disponíveis são placeholders. Trabalhos reais serão publicados após a inclusão dos materiais originais.</p>
            )}
          </div>
        </div>
        <div className="selected-work-filters" role="group" aria-label="Filtrar projetos por categoria">
          {filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              aria-pressed={category === filter.id}
              aria-controls="selected-work-grid"
              onClick={() => setCategory(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <p className="selected-work-feedback" role="status" aria-live="polite" aria-atomic="true">
          {visibleProjects.length} {visibleProjects.length === 1 ? 'item disponível' : 'itens disponíveis'}
          {category !== 'all' ? ` em ${getProjectCategoryLabel(category)}` : ''}.
        </p>
        <div className="selected-work-grid" id="selected-work-grid">
          {visibleProjects.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              number={projects.indexOf(project) + 1}
            />
          ))}
        </div>
        {visibleProjects.length === 0 && (
          <div className="selected-work-empty">
            <h3>Nenhum projeto disponível nesta categoria.</h3>
            <p>Os trabalhos serão apresentados após a inclusão dos materiais reais.</p>
            {category !== 'all' && (
              <button className="selected-work-reset" type="button" onClick={() => setCategory('all')}>Ver todas as categorias ↗</button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
