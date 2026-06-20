import { cn } from "@/lib/utils";
import React from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/moving-border";


export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true,
  buttonLinkText="Get Started",
  buttonLink='/',
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  animate?: boolean;
  buttonLinkText?: string;
  buttonLink?: string;
}) => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };
  return (
    <div className={cn("relative w-full h-full flex items-center justify-center p-1 group/card", containerClassName)}>    
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={
          animate
            ? {
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }
            : undefined
        }
        style={{
          backgroundSize: animate ? "400% 400%" : undefined,
        }}
        className={cn(
          "absolute inset-0 rounded-3xl z-1 opacity-60 group-hover/card:opacity-100 blur-xl  transition duration-500 will-change-transform",
          " bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]"
        )}
      />
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={
          animate
            ? {
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }
            : undefined
        }
        style={{
          backgroundSize: animate ? "400% 400%" : undefined,
        }}
        className={cn(
          "absolute inset-0 rounded-3xl z-1 will-change-transform",
          "bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]"
        )}
      />
    
      <div className={cn("relative z-10 p-4 flex flex-col items-center justify-center gap-4 grow", className)}>
        {children} 
        {/* button name and link */}
        {buttonLink && (
          <div className="w-full md:w-auto" >
            <Link href={buttonLink}>
              <Button
                borderClassName=""
                borderRadius="1.75rem"
                className={cn(
                  "text-center",
                  "bg-cta-bg-light dark:bg-cta-bg-dark",
                  "text-cta-text-light dark:text-cta-text-dark",
                  "border-neutral-200 dark:border-slate-800",
                )}
              >
                {buttonLinkText}
              </Button>
            </Link>
          </div>
        )}
        </div>
      </div>
  );
};
