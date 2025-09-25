"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,_rgba(0,0,0,0.06),_transparent_60%)] dark:bg-[radial-gradient(60%_60%_at_50%_0%,_rgba(255,255,255,0.06),_transparent_60%)]" />
      <div className="mx-auto max-w-6xl px-4 py-20 sm:py-28 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl"
        >
          Lovable for <em className="italic">sales</em>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground"
        >
          Discover, enrich, and orchestrate outreach from LinkedIn, company websites, and Google Maps—
          all in one beautiful, fast workspace.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="mt-8 flex items-center justify-center gap-3"
        >
          <Button asChild size="lg">
            <Link href="/sign-up">Start for free</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/sign-in">Sign in</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;