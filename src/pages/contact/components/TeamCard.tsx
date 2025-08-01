import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface TeamCardProps {
  title: string;
  subtitle: string;
  username: string;
  email: string;
  phone: string;
  position: 'top-left' | 'bottom-left' | 'top-right' | 'bottom-right';
  delay: number;
}

export function TeamCard({
  title,
  subtitle,
  username,
  email,
  phone,
  position,
  delay,
}: TeamCardProps) {
  const positionClasses = {
    'top-left': 'top-1/5 left-10',
    'bottom-left': 'bottom-1/5 left-16',
    'top-right': 'top-1/5 right-8',
    'bottom-right': 'right-16 bottom-1/5',
  };

  return (
    <motion.div
      className={`absolute ${positionClasses[position]} z-20 hidden xl:block`}
      initial={{
        opacity: 0,
        x: position.includes('left') ? -50 : 50,
        rotate: position.includes('left') ? -35 : 35,
      }}
      animate={{
        opacity: 1,
        x: 0,
        rotate: position.includes('left') ? -35 : 35,
      }}
      transition={{ duration: 0.8, delay }}
    >
      <Card className="bg-card/80 border-border/50 w-64 p-4 shadow-2xl backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-primary text-lg font-bold">
            {title}
          </CardTitle>
          <CardDescription className="text-sm font-medium text-white">
            {subtitle}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="bg-primary h-2 w-2 rounded-full"></div>
              <span className="text-primary text-sm font-medium">
                {username}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-destructive h-2 w-2 rounded-full"></div>
              <span className="text-muted-foreground text-xs">{email}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-primary h-2 w-2 rounded-full"></div>
              <span className="text-muted-foreground text-xs">{phone}</span>
            </div>
          </div>
          <div className="pt-2">
            <div className="flex gap-2">
              <div className="bg-primary/60 h-1 w-8 rounded-full"></div>
              <div className="bg-primary/40 h-1 w-6 rounded-full"></div>
              <div className="bg-primary/20 h-1 w-4 rounded-full"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
