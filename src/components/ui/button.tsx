import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

// Tidak ada perubahan di sini
const buttonContainerVariants = cva(
  'rounded-lg transition-all duration-150 ease-in-out disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-primary/70 active:bg-primary/60 pb-[4px] active:pb-0 active:translate-y-[4px] cursor-pointer',
        destructive:
          'bg-destructive/70 active:bg-destructive/60 pb-[4px] active:pb-0 active:translate-y-[4px] cursor-pointer',
        secondary:
          'bg-secondary/70 active:bg-secondary/60 pb-[4px] active:pb-0 active:translate-y-[4px] cursor-pointer',
        link: '', // Tidak ada efek 3D untuk varian link
        ghost: '', // Tidak ada efek 3D untuk varian ghost
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// Tidak ada perubahan di sini
const buttonFaceVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-full',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer',
        destructive:
          'bg-destructive text-primary-foreground hover:bg-destructive/90 cursor-pointer',
        secondary:
          'bg-secondary text-primary-foreground hover:bg-secondary/80 cursor-pointer',
        link: 'bg-transparent underline-offset-4 hover:underline text-primary cursor-pointer',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
        ghost: 'h-10 w-10',
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
    VariantProps<typeof buttonFaceVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    if (variant === 'link') {
      return (
        <Comp
          className={cn(buttonFaceVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        />
      );
    }

    return (
      <button
        // Wadah luar sekarang HANYA mengurus varian 3D-nya.
        className={cn(buttonContainerVariants({ variant }))}
        disabled={props.disabled}
        ref={ref}
      >
        <Comp
          // Wajah tombol sekarang menerima semua styling: varian, ukuran, DAN className dari luar.
          // Ini memastikan 'h-28' dan 'flex-col' Anda diterapkan di sini.
          className={cn(buttonFaceVariants({ variant, size }), className)}
          {...props}
        />
      </button>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonFaceVariants, buttonContainerVariants };
