export const LoadingIndicator = () => {
  return (
    <div className="absolute inset-4 flex flex-col items-center justify-center rounded-lg border border-surface-border bg-surface/95 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
        <p className="text-sm text-muted-foreground">Loading PDF...</p>
      </div>
    </div>
  );
};
