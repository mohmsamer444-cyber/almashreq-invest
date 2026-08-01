import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { CountUp } from "./count-up";

export function StatCard({
  label,
  value,
  suffix,
  icon,
  accent = "gold",
  count = true,
  sub,
}: {
  label: string;
  value: number | string;
  suffix?: string;
  icon: ReactNode;
  accent?: "gold" | "emerald" | "violet" | "blue";
  count?: boolean;
  sub?: string;
}) {
  const accents: Record<string, string> = {
    gold: "bg-gold/12 text-gold",
    emerald: "bg-emerald/12 text-emerald",
    violet: "bg-[#9b59b6]/12 text-[#c39bd3]",
    blue: "bg-[#3498db]/12 text-[#7fb3d8]",
  };

  return (
    <div className="lift group rounded-3xl glass p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">{label}</p>
          <div className="mt-2 flex items-baseline gap-1.5">
            {count ? (
              <CountUp to={Number(value)} className="font-display text-2xl font-bold text-ivory sm:text-3xl" />
            ) : (
              <span className="font-display text-2xl font-bold text-ivory sm:text-3xl">{value}</span>
            )}
            {suffix && <span className="text-xs text-gold">{suffix}</span>}
          </div>
          {sub && <p className="mt-1.5 text-[11px] text-muted-foreground">{sub}</p>}
        </div>
        <span className={cn("grid h-11 w-11 shrink-0 place-items-center rounded-2xl transition-transform duration-500 group-hover:scale-110", accents[accent])}>
          {icon}
        </span>
      </div>
    </div>
  );
}

