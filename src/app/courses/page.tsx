'use client'
import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import courseData from "@/data/music_courses.json"

function page() {
    interface Course {
        id: number,
        title: string,
        description: string,
        image: string, 
    }

  return (
    <div className="min-h-screen overflow-hidden px-4 md:px-7.5 lg:px-12.5  py-8 pt-36">
        <h1 className="text-primary-heading text-center font-sans font-bold mb-8 text-white">All courses ({courseData.courses.length})</h1>  
        <div className="flex flex-wrap justify-center">
            {courseData.courses.map((course:Course) => (
                <CardContainer key={course.id} className="inter-var m-4">
                <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/10 dark:bg-black dark:border-white/20 border-black/10 w-auto sm:w-85 md:w-80 lg:w-85 h-auto rounded-xl p-6 border  ">
                  <CardItem
                    translateZ="50"
                    className="text-subheading font-bold text-neutral-600 dark:text-white"
                  >
                    {course.title}
                  </CardItem>
                  <CardItem
                    as="p"
                    translateZ="60"
                    className="text-sm text-neutral-500  max-w-sm mt-2 dark:text-neutral-300"
                  >
                    {course.description}
                  </CardItem>
                  <CardItem translateZ="100" className="w-full mt-4">
                    <Image
                      src={course.image}
                      height="1000"
                      width="1000"
                      className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                      alt={course.title}
                    />
                  </CardItem>
                  <div className="flex justify-between items-center mt-20">
                    <CardItem
                      translateZ={20}
                      as="button"
                      className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                    >
                      Try now →
                    </CardItem>
                    <CardItem
                      translateZ={20}
                      as="button"
                      className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                    >
                      Sign up
                    </CardItem>
                  </div>
                </CardBody>
              </CardContainer>
            ))}
        </div>  
    </div>
  )
}

export default page