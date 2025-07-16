/* eslint-disable react-refresh/only-export-components */
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

// -- VARIAN UNTUK CONTAINER (EFEK 3D) --
// Ini adalah bagian 'bawah' atau 'bayangan' dari tombol 3D kita.
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
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// -- VARIAN UNTUK TOMBOL UTAMA (BAGIAN ATAS) --
// Ini adalah bagian yang terlihat dan berisi teks/ikon.
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
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
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

    // Untuk varian 'link', kita tidak perlu struktur 3D
    if (variant === 'link') {
      return (
        <Comp
          className={cn(buttonFaceVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        />
      );
    }

    // Untuk varian lain, kita gunakan struktur 3D
    return (
      <button
        className={cn(buttonContainerVariants({ variant }), className)}
        disabled={props.disabled}
        ref={ref}
      >
        <Comp
          className={cn(buttonFaceVariants({ variant, size }))}
          // Props asli (seperti onClick) harus ada di elemen 'Comp'
          {...props}
        />
      </button>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonFaceVariants, buttonContainerVariants };
