import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";

interface ImageCarouselProps {
  images: string[];
  alt: string;
  className?: string;
}

interface ImageModalProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  alt: string;
}

const ImageModal = ({ images, currentIndex, isOpen, onClose, alt }: ImageModalProps) => {
  const [activeIndex, setActiveIndex] = useState(currentIndex);

  if (!isOpen) return null;

  const nextImage = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-4xl h-[90vh] mx-4">
        <GlassCard className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-surface-border">
            <h2 className="text-2xl font-bold">
              {activeIndex + 1} / {images.length}
            </h2>
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
          <div className="flex-1 flex items-center justify-center p-6 relative">
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
              src={images[activeIndex]}
              alt={`${alt} - Image ${activeIndex + 1}`}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
          
          {/* Thumbnail Navigation */}
          {images.length > 1 && (
            <div className="p-4 border-t border-surface-border">
              <div className="flex gap-2 justify-center overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      index === activeIndex
                        ? "border-primary scale-105"
                        : "border-surface-border hover:border-accent"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </GlassCard>
      </div>
    </div>
  );
};

export const ImageCarousel = ({ images, alt, className }: ImageCarouselProps) => {
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
            src={images[0]}
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
      />
    </>
  );
};