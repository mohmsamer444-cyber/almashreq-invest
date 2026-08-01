import { CheckCircle2, Clock, XCircle } from "lucide-react";
import type { RequestStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

export function StatusPill({ status, lang = "ar" }: { status: RequestStatus; lang?: "ar" | "en" }) {
  const map = {
    pending: {
      label: lang === "ar" ? "قيد الانتظار" : "Pending",
      cls: "bg-warning/12 text-warning border-warning/30",
      Icon: Clock,
    },
    approved: {
      label: lang === "ar" ? "موافق عليه" : "Approved",
      cls: "bg-success/12 text-success border-success/30",
      Icon: CheckCircle2,
    },
    rejected: {
      label: lang === "ar" ? "مرفوض" : "Rejected",
      cls: "bg-destructive/12 text-destructive border-destructive/30",
      Icon: XCircle,
    },
  } as const;

  const { label, cls, Icon } = map[status];

  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold", cls)}>
      <Icon className="h-3.5 w-3.5" />
      {label}
    </span>
  );
}

