import emailjs from '@emailjs/browser';
import { useState, useRef } from 'react';

import { clientEnv, envUtils } from '@/lib/env';
import { useToast } from '@/ui/use-toast';

export const useContactForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);

    try {
      // Check if EmailJS is configured
      if (!envUtils.isEmailJSConfigured()) {
        throw new Error('EmailJS is not configured. Please check your environment variables.');
      }

      await emailjs.sendForm(
        clientEnv.emailjs!.serviceId,
        clientEnv.emailjs!.templateId,
        formRef.current,
        clientEnv.emailjs!.publicKey
      );

      toast({
        title: 'Message sent successfully!',
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      formRef.current.reset();
    } catch (_error) {
      toast({
        title: 'Failed to send message',
        description: 'Please try again or reach out directly via email.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formRef,
    isSubmitting,
    handleSubmit,
  };
};
