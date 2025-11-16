"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import logoWhite from "@/assets/logo/logo white.png";

const headerVariants = {
  hidden: { opacity: 0, y: -16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function Header() {
  const { scrollY } = useScroll();
  const logoScale = useTransform(scrollY, [0, 200], [1.4, 1.0]);

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-30"
      initial="hidden"
      animate="visible"
      variants={headerVariants}
    >
      <div className="mx-auto max-w-6xl px-4 pt-4 pb-3 md:pt-5 md:pb-4">
        <div
          className="mx-2 flex items-center justify-between rounded-[2rem] border border-white/10
                     bg-white/5/80 bg-gradient-to-r from-emerald-400/6 via-zinc-900/20 to-emerald-300/6
                     shadow-[0_6px_20px_rgba(0,0,0,0.45)] backdrop-blur-3xl"
        >
          <Link href="/" className="flex items-center gap-4 px-5 py-2" aria-label="FusionX home">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-emerald-400/15 border border-emerald-400/50 shadow-[0_0_26px_rgba(34,197,94,0.6)] md:h-12 md:w-12">
            <motion.div
              style={{ scale: logoScale }}
              className="relative h-full w-full"
            >
              <Image
                src={logoWhite}
                alt="FusionX logo"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
                GlitzFusion
              </p>
              <p className="text-balance text-sm font-medium text-zinc-100 md:text-base">
                FusionX Events
              </p>
            </div>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-6 text-sm text-zinc-200 md:flex pr-3">
          <Link
            href="#upcoming"
            className="transition hover:text-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            Upcoming
          </Link>
          <Link
            href="#past"
            className="transition hover:text-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            Past Events
          </Link>
          <Link
            href="/book"
            className="rounded-full border border-emerald-400/60 bg-emerald-400/10 px-4 py-1.5 text-sm font-medium text-emerald-300 shadow-[0_0_18px_rgba(34,197,94,0.45)] transition hover:bg-emerald-400/20"
          >
            Book FusionX
          </Link>
        </nav>
        </div>
      </div>
    </motion.header>
  );
}
