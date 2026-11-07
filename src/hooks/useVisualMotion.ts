import { useEffect, type RefObject } from 'react';

const revealSelector = [
  '.institutional-about-grid > div',
  '.institutional-about-portrait',
  '.section-head',
  '.institutional-service-row',
  '.selected-work-card',
  '.process > div',
  '.steps > li',
  '.institutional-collaborations .institutional-eyebrow',
  '.institutional-collaborations h2',
  '.institutional-empty',
  '.institutional-logo-list > li',
  '.contact-inner > div',
  '.institutional-channels > li',
  '.project-detail-gallery > figure',
  '.project-detail-demo',
  '.project-detail-section',
  '.project-detail-pending',
].join(', ');

/** Efeitos opcionais: nenhum conteúdo depende da execução deste hook. */
export function useVisualMotion(rootRef: RefObject<HTMLElement | null>): void {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const desktopPointer = window.matchMedia('(min-width: 960px) and (hover: hover) and (pointer: fine)');
    let disposeEffects: (() => void) | undefined;

    const startEffects = (): (() => void) => {
      const observed = new WeakSet<HTMLElement>();
      const revealed = new WeakSet<HTMLElement>();
      const active = new Map<HTMLElement, Animation>();
      let canvas: HTMLElement | null = null;
      let canvasVisible = false;
      let parallaxFrame = 0;
      let scanFrame = 0;
      let disposed = false;

      const finishReveal = (element: HTMLElement) => {
        const animation = active.get(element);
        active.delete(element);
        if (animation) {
          animation.onfinish = null;
          animation.cancel();
        }
        revealObserver.unobserve(element);
      };

      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;

          if (!entry.isIntersecting) {
            if (active.has(element)) finishReveal(element);
            return;
          }

          if (revealed.has(element)) return;
          revealed.add(element);

          // Conteúdo focado ou aba oculta permanece imediatamente legível.
          if (document.hidden || element.contains(document.activeElement)) {
            finishReveal(element);
            return;
          }

          try {
            // Preserva o contraste dos textos durante toda a entrada.
            const animation = element.animate([
              { opacity: 1, transform: 'translate3d(0, 18px, 0)' },
              { opacity: 1, transform: 'translate3d(0, 0, 0)' },
            ], {
              duration: 440,
              easing: 'cubic-bezier(.2, .7, .2, 1)',
              fill: 'none',
            });
            active.set(element, animation);
            animation.onfinish = () => finishReveal(element);
          } catch {
            // Sem suporte à animação, os estilos originais continuam visíveis.
            finishReveal(element);
          }
        });
      }, { threshold: 0, rootMargin: '0px 0px -5% 0px' });

      const resetParallax = () => {
        if (parallaxFrame) window.cancelAnimationFrame(parallaxFrame);
        parallaxFrame = 0;
        canvas?.style.removeProperty('--visual-parallax');
      };

      const scheduleParallax = () => {
        if (disposed || !canvas || !canvasVisible || document.hidden || !desktopPointer.matches) {
          resetParallax();
          return;
        }
        if (parallaxFrame) return;

        parallaxFrame = window.requestAnimationFrame(() => {
          parallaxFrame = 0;
          if (!canvas || !canvasVisible || document.hidden || !desktopPointer.matches) return;

          const bounds = canvas.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          const progress = (viewportHeight / 2 - bounds.top - bounds.height / 2)
            / Math.max(1, viewportHeight + bounds.height);
          const offset = Math.max(-12, Math.min(12, progress * 24));
          canvas.style.setProperty('--visual-parallax', `${offset.toFixed(2)}px`);
        });
      };

      const parallaxObserver = new IntersectionObserver((entries) => {
        const entry = entries.find((item) => item.target === canvas);
        if (!entry) return;
        canvasVisible = entry.isIntersecting;
        scheduleParallax();
      });

      const scan = () => {
        if (disposed) return;
        root.querySelectorAll<HTMLElement>(revealSelector).forEach((element) => {
          if (observed.has(element)) return;
          observed.add(element);
          revealObserver.observe(element);
        });

        // Filtros e mudanças de rota podem substituir os elementos observados.
        Array.from(active.keys()).forEach((element) => {
          if (!root.contains(element)) finishReveal(element);
        });

        const nextCanvas = root.querySelector<HTMLElement>('.hero-canvas');
        if (nextCanvas !== canvas) {
          resetParallax();
          parallaxObserver.disconnect();
          canvas = nextCanvas;
          canvasVisible = false;
          if (canvas) parallaxObserver.observe(canvas);
        }
      };

      const mutations = new MutationObserver(() => {
        if (scanFrame || disposed) return;
        scanFrame = window.requestAnimationFrame(() => {
          scanFrame = 0;
          scan();
        });
      });

      const finishFocusedReveal = (event: FocusEvent) => {
        if (!(event.target instanceof Node)) return;
        const target = event.target;
        Array.from(active.keys()).forEach((element) => {
          if (element.contains(target)) finishReveal(element);
        });
      };

      const handleVisibility = () => {
        if (document.hidden) {
          Array.from(active.keys()).forEach(finishReveal);
          resetParallax();
        } else {
          scan();
          scheduleParallax();
        }
      };

      root.setAttribute('data-visual-motion', 'js');
      scan();
      mutations.observe(root, { childList: true, subtree: true });
      root.addEventListener('focusin', finishFocusedReveal);
      window.addEventListener('scroll', scheduleParallax, { passive: true });
      window.addEventListener('resize', scheduleParallax, { passive: true });
      document.addEventListener('visibilitychange', handleVisibility);
      desktopPointer.addEventListener('change', scheduleParallax);

      return () => {
        disposed = true;
        mutations.disconnect();
        revealObserver.disconnect();
        parallaxObserver.disconnect();
        if (scanFrame) window.cancelAnimationFrame(scanFrame);
        resetParallax();
        Array.from(active.keys()).forEach(finishReveal);
        root.removeEventListener('focusin', finishFocusedReveal);
        window.removeEventListener('scroll', scheduleParallax);
        window.removeEventListener('resize', scheduleParallax);
        document.removeEventListener('visibilitychange', handleVisibility);
        desktopPointer.removeEventListener('change', scheduleParallax);
        root.removeAttribute('data-visual-motion');
      };
    };

    const configure = () => {
      disposeEffects?.();
      disposeEffects = undefined;
      if (reducedMotion.matches
        || typeof IntersectionObserver === 'undefined'
        || typeof MutationObserver === 'undefined'
        || typeof Element.prototype.animate !== 'function') return;
      disposeEffects = startEffects();
    };

    configure();
    reducedMotion.addEventListener('change', configure);

    return () => {
      reducedMotion.removeEventListener('change', configure);
      disposeEffects?.();
    };
  }, [rootRef]);
}
