"use client";

import { motion } from "framer-motion";
import { Idea, Lang, IDEAS_BY_ID, EDGES, EPOCHS, EPOCH_ORDER, STR, yearLabel } from "@/lib/canon";
import Glyph from "./Glyph";

type Props = { idea: Idea; index: number; lang: Lang };

export default function IdeaCard({ idea, index, lang }: Props) {
  const fontZh = lang === "zh" ? "font-zh" : "";
  const epoch  = EPOCHS.find(e => e.key === idea.epoch)!;
  const spawned = EDGES.filter(e => e.from === idea.id).map(e => IDEAS_BY_ID[e.to]);
  const from    = idea.from.map(id => IDEAS_BY_ID[id]).filter(Boolean);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-page/55 hover:bg-page/85 transition-colors duration-500 hairline rounded-md p-6 md:p-8 flex flex-col gap-5"
    >
      {/* Top row: folio + epoch */}
      <div className="flex items-baseline justify-between">
        <div className="folio">№ {String(index + 1).padStart(2, "0")} / 64</div>
        <div className={`text-[10px] uppercase tracking-cinema ${fontZh}`} style={{ color: epoch.tint }}>
          {epoch.label[lang]}
        </div>
      </div>

      {/* Glyph */}
      <div className="flex items-start gap-5">
        <div className="w-14 h-14 shrink-0 rounded-sm hairline bg-paper/60 p-2">
          <Glyph kind={idea.glyph} color={epoch.tint} />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className={`font-display ${fontZh} italic font-medium text-balance leading-[1.04] text-3xl md:text-[2.1rem] tracking-tight text-ink`}>
            {idea.name[lang]}
          </h3>
          <div className={`mt-1 ${lang === "zh" ? "font-zh" : "font-body"} text-sepia text-sm`}>
            {idea.by[lang]}<span className="text-mute"> · </span>{yearLabel(idea.year, lang)}
          </div>
        </div>
      </div>

      {/* The one-line claim */}
      <p className={`font-body ${fontZh} text-ink/90 leading-relaxed text-pretty text-[1.06rem] md:text-[1.13rem]`}>
        {idea.claim[lang]}
      </p>

      {/* Lineage chips */}
      <div className="mt-1 grid gap-2 text-[11px] font-mono uppercase tracking-wide2">
        {from.length > 0 && (
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span className="text-mute">{STR.card.descends[lang]} →</span>
            {from.map(a => (
              <a key={a.id} href={`#${a.id}`} className="text-sepia hover:text-vermillion transition-colors">
                <span className={lang === "zh" ? "font-zh" : ""}>{a.name[lang]}</span>
              </a>
            ))}
          </div>
        )}
        {spawned.length > 0 && (
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span className="text-mute">{STR.card.spawned[lang]} →</span>
            {spawned.map(s => (
              <a key={s.id} href={`#${s.id}`} className="text-vermillion hover:text-rouge transition-colors">
                <span className={lang === "zh" ? "font-zh" : ""}>{s.name[lang]}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
}
