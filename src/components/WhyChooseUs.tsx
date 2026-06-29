"use client";
import React from "react";
import { StickyScroll } from "./ui/sticky-scroll-reveal";
import { EngagementPanel } from "./ui/engagement-panel";

const musicSchoolContent = [
  {
    title: "Discover Your Sound with Us: A Personal Journey in Music Mastery",
    description:
      "Embark on a musical journey that's uniquely yours. Our personalized instruction adapts to your individual needs, setting the stage for unparalleled growth and creativity. At our music school, your aspirations meet our dedicated support, creating a harmonious path to mastery.",
    content: (
      <EngagementPanel
        messages={[
          { from: "instructor", text: "Your lesson plan was just updated for your pace." },
          { from: "student", text: "Loving the new exercises this week!" },
        ]}
      />
    ),
  },
  {
    title: "Live Feedback & Engagement",
    description:
      "Immerse yourself in an interactive learning experience where feedback is immediate, just like real-time changes in a collaborative project. This approach enhances your understanding and mastery of music concepts and performance techniques.",
    content: (
      <EngagementPanel
        messages={[
          { from: "student", text: "How's my timing on bar 12?" },
          { from: "instructor", text: "Right on the beat — nice work 🎯" },
        ]}
      />
    ),
  },
  {
    title: "Cutting-Edge Curriculum",
    description:
      "Our curriculum is continuously updated to include the latest music education trends and technologies, ensuring you're always learning with the most current and effective methods. Say goodbye to outdated materials and welcome an education that evolves with the industry.",
    content: (
      <EngagementPanel
        messages={[
          { from: "instructor", text: "New module unlocked: modern production techniques." },
          { from: "student", text: "Just what I needed for my mix." },
        ]}
      />
    ),
  },
  {
    title: "Limitless Learning Opportunities",
    description:
      "With our expansive resource library and dynamic course offerings, you'll never find yourself without something new to explore. Our platform provides continuous opportunities for growth, ensuring your musical skills are always advancing.",
    content: (
      <EngagementPanel
        messages={[
          { from: "student", text: "Found a great resource on jazz chord voicings." },
          { from: "instructor", text: "Try pairing it with the new improv playlist." },
        ]}
      />
    ),
  },
];

export default function WhyChooseUs() {
  return (
    <div className="bg-primary-light dark:bg-primary-dark w-full px-4 py-5 md:px-7.5 md:py-12 lg:px-12.5 flex flex-col lg:items-center ">
      <StickyScroll content={musicSchoolContent} contentClassName="" />
    </div>
  );
}