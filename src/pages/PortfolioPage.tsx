import { Fragment } from 'react';
import { SiteLayout } from '../components/SiteLayout';
import { Hero } from '../components/Hero';
import {
  processSteps,
  projectDemonstrations,
  services,
  site,
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

function ServicesSection() {
  return (
    <section id="servicos">
      <div className="wrap">
        <div className="section-head">
          <div>
            <div className="tag">01 / O que eu faço</div>
            <h2>Design com intenção.<br />Em cada ponto de contato.</h2>
          </div>
          <p className="muted">
            Da primeira impressão à presença digital, uma comunicação que faz sentido para o seu negócio.
          </p>
        </div>
        <div className="services">
          {services.map((service) => (
            <article className="service" key={service.number}>
              <span className="number">{service.number}</span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
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

function ContactSection() {
  return (
    <section className="contact" id="contato">
      <div className="wrap">
        <div className="contact-inner">
          <div>
            <div className="tag">Vamos tirar sua ideia do papel?</div>
            <h2>O próximo projeto<br />pode ser o seu.</h2>
            <p>{site.contact.description}</p>
          </div>
          <a
            className="btn"
            href={site.contact.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {site.contact.label}
          </a>
        </div>
        <details>
          <summary>Atendimento e próximos passos</summary>
          <p>{site.contact.nextSteps}</p>
        </details>
      </div>
    </section>
  );
}

export function PortfolioPage() {
  return (
    <SiteLayout>
      <HeroSection />
      <ServicesSection />
      <ProjectsSection />
      <ProcessSection />
      <ContactSection />
    </SiteLayout>
  );
}
