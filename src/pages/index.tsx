import Head from 'next/head';

import SiteFooter from '@/components/layout/SiteFooter';
import SiteHeader from '@/components/layout/SiteHeader';
import AgentEngineering from '@/components/sections/AgentEngineering';
import Hero from '@/components/sections/Hero';
import ProductEngineering from '@/components/sections/ProductEngineering';
import { site } from '@/content/site';

const description =
  'AI engineer working across full-stack applications, model integration, evaluation, ' +
  'observability and agent-assisted software development.';

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  jobTitle: site.role,
  url: 'https://martinnolan-dev.netlify.app',
  sameAs: [site.links.github, site.links.linkedin],
  knowsAbout: [
    'AI application engineering',
    'Full-stack development',
    'Agent-assisted software engineering',
    'AI evaluation',
    'Software architecture',
  ],
};

export default function Home() {
  return (
    <>
      <Head>
        <title>Martin Nolan | AI Engineer</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#f6f1e8" />

        <link rel="canonical" href="https://martinnolan-dev.netlify.app" />

        <meta property="og:title" content="Martin Nolan | AI Engineer" />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://martinnolan-dev.netlify.app" />
        <meta property="og:image" content="https://martinnolan-dev.netlify.app/og-card.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Martin Nolan, AI Engineer" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Martin Nolan | AI Engineer" />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://martinnolan-dev.netlify.app/og-card.png" />
        <meta name="twitter:image:alt" content="Martin Nolan, AI Engineer" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </Head>

      <a className="skip-link" href="#content">
        Skip to content
      </a>

      <div className="site-shell" id="top">
        <SiteHeader />

        <main id="content" tabIndex={-1}>
          <Hero />
          <AgentEngineering />
          <ProductEngineering />
        </main>

        <SiteFooter />
      </div>
    </>
  );
}
