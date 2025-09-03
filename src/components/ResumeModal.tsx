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
    'fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br ' +
    (isDark
      ? 'from-background via-background/80 to-primary/10'
      : 'from-white via-gray-100 to-primary/10');
  const cardClass =
    'relative mx-4 h-[90vh] w-full max-w-4xl animate-scale-in overflow-hidden rounded-2xl bg-white/80 dark:bg-background/80 max-sm:mx-2 max-sm:h-[95vh] max-sm:rounded-lg';

  return (
    <div
      className={containerClass}
      style={{ zIndex: 9999 }}
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        // Close modal if clicking on backdrop
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      tabIndex={0}
      onKeyDown={handleOverlayKeyDown}
      aria-label="Close resume modal"
    >
      <GlassCard className={cardClass} onClick={(e) => e.stopPropagation()}>
        <div className="relative z-10 flex items-center justify-between border-b border-surface-border p-6 max-sm:p-4">
          <h2 className="gradient-text text-2xl font-bold max-sm:text-xl">Resume</h2>
          <div className="flex items-center gap-3 sm:gap-4">
            {cvPdfUrl && (
              <a
                href={cvPdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-primary px-3 py-2 text-xs font-medium text-primary transition-colors hover:bg-primary hover:text-white sm:px-4 sm:text-sm"
              >
                <Download className="mr-1 size-3 sm:mr-2 sm:size-4" />
                <span className="max-sm:hidden">Download PDF</span>
                <span className="sm:hidden">PDF</span>
              </a>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="relative z-10 flex min-h-[44px] min-w-[44px] items-center justify-center p-2 text-muted-foreground hover:text-foreground"
              style={{ zIndex: 10 }}
            >
              <X className="size-5 sm:size-6" />
            </Button>
          </div>
        </div>

        <div className="h-[calc(100%-88px)] p-6 max-sm:h-[calc(100%-76px)] max-sm:p-3">
          <div className="relative flex size-full items-center justify-center rounded-lg border border-surface-border bg-surface/20">
            {pdfError ? (
              <ErrorDisplay errorType={errorType} cvPdfUrl={cvPdfUrl} onRetry={handleRetry} />
            ) : pdfUrl ? (
              <>
                <PdfViewer pdfUrl={pdfUrl} onLoad={handlePdfLoad} onError={handlePdfError} />
                {isLoading && <LoadingIndicator />}
              </>
            ) : cvText ? (
              <TextViewer cvText={cvText} />
            ) : (
              <EmptyState />
            )}
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default ResumeModal;
