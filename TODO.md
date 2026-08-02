# Al-Mashreq Platform — Fix Remaining Issues Checklist

## Content & UX Fixes
- [x] Home heading: "أهلاً بك في حساب المشرق" + subtitle "إدارة استثماراتك وأرباحك بكل سهولة وأمان."
- [x] Hero banner image (`public/images/hero-banner.jpg`) with fallback
- [x] Fix `/invest` (real packages page, no "Hello")
- [x] Fix `/wallet` (real wallet page, no "Hello")
- [x] Add `/investment` route (same packages page)
- [x] "اكتشف الباقات" navigates to `/investment`
- [x] Payment methods: icon + account number + holder name + copy button
- [x] Receipt upload works (keep existing)
- [x] Statistics: animated counters (investors, investments, withdrawals, daily profit)
- [x] Testimonials: 8+ Arabic reviews (already in constants — verify display)
- [x] Packages: premium cards, hover, gradient, gold, calculator, expected profit, duration
- [x] Wallet: balance, pending profit, total profit, active package, history, charts
- [x] Profile: photo, name, phone, password, language, theme, logout (verify)

## Production Checks
- [x] `npx tsc --noEmit` — zero errors
- [x] `npm run build` — succeeds, no errors
- [x] Dev server: every route HTTP 200, no "Hello", no blank pages, no console errors
- [ ] Commit all changes
- [ ] Push to `origin/main`
- [ ] Vercel deployment Ready
- [ ] Live site verified

