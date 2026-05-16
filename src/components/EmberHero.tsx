"use client";

import { useEffect, useRef } from "react";

/**
 * A single ember that breathes, with a few drifting sparks. 2D canvas — cheap,
 * cinematic, sets the parchment-warm tone of the page.
 */
export default function EmberHero() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let w = 0, h = 0, raf = 0, t = 0;
    type Spark = { x: number; y: number; vx: number; vy: number; life: number; max: number };
    let sparks: Spark[] = [];

    const resize = () => {
      w = c.clientWidth; h = c.clientHeight;
      c.width = Math.floor(w * dpr); c.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize); ro.observe(c);

    const spawn = () => {
      const cx = w / 2, cy = h * 0.62;
      sparks.push({
        x: cx + (Math.random() - 0.5) * 18,
        y: cy + (Math.random() - 0.5) * 6,
        vx: (Math.random() - 0.5) * 0.6,
        vy: -0.6 - Math.random() * 0.8,
        life: 0,
        max: 90 + Math.random() * 60,
      });
    };

    const loop = () => {
      raf = requestAnimationFrame(loop);
      t += 0.016;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2, cy = h * 0.62;

      // Outer glow halo — breathes
      const breathe = 0.85 + 0.15 * Math.sin(t * 1.4);
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 220 * breathe);
      g.addColorStop(0, "rgba(185,53,42,0.35)");
      g.addColorStop(0.3, "rgba(185,53,42,0.10)");
      g.addColorStop(1, "rgba(185,53,42,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // Inner core
      const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 36 * breathe);
      cg.addColorStop(0, "rgba(255,200,140,0.95)");
      cg.addColorStop(0.6, "rgba(216,124,72,0.65)");
      cg.addColorStop(1, "rgba(185,53,42,0)");
      ctx.fillStyle = cg;
      ctx.beginPath(); ctx.arc(cx, cy, 36 * breathe, 0, Math.PI * 2); ctx.fill();

      // Spark trails
      if (Math.random() < 0.55) spawn();
      sparks = sparks.filter(s => s.life < s.max);
      for (const s of sparks) {
        s.life += 1;
        s.x += s.vx;
        s.y += s.vy;
        s.vy -= 0.005;
        const a = (1 - s.life / s.max) * 0.85;
        ctx.fillStyle = `rgba(216,124,72,${a})`;
        ctx.beginPath(); ctx.arc(s.x, s.y, 1.2, 0, Math.PI * 2); ctx.fill();
      }
    };
    loop();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden />;
}
