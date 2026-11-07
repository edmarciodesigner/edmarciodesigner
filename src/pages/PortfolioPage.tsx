import { useEffect, useState } from 'react';
import { SiteLayout } from '../components/SiteLayout';
import { Hero } from '../components/Hero';
import { Collaborations, Contact, Services } from '../components/InstitutionalSections';
import { SelectedWorks } from '../components/SelectedWorks';
import { ProjectPage } from './ProjectPage';
import { processSteps, specialties } from '../data/site';

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
  const [projectSlug, setProjectSlug] = useState(() => new URLSearchParams(window.location.search).get('projeto'));

  useEffect(() => {
    const updateLocation = () => setProjectSlug(new URLSearchParams(window.location.search).get('projeto'));
    window.addEventListener('popstate', updateLocation);
    return () => window.removeEventListener('popstate', updateLocation);
  }, []);

  return (
    <SiteLayout>
      {projectSlug !== null ? (
        <ProjectPage slug={projectSlug} />
      ) : (
        <>
          <HeroSection />
          <Services />
          <SelectedWorks />
          <ProcessSection />
          <Collaborations />
          <Contact />
        </>
      )}
    </SiteLayout>
  );
}
