interface PdfViewerProps {
  pdfUrl: string;
  onLoad: () => void;
  onError: () => void;
}

export const PdfViewer = ({ pdfUrl, onLoad, onError }: PdfViewerProps) => {
  return (
    <iframe
      src={pdfUrl}
      className="size-full rounded-lg max-sm:rounded-md"
      title="Martin Nolan CV"
      onError={onError}
      onLoad={onLoad}
      style={{ minHeight: '300px' }}
    />
  );
};
