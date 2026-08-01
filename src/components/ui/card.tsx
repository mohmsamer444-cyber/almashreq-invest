import { ReactNode, HTMLAttributes } from "react";

export function Card({ children, className = "", ...props }: { children: ReactNode; className?: string } & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`rounded-3xl glass p-6 sm:p-7 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mb-6 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <h2 className={`font-display text-xl sm:text-2xl text-ivory ${className}`}>{children}</h2>;
}

export function CardDescription({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`mt-2 text-sm text-muted-foreground ${className}`}>{children}</p>;
}

export function CardContent({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`space-y-4 ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mt-6 border-t border-border/30 pt-6 ${className}`}>{children}</div>;
}

export function StatsCard({
  icon,
  label,
  value,
  suffix = "",
  decimals = 0,
}: {
  icon: ReactNode;
  label: string;
  value: number;
  suffix?: string;
  decimals?: number;
}) {
  const formattedValue = value.toLocaleString("ar-EG", { maximumFractionDigits: decimals });
  return (
    <Card className="lift">
      <div className="flex items-center gap-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gold/12 text-gold">{icon}</span>
        <div className="min-w-0 flex-1">
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="mt-1 font-display text-lg sm:text-xl text-ivory">
            {formattedValue}
            {suffix && <span className="text-sm text-gold mr-1">{suffix}</span>}
          </p>
        </div>
      </div>
    </Card>
  );
}

export function GlassCard({ children, className = "", interactive = false }: { children: ReactNode; className?: string; interactive?: boolean }) {
  return (
    <div className={`rounded-2xl glass-soft p-4 ${interactive ? "shine lift hover:scale-105 cursor-pointer" : ""} transition-all ${className}`}>
      {children}
    </div>
  );
}

export function HoverCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl glass p-4 transition-all duration-300 hover:border-gold/40 hover:bg-gold/5 ${className}`}
    >
      {children}
    </div>
  );
}
