import { FileX } from 'lucide-react';

import { GradientText } from '@/ui';

export const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center text-muted-foreground">
      <FileX className="mb-4 size-12 text-muted-foreground" />
      <h3 className="mb-2 text-lg font-semibold">
        <GradientText>Resume not available</GradientText>
      </h3>
      <p className="mb-4 max-w-md text-center text-sm">
        Resume loading requires Strapi CMS configuration. Please contact the site owner.
      </p>
    </div>
  );
};
