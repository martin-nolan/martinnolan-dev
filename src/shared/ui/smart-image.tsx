import Image from "next/image";
import { useState } from "react";

import { cn } from "@/shared/lib";

type SmartImageProps = {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  [key: string]: unknown;
};

const SmartImage = ({
  src,
  alt,
  className,
  fallbackSrc,
  ...props
}: SmartImageProps) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const imageSrc = hasError && fallbackSrc ? fallbackSrc : src;

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={500}
      height={300}
      loading="lazy"
      onError={() => fallbackSrc && setHasError(true)}
      onLoad={() => setIsLoaded(true)}
      className={cn(
        "transition-opacity duration-300",
        isLoaded ? "opacity-100" : "opacity-0",
        className
      )}
      {...props}
    />
  );
};

SmartImage.displayName = "SmartImage";

export { SmartImage };
