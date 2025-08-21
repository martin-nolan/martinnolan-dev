import * as React from "react"

import { badgeVariants, BadgeVariantProps } from "./badge-utils"

import { cn } from "@/shared/lib"

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    BadgeVariantProps {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge }
