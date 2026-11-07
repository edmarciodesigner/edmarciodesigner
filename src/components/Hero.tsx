import { useState } from 'react';
import { site } from '../data/site';
import { About } from './InstitutionalSections';
import { ResponsiveImage } from './ResponsiveImage';

export function Hero() {
  const { hero, assets, identity } = site;
  const portrait = assets.portrait;
  const [photoFailed, setPhotoFailed] = useState(false);
  const showPortrait = Boolean(portrait.src) && !photoFailed;

  return (
    <div className="brand-stage" id={hero.id}>
      <div className="hero-shell">
        <div className="hero-panel">
          <div className="hero-topline">
            <span>{hero.sectionLabel}</span>
            <span>{site.locationLabel}</span>
            <span className="hero-seal" aria-label={`Iniciais de ${site.name}`}>
              {identity.initials}
            </span>
          </div>
          <div className={`hero-canvas${showPortrait ? '' : ' hero-canvas-pending'}`}>
            <h1 className="hero-title">
              <span className="hero-title-line">{hero.nameLines[0]}</span>
              <span className="hero-title-line">{hero.nameLines[1]}</span>
            </h1>
            <div className="hero-portrait">
              {showPortrait && portrait.src ? (
                <ResponsiveImage
                  src={portrait.src}
                  alt={portrait.alt}
                  width={portrait.width}
                  height={portrait.height}
                  priority
                  onError={() => setPhotoFailed(true)}
                />
              ) : (
                <div className="hero-portrait-pending" role="img" aria-label={portrait.pendingLabel}>
                  <span>FOTOGRAFIA ORIGINAL</span>
                  <small>{portrait.pendingLabel}</small>
                </div>
              )}
            </div>
            <a className="hero-scroll" href={hero.scrollLink.href}>
              {hero.scrollLink.label}
            </a>
          </div>
          <div className="hero-information">
            <div>
              <h2 className="hero-headline">{hero.headline}</h2>
              <p className="hero-complementary">{hero.complementary}</p>
            </div>
            <div>
              <p className="hero-description">{hero.description}</p>
              <div className="hero-actions">
                <a className="brand-action" href={hero.primaryCta.href}>
                  {hero.primaryCta.label} <span aria-hidden="true">↗</span>
                </a>
                <a className="brand-action brand-action-outline" href={hero.secondaryCta.href}>
                  {hero.secondaryCta.label} <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </div>
          <a className="hero-project-link" href={hero.selectedLink.href}>
            <span>{hero.selectedLink.label}</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
        <About />
      </div>
    </div>
  );
}
