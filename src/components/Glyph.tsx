"use client";

import { GlyphKind } from "@/lib/canon";

/** A small procedural emblem per idea-kind. Stroked, manuscript-style. */
export default function Glyph({ kind, color = "#1a140a" }: { kind: GlyphKind; color?: string }) {
  const c = color;
  return (
    <svg viewBox="0 0 48 48" className="w-full h-full" fill="none"
         stroke={c} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      {render(kind, c)}
    </svg>
  );
}

function render(k: GlyphKind, c: string) {
  switch (k) {
    case "flame":
      return (<>
        <path d="M24 8c4 6 8 8 8 16a8 8 0 1 1-16 0c0-5 3-7 5-12 1 3 3 3 3 8" />
        <circle cx="24" cy="34" r="1.4" fill={c} stroke="none" />
      </>);
    case "wave":
      return <path d="M4 24 q 6 -8 12 0 t 12 0 t 12 0 t 12 0" />;
    case "tally":
      return (<>
        <line x1="10" y1="14" x2="10" y2="34" />
        <line x1="16" y1="14" x2="16" y2="34" />
        <line x1="22" y1="14" x2="22" y2="34" />
        <line x1="28" y1="14" x2="28" y2="34" />
        <line x1="8"  y1="22" x2="32" y2="30" />
      </>);
    case "scroll":
      return (<>
        <path d="M10 12c0 4 0 24 0 24 8 0 14 0 22 0c2 0 4-2 4-4V12c0-2-2-4-4-4-8 0-14 0-22 0" />
        <line x1="14" y1="18" x2="28" y2="18" />
        <line x1="14" y1="24" x2="28" y2="24" />
        <line x1="14" y1="30" x2="22" y2="30" />
      </>);
    case "circle":
      return (<>
        <circle cx="24" cy="24" r="14" />
        <circle cx="24" cy="24" r="2" fill={c} stroke="none" />
      </>);
    case "lattice":
      return (<>
        <line x1="8"  y1="16" x2="40" y2="16" />
        <line x1="8"  y1="24" x2="40" y2="24" />
        <line x1="8"  y1="32" x2="40" y2="32" />
        <line x1="16" y1="8"  x2="16" y2="40" />
        <line x1="24" y1="8"  x2="24" y2="40" />
        <line x1="32" y1="8"  x2="32" y2="40" />
      </>);
    case "orbit":
      return (<>
        <circle cx="24" cy="24" r="3" fill={c} stroke="none" />
        <ellipse cx="24" cy="24" rx="16" ry="6" />
        <ellipse cx="24" cy="24" rx="6"  ry="16" transform="rotate(35 24 24)" />
      </>);
    case "atom":
      return (<>
        <circle cx="24" cy="24" r="2.5" fill={c} stroke="none" />
        <ellipse cx="24" cy="24" rx="16" ry="6"             />
        <ellipse cx="24" cy="24" rx="16" ry="6" transform="rotate(60  24 24)" />
        <ellipse cx="24" cy="24" rx="16" ry="6" transform="rotate(-60 24 24)" />
      </>);
    case "graph":
      return (<>
        <circle cx="12" cy="14" r="2.4" fill={c} stroke="none" />
        <circle cx="36" cy="14" r="2.4" fill={c} stroke="none" />
        <circle cx="24" cy="30" r="2.4" fill={c} stroke="none" />
        <circle cx="14" cy="38" r="2.4" fill={c} stroke="none" />
        <circle cx="38" cy="34" r="2.4" fill={c} stroke="none" />
        <line x1="12" y1="14" x2="36" y2="14" />
        <line x1="12" y1="14" x2="24" y2="30" />
        <line x1="36" y1="14" x2="24" y2="30" />
        <line x1="24" y1="30" x2="14" y2="38" />
        <line x1="24" y1="30" x2="38" y2="34" />
      </>);
    case "spiral":
      return <path d="M24 24 q 6 0 6 -6 q 0 -10 -10 -10 q -14 0 -14 14 q 0 18 18 18 q 22 0 22 -22" />;
    case "tape":
      return (<>
        <rect x="6" y="20" width="36" height="10" />
        <line x1="12" y1="20" x2="12" y2="30" />
        <line x1="18" y1="20" x2="18" y2="30" />
        <line x1="24" y1="20" x2="24" y2="30" />
        <line x1="30" y1="20" x2="30" y2="30" />
        <line x1="36" y1="20" x2="36" y2="30" />
        <circle cx="24" cy="25" r="1.2" fill={c} stroke="none" />
      </>);
    case "helix":
      return (<>
        <path d="M14 8 q 10 8 10 16 q 0 8 10 16" />
        <path d="M34 8 q -10 8 -10 16 q 0 8 -10 16" />
        <line x1="16" y1="14" x2="32" y2="14" />
        <line x1="16" y1="34" x2="32" y2="34" />
      </>);
    case "binary":
      return (<>
        <text x="8"  y="22" fontFamily="var(--font-mono)" fontSize="9" fill={c} stroke="none">01001</text>
        <text x="8"  y="32" fontFamily="var(--font-mono)" fontSize="9" fill={c} stroke="none">10110</text>
        <text x="8"  y="42" fontFamily="var(--font-mono)" fontSize="9" fill={c} stroke="none">11001</text>
      </>);
    case "key":
      return (<>
        <circle cx="14" cy="24" r="7" />
        <line x1="21" y1="24" x2="40" y2="24" />
        <line x1="32" y1="24" x2="32" y2="30" />
        <line x1="36" y1="24" x2="36" y2="32" />
      </>);
    case "compass":
      return (<>
        <circle cx="24" cy="24" r="14" />
        <polygon points="24,10 28,24 24,38 20,24" fill={c} stroke="none" />
      </>);
    case "prism":
      return (<>
        <polygon points="24,8 40,40 8,40" />
        <line x1="6"  y1="24" x2="16" y2="24" />
        <line x1="32" y1="20" x2="44" y2="14" />
        <line x1="33" y1="26" x2="44" y2="26" />
        <line x1="33" y1="32" x2="44" y2="36" />
      </>);
    case "lever":
      return (<>
        <line x1="6"  y1="36" x2="42" y2="14" />
        <polygon points="20,40 28,40 24,32" fill={c} stroke="none" />
        <rect x="4"  y="10" width="6" height="6" />
        <rect x="36" y="32" width="8" height="8" />
      </>);
    case "leaf":
      return (<>
        <path d="M10 38 q 0 -28 28 -28 q 0 28 -28 28 z" />
        <line x1="10" y1="38" x2="34" y2="14" />
      </>);
    case "tower":
      return (<>
        <rect x="18" y="14" width="12" height="26" />
        <polygon points="14,14 24,6 34,14" fill={c} stroke="none" />
        <line x1="18" y1="22" x2="30" y2="22" />
        <line x1="18" y1="30" x2="30" y2="30" />
      </>);
    case "eye":
      return (<>
        <path d="M6 24 q 18 -14 36 0 q -18 14 -36 0 z" />
        <circle cx="24" cy="24" r="4" />
        <circle cx="24" cy="24" r="1.2" fill={c} stroke="none" />
      </>);
    case "tree":
      return (<>
        <line x1="24" y1="42" x2="24" y2="22" />
        <line x1="24" y1="32" x2="14" y2="22" />
        <line x1="24" y1="32" x2="34" y2="22" />
        <line x1="24" y1="26" x2="18" y2="18" />
        <line x1="24" y1="26" x2="30" y2="18" />
        <line x1="14" y1="22" x2="10" y2="14" />
        <line x1="34" y1="22" x2="38" y2="14" />
      </>);
    case "matrix":
      return (<>
        {[10, 20, 30, 40].map(x => [10, 20, 30, 40].map(y => (
          <circle key={`${x}-${y}`} cx={x - 2} cy={y - 2} r={1.4} fill={c} stroke="none" />
        )))}
      </>);
    case "pulse":
      return <path d="M4 26 H 14 L 18 14 L 22 38 L 26 22 L 30 26 H 44" />;
    case "rosette":
      return (<>
        <circle cx="24" cy="24" r="5" />
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i / 8) * Math.PI * 2;
          return (
            <circle key={i} cx={24 + Math.cos(a) * 12} cy={24 + Math.sin(a) * 12} r="5" />
          );
        })}
      </>);
    case "arrow":
      return (<>
        <line x1="6" y1="24" x2="38" y2="24" />
        <polyline points="32,16 40,24 32,32" />
      </>);
    case "field":
      return (<>
        {Array.from({ length: 5 }).map((_, i) => (
          <path key={i} d={`M6 ${10 + i * 7} q 18 ${i % 2 ? -6 : 6} 36 0`} />
        ))}
      </>);
    case "wedge":
      return <polygon points="6,40 42,40 24,8" />;
    case "infinity":
      return <path d="M10 24 q 6 -10 14 0 q 8 10 14 0 q -6 -10 -14 0 q -8 10 -14 0 z" />;
  }
}
