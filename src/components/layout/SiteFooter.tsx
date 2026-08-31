import { site } from '@/content/site';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-width site-footer__inner">
        <div>
          <p className="site-footer__name">{site.name}</p>
        </div>
        <nav className="link-row" aria-label="Contact links">
          <a href={site.links.github} rel="noreferrer" target="_blank">
            GitHub
          </a>
          <a href={site.links.linkedin} rel="noreferrer" target="_blank">
            LinkedIn
          </a>
          <a href={site.links.email}>Email</a>
        </nav>
      </div>
    </footer>
  );
}
