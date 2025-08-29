import type { ProcessedContactMethod, ProcessedProfile } from '@/types';
import { GradientText, ContactMethodCard, ContactForm } from '@/ui';

interface ContactSectionProps {
  contactMethods?: ProcessedContactMethod[] | null;
  profile?: ProcessedProfile | null;
}

const ContactSection = ({ contactMethods: externalContactMethods }: ContactSectionProps) => {
  // Use only CMS contact methods - no hardcoded fallbacks
  const contactMethodsToRender = externalContactMethods || [];

  return (
    <section id="contact" className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold sm:text-5xl">
            Let's <GradientText>Connect</GradientText>
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
            Whether you're looking to collaborate, discuss opportunities, or just chat about AI and
            technology, I'd love to hear from you.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="mb-8">
              <h3 className="mb-4 text-2xl font-semibold">Get in Touch</h3>
              <p className="text-muted-foreground">
                Choose your preferred way to reach out. I typically respond within 24 hours.
              </p>
            </div>

            <div className="space-y-4">
              {contactMethodsToRender.map((method) => (
                <ContactMethodCard key={method.title} method={method} />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="mb-8">
              <h3 className="mb-4 text-2xl font-semibold">Send a Message</h3>
              <p className="text-muted-foreground">
                Prefer to reach out directly? Use the form below and I'll get back to you soon.
              </p>
            </div>

            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
