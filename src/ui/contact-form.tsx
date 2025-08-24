import { useContactForm } from '@/hooks/useContactForm';
import { Button, CardContent, Input, Textarea, GlassCard } from '@/ui';

export const ContactForm = () => {
  const { formRef, isSubmitting, handleSubmit } = useContactForm();

  return (
    <GlassCard className="border-surface-border">
      <CardContent className="p-6">
        <form ref={formRef} className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium">
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
              <label htmlFor="email" className="mb-2 block text-sm font-medium">
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
            <label htmlFor="subject" className="mb-2 block text-sm font-medium">
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
            <label htmlFor="message" className="mb-2 block text-sm font-medium">
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
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
        </form>
      </CardContent>
    </GlassCard>
  );
};
