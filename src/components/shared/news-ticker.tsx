import { useEffect, useState } from "react";
import { Newspaper } from "lucide-react";
import { NEWS } from "@/lib/constants";
import { timeAgo } from "@/lib/utils";

export function NewsTicker() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % NEWS.length), 5000);
    return () => clearInterval(id);
  }, []);

  const item = NEWS[active];
  if (!item) return null;

  return (
    <div className="overflow-hidden rounded-3xl glass p-6">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gold/12 text-gold">
          <Newspaper className="h-5 w-5" />
        </span>
        <div>
          <p className="font-display text-base text-ivory">آخر الأخبار</p>
          <p className="text-[11px] text-muted-foreground">
            تحديثات المنصة والسوق
          </p>
        </div>
        <span className="ms-auto rounded-full bg-gold/10 px-3 py-1 text-[10px] font-semibold text-gold">
          {item.category}
        </span>
      </div>

      <div className="mt-5 min-h-[84px]">
        <h3 className="text-sm font-semibold leading-6 text-ivory sm:text-base">
          {item.title}
        </h3>
        <p className="mt-2 text-xs leading-6 text-muted-foreground sm:text-sm">
          {item.body}
        </p>
        <p className="mt-2 text-[11px] text-muted-foreground/70">
          {timeAgo(item.date)}
        </p>
      </div>

      <div className="mt-4 flex items-center gap-1.5">
        {NEWS.map((n, i) => (
          <button
            key={n.id}
            onClick={() => setActive(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === active ? "w-6 bg-gold" : "w-1.5 bg-border hover:bg-gold/40"
            }`}
            aria-label={`خبر ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
