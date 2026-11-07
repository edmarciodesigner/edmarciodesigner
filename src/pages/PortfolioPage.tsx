import { Fragment } from 'react';
import { SiteLayout } from '../components/SiteLayout';
import { Hero } from '../components/Hero';
import { Collaborations, Contact, Services } from '../components/InstitutionalSections';
import {
  processSteps,
  projectDemonstrations,
  specialties,
} from '../data/site';

function HeroSection() {
  return (
    <>
      <Hero />
      <div className="strip" aria-label="Áreas de atuação">
        {specialties.map((specialty) => <span key={specialty}>{specialty}</span>)}
      </div>
    </>
  );
}

function ProjectsSection() {
  return (
    <section id="projetos">
      <div className="wrap">
        <div className="section-head">
          <div>
            <div className="tag">02 / Conceitos visuais</div>
            <h2>Ideias que ganham forma.</h2>
          </div>
          <p className="muted">
            Exemplos visuais de demonstração para explorar identidade e presença digital. Não representam trabalhos de clientes.
          </p>
        </div>
        <div className="projects">
          {projectDemonstrations.map((project) => (
            <article key={project.id}>
              <div className={`poster ${project.posterClass}`}>
                <small>CONCEITO VISUAL / DEMONSTRAÇÃO</small>
                <strong>
                  {project.lines.map((line, index) => (
                    <Fragment key={line}>
                      {index > 0 && <br />}
                      {line}
                    </Fragment>
                  ))}
                </strong>
                <small>{project.disciplines}</small>
              </div>
              <div className="project-caption">
                <h3>{project.title}</h3>
                <span>{project.status}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section>
      <div className="wrap process">
        <div>
          <div className="tag">03 / Como trabalhamos</div>
          <h2>Uma boa ideia começa<br />com uma boa conversa.</h2>
          <p className="muted">
            Entender seu momento é o primeiro passo para construir uma solução visual relevante.
          </p>
        </div>
        <ol className="steps">
          {processSteps.map((step) => (
            <li key={step.number}>
              <strong>{step.number} — {step.title}</strong>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function PortfolioPage() {
  return (
    <SiteLayout>
      <HeroSection />
      <Services />
      <ProjectsSection />
      <ProcessSection />
      <Collaborations />
      <Contact />
    </SiteLayout>
  );
}
