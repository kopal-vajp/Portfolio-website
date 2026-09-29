import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "./primitives";

const DRIVE_ID = "1o3A6mcDTg8ISi1HKKalgxRtD5aSnpIEJ";
const PREVIEW = `https://drive.google.com/file/d/${DRIVE_ID}/preview`;
const DOWNLOAD = `https://drive.google.com/uc?export=download&id=${DRIVE_ID}`;

export function ResumeModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Resume preview"
            initial={{ opacity: 0, y: 26, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="relative flex h-full max-h-[88vh] w-full max-w-4xl flex-col overflow-hidden border border-line bg-surface/70 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-4">
              <div>
                <div className="text-[10px] tracking-[0.35em] text-muted-foreground">RESUME</div>
                <div className="mt-1 font-display text-sm font-semibold">KOPAL VAJPAYEE</div>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={DOWNLOAD}
                  target="_blank"
                  rel="noreferrer"
                  className="border border-iris/50 px-4 py-2 text-[10px] tracking-[0.25em] text-iris transition-colors hover:bg-iris hover:text-primary-foreground"
                >
                  DOWNLOAD PDF
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close resume"
                  className="border border-line px-3 py-2 text-[10px] tracking-[0.25em] text-muted-foreground transition-colors hover:border-glow hover:text-foreground"
                >
                  ESC ✕
                </button>
              </div>
            </div>
            <iframe
              src={PREVIEW}
              title="Resume preview"
              className="h-full w-full flex-1 bg-background"
            />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
