import { useState } from "react";
import type { ContactMethod } from "@/types";
import { Mail, Linkedin, Github, MessageCircle, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GlassCard } from "@/components/ui/glass-card";
import { GradientText } from "@/components/ui/gradient-text";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch("https://formspree.io/f/your-form-id", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json"
        }
      });

      if (response.ok) {
        toast({
          title: "Message sent successfully!",
          description: "Thank you for reaching out. I'll get back to you soon.",
        });
        e.currentTarget.reset();
      } else {
        throw new Error("Failed to send message");
      }
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


  const contactMethods: ContactMethod[] = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      description: "Direct communication",
      value: "martinnolan_1@live.co.uk",
      href: "mailto:martinnolan_1@live.co.uk",
      primary: true
    },
    {
      icon: <Linkedin className="h-6 w-6" />,
      title: "LinkedIn",
      description: "Professional network",
      value: "Connect on LinkedIn",
      href: "https://www.linkedin.com/in/martinnolan0110",
      primary: false
    },
    {
      icon: <Github className="h-6 w-6" />,
      title: "GitHub",
      description: "Code & projects",
      value: "View repositories",
      href: "https://github.com/martin-nolan",
      primary: false
    },
  ];

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Let's <GradientText>Connect</GradientText>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Whether you're looking to collaborate, discuss opportunities, or just chat about AI and technology, 
            I'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Methods */}
          <div className="space-y-6">
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4">Get in Touch</h3>
              <p className="text-muted-foreground">
                Choose your preferred way to reach out. I typically respond within 24 hours.
              </p>
            </div>

            <div className="space-y-4">
              {contactMethods.map((method) => (
                <a 
                  key={method.title}
                  href={method.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <GlassCard className={`border-surface-border hover:bg-surface-hover transition-all duration-200 ${method.primary ? 'ring-1 ring-primary/30' : ''}`}>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-lg ${method.primary ? 'bg-primary/10 text-primary' : 'bg-surface text-muted-foreground'} group-hover:scale-110 transition-transform duration-200`}>
                          {method.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {method.title}
                          </h4>
                          <p className="text-sm text-muted-foreground mb-1">
                            {method.description}
                          </p>
                          <p className={`text-sm ${method.primary ? 'text-primary font-medium' : 'text-foreground'}`}>
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

          {/* Contact Form */}
          <div className="space-y-6">
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4">Send a Message</h3>
              <p className="text-muted-foreground">
                Prefer to reach out directly? Use the form below and I'll get back to you soon.
              </p>
            </div>

            <GlassCard className="border-surface-border">
              <CardContent className="p-6">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Name
                      </label>
                      <Input 
                        id="name"
                        name="name"
                        placeholder="Your name"
                        className="bg-surface border-surface-border focus:border-primary"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email
                      </label>
                      <Input 
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        className="bg-surface border-surface-border focus:border-primary"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Subject
                    </label>
                    <Input 
                      id="subject"
                      name="subject"
                      placeholder="What would you like to discuss?"
                      className="bg-surface border-surface-border focus:border-primary"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <Textarea 
                      id="message"
                      name="message"
                      placeholder="Tell me more about your project, opportunity, or what you'd like to chat about..."
                      rows={5}
                      className="bg-surface border-surface-border focus:border-primary resize-none"
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90 text-white"
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