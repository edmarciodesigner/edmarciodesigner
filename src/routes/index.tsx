import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MotionConfig } from 'motion/react';
import { PortfolioPage } from '../pages/PortfolioPage';

/**
 * Entrada carregada pelo index.html somente em ambiente Vite.
 * As dependências e a configuração da raiz ainda precisam ser instaladas.
 * Os estilos globais são carregados pelo próprio documento HTML.
 */
export function mountPortfolio(container: HTMLElement | null): void {
  if (!container) {
    throw new Error('O elemento de montagem #app não foi encontrado.');
  }

  const root = createRoot(container);

  root.render(
    <StrictMode>
      <MotionConfig reducedMotion="user">
        <PortfolioPage />
      </MotionConfig>
    </StrictMode>,
  );
}
