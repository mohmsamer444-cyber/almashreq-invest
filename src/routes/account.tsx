import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Camera, KeyRound, LogOut, Mail, Moon, Phone, Sun, User2, Bell, Languages } from "lucide-react";
import { useStore } from "@/lib/store";
import { useSettings } from "@/components/layout/theme";
import { AppShell, PageHeader } from "@/components/layout/app-shell";
import { PAYMENT_METHODS } from "@/lib/constants";
import { Button, Input, Switch, Card, CardContent, CardTitle, CardDescription } from "@/components/ui";
import { cn, fmtDateTime, initials } from "@/lib/utils";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "حسابي | منصة المشرق" },
      { name: "description", content: "إدارة الملف الشخصي والإعدادات." },
    ],
  }),
  component: AccountPage,
});

const AVATAR_PALETTE = [
  "linear-gradient(135deg,#d4af37,#a67c00)",
  "linear-gradient(135deg,#2ecc71,#0f7b46)",
  "linear-gradient(135deg,#3498db,#1a5276)",
  "linear-gradient(135deg,#9b59b6,#512e5f)",
  "linear-gradient(135deg,#e67e22,#935116)",
  "linear-gradient(135deg,#16a085,#0e4d41)",
];

function AccountPage() {
  const { user, updateUser, logout } = useStore();
  const { lang, setLang, toggleTheme, isDark } = useSettings();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate({ to: "/auth" });
  };

  const changePassword = () => {
    if (newPassword.length < 8) {
      toast.error(lang === "ar" ? "كلمة المرور يجب أن تكون 8 أحرف على الأقل" : "Password must be at least 8 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error(lang === "ar" ? "كلمتا المرور غير متطابقتين" : "Passwords do not match");
      return;
    }
    updateUser({ passwordHash: newPassword });
    toast.success(lang === "ar" ? "تم تحديث كلمة المرور" : "Password updated");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <AppShell>
      <PageHeader
        title={lang === "ar" ? "حسابي" : "My Account"}
        subtitle={lang === "ar" ? "إدارة ملفك الشخصي وإعداداتك الخاصة" : "Manage your profile and settings"}
      />

      {/* Profile card */}
      <div className="relative overflow-hidden rounded-[2rem] glass p-6 sm:p-8">
        <div className="pointer-events-none absolute -end-10 -top-10 h-40 w-40 rounded-full bg-gold/10 blur-3xl" />
        <div className="relative flex flex-col items-center gap-5 sm:flex-row sm:items-center">
          <div
            className="grid h-20 w-20 shrink-0 place-items-center rounded-3xl text-xl font-bold text-white"
            style={{ background: user.avatarColor, boxShadow: "var(--shadow-gold)" }}
          >
            {initials(user.fullName)}
          </div>
          <div className="min-w-0 flex-1 text-center sm:text-start">
            <h2 className="truncate font-display text-2xl font-bold text-ivory">{user.fullName}</h2>
            <p className="mt-1 flex items-center justify-center gap-1.5 text-sm text-muted-foreground sm:justify-start">
              <Mail className="h-4 w-4 text-gold" /> {user.email}
            </p>
            <p className="mt-1 flex items-center justify-center gap-1.5 text-sm text-muted-foreground sm:justify-start" dir="ltr">
              <Phone className="h-4 w-4 text-gold" /> {user.phone}
            </p>
          </div>
          <span className="rounded-full border border-success/30 bg-success/10 px-4 py-1.5 text-xs font-semibold text-success">
            {lang === "ar" ? "حساب موثّق" : "Verified"}
          </span>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {/* Personal info */}
        <Card>
          <CardTitle className="flex items-center gap-2">
            <User2 className="h-4 w-4 text-gold" />
            {lang === "ar" ? "المعلومات الشخصية" : "Personal info"}
          </CardTitle>
          <CardDescription>{lang === "ar" ? "بيانات الحساب الأساسية" : "Basic account details"}</CardDescription>
          <CardContent>
            <div className="space-y-3">
              <div className="rounded-2xl border border-border/50 bg-background/40 p-3">
                <p className="text-[11px] text-muted-foreground">{lang === "ar" ? "الاسم بالكامل" : "Full name"}</p>
                <p className="mt-0.5 text-sm font-medium text-ivory">{user.fullName}</p>
              </div>
              <div className="rounded-2xl border border-border/50 bg-background/40 p-3">
                <p className="text-[11px] text-muted-foreground">{lang === "ar" ? "البريد الإلكتروني" : "Email"}</p>
                <p className="mt-0.5 text-sm font-medium text-ivory">{user.email}</p>
              </div>
              <div className="rounded-2xl border border-border/50 bg-background/40 p-3">
                <p className="text-[11px] text-muted-foreground">{lang === "ar" ? "رقم الهاتف" : "Phone"}</p>
                <p className="mt-0.5 text-sm font-medium text-ivory" dir="ltr">{user.phone}</p>
              </div>
              <div className="rounded-2xl border border-border/50 bg-background/40 p-3">
                <p className="text-[11px] text-muted-foreground">{lang === "ar" ? "عضو منذ" : "Member since"}</p>
                <p className="mt-0.5 text-sm font-medium text-ivory">{fmtDateTime(user.createdAt)}</p>
              </div>
            </div>

            <div className="mt-4">
              <p className="mb-2 text-xs font-semibold text-gold">{lang === "ar" ? "لون الصورة الرمزية" : "Avatar color"}</p>
              <div className="flex flex-wrap gap-2">
                {AVATAR_PALETTE.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => {
                      updateUser({ avatarColor: c });
                      toast.success(lang === "ar" ? "تم تحديث الصورة الرمزية" : "Avatar updated");
                    }}
                    className={cn(
                      "h-9 w-9 rounded-full transition-all duration-300",
                      user.avatarColor === c ? "ring-2 ring-gold ring-offset-2 ring-offset-background" : "hover:scale-110",
                    )}
                    style={{ background: c, boxShadow: user.avatarColor === c ? "var(--shadow-gold)" : undefined }}
                    aria-label={lang === "ar" ? "اختيار لون" : "Pick color"}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <div className="space-y-4">
          <Card>
            <CardTitle className="flex items-center gap-2">
              <Languages className="h-4 w-4 text-gold" />
              {lang === "ar" ? "اللغة والإعدادات" : "Language & settings"}
            </CardTitle>
            <CardDescription>{lang === "ar" ? "تفضيلات العرض واللغة" : "Display and language"}</CardDescription>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-2xl border border-border/50 bg-background/40 p-3.5">
                <div className="flex items-center gap-3">
                  <Languages className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-ivory">{lang === "ar" ? "اللغة" : "Language"}</p>
                    <p className="text-[11px] text-muted-foreground">{lang === "ar" ? "العربية / English" : "English / العربية"}</p>
                  </div>
                </div>
                <div className="flex gap-1 rounded-full border border-border/60 p-1">
                  {(["ar", "en"] as const).map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => {
                        setLang(l);
                        toast.success(l === "ar" ? "تم تغيير اللغة" : "Language changed");
                      }}
                      className={cn(
                        "rounded-full px-3 py-1 text-xs font-semibold transition-all",
                        lang === l ? "bg-gold/15 text-gold" : "text-muted-foreground hover:text-ivory",
                      )}
                    >
                      {l === "ar" ? "ع" : "EN"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between rounded-2xl border border-border/50 bg-background/40 p-3.5">
                <div className="flex items-center gap-3">
                  {isDark ? <Moon className="h-4 w-4 text-muted-foreground" /> : <Sun className="h-4 w-4 text-muted-foreground" />}
                  <div>
                    <p className="text-sm text-ivory">{lang === "ar" ? "الوضع الليلي" : "Dark mode"}</p>
                    <p className="text-[11px] text-muted-foreground">
                      {lang === "ar" ? "فعّل المظهر الداكن" : "Enable dark theme"}
                    </p>
                  </div>
                </div>
                <Switch checked={isDark} onChange={toggleTheme} label="Dark mode" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-gold" />
              {lang === "ar" ? "الإشعارات" : "Notifications"}
            </CardTitle>
            <CardDescription>{lang === "ar" ? "تفضيلات إشعارات المنصة" : "Platform notification preferences"}</CardDescription>
            <CardContent>
              <div className="flex items-center justify-between rounded-2xl border border-border/50 bg-background/40 p-3.5">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-ivory">{lang === "ar" ? "إشعارات البريد الإلكتروني" : "Email notifications"}</p>
                    <p className="text-[11px] text-muted-foreground">
                      {lang === "ar" ? "استقبال التحديثات والتنبيهات" : "Receive updates and alerts"}
                    </p>
                  </div>
                </div>
                <Switch
                  checked={user.emailNotifications}
                  onChange={(v) => {
                    updateUser({ emailNotifications: v });
                    toast.success(lang === "ar" ? "تم تحديث التفضيلات" : "Preferences updated");
                  }}
                  label="Email notifications"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Security */}
      <Card className="mt-4">
        <CardTitle className="flex items-center gap-2">
          <KeyRound className="h-4 w-4 text-gold" />
          {lang === "ar" ? "كلمة المرور والأمان" : "Password & security"}
        </CardTitle>
        <CardDescription>{lang === "ar" ? "غيّر كلمة المرور الخاصة بك" : "Change your password"}</CardDescription>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            <Input
              type="password"
              label={lang === "ar" ? "كلمة المرور الجديدة" : "New password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="********"
            />
            <Input
              type="password"
              label={lang === "ar" ? "تأكيد كلمة المرور" : "Confirm password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="********"
            />
          </div>
          <Button className="mt-4" variant="outline" onClick={changePassword}>
            <KeyRound className="h-4 w-4" />
            {lang === "ar" ? "تحديث كلمة المرور" : "Update password"}
          </Button>
        </CardContent>
      </Card>

      {/* Logout */}
      <div className="mt-6">
        <Button variant="danger" fullWidth size="lg" onClick={handleLogout}>
          <LogOut className="h-5 w-5" />
          {lang === "ar" ? "تسجيل الخروج" : "Log out"}
        </Button>
        <p className="mt-3 text-center text-[11px] text-muted-foreground">
          {lang === "ar" ? "سيتم إنهاء جلستك وإعادتك إلى شاشة الدخول" : "Your session will end and you'll return to login"}
        </p>
      </div>
    </AppShell>
  );
}

