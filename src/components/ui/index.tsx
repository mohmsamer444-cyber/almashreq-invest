import { forwardRef, type ButtonHTMLAttributes, type InputHTMLAttributes, type TextareaHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ---------- Button ---------- */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "gold" | "outline" | "ghost" | "danger" | "success" | "emerald";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "gold", size = "md", fullWidth, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "shine inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed",
          size === "sm" && "px-4 py-2 text-xs",
          size === "md" && "px-6 py-3 text-sm",
          size === "lg" && "px-8 py-4 text-base",
          fullWidth && "w-full",
          variant === "gold" && "text-graphite",
          variant === "emerald" && "text-white",
          variant === "outline" && "border border-border/70 text-foreground hover:border-gold/50 hover:text-gold",
          variant === "ghost" && "text-muted-foreground hover:text-gold hover:bg-gold/5",
          variant === "danger" && "border border-destructive/40 text-destructive hover:bg-destructive/10",
          variant === "success" && "border border-success/40 text-success hover:bg-success/10",
          className,
        )}
        style={
          variant === "gold"
            ? { backgroundImage: "var(--gradient-gold)", boxShadow: "var(--shadow-gold)" }
            : variant === "emerald"
              ? { backgroundImage: "var(--gradient-emerald)", boxShadow: "var(--shadow-emerald)" }
              : undefined
        }
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

/* ---------- Card ---------- */
export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("glass rounded-3xl", className)}>{children}</div>;
}

export function CardHeader({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("px-6 pt-6 sm:px-7", className)}>{children}</div>;
}

export function CardTitle({ className, children }: { className?: string; children: ReactNode }) {
  return <h3 className={cn("font-display text-lg text-ivory", className)}>{children}</h3>;
}

export function CardDescription({ className, children }: { className?: string; children: ReactNode }) {
  return <p className={cn("mt-1 text-xs text-muted-foreground", className)}>{children}</p>;
}

export function CardContent({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("px-6 pb-6 pt-4 sm:px-7 sm:pb-7", className)}>{children}</div>;
}

/* ---------- Input ---------- */
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | undefined;
  icon?: ReactNode;
  trailing?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, trailing, id, ...props }, ref) => {
    const inputId = id ?? (label ? `field_${label.replace(/\s+/g, "_")}` : undefined);
    return (
      <label htmlFor={inputId} className="block">
        {label && <span className="mb-2 block text-xs font-medium text-muted-foreground">{label}</span>}
        <span
          className={cn(
            "flex items-center gap-3 rounded-2xl border bg-background/40 px-4 py-3 transition-all duration-300 focus-within:border-gold/60",
            error ? "border-destructive/70" : "border-border/70",
          )}
        >
          {icon && <span className="shrink-0 text-gold/80">{icon}</span>}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "min-w-0 flex-1 bg-transparent text-sm text-ivory outline-none placeholder:text-muted-foreground/50",
              className,
            )}
            {...props}
          />
          {trailing}
        </span>
        {error && <span className="mt-1.5 block text-xs text-destructive">{error}</span>}
      </label>
    );
  },
);
Input.displayName = "Input";

/* ---------- Textarea ---------- */
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string | undefined;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <label className="block">
        {label && <span className="mb-2 block text-xs font-medium text-muted-foreground">{label}</span>}
        <textarea
          ref={ref}
          className={cn(
            "w-full resize-none rounded-2xl border border-border/70 bg-background/40 px-4 py-3 text-sm text-ivory outline-none transition-colors focus:border-gold/60",
            error ? "border-destructive/70" : "border-border/70",
            className,
          )}
          {...props}
        />
        {error && <span className="mt-1.5 block text-xs text-destructive">{error}</span>}
      </label>
    );
  },
);
Textarea.displayName = "Textarea";

/* ---------- Badge ---------- */
export function Badge({
  className,
  children,
  tone = "gold",
}: {
  className?: string;
  children: ReactNode;
  tone?: "gold" | "success" | "warning" | "danger" | "muted" | "emerald";
}) {
  const tones: Record<string, string> = {
    gold: "bg-gold/12 text-gold border-gold/30",
    success: "bg-success/12 text-success border-success/30",
    warning: "bg-warning/12 text-warning border-warning/30",
    danger: "bg-destructive/12 text-destructive border-destructive/30",
    muted: "bg-muted/60 text-muted-foreground border-border/50",
    emerald: "bg-emerald/12 text-emerald border-emerald/30",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-[11px] font-semibold",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/* ---------- Switch ---------- */
export function Switch({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative h-7 w-12 shrink-0 rounded-full transition-colors duration-300",
        checked ? "bg-gradient-to-l from-gold to-gold-soft" : "bg-muted",
      )}
    >
      <span
        className={cn(
          "absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all duration-300",
          checked ? "start-6" : "start-1",
        )}
      />
    </button>
  );
}

/* ---------- Progress ---------- */
export function Progress({ value, className }: { value: number; className?: string }) {
  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-background/60", className)}>
      <div
        className="h-full rounded-full transition-all duration-1000"
        style={{ width: `${Math.min(100, Math.max(0, value))}%`, backgroundImage: "var(--gradient-gold)" }}
      />
    </div>
  );
}

/* ---------- Skeleton ---------- */
export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("skeleton rounded-xl", className)} />;
}

/* ---------- Tabs ---------- */
export function Tabs<T extends string>({
  tabs,
  value,
  onChange,
  className,
}: {
  tabs: { key: T; label: string; icon?: ReactNode }[];
  value: T;
  onChange: (v: T) => void;
  className?: string;
}) {
  return (
    <div className={cn("flex gap-1 rounded-full border border-border/60 p-1", className)}>
      {tabs.map((t) => (
        <button
          key={t.key}
          type="button"
          onClick={() => onChange(t.key)}
          className={cn(
            "flex flex-1 items-center justify-center gap-1.5 rounded-full py-2.5 text-xs font-semibold transition-all duration-300 sm:text-sm",
            value === t.key ? "bg-gold/15 text-gold" : "text-muted-foreground hover:text-ivory",
          )}
        >
          {t.icon}
          {t.label}
        </button>
      ))}
    </div>
  );
}

/* ---------- EmptyState ---------- */
export function EmptyState({ icon, title, body }: { icon: ReactNode; title: string; body?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-14 text-center">
      <div className="grid h-16 w-16 place-items-center rounded-2xl glass text-muted-foreground">{icon}</div>
      <p className="text-sm font-medium text-ivory">{title}</p>
      {body && <p className="max-w-xs text-xs text-muted-foreground">{body}</p>}
    </div>
  );
}

