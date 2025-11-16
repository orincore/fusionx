import Link from "next/link";
import Image from "next/image";
import logoWhite from "@/assets/logo/logo white.png";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-sm text-zinc-400 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-emerald-400/5 border border-emerald-400/40 shadow-[0_0_26px_rgba(34,197,94,0.75)] md:h-10 md:w-10">
            <Image
              src={logoWhite}
              alt="FusionX logo"
              fill
              className="object-contain"
            />
          </div>
          <p className="font-medium text-zinc-200">
            FusionX by GLITZFUSION
          </p>
        </div>
        <p className="mt-1 max-w-md text-xs text-zinc-500">
          Powered by ORINCORE Technologies
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="mailto:fusionx@glitzfusion.in"
            className="hover:text-emerald-300"
            aria-label="Email GlitzFusion"
          >
            fusionx@glitzfusion.in
          </Link>
          <span className="hidden h-4 w-px bg-zinc-700 md:inline" aria-hidden="true" />
          <div className="flex items-center gap-3">
            <Link
              href="https://www.instagram.com/fusionx_india"
              className="hover:text-emerald-300"
              aria-label="GlitzFusion on Instagram"
            >
              Instagram
            </Link>
            <Link
              href="https://youtube.com"
              className="hover:text-emerald-300"
              aria-label="GlitzFusion on YouTube"
            >
              YouTube
            </Link>
            <Link
              href="https://linkedin.com"
              className="hover:text-emerald-300"
              aria-label="GlitzFusion on LinkedIn"
            >
              LinkedIn
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
