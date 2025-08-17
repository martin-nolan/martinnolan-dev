/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import type { ContactMethod } from "@/shared/types";
import {
  Button,
  CardContent,
  Input,
  Textarea,
  GlassCard,
  GradientText,
} from "@/shared/ui";
import { useToast } from "@/shared/ui/use-toast";

interface ContactSectionProps {
  contactMethods?: ContactMethod[] | null;
  profile?: {
    email?: string;
    [key: string]: any;
  } | null;
}

const ContactSection = ({
  contactMethods: externalContactMethods,
}: ContactSectionProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      formRef.current.reset();
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: "Please try again or reach out directly via email.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Use only CMS contact methods - no hardcoded fallbacks
  const contactMethodsToRender = externalContactMethods || [];

  return (
    <section id="contact" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold sm:text-5xl">
            Let's <GradientText>Connect</GradientText>
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
            Whether you're looking to collaborate, discuss opportunities, or
            just chat about AI and technology, I'd love to hear from you.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="mb-8">
              <h3 className="mb-4 text-2xl font-semibold">Get in Touch</h3>
              <p className="text-muted-foreground">
                Choose your preferred way to reach out. I typically respond
                within 24 hours.
              </p>
            </div>

            <div className="space-y-4">
              {contactMethodsToRender.map((method) => (
                <a
                  key={method.title}
                  href={method.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <GlassCard
                    className={`border-surface-border transition-all duration-200 hover:bg-surface-hover ${
                      method.primary ? "ring-1 ring-primary/30" : ""
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`rounded-lg p-3 ${
                            method.primary
                              ? "bg-primary/10 text-primary"
                              : "bg-surface text-muted-foreground"
                          } transition-transform duration-200 group-hover:scale-110`}
                        >
                          {method.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground transition-colors group-hover:text-primary">
                            {method.title}
                          </h4>
                          <p className="mb-1 text-sm text-muted-foreground">
                            {method.description}
                          </p>
                          <p
                            className={`text-sm ${
                              method.primary
                                ? "font-medium text-primary"
                                : "text-foreground"
                            }`}
                          >
                            {method.value}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </GlassCard>
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="mb-8">
              <h3 className="mb-4 text-2xl font-semibold">Send a Message</h3>
              <p className="text-muted-foreground">
                Prefer to reach out directly? Use the form below and I'll get
                back to you soon.
              </p>
            </div>

            <GlassCard className="border-surface-border">
              <CardContent className="p-6">
                <form
                  ref={formRef}
                  className="space-y-6"
                  onSubmit={handleSubmit}
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-medium"
                      >
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your name"
                        className="border-surface-border bg-surface focus:border-primary"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium"
                      >
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        className="border-surface-border bg-surface focus:border-primary"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="mb-2 block text-sm font-medium"
                    >
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="What would you like to discuss?"
                      className="border-surface-border bg-surface focus:border-primary"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm font-medium"
                    >
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell me more about your project, opportunity, or what you'd like to chat about..."
                      rows={5}
                      className="resize-none border-surface-border bg-surface focus:border-primary"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary text-white hover:bg-primary/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
