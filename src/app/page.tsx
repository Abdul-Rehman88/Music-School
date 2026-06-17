import FeaturedCourses from '@/components/FeaturedCourses';
import HeroBanner from '@/components/HeroBanner';
export default function Home() {
  return (
      <>
        <main className=" antialiased bg-grid-white/[0.02]">
          <HeroBanner />
          <FeaturedCourses />
        </main>
      </>   
   );
}
  