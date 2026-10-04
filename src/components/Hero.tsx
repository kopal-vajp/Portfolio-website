import { useRef, useState, type MouseEvent as ReactMouseEvent, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import portrait from "@/assets/kopal-portrait.jpg";
import { EASE, Magnetic, TextScramble } from "./primitives";
import { ResumeModal } from "./ResumeModal";


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
  const [resumeOpen, setResumeOpen] = useState(false);

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

      <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-12 px-6 pb-20 md:px-10 lg:grid-cols-12 lg:gap-16 lg:pb-28">
        {/* Left ΓÇö type */}
        <motion.div style={{ y: titleY }} className="order-2 lg:order-1 lg:col-span-7">
          <h1 className="font-display text-[clamp(2.6rem,6.5vw,5.4rem)] font-extrabold leading-[0.98] tracking-[-0.02em]">
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
            className="mt-12 flex flex-wrap items-center gap-6 md:gap-8"
          >
            <Magnetic>
              <a
                href="#work"
                className="inline-flex items-center gap-3 bg-primary px-7 py-3.5 text-[11px] font-semibold tracking-[0.25em] text-primary-foreground transition-all duration-300 hover:bg-iris hover:shadow-[0_0_25px_-5px_var(--emerald)]"
              >
                VIEW WORK <span aria-hidden>Γåô</span>
              </a>
            </Magnetic>
            <Magnetic>
              <button
                type="button"
                onClick={() => setResumeOpen(true)}
                className="inline-flex items-center gap-3 border border-iris/60 bg-iris/10 px-7 py-3.5 text-[11px] font-semibold tracking-[0.25em] text-iris backdrop-blur-sm transition-colors hover:bg-iris hover:text-primary-foreground"
              >
                VIEW RESUME <span aria-hidden>Γåù</span>
              </button>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 border-b border-line pb-1 text-[11px] tracking-[0.25em] text-muted-foreground transition-colors hover:border-iris hover:text-foreground"
              >
                GET IN TOUCH{" "}
                <span aria-hidden className="transition-transform group-hover:translate-x-1">
                  ΓåÆ
                </span>
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>

        {/* Right ΓÇö portrait panel */}
        <motion.div style={{ y: portraitY }} className="relative order-1 lg:order-2 lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: EASE }}
          >
            <div
              ref={portraitRef}
              onMouseMove={onPortraitMove}
              onMouseLeave={onPortraitLeave}
              className="group/portrait relative aspect-[4/5] max-h-[60vh] overflow-hidden border border-line bg-surface lg:max-h-none"
            >
              <motion.div style={{ x: mx, y: my }} className="absolute -inset-6">
                <img
                  src={portrait}
                  alt="Portrait of Kopal Vajpayee"
                  width={1024}
                  height={1280}
                  className="h-full w-full object-cover object-top transition-transform duration-700 group-hover/portrait:scale-[1.02]"
                />
              </motion.div>
              {/* Subtle bottom gradient only behind text caption */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between border-t border-line/60 pt-3">
                <span className="text-[10px] tracking-[0.3em] text-foreground/80">
                  KOPAL VAJPAYEE
                </span>
                <span className="flex items-center gap-1.5 text-[9px] tracking-[0.2em] text-iris">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-iris" />
                  BENGALURU, IN
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Marquee ticker rail under hero */}
      <div className="border-y border-line/60 bg-surface/30 py-3.5 backdrop-blur-md">
        <div className="overflow-hidden">
          <div className="marquee-track flex gap-12 text-[10px] tracking-[0.3em] text-muted-foreground">
            {Array.from({ length: 2 }).map((_, idx) => (
              <div key={idx} className="flex gap-12">
                <span>Γ£ª AMAZON ML SUMMER SCHOOL 2025</span>
                <span>Γ£ª 9.73 CGPA AT NMIT BENGALURU</span>
                <span>Γ£ª ZANSHIN & SKILLCRAFT INTERN</span>
                <span>Γ£ª 480K+ DATA RECORDS PROCESSED</span>
                <span>Γ£ª 4 END-TO-END SYSTEMS SHIPPED</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </section>
  );
}
