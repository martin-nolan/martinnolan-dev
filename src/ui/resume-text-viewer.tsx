import { GradientText } from '@/ui';

interface TextViewerProps {
  cvText: string;
}

export const TextViewer = ({ cvText }: TextViewerProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-muted-foreground">
      <h3 className="mb-2 text-lg font-semibold">
        <GradientText>Extracted Resume Text</GradientText>
      </h3>
      <pre className="max-w-2xl overflow-auto whitespace-pre-wrap rounded-lg border border-surface-border bg-surface/40 p-4 text-sm">
        {cvText}
      </pre>
    </div>
  );
};
