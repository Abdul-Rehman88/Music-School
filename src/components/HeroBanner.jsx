import React from 'react';
import  Spotlight  from '@/components/ui/Spotlight';
import {Button} from '@/components/ui/moving-border';
import Link from 'next/link';

function HeroBanner() {
  return (
    <main>
      <div className="relative w-full flex flex-col gap-4 items-center justify-center h-[65vh] md:h-[70vh] lg:h-screen overflow-hidden px-4 md:px-7.5 lg:px-12.5">
        {/* Canvas spotlight background — 'dk' for dark mode, 'lt' for light */}
        <Spotlight mode="dk" />

        {/* Content sits above the canvas via z-index */}
        <div className="relative z-10 flex flex-col items-center gap-4 text-center px-4">
          <h1 className="w-52.5 md:w-62.5 lg:w-100 text-4xl font-bold  dark:text-[#EF9F27] text-[#7F77DD] transition-colors duration-300">
            Master the art of music
          </h1>
          <p className="text-[16px] md:text-[18px] text-gray-600 dark:text-gray-400 w-85 md:w-100 lg:w-150">
            Dive into our comprehensive music courses and transform your musical journey today. Whether you're a beginner or looking to refine your skills, join us to unlock your true potential.
          </p>
          <div className="mt-4">
            <Link href={"/courses"}>
              <Button
                borderRadius="1.75rem"
                className="bg-black dark:bg-white text-white dark:text-black border-neutral-200 dark:border-slate-800"
              >
                Explore courses
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default HeroBanner;