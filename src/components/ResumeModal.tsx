/* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex */
import { X, Download } from 'lucide-react';
import { useEffect } from 'react';

import { usePdfState } from '@/hooks/usePdfState';
import { ResumeModalProps } from '@/types';
import {
  Button,
  GlassCard,
  PdfViewer,
  LoadingIndicator,
  ErrorDisplay,
  TextViewer,
  EmptyState,
} from '@/ui';
import { useTheme } from '@/ui/theme-context';

const ResumeModal = ({ isOpen, onClose, cvPdfUrl, cvText }: ResumeModalProps) => {
  const { isDark } = useTheme();
  const { pdfUrl, pdfError, isLoading, errorType, handlePdfLoad, handlePdfError, handleRetry } =
    usePdfState({
      cvPdfUrl,
      isOpen,
    });

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onClose();
    }
  };

  // 404-style gradient background and GlassCard background
  const containerClass =
    'fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br ' +
    (isDark
      ? 'from-background via-background/80 to-primary/10'
      : 'from-white via-gray-100 to-primary/10');
  const cardClass =
    'relative mx-4 h-[90vh] w-full max-w-4xl animate-scale-in overflow-hidden rounded-2xl bg-white/80 dark:bg-background/80';

  return (
    <div
      className={containerClass}
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      tabIndex={0}
      onKeyDown={handleOverlayKeyDown}
      aria-label="Close resume modal"
    >
      <GlassCard className={cardClass} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-surface-border p-6">
          <h2 className="gradient-text text-2xl font-bold">Resume</h2>
          <div className="flex items-center gap-4">
            {cvPdfUrl && (
              <a
                href={cvPdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-md border border-primary px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-white"
              >
                <Download className="mr-2 size-4" />
                Download PDF
              </a>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="size-6" />
            </Button>
          </div>
        </div>

        <div className="h-[calc(100%-88px)] p-6">
          <div className="relative flex size-full items-center justify-center rounded-lg border border-surface-border bg-surface/20">
            {pdfUrl ? (
              <>
                <PdfViewer pdfUrl={pdfUrl} onLoad={handlePdfLoad} onError={handlePdfError} />
                {isLoading && <LoadingIndicator />}
              </>
            ) : cvText ? (
              <TextViewer cvText={cvText} />
            ) : (
              <EmptyState />
            )}

            {pdfError && (
              <ErrorDisplay errorType={errorType} cvPdfUrl={cvPdfUrl} onRetry={handleRetry} />
            )}
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default ResumeModal;
