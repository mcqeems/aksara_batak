import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function TeamOverviewCard() {
  return (
    <motion.div
      className="absolute bottom-1/5 left-16 z-20 hidden xl:block"
      initial={{ opacity: 0, x: -50, rotate: -25 }}
      animate={{ opacity: 1, x: 0, rotate: -25 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      <Card className="bg-card/80 border-border/50 w-64 p-4 shadow-2xl backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-primary text-lg font-bold">
            Tim Developer
          </CardTitle>
          <CardDescription className="text-sm">Meet Our Team</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center">
            <div className="flex -space-x-2">
              <div className="border-destructive/30 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-2">
                <img
                  src="/assets/images/dev/github/rizcon.jpeg"
                  alt="Rizky Cahyono Putra"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="border-primary/30 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-2">
                <img
                  src="/assets/images/dev/github/mcqeems.jpg"
                  alt="Mustaqim Nawahhudi Ma'arif"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="border-primary/30 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-2">
                <img
                  src="/assets/images/dev/github/mubaihaqi.jpeg"
                  alt="Muhammad Umar Baihaqi"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
          <div className="space-y-2 text-center">
            <div className="text-sm font-medium">GitHub Team</div>
            <div className="flex flex-col items-center gap-1">
              <a href="#" className="text-destructive text-xs hover:underline">
                @mcqeems
              </a>
              <div className="flex gap-2">
                <a href="#" className="text-primary text-xs hover:underline">
                  @rizkycahyono97
                </a>
                <a href="#" className="text-primary text-xs hover:underline">
                  @mubaihaqi
                </a>
              </div>
            </div>
          </div>
          <div className="pt-2">
            <div className="flex justify-center gap-1">
              <div className="bg-destructive/60 h-1 w-4 rounded-full"></div>
              <div className="bg-primary/60 h-1 w-4 rounded-full"></div>
              <div className="bg-primary/60 h-1 w-4 rounded-full"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
