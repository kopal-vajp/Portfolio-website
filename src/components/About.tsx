import { Kicker, Reveal } from "./primitives";

const FACTS = [
  { label: "DEGREE", value: "B.E. Computer Science & Engineering" },
  { label: "INSTITUTION", value: "NMIT, Bengaluru" },
  { label: "YEARS", value: "2023 — 2027" },
  { label: "CGPA", value: "9.73 / 10.0" },
  { label: "BASED IN", value: "Bengaluru, India" },
];


export function About() {
  return (
    <section id="about" className="relative py-32 md:py-44">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Kicker index="01" label="ABOUT" />

        <div className="mt-16 grid gap-16 lg:grid-cols-12">
          <Reveal className="order-2 lg:order-1 lg:col-span-4">
            <dl>
              {FACTS.map((f) => (
                <div key={f.label} className="border-t border-line py-5 last:border-b">
                  <dt className="text-[10px] tracking-[0.3em] text-muted-foreground">
                    {f.label}
                  </dt>
                  <dd className="mt-2 font-display text-lg font-semibold">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <div className="order-1 lg:order-2 lg:col-span-7 lg:col-start-6">
            <Reveal>
              <h2 className="font-display text-[clamp(1.9rem,4vw,3.4rem)] font-bold leading-[1.08] tracking-tight">
                I LIKE TURNING{" "}
                <span className="font-editorial font-normal italic text-iris">
                  complex problems
                </span>{" "}
                INTO{" "}
                <span className="font-editorial font-normal italic text-glow">
                  simple products.
                </span>
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-8 max-w-lg leading-relaxed text-muted-foreground">
                From ML pipelines that chew through hundreds of thousands of records to
                full-stack platforms with real users — I care about the whole arc: the
                messy data, the architecture, and the moment it clicks for the person
                on the other side of the screen.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Editorial stats — large type, staggered baseline, no cards */}
        <div className="mt-28 grid grid-cols-2 gap-y-16 lg:grid-cols-4 lg:gap-x-8">
          {STATS.map((s, i) => (
            <Reveal
              key={s.label}
              delay={0.08 * i}
              className={i % 2 === 1 ? "lg:mt-14" : undefined}
            >
              <div className="font-display text-[clamp(2.2rem,4.6vw,3.9rem)] font-extrabold leading-none tracking-tight">
                <span className="tabular-nums">
                  {s.value.toFixed(s.decimals)}
                  <span className="text-iris">{s.suffix}</span>
                </span>
              </div>
              <div className="mt-3 text-[10px] tracking-[0.3em] text-muted-foreground">
                {s.label}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
