import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/lib";
import { toggleVariants } from "@/shared/ui/toggle";

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants>
>({
  size: "default",
  variant: "default",
});

type ToggleGroupVariant = "default" | "outline" | null | undefined;
type ToggleGroupSize = "default" | "sm" | "lg" | null | undefined;

type ToggleGroupSingleProps = Omit<
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root>,
  "value" | "defaultValue" | "onValueChange"
> & {
  variant?: ToggleGroupVariant;
  size?: ToggleGroupSize;
  className?: string;
  children?: React.ReactNode;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
};

type ToggleGroupMultipleProps = Omit<
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root>,
  "value" | "defaultValue" | "onValueChange"
> & {
  variant?: ToggleGroupVariant;
  size?: ToggleGroupSize;
  className?: string;
  children?: React.ReactNode;
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
};

const ToggleGroupSingle = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  ToggleGroupSingleProps
>((props: ToggleGroupSingleProps, ref: React.Ref<React.ElementRef<typeof ToggleGroupPrimitive.Root>>) => {
  const { className, variant, size, children, ...rest } = props;
  return (
    <ToggleGroupPrimitive.Root
      ref={ref}
      className={cn("flex items-center justify-center gap-1", className)}
      type="single"
      {...(() => {
        const { type, ...restProps } = rest;
        return restProps;
      })()}
    >
      <ToggleGroupContext.Provider
        value={{
          variant: variant ?? "default",
          size: size ?? "default",
        }}
      >
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  );
});
ToggleGroupSingle.displayName = "ToggleGroupSingle";

const ToggleGroupMultiple = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  ToggleGroupMultipleProps
>((props, ref) => {
  const { className, variant, size, children, ...rest } = props;
  return (
    <ToggleGroupPrimitive.Root
      ref={ref}
      className={cn("flex items-center justify-center gap-1", className)}
      type="multiple"
      {...(() => {
        const { type, ...restProps } = rest;
        return restProps;
      })()}
    >
      <ToggleGroupContext.Provider
        value={{
          variant: variant ?? "default",
          size: size ?? "default",
        }}
      >
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  );
});
ToggleGroupMultiple.displayName = "ToggleGroupMultiple";

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
    VariantProps<typeof toggleVariants>
>(({ className, children, variant, size, value, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext);

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      value={value}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
});
ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

export { ToggleGroupSingle, ToggleGroupMultiple, ToggleGroupItem };
