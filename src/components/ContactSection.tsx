import { Mail, Linkedin, Github, MessageCircle, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ContactSection = () => {
  const contactMethods = [
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
      href: "#",
      primary: false
    },
    {
      icon: <Github className="h-6 w-6" />,
      title: "GitHub",
      description: "Code & projects",
      value: "View repositories",
      href: "#",
      primary: false
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Schedule Call",
      description: "15-30 min chat",
      value: "Book a time",
      href: "#",
      primary: false
    }
  ];

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Let's <span className="gradient-text">Connect</span>
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
                  className="block group"
                >
                  <Card className={`glass-card border-surface-border hover:bg-surface-hover transition-all duration-200 ${method.primary ? 'ring-1 ring-primary/30' : ''}`}>
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
                  </Card>
                </a>
              ))}
            </div>

            {/* Quick CTA */}
            <Card className="glass-card border-surface-border bg-gradient-to-r from-primary/5 to-accent/5">
              <CardContent className="p-6 text-center">
                <MessageCircle className="h-8 w-8 mx-auto mb-3 text-primary" />
                <h4 className="font-semibold mb-2">Available for Opportunities</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Open to discussing AI engineering roles, consulting projects, and collaborative ventures.
                </p>
                <Button 
                  className="bg-primary hover:bg-primary/90 text-white"
                  onClick={() => window.location.href = 'mailto:martinnolan_1@live.co.uk?subject=Opportunity Discussion'}
                >
                  Start Conversation
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="space-y-6">
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4">Send a Message</h3>
              <p className="text-muted-foreground">
                Prefer to reach out directly? Use the form below and I'll get back to you soon.
              </p>
            </div>

            <Card className="glass-card border-surface-border">
              <CardContent className="p-6">
                <form className="space-y-6" action="https://formspree.io/f/your-form-id" method="POST">
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
                  >
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;