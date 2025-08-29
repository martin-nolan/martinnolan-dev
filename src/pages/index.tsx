import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useState } from 'react';

import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import ResumeModal from '@/components/ResumeModal';
import AboutSection from '@/components/sections/AboutSection';
import ContactSection from '@/components/sections/ContactSection';
import HeroSection from '@/components/sections/HeroSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import WorkSection from '@/components/sections/WorkSection';
import { logError } from '@/lib/logger';
import type {
  ProcessedProfile,
  ProcessedExperience,
  ProcessedFeaturedProject,
  ProcessedPersonalProject,
  ProcessedContactMethod,
  AdditionalProject,
} from '@/types';

const AIChatWidget = dynamic(() => import('@/components/AIChatWidget'), {
  ssr: false,
  loading: () => null,
});

interface Props {
  profile?: ProcessedProfile;
  experiences?: ProcessedExperience[];
  featuredProjects?: ProcessedFeaturedProject[];
  personalProjects?: ProcessedPersonalProject[];
  projects?: AdditionalProject[]; // New unified projects
  contactMethods?: ProcessedContactMethod[];
  error?: boolean;
  errorMessage?: string;
  cvText?: string | null;
}

const Index = ({
  profile,
  experiences,
  featuredProjects,
  personalProjects,
  projects,
  contactMethods,
  error,
  errorMessage,
  cvText,
}: Props) => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // If there's an error, show error page
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Head>
          <title>Content Unavailable - Martin Nolan Portfolio</title>
          <meta name="description" content="Content management system temporarily unavailable" />
        </Head>
        <div className="mx-auto max-w-2xl px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold text-foreground">Content Unavailable</h1>
          <p className="mb-8 text-xl text-muted-foreground">
            {errorMessage || 'The content management system is temporarily unavailable.'}
          </p>
          <p className="text-muted-foreground">
            Please check back soon, or contact me directly at{' '}
            <a href="mailto:martinnolan_1@hotmail.co.uk" className="text-primary hover:underline">
              martinnolan_1@hotmail.co.uk
            </a>
          </p>
        </div>
      </div>
    );
  }

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile?.name || 'Martin Nolan',
    url: profile?.website || 'https://martinnolan.dev',
    sameAs: ['https://github.com/martin-nolan', 'https://www.linkedin.com/in/martinnolan0110'],
    jobTitle: profile?.title || 'Associate Gen AI Software Engineer',
    worksFor: {
      '@type': 'Organization',
      name: 'Sky UK',
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: "Martin Nolan's Portfolio",
    url: profile?.website || 'https://martinnolan.dev',
  };

  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>{profile?.seoTitle || 'Martin Nolan - AI Engineer'}</title>
        <meta
          name="description"
          content={
            profile?.seoDescription ||
            'The portfolio of Martin Nolan, an AI Engineer at Sky UK specializing in generative AI and full-stack development.'
          }
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={profile?.website || 'https://martinnolan.dev'} />
        <meta property="og:title" content={profile?.seoTitle || 'Martin Nolan - AI Engineer'} />
        <meta
          property="og:description"
          content={
            profile?.seoDescription ||
            'The portfolio of Martin Nolan, an AI Engineer at Sky UK specializing in generative AI and full-stack development.'
          }
        />
        <meta property="og:url" content={profile?.website || 'https://martinnolan.dev'} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://martinnolan.dev/robot.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Martin Nolan - AI Engineer Portfolio" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={profile?.seoTitle || 'Martin Nolan - AI Engineer'} />
        <meta
          name="twitter:description"
          content={
            profile?.tagline ||
            'AI Engineer at Sky UK specializing in generative AI and full-stack development'
          }
        />
        <meta name="twitter:image" content="https://martinnolan.dev/robot.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </Head>
      <Navigation setIsResumeOpen={setIsResumeOpen} />
      <main>
        <HeroSection profile={profile} />
        <AboutSection profile={profile} />
        <WorkSection experiences={experiences} />
        <ProjectsSection
          featuredProjects={featuredProjects}
          personalProjects={personalProjects}
          projects={projects}
        />
        <ContactSection contactMethods={contactMethods} profile={profile} />
      </main>
      <Footer profile={profile} />
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        cvPdfUrl={profile?.cvPdf}
        cvText={cvText}
      />
      <AIChatWidget />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    // ⬇️ Import simplified server CMS and PDF extractor
    const { serverCms } = await import('@/lib/cms');
    const { extractPdfTextServer } = await import('@/lib/pdf-server');

    const [profile, experiences, featuredProjects, personalProjects, contactMethods] =
      await Promise.all([
        serverCms.getProfile(),
        serverCms.getExperiences(),
        serverCms.getFeaturedProjects(),
        serverCms.getPersonalProjects(),
        serverCms.getContactMethods(),
      ]);

    // Projects are already fetched above as featuredProjects and personalProjects

    // Extract CV text server-side only
    let cvText = null;
    if (profile?.cvPdf && typeof profile.cvPdf === 'string' && profile.cvPdf.trim()) {
      try {
        cvText = await extractPdfTextServer(profile.cvPdf);
      } catch (err) {
        logError('Error extracting CV text', {
          error: err instanceof Error ? err.message : String(err),
        });
        cvText = null;
      }
    }

    return {
      props: {
        profile,
        experiences,
        featuredProjects,
        personalProjects,

        contactMethods,
        cvText,
      },
      revalidate: 60, // Revalidate every minute in production
    };
  } catch (error) {
    logError('Error fetching content from CMS', {
      error: error instanceof Error ? error.message : String(error),
    });

    return {
      props: {
        error: true,
        errorMessage: error instanceof Error ? error.message : 'Unable to load content from CMS',
      },
      revalidate: 10, // Retry more frequently when there's an error
    };
  }
};

export default Index;
