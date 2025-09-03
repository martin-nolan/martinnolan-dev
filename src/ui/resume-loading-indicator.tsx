export const LoadingIndicator = () => {
  return (
    <div className="absolute inset-4 flex flex-col items-center justify-center rounded-lg border border-surface-border bg-surface/95 backdrop-blur-sm max-sm:inset-2">
      <div className="flex flex-col items-center gap-4 text-center max-sm:gap-3">
        <div className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent max-sm:size-6"></div>
        <p className="text-sm text-muted-foreground max-sm:text-xs">Loading PDF...</p>
      </div>
    </div>
  );
};
