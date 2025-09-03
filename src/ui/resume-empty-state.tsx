import { FileX } from 'lucide-react';

import { GradientText } from '@/ui';

export const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center text-muted-foreground max-sm:p-4">
      <FileX className="mb-4 size-12 text-muted-foreground max-sm:mb-3 max-sm:size-10" />
      <h3 className="mb-2 text-lg font-semibold max-sm:mb-3 max-sm:text-base">
        <GradientText>Resume not available</GradientText>
      </h3>
      <p className="mb-4 max-w-md text-center text-sm max-sm:max-w-full max-sm:px-2 max-sm:text-xs">
        Resume loading requires Strapi CMS configuration. Please contact the site owner.
      </p>
    </div>
  );
};
