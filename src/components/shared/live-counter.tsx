import { useEffect, useRef, useState } from "react";

export function LiveCounter({
  base,
  interval = 2600,
  className,
  format = (n: number) => n.toLocaleString("en-US"),
}: {
  base: number;
  interval?: number;
  className?: string;
  format?: (n: number) => string;
}) {
  const [value, setValue] = useState(0);
  const current = useRef(0);
  const target = useRef(0);
  const raf = useRef(0);

  // Initial count-up from 0 → base
  useEffect(() => {
    let id: number;
    const start = performance.now();
    const duration = 1600;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const v = Math.round(base * eased);
      current.current = v;
      target.current = v;
      setValue(v);
      if (p < 1) id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [base]);

  const animateTo = () => {
    cancelAnimationFrame(raf.current);
    const from = current.current;
    const to = target.current;
    if (from === to) return;
    const start = performance.now();
    const duration = 900;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const v = Math.round(from + (to - from) * eased);
      current.current = v;
      setValue(v);
      if (p < 1) {
        raf.current = requestAnimationFrame(tick);
      } else {
        current.current = to;
      }
    };
    raf.current = requestAnimationFrame(tick);
  };

  // Random walk — live investors joining/leaving every few seconds
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const schedule = () => {
      timeout = setTimeout(() => {
        const delta = Math.random() < 0.5 ? -1 : 1;
        // Occasionally a bigger jump (batch of investors)
        const extra = Math.random() < 0.2 ? (Math.random() < 0.5 ? 1 : -1) : 0;
        target.current = Math.max(0, target.current + delta + extra);
        animateTo();
        schedule();
      }, interval + Math.random() * 1800);
    };
    schedule();
    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(raf.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interval, base]);

  return <span className={className}>{format(value)}</span>;
}

