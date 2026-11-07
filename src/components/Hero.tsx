import { useState } from 'react';
import { site } from '../data/site';
import { About } from './InstitutionalSections';
import { ResponsiveImage } from './ResponsiveImage';

function FigmaMark() {
  return (
    <span className="hero-figma-mark">
      <i /><i /><i /><i /><i />
    </span>
  );
}

export function Hero() {
  const { hero, assets } = site;
  const portrait = assets.portrait;
  const [photoFailed, setPhotoFailed] = useState(false);
  const showPortrait = Boolean(portrait.src) && !photoFailed;

  return (
    <div className="brand-stage" id={hero.id}>
      <div className="hero-shell">
        <div className="hero-panel hero-panel-reference">
          <div className="hero-scene" aria-label="Edmarcio Designer: apresentação visual">
            <h1 className="hero-title hero-title-editorial">
              <span className="hero-title-name">{hero.nameLines[0]}</span>
              <span className="hero-title-role">{hero.nameLines[1]}</span>
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
            <div className="hero-profile" aria-label="Perfil: designeredmarcio">
              <span className="hero-profile-avatar">
                {showPortrait && portrait.src ? (
                  <img src={portrait.src} alt="" width={portrait.width} height={portrait.height} loading="lazy" decoding="async" />
                ) : null}
              </span>
              <span className="hero-profile-copy">
                <strong>designeredmarcio <span className="hero-verified" aria-label="Perfil">✦</span></strong>
                <small>Direção criativa · Identidade visual</small>
              </span>
            </div>
            <span className="hero-figma-sticker hero-figma-sticker-left" aria-hidden="true"><FigmaMark /></span>
            <span className="hero-figma-sticker hero-figma-sticker-right" aria-hidden="true"><FigmaMark /></span>
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
