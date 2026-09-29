import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Kicker, Reveal } from "./primitives";

const GROUPS = [
  {
    name: "BUILD",
    tag: "LANGUAGES",
    techs: ["Java", "Python", "C++", "JavaScript", "SQL"],
  },
  {
    name: "SHIP",
    tag: "PRODUCT",
    techs: ["React", "Next.js", "REST APIs", "MySQL"],
  },
  {
    name: "THINK",
    tag: "AI / DATA",
    techs: [
      "Scikit-learn",
      "Pandas",
      "NumPy",
      "Feature Engineering",
      "Regression",
      "Classification",
      "LLM Integration",
    ],
  },
  {
    name: "FOUNDATION",
    tag: "CORE CS",
    techs: ["DSA", "OOP", "DBMS", "Operating Systems", "Computer Networks", "Cloud Computing"],
  },
];

const RELATED: Record<string, string[]> = {
  Java: ["OOP", "DSA", "MySQL", "SQL", "REST APIs"],
  Python: [
    "DSA",
    "Scikit-learn",
    "Pandas",
    "NumPy",
    "Regression",
    "Classification",
    "Feature Engineering",
    "LLM Integration",
  ],
  "C++": ["DSA", "OOP"],
  JavaScript: ["React", "Next.js", "REST APIs"],
  SQL: ["MySQL", "DBMS"],
  React: ["Next.js", "REST APIs", "JavaScript"],
  "Next.js": ["React", "REST APIs", "JavaScript"],
  "REST APIs": ["React", "Next.js", "JavaScript", "Python", "Computer Networks"],
  MySQL: ["SQL", "DBMS"],
  "Scikit-learn": ["Python", "Pandas", "NumPy", "Regression", "Classification"],
  Pandas: ["Python", "NumPy", "Scikit-learn", "Feature Engineering"],
  NumPy: ["Python", "Pandas", "Scikit-learn"],
  "Feature Engineering": ["Pandas", "NumPy", "Scikit-learn", "Regression", "Classification"],
  Regression: ["Scikit-learn", "NumPy", "Pandas", "Feature Engineering"],
  Classification: ["Scikit-learn", "Pandas", "NumPy", "Feature Engineering"],
  "LLM Integration": ["Python", "REST APIs"],
  DSA: ["Java", "C++", "Python", "OOP"],
  OOP: ["Java", "C++", "DSA"],
  DBMS: ["SQL", "MySQL"],
  "Operating Systems": ["Cloud Computing", "Computer Networks"],
  "Computer Networks": ["REST APIs", "Cloud Computing", "Operating Systems"],
  "Cloud Computing": ["Operating Systems", "Computer Networks"],
};

type Pt = { x: number; y: number };

export function Skills() {
  const [hover, setHover] = useState<string | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<string, HTMLElement | null>>({});
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [edges, setEdges] = useState<{ a: Pt; b: Pt }[]>([]);

  const measure = useCallback(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const box = wrap.getBoundingClientRect();
    setSize({ w: box.width, h: box.height });

    if (!hover) {
      setEdges([]);
      return;
    }
    const source = nodeRefs.current[hover];
    if (!source) {
      setEdges([]);
      return;
    }
    const center = (el: HTMLElement): Pt => {
      const r = el.getBoundingClientRect();
      return { x: r.left - box.left + r.width / 2, y: r.top - box.top + r.height / 2 };
    };
    const a = center(source);
    const next: { a: Pt; b: Pt }[] = [];
    for (const target of RELATED[hover] ?? []) {
      const el = nodeRefs.current[target];
      if (el) next.push({ a, b: center(el) });
    }
    setEdges(next);
  }, [hover]);

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const activeCount = hover ? (RELATED[hover]?.length ?? 0) : 0;

  return (
    <section className="relative py-32 md:py-44">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Kicker index="02" label="CAPABILITIES" />

        <Reveal className="mt-14">
          <h2 className="max-w-3xl font-display text-[clamp(1.7rem,3.4vw,2.8rem)] font-bold leading-[1.1] tracking-tight">
            AN ARSENAL, ORGANIZED BY{" "}
            <span className="font-editorial font-normal italic text-iris">how I use it.</span>
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
            Hover a technology — the map draws every connection it works with.
          </p>
        </Reveal>

        <div
          ref={wrapRef}
          className="relative mt-20"
          onMouseLeave={() => setHover(null)}
        >
          {/* Connection curves */}
          <svg
            className="pointer-events-none absolute inset-0 hidden md:block"
            width={size.w}
            height={size.h}
            viewBox={`0 0 ${size.w || 1} ${size.h || 1}`}
            aria-hidden
          >
            <defs>
              <linearGradient id="skill-edge" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="var(--emerald)" stopOpacity="0.85" />
                <stop offset="100%" stopColor="var(--champagne)" stopOpacity="0.5" />
              </linearGradient>
            </defs>
            {edges.map((e, i) => {
              const mx = (e.a.x + e.b.x) / 2;
              const dy = Math.abs(e.b.y - e.a.y);
              const c = Math.max(40, dy * 0.4);
              return (
                <path
                  key={i}
                  d={`M ${e.a.x} ${e.a.y} C ${mx} ${e.a.y - c}, ${mx} ${e.b.y + c}, ${e.b.x} ${e.b.y}`}
                  fill="none"
                  stroke="url(#skill-edge)"
                  strokeWidth="1"
                  className="skill-edge"
                />
              );
            })}
          </svg>

          <div className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {GROUPS.map((group, gi) => {
              const lit = group.techs.filter(
                (t) => hover === t || (hover ? (RELATED[hover]?.includes(t) ?? false) : false),
              ).length;
              return (
                <Reveal key={group.name} delay={0.08 * gi}>
                  <div
                    className={cn(
                      "group/card relative h-full overflow-hidden border border-line bg-surface/40 p-6 backdrop-blur-md transition-all duration-500",
                      "hover:border-iris/40 hover:bg-surface/60",
                      lit > 0 && "border-iris/35",
                    )}
                  >
                    <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-iris/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover/card:opacity-100" />
                    <div className="relative flex items-baseline justify-between">
                      <h3 className="flex items-baseline gap-3 text-[11px] tracking-[0.35em] text-muted-foreground">
                        <span className="font-display text-iris">
                          {String(gi + 1).padStart(2, "0")}
                        </span>
                        {group.name}
                      </h3>
                      <span
                        className={cn(
                          "text-[9px] tracking-[0.25em] transition-colors",
                          lit > 0 ? "text-glow" : "text-muted-foreground/50",
                        )}
                      >
                        {lit > 0 ? `${lit} LINKED` : group.tag}
                      </span>
                    </div>

                    <ul className="relative mt-6 flex flex-wrap gap-2">
                      {group.techs.map((tech) => {
                        const isSelf = hover === tech;
                        const isRelated = hover
                          ? (RELATED[hover]?.includes(tech) ?? false)
                          : false;
                        return (
                          <li key={tech}>
                            <span
                              ref={(el) => {
                                nodeRefs.current[tech] = el;
                              }}
                              onMouseEnter={() => setHover(tech)}
                              className={cn(
                                "inline-block cursor-default rounded-full border px-3 py-1.5 text-[13px] font-light transition-all duration-300",
                                !hover &&
                                  "border-line bg-background/30 text-foreground/80 hover:border-iris/50 hover:text-foreground",
                                hover &&
                                  isSelf &&
                                  "-translate-y-0.5 border-iris bg-iris/15 text-iris shadow-[0_0_20px_-4px_var(--emerald)]",
                                hover &&
                                  !isSelf &&
                                  isRelated &&
                                  "border-glow/50 bg-glow/10 text-glow",
                                hover &&
                                  !isSelf &&
                                  !isRelated &&
                                  "border-line/40 text-foreground/25",
                              )}
                            >
                              {tech}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        <p className="mt-8 h-4 text-[10px] tracking-[0.3em] text-muted-foreground">
          {hover ? `${hover.toUpperCase()} — ${activeCount} CONNECTIONS` : ""}
        </p>
      </div>
    </section>
  );
}
