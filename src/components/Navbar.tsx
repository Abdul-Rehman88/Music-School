"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";

export default function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("fixed top-10 inset-x-0  px-5 md:px-7.5  lg:px-12.5 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive} >
        {/* Home */}
        <MenuItem item="Home" href="/" setActive={setActive} active={active} />
        {/* Courses */}
        <MenuItem setActive={setActive} active={active} item="Our Courses">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/hobby">Basic Music Theory</HoveredLink>
            <HoveredLink href="/individual">Advanced Composition</HoveredLink>
            <HoveredLink href="/team">Songwriting</HoveredLink>
            <HoveredLink href="/enterprise">Music Production</HoveredLink>
          </div>
        </MenuItem>
        {/* Contact */}
        <MenuItem item="Contact" href="/contact" setActive={setActive} active={active} />
      </Menu>
      
    </div>
  );
}
