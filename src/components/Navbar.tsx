"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";

export default function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div
      className={cn(
        // On mobile: sit flush at top so it doesn't overlap the fixture hardware
        // On md+: float down with the original top-10 spacing
        "fixed top-10 inset-x-0 px-4 md:px-7.5 lg:px-12.5 max-w-2xl w-[85%] md:w-[80%]  mx-auto z-50",
        className
      )}
    >
      <Menu setActive={setActive}>
        <MenuItem item="Home" href="/" setActive={setActive} active={active} />
        <MenuItem setActive={setActive} active={active} item="Our Courses">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/hobby">Basic Music Theory</HoveredLink>
            <HoveredLink href="/individual">Advanced Composition</HoveredLink>
            <HoveredLink href="/team">Songwriting</HoveredLink>
            <HoveredLink href="/enterprise">Music Production</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem item="Contact" href="/contact" setActive={setActive} active={active} />
      </Menu>
    </div>
  );
}