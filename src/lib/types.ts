export type Role = "user" | "admin";
export type RequestStatus = "pending" | "approved" | "rejected";
export type RequestKind = "deposit" | "withdrawal";
export type Language = "ar" | "en";
export type Theme = "dark" | "light";

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  passwordHash: string;
  salt: string;
  role: Role;
  balance: number;
  invested: number;
  totalProfit: number;
  activePackageId: string | null;
  investmentStartedAt: string | null;
  status: "active" | "suspended";
  createdAt: string;
  avatarColor: string;
  language: Language;
  theme: Theme;
  emailNotifications: boolean;
}

export interface InvestmentPackage {
  id: string;
  nameAr: string;
  nameEn: string;
  amount: number;
  dailyReturn: number;
  durationDays: number;
  featuresAr: string[];
  featuresEn: string[];
  vip?: boolean;
  accent: string;
}

export interface DepositRequest {
  id: string;
  userId: string;
  userName: string;
  method: string;
  senderPhone: string;
  amount: number;
  receiptName: string;
  receiptData?: string;
  notes?: string;
  status: RequestStatus;
  createdAt: string;
  reviewedAt?: string;
}

export interface WithdrawalRequest {
  id: string;
  userId: string;
  userName: string;
  fullName: string;
  phone: string;
  amount: number;
  method: string;
  destination: string;
  notes?: string;
  status: RequestStatus;
  createdAt: string;
  reviewedAt?: string;
}

export interface Transaction {
  id: string;
  userId: string;
  type: RequestKind | "profit" | "subscription";
  amount: number;
  description: string;
  createdAt: string;
}

export interface AppNotification {
  id: string;
  userId: string | "all";
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
}

export interface ActivityLog {
  id: string;
  action: string;
  actor: string;
  at: string;
}

export interface NewsItem {
  id: string;
  title: string;
  body: string;
  date: string;
  category: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  content: string;
  rating: number;
  initials: string;
  color: string;
}
