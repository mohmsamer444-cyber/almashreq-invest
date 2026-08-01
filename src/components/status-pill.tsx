import { statusLabel, type RequestStatus } from "@/lib/demo";

export function StatusPill({ status }: { status: RequestStatus }) {
  const statusColors: Record<RequestStatus, { bg: string; text: string }> = {
    pending: { bg: "bg-warning/15", text: "text-warning" },
    review: { bg: "bg-blue-500/15", text: "text-blue-400" },
    approved: { bg: "bg-success/15", text: "text-success" },
    rejected: { bg: "bg-destructive/15", text: "text-destructive" },
  };

  const colors = statusColors[status];

  return (
    <span className={`rounded-full px-3 py-1 text-[11px] ${colors.bg} ${colors.text}`}>
      {statusLabel[status]}
    </span>
  );
}
