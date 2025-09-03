import { useContactForm } from '@/hooks/useContactForm';
import { Button, CardContent, Input, Textarea, GlassCard } from '@/ui';

export const ContactForm = () => {
  const { formRef, isSubmitting, handleSubmit } = useContactForm();

  return (
    <GlassCard className="border-surface-border">
      <CardContent className="p-4 sm:p-6">
        <form ref={formRef} className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-2 block text-xs font-medium sm:text-sm">
                Name
              </label>
              <Input
                id="name"
                name="name"
                placeholder="Your name"
                className="min-h-[44px] border-surface-border bg-surface text-sm focus:border-primary sm:text-base"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-xs font-medium sm:text-sm">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                className="min-h-[44px] border-surface-border bg-surface text-sm focus:border-primary sm:text-base"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="subject" className="mb-2 block text-xs font-medium sm:text-sm">
              Subject
            </label>
            <Input
              id="subject"
              name="subject"
              placeholder="What would you like to discuss?"
              className="min-h-[44px] border-surface-border bg-surface text-sm focus:border-primary sm:text-base"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="mb-2 block text-xs font-medium sm:text-sm">
              Message
            </label>
            <Textarea
              id="message"
              name="message"
              placeholder="Tell me more about your project, opportunity, or what you'd like to chat about..."
              rows={4}
              className="min-h-[120px] resize-none border-surface-border bg-surface text-sm focus:border-primary sm:min-h-[140px] sm:text-base"
              required
            />
          </div>

          <Button
            type="submit"
            className="min-h-[44px] w-full bg-primary text-sm text-white hover:bg-primary/90 sm:text-base"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
        </form>
      </CardContent>
    </GlassCard>
  );
};
