import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import { cn } from "@/lib/utils";

const musicSchoolTestimonials = [
    {
      quote:
        'Joining the music school transformed my understanding of music and helped me to truly discover my own sound. The instructors are world-class!',
      name: 'Alex Johnson',
      title: 'Guitar Student',
    },
    {
      quote:
        "The community and support at this school are unmatched. I've grown not just as a pianist, but also as a performer, thanks to their comprehensive approach.",
      name: 'Samantha Lee',
      title: 'Piano Student',
    },
    {
      quote:
        "This school offered me the tools and confidence to take my singing to the next level. I'm endlessly grateful for the personalized coaching.",
      name: 'Michael Chen',
      title: 'Vocal Student',
    },
    {
      quote:
        'As a violinist, finding the right mentor can be challenging, but this school matched me with a teacher who truly understands my goals and challenges.',
      name: 'Emily Taylor',
      title: 'Violin Student',
    },
    {
      quote:
        'The production courses here opened my eyes to the intricacies of music production. Highly recommend for any aspiring producers!',
      name: 'Chris Morales',
      title: 'Music Production Student',
    },
  ];

function TestimonialCards() {
  return (
    <div className="bg-alt-light dark:bg-alt-dark w-full h-120 bg-grid-black/[0.2] dark:bg-grid-white/[0.2] relative flex flex-col items-center gap-7.5 overflow-hidden px-4 py-5 md:px-7.5 md:py-12 lg:px-12.5">
     <div
  className={cn(
    "absolute inset-0",
    "bg-size-[20px_20px]",
    "bg-[radial-gradient(var(--color-primary-heading-dark)_1.5px,transparent_1.5px)] opacity-70",
    "dark:bg-[radial-gradient(var(--color-secondary-heading-light)_1.5px,transparent_1.5px)] dark:opacity-60",
  )}
/>
      <div className="w-full flex flex-col gap-4 items-center justify-start text-center">
        <h2 className="text-secondary-heading font-bold text-secondary-heading-light dark:text-secondary-heading-dark">Testimonials</h2>
        <p className="text-[16px] md:text-[17px] text-text-light dark:text-text-dark">
          What our students have to say about our music school and their learning experience
        </p>
      </div>
        <InfiniteMovingCards items={musicSchoolTestimonials} speed="normal" />
    </div>
  )
}

export default TestimonialCards