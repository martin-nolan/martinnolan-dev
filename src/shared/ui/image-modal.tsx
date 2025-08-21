"use client";

import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button, GlassCard } from "@/shared/ui";
import { ImageWithFallback } from "@/shared/ui/image-with-fallback";

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
    document.body.style.overflow = "hidden";
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
      if (e.key === "Escape") onClose();
      if (images.length > 1) {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          setActiveIndex((p) => (p + 1) % images.length);
        }
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          setActiveIndex((p) => (p - 1 + images.length) % images.length);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, images.length, onClose]);

  // Preload neighbour images for snappier next/prev
  useEffect(() => {
    if (!isOpen || images.length < 2) return;
    const next = (activeIndex + 1) % images.length;
    const prev = (activeIndex - 1 + images.length) % images.length;
    [next, prev].forEach((i) => {
      const img = new window.Image();
      img.src = images[i].src;
    });
  }, [isOpen, activeIndex, images]);

  if (!isOpen || !images.length) return null;

  const nextImage = () => setActiveIndex((p) => (p + 1) % images.length);
  const prevImage = () =>
    setActiveIndex((p) => (p - 1 + images.length) % images.length);
  const currentImage = images[activeIndex];

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={
        projectTitle ? `${projectTitle} – image viewer` : "Image viewer"
      }
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        role="button"
        tabIndex={0}
        aria-label="Close image modal"
      />

      {/* Modal container */}
      <div
        ref={containerRef}
        tabIndex={-1}
        className="relative mx-4 flex h-[90vh] w-full max-w-6xl items-center justify-center outline-none"
      >
        <GlassCard className="flex size-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-surface-border p-6">
            <div>
              {projectTitle && (
                <h2 className="text-2xl font-bold">{projectTitle}</h2>
              )}
              <div className="mt-1 text-sm text-muted-foreground">
                {activeIndex + 1} / {images.length}
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
              aria-label="Close"
            >
              <X className="size-6" />
            </Button>
          </div>

          {/* Body */}
          <div className="relative flex flex-1 flex-col items-center justify-center p-6">
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={prevImage}
                  className="absolute left-1 top-1/2 z-10 -translate-y-1/2"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="size-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={nextImage}
                  className="absolute right-1 top-1/2 z-10 -translate-y-1/2"
                  aria-label="Next image"
                >
                  <ChevronRight className="size-6" />
                </Button>
              </>
            )}

            <div className="relative flex w-full items-center justify-center">
              <ImageWithFallback
                src={currentImage.src}
                alt={`${alt} - Image ${activeIndex + 1}`}
                width={1200}
                height={800}
                className="size-auto max-h-[75vh] max-w-full rounded-lg object-contain"
                timeoutMs={10000}
                sizes="(min-width: 1024px) 75vw, 100vw"
                fetchPriority="high"
                draggable={false}
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

export default ImageModal;
