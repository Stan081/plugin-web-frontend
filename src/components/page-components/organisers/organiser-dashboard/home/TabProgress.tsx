"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

const TabProgress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, max, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      `relative h-2 w-full overflow-hidden rounded-xl bg-[#FBEAE9]`,
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-[#D9302A] transition-all"
      style={{ transform: `translateX(-${max ? max : 100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
TabProgress.displayName = ProgressPrimitive.Root.displayName;

export { TabProgress };
