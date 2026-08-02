import { CheckCircle2, Clock, XCircle } from "lucide-react";
import type { RequestStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

export function StatusTimeline({
  status = "pending",
}: {
  status?: RequestStatus;
}) {
  const steps = [
    { key: "submitted", label: "تم الإرسال", desc: "استلمنا طلبك بنجاح" },
    {
      key: "review",
      label: "قيد المراجعة",
      desc: "فريق العمليات يطابق البيانات",
    },
    {
      key: status === "rejected" ? "rejected" : "final",
      label:
        status === "rejected"
          ? "مرفوض"
          : status === "approved"
            ? "تم الاعتماد"
            : "بانتظار القرار",
      desc:
        status === "rejected"
          ? "تم رفض الطلب لأحد الأسباب"
          : status === "approved"
            ? "اكتملت المعالجة بنجاح"
            : "سيتم إشعارك فور اتخاذ القرار",
    },
  ];

  const currentIndex = status === "pending" ? 1 : status === "approved" ? 2 : 2;

  return (
    <ol className="space-y-5">
      {steps.map((s, i) => {
        const done = i <= currentIndex && status !== "rejected";
        const rejected = status === "rejected" && i === 2;
        return (
          <li key={s.key} className="flex gap-4">
            <span className="relative flex flex-col items-center">
              <span
                className={cn(
                  "grid h-9 w-9 shrink-0 place-items-center rounded-full border",
                  rejected
                    ? "border-destructive/40 bg-destructive/12 text-destructive"
                    : done
                      ? "border-success/40 bg-success/12 text-success"
                      : "border-border bg-background/40 text-muted-foreground",
                )}
              >
                {rejected ? (
                  <XCircle className="h-4 w-4" />
                ) : done ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <Clock className="h-4 w-4" />
                )}
              </span>
              {i < steps.length - 1 && (
                <span className="mt-1 w-px flex-1 bg-border" />
              )}
            </span>
            <div className="pb-2">
              <p
                className={cn(
                  "text-sm font-medium",
                  rejected
                    ? "text-destructive"
                    : done
                      ? "text-ivory"
                      : "text-muted-foreground",
                )}
              >
                {s.label}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">{s.desc}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
