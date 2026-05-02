import Head from 'next/head';

import SiteFooter from '@/components/layout/SiteFooter';
import SiteHeader from '@/components/layout/SiteHeader';
import CapabilityPillars from '@/components/sections/CapabilityPillars';
import CaseStudyPreview from '@/components/sections/CaseStudyPreview';
import HarnessSummary from '@/components/sections/HarnessSummary';
import Hero from '@/components/sections/Hero';
import ProductSurfacesSection from '@/components/sections/ProductSurfacesSection';
import ProofStrip from '@/components/sections/ProofStrip';
import SupportingSystemsSection from '@/components/sections/SupportingSystemsSection';
import WritingPreview from '@/components/sections/WritingPreview';
import { caseStudies } from '@/content/case-studies';
import { demoSurfaces } from '@/content/demo-surfaces';
import { harness } from '@/content/harness';
import { profile } from '@/content/profile';
import { supportingSystems } from '@/content/supporting-systems';
import { writing } from '@/content/writing';

export default function Home() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Martin Nolan',
    url: 'https://martinnolan-dev.netlify.app',
    sameAs: [profile.links.github.href, profile.links.linkedin.href],
    jobTitle: 'GenAI Software Engineer',
  };

  return (
    <>
      <Head>
        <title>Martin Nolan | GenAI Software Engineer</title>
        <meta
          name="description"
          content="GenAI software engineer building AI systems that fit real workflows: product integrations, evaluation, run visibility, and reviewable delivery."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://martinnolan-dev.netlify.app" />
        <meta
          property="og:title"
          content="Martin Nolan | GenAI Software Engineer"
        />
        <meta
          property="og:description"
          content="Product work across AI systems, evaluation, run visibility, and agent-assisted engineering delivery."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://martinnolan-dev.netlify.app" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Martin Nolan | GenAI Software Engineer"
        />
        <meta
          name="twitter:description"
          content="Product work across AI systems, evaluation, run visibility, and agent-assisted engineering delivery."
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </Head>

      <div id="top" className="min-h-screen">
        <SiteHeader />
        <main>
          <Hero profile={profile} />
          <ProofStrip items={profile.proofStrip} />
          <HarnessSummary harness={harness} />
          <CapabilityPillars items={profile.capabilityPillars} />
          <CaseStudyPreview items={caseStudies} />
          <SupportingSystemsSection items={supportingSystems} />
          <ProductSurfacesSection items={demoSurfaces} />
          <WritingPreview items={writing} />
        </main>
        <SiteFooter />
      </div>
    </>
  );
}
