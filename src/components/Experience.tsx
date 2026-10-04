import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { CardTilt, Kicker, Reveal } from "./primitives";

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 55%"],
  });

  return (
    <section id="experience" className="relative py-32 md:py-44">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Kicker index="04" label="EXPERIENCE" />

        <div ref={ref} className="relative mt-16 pl-8 md:pl-14">
          {/* Timeline rail */}
          <div className="absolute left-0 top-0 h-full w-px bg-line" />
          <motion.div
            className="absolute left-0 top-0 h-full w-px origin-top bg-iris"
            style={{ scaleY: scrollYProgress }}
          />

          <Reveal>
            <CardTilt max={5} className="max-w-3xl">
              <div className="border border-line bg-surface/60 p-6 backdrop-blur-sm md:p-10">
                <div className="text-[10px] tracking-[0.3em] text-iris">MAY 2026 — AUG 2026</div>
                <h3 className="mt-4 font-display text-3xl font-bold tracking-tight md:text-4xl">
                  ZANSHIN SYSTEMS
                </h3>
                <p className="mt-2 text-muted-foreground">
                  AI & Product Development Intern
                </p>
                <ul className="mt-8 space-y-6">
                  <li className="flex gap-5">
                    <span className="mt-3 h-px w-8 shrink-0 bg-glow/70" />
                    <p className="leading-relaxed text-muted-foreground">
                      Built a cross-browser extension with a serverless FastAPI proxy for
                      resume parsing and ATS data ingestion — extension on the front,
                      clean ingestion pipeline behind it.
                    </p>
                  </li>
                  <li className="flex gap-5">
                    <span className="mt-3 h-px w-8 shrink-0 bg-glow/70" />
                    <p className="leading-relaxed text-muted-foreground">
                      Designed AI interview preparation workflows: resume–JD analysis,
                      automated question generation and candidate evaluation.
                    </p>
                  </li>
                </ul>
              </div>
            </CardTilt>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-14 border-t border-line pt-6 text-[10px] tracking-[0.3em] text-muted-foreground">
              MORE TIMELINE ENTRIES LOADING IN REAL TIME — AS THEY HAPPEN.
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
