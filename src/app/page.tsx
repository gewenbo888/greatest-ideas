"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import {
  IDEAS, EPOCHS, EPOCH_ORDER, STR, type EpochKey, type Lang,
} from "@/lib/canon";
import Chrome from "@/components/Chrome";
import IdeaCard from "@/components/IdeaCard";

const EmberHero    = dynamic(() => import("@/components/EmberHero"),    { ssr: false });
const LineageGraph = dynamic(() => import("@/components/LineageGraph"), { ssr: false });

export default function Page() {
  const [lang, setLang] = useState<Lang>("en");
  const [mode, setMode] = useState<"grid" | "graph">("grid");
  const [epoch, setEpoch] = useState<EpochKey | "all">("all");
  const fontZh = lang === "zh" ? "font-zh" : "";

  const ordered = useMemo(
    () => [...IDEAS].sort((a, b) =>
      EPOCH_ORDER[a.epoch] - EPOCH_ORDER[b.epoch] || a.year - b.year
    ),
    []
  );
  const visible = useMemo(
    () => (epoch === "all" ? ordered : ordered.filter(i => i.epoch === epoch)),
    [ordered, epoch]
  );
  const counts = useMemo(() => {
    const m: Record<string, number> = { all: IDEAS.length };
    for (const e of EPOCHS) m[e.key] = IDEAS.filter(i => i.epoch === e.key).length;
    return m;
  }, []);

  return (
    <main id="top" className="relative">
      <Chrome lang={lang} onLang={setLang} mode={mode} onMode={setMode} />

      {/* ───── HERO ─────────────────────────────────────────────── */}
      <section className="relative h-[100svh] min-h-[640px] overflow-hidden">
        <EmberHero />
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="text-center max-w-4xl relative">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.2 }}
              className={`font-mono text-[10px] tracking-cinema uppercase text-vermillion mb-7 ${fontZh}`}
            >
              {STR.hero.eyebrow[lang]}
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 0.5 }}
              className={`font-display ${fontZh} text-balance leading-[1.02] tracking-tight text-[clamp(2.4rem,7vw,6rem)]`}
            >
              <span className="block italic font-light">{STR.hero.line_a[lang]}</span>
              <span className="block italic font-medium">{STR.hero.line_b[lang]}</span>
              <span className="block italic font-light text-vermillion">{STR.hero.line_c[lang]}</span>
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 1.4 }}
              className="mt-10 flex flex-col items-center gap-3"
            >
              <div className="w-px h-12 bg-ink/30 animate-ember" />
              <div className={`font-mono text-[10px] tracking-cinema uppercase text-sepia ${fontZh}`}>
                ↓ {STR.hero.scroll[lang]}
              </div>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 1.8 }}
              className={`mt-12 ${fontZh} text-sepia italic max-w-xl mx-auto leading-relaxed`}
            >
              {STR.subtitle[lang]}
            </motion.p>
          </div>
        </div>
        {/* Folio marks in corners */}
        <div className="absolute top-24 left-6 folio">i</div>
        <div className="absolute bottom-6 right-6 folio">GEWENBO · 2026</div>
      </section>

      {/* ───── EPOCH FILTER RAIL (sticky in grid mode) ─────────── */}
      {mode === "grid" && (
        <section className="sticky top-[58px] z-40 bg-paper/90 backdrop-blur-md border-y border-ink/[0.10]">
          <div className="mx-auto max-w-7xl px-6 py-3 flex items-center gap-2 overflow-x-auto scroll-bar-hide">
            <button
              onClick={() => setEpoch("all")}
              className={`shrink-0 font-mono text-[11px] tracking-wide2 uppercase px-3 py-1.5 rounded-full transition ${
                epoch === "all" ? "bg-ink text-paper" : "text-sepia hover:text-ink"
              }`}
            >
              <span className={fontZh}>{STR.filter.all[lang]}</span>
              <sup className="opacity-60 ml-1.5">{counts.all}</sup>
            </button>
            <span className="rule-v self-stretch mx-1" />
            {EPOCHS.map((e) => (
              <button
                key={e.key}
                onClick={() => setEpoch(e.key)}
                className={`shrink-0 font-mono text-[11px] tracking-wide2 uppercase px-3 py-1.5 rounded-full transition ${
                  epoch === e.key
                    ? "bg-ink text-paper"
                    : "text-sepia hover:text-ink"
                }`}
                style={epoch === e.key ? { background: e.tint } : undefined}
              >
                <span className={fontZh}>{e.label[lang]}</span>
                <sup className="opacity-60 ml-1.5">{counts[e.key]}</sup>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* ───── GRID / GRAPH ─────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {mode === "grid" ? (
          <motion.section
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="relative mx-auto max-w-7xl px-6 md:px-10 pt-12 md:pt-16 pb-32"
          >
            {/* Epoch headers + cards interleaved when ALL */}
            {epoch === "all" ? (
              EPOCHS.map((e) => {
                const slice = ordered.filter(i => i.epoch === e.key);
                return (
                  <div key={e.key} className="mb-20">
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ duration: 0.7 }}
                      className="mb-10 flex items-baseline justify-between gap-6"
                    >
                      <div>
                        <div className="font-mono text-[10px] tracking-cinema uppercase" style={{ color: e.tint }}>
                          {EPOCH_ORDER[e.key] + 1} / 8 · <span className={fontZh}>{e.era[lang]}</span>
                        </div>
                        <h2 className={`font-display ${fontZh} italic text-balance text-[clamp(2rem,5vw,3.6rem)] leading-[1.04] mt-1 text-ink`}>
                          {e.label[lang]}
                        </h2>
                      </div>
                      <div className="folio shrink-0">№ {slice[0] && (ordered.findIndex(i => i.id === slice[0].id) + 1)}–{slice.length && (ordered.findIndex(i => i.id === slice[slice.length - 1].id) + 1)}</div>
                    </motion.div>
                    <div className="rule mb-10" />
                    <div className="grid md:grid-cols-2 gap-px bg-ink/[0.08]">
                      {slice.map((i) => (
                        <div key={i.id} id={i.id} className="bg-paper">
                          <IdeaCard idea={i} index={ordered.indexOf(i)} lang={lang} />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="grid md:grid-cols-2 gap-px bg-ink/[0.08]">
                {visible.map((i) => (
                  <div key={i.id} id={i.id} className="bg-paper">
                    <IdeaCard idea={i} index={ordered.indexOf(i)} lang={lang} />
                  </div>
                ))}
              </div>
            )}
          </motion.section>
        ) : (
          <motion.section
            key="graph"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="relative mx-auto max-w-7xl px-6 md:px-10 pt-12 md:pt-16 pb-32"
          >
            <div className="mb-8 max-w-3xl">
              <div className="font-mono text-[10px] tracking-cinema uppercase text-vermillion">
                ✦ {lang === "zh" ? "源流模式" : "Lineage mode"}
              </div>
              <h2 className={`font-display ${fontZh} italic text-balance text-[clamp(2rem,5vw,3.6rem)] leading-[1.04] mt-1 text-ink`}>
                {STR.graph.title[lang]}
              </h2>
              <p className={`${fontZh} mt-4 text-sepia leading-relaxed text-[1.05rem] text-pretty max-w-2xl`}>
                {STR.graph.sub[lang]}
              </p>
              <div className={`mt-3 font-mono text-[10px] tracking-wide2 uppercase text-mute`}>
                {STR.graph.legend[lang]}
              </div>
            </div>
            <div className="aspect-[16/10] w-full hairline rounded-md bg-page/30 overflow-hidden">
              <LineageGraph lang={lang} />
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ───── CLOSING ESSAY ──────────────────────────────────── */}
      <section className="relative bg-page/60 border-y border-ink/[0.10]">
        <div className="mx-auto max-w-3xl px-6 md:px-10 py-28 md:py-36">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.9 }}
          >
            <div className={`font-mono text-[10px] tracking-cinema uppercase text-vermillion mb-6 ${fontZh}`}>
              {STR.closing.eyebrow[lang]} · postscript
            </div>
            <h2 className={`font-display ${fontZh} italic text-balance text-[clamp(2.2rem,5.6vw,4.2rem)] leading-[1.04] text-ink`}>
              <span className="block">{STR.closing.title_a[lang]}</span>
              <span className="block text-vermillion">{STR.closing.title_b[lang]}</span>
            </h2>
            <div className="rule mt-10" />
            <p className={`${fontZh} dropcap mt-10 font-body text-ink/90 leading-[1.75] text-[1.12rem] text-pretty`}>
              {STR.closing.body[lang]}
            </p>
            <div className={`mt-10 font-display italic text-sepia ${fontZh}`}>
              {STR.closing.sign[lang]}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ───── FOOTER ─────────────────────────────────────────── */}
      <footer className="border-t border-ink/[0.10]">
        <div className="mx-auto max-w-7xl px-6 md:px-10 py-12 flex items-center justify-between flex-wrap gap-6">
          <div className={`${fontZh} text-sepia text-sm italic`}>
            {STR.footer.line[lang]}
          </div>
          <div className="text-[11px] font-mono uppercase tracking-wide2 text-sepia flex gap-5">
            <a href="https://psyverse.fun" className="hover:text-vermillion">Psyverse ↗</a>
            <a href="https://psyverse.fun/atlas.html" className="hover:text-vermillion">Atlas ↗</a>
            <a href="https://github.com/gewenbo888/greatest-ideas" className="hover:text-vermillion">Source ↗</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
