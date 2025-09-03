import { RefreshCw, Download } from 'lucide-react';
import Image from 'next/image';

import type { PDFErrorType } from '@/lib/api-utils';
import { Button, GradientText } from '@/ui';

interface ErrorDisplayProps {
  errorType: PDFErrorType;
  cvPdfUrl?: string | null;
  onRetry: () => void;
}

export const ErrorDisplay = ({ errorType, cvPdfUrl, onRetry }: ErrorDisplayProps) => {
  const getErrorContent = () => {
    switch (errorType) {
      case 'config':
        return {
          title: 'Configuration Error',
          message:
            'Resume service is not properly configured. Please contact the site administrator.',
        };
      case 'network':
        return {
          title: 'Network Error',
          message:
            'Unable to connect to the resume service. Please check your connection and try again.',
        };
      default:
        return {
          title: 'PDF Unavailable',
          message: 'The PDF could not be displayed in your browser, but you can still download it.',
        };
    }
  };

  const { title, message } = getErrorContent();

  return (
    <div className="absolute inset-4 flex flex-col items-center justify-center rounded-lg border border-surface-border bg-surface/95 backdrop-blur-sm max-sm:inset-2">
      {/* Error content matching 404 page styling */}
      <div className="flex flex-col items-center gap-4 p-6 text-center max-sm:gap-3 max-sm:p-4">
        <Image
          src="/robot.png"
          alt="Error robot"
          width={60}
          height={60}
          className="opacity-80 drop-shadow-lg max-sm:size-12"
        />

        <div className="space-y-2">
          <h3 className="text-xl font-bold max-sm:text-lg">
            <GradientText>{title}</GradientText>
          </h3>

          <p className="max-w-xs text-sm text-muted-foreground max-sm:max-w-full max-sm:text-xs">
            {message}
          </p>
        </div>

        <div className="mt-2 flex gap-2 max-sm:w-full max-sm:flex-col max-sm:gap-2">
          {errorType !== 'config' && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRetry}
              className="text-xs max-sm:min-h-[44px] max-sm:w-full"
            >
              <RefreshCw className="mr-2 size-3" />
              Try Again
            </Button>
          )}

          {cvPdfUrl && (
            <Button
              variant="default"
              size="sm"
              onClick={() => window.open(cvPdfUrl, '_blank')}
              className="text-xs max-sm:min-h-[44px] max-sm:w-full"
            >
              <Download className="mr-2 size-3" />
              Download PDF
            </Button>
          )}
        </div>
      </div>

      {/* Subtle glow effect like 404 page */}
      <div className="pointer-events-none absolute inset-0 z-[-1] flex items-center justify-center">
        <div className="size-40 rounded-full bg-primary/5 opacity-60 blur-2xl dark:bg-primary/10" />
      </div>
    </div>
  );
};
