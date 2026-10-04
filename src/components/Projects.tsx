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
  codeUrl: string;
  liveUrl?: string;
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
  codeUrl,
  liveUrl,
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
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="group inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.25em] text-foreground transition-colors hover:text-iris"
              >
                VIEW PROJECT
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            )}
            <a
              href={codeUrl}
              target="_blank"
              rel="noreferrer noopener"
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
  const [score, setScore] = useState(92);
  const [scanning, setScanning] = useState(false);

  function triggerScan() {
    if (scanning) return;
    setScanning(true);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setScore(Math.floor(Math.random() * 8) + 91);
      if (step > 4) {
        clearInterval(interval);
        setScanning(false);
      }
    }, 250);
  }

  const bars = [
    { label: "SKILL MATCH", v: Math.min(100, score - 6) },
    { label: "KEYWORD DENSITY", v: Math.min(100, score - 14) },
    { label: "FORMATTING", v: Math.min(100, score + 3) },
  ];

  return (
    <div ref={ref} className="flex h-full flex-col justify-center gap-6 p-6 pt-10 md:p-8 md:pt-12">
      <div className="flex items-center justify-between">
        <span className="text-[10px] tracking-[0.25em] text-muted-foreground">
          RESUME.PDF — AI SCANNER
        </span>
        <button
          type="button"
          onClick={triggerScan}
          disabled={scanning}
          className="rounded-full border border-iris/50 bg-iris/10 px-3 py-1 text-[9px] tracking-[0.2em] text-iris transition-all hover:bg-iris hover:text-primary-foreground disabled:opacity-50"
        >
          {scanning ? "ANALYZING..." : "RE-SCAN RESUME ⚡"}
        </button>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative h-20 w-20">
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
              animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - score / 100) }}
              transition={{ duration: 0.8, ease: EASE }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center font-display text-xl font-extrabold text-foreground">
            {score}
          </div>
        </div>
        <div>
          <div className="text-[10px] tracking-[0.25em] text-muted-foreground">ATS SCORE</div>
          <div className="mt-1 font-display text-xs font-semibold text-glow">
            {scanning ? "SCANNING ENGINE..." : "+24 vs ORIGINAL RESUME"}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {bars.map((b, i) => (
          <div key={b.label}>
            <div className="flex justify-between text-[9px] tracking-[0.2em] text-muted-foreground">
              <span>{b.label}</span>
              <span>{b.v}%</span>
            </div>
            <div className="mt-1 h-px bg-line">
              <motion.div
                className="h-px bg-iris"
                animate={{ width: `${b.v}%` }}
                transition={{ duration: 0.6, ease: EASE }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-2 border-t border-line pt-3">
        {["Keywords matched 34/40", "Quantified impact detected", "All sections present"].map(
          (row) => (
            <div key={row} className="flex items-center gap-2 text-[10px] text-muted-foreground">
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
  { name: "SMS", conf: 96, payload: "Your verification code is 4417 — expires in 10 mins." },
  { name: "EMAIL", conf: 91, payload: "Weekly digest: 4 security alerts resolved automatically." },
  { name: "WHATSAPP", conf: 88, payload: "Flight BLR->DEL schedule confirmed for 08:30 AM." },
];

function MessageMindVisual() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  return (
    <div className="flex h-full flex-col justify-center gap-5 p-6 pt-10 md:p-8 md:pt-12">
      <div className="border border-line bg-background/40 p-3.5">
        <div className="flex justify-between text-[9px] tracking-[0.25em] text-muted-foreground">
          <span>INBOUND MESSAGE PAYLOAD</span>
          <span className="text-iris">CLICK CHANNEL TO TEST</span>
        </div>
        <div className="mt-1.5 min-h-[32px] text-xs font-light text-foreground">
          "{CHANNELS[active]?.payload}"
        </div>
      </div>

      <div className="relative flex flex-col items-center">
        <div className="relative h-6 w-px bg-line">
          <motion.span
            className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-glow"
            animate={{ y: [-4, 24], opacity: [0, 1, 0] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: "easeIn" }}
          />
        </div>
        <div className="relative flex h-12 w-12 rotate-45 items-center justify-center border border-iris">
          <div className="h-2 w-2 bg-iris" />
        </div>
        <div className="mt-2 text-[9px] tracking-[0.3em] text-iris">AI ROUTING ENGINE</div>
        <div className="mt-2 h-px w-full bg-line" />
      </div>

      <div className="grid grid-cols-3 gap-2">
        {CHANNELS.map((c, i) => {
          const isActive = active === i;
          return (
            <button
              key={c.name}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "border p-2.5 text-center transition-all duration-300",
                isActive ? "border-glow bg-glow/10 shadow-[0_0_15px_-4px_var(--champagne)]" : "border-line hover:border-foreground/30",
              )}
            >
              <div
                className={cn(
                  "text-[9px] tracking-[0.2em] transition-colors",
                  isActive ? "text-glow font-bold" : "text-muted-foreground/60",
                )}
              >
                {c.name}
              </div>
              <div className="mt-1.5 font-display text-xs font-bold text-foreground">
                {c.conf}% CONF
              </div>
            </button>
          );
        })}
      </div>

      <div className="text-center text-[9px] tracking-[0.25em] text-muted-foreground">
        OPTIMAL DELIVERABILITY → CONFIDENCE SCORE {CHANNELS[active]?.conf}%
      </div>
    </div>
  );
}

/* ---------------- 03 — Triplytics (route + prediction) ---------------- */

const ROUTES = [
  { from: "BLR", to: "DEL", base: 4200, scale: 5600 },
  { from: "BOM", to: "MAA", base: 3100, scale: 4400 },
];

function TriplyticsVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-30px" });
  const reduce = useReducedMotion();
  const [routeIdx, setRouteIdx] = useState(0);
  const [t, setT] = useState(35);

  const route = ROUTES[routeIdx]!;
  const fare = Math.round(route.base + (t / 100) * route.scale);
  const routePath = "M20,75 C140,10 260,10 380,75";

  return (
    <div ref={ref} className="flex h-full flex-col justify-center gap-5 p-6 pt-10 md:p-8 md:pt-12">
      <div className="flex items-center justify-between">
        <span className="text-[9px] tracking-[0.25em] text-muted-foreground">ROUTE MODEL</span>
        <div className="flex gap-2">
          {ROUTES.map((r, i) => (
            <button
              key={r.from + r.to}
              type="button"
              onClick={() => setRouteIdx(i)}
              className={cn(
                "rounded border px-2 py-0.5 text-[9px] tracking-[0.15em] transition-colors",
                i === routeIdx
                  ? "border-iris bg-iris/15 text-iris"
                  : "border-line text-muted-foreground hover:text-foreground",
              )}
            >
              {r.from}→{r.to}
            </button>
          ))}
        </div>
      </div>

      <div className="relative">
        <svg viewBox="0 0 400 100" className="h-20 w-full">
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
            transition={{ duration: 1.8, ease: EASE }}
          />
          <circle cx="20" cy="75" r="3.5" fill="var(--iris)" />
          <circle cx="380" cy="75" r="3.5" fill="var(--glow)" />
          <text x="14" y="94" fill="var(--muted-foreground)" fontSize="9" letterSpacing="2">
            {route.from}
          </text>
          <text x="366" y="94" fill="var(--muted-foreground)" fontSize="9" letterSpacing="2">
            {route.to}
          </text>
          {inView && !reduce && (
            <circle r="3" fill="var(--glow)">
              <animateMotion dur="3s" repeatCount="indefinite" path={routePath} />
            </circle>
          )}
        </svg>
      </div>

      <div className="border-t border-line pt-3">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-[9px] tracking-[0.25em] text-muted-foreground">
              PREDICTED FARE — {route.from} → {route.to}
            </div>
            <div className="mt-1 font-display text-3xl font-extrabold tabular-nums text-foreground">
              ₹{fare.toLocaleString("en-IN")}
            </div>
          </div>
          <div className="text-right text-[9px] leading-relaxed tracking-[0.15em] text-muted-foreground">
            R² 0.99
            <br />
            RANDOM FOREST
          </div>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={t}
          onChange={(e) => setT(Number(e.target.value))}
          className="fare-slider mt-4"
          aria-label="Departure timing"
        />
        <div className="mt-1.5 flex justify-between text-[9px] tracking-[0.2em] text-muted-foreground">
          <span>EARLY BOOKING</span>
          <span>LAST MINUTE</span>
        </div>
      </div>
    </div>
  );
}

/* ---------------- 04 — TaskPro (lifecycle) ---------------- */

const STAGES = [
  { name: "CREATED", note: "Task #142 — Auth & DB schema initialized" },
  { name: "ASSIGNED", note: "Assignee set: Kopal V." },
  { name: "IN PROGRESS", note: "Branch feat/auth merged to dev" },
  { name: "COMPLETED", note: "Code reviewed & merged → main" },
];

function TaskProVisual() {
  const [active, setActive] = useState(0);

  function nextStage() {
    setActive((a) => (a + 1) % STAGES.length);
  }

  return (
    <div className="flex h-full flex-col justify-center gap-6 p-6 pt-10 md:p-8 md:pt-12">
      <div className="flex justify-between text-[9px] tracking-[0.25em] text-muted-foreground">
        <span>TASK LIFECYCLE DEMO</span>
        <button
          type="button"
          onClick={nextStage}
          className="rounded border border-iris/40 bg-iris/10 px-2.5 py-0.5 text-[9px] text-iris transition-colors hover:bg-iris hover:text-primary-foreground"
        >
          NEXT STAGE →
        </button>
      </div>

      <div className="flex items-center justify-between gap-2">
        {STAGES.map((s, i) => {
          const done = i < active;
          const isActive = i === active;
          return (
            <button
              key={s.name}
              type="button"
              onClick={() => setActive(i)}
              className="flex flex-1 flex-col items-center gap-2 text-center focus:outline-none"
            >
              <div className="relative flex w-full items-center justify-center">
                <span
                  className={cn(
                    "h-3 w-3 shrink-0 rounded-full border transition-all duration-300",
                    done && "border-glow bg-glow/70",
                    isActive && "border-iris bg-iris shadow-[0_0_12px_var(--emerald)] scale-110",
                    !done && !isActive && "border-line bg-transparent",
                  )}
                />
              </div>
              <span
                className={cn(
                  "whitespace-nowrap text-[8px] tracking-[0.15em] transition-colors",
                  isActive ? "font-bold text-foreground" : done ? "text-muted-foreground" : "text-muted-foreground/40",
                )}
              >
                {s.name}
              </span>
            </button>
          );
        })}
      </div>

      <div className="border border-line bg-background/40 p-4">
        <div className="flex items-center justify-between">
          <span className="text-[9px] tracking-[0.25em] text-muted-foreground">TASK #142</span>
          <span
            className={cn(
              "rounded-full border px-2.5 py-0.5 text-[9px] tracking-[0.2em]",
              active === STAGES.length - 1 ? "border-glow text-glow" : "border-iris text-iris",
            )}
          >
            {STAGES[active]?.name}
          </span>
        </div>
        <div className="mt-2.5 text-xs font-light text-foreground">
          {STAGES[active]?.note}
        </div>
        <div className="mt-3.5 h-px bg-line">
          <motion.div
            className="h-px bg-iris"
            animate={{ width: `${((active + 1) / STAGES.length) * 100}%` }}
            transition={{ duration: 0.5, ease: EASE }}
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
    codeUrl: "https://github.com/kopal-vajp/PathPilot.git",
    liveUrl: "https://pathpilot-vert.vercel.app/",
  },
  {
    index: "02",
    title: "MESSAGEMIND AI",
    tagline: "Intelligent Multi-Channel Notification Platform",
    stack: ["Next.js", "React", "Python", "Scikit-learn", "Tailwind CSS"],
    description:
      "AI-driven notification intelligence that predicts message receptivity and routes each message across SMS, Email and WhatsApp — the right channel, at the right moment, with a confidence score.",
    visualLabel: "SCENE 02 — MESSAGE ROUTING",
    codeUrl: "https://github.com/kopal-vajp/K2R-Coders.git",
    liveUrl: "https://messageemind.vercel.app/",
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
    codeUrl:
      "https://github.com/Rishwik-Mishra/Triplytics-ML-Powered-Tourism-Trend-Price-Prediction-Platform.git",
  },
  {
    index: "04",
    title: "TASK PRO",
    tagline: "Role-Based Task Management System",
    stack: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
    description:
      "Task management platform with authentication, task assignment, full CRUD operations and a relational MySQL database design — an early system that taught me data modeling discipline.",
    visualLabel: "SCENE 04 — TASK LIFECYCLE",
    codeUrl: "https://github.com/kopal-vajp/Task-Pro.git",
    flip: true,
  },
];

export function Projects() {
  return (
    <section id="work" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Kicker index="03" label="SELECTED WORK" />

        <Reveal className="mt-10">
          <h2 className="max-w-3xl font-display text-[clamp(1.7rem,3.4vw,2.8rem)] font-bold leading-[1.1] tracking-tight">
            FOUR SYSTEMS,{" "}
            <span className="font-editorial font-normal italic text-iris">built end to end.</span>
          </h2>
        </Reveal>

        <div className="mt-16 space-y-28 md:space-y-36">
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
