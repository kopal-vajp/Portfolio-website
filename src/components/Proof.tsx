import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE, Kicker, Reveal } from "./primitives";

const ACHIEVEMENTS = [
  {
    place: "TOP",
    sub: "5%",
    title: "AMAZON ML SUMMER SCHOOL 2025",
    detail: "Selected for Amazon ML Summer School out of 60,000+ applicants",
  },
  { place: "4TH", title: "GDG CODESPRINT 4.0", detail: "4th place among 200+ teams" },
  { place: "★", title: "SPARKLAB DESIGNATHON", detail: "Special Recognition" },
  { place: "+20%", title: "NMIT HACKS", detail: "Design Team Lead — improved participation by 20%" },
];

const CERTS = [
  { issuer: "SIMPLILEARN", name: "Full Stack Java Developer" },
  { issuer: "PwC", name: "Launchpad Enterprise Applications" },
  { issuer: "CISCO", name: "Operating Systems Basics — Cisco Networking Academy" },
  { issuer: "ORACLE", name: "OCI 2025 Certified AI Foundations Associate" },
  { issuer: "IISc", name: "Artificial Intelligence: Concepts and Techniques — IISc Bangalore" },
  { issuer: "INFOSYS", name: "Programming using Java — Infosys Springboard" },
  { issuer: "SNOWFLAKE", name: "SnowPro Associate: Platform Certified" },
];

export function Proof() {
  const [active, setActive] = useState(0);
  const cert = CERTS[active]!;
  return (
    <section className="relative py-28 md:py-36">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Kicker index="05" label="PROOF" />

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          {/* Achievements */}
          <div className="space-y-4">
            <div className="text-[10px] tracking-[0.3em] text-muted-foreground">ACHIEVEMENTS</div>
            {ACHIEVEMENTS.map((a, i) => (
              <Reveal key={a.title} delay={0.06 * i}>
                <div className="group flex items-center gap-6 border border-line bg-surface/50 p-5 transition-colors hover:border-iris/60">
                  <div className="flex w-16 shrink-0 flex-col justify-center font-display">
                    {a.sub ? (
                      <>
                        <span className="text-[10px] font-bold tracking-[0.2em] text-iris/80 leading-tight">
                          {a.place}
                        </span>
                        <span className="text-xl font-extrabold text-iris leading-tight">
                          {a.sub}
                        </span>
                      </>
                    ) : (
                      <span className="text-xl font-extrabold text-iris">
                        {a.place}
                      </span>
                    )}
                  </div>
                  <div>
                    <div className="font-display text-lg font-bold tracking-tight">{a.title}</div>
                    <div className="mt-1 text-sm text-muted-foreground">{a.detail}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Certifications drawer */}
          <Reveal delay={0.1}>
            <div className="text-[10px] tracking-[0.3em] text-muted-foreground">
              CERTIFICATIONS — {CERTS.length}
            </div>
            <div className="mt-4 border border-line bg-surface/50 p-5">
              <div className="flex flex-wrap gap-2">
                {CERTS.map((c, i) => (
                  <button
                    key={c.issuer}
                    type="button"
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-[10px] tracking-[0.2em] transition-colors",
                      i === active
                        ? "border-iris bg-iris/15 text-iris"
                        : "border-line text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {c.issuer}
                  </button>
                ))}
              </div>
              <div className="relative mt-6 min-h-[120px] border-t border-line pt-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={cert.issuer}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35, ease: EASE }}
                  >
                    <div className="text-[10px] tracking-[0.3em] text-glow">✦ {cert.issuer}</div>
                    <div className="mt-3 font-display text-xl font-bold leading-snug tracking-tight md:text-2xl">
                      {cert.name}
                    </div>
                    <div className="mt-3 text-[10px] tracking-[0.25em] text-muted-foreground">
                      {String(active + 1).padStart(2, "0")} / {String(CERTS.length).padStart(2, "0")} — VERIFIED CREDENTIAL
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Philosophy */}
        <Reveal className="mt-24 md:mt-32">
          <blockquote className="mx-auto max-w-4xl text-center">
            <p className="font-display text-[clamp(1.6rem,3.6vw,3rem)] font-bold leading-[1.15] tracking-tight">
              "I DON'T JUST WANT TO MAKE THINGS WORK. I WANT TO{" "}
              <span className="font-editorial font-normal italic text-iris">understand</span>{" "}
              WHY THEY WORK."
            </p>
            <footer className="mt-8 text-[10px] tracking-[0.35em] text-muted-foreground">
              — PERSONAL PHILOSOPHY
            </footer>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
