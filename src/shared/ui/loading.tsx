import { cn } from "@/shared/lib/utils";

interface LoadingSpinnerProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "size-4",
  md: "size-8",
  lg: "size-12",
};

export const LoadingSpinner = ({
  className,
  size = "md",
}: LoadingSpinnerProps) => {
  return (
    <div
      className={cn(
        "animate-spin rounded-full border-2 border-primary border-t-transparent",
        sizeClasses[size],
        className
      )}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

interface LoadingStateProps {
  children: React.ReactNode;
  className?: string;
}

export const LoadingState = ({ children, className }: LoadingStateProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center space-y-4 p-8",
        className
      )}
    >
      <LoadingSpinner size="lg" />
      <div className="text-center text-muted-foreground">{children}</div>
    </div>
  );
};
