import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { Button, GlassCard } from '@/ui';
import { ImageWithFallback } from '@/ui/image-with-fallback';

export interface ImageObj {
  src: string;
  description?: string;
}

export interface ImageModalProps {
  images: ImageObj[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  alt: string;
  projectTitle?: string;
}

export const ImageModal = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  alt,
  projectTitle,
}: ImageModalProps) => {
  const [activeIndex, setActiveIndex] = useState(currentIndex);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prevActiveElRef = useRef<Element | null>(null);

  // Keep modal index in sync with the opener
  useEffect(() => {
    if (isOpen) setActiveIndex(currentIndex);
  }, [isOpen, currentIndex]);

  // Lock body scroll + basic focus management
  useEffect(() => {
    if (!isOpen) return;
    prevActiveElRef.current = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    // Move focus to the modal container
    setTimeout(() => containerRef.current?.focus(), 0);
    return () => {
      document.body.style.overflow = prevOverflow;
      if (prevActiveElRef.current instanceof HTMLElement) {
        prevActiveElRef.current.focus();
      }
    };
  }, [isOpen]);

  // Keyboard: Esc to close, arrows to navigate
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (images.length > 1) {
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          setActiveIndex((p) => (p + 1) % images.length);
        }
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          setActiveIndex((p) => (p - 1 + images.length) % images.length);
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, images.length, onClose]);

  // Images are preloaded globally, no need for additional preloading here

  if (!isOpen || !images.length) return null;

  // Guard for SSR / environments without document
  const portalTarget = typeof document !== 'undefined' ? document.body : null;
  if (!portalTarget) return null;

  const nextImage = () => setActiveIndex((p) => (p + 1) % images.length);
  const prevImage = () => setActiveIndex((p) => (p - 1 + images.length) % images.length);
  const currentImage = images[activeIndex];

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={projectTitle ? `${projectTitle} – image viewer` : 'Image viewer'}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        role="button"
        tabIndex={0}
        aria-label="Close image modal"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') onClose();
        }}
      />

      {/* Modal container */}
      <div
        ref={containerRef}
        tabIndex={-1}
        className="relative mx-4 flex h-[90vh] w-full max-w-6xl items-center justify-center outline-none max-sm:mx-2 max-sm:h-[95vh]"
      >
        <GlassCard className="flex size-full flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-surface-border p-6 max-sm:p-4">
            <div className="min-w-0 flex-1">
              {projectTitle && (
                <h2 className="truncate text-2xl font-bold max-sm:text-xl">{projectTitle}</h2>
              )}
              <div className="mt-1 text-sm text-muted-foreground">
                {activeIndex + 1} / {images.length}
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="ml-4 text-muted-foreground hover:text-foreground max-sm:size-10"
              aria-label="Close"
            >
              <X className="size-6 max-sm:size-5" />
            </Button>
          </div>

          {/* Body */}
          <div className="relative flex flex-1 flex-col p-6 max-sm:p-4">
            {/* Desktop: 3-column grid layout */}
            <div className="hidden size-full grid-cols-[2.5rem_1fr_2.5rem] items-center gap-3 sm:grid">
              {/* Left rail */}
              {images.length > 1 ? (
                <div className="flex items-center justify-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={prevImage}
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="size-6" />
                  </Button>
                </div>
              ) : (
                <div />
              )}

              {/* Image + Description */}
              <div className="flex size-full flex-col items-center justify-center">
                <div className="relative flex size-full items-center justify-center overflow-hidden">
                  <ImageWithFallback
                    src={currentImage.src}
                    alt={`${alt} - Image ${activeIndex + 1}`}
                    width={900}
                    height={600}
                    className="max-h-[75vh] w-auto max-w-full rounded-lg object-contain"
                    timeoutMs={15000}
                    sizes="(min-width: 1024px) 75vw, 100vw"
                    fetchPriority="high"
                    loading="eager"
                    draggable={false}
                  />
                </div>
                {currentImage.description && (
                  <div className="mt-6 w-full max-w-xl rounded-lg border border-surface-border bg-black/60 px-6 py-3 text-center text-base text-muted-foreground shadow-lg backdrop-blur-md">
                    {currentImage.description}
                  </div>
                )}
              </div>

              {/* Right rail */}
              {images.length > 1 ? (
                <div className="flex items-center justify-center">
                  <Button variant="ghost" size="icon" onClick={nextImage} aria-label="Next image">
                    <ChevronRight className="size-6" />
                  </Button>
                </div>
              ) : (
                <div />
              )}
            </div>

            {/* Mobile: Overlay navigation with centered image */}
            <div className="relative flex size-full flex-col items-center justify-center sm:hidden">
              <div className="relative flex size-full items-center justify-center overflow-hidden">
                <ImageWithFallback
                  src={currentImage.src}
                  alt={`${alt} - Image ${activeIndex + 1}`}
                  width={900}
                  height={600}
                  className="max-h-[70vh] w-auto max-w-full rounded-lg object-contain"
                  timeoutMs={15000}
                  sizes="100vw"
                  fetchPriority="high"
                  loading="eager"
                  draggable={false}
                />

                {/* Mobile navigation overlays */}
                {images.length > 1 && (
                  <>
                    {/* Left navigation */}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={prevImage}
                      aria-label="Previous image"
                      className="absolute left-2 top-1/2 size-12 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                    >
                      <ChevronLeft className="size-8" />
                    </Button>

                    {/* Right navigation */}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={nextImage}
                      aria-label="Next image"
                      className="absolute right-2 top-1/2 size-12 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                    >
                      <ChevronRight className="size-8" />
                    </Button>
                  </>
                )}
              </div>

              {/* Mobile description */}
              {currentImage.description && (
                <div className="mt-4 w-full max-w-xl rounded-lg border border-surface-border bg-black/60 px-4 py-2 text-center text-sm text-muted-foreground shadow-lg backdrop-blur-md">
                  {currentImage.description}
                </div>
              )}
            </div>
          </div>
        </GlassCard>
      </div>
    </div>,
    portalTarget
  );
};

export default ImageModal;
