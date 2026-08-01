import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";

export function TestimonialCarousel() {
  const [offset, setOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => setOffset((o) => o + 0.4), 32);
    return () => clearInterval(id);
  }, [isPaused]);

  const items = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative overflow-hidden -mx-4 px-4"
    >
      <div
        className="flex gap-4 sm:gap-5"
        style={{ transform: `translateX(${offset}%)`, transition: "none" }}
      >
        {items.map((t, i) => (
          <div
            key={`${t.id}_${i}`}
            className="w-72 shrink-0 sm:w-80 rounded-2xl glass p-5 sm:p-6 border border-border/50 hover:border-gold/40 transition-colors"
          >
            <div className="flex items-center gap-1">
              {Array.from({ length: t.rating }).map((_, idx) => (
                <Star key={idx} className="h-3.5 w-3.5 fill-gold text-gold" />
              ))}
            </div>
            <p className="mt-3 text-sm leading-6 text-ivory">"{t.content}"</p>
            <div className="mt-5 flex items-center gap-3 border-t border-border/40 pt-4">
              <div
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-xs font-bold text-white"
                style={{ background: t.color }}
              >
                {t.initials}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-ivory">{t.name}</p>
                <p className="truncate text-[11px] text-muted-foreground">{t.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 start-0 w-12 bg-gradient-to-r from-background to-transparent sm:w-16" />
      <div className="pointer-events-none absolute inset-y-0 end-0 w-12 bg-gradient-to-l from-background to-transparent sm:w-16" />
    </div>
  );
}

