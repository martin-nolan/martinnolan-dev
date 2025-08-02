import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface GlowEffectProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "primary" | "accent" | "subtle";
}

const GlowEffect = forwardRef<HTMLDivElement, GlowEffectProps>(
  ({ className, children, variant = "primary", ...props }, ref) => {
    const glowVariants = {
      primary: "shadow-[0_0_30px_rgba(0,172,255,0.3)]",
      accent: "shadow-[0_0_30px_rgba(255,62,199,0.3)]",
      subtle: "shadow-[0_0_20px_rgba(255,255,255,0.1)]",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "transition-all duration-300",
          glowVariants[variant],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlowEffect.displayName = "GlowEffect";

export { GlowEffect };