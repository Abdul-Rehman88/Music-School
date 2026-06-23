import FeaturedCourses from '@/components/FeaturedCourses';
import HeroBanner from '@/components/HeroBanner';
import WhyChooseUs from '@/components/WhyChooseUs';
import TestimonialCards from '@/components/TestimonialCards';
export default function Home() {
  return (
      <>
        <main className=" antialiased bg-grid-white/[0.02]">
          <HeroBanner />
          <FeaturedCourses />
          <WhyChooseUs />
          <TestimonialCards />
        </main>
      </>   
   );
}
  