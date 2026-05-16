"use client";

import { useEffect, useState } from "react";
import { STR, type Lang } from "@/lib/canon";

type Props = { lang: Lang; onLang: (l: Lang) => void; mode: "grid" | "graph"; onMode: (m: "grid" | "graph") => void };

export default function Chrome({ lang, onLang, mode, onMode }: Props) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const s = () => setScrolled(window.scrollY > 40);
    s();
    window.addEventListener("scroll", s, { passive: true });
    return () => window.removeEventListener("scroll", s);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2 backdrop-blur-md bg-paper/80 border-b border-ink/[0.08]" : "py-4"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3">
          <span className="relative inline-flex w-6 h-6 items-center justify-center">
            <span className="absolute inset-0 rounded-full bg-vermillion/15 animate-ember" />
            <span className="w-2 h-2 rounded-full bg-vermillion" />
          </span>
          <span className={`font-display italic text-[15px] tracking-tight ${lang === "zh" ? "font-zh" : ""}`}>
            {STR.brand[lang]}
          </span>
        </a>

        <div className="hidden md:flex items-center gap-1 font-mono text-[11px] tracking-wide2 uppercase">
          <button
            onClick={() => onMode("grid")}
            className={`px-3 py-1.5 rounded-full transition ${mode === "grid" ? "bg-ink text-paper" : "text-sepia hover:text-ink"}`}
          >
            <span className={lang === "zh" ? "font-zh" : ""}>{STR.ui.grid[lang]}</span>
          </button>
          <button
            onClick={() => onMode("graph")}
            className={`px-3 py-1.5 rounded-full transition ${mode === "graph" ? "bg-ink text-paper" : "text-sepia hover:text-ink"}`}
          >
            <span className={lang === "zh" ? "font-zh" : ""}>{STR.ui.graph[lang]}</span>
          </button>
        </div>

        <button
          onClick={() => onLang(lang === "en" ? "zh" : "en")}
          className="font-mono text-[11px] tracking-wide2 uppercase border border-ink/15 hover:border-vermillion hover:text-vermillion transition px-3 py-1.5 rounded-full"
          aria-label="Toggle language"
        >
          {STR.ui.lang[lang]}
        </button>
      </div>
    </header>
  );
}
