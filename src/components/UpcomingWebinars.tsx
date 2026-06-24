import React from 'react'
import {HoverEffect} from './ui/card-hover-effect'
import { Button } from './ui/moving-border';
import Link from "next/link";

const featuredWebinars = [
    {
      title: 'Understanding Music Theory',
      description:
        'Dive deep into the fundamentals of music theory and enhance your musical skills.',
      link: 'understanding-music-theory',
      isFeatured: true,
    },
    {
      title: 'The Art of Songwriting',
      description:
        'Learn the craft of songwriting from experienced musicians and songwriters.',
      link: 'the-art-of-songwriting',
      isFeatured: true,
    },
    {
      title: 'Mastering Your Instrument',
      description:
        'Advanced techniques to master your musical instrument of choice.',
      link: 'mastering-your-instrument',
      isFeatured: true,
    },
    {
      title: 'Music Production Essentials',
      description:
        'Get started with music production with this comprehensive overview.',
      link: 'music-production-essentials',
      isFeatured: true,
    },
    // Added two more webinars
    {
      title: 'Live Performance Techniques',
      description:
        'Enhance your live performance skills with expert tips and strategies.',
      link: 'live-performance-techniques',
      isFeatured: true,
    },
    {
      title: 'Digital Music Marketing',
      description:
        'Learn how to promote your music effectively in the digital age.',
      link: 'digital-music-marketing',
      isFeatured: true,
    },
  ];


function UpcomingWebinars() {
  return (
    <div className="bg-secondary-light dark:bg-secondary-dark w-full  bg-grid-black/[0.2] dark:bg-grid-white/[0.2] relative flex flex-col items-center gap-4 overflow-hidden px-2  py-7.5 md:px-7.5 md:py-12 lg:px-12.5">

        <div className='text-center'>
            <h4 className='text-[14px] text-badge-light dark:text-badge-dark'>
                FEATURED WEBINARS
            </h4>
            <h2 className='text-secondary-heading font-bold text-secondary-heading-light dark:text-secondary-heading-dark'>
                Enhance Your Musical Journey
            </h2>
        </div>
        <div className="py-5">
            <HoverEffect items={featuredWebinars.map(webinars=>(
                {
                    title: webinars.title,
                    description: webinars.description,
                    link: webinars.link,
                }
            ))}  />

        </div>
        <div>
            <Link href={"/"}>
                <Button
                    borderRadius="1.75rem"
                    className="text-center font-bold bg-cta-bg-light dark:bg-cta-bg-dark text-cta-text-light dark:text-cta-text-dark border-neutral-200 dark:border-slate-800"
                    >
                    View all Webinars
                </Button>
            </Link>
        </div>
    </div>
  )
}

export default UpcomingWebinars