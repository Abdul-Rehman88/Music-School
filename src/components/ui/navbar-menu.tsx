"use client";
import React from "react";
import { motion } from "motion/react";
import Link from "next/link";



const transition = {
  type: "spring" as const,
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  href,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  href?: string;           // ← add this
  children?: React.ReactNode;
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      {/* If no children, render as a plain link */}
      {href && !children ? (
        <Link href={href}>
          <motion.p
            transition={{ duration: 0.3 }}
            className="cursor-pointer text-white hover:opacity-[0.9] dark:text-black"
          >
            {item}
          </motion.p>
        </Link>
      ) : (
        <motion.p
          transition={{ duration: 0.3 }}
          className="cursor-pointer text-white hover:opacity-[0.9] dark:text-black"
        >
          {item}
        </motion.p>
      )}

      {/* Only show dropdown animation if children exist */}
      {children && active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%+1.2rem)] left-1/2 transform -translate-x-1/2 pt-1">
              <motion.div
                transition={transition}
                layoutId="active"
                className="bg-black/90 dark:bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden border border-black/20 dark:border-white/20 shadow-xl"
              >
                <motion.div layout className="w-max h-full p-4">
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)} // resets the state
      className="relative rounded-full border border-transparent dark:bg-white/90 dark:border-white/20 bg-black/90 shadow-input flex justify-center space-x-3 sm:space-x-4 px-8 py-5 "
    >
      {children}
    </nav>
  );
};

// export const ProductItem = ({
//   title,
//   description,
//   href,
//   src,
// }: {
//   title: string;
//   description: string;
//   href: string;
//   src: string;
// }) => {
//   return (
//     <a href={href} className="flex space-x-2">
//       <img
//         src={src}
//         width={140}
//         height={70}
//         alt={title}
//         className="shrink-0 rounded-md shadow-2xl"
//       />
//       <div>
//         <h4 className="text-xl font-bold mb-1 text-black dark:text-white">
//           {title}
//         </h4>
//         <p className="text-neutral-700 text-sm max-w-40 dark:text-neutral-300">
//           {description}
//         </p>
//       </div>
//     </a>
//   );
// };

export const HoveredLink = ({ children, ...rest }: any) => {
  return (
    <Link
      {...rest}
      className="text-white/80 dark:text-black/70 dark:hover:text-black/90 hover:text-white/90 "
    >
      {children}
    </Link>
  );
};
