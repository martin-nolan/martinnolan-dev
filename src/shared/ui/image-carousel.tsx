import { useState } from "react";
import ReactDOM from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button, GlassCard } from "@/shared/ui";
import Image from "next/image";

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

const ImageModal = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  alt,
  projectTitle,
}: ImageModalProps) => {
  const handleOverlayKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " " || e.key === "Escape") {
      onClose();
    }
  };
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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        role="button"
        tabIndex={0}
        onKeyDown={handleOverlayKeyDown}
        aria-label="Close image modal"
      />
      <div className="relative mx-4 flex h-[90vh] w-full max-w-6xl items-center justify-center">
        <GlassCard className="flex size-full flex-col">
          <div className="flex items-center justify-between border-b border-surface-border p-6">
            <div>
              <h2 className="text-2xl font-bold">{projectTitle}</h2>
              <div className="mt-1 text-sm text-muted-foreground">
                {activeIndex + 1} / {images.length}
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="size-6" />
            </Button>
          </div>
          <div className="relative flex flex-1 flex-col items-center justify-center p-6">
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={prevImage}
                  className="absolute left-1 top-1/2 z-10 -translate-y-1/2"
                >
                  <ChevronLeft className="size-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={nextImage}
                  className="absolute right-1 top-1/2 z-10 -translate-y-1/2"
                >
                  <ChevronRight className="size-6" />
                </Button>
              </>
            )}
            <div className="relative flex w-full items-center justify-center">
              <Image
                src={currentImage.src}
                alt={`${alt} - Image ${activeIndex + 1}`}
                width={800}
                height={600}
                className="size-auto max-h-[75vh] max-w-full rounded-lg object-contain"
                style={{ margin: "0 auto", display: "block" }}
              />
            </div>
            {currentImage.description && (
              <div className="mt-6 w-full max-w-xl rounded-lg border border-surface-border bg-black/60 px-6 py-3 text-center text-base text-muted-foreground shadow-lg backdrop-blur-md">
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

export const ImageCarousel = ({
  images,
  alt,
  projectTitle,
  className,
}: ImageCarouselProps) => {
  const handleImageKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    index: number
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      handleImageClick(index);
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!images.length) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20 ${className}`}
      >
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
          className="group size-full cursor-pointer"
          onClick={() => handleImageClick(0)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => handleImageKeyDown(e, 0)}
          aria-label={alt}
        >
          <Image
            src={images[0].src}
            alt={alt}
            width={500}
            height={300}
            className="size-full object-contain object-center transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          {images.length > 1 && (
            <div className="absolute right-4 top-4 rounded bg-black/50 px-2 py-1 text-sm text-white">
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
