import { Star, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";

/**
 * Professional testimonials grid — displays all reviews with avatar, name,
 * star rating, country, and comment.
 */
export function TestimonialCarousel() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {TESTIMONIALS.map((t, i) => (
        <div
          key={t.id}
          className="lift group relative overflow-hidden rounded-2xl glass p-5 sm:p-6 border border-border/50 transition-colors"
        >
          {/* Quote watermark */}
          <Quote className="absolute -top-1 end-3 h-16 w-16 rotate-12 text-gold/8 transition-transform duration-500 group-hover:scale-110" />

          {/* Stars */}
          <div className="relative flex items-center gap-1">
            {Array.from({ length: t.rating }).map((_, idx) => (
              <Star key={idx} className="h-4 w-4 fill-gold text-gold" />
            ))}
          </div>

          {/* Comment */}
          <p className="relative mt-3 min-h-[88px] text-sm leading-6 text-ivory">
            "{t.content}"
          </p>

          {/* Author */}
          <div className="relative mt-5 flex items-center gap-3 border-t border-border/40 pt-4">
            <div
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-sm font-bold text-white shadow-lg"
              style={{ background: t.color }}
            >
              {t.initials}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-ivory">
                {t.name}
              </p>
              <p className="truncate text-[11px] text-muted-foreground">
                📍 {t.location}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
