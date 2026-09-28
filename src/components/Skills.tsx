import { useState } from "react";
import { cn } from "@/lib/utils";
import { Kicker, Reveal } from "./primitives";

const GROUPS = [
  {
    name: "BUILD",
    techs: ["Java", "Python", "C++", "JavaScript", "SQL"],
  },
  {
    name: "SHIP",
    techs: ["React", "Next.js", "REST APIs", "MySQL"],
  },
  {
    name: "THINK",
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
    techs: ["DSA", "OOP", "DBMS", "Operating Systems", "Computer Networks", "Cloud Computing"],
  },
];

const RELATED: Record<string, string[]> = {
  Java: ["OOP", "DSA", "MySQL", "SQL", "REST APIs"],
  Python: ["DSA", "Scikit-learn", "Pandas", "NumPy", "Regression", "Classification", "Feature Engineering", "LLM Integration"],
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

export function Skills() {
  const [hover, setHover] = useState<string | null>(null);

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
            Hover a technology — the ones it works with light up.
          </p>
        </Reveal>

        <div className="mt-20 grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8" onMouseLeave={() => setHover(null)}>
          {GROUPS.map((group, gi) => (
            <Reveal key={group.name} delay={0.08 * gi}>
              <h3 className="flex items-baseline gap-3 text-[11px] tracking-[0.35em] text-muted-foreground">
                <span className="font-display text-iris">{String(gi + 1).padStart(2, "0")}</span>
                {group.name}
              </h3>
              <ul className="mt-6 space-y-3.5">
                {group.techs.map((tech) => {
                  const isSelf = hover === tech;
                  const isRelated = hover ? (RELATED[hover]?.includes(tech) ?? false) : false;
                  return (
                    <li key={tech}>
                      <span
                        onMouseEnter={() => setHover(tech)}
                        className={cn(
                          "inline-block cursor-default text-lg font-light transition-all duration-300",
                          !hover && "text-foreground/80 hover:text-foreground",
                          hover && isSelf && "translate-x-1.5 text-iris",
                          hover && !isSelf && isRelated && "text-glow",
                          hover && !isSelf && !isRelated && "text-foreground/20",
                        )}
                      >
                        {tech}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
