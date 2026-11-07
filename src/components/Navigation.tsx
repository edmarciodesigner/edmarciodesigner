import { useEffect, useRef } from 'react';
import { navigation, site } from '../data/site';

export function Navigation() {
  const menuRef = useRef<HTMLDetailsElement>(null);
  const isProjectPage = typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('projeto');
  const sectionHref = (href: string) => isProjectPage ? `./${href}` : href;

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    const desktop = window.matchMedia('(min-width: 960px)');
    const closeForDesktop = () => {
      if (desktop.matches) menu.open = false;
    };
    const closeFromOutside = (event: Event) => {
      if (event.target instanceof Node && !menu.contains(event.target)) {
        menu.open = false;
      }
    };
    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && menu.open) {
        event.preventDefault();
        menu.open = false;
        menu.querySelector('summary')?.focus();
      }
    };

    closeForDesktop();
    desktop.addEventListener('change', closeForDesktop);
    document.addEventListener('pointerdown', closeFromOutside);
    document.addEventListener('focusin', closeFromOutside);
    document.addEventListener('keydown', closeWithEscape);

    return () => {
      desktop.removeEventListener('change', closeForDesktop);
      document.removeEventListener('pointerdown', closeFromOutside);
      document.removeEventListener('focusin', closeFromOutside);
      document.removeEventListener('keydown', closeWithEscape);
    };
  }, []);

  const closeMenu = () => {
    if (menuRef.current) menuRef.current.open = false;
  };

  return (
    <>
      <a className="skip brand-skip" href="#conteudo">Pular para o conteúdo</a>
      <header className="brand-header">
        <nav className="wrap brand-nav" aria-label="Menu principal">
          <a className="brand-wordmark" href={sectionHref('#home')} aria-label={`${site.name}, início`}>
            {site.identity.wordmark}
            <span>{site.identity.discipline}</span>
          </a>
          <div className="brand-desktop-links">
            {navigation.map((item) => (
              <a key={item.href} href={sectionHref(item.href)}>{item.label}</a>
            ))}
          </div>
          <a className="brand-action brand-nav-cta" href={sectionHref(site.hero.navigationCta.href)}>
            {site.hero.navigationCta.label} <span aria-hidden="true">↗</span>
          </a>
          <details className="brand-menu" ref={menuRef}>
            <summary>MENU</summary>
            <div className="brand-mobile-links">
              {navigation.map((item) => (
                <a key={item.href} href={sectionHref(item.href)} onClick={closeMenu}>{item.label}</a>
              ))}
              <a
                className="brand-action brand-nav-cta"
                href={sectionHref(site.hero.navigationCta.href)}
                onClick={closeMenu}
              >
                {site.hero.navigationCta.label} <span aria-hidden="true">↗</span>
              </a>
            </div>
          </details>
        </nav>
      </header>
    </>
  );
}
