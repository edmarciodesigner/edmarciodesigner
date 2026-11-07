import type { ReactNode } from 'react';
import { Navigation } from './Navigation';
import { Footer } from './Footer';

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navigation />
      <main id="conteudo">{children}</main>
      <Footer />
    </>
  );
}
