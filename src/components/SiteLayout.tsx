import { useRef, type ReactNode } from 'react';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { useVisualMotion } from '../hooks/useVisualMotion';

export function SiteLayout({ children }: { children: ReactNode }) {
  const mainRef = useRef<HTMLElement>(null);
  useVisualMotion(mainRef);

  return (
    <>
      <Navigation />
      <main id="conteudo" ref={mainRef}>{children}</main>
      <Footer />
    </>
  );
}
