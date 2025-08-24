import { Github, Linkedin, Mail, Phone } from 'lucide-react';
import React from 'react';

import { clientEnv } from './env';

// Map icon string names to actual Lucide React icons
const ICON_MAP = {
  email: Mail,
  mail: Mail,
  linkedin: Linkedin,
  github: Github,
  phone: Phone,
  mobile: Phone,
} as const;

export const getIconComponent = (iconName: string | null | undefined): React.ReactNode => {
  // Handle null, undefined, or empty strings
  if (!iconName) {
    if (clientEnv.isDevelopment) {
      console.warn('Icon name is null/undefined, falling back to Mail icon');
    }
    return <Mail className="size-5" />;
  }

  // Convert to lowercase for case-insensitive matching
  const normalizedName = iconName.toLowerCase();
  const IconComponent = ICON_MAP[normalizedName as keyof typeof ICON_MAP];

  if (!IconComponent) {
    if (clientEnv.isDevelopment) {
      console.warn(`Icon "${iconName}" not found in icon map, falling back to Mail icon`);
    }
    return <Mail className="size-5" />;
  }

  return <IconComponent className="size-5" />;
};

export type IconName = keyof typeof ICON_MAP;
