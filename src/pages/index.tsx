import Head from "next/head";
import Navigation from "@/widgets/navigation";
import HeroSection from "@/widgets/page-sections/HeroSection";
import AboutSection from "@/widgets/page-sections/AboutSection";
import { martinInfo } from "@/entities/martin/martinInfo";
import WorkSection from "@/widgets/page-sections/WorkSection";
import ProjectsSection from "@/widgets/page-sections/ProjectsSection";
import ContactSection from "@/widgets/page-sections/ContactSection";
import Footer from "@/widgets/footer";
import ResumeModal from "@/features/resume-modal";
import dynamic from "next/dynamic";
import { useState } from "react";

const AIChatWidget = dynamic(
  () => import("@/features/ai-chat").then((mod) => mod.AIChatWidget),
  { ssr: false }
);

const Index = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Martin Nolan",
    url: "https://martinnolan.dev",
    sameAs: [
      "https://github.com/martin-nolan",
      "https://www.linkedin.com/in/martinnolan0110",
    ],
    jobTitle: "Associate Gen AI Software Engineer",
    worksFor: {
      "@type": "Organization",
      name: "Sky UK",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Martin Nolan's Portfolio",
    url: "https://martinnolan.dev",
  };

  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>Martin Nolan - AI Engineer</title>
        <meta
          name="description"
          content="The portfolio of Martin Nolan, an AI Engineer at Sky UK specializing in generative AI and full-stack development."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://martinnolan.dev" />
        <meta property="og:title" content="Martin Nolan - AI Engineer" />
        <meta
          property="og:description"
          content="The portfolio of Martin Nolan, an AI Engineer at Sky UK specializing in generative AI and full-stack development."
        />
        <meta property="og:url" content="https://martinnolan.dev" />
        <meta property="og:type" content="website" />
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
        <HeroSection />
        <AboutSection user={{
          name: "Martin Nolan",
          bio: martinInfo.bio,
          email: martinInfo.contact.email,
          website: martinInfo.contact.website,
          skills: martinInfo.skills
        }} />
        <WorkSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
      <AIChatWidget />
    </div>
  );
};

export default Index;
