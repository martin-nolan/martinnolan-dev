"use client";

import { RefreshCw } from "lucide-react";
import Image, { ImageProps } from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

// If you don't have a cn util, replace cn(...) with a simple template string
import { cn } from "@/shared/lib";

type Props = Omit<ImageProps, "alt" | "quality" | "onLoadingComplete"> & {
  alt: string;
  /** ms before we consider it “too slow” and show a fallback */
  timeoutMs?: number;
  /** Optional explicit fallback node; default is a simple box with Retry */
  fallback?: React.ReactNode;
  /** Optional class for the skeleton */
  skeletonClassName?: string;
};

const DEFAULT_BLUR =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjUwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMyMjIyMjIiLz48L3N2Zz4=";

export function ImageWithFallback({
  timeoutMs = 8000,
  fallback,
  skeletonClassName,
  placeholder = "blur",
  blurDataURL = DEFAULT_BLUR,
  fetchPriority,
  priority,
  className,
  style,
  ...imgProps
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const timerRef = useRef<number | null>(null);

  const showFallback = errored || timedOut;

  // Start/clear timeout
  useEffect(() => {
    if (loaded || errored) return;
    timerRef.current = window.setTimeout(() => setTimedOut(true), timeoutMs);
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [reloadKey, timeoutMs, loaded, errored]);

  const handleRetry = () => {
    setLoaded(false);
    setErrored(false);
    setTimedOut(false);
    setReloadKey((k) => k + 1);
  };

  const fallbackNode = useMemo(
    () =>
      fallback ?? (
        <div className="flex size-full items-center justify-center rounded-lg border border-surface-border bg-black/50 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>Image unavailable</span>
            <button
              type="button"
              onClick={handleRetry}
              className="inline-flex items-center gap-1 rounded-md border border-surface-border px-2 py-1 text-xs hover:bg-surface-hover"
            >
              <RefreshCw className="size-3" />
              Retry
            </button>
          </div>
        </div>
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [reloadKey]
  );

  return (
    <div
      className={cn("relative", className)}
      aria-busy={!loaded}
      aria-live="polite"
    >
      {!showFallback && (
        <>
          {/* Skeleton while loading */}
          {!loaded && (
            <div
              className={cn(
                "absolute inset-0 animate-pulse rounded-lg bg-muted/30",
                skeletonClassName
              )}
            />
          )}

          <Image
            key={reloadKey}
            {...imgProps}
            alt={imgProps.alt}
            placeholder={placeholder}
            blurDataURL={blurDataURL}
            priority={priority}
            fetchPriority={fetchPriority}
            onLoad={() => setLoaded(true)} // <- use onLoad (no deprecation)
            onError={() => setErrored(true)}
            // Hide until loaded to avoid flash/jank
            style={{ visibility: loaded ? "visible" : "hidden", ...style }}
          />
        </>
      )}

      {showFallback && fallbackNode}
    </div>
  );
}

export default ImageWithFallback;
