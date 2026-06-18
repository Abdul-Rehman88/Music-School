'use client';
import React from 'react'
import { BackgroundGradient } from "./ui/background-gradient"
import CourseData from "../data/music_courses.json"
import Link from "next/link"
import {Button} from '@/components/ui/moving-border';

interface Course {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: number;
  instructor: string;
  isFeatured: boolean;
}

function FeaturedCourses() {
  const featuredCourses = CourseData.courses.filter((course:Course)=> course.isFeatured)
  return (
    <div className="relative bg-secondary-light dark:bg-secondary-dark w-full flex flex-col gap-4 items-center justify-center h-hidden px-4 md:px-7.5 lg:px-12.5 py-12">        
        <div className="w-full  flex flex-col gap-4 items-center justify-start text-center">
            <h2 className="text-secondary-heading font-bold text-secondary-heading-light dark:text-secondary-heading-dark">Featured Courses</h2>
            <p className="text-[16px] md:text-[17px] text-text-light dark:text-text-dark">Explore our handpicked selection of courses designed to elevate your skills and knowledge.</p>
        </div>
        <div className="w-full mt-10 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center justify-center">
          {featuredCourses.map((course:Course) => (
            <BackgroundGradient key={course.id} 
              className="flex flex-col rounded-[22px] bg-white dark:bg-zinc-900 overflow-hidden h-full max-w-sm">
                <div className="p-4 flex flex-col items-center text-center gap-4 grow">
                  <div className="flex flex-col items-center text-center ">
                    <h3 className="text-subheading text-black mt-4 mb-2 dark:text-neutral-200">{course.title}</h3>
                    <p className="w-85 text-secondary text-neutral-600 dark:text-neutral-400 grow">{course.description}</p>
                  </div>
                  <div>

                  {/* <Link href={`/courses/${course.slug}`}> */}
                    <Button
                      borderRadius="1.75rem"
                      className="text-center bg-cta-bg-light dark:bg-cta-bg-dark text-cta-text-light dark:text-cta-text-dark border-neutral-200 dark:border-slate-800"
                      >
                      Learn More
                    </Button>
                  {/* </Link> */}
                      </div>
                </div>
            </BackgroundGradient>
            ))}
        </div>
        <div className="w-full flex items-center justify-center mt-10">
          <Link href="/courses">
            <Button
              borderRadius="1.75rem"
                className="text-center bg-cta-bg-light dark:bg-cta-bg-dark text-cta-text-light dark:text-cta-text-dark border-neutral-200 dark:border-slate-800"
            >
              View All Courses
            </Button>
          </Link>
        </div>
    </div>
  )
}

export default FeaturedCourses