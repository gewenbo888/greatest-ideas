"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { IDEAS, EDGES, EPOCHS, EPOCH_ORDER, type Lang } from "@/lib/canon";

type Node = d3.SimulationNodeDatum & {
  id: string;
  epoch: keyof typeof EPOCH_ORDER;
  label: string;
};
type Link = d3.SimulationLinkDatum<Node>;

export default function LineageGraph({ lang }: { lang: Lang }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svgEl = ref.current!;
    const parent = svgEl.parentElement!;
    const svg = d3.select(svgEl);

    let w = parent.clientWidth;
    let h = parent.clientHeight;
    svg.attr("viewBox", `0 0 ${w} ${h}`);
    svg.selectAll("*").remove();

    const nodes: Node[] = IDEAS.map(i => ({
      id: i.id,
      epoch: i.epoch,
      label: i.name[lang],
    }));
    const links: Link[] = EDGES.map(e => ({ source: e.from, target: e.to }));

    // Epoch-tinted background bands
    const bands = svg.append("g").attr("class", "bands");
    const bandW = w / EPOCHS.length;
    bands.selectAll("rect")
      .data(EPOCHS)
      .enter()
      .append("rect")
      .attr("x", (_, i) => i * bandW)
      .attr("y", 0)
      .attr("width", bandW)
      .attr("height", h)
      .attr("fill", (d) => d.tint)
      .attr("opacity", 0.05);

    bands.selectAll("text")
      .data(EPOCHS)
      .enter()
      .append("text")
      .attr("x", (_, i) => i * bandW + 12)
      .attr("y", 22)
      .attr("font-family", "var(--font-mono)")
      .attr("font-size", 10)
      .attr("letter-spacing", "0.22em")
      .attr("text-transform", "uppercase")
      .attr("fill", (d) => d.tint)
      .attr("opacity", 0.85)
      .text((d) => (lang === "zh" ? d.label.zh : d.label.en).toUpperCase());

    // Arrow marker
    svg.append("defs").append("marker")
      .attr("id", "arr")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 10)
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-4L10,0L0,4")
      .attr("fill", "rgba(26,20,10,0.45)");

    const sim = d3.forceSimulation<Node>(nodes)
      .force("link", d3.forceLink<Node, Link>(links).id(d => d.id).distance(38).strength(0.55))
      .force("charge", d3.forceManyBody<Node>().strength(-110))
      .force("collide", d3.forceCollide<Node>(13))
      // pin x by epoch — graph reads left→right as time flows
      .force("x", d3.forceX<Node>(d => EPOCH_ORDER[d.epoch] * bandW + bandW * 0.5).strength(0.35))
      .force("y", d3.forceY<Node>(h * 0.55).strength(0.06))
      .alphaDecay(0.025);

    const linkSel = svg.append("g")
      .attr("stroke", "rgba(26,20,10,0.35)")
      .attr("fill", "none")
      .selectAll<SVGPathElement, Link>("path")
      .data(links)
      .enter().append("path")
      .attr("stroke-width", 0.6)
      .attr("marker-end", "url(#arr)")
      .attr("opacity", 0.55);

    const node = svg.append("g")
      .selectAll<SVGGElement, Node>("g")
      .data(nodes)
      .enter().append("g")
      .style("cursor", "grab")
      .call(d3.drag<SVGGElement, Node>()
        .on("start", (e, d) => { if (!e.active) sim.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y; })
        .on("drag",  (e, d) => { d.fx = e.x; d.fy = e.y; })
        .on("end",   (e, d) => { if (!e.active) sim.alphaTarget(0); d.fx = null; d.fy = null; })
      )
      .on("mouseenter", function() {
        d3.select(this).select("text").attr("opacity", 1);
        d3.select(this).select("circle.fill").attr("r", 5.5);
      })
      .on("mouseleave", function() {
        d3.select(this).select("text").attr("opacity", 0.65);
        d3.select(this).select("circle.fill").attr("r", 4);
      });

    node.append("circle")
      .attr("class", "halo")
      .attr("r", 9)
      .attr("fill", (d) => EPOCHS.find(e => e.key === d.epoch)!.tint)
      .attr("opacity", 0.15);

    node.append("circle")
      .attr("class", "fill")
      .attr("r", 4)
      .attr("fill", (d) => EPOCHS.find(e => e.key === d.epoch)!.tint)
      .attr("stroke", "#f0e9d7")
      .attr("stroke-width", 1.2);

    node.append("text")
      .attr("dy", "-0.9em")
      .attr("text-anchor", "middle")
      .attr("font-family", lang === "zh" ? "var(--font-zh)" : "var(--font-display)")
      .attr("font-style", lang === "zh" ? "normal" : "italic")
      .attr("font-size", 11)
      .attr("fill", "rgba(26,20,10,0.9)")
      .attr("opacity", 0.65)
      .text((d) => d.label);

    sim.on("tick", () => {
      linkSel.attr("d", (d) => {
        const s = d.source as Node, t = d.target as Node;
        const dx = (t.x! - s.x!) * 0.5;
        return `M${s.x},${s.y} C${s.x! + dx},${s.y} ${t.x! - dx},${t.y} ${t.x},${t.y}`;
      });
      node.attr("transform", (d) => `translate(${d.x},${d.y})`);
    });

    const onResize = () => {
      w = parent.clientWidth; h = parent.clientHeight;
      svg.attr("viewBox", `0 0 ${w} ${h}`);
      const newBandW = w / EPOCHS.length;
      bands.selectAll<SVGRectElement, typeof EPOCHS[number]>("rect")
        .attr("x", (_, i) => i * newBandW)
        .attr("width", newBandW)
        .attr("height", h);
      bands.selectAll<SVGTextElement, typeof EPOCHS[number]>("text")
        .attr("x", (_, i) => i * newBandW + 12);
      sim.force("x", d3.forceX<Node>(d => EPOCH_ORDER[d.epoch] * newBandW + newBandW * 0.5).strength(0.35))
         .force("y", d3.forceY<Node>(h * 0.55).strength(0.06))
         .alpha(0.4).restart();
    };
    const ro = new ResizeObserver(onResize); ro.observe(parent);

    return () => { sim.stop(); ro.disconnect(); };
  }, [lang]);

  return <svg ref={ref} className="w-full h-full block" role="img" aria-label="A force-directed lineage graph of the canon, flowing left to right by epoch." />;
}
