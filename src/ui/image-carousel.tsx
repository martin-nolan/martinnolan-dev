'use client';

import { useState, lazy, Suspense } from 'react';

import type { ImageObj } from '@/ui/image-modal';
import { ImageWithFallback } from '@/ui/image-with-fallback';

// Dynamically import ImageModal to reduce initial bundle size
const ImageModal = lazy(() =>
  import('@/ui/image-modal').then((mod) => ({ default: mod.ImageModal }))
);

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
      <div className={`relative overflow-hidden ${className ?? ''}`}>
        <div
          className="group size-full cursor-pointer"
          onClick={() => handleImageClick(0)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => handleImageKeyDown(e, 0)}
          aria-label={alt}
        >
          <ImageWithFallback
            src={images[0].src}
            alt={alt}
            width={800}
            height={450}
            className="size-full object-contain object-center transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
            fetchPriority="high"
            timeoutMs={8000}
          />

          {images.length > 1 && (
            <div className="absolute right-4 top-4 rounded bg-black/50 px-2 py-1 text-sm text-white">
              +{images.length - 1} more
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <Suspense fallback={null}>
          <ImageModal
            images={images}
            currentIndex={selectedIndex}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            alt={alt}
            projectTitle={projectTitle}
          />
        </Suspense>
      )}
    </>
  );
};

export default ImageCarousel;
