import { useState } from 'react';

import ImageModal from '@/ui/image-modal';
import type { ImageObj } from '@/ui/image-modal';
import { ImageWithFallback } from '@/ui/image-with-fallback';

export interface ImageCarouselProps {
  images: ImageObj[];
  alt: string;
  projectTitle?: string;
  className?: string;
}

export const ImageCarousel = ({ images, alt, projectTitle, className }: ImageCarouselProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20 ${
          className ?? ''
        }`}
      >
        <span className="text-muted-foreground">No images available</span>
      </div>
    );
  }

  const handleImageClick = (index: number) => {
    setSelectedIndex(index);
    setIsModalOpen(true);
  };

  const handleImageKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleImageClick(index);
    }
  };

  return (
    <>
      <div className={`relative overflow-hidden rounded-lg ${className ?? ''}`}>
        <div
          className="group aspect-video w-full cursor-pointer"
          onClick={() => handleImageClick(0)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => handleImageKeyDown(e, 0)}
          aria-label={alt}
        >
          <ImageWithFallback
            src={images[0].src}
            alt={alt}
            width={600}
            height={400}
            className="size-full object-cover object-center transition-transform duration-300 group-hover:scale-105 max-sm:object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority
            fetchPriority="high"
            timeoutMs={12000}
            loading="eager"
          />

          {images.length > 1 && (
            <div className="absolute right-2 top-2 rounded bg-black/70 px-2 py-1 text-xs text-white max-sm:right-3 max-sm:top-3 max-sm:px-3 max-sm:py-2 max-sm:text-sm">
              +{images.length - 1} more
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <ImageModal
          images={images}
          currentIndex={selectedIndex}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          alt={alt}
          projectTitle={projectTitle}
        />
      )}
    </>
  );
};

export default ImageCarousel;
