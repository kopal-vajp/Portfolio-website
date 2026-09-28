import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE } from "./primitives";

const LINKS = [
  { label: "WORK", href: "#work" },
  { label: "ABOUT", href: "#about" },
  { label: "EXPERIENCE", href: "#experience" },
  { label: "CONTACT", href: "#contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
          scrolled
            ? "border-b border-line bg-background/80 backdrop-blur-md"
            : "border-b border-transparent",
        )}
      >
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-6 py-4 md:px-10">
          <a
            href="#top"
            className="font-display text-sm font-bold tracking-[0.2em] text-foreground"
          >
            KOPAL<span className="text-iris"> / </span>KV
          </a>

          <div className="hidden items-center gap-8 lg:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[11px] tracking-[0.25em] text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-full border border-line px-3 py-1.5 sm:flex">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-glow opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-glow" />
              </span>
              <span className="text-[10px] tracking-[0.2em] text-muted-foreground">
                OPEN TO OPPORTUNITIES
              </span>
            </div>
            <button
              type="button"
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 border border-line lg:hidden"
            >
              <span
                className={cn(
                  "h-px w-4 bg-foreground transition-transform duration-300",
                  open && "translate-y-[3.5px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "h-px w-4 bg-foreground transition-transform duration-300",
                  open && "-translate-y-[3.5px] -rotate-45",
                )}
              />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-background px-8 lg:hidden"
          >
            <div className="space-y-6">
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i, duration: 0.5, ease: EASE }}
                  className="block font-display text-4xl font-bold tracking-tight text-foreground"
                >
                  {l.label}
                </motion.a>
              ))}
            </div>
            <div className="mt-16 flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-glow opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-glow" />
              </span>
              <span className="text-[10px] tracking-[0.25em] text-muted-foreground">
                OPEN TO OPPORTUNITIES
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
