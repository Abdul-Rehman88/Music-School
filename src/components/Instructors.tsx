'use client'
import { WavyBackground } from "./ui/wavy-background";
import { AnimatedTooltip } from "./ui/animated-tooltip"; // adjust path
import { useIsDarkMode } from "@/hooks/useIsDarkMode"; // adjust path

const instructors = [
  {
    id: 1,
    name: 'Elena Briggs',
    designation: 'Vocal Coach',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 2,
    name: 'Marcus Reid',
    designation: 'Guitar Instructor',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80',
  },
  {
    id: 3,
    name: 'Julia Zhang',
    designation: 'Piano Teacher',
    image:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 4,
    name: 'Andre Gomez',
    designation: 'Drumming Expert',
    image:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
  },
];

function Instructors() {
  const isDark = useIsDarkMode();

  return (
    // No overflow-hidden here anymore — WavyBackground now contains its
    // own Safari-blur clipping internally without affecting the tooltip
    // popup, which needs to be free to render outside normal flow.
    <div className="relative">
      <WavyBackground
        // Bumped vs text-only version to leave room for avatars + the
        // tooltip popup above them without feeling cramped.
        containerClassName="min-h-[320px] sm:min-h-[360px] md:min-h-[440px] lg:min-h-[500px]"
        className="w-full max-w-7xl mx-auto px-4 md:px-7.5 lg:px-12.5 py-8 md:py-7.5 lg:py-10 flex flex-col items-center justify-center"
        backgroundFill={isDark ? "#000000" : "#F8F7FC"}
      >
        <h2 className="text-primary-dark dark:text-primary-light text-secondary-heading font-bold text-center">
          Meet Our Instructors
        </h2>
        <p className="text-primary text-alt-dark dark:text-alt-light text-center mt-2 max-w-xl px-2">
          Discover the talented professionals who will guide your musical journey
        </p>

        {/* pt gives the tooltip room to pop up above the avatars */}
        <div className="flex flex-row items-center justify-center mb-10 w-full">
          <AnimatedTooltip items={instructors} />
        </div>
      </WavyBackground>
    </div>
  );
}

export default Instructors;