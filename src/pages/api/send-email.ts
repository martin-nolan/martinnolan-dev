import type { NextApiRequest, NextApiResponse } from 'next';

import { serverEnv } from '@/lib/env';

// This is a temporary solution. The emailjs package is not designed to be used
// on the server side with a public key. A better solution would be to use the
// EmailJS REST API with a private key.
// For now, we are moving the service ID and template ID to the server side
// to avoid exposing them on the client.

// A simple in-memory representation of the EmailJS API
const sendEmail = async (serviceId: string, templateId: string, templateParams: Record<string, unknown>, publicKey: string) => {
  const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: templateParams,
    }),
  });
  return response;
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { serviceId, templateId, publicKey } = serverEnv.emailjs;

  if (!serviceId || !templateId || !publicKey) {
    return res.status(500).json({ message: 'EmailJS is not configured' });
  }

  try {
    const response = await sendEmail(
      serviceId,
      templateId,
      req.body,
      publicKey
    );

    if (response.status === 200) {
      res.status(200).json({ message: 'Message sent successfully' });
    } else {
      const text = await response.text();
      res.status(response.status).json({ message: 'Failed to send message', error: text });
    }
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send message' });
  }
}
