import { site } from '../data/site';

export function Footer() {
  return (
    <footer className="institutional-footer">
      <div className="institutional-content">
        <div className="foot institutional-footer-top">
          <a className="brand-wordmark" href="#home" aria-label={`${site.name}, início`}>
            {site.identity.wordmark}
            <span>{site.identity.discipline}</span>
          </a>
          <p>{site.footer.discipline}</p>
          <a className="institutional-footer-top-link" href="#conteudo">Voltar ao topo ↑</a>
        </div>
        <div className="institutional-footer-bottom">
          <span>© <span id="year">{new Date().getFullYear()}</span> {site.name}. Todos os direitos reservados.</span>
          <span>{site.locationLabel}</span>
        </div>
      </div>
    </footer>
  );
}
