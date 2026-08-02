const fs = require("fs");
const path = require("path");

const content = `import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Check, X, Search, ShieldCheck, Eye, FileText, Banknote, Clock, CheckCircle2, XCircle } from "lucide-react";
import { useStore } from "@/lib/store";
import { useSettings } from "@/components/layout/theme";
import { AppShell, PageHeader } from "@/components/layout/app-shell";
import { StatCard } from "@/components/shared/stat-card";
import { StatusPill } from "@/components/shared/status-pill";
import { Button } from "@/components/ui";
import { cn, fmtMoney, fmtDateTime } from "@/lib/utils";
import type { DepositRequest, RequestStatus } from "@/lib/types";

export const Route = createFileRoute("/admin/deposits")({
  head: () => ({
    meta: [
      { title: "إدارة الإيداعات | منصة المشرق" },
      { name: "description", content: "مراجعة واعتماد طلبات الإيداع." },
    ],
  }),
  component: AdminDepositsPage,
});

type StatusFilter = "all" | "pending" | "approved" | "rejected";

const STATUS_LABEL: Record<string, string> = {
  pending: "قيد المراجعة",
  approved: "مقبول",
  rejected: "مرفوض",
};

const STATUS_LABEL_EN: Record<string, string> = {
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
};

function AdminDepositsPage() {
  const { user, deposits, reviewDeposit } = useStore();
  const { lang } = useSettings();
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [viewing, setViewing] = useState<DepositRequest | null>(null);

  const filtered = useMemo(
    () =>
      deposits.filter(
        (d) =>
          (statusFilter === "all" || d.status === statusFilter) &&
          (d.userName + d.method + d.senderPhone).includes(q.trim()),
      ),
    [deposits, statusFilter, q],
  );

  if (!user || user.role !== "admin") {
    return (
      <AppShell>
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="max-w-md text-center">
            <ShieldCheck className="mx-auto h-12 w-12 text-gold" />
            <h2 className="mt-4 font-display text-xl text-ivory">
              {lang === "ar" ? "صلاحية الإدارة فقط" : "Admin access only"}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {lang === "ar"
                ? "حسابك الحالي ليس لديه صلاحية الوصول لهذه الصفحة."
                : "Your account does not have admin access."}
            </p>
          </div>
        </div>
      </AppShell>
    );
  }

  const pendingCount = deposits.filter((d) => d.status === "pending").length;
  const approvedCount = deposits.filter((d) => d.status === "approved").length;
  const rejectedCount = deposits.filter((d) => d.status === "rejected").length;
  const totalAmount = deposits
    .filter((d) => d.status === "approved")
    .reduce((a, d) => a + d.amount, 0);

  const label = (s: string) =>
    (lang === "ar" ? STATUS_LABEL[s] : STATUS_LABEL_EN[s]) ?? s;

  const handleReview = (id: string, status: RequestStatus) => {
    reviewDeposit(id, status);
    toast.success(
      lang === "ar"
        ? status === "approved"
          ? "تم اعتماد الإيداع وإضافة الرصيد للمستخدم ✅"
          : "تم رفض طلب الإيداع"
        : status === "approved"
          ? "Deposit approved and balance added ✅"
          : "Deposit request rejected",
    );
  };

  return (
    <AppShell>
      <PageHeader
        title={lang === "ar" ? "إدارة الإيداعات" : "Deposit Requests"}
        subtitle={
          lang === "ar"
            ? "مراجعة طلبات الإيداع واعتمادها أو رفضها"
            : "Review, approve, or reject deposit requests"
        }
      />

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard label={lang === "ar" ? "قيد المراجعة" : "Pending"} value={pendingCount} icon={<Clock className="h-5 w-5" />} accent="gold" />
        <StatCard label={lang === "ar" ? "مقبولة" : "Approved"} value={approvedCount} icon={<CheckCircle2 className="h-5 w-5" />} accent="emerald" />
        <StatCard label={lang === "ar" ? "مرفوضة" : "Rejected"} value={rejectedCount} icon={<XCircle className="h-5 w-5" />} accent="violet" />
        <StatCard label={lang === "ar" ? "إجمالي المقبول" : "Total approved"} value={totalAmount} suffix="ج.م" icon={<Banknote className="h-5 w-5" />} accent="blue" />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="flex min-w-0 flex-1 items-center gap-3 rounded-full border border-border/70 bg-background/40 px-4 py-2.5">
          <Search className="h-4 w-4 shrink-0 text-gold" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={lang === "ar" ? "ابحث بالاسم، الوسيلة، أو رقم المرسل…" : "Search by name, method, or sender…"}
            className="min-w-0 flex-1 bg-transparent text-sm text-ivory outline-none placeholder:text-muted-foreground/50"
          />
        </div>
        <div className="flex gap-1 rounded-full border border-border/60 p-1">
          {(["all", "pending", "approved", "rejected"] as StatusFilter[]).map((f) => (
            <button
              key={f}
              onClick={() => setStatusFilter(f)}
              className={cn(
                "rounded-full px-3 py-1.5 text-[11px] font-semibold transition-all",
                statusFilter === f ? "bg-gold/15 text-gold" : "text-muted-foreground hover:text-ivory",
              )}
            >
              {f === "all" ? (lang === "ar" ? "الكل" : "All") : label(f)}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {filtered.map((d) => (
          <div key={d.id} className="rounded-3xl glass p-4 sm:p-5 transition-all duration-300 hover:border-gold/30">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-semibold text-ivory">{d.userName}</p>
                  <StatusPill status={d.status} lang={lang} />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {lang === "ar" ? "المبلغ" : "Amount"}: <span className="font-semibold text-gold" dir="ltr">{fmtMoney(d.amount, "en")} ج.م</span>
                </p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">
                  {d.method} — {lang === "ar" ? "رقم المرسل" : "Sender"}: <span dir="ltr">{d.senderPhone}</span>
                </p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">
                  {fmtDateTime(d.createdAt)}
                  {d.reviewedAt && ` — ${lang === "ar" ? "تمت المراجعة" : "Reviewed"}: ${fmtDateTime(d.reviewedAt)}`}
                </p>
                {d.notes && (
                  <p className="mt-1.5 rounded-xl border border-border/40 bg-background/30 px-3 py-2 text-[11px] text-muted-foreground">📝 {d.notes}</p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button onClick={() => setViewing(d)} className="flex items-center gap-1.5 rounded-full border border-gold/30 px-3 py-1.5 text-[11px] font-semibold text-gold transition-colors hover:bg-gold/10">
                  <Eye className="h-3.5 w-3.5" />
                  {lang === "ar" ? "عرض الإيصال" : "View receipt"}
                </button>
                {d.status === "pending" && (
                  <>
                    <button onClick={() => handleReview(d.id, "approved")} className="flex items-center gap-1.5 rounded-full border border-success/40 px-3 py-1.5 text-[11px] font-semibold text-success transition-colors hover:bg-success/10">
                      <Check className="h-3.5 w-3.5" />
                      {lang === "ar" ? "اعتماد" : "Approve"}
                    </button>
                    <button onClick={() => handleReview(d.id, "rejected")} className="flex items-center gap-1.5 rounded-full border border-destructive/40 px-3 py-1.5 text-[11px] font-semibold text-destructive transition-colors hover:bg-destructive/10">
                      <X className="h-3.5 w-3.5" />
                      {lang === "ar" ? "رفض" : "Reject"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="rounded-3xl glass p-10 text-center">
            <Banknote className="mx-auto h-10 w-10 text-muted-foreground/40" />
            <p className="mt-3 text-sm text-muted-foreground">{lang === "ar" ? "لا توجد طلبات إيداع" : "No deposit requests"}</p>
          </div>
        )}
      </div>

      {viewing && (
        <ReceiptModal deposit={viewing} lang={lang} onClose={() => setViewing(null)} onReview={handleReview} />
      )}
    </AppShell>
  );
}

function ReceiptModal({ deposit, lang, onClose, onReview }: {
  deposit: DepositRequest;
  lang: "ar" | "en";
  onClose: () => void;
  onReview: (id: string, status: RequestStatus) => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-modal-backdrop" onClick={onClose}>
      <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-gold/20 bg-[#141414] shadow-2xl animate-scale-in" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-white/10 p-5">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gold">{lang === "ar" ? "إيصال التحويل" : "Transfer receipt"}</p>
            <h3 className="mt-1 font-display text-lg font-bold text-ivory">{deposit.userName} — {fmtMoney(deposit.amount, "en")} ج.م</h3>
          </div>
          <button onClick={onClose} className="grid h-8 w-8 place-items-center rounded-full border border-white/10 text-muted-foreground transition-colors hover:text-ivory">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="max-h-[70vh] space-y-4 overflow-y-auto p-5">
          {deposit.receiptData ? (
            <div className="overflow-hidden rounded-2xl border border-border/50 bg-background/40">
              <img src={deposit.receiptData} alt="receipt" className="max-h-72 w-full object-contain" />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border/60 p-8 text-center">
              <FileText className="h-8 w-8 text-muted-foreground/50" />
              <p className="text-xs text-muted-foreground">{deposit.receiptName}</p>
              <p className="text-[10px] text-muted-foreground/60">{lang === "ar" ? "لا توجد صورة معاينة" : "No image preview available"}</p>
            </div>
          )}
          <div className="space-y-2 rounded-2xl border border-border/50 bg-background/40 p-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{lang === "ar" ? "المستخدم" : "User"}</span>
              <span className="font-semibold text-ivory">{deposit.userName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{lang === "ar" ? "المبلغ" : "Amount"}</span>
              <span className="font-semibold text-gold" dir="ltr">{fmtMoney(deposit.amount, "en")} ج.م</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{lang === "ar" ? "الوسيلة" : "Method"}</span>
              <span className="font-semibold text-ivory">{deposit.method}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{lang === "ar" ? "رقم المرسل" : "Sender"}</span>
              <span className="font-semibold text-ivory" dir="ltr">{deposit.senderPhone}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{lang === "ar" ? "التاريخ" : "Date"}</span>
              <span className="font-semibold text-ivory">{fmtDateTime(deposit.createdAt)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{lang === "ar" ? "الحالة" : "Status"}</span>
              <StatusPill status={deposit.status} lang={lang} />
            </div>
          </div>
          {deposit.status === "pending" && (
            <div className="grid grid-cols-2 gap-3">
              <Button variant="success" onClick={() => { onReview(deposit.id, "approved"); onClose(); }}>
                <Check className="h-4 w-4" />
                {lang === "ar" ? "اعتماد الإيداع" : "Approve"}
              </Button>
              <Button variant="danger" onClick={() => { onReview(deposit.id, "rejected"); onClose(); }}>
                <X className="h-4 w-4" />
                {lang === "ar" ? "رفض الطلب" : "Reject"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
`;

const target = path.resolve(__dirname, "../src/routes/admin.deposits.tsx");
fs.writeFileSync(target, content, "utf8");
console.log("Written admin.deposits.tsx successfully!");