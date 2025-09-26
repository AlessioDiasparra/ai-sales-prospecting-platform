"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Sparkles, LayoutDashboard, DollarSign } from "lucide-react";

export const FloatingSectionNav = () => {
  const [fixed, setFixed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const threshold = 240; // after hero
      setFixed(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "z-40 flex w-full justify-center",
        fixed ? "pointer-events-none fixed left-0 right-0 top-4" : "sticky top-2"
      )}
    >
      <nav
        aria-label="Section navigation"
        className={cn(
          "pointer-events-auto flex items-center gap-2 rounded-full border bg-background/95 px-2 py-1 text-sm shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/70",
          "ring-1 ring-border"
        )}
      >
        <Link
          href="#features"
          className="flex items-center gap-2 rounded-full px-3 py-2 transition hover:bg-accent"
        >
          <Sparkles className="h-4 w-4" /> <span>Features</span>
        </Link>
        <Link
          href="#dashboard"
          className="flex items-center gap-2 rounded-full px-3 py-2 transition hover:bg-accent"
        >
          <LayoutDashboard className="h-4 w-4" /> <span>Dashboard</span>
        </Link>
        <Link
          href="#pricing"
          className="flex items-center gap-2 rounded-full px-3 py-2 transition hover:bg-accent"
        >
          <DollarSign className="h-4 w-4" /> <span>Pricing</span>
        </Link>
      </nav>
    </div>
  );
};

export default FloatingSectionNav;