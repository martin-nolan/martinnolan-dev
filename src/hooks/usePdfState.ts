import { useState, useEffect } from 'react';

import {
  constructPdfUrl,
  hasConfigError,
  reloadPdfIframe,
  type PDFErrorType,
} from '@/lib/api-utils';

interface UsePdfStateProps {
  cvPdfUrl?: string | null;
  isOpen: boolean;
}

export const usePdfState = ({ cvPdfUrl, isOpen }: UsePdfStateProps) => {
  const [pdfError, setPdfError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorType, setErrorType] = useState<PDFErrorType>('load');

  const pdfUrl = constructPdfUrl(cvPdfUrl);
  const configError = hasConfigError(cvPdfUrl);

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
    if (pdfUrl) {
      reloadPdfIframe(pdfUrl);
    }
  };

  return {
    pdfUrl,
    pdfError,
    isLoading,
    errorType,
    configError,
    handlePdfLoad,
    handlePdfError,
    handleRetry,
  };
};
