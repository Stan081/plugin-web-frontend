import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-full text-base font-pally-medium text-white font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-black text-white shadow hover:bg-gray-500',
        destructive:
          'bg-[#D9302A] shadow-custom rounded-lg hover:bg-[#b23632] text-[#ffffff] py-2.5 px-4 transition delay-75 ease-in-out focus:bg-[#D9302A] text-center focus:outline-none',
        outline:
          'border-2 border-[#101928] text-black py-2.5 px-4 bg-transparent font-medium rounded-lg',
        secondary:
          'text-[#CB1A14] bg-transparent border border-[#D9302A] rounded-lg py-2.5 px-4 text-center font-medium',
        ghost: 'opacity-50 cursor-not-allowed bg-gray-200 text-slate-600',
        link: 'text-black underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-12 px-6 py-4',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };