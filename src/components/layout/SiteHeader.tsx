import { site } from '@/content/site';

const navigation = [
  { href: '#system', label: 'Agents' },
  { href: '#practice', label: 'Product' },
] as const;

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="site-header__brand" href="#top" aria-label="Martin Nolan, back to top">
          <span className="site-header__monogram" aria-hidden="true">
            MN
          </span>

          <span>
            <strong>{site.name}</strong>
            <small>{site.role}</small>
          </span>
        </a>

        <nav className="site-header__nav" aria-label="Page sections">
          {navigation.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
