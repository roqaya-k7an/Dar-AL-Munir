"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLang } from "@/lib/i18n/provider";
import { DarLogo, IIUILogo } from "@/components/ui/Logo";
import { SocialIcons } from "@/components/ui/Social";

export function Hero() {
  const { d, dir } = useLang();
  const [y, setY] = useState(0);
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;

  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="home" className="scroll-mt-24 px-4 pb-10 pt-6 sm:px-6 lg:pt-8">
      <div className="container-x !px-0">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative isolate overflow-hidden rounded-[28px] border border-white/50 shadow-glass-lg"
        >
          {/* Building photo inside the glass frame (parallax). Drops in
              /public/images/building.jpg automatically; falls back to the
              illustrated placeholder until then. */}
          <div
            className="absolute inset-0 -z-10"
            style={{ transform: `translateY(${y * 0.18}px) scale(1.12)` }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/building.jpg"
              alt="Dar Al Muneerah building"
              className="h-full w-full object-cover"
              onError={(e) => {
                const img = e.currentTarget as HTMLImageElement;
                if (!img.src.endsWith("building.svg"))
                  img.src = "/images/building.svg";
              }}
            />
          </div>

          {/* Frosted glass layer — clean, even blur over the whole cover */}
          <div className="absolute inset-0 -z-10 bg-emerald-deep/35 backdrop-blur-md" />
          {/* Soft directional tint for depth + text legibility */}
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(115deg,rgba(8,58,37,.82)_0%,rgba(11,93,59,.55)_50%,rgba(22,120,150,.30)_100%)]" />

          <div className="flex min-h-[80vh] flex-col justify-center p-6 sm:p-10 lg:p-14">
            <div className="max-w-2xl rounded-3xl border border-white/15 bg-white/10 p-8 shadow-glass-lg backdrop-blur-xl sm:p-10">
              <div className="mb-7 flex items-center gap-3">
                <div className="grid h-16 w-16 place-items-center rounded-2xl bg-white/92 shadow-glass-lg">
                  <DarLogo className="h-12 w-12" />
                </div>
                <div className="grid h-16 w-16 place-items-center rounded-2xl bg-white/92 shadow-glass-lg">
                  <IIUILogo className="h-12 w-12" />
                </div>
              </div>

              <span className="text-xs font-bold uppercase tracking-[0.28em] text-leaf/90">
                {d.hero.badge}
              </span>
              <h1 className="mt-3 font-display text-5xl leading-[1.05] text-white sm:text-6xl md:text-7xl">
                {d.hero.title}
              </h1>
              <p className="mt-3 font-display text-xl text-leaf/90 sm:text-2xl">
                {d.hero.subtitle}
              </p>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
                {d.hero.lead}
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link href="/register" className="btn-accent text-base">
                  {d.hero.getStarted}
                  <Arrow className="h-4 w-4" />
                </Link>
                <Link
                  href="/#about"
                  className="btn border border-white/30 bg-white/10 text-white backdrop-blur hover:bg-white/20"
                >
                  {d.hero.learnMore}
                </Link>
              </div>

              <div className="mt-10">
                <SocialIcons variant="light" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
