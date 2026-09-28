import { Kicker, Reveal } from "./primitives";

const ACHIEVEMENTS = [
  {
    place: "4TH",
    title: "GDG CODESPRINT 4.0",
    detail: "4th place among 200+ teams",
  },
  {
    place: "★",
    title: "SPARKLAB DESIGNATHON",
    detail: "Special Recognition",
  },
  {
    place: "+20%",
    title: "NMIT HACKS",
    detail: "Design Team Lead — improved participation by 20%",
  },
];

const CERTS = [
  "Full Stack Java Developer — Simplilearn",
  "Launchpad Enterprise Applications — PwC",
  "Operating Systems Basics — Cisco Networking Academy",
  "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
  "Artificial Intelligence: Concepts and Techniques — IISc Bangalore",
];

export function Proof() {
  return (
    <section className="relative py-32 md:py-44">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Kicker index="05" label="PROOF" />

        {/* Editorial achievement rows */}
        <div className="mt-16">
          {ACHIEVEMENTS.map((a, i) => (
            <Reveal key={a.title} delay={0.06 * i}>
              <div className="group grid gap-1 border-t border-line py-8 transition-colors last:border-b hover:bg-surface/40 md:grid-cols-12 md:items-baseline md:gap-4">
                <div className="font-display text-sm font-bold text-iris md:col-span-2">
                  {a.place}
                </div>
                <div className="font-display text-2xl font-bold tracking-tight transition-transform duration-300 group-hover:translate-x-2 md:col-span-5">
                  {a.title}
                </div>
                <div className="text-sm text-muted-foreground md:col-span-5 md:text-right">
                  {a.detail}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Credential strip */}
        <Reveal className="mt-24">
          <div className="text-[10px] tracking-[0.3em] text-muted-foreground">CERTIFICATIONS</div>
          <div className="relative mt-6 overflow-hidden border-y border-line py-6">
            <div className="marquee-track gap-0">
              {[0, 1].map((copy) => (
                <div key={copy} className="flex shrink-0" aria-hidden={copy === 1}>
                  {CERTS.map((c) => (
                    <span
                      key={`${copy}-${c}`}
                      className="flex items-center gap-3 whitespace-nowrap px-8 text-sm text-muted-foreground"
                    >
                      <span className="text-iris">✦</span>
                      {c}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Philosophy */}
        <Reveal className="mt-32 md:mt-44">
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
