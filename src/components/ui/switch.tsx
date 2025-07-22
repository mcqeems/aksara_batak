// switch.tsx

import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const switchVariants = cva(
  'peer inline-flex h-[28px] w-[52px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
  {
    variants: {
      variant: {
        default:
          'data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
        theme:
          'bg-accent data-[state=checked]:bg-gray-800 dark:data-[state=checked]:bg-gray-400',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const thumbVariants = cva(
  'pointer-events-none block h-6 w-6 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0.5',
  {
    variants: {
      variant: {
        default: 'bg-background',
        theme:
          'bg-background flex items-center justify-center text-foreground data-[state=checked]:bg-primary',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// Tambahkan props baru untuk ikon
interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>,
    VariantProps<typeof switchVariants> {
  IconOn?: React.ElementType;
  IconOff?: React.ElementType;
}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(({ className, variant, IconOn, IconOff, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(switchVariants({ variant }), className)}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb className={cn(thumbVariants({ variant }))}>
      {/* Logika untuk menampilkan dan menganimasikan ikon */}
      {IconOn && IconOff && (
        <>
          <IconOn
            className={cn(
              'h-4 w-4 text-white transition-transform duration-300 ease-in-out',
              props.checked ? 'scale-100 rotate-0' : 'scale-0 -rotate-90'
            )}
          />
          <IconOff
            className={cn(
              'absolute h-4 w-4 text-slate-800 transition-transform duration-300 ease-in-out',
              props.checked ? 'scale-0 rotate-90' : 'scale-100 rotate-0'
            )}
          />
        </>
      )}
    </SwitchPrimitives.Thumb>
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
