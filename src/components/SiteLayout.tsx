import type { ReactNode } from 'react';
import { navigation, site } from '../data/site';

function SiteHeader() {
  return (
    <>
      <a className="skip" href="#conteudo">Pular para o conteúdo</a>
      <header>
        <nav className="wrap" aria-label="Menu principal">
          <a className="logo" href="#" aria-label="Edmarcio, início">
            edmarcio<span>®</span>
          </a>
          <div className="links">
            {navigation.map((item) => (
              <a key={item.href} href={item.href}>{item.label}</a>
            ))}
          </div>
        </nav>
      </header>
    </>
  );
}

function SiteFooter() {
  return (
    <footer>
      <div className="wrap foot">
        <a className="logo" href="#">edmarcio<span>®</span></a>
        <span>
          © <span id="year">{new Date().getFullYear()}</span> {site.name} · Design com personalidade.
        </span>
        <a href="#conteudo">Voltar ao topo ↑</a>
      </div>
    </footer>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main id="conteudo">{children}</main>
      <SiteFooter />
    </>
  );
}
