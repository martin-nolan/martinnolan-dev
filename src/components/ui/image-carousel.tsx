import { useState } from "react";
import ReactDOM from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";

interface ImageObj {
  src: string;
  description?: string;
}

interface ImageCarouselProps {
  images: ImageObj[];
  alt: string;
  projectTitle?: string;
  className?: string;
}

interface ImageModalProps {
  images: ImageObj[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  alt: string;
  projectTitle?: string;
}

const ImageModal = ({ images, currentIndex, isOpen, onClose, alt, projectTitle }: ImageModalProps) => {
  const [activeIndex, setActiveIndex] = useState(currentIndex);

  if (!isOpen) return null;

  const nextImage = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const currentImage = images[activeIndex];

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative w-full max-w-3xl h-[80vh] mx-4 flex items-center justify-center">
        <GlassCard className="w-full h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-surface-border">
            <div>
              <h2 className="text-2xl font-bold">{projectTitle}</h2>
              <div className="text-sm text-muted-foreground mt-1">{activeIndex + 1} / {images.length}</div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          {/* Image Container */}
          <div className="flex-1 flex flex-col items-center justify-center p-6 relative">
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}
            <img
              src={currentImage.src}
              alt={`${alt} - Image ${activeIndex + 1}`}
              className="w-auto h-auto max-w-[90%] max-h-[60vh] object-contain rounded-lg"
              style={{margin: '0 auto', display: 'block'}}
            />
            {currentImage.description && (
              <div className="mt-4 text-base text-muted-foreground text-center max-w-xl">
                {currentImage.description}
              </div>
            )}
          </div>
        </GlassCard>
      </div>
    </div>,
    document.body
  );
};

export const ImageCarousel = ({ images, alt, projectTitle, className }: ImageCarouselProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!images.length) {
    return (
      <div className={`bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center ${className}`}>
        <span className="text-muted-foreground">No images available</span>
      </div>
    );
  }

  const handleImageClick = (index: number) => {
    setSelectedIndex(index);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className={`relative overflow-hidden ${className}`}>
        <div
          className="w-full h-full cursor-pointer group"
          onClick={() => handleImageClick(0)}
        >
          <img
            src={images[0].src}
            alt={alt}
            className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          {images.length > 1 && (
            <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
              +{images.length - 1} more
            </div>
          )}
        </div>
      </div>
      
      <ImageModal
        images={images}
        currentIndex={selectedIndex}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        alt={alt}
        projectTitle={projectTitle}
      />
    </>
  );
};