import type { InvestmentPackage, NewsItem, Testimonial } from "./types";

export const PACKAGES: InvestmentPackage[] = [
  {
    id: "p10",
    nameAr: "باقة الانطلاق",
    nameEn: "Launch",
    amount: 10000,
    dailyReturn: 0.6,
    durationDays: 90,
    accent: "from-emerald-400/20 to-emerald-600/5",
    featuresAr: [
      "تتبع الأرباح بشكل لحظي",
      "دعم عبر البريد الإلكتروني",
      "تقارير أداء شهرية",
      "لوحة تحكم ذكية",
    ],
    featuresEn: ["Real-time profit tracking", "Email support", "Monthly reports", "Smart dashboard"],
  },
  {
    id: "p20",
    nameAr: "باقة النمو",
    nameEn: "Growth",
    amount: 20000,
    dailyReturn: 0.75,
    durationDays: 120,
    accent: "from-emerald-400/25 to-emerald-600/10",
    featuresAr: [
      "كل مزايا باقة الانطلاق",
      "دعم ذو أولوية",
      "تقارير أسبوعية",
      "إشعارات فورية",
    ],
    featuresEn: ["All Launch features", "Priority support", "Weekly reports", "Instant alerts"],
  },
  {
    id: "p30",
    nameAr: "باقة التميّز",
    nameEn: "Excellence",
    amount: 30000,
    dailyReturn: 0.9,
    durationDays: 150,
    accent: "from-teal-400/25 to-emerald-500/10",
    featuresAr: [
      "كل مزايا باقة النمو",
      "مستشار مالي مخصص",
      "تحليلات أداء متقدمة",
      "رسوم سحب مخفضة",
    ],
    featuresEn: ["All Growth features", "Dedicated advisor", "Advanced analytics", "Reduced fees"],
  },
  {
    id: "p40",
    nameAr: "باقة الازدهار",
    nameEn: "Prosperity",
    amount: 40000,
    dailyReturn: 1.05,
    durationDays: 180,
    accent: "from-teal-400/30 to-emerald-500/15",
    featuresAr: [
      "كل مزايا باقة التميّز",
      "تخصيص المحفظة يدويًا",
      "تقرير أداء شهري مفصل",
      "أولوية في الطلبات",
    ],
    featuresEn: ["All Excellence features", "Manual allocation", "Detailed reports", "Priority queue"],
  },
  {
    id: "p50",
    nameAr: "باقة الإنجاز",
    nameEn: "Achievement",
    amount: 50000,
    dailyReturn: 1.2,
    durationDays: 210,
    accent: "from-gold-400/30 to-gold-600/15",
    featuresAr: [
      "كل مزايا باقة الازدهار",
      "إدارة محفظة شبه مخصصة",
      "إشعارات السوق الفورية",
      "مدير حساب خاص",
    ],
    featuresEn: ["All Prosperity features", "Semi-dedicated portfolio", "Market alerts", "Account manager"],
  },
  {
    id: "p100",
    nameAr: "الباقة الذهبية",
    nameEn: "Golden",
    amount: 100000,
    dailyReturn: 1.4,
    durationDays: 270,
    accent: "from-gold-400/40 to-gold-600/20",
    featuresAr: [
      "كل مزايا باقة الإنجاز",
      "أولوية قصوى في التنفيذ",
      "مستشار مالي أول",
      "وصول مبكر للفرص",
    ],
    featuresEn: ["All Achievement features", "Top execution priority", "Senior advisor", "Early access"],
  },
  {
    id: "vip",
    nameAr: "VIP المشرق",
    nameEn: "Al-Mashreq VIP",
    amount: 250000,
    dailyReturn: 1.8,
    durationDays: 365,
    vip: true,
    accent: "from-gold-400/50 to-gold-600/30",
    featuresAr: [
      "كل مزايا الباقة الذهبية",
      "فريق إدارة استثمار مخصص",
      "استثمارات خاصة حصرية",
      "دعوة للفعاليات الفاخرة",
      "دعم على مدار الساعة",
    ],
    featuresEn: ["All Golden features", "Dedicated investment team", "Private deals", "VIP events", "24/7 support"],
  },
];

export interface PaymentMethod {
  id: string;
  labelAr: string;
  labelEn: string;
  icon: string;
  hint: string;
  color: string;
  accountNumber: string;
  accountName: string;
}

export const PAYMENT_METHODS: PaymentMethod[] = [
  { id: "vodafone", labelAr: "فودافون كاش", labelEn: "Vodafone Cash", icon: "📱", hint: "01xxxxxxxxx", color: "#e60000", accountNumber: "01001234567", accountName: "أحمد محمود — المشرق" },
  { id: "orange", labelAr: "أورانج كاش", labelEn: "Orange Cash", icon: "🟠", hint: "012xxxxxxxx", color: "#ff7900", accountNumber: "01223456789", accountName: "المشرق للاستثمار" },
  { id: "etisalat", labelAr: "اتصالات كاش", labelEn: "Etisalat Cash", icon: "📲", hint: "011xxxxxxxx", color: "#5b2c6f", accountNumber: "01112345678", accountName: "المشرق للاستثمار" },
  { id: "we", labelAr: "WE Pay", labelEn: "WE Pay", icon: "💳", hint: "015xxxxxxxx", color: "#f58533", accountNumber: "01534567890", accountName: "المشرق للاستثمار" },
  { id: "instapay", labelAr: "إنستا باي", labelEn: "InstaPay", icon: "✨", hint: "رقم المحفظة أو البطاقة", color: "#6c3483", accountNumber: "110123456", accountName: "almashreq@instapay" },
  { id: "bank", labelAr: "تحويل بنكي", labelEn: "Bank Transfer", icon: "🏦", hint: "IBAN أو رقم الحساب", color: "#1f618d", accountNumber: "EG760001004244558899001", accountName: "شركة المشرق للاستثمار" },
];

// Platform-wide statistics (animated counters on home)
export const PLATFORM_STATS = {
  activeInvestors: 12500,
  totalInvestments: 482000000,
  successfulWithdrawals: 98600,
  dailyProfit: 1420000,
};

export const TESTIMONIALS: Testimonial[] = [
  { id: "t1", name: "أحمد محمود", location: "القاهرة", content: "تجربة فاخرة وشفافة، تأكد إيداعي خلال ساعات والدعم كان في قمة الاحترافية. أنصح بها بشدة.", rating: 5, initials: "أم", color: "linear-gradient(135deg,#d4af37,#a67c00)" },
  { id: "t2", name: "فاطمة علي", location: "الإسكندرية", content: "أكثر منصة استثمارية أرتاح لها، التقارير واضحة والأرباح تصل في موعدها كل شهر دون تأخير.", rating: 5, initials: "فع", color: "linear-gradient(135deg,#2ecc71,#0f7b46)" },
  { id: "t3", name: "محمد حسن", location: "الجيزة", content: "بعد تجربة منصات كثيرة، المشرق الأفضل من حيث الأمان وسرعة التنفيذ. واجهة راقية جدًا.", rating: 5, initials: "مح", color: "linear-gradient(135deg,#3498db,#1a5276)" },
  { id: "t4", name: "سارة يوسف", location: "القاهرة", content: "فريق الدعم متجاوب بشكل مذهل، ساعدوني في اختيار الباقة الأنسب لميزانيتي وأهدافي.", rating: 5, initials: "سي", color: "linear-gradient(135deg,#9b59b6,#512e5f)" },
  { id: "t5", name: "خالد أحمد", location: "المنصورة", content: "السحب كان أسرع مما توقعت بكثير، والواجهة جميلة وسهلة الاستخدام حتى للمبتدئين.", rating: 5, initials: "خأ", color: "linear-gradient(135deg,#e67e22,#935116)" },
  { id: "t6", name: "نورة إبراهيم", location: "طنطا", content: "أمان حقيقي وشفافية كاملة في كل معاملة. أشعر أن أموالي في أيدٍ أمينة مع المشرق.", rating: 5, initials: "نإ", color: "linear-gradient(135deg,#16a085,#0e4d41)" },
  { id: "t7", name: "عمر فاروق", location: "السويس", content: "منصة تستحق الثقة، الربح اليومي يظهر بوضوح وكل شيء منظم. خدمة عملاء احترافية.", rating: 5, initials: "عف", color: "linear-gradient(135deg,#d4af37,#a67c00)" },
  { id: "t8", name: "ليلى حسن", location: "أسيوط", content: "احترافية عالية من أول لحظة حتى آخر عملية سحب. تجربة استثمارية راقية بكل المقاييس.", rating: 5, initials: "لح", color: "linear-gradient(135deg,#8e44ad,#4a235a)" },
];

export const NEWS: NewsItem[] = [
  { id: "n1", category: "أخبار", title: "منصة المشرق تحقق نموًا 40% في أصول العملاء هذا الربع", body: "أعلنت منصة المشرق عن نمو أصول عملائها بنسبة 40% خلال الربع الثالث، مدفوعة بثقة متزايدة في خدمات إدارة المحافظ.", date: "2025-01-12" },
  { id: "n2", category: "الباقات", title: "إطلاق باقة VIP الجديدة بعوائد تصل إلى 1.8% يوميًا", body: "الباقة الحصرية الجديدة متاحة بالدعوة فقط وتشمل فريق إدارة استثمار مخصص واستثمارات خاصة.", date: "2025-01-08" },
  { id: "n3", category: "الشراكات", title: "شراكات جديدة لتسريع تأكيد عمليات الإيداع", body: "وقّعت المنصة اتفاقيات مع كبرى مزودي خدمات الدفع في مصر لخفض زمن تأكيد الإيداعات إلى أقل من ساعة.", date: "2025-01-05" },
  { id: "n4", category: "تحديثات", title: "تحديث شامل: نظام تقارير مخصص وأدوات تحليل متقدمة", body: "أضافت المنصة نظام تقارير أسبوعي مخصص وأدوات تحليل جديدة لمساعدة المستثمرين على متابعة أدائهم.", date: "2024-12-28" },
  { id: "n5", category: "فعاليات", title: "المشرق تستضيف ندوة حول إدارة المحافظ الذكية", body: "سيعقد فريق الخبراء ندوة مفتوحة حول استراتيجيات إدارة المحافظ الذكية، متاحة لجميع عملاء المنصة.", date: "2024-12-20" },
];

export const PORTFOLIO_TREND = [
  { m: "أغسطس", value: 42 },
  { m: "سبتمبر", value: 51 },
  { m: "أكتوبر", value: 48 },
  { m: "نوفمبر", value: 63 },
  { m: "ديسمبر", value: 74 },
  { m: "يناير", value: 92 },
  { m: "فبراير", value: 118 },
];

export const ALLOCATION = [
  { name: "أسهم", value: 45, color: "#d4af37" },
  { name: "صكوك", value: 30, color: "#2ecc71" },
  { name: "ذهب", value: 15, color: "#9b59b6" },
  { name: "نقد", value: 10, color: "#3498db" },
];

export const ADMIN_EMAIL = "admin@mashreq.demo";
export const ADMIN_PHONE = "01000000000";
export const ADMIN_PASSWORD = "admin123";

