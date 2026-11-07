import type { ReactNode } from 'react';
import { site } from '../data/site';
import { Navigation } from './Navigation';

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
      <Navigation />
      <main id="conteudo">{children}</main>
      <SiteFooter />
    </>
  );
}
