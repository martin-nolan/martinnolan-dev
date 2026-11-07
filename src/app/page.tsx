import { Figure } from '@/components/Figure';
import { Intro } from '@/components/Intro';
import { Rich } from '@/components/Rich';
import { SectionHead } from '@/components/SectionHead';
import { Svg } from '@/components/Svg';
import { figures, harness, product, site, template } from '@/content/site';

const nav = [
  { href: '#product', label: 'Product' },
  { href: '#harness', label: 'Harness' },
  { href: '#template', label: 'Template' },
  { href: '#contact', label: 'Contact' },
];

export default function Home() {
  return (
    <>
      <header className="topbar">
        <div className="wrap topbar-inner">
          <a className="monogram" href="#main" aria-label={`${site.name}, top of page`}>
            mn
          </a>
          <nav aria-label="Sections">
            <ul>
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main id="main">
        <section className="wrap hero" aria-labelledby="name">
          <div className="hero-text">
            <p className="kicker">{site.kicker}</p>
            <h1 id="name">{site.name}</h1>
            <p className="lede">
              <Rich text={site.intro} />
            </p>
            <ul className="hero-links">
              {site.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <figure className="fig hero-fig">
            <div className="fig-panel">
              <Svg name="rings" />
            </div>
            <figcaption>
              <span className="fig-no">Fig. 01</span> {figures.rings}
            </figcaption>
          </figure>
        </section>

        <section className="wrap section" aria-labelledby="product">
          <SectionHead id="product" number="01" title="Product first" />
          <Intro pull={product.pull} text={product.text} />
          <Figure number="02" name="thread" caption={figures.thread} className="wide" />
          <p className="product-note">
            <Rich text={product.naming} />
          </p>
        </section>

        <section className="wrap section" aria-labelledby="harness">
          <SectionHead id="harness" number="02" title="The harness" />
          <Intro pull={harness.pull} text={harness.text} />
          <Figure number="03" name="harness" caption={figures.harness} className="wide" />
          <div className="measured">
            <p className="reveal">
              <Rich text={harness.trial} />
            </p>
            <Figure number="04" name="measured" caption={figures.measured} />
          </div>
          <dl className="words reveal">
            {harness.words.map((item) => (
              <div key={item.term}>
                <dt>{item.term}</dt>
                <dd>{item.text}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="wrap section" aria-labelledby="template">
          <SectionHead id="template" number="03" title="The template" />
          <div className="side">
            <div className="reveal">
              <p className="pull">{template.pull}</p>
              <p>
                <Rich text={template.text} />
              </p>
            </div>
            <Figure number="05" name="template" caption={figures.template} />
          </div>
        </section>
      </main>

      <footer className="wrap footer" id="contact">
        <p className="say-hello">Say hello.</p>
        <ul className="footer-links">
          {site.links.map((link) => (
            <li key={link.label}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      </footer>
    </>
  );
}
