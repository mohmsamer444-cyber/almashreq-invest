export function Logo({ size = 40 }: { size?: number }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="grid shrink-0 place-items-center rounded-2xl text-graphite"
        style={{
          height: size,
          width: size,
          backgroundImage: "var(--gradient-gold)",
          boxShadow: "var(--shadow-gold)",
        }}
      >
        <svg
          width={size * 0.55}
          height={size * 0.55}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 21h18" />
          <path d="M5 21V7l7-4 7 4v14" />
          <path d="M9 21v-6h6v6" />
          <path d="M12 7v3" />
        </svg>
      </div>
      <div className="leading-tight">
        <p
          className="font-display text-lg font-bold text-gold"
          style={{ fontSize: size * 0.42 }}
        >
          منصة المشرق
        </p>
        <p className="text-[10px] tracking-[0.3em] text-muted-foreground">
          AL-MASHREQ
        </p>
      </div>
    </div>
  );
}

export function LogoMark({ size = 40 }: { size?: number }) {
  return (
    <div
      className="grid shrink-0 place-items-center rounded-2xl text-graphite"
      style={{
        height: size,
        width: size,
        backgroundImage: "var(--gradient-gold)",
      }}
    >
      <svg
        width={size * 0.55}
        height={size * 0.55}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 21h18" />
        <path d="M5 21V7l7-4 7 4v14" />
        <path d="M9 21v-6h6v6" />
        <path d="M12 7v3" />
      </svg>
    </div>
  );
}
