import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface GradientTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

const GradientText = forwardRef<HTMLSpanElement, GradientTextProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent",
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

GradientText.displayName = "GradientText";

export { GradientText };