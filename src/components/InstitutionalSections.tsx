import { useState } from 'react';
import { services, site, specialties } from '../data/site';
import { ResponsiveImage } from './ResponsiveImage';

export function About() {
  const portrait = site.assets.aboutPortrait;
  const [photoFailed, setPhotoFailed] = useState(false);

  return (
    <section className="institutional-section institutional-about" id="sobre" aria-labelledby="about-title">
      <div className="institutional-content institutional-about-grid">
        <div>
          <p className="institutional-eyebrow">{site.about.sectionLabel}</p>
          <h2 id="about-title">{site.about.title}</h2>
        </div>
        <div className="institutional-about-copy">
          {site.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <p className="institutional-eyebrow institutional-specialties-label">{site.about.specialtiesLabel}</p>
          <ul className="institutional-specialties">
            {specialties.map((specialty) => <li key={specialty}>{specialty}</li>)}
          </ul>
        </div>
        {portrait?.src && !photoFailed && (
          <figure className="institutional-about-portrait">
            <ResponsiveImage
              src={portrait.src}
              alt={portrait.alt}
              width={portrait.width}
              height={portrait.height}
              onError={() => setPhotoFailed(true)}
            />
          </figure>
        )}
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section className="institutional-section institutional-services" id="servicos" aria-labelledby="services-title">
      <div className="institutional-content">
        <div className="section-head">
          <div>
            <p className="institutional-eyebrow">01 / O QUE EU FAÇO</p>
            <h2 id="services-title">CRIATIVIDADE COM PROPÓSITO.</h2>
          </div>
          <p className="muted">
            Da primeira impressão à presença digital, uma comunicação que faz sentido para o seu negócio.
          </p>
        </div>
        <ol className="institutional-service-list">
          {services.map((service) => (
            <li className="institutional-service-row" key={service.number}>
              <span className="institutional-service-number" aria-hidden="true">{service.number}</span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Collaborations() {
  const { collaborations } = site;

  return (
    <section className="institutional-section institutional-collaborations" aria-labelledby="collaborations-title">
      <div className="institutional-content">
        <p className="institutional-eyebrow">{collaborations.sectionLabel}</p>
        <h2 id="collaborations-title">{collaborations.title}</h2>
        {collaborations.logos.length > 0 ? (
          <ul className="institutional-logo-list" aria-label="Marcas e colaborações">
            {collaborations.logos.map((logo) => (
              <li key={logo.id}>
                <ResponsiveImage
                  src={logo.src}
                  alt={logo.alt || logo.name}
                  width={logo.width}
                  height={logo.height}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className="institutional-empty" role="note">
            <h3>{collaborations.emptyTitle}</h3>
            <p>{collaborations.emptyDescription}</p>
          </div>
        )}
      </div>
    </section>
  );
}

export function Contact() {
  const { contact } = site;
  const configuredChannels = contact.channels.filter((channel) => channel.href);
  const primaryHref = configuredChannels[0]?.href || contact.href;
  const primaryExternal = /^https?:\/\//i.test(primaryHref);

  return (
    <section className="contact institutional-section institutional-contact" id="contato" aria-labelledby="contact-title">
      <div className="institutional-content">
        <div className="contact-inner">
          <div>
            <p className="institutional-eyebrow">CONTATO / PRÓXIMO PROJETO</p>
            <h2 id="contact-title">{contact.headline}</h2>
            <p className="institutional-contact-description">{contact.description}</p>
          </div>
          <div className="institutional-contact-start">
            <a
              className="brand-action institutional-contact-action"
              href={primaryHref}
              target={primaryExternal ? '_blank' : undefined}
              rel={primaryExternal ? 'noopener noreferrer' : undefined}
            >
              {contact.label} <span aria-hidden="true">↗</span>
            </a>
            {configuredChannels.length === 0 && (
              <p className="institutional-contact-fallback">Para entrar em contato, acesse o site atual.</p>
            )}
          </div>
        </div>
        <ul className="institutional-channels" aria-label="Canais de contato">
          {contact.channels.map((channel) => {
            const external = channel.href ? /^https?:\/\//i.test(channel.href) : false;

            return (
              <li key={channel.id}>
                {channel.href ? (
                  <a
                    href={channel.href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                  >
                    <span>{channel.label}</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <div className="institutional-channel-pending">
                    <span>{channel.label}</span>
                    <small>Não informado</small>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
        <details className="institutional-contact-details">
          <summary>Atendimento e próximos passos</summary>
          <p>{contact.nextSteps}</p>
        </details>
      </div>
    </section>
  );
}
