/**
 * Global image preloader utility
 * Preloads images in the background to improve perceived performance
 */

interface PreloadOptions {
  sizes?: number[];
  quality?: number;
  priority?: boolean;
}

class ImagePreloader {
  private preloadedUrls = new Set<string>();
  private preloadQueue: Array<{ src: string; options: PreloadOptions }> = [];
  private isProcessing = false;

  /**
   * Add images to the preload queue
   */
  preload(src: string | string[], options: PreloadOptions = {}) {
    const sources = Array.isArray(src) ? src : [src];
    const { sizes = [600, 900], priority = false } = options;

    sources.forEach((source) => {
      sizes.forEach((size) => {
        const key = `${source}-${size}`;
        if (!this.preloadedUrls.has(key)) {
          this.preloadQueue.push({ src: source, options: { ...options, sizes: [size] } });
        }
      });
    });

    if (priority) {
      this.processQueue();
    } else {
      // Process queue after a short delay for non-priority images
      setTimeout(() => this.processQueue(), 100);
    }
  }

  /**
   * Process the preload queue
   */
  private async processQueue() {
    if (this.isProcessing || this.preloadQueue.length === 0) return;

    this.isProcessing = true;

    // Process in batches to avoid overwhelming the browser
    const batchSize = 3;
    while (this.preloadQueue.length > 0) {
      const batch = this.preloadQueue.splice(0, batchSize);

      const promises = batch.map(({ src, options }) => this.preloadSingle(src, options));
      await Promise.allSettled(promises);

      // Small delay between batches
      await new Promise((resolve) => setTimeout(resolve, 50));
    }

    this.isProcessing = false;
  }

  /**
   * Preload a single image
   */
  private preloadSingle(src: string, options: PreloadOptions): Promise<void> {
    return new Promise((resolve) => {
      const size = options.sizes?.[0] || 600;
      const quality = options.quality || 75;
      const key = `${src}-${size}`;

      if (this.preloadedUrls.has(key)) {
        resolve();
        return;
      }

      const img = new Image();
      const optimizedUrl = `/_next/image?url=${encodeURIComponent(src)}&w=${size}&q=${quality}`;

      img.onload = () => {
        this.preloadedUrls.add(key);
        console.log(`✓ Preloaded: ${src} (${size}px)`);
        resolve();
      };

      img.onerror = () => {
        console.warn(`✗ Failed to preload image: ${src}`);
        resolve(); // Don't block other images
      };

      img.src = optimizedUrl;
    });
  }

  /**
   * Check if an image has been preloaded
   */
  isPreloaded(src: string, size: number = 600): boolean {
    return this.preloadedUrls.has(`${src}-${size}`);
  }

  /**
   * Clear the preload cache
   */
  clear() {
    this.preloadedUrls.clear();
    this.preloadQueue.length = 0;
  }
}

// Export singleton instance
export const imagePreloader = new ImagePreloader();

/**
 * Hook to preload images from project data
 */
export function preloadProjectImages(projects: any[]) {
  if (!projects || projects.length === 0) return;

  const allImageSrcs: string[] = [];

  projects.forEach((project) => {
    // Handle both 'images' (processed projects) and 'image' (raw projects)
    const projectImages = project.images || project.image;
    if (projectImages && Array.isArray(projectImages)) {
      projectImages.forEach((img: any) => {
        if (img && img.src) {
          allImageSrcs.push(img.src);
        }
      });
    }
  });

  if (allImageSrcs.length > 0) {
    console.log(`Preloading ${allImageSrcs.length} project images:`, allImageSrcs.slice(0, 3));

    // Preload first few images with priority
    const priorityImages = allImageSrcs.slice(0, 6);
    const regularImages = allImageSrcs.slice(6);

    imagePreloader.preload(priorityImages, {
      sizes: [600, 900],
      quality: 75,
      priority: true,
    });

    if (regularImages.length > 0) {
      imagePreloader.preload(regularImages, {
        sizes: [600, 900],
        quality: 75,
        priority: false,
      });
    }
  } else {
    console.log('No project images found to preload');
  }
}
