export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

export const fmtEGP = (n: number): string => n.toLocaleString("en-US");

export const fmtAr = (n: number): string => n.toLocaleString("ar-EG");

export const fmtMoney = (n: number, lang: "ar" | "en" = "ar"): string =>
  lang === "ar" ? n.toLocaleString("ar-EG") : n.toLocaleString("en-US");

export const fmtDate = (d: string | Date): string =>
  new Date(d).toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export const fmtDateTime = (d: string | Date): string =>
  new Date(d).toLocaleString("ar-EG", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

export const timeAgo = (d: string | Date): string => {
  const diff = Date.now() - new Date(d).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "الآن";
  if (mins < 60) return `منذ ${mins} دقيقة`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `منذ ${hours} ساعة`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `منذ ${days} يوم`;
  const months = Math.floor(days / 30);
  if (months < 12) return `منذ ${months} شهر`;
  return `منذ ${Math.floor(months / 12)} سنة`;
};

export function uid(prefix = "id"): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const first = parts[0]?.charAt(0) ?? "";
  const last =
    parts.length > 1 ? (parts[parts.length - 1]?.charAt(0) ?? "") : "";
  return (first + last).toUpperCase();
}

export const AVATAR_COLORS = [
  "linear-gradient(135deg,#d4af37,#a67c00)",
  "linear-gradient(135deg,#2ecc71,#0f7b46)",
  "linear-gradient(135deg,#3498db,#1a5276)",
  "linear-gradient(135deg,#9b59b6,#512e5f)",
  "linear-gradient(135deg,#e67e22,#935116)",
  "linear-gradient(135deg,#16a085,#0e4d41)",
];
