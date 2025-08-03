import { forwardRef, useState } from "react";
import { cn } from "@/lib/utils";

interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
}

const SmartImage = forwardRef<HTMLImageElement, SmartImageProps>(
  ({ src, alt, className, fallbackSrc, ...props }, ref) => {
    const [hasError, setHasError] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const handleError = () => {
      if (!hasError && fallbackSrc) {
        setHasError(true);
      }
    };

    const handleLoad = () => {
      setIsLoaded(true);
    };

    return (
      <img
        ref={ref}
        src={hasError && fallbackSrc ? fallbackSrc : src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onError={handleError}
        onLoad={handleLoad}
        className={cn(
          "transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0",
          className
        )}
        {...props}
      />
    );
  }
);

SmartImage.displayName = "SmartImage";

export { SmartImage };