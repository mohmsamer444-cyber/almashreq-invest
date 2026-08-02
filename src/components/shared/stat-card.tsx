import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { CountUp } from "./count-up";
import { LiveCounter } from "./live-counter";

export function StatCard({
  label,
  value,
  suffix,
  icon,
  accent = "gold",
  count = true,
  live = false,
  sub,
}: {
  label: string;
  value: number | string;
  suffix?: string;
  icon: ReactNode;
  accent?: "gold" | "emerald" | "violet" | "blue";
  count?: boolean;
  live?: boolean;
  sub?: string;
}) {
  const accents: Record<string, string> = {
    gold: "bg-gold/12 text-gold",
    emerald: "bg-emerald/12 text-emerald",
    violet: "bg-[#9b59b6]/12 text-[#c39bd3]",
    blue: "bg-[#3498db]/12 text-[#7fb3d8]",
  };

  const numCls =
    "min-w-0 truncate font-display text-[clamp(0.95rem,4vw,1.875rem)] font-bold leading-tight text-ivory tabular-nums [direction:ltr]";

  return (
    <div className="lift group relative min-w-0 overflow-hidden rounded-3xl glass p-4 sm:p-6">
      <div className="flex items-start justify-between gap-2 sm:gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-[11px] text-muted-foreground sm:text-xs">
            {label}
          </p>
          <div className="mt-2 flex min-w-0 items-baseline gap-1">
            {count ? (
              live ? (
                <LiveCounter base={Number(value)} className={numCls} />
              ) : (
                <CountUp to={Number(value)} className={numCls} />
              )
            ) : (
              <span className={numCls}>{value}</span>
            )}
            {suffix && (
              <span className="shrink-0 text-[10px] text-gold sm:text-xs">
                {suffix}
              </span>
            )}
          </div>
          {sub && (
            <p className="mt-1.5 truncate text-[11px] text-muted-foreground">
              {sub}
            </p>
          )}
        </div>
        <span
          className={cn(
            "grid h-10 w-10 shrink-0 place-items-center rounded-2xl transition-transform duration-500 group-hover:scale-110 sm:h-11 sm:w-11",
            accents[accent],
          )}
        >
          {icon}
        </span>
      </div>
    </div>
  );
}

