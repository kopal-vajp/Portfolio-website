import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { EASE, Kicker, Magnetic, Reveal } from "./primitives";

const EMAIL = "kopvajpayee777@gmail.com";

const SOCIALS = [
  { label: "LINKEDIN", href: "https://www.linkedin.com/in/kopal-vajpayee" },
  { label: "GITHUB", href: "https://github.com/kopal-vajp" },
  {
    label: "RESUME",
    href: "https://drive.google.com/file/d/1o3A6mcDTg8ISi1HKKalgxRtD5aSnpIEJ/view?usp=sharing",
  },
];

export function Contact() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <section id="contact" className="relative py-28 md:py-36">
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10">
        <Kicker index="06" label="CONTACT" />

        <div className="mt-12 text-center">
          <Reveal delay={0.08}>
            <h2 className="font-display text-[clamp(2.4rem,6.5vw,5.5rem)] font-extrabold leading-[1.02] tracking-tight text-foreground">
              HAVE SOMETHING
              <br />
              WORTH BUILDING?
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 font-editorial text-[clamp(2rem,5.5vw,4.5rem)] font-normal italic leading-tight text-iris">
              Let's make it real.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-14 flex flex-wrap items-center justify-center gap-4">
              <a
                href={`mailto:${EMAIL}`}
                className="border-b border-line pb-1 font-display text-lg font-semibold tracking-wide transition-colors hover:border-iris hover:text-iris md:text-2xl"
              >
                {EMAIL}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="rounded-full border border-line px-4 py-2 text-[10px] tracking-[0.25em] text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
              >
                COPY
              </button>
            </div>
          </Reveal>

          <Reveal delay={0.32}>
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              {SOCIALS.map((s) => (
                <Magnetic key={s.label} strength={0.35}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-[11px] tracking-[0.25em] text-foreground transition-colors hover:border-iris hover:shadow-[0_0_20px_-5px_var(--emerald)]"
                  >
                    {s.label}
                    <ArrowUpRight
                      size={13}
                      className="text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-iris"
                    />
                  </a>
                </Magnetic>
              ))}
            </div>
          </Reveal>
        </div>

        <footer className="mt-28 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6 text-[10px] tracking-[0.25em] text-muted-foreground">
          <span>© 2026 KOPAL VAJPAYEE</span>
          <span>BUILT WITH INTENT — BENGALURU, IN</span>
        </footer>
      </div>

      {/* Copied toast */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="fixed bottom-8 left-1/2 z-[95] -translate-x-1/2 border border-glow/40 bg-background/90 px-5 py-2.5 text-[11px] tracking-[0.2em] text-glow backdrop-blur-md"
          >
            COPIED ✓
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
