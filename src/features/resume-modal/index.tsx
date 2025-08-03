import { X, Download } from "lucide-react";
import { Button, GlassCard } from "@/shared/ui";
import type { ResumeModalProps } from "@/shared/types";

const ResumeModal = ({ isOpen, onClose }: ResumeModalProps) => {
  if (!isOpen) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = './martin-nolan-cv.pdf';
    link.download = 'Martin_Nolan_CV_Aug_2025.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <GlassCard
        className="relative w-full max-w-4xl h-[90vh] mx-4 rounded-2xl overflow-hidden animate-scale-in"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-surface-border">
          <h2 className="text-2xl font-bold gradient-text">Resume</h2>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="border-primary text-primary hover:bg-primary hover:text-white"
            >
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
        </div>
        
        <div className="h-[calc(100%-88px)] p-6">
          <div className="w-full h-full bg-surface/20 rounded-lg flex items-center justify-center border border-surface-border">
            <iframe
              src="./martin-nolan-cv.pdf"
              className="w-full h-full rounded-lg"
              title="Martin Nolan Resume"
            />
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default ResumeModal;