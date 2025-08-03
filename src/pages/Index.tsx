import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import { martinInfo } from "../lib/martinInfo";
import WorkSection from "@/components/WorkSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ResumeModal from "@/components/ResumeModal";
import { AIChatWidget } from "@/components/ai-chat-widget";
import { useState } from "react";

const Index = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background">
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
