'use client'
import { BackgroundBeams } from "@/components/ui/background-beams";
import { useState } from "react";
import { Button } from "@/components/ui/moving-border";



function Contact() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Submitted:', { email, message });
  };

  return (
    <div className="relative h-screen w-full flex flex-col gap-4 items-center justify-center  overflow-hidden px-4 md:px-7.5 lg:px-12.5">


 <BackgroundBeams className="absolute top-0 left-0 w-full h-full z-0" />
      {/* Content with higher z-index */}
      <div className="relative z-10 py-10  pt-36" >
        {/* Add relative and z-10 to bring content to the front */}
        <h1 className="text-primary-heading text-center font-bold mb-8 text-primary-heading-light dark:text-primary-heading-dark">
          Contact Us
        </h1>
        <p className="text-text-light dark:text-text-dark  max-w-lg mx-auto my-2 text-sm text-center">
          We&apos;re here to help with any questions about our courses,
          programs, or events. Reach out and let us know how we can assist you
          in your musical journey.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="rounded-lg border border-neutral-800 outline-none focus:border-none focus:ring-2 focus:ring-teal-500 w-full p-4 bg-secondary-light dark:bg-secondary-dark placeholder:text-text-light dark:placeholder:text-text-dark"
            required
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your message"
            className="rounded-lg border border-neutral-800 outline-none focus:border-none focus:ring-2 focus:ring-teal-500 w-full p-4 bg-secondary-light dark:bg-secondary-dark placeholder:text-text-light dark:placeholder:text-text-dark"
            rows={5}
            required
          ></textarea>
          <Button
            type="submit"
            borderRadius="1.75rem"
            className="text-center font-bold bg-cta-bg-light dark:bg-cta-bg-dark text-cta-text-light dark:text-cta-text-dark border-neutral-200 dark:border-slate-800"
            >
            Send Message
          </Button>
        </form>
      </div>
    </div>

  )
}

export default Contact