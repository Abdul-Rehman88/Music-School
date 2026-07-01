"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";

export default function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div
      className={cn(
        "fixed top-10 inset-x-0 px-0 md:px-7.5 lg:px-12.5 max-w-2xl w-[90%] md:w-[80%] mx-auto z-50",
        className
      )}
    >
      <Menu setActive={setActive}>
        <MenuItem item="Home" href="/" setActive={setActive} active={active} />
        <MenuItem setActive={setActive} href="/courses" active={active} item="Our Courses">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/courses">Basic Music Theory</HoveredLink>
            <HoveredLink href="/courses">Advanced Composition</HoveredLink>
            <HoveredLink href="/courses">Songwriting</HoveredLink>
            <HoveredLink href="/courses">Music Production</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem item="Contact" href="/contact" setActive={setActive} active={active} />
      </Menu>
    </div>
  );
}