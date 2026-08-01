import { ReactNode, useEffect, useRef } from "react";
import { Sparkles } from "lucide-react";

export function CinematicBackdrop() {
  return (
    <div className="fixed inset-0 -z-10 bg-gradient-to-br from-background via-background to-background/50">
      {/* Premium animated aurora effect */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-gradient-to-b from-gold/25 to-transparent blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/4 right-1/3 h-72 w-72 rounded-full bg-gradient-to-t from-emerald-500/15 to-transparent blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/4 h-80 w-80 rounded-full bg-gradient-to-l from-gold/10 to-transparent blur-3xl animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }} />
      </div>

      {/* Subtle moving mesh */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 1000 1000">
          <defs>
            <pattern id="mesh" x="50" y="50" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M0,50 Q25,0 50,50 T100,50" stroke="oklch(0.72 0.15 62)" strokeWidth="0.5" fill="none" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="1000" height="1000" fill="url(#mesh)" />
        </svg>
      </div>
    </div>
  );
}

interface RevealProps {
  children: ReactNode;
  delay?: number;
}

export function Reveal({ children, delay = 0 }: RevealProps) {
  return (
    <div
      className="animate-reveal-up"
      style={{
        animationDelay: `${delay}ms`,
        animation: "reveal-up 0.6s ease-out forwards",
        opacity: 0,
      }}
    >
      {children}
    </div>
  );
}

interface CounterProps {
  to: number;
}

export function Counter({ to }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (hasStarted.current || !ref.current) return;
    hasStarted.current = true;

    const target = to;
    const duration = 2000;
    const start = Date.now();
    const initial = parseInt(ref.current.textContent || "0");

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - start) / duration, 1);
      const value = Math.floor(initial + (target - initial) * progress);

      if (ref.current) {
        ref.current.textContent = value.toLocaleString("ar-EG");
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [to]);

  return <span ref={ref}>{to.toLocaleString("ar-EG")}</span>;
}

export function Logo({ size = 24 }: { size?: number } = {}) {
  return (
    <div className="flex items-center gap-2">
      <div
        className="flex items-center justify-center rounded-xl"
        style={{
          height: size,
          width: size,
          backgroundImage: "var(--gradient-gold)",
        }}
      >
        <Sparkles style={{ height: size * 0.6, width: size * 0.6 }} className="text-background" />
      </div>
      {size >= 32 && <span className="font-display font-bold text-gold hidden sm:inline">المشرق</span>}
    </div>
  );
}

export function DemoRibbon() {
  return (
    <div className="mb-6 rounded-full border border-gold/30 bg-gold/5 px-4 py-2 text-center text-xs text-gold">
      🎬 بيئة عرض تجريبية — جميع البيانات والعمليات وهمية
    </div>
  );
}

export function Typing() {
  return (
    <span className="inline-block animate-pulse">
      <span className="inline-block h-6 w-0.5 bg-gold" />
    </span>
  );
}
