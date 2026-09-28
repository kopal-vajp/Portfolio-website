import { useRef, type MouseEvent as ReactMouseEvent, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import texture from "@/assets/hero-texture.jpg";
import { EASE, Magnetic } from "./primitives";

function MaskedLine({ children, delay }: { children: ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const mx = useSpring(px, { stiffness: 120, damping: 20 });
  const my = useSpring(py, { stiffness: 120, damping: 20 });

  function onPortraitMove(e: ReactMouseEvent<HTMLDivElement>) {
    if (reduce || !portraitRef.current) return;
    const rect = portraitRef.current.getBoundingClientRect();
    px.set(((e.clientX - (rect.left + rect.width / 2)) / rect.width) * 18);
    py.set(((e.clientY - (rect.top + rect.height / 2)) / rect.height) * 14);
  }

  function onPortraitLeave() {
    px.set(0);
    py.set(0);
  }

  return (
    <section id="top" ref={sectionRef} className="relative min-h-screen overflow-hidden pt-32 md:pt-36">
      {/* Vertical hairlines */}
      <div className="pointer-events-none absolute inset-0 mx-auto hidden max-w-[1400px] md:block">
        <div className="absolute left-[25%] top-0 h-full w-px bg-line/50" />
        <div className="absolute left-[50%] top-0 h-full w-px bg-line/50" />
        <div className="absolute left-[75%] top-0 h-full w-px bg-line/50" />
      </div>

      <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-16 px-6 pb-28 md:px-10 lg:grid-cols-12 lg:pb-36">
        {/* Left — type */}
        <motion.div style={{ y: titleY }} className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex items-center gap-4"
          >
            <span className="h-px w-10 bg-iris" />
            <span className="text-[11px] tracking-[0.35em] text-muted-foreground">
              COMPUTER SCIENCE × AI × SOFTWARE
            </span>
          </motion.div>

          <h1 className="mt-8 font-display text-[clamp(2.7rem,7.4vw,6.3rem)] font-extrabold leading-[0.95] tracking-tight">
            <MaskedLine delay={0.15}>KOPAL</MaskedLine>
            <MaskedLine delay={0.28}>
              VAJPAYEE<span className="text-iris">.</span>
            </MaskedLine>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
            className="mt-10 max-w-xl font-display text-xl font-bold uppercase leading-snug tracking-wide md:text-2xl"
          >
            I build software that solves{" "}
            <span className="font-editorial font-normal normal-case italic text-iris">
              real problems.
            </span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.62, ease: EASE }}
            className="mt-6 max-w-md leading-relaxed text-muted-foreground"
          >
            Computer Science undergraduate at NMIT building AI-powered applications,
            data-driven systems and full-stack products.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.74, ease: EASE }}
            className="mt-12 flex flex-wrap items-center gap-8"
          >
            <Magnetic>
              <a
                href="#work"
                className="inline-flex items-center gap-3 bg-primary px-7 py-3.5 text-[11px] font-semibold tracking-[0.25em] text-primary-foreground transition-colors hover:bg-iris hover:text-primary-foreground"
              >
                VIEW WORK <span aria-hidden>↓</span>
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 border-b border-line pb-1 text-[11px] tracking-[0.25em] text-muted-foreground transition-colors hover:border-iris hover:text-foreground"
              >
                GET IN TOUCH{" "}
                <span aria-hidden className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>

        {/* Right — portrait panel */}
        <motion.div style={{ y: portraitY }} className="relative lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: EASE }}
          >
            <div
              ref={portraitRef}
              onMouseMove={onPortraitMove}
              onMouseLeave={onPortraitLeave}
              className="relative aspect-[4/5] overflow-hidden border border-line bg-surface"
            >
              <motion.div style={{ x: mx, y: my }} className="absolute -inset-6">
                <img
                  src={texture}
                  alt="Abstract violet and cyan cinematic texture framing Kopal's portrait"
                  width={1024}
                  height={1280}
                  className="h-full w-full object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-iris/15 mix-blend-color" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 text-[10px] tracking-[0.3em] text-foreground/70">
                KOPAL VAJPAYEE — BENGALURU, IN
              </div>
              <div className="absolute right-4 top-4 border border-line bg-background/40 px-2 py-1 text-[9px] tracking-[0.25em] text-muted-foreground backdrop-blur-sm">
                EST. 2023 — 2027
              </div>
            </div>
          </motion.div>
          <div className="pointer-events-none absolute -right-3 top-0 hidden origin-top-right rotate-90 text-[10px] tracking-[0.4em] text-muted-foreground lg:block">
            PORTFOLIO — 2026
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
      >
        <span className="text-[9px] tracking-[0.4em] text-muted-foreground">SCROLL</span>
        <div className="h-10 w-px overflow-hidden bg-line">
          <motion.div
            className="h-1/2 w-px bg-iris"
            animate={reduce ? {} : { y: [-20, 40] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
