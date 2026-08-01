import { ReactNode, InputHTMLAttributes } from "react";

export function FormField({
  label,
  error,
  icon,
  trailing,
  children,
  className = "",
}: {
  label?: string;
  error?: string;
  icon?: ReactNode;
  trailing?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      {label && <span className="mb-3 block text-xs font-semibold tracking-widest text-gold">{label}</span>}
      <div
        className={`flex items-center gap-3 rounded-2xl border bg-background/40 px-4 py-3.5 transition-all focus-within:border-gold/60 ${
          error ? "border-destructive/70" : "border-border/70"
        }`}
      >
        {icon && <span className="shrink-0 text-gold/80">{icon}</span>}
        {children}
        {trailing}
      </div>
      {error && <span className="mt-1.5 block text-xs text-destructive">⚠ {error}</span>}
    </label>
  );
}

export function Input({
  label,
  error,
  icon,
  trailing,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  icon?: ReactNode;
  trailing?: ReactNode;
}) {
  return (
    <FormField label={label} error={error} icon={icon} trailing={trailing}>
      <input
        {...props}
        className="min-w-0 flex-1 bg-transparent text-sm text-ivory outline-none placeholder:text-muted-foreground/60"
      />
    </FormField>
  );
}

export function TextArea({
  label,
  error,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string; error?: string }) {
  return (
    <label className="block">
      {label && <span className="mb-3 block text-xs font-semibold tracking-widest text-gold">{label}</span>}
      <textarea
        {...props}
        className={`w-full resize-none rounded-2xl border bg-background/40 px-4 py-3.5 text-sm text-ivory outline-none transition-all focus:border-gold/60 ${
          error ? "border-destructive/70" : "border-border/70"
        }`}
      />
      {error && <span className="mt-1.5 block text-xs text-destructive">⚠ {error}</span>}
    </label>
  );
}

export function SelectButton({
  label,
  value,
  onChange,
  options,
  icon,
  error,
}: {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string; icon?: string; color?: string }[];
  icon?: ReactNode;
  error?: string;
}) {
  return (
    <label className="block">
      {label && <span className="mb-3 block text-xs font-semibold tracking-widest text-gold">{label}</span>}
      <div className={`grid grid-cols-2 gap-2 sm:grid-cols-3 ${error ? "opacity-75" : ""}`}>
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`shine group relative overflow-hidden rounded-2xl border transition-all duration-300 ${
              value === option.value
                ? "border-gold/60 bg-gradient-to-br from-gold/20 to-gold/10"
                : "border-border/60 bg-background/40 hover:border-gold/40 hover:bg-background/60"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-10" style={{ backgroundImage: "var(--gradient-gold)" }} />
            <div className="relative px-3 py-4 text-center">
              {option.icon && <span className="block text-2xl">{option.icon}</span>}
              <span
                className={`mt-2 block text-xs font-medium ${value === option.value ? "text-gold" : "text-muted-foreground"}`}
              >
                {option.label}
              </span>
            </div>
          </button>
        ))}
      </div>
      {error && <span className="mt-2 block text-xs text-destructive">⚠ {error}</span>}
    </label>
  );
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: ReactNode;
}) {
  const baseStyles = "shine inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300";

  const variants = {
    primary: "bg-gradient-gold text-primary-foreground hover:scale-105 shadow-gold",
    secondary: "border border-gold/40 text-gold hover:bg-gold/10",
    ghost: "text-muted-foreground hover:text-gold hover:bg-accent/40",
  };

  const sizes = {
    sm: "px-4 py-2.5 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-3.5 text-base",
  };

  return (
    <button
      {...props}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${props.disabled ? "opacity-50 cursor-not-allowed" : ""} ${props.className || ""}`}
    >
      {loading && <span className="animate-spin">⚙️</span>}
      {icon}
      {children}
    </button>
  );
}

export function ToggleButtonGroup({
  label,
  value,
  onChange,
  options,
}: {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="block">
      {label && <span className="mb-3 block text-xs font-semibold tracking-widest text-gold">{label}</span>}
      <div className="grid grid-cols-2 gap-1 rounded-full border border-border/60 p-1">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`rounded-full py-2.5 text-sm font-medium transition-all duration-300 ${
              value === option.value ? "bg-gold/15 text-gold" : "text-muted-foreground hover:text-ivory"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </label>
  );
}
