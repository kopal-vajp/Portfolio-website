import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { CardTilt, EASE, Kicker, Reveal } from "./primitives";

/* ---------------- Scene shell ---------------- */

type SceneProps = {
  index: string;
  title: string;
  tagline: string;
  stack: string[];
  description: string;
  visualLabel: string;
  flip?: boolean;
  children?: React.ReactNode;
};

function Scene({
  index,
  title,
  tagline,
  stack,
  description,
  visualLabel,
  flip,
  children,
}: SceneProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const visualY = useTransform(scrollYProgress, [0, 1], [36, -36]);

  return (
    <div ref={ref} className="grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
      {/* Visual */}
      <div
        className={cn(
          "lg:col-span-6",
          flip ? "lg:order-2 lg:col-start-7" : "lg:order-1",
          "lg:sticky lg:top-24",
        )}
      >
        <motion.div style={{ y: visualY }}>
          <CardTilt>
            <div className="relative aspect-[4/3] w-full overflow-hidden border border-line bg-surface">
              <div className="absolute left-4 top-4 z-10 text-[9px] tracking-[0.3em] text-muted-foreground">
                {visualLabel}
              </div>
              {children}
            </div>
          </CardTilt>
        </motion.div>
      </div>

      {/* Text */}
      <div
        className={cn(
          "lg:col-span-5",
          flip ? "lg:order-1 lg:col-start-1" : "lg:order-2 lg:col-start-8",
        )}
      >
        <Reveal>
          <div className="font-display text-6xl font-extrabold text-foreground/10 md:text-7xl">
            {index}
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <h3 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">
            {title}
          </h3>
          <p className="mt-3 text-[11px] uppercase tracking-[0.25em] text-iris">{tagline}</p>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-7 max-w-md leading-relaxed text-muted-foreground">{description}</p>
        </Reveal>
        <Reveal delay={0.22}>
          <div className="mt-7 flex flex-wrap gap-2">
            {stack.map((s) => (
              <span
                key={s}
                className="rounded-full border border-line px-3 py-1 text-[10px] tracking-[0.15em] text-muted-foreground"
              >
                {s}
              </span>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.28}>
          <div className="mt-10 flex flex-wrap gap-8">
            <a
              href="#"
              className="group inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.25em] text-foreground transition-colors hover:text-iris"
            >
              VIEW PROJECT
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
            <a
              href="#"
              className="group inline-flex items-center gap-2 text-[11px] tracking-[0.25em] text-muted-foreground transition-colors hover:text-foreground"
            >
              SOURCE CODE
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

/* ---------------- 01 — PathPilot (ATS analysis) ---------------- */

function PathPilotVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const shown = inView && !reduce;
  const bars = [
    { label: "SKILL MATCH", v: 86 },
    { label: "KEYWORD DENSITY", v: 74 },
    { label: "FORMATTING", v: 95 },
  ];

  return (
    <div ref={ref} className="flex h-full flex-col justify-center gap-7 p-8 pt-12 md:p-10 md:pt-14">
      <div className="flex items-center justify-between">
        <span className="text-[10px] tracking-[0.25em] text-muted-foreground">
          RESUME.PDF — ANALYSIS
        </span>
        <span className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-glow">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-glow" />
          LIVE
        </span>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative h-24 w-24">
          <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
            <circle cx="50" cy="50" r="42" fill="none" stroke="var(--line)" strokeWidth="4" />
            <motion.circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="var(--iris)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 42}
              initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
              animate={shown ? { strokeDashoffset: 2 * Math.PI * 42 * (1 - 0.92) } : {}}
              transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center font-display text-xl font-extrabold">
            92
          </div>
        </div>
        <div>
          <div className="text-[10px] tracking-[0.25em] text-muted-foreground">ATS SCORE</div>
          <div className="mt-1 font-display text-sm font-semibold text-glow">
            +24 vs ORIGINAL
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {bars.map((b, i) => (
          <div key={b.label}>
            <div className="flex justify-between text-[9px] tracking-[0.2em] text-muted-foreground">
              <span>{b.label}</span>
              <span>{b.v}%</span>
            </div>
            <div className="mt-1.5 h-px bg-line">
              <motion.div
                className="h-px bg-iris"
                initial={{ width: 0 }}
                animate={shown ? { width: `${b.v}%` } : {}}
                transition={{ duration: 1.1, ease: EASE, delay: 0.4 + 0.15 * i }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-2 border-t border-line pt-4">
        {["Keywords matched 34/40", "Quantified impact detected", "All sections present"].map(
          (row) => (
            <div key={row} className="flex items-center gap-2.5 text-[11px] text-muted-foreground">
              <Check size={12} className="text-glow" />
              {row}
            </div>
          ),
        )}
      </div>
    </div>
  );
}

/* ---------------- 02 — MessageMind (routing) ---------------- */

const CHANNELS = [
  { name: "SMS", conf: 96 },
  { name: "EMAIL", conf: 91 },
  { name: "WHATSAPP", conf: 88 },
];

function MessageMindVisual() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(1);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setActive((a) => (a + 1) % CHANNELS.length), 2400);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <div className="flex h-full flex-col justify-center gap-6 p-8 pt-12 md:p-10 md:pt-14">
      <div className="border border-line p-4">
        <div className="text-[9px] tracking-[0.25em] text-muted-foreground">INBOUND MESSAGE</div>
        <div className="mt-1.5 text-sm font-light">
          "Your verification code is 4417 — expires in 10 minutes."
        </div>
      </div>

      <div className="relative flex flex-col items-center">
        {reduce ? (
          <div className="h-8 w-px bg-line" />
        ) : (
          <div className="relative h-8 w-px bg-line">
            <motion.span
              className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-glow"
              animate={{ y: [-4, 30], opacity: [0, 1, 0] }}
              transition={{ duration: 1.1, repeat: Infinity, ease: "easeIn" }}
            />
          </div>
        )}
        <div className="relative flex h-14 w-14 rotate-45 items-center justify-center border border-iris">
          <div className="h-2 w-2 bg-iris" />
          {!reduce && (
            <motion.div
              className="absolute inset-0 border border-iris"
              animate={{ scale: [1, 1.7], opacity: [0.6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
            />
          )}
        </div>
        <div className="mt-3 text-[9px] tracking-[0.3em] text-iris">INTELLIGENCE CORE</div>
        <div className="mt-3 h-px w-full bg-line" />
      </div>

      <div className="grid grid-cols-3 gap-3">
        {CHANNELS.map((c, i) => {
          const isActive = active === i;
          return (
            <div
              key={c.name}
              className={cn(
                "border p-3 text-center transition-colors duration-500",
                isActive ? "border-glow" : "border-line",
              )}
            >
              <div
                className={cn(
                  "text-[10px] tracking-[0.2em] transition-colors duration-500",
                  isActive ? "text-glow" : "text-muted-foreground/40",
                )}
              >
                {c.name}
              </div>
              <div className="mt-2 h-4">
                <AnimatePresence mode="wait">
                  {isActive && (
                    <motion.div
                      key={c.conf}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.3 }}
                      className="font-display text-xs font-bold text-foreground"
                    >
                      {c.conf}%
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center text-[9px] tracking-[0.25em] text-muted-foreground">
        RECEPTIVITY PREDICTION → OPTIMAL CHANNEL
      </div>
    </div>
  );
}

/* ---------------- 03 — Triplytics (route + prediction) ---------------- */

function TriplyticsVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const [t, setT] = useState(35);
  const fare = Math.round(4200 + (t / 100) * 5600);
  const routePath = "M20,90 C140,10 260,10 380,90";

  return (
    <div ref={ref} className="flex h-full flex-col justify-center gap-6 p-8 pt-12 md:p-10 md:pt-14">
      <div className="relative">
        <svg viewBox="0 0 400 120" className="h-28 w-full">
          <path
            d={routePath}
            fill="none"
            stroke="var(--line)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <motion.path
            d={routePath}
            fill="none"
            stroke="var(--iris)"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            animate={inView && !reduce ? { pathLength: 1 } : {}}
            transition={{ duration: 2, ease: EASE }}
          />
          <circle cx="20" cy="90" r="3.5" fill="var(--iris)" />
          <circle cx="380" cy="90" r="3.5" fill="var(--glow)" />
          <text x="20" y="112" fill="var(--muted-foreground)" fontSize="9" letterSpacing="2">
            BLR
          </text>
          <text x="358" y="112" fill="var(--muted-foreground)" fontSize="9" letterSpacing="2">
            DEL
          </text>
          {inView && !reduce && (
            <circle r="3" fill="var(--glow)">
              <animateMotion dur="3s" repeatCount="indefinite" path={routePath} />
            </circle>
          )}
        </svg>
      </div>

      <div className="border-t border-line pt-5">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-[9px] tracking-[0.25em] text-muted-foreground">
              PREDICTED FARE — BLR → DEL
            </div>
            <div className="mt-1 font-display text-4xl font-extrabold tabular-nums">
              ₹{fare.toLocaleString("en-IN")}
            </div>
          </div>
          <div className="text-right text-[9px] leading-relaxed tracking-[0.15em] text-muted-foreground">
            R² 0.99
            <br />
            RANDOM FOREST
            <br />
            480K+ RECORDS
          </div>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={t}
          onChange={(e) => setT(Number(e.target.value))}
          className="fare-slider mt-5"
          aria-label="Departure timing"
        />
        <div className="mt-2 flex justify-between text-[9px] tracking-[0.2em] text-muted-foreground">
          <span>BOOKING FAR AHEAD</span>
          <span>LAST MINUTE</span>
        </div>
      </div>
    </div>
  );
}

/* ---------------- 04 — TaskPro (lifecycle) ---------------- */

const STAGES = [
  { name: "CREATED", note: "Task #142 — Auth flow" },
  { name: "ASSIGNED", note: "Owner set — Kopal V." },
  { name: "IN PROGRESS", note: "Branch feat/auth opened" },
  { name: "COMPLETED", note: "Merged → main" },
];

function TaskProVisual() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setActive((a) => (a + 1) % STAGES.length), 1600);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <div className="flex h-full flex-col justify-center gap-10 p-8 pt-12 md:p-10 md:pt-14">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        {STAGES.map((s, i) => {
          const done = i < active;
          const isActive = i === active;
          return (
            <div key={s.name} className="flex flex-1 items-center gap-3 sm:flex-col sm:items-start">
              <div className="flex items-center gap-3 sm:w-full">
                <span
                  className={cn(
                    "h-2.5 w-2.5 shrink-0 rounded-full border transition-all duration-500",
                    done && "border-glow bg-glow/70",
                    isActive && "border-iris bg-iris shadow-[0_0_12px_var(--iris)]",
                    !done && !isActive && "border-line bg-transparent",
                  )}
                />
                <div className="h-px flex-1 bg-line sm:w-full sm:flex-1">
                  {i < STAGES.length - 1 && (
                    <div
                      className={cn(
                        "h-px bg-iris transition-all duration-700",
                        i < active ? "w-full" : "w-0",
                      )}
                    />
                  )}
                </div>
              </div>
              <span
                className={cn(
                  "whitespace-nowrap text-[9px] tracking-[0.2em] transition-colors duration-500 sm:mt-2",
                  isActive ? "text-foreground" : done ? "text-muted-foreground" : "text-muted-foreground/40",
                )}
              >
                {s.name}
              </span>
            </div>
          );
        })}
      </div>

      <div className="border border-line p-5">
        <div className="flex items-center justify-between">
          <span className="text-[9px] tracking-[0.25em] text-muted-foreground">TASK #142</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={STAGES[active]?.name ?? ""}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25 }}
              className={cn(
                "rounded-full border px-2.5 py-0.5 text-[9px] tracking-[0.2em]",
                active === STAGES.length - 1
                  ? "border-glow text-glow"
                  : "border-iris text-iris",
              )}
            >
              {STAGES[active]?.name}
            </motion.span>
          </AnimatePresence>
        </div>
        <div className="mt-3 h-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={STAGES[active]?.note ?? ""}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="text-sm font-light text-foreground/80"
            >
              {STAGES[active]?.note}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mt-4 h-px bg-line">
          <motion.div
            className="h-px bg-iris"
            animate={{ width: `${((active + 1) / STAGES.length) * 100}%` }}
            transition={{ duration: 0.6, ease: EASE }}
          />
        </div>
      </div>
    </div>
  );
}

/* ---------------- Section ---------------- */

const PROJECTS: SceneProps[] = [
  {
    index: "01",
    title: "PATHPILOT",
    tagline: "AI-Powered Placement Preparation Platform",
    stack: ["Next.js", "PostgreSQL", "Prisma", "Gemini API", "Clerk", "Inngest"],
    description:
      "Full-stack AI platform combining ATS analysis, AI resume improvement, personalized cover letters, interview assessments and industry insights — one pipeline from raw resume to interview-ready.",
    visualLabel: "SCENE 01 — ATS ANALYSIS",
  },
  {
    index: "02",
    title: "MESSAGEMIND AI",
    tagline: "Intelligent Multi-Channel Notification Platform",
    stack: ["Next.js", "React", "Python", "Scikit-learn", "Tailwind CSS"],
    description:
      "AI-driven notification intelligence that predicts message receptivity and routes each message across SMS, Email and WhatsApp — the right channel, at the right moment, with a confidence score.",
    visualLabel: "SCENE 02 — MESSAGE ROUTING",
    flip: true,
  },
  {
    index: "03",
    title: "TRIPLYTICS",
    tagline: "ML-Powered Tourism Trend & Price Prediction",
    stack: ["Python", "Scikit-learn", "Pandas", "NumPy", "FastAPI", "Streamlit"],
    description:
      "Preprocessing and feature-engineering pipelines over 480K+ flight and train records, with Random Forest regression models achieving R² up to 0.99. Drag the slider — the model answers.",
    visualLabel: "SCENE 03 — FARE PREDICTION",
  },
  {
    index: "04",
    title: "TASK PRO",
    tagline: "Role-Based Task Management System",
    stack: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
    description:
      "Task management platform with authentication, task assignment, full CRUD operations and a relational MySQL database design — an early system that taught me data modeling discipline.",
    visualLabel: "SCENE 04 — TASK LIFECYCLE",
    flip: true,
  },
];

export function Projects() {
  return (
    <section id="work" className="relative py-32 md:py-44">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Kicker index="03" label="SELECTED WORK" />

        <Reveal className="mt-14">
          <h2 className="max-w-3xl font-display text-[clamp(1.7rem,3.4vw,2.8rem)] font-bold leading-[1.1] tracking-tight">
            FOUR SYSTEMS,{" "}
            <span className="font-editorial font-normal italic text-iris">built end to end.</span>
          </h2>
        </Reveal>

        <div className="mt-24 space-y-32 md:space-y-44">
          {PROJECTS.map((p) => (
            <Scene key={p.index} {...p}>
              {p.index === "01" && <PathPilotVisual />}
              {p.index === "02" && <MessageMindVisual />}
              {p.index === "03" && <TriplyticsVisual />}
              {p.index === "04" && <TaskProVisual />}
            </Scene>
          ))}
        </div>
      </div>
    </section>
  );
}
