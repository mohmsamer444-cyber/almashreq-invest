import { useEffect, useState } from "react";
import { Image as ImageIcon } from "lucide-react";

const HERO_SRC = "/images/mashreq-login.jpg";

/**
 * HeroBanner — displays public/images/mashreq-login.jpg above the welcome card.
 * If the image file is missing or fails to load, a premium gradient placeholder
 * is rendered instead. Replace the file at public/images/mashreq-login.jpg at any
 * time — no code changes required.
 */
export function HeroBanner({ className }: { className?: string }) {
  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");

  useEffect(() => {
    const img = new Image();
    img.onload = () => setStatus("ok");
    img.onerror = () => setStatus("error");
    img.src = HERO_SRC;
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, []);

  return (
    <div
      className={`relative overflow-hidden rounded-[2rem] border border-gold/20 shadow-[var(--shadow-cinematic)] ${className ?? ""}`}
    >
      {/* Fallback placeholder (rendered underneath / when image missing) */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          background:
            "radial-gradient(900px 400px at 80% -20%, oklch(0.76 0.14 74 / 25%), transparent 60%), radial-gradient(700px 400px at 10% 120%, oklch(0.62 0.13 163 / 20%), transparent 65%), linear-gradient(135deg, oklch(0.15 0.005 262), oklch(0.2 0.01 262))",
        }}
      >
        <div className="flex flex-col items-center gap-2 px-6 text-center">
          <span className="grid h-14 w-14 place-items-center rounded-2xl border border-gold/30 bg-gold/10 text-gold">
            <ImageIcon className="h-7 w-7" />
          </span>
          <p className="font-display text-lg font-bold text-gold-gradient">
            AL-MASHREQ
          </p>
          <p className="text-xs text-muted-foreground">mashreq-login.jpg</p>
        </div>
      </div>

      {/* Actual image */}
      {status === "ok" && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={HERO_SRC}
          alt="Al-Mashreq investment banner"
          className="relative h-52 w-full object-cover sm:h-64 lg:h-72"
          loading="eager"
        />
      )}

      {/* Subtle dark overlay for premium look */}
      {status === "ok" && (
        <div className="pointer-events-none absolute inset-0 bg-black/30" />
      )}

      {/* Bottom fade into background */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
