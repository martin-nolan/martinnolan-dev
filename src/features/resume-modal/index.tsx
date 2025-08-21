/* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex */
import { X, Download, FileX, RefreshCw } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { Button, GlassCard, GradientText } from '@/shared/ui';
import { useTheme } from '@/shared/ui/theme-context';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  cvPdfUrl?: string;
  cvText?: string | null;
}

const ResumeModal = ({ isOpen, onClose, cvPdfUrl, cvText }: ResumeModalProps) => {
  const { isDark } = useTheme();
  // ...existing code...

  // Duplicate interface removed; already declared above.

  const [pdfError, setPdfError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorType, setErrorType] = useState<'load' | 'config' | 'network'>('load');

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  // Handle PDF URL configuration and error states
  const pdfUrl: string | null = cvPdfUrl
    ? (() => {
        const strapiApiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;

        if (!strapiApiUrl) {
          return null;
        }

        const strapiBaseUrl = strapiApiUrl.replace('/api', '');

        if (
          (() => {
            try {
              const cvUrl = new URL(cvPdfUrl);
              const strapiUrl = new URL(strapiBaseUrl);
              return (
                cvUrl.hostname === strapiUrl.hostname &&
                cvUrl.protocol === strapiUrl.protocol &&
                cvUrl.port === strapiUrl.port
              );
            } catch {
              return false;
            }
          })() &&
          process.env.NODE_ENV === 'development'
        ) {
          return cvPdfUrl;
        } else {
          return `/api/pdf-proxy?url=${encodeURIComponent(cvPdfUrl)}`;
        }
      })()
    : null;

  const configError = cvPdfUrl && !process.env.NEXT_PUBLIC_STRAPI_API_URL;

  // Set loading state when PDF URL changes
  useEffect(() => {
    if (pdfUrl && isOpen) {
      setIsLoading(true);
      setPdfError(false);
    }
  }, [pdfUrl, isOpen]);

  // Set error state when there's a config issue
  useEffect(() => {
    if (configError) {
      setPdfError(true);
      setErrorType('config');
    }
  }, [configError]);

  const handlePdfLoad = () => {
    setIsLoading(false);
    setPdfError(false);
  };

  const handlePdfError = () => {
    setIsLoading(false);
    setPdfError(true);
    setErrorType('load');
  };

  const handleRetry = () => {
    setIsLoading(true);
    setPdfError(false);
    // Force iframe reload by updating src
    const iframe = document.querySelector('iframe[title="Martin Nolan CV"]') as HTMLIFrameElement;
    if (iframe && pdfUrl) {
      iframe.src = pdfUrl;
    }
  };

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
                <iframe
                  src={pdfUrl}
                  className="size-full rounded-lg"
                  title="Martin Nolan CV"
                  onError={handlePdfError}
                  onLoad={handlePdfLoad}
                />
                {/* Loading indicator */}
                {isLoading && (
                  <div className="absolute inset-4 flex flex-col items-center justify-center rounded-lg border border-surface-border bg-surface/95 backdrop-blur-sm">
                    <div className="flex flex-col items-center gap-4 text-center">
                      <div className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                      <p className="text-sm text-muted-foreground">Loading PDF...</p>
                    </div>
                  </div>
                )}
              </>
            ) : cvText ? (
              <div className="flex flex-col items-center justify-center p-6 text-muted-foreground">
                <h3 className="mb-2 text-lg font-semibold">
                  <GradientText>Extracted Resume Text</GradientText>
                </h3>
                <pre className="max-w-2xl overflow-auto whitespace-pre-wrap rounded-lg border border-surface-border bg-surface/40 p-4 text-sm">
                  {cvText}
                </pre>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-muted-foreground">
                <FileX className="mb-4 size-12 text-muted-foreground" />
                <h3 className="mb-2 text-lg font-semibold">
                  <GradientText>Resume not available</GradientText>
                </h3>
                <p className="mb-4 max-w-md text-center text-sm">
                  Resume loading requires Strapi CMS configuration. Please contact the site owner.
                </p>
              </div>
            )}

            {pdfError && (
              <div className="absolute inset-4 flex flex-col items-center justify-center rounded-lg border border-surface-border bg-surface/95 backdrop-blur-sm">
                {/* Error content matching 404 page styling */}
                <div className="flex flex-col items-center gap-4 p-6 text-center">
                  <Image
                    src="/robot.png"
                    alt="Error robot"
                    width={60}
                    height={60}
                    className="opacity-80 drop-shadow-lg"
                  />

                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">
                      <GradientText>
                        {errorType === 'config'
                          ? 'Configuration Error'
                          : errorType === 'network'
                            ? 'Network Error'
                            : 'PDF Unavailable'}
                      </GradientText>
                    </h3>

                    <p className="max-w-xs text-sm text-muted-foreground">
                      {errorType === 'config'
                        ? 'Resume service is not properly configured. Please contact the site administrator.'
                        : errorType === 'network'
                          ? 'Unable to connect to the resume service. Please check your connection and try again.'
                          : 'The PDF could not be displayed in your browser, but you can still download it.'}
                    </p>
                  </div>

                  <div className="mt-2 flex gap-2">
                    {errorType !== 'config' && (
                      <Button variant="outline" size="sm" onClick={handleRetry} className="text-xs">
                        <RefreshCw className="mr-2 size-3" />
                        Try Again
                      </Button>
                    )}

                    {cvPdfUrl && (
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => window.open(cvPdfUrl, '_blank')}
                        className="text-xs"
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
            )}
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default ResumeModal;
