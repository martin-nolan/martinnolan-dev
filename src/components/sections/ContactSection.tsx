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
    <section id="contact" className="px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center sm:mb-16">
          <h2 className="mb-4 text-2xl font-bold sm:mb-6 sm:text-3xl lg:text-4xl xl:text-5xl">
            Let's <GradientText>Connect</GradientText>
          </h2>
          <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg lg:text-xl">
            Whether you're looking to collaborate, discuss opportunities, or just chat about AI and
            technology, I'd love to hear from you.
          </p>
        </div>

        <div className="grid gap-8 sm:gap-12 lg:grid-cols-2">
          <div className="space-y-4 sm:space-y-6">
            <div className="mb-6 sm:mb-8">
              <h3 className="mb-3 text-lg font-semibold sm:mb-4 sm:text-xl lg:text-2xl">
                Get in Touch
              </h3>
              <p className="text-sm text-muted-foreground sm:text-base">
                Choose your preferred way to reach out. I typically respond within 24 hours.
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {contactMethodsToRender.map((method) => (
                <ContactMethodCard key={method.title} method={method} />
              ))}
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <div className="mb-6 sm:mb-8">
              <h3 className="mb-3 text-lg font-semibold sm:mb-4 sm:text-xl lg:text-2xl">
                Send a Message
              </h3>
              <p className="text-sm text-muted-foreground sm:text-base">
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
