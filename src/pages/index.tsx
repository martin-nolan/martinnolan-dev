import Head from "next/head";
import Navigation from "@/widgets/navigation";
import HeroSection from "@/widgets/page-sections/HeroSection";
import AboutSection from "@/widgets/page-sections/AboutSection";
import ProjectsSection from "@/widgets/page-sections/ProjectsSection";
import ContactSection from "@/widgets/page-sections/ContactSection";
import Footer from "@/widgets/footer";
import ResumeModal from "@/features/resume-modal";
import dynamic from "next/dynamic";
import { useState } from "react";
import { GetStaticProps } from "next";
import { contentService } from "@/shared/lib/content-service";

const AIChatWidget = dynamic(
  () => import("@/features/ai-chat").then((mod) => mod.AIChatWidget),
  { ssr: false }
);

/* eslint-disable @typescript-eslint/no-explicit-any */
interface Props {
  profile?: any;
  featuredProjects?: any[];
  personalProjects?: any[];
  contactMethods?: any[];
  error?: boolean;
  errorMessage?: string;
}

const Index = ({
  profile,
  featuredProjects,
  personalProjects,
  contactMethods,
  error,
  errorMessage,
}: Props) => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // If there's an error, show error page
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Head>
          <title>Content Unavailable - Martin Nolan Portfolio</title>
          <meta
            name="description"
            content="Content management system temporarily unavailable"
          />
        </Head>
        <div className="mx-auto max-w-2xl px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold text-foreground">
            Content Unavailable
          </h1>
          <p className="mb-8 text-xl text-muted-foreground">
            {errorMessage ||
              "The content management system is temporarily unavailable."}
          </p>
          <p className="text-muted-foreground">
            Please check back soon, or contact me directly at{" "}
            <a
              href="mailto:martinnolan_1@hotmail.co.uk"
              className="text-primary hover:underline"
            >
              martinnolan_1@hotmail.co.uk
            </a>
          </p>
        </div>
      </div>
    );
  }

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile?.fullName || "Martin Nolan",
    url: profile?.website || "https://martinnolan.dev",
    sameAs: [
      "https://github.com/martin-nolan",
      "https://www.linkedin.com/in/martinnolan0110",
    ],
    jobTitle: profile?.title || "Associate Gen AI Software Engineer",
    worksFor: {
      "@type": "Organization",
      name: "Sky UK",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Martin Nolan's Portfolio",
    url: profile?.website || "https://martinnolan.dev",
  };

  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>{profile?.seoTitle || "Martin Nolan - AI Engineer"}</title>
        <meta
          name="description"
          content={
            profile?.seoDescription ||
            "The portfolio of Martin Nolan, an AI Engineer at Sky UK specializing in generative AI and full-stack development."
          }
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="canonical"
          href={profile?.website || "https://martinnolan.dev"}
        />
        <meta
          property="og:title"
          content={profile?.seoTitle || "Martin Nolan - AI Engineer"}
        />
        <meta
          property="og:description"
          content={
            profile?.seoDescription ||
            "The portfolio of Martin Nolan, an AI Engineer at Sky UK specializing in generative AI and full-stack development."
          }
        />
        <meta
          property="og:url"
          content={profile?.website || "https://martinnolan.dev"}
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://martinnolan.dev/robot.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="Martin Nolan - AI Engineer Portfolio"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={profile?.seoTitle || "Martin Nolan - AI Engineer"}
        />
        <meta
          name="twitter:description"
          content={
            profile?.tagline ||
            "AI Engineer at Sky UK specializing in generative AI and full-stack development"
          }
        />
        <meta
          name="twitter:image"
          content="https://martinnolan.dev/robot.png"
        />
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
        <ProjectsSection
          featuredProjects={featuredProjects}
          personalProjects={personalProjects}
        />
        <ContactSection contactMethods={contactMethods} profile={profile} />
      </main>
      <Footer profile={profile} />
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        cvPdfUrl={profile?.cvPdf}
      />
      <AIChatWidget />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const [profile, featuredProjects, personalProjects, contactMethods] =
      await Promise.all([
        contentService.getProfile(),
        contentService.getFeaturedProjects(),
        contentService.getPersonalProjects(),
        contentService.getContactMethods(),
      ]);

    return {
      props: {
        profile,
        featuredProjects,
        personalProjects,
        contactMethods,
      },
      revalidate: 60, // Revalidate every minute in production
    };
  } catch (error) {
    console.error("Error fetching content from CMS:", error);

    // Return error page props instead of fallback content
    return {
      props: {
        error: true,
        errorMessage:
          error instanceof Error
            ? error.message
            : "Unable to load content from CMS",
      },
      revalidate: 10, // Retry more frequently when there's an error
    };
  }
};

export default Index;
