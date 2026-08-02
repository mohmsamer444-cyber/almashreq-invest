# Al-Mashreq Platform — Deposit Approval Flow + UI Polish

## Core: Stop Instant Activation (DONE)
- [x] REMOVED the old instant activation on "اشترك الآن" (no more "تم تفعيل الباقة" upon click)
- [x] Clicking "اشترك الآن" now:
  - If wallet balance **≥** package price → opens confirmation dialog → deduct + activate + show "تم الاشتراك في الباقة بنجاح"
  - If balance **<** price → opens the **Premium Deposit Modal** (no activation)

## Premium Deposit Modal (DONE)
- [x] Selected package name
- [x] Package price (read-only)
- [x] Deposit amount (numeric input)
- [x] Payment method dropdown: Vodafone Cash, Orange Cash, Etisalat Cash, WE Pay, InstaPay, Bank Transfer
- [x] Payment info shown after selecting method: account number + holder name + copy button
- [x] Sender phone/account number input
- [x] Receipt image upload with live preview
- [x] Optional notes
- [x] Gold submit button: "إرسال طلب الإيداع"
- [x] Validation: method, amount, sender number, receipt — inline error messages
- [x] On submit: creates a **Pending** deposit request ONLY — no activation, no balance credit, no investment start, no "تم تفعيل الباقة"; shows "✅ تم إرسال طلب الإيداع بنجاح … قيد مراجعة الإدارة."

## Admin — Deposit Requests Page (DONE)
- [x] `/admin/deposits` fully built (view/search/filter/status)
- [x] View receipt (image preview + reference copy)
- [x] Approve / Reject pending requests
- [x] **On approve**: credits user wallet + transaction log + notification "✅ تم إضافة رصيد بقيمة XXX ج.م إلى حسابك."
- [x] On reject: notifies the user
- [x] Sidebar link + route registered in the route tree

## After Balance Exists (DONE)
- [x] User returns to packages with funded balance → "اشترك الآن" opens confirmation dialog
- [x] On confirm: deducts amount, activates package, shows "تم الاشتراك في الباقة بنجاح"

## Extra UI Smoothness (DONE)
- [x] Portal-based `Modal` component (body scroll lock, no scrollbar jump, right stacking)
- [x] Mobile-safe layout — no horizontal scroll (`overflow-x: clip` on root/main/page-enter)
- [x] Responsive modal max-height `92dvh` + scrollable content + `overscroll-contain`
- [x] Faster page transition (0.38s), smoother reveal (0.55s), refined modal scale/backdrop timing
- [x] Staggered card entrance on packages grid + trust strip
- [x] Gold button micro-interactions (lift/scale/brightness)
- [x] Global `img/svg/video/canvas` max-width + fluid table scrolling
- [x] Touch-target / `touch-action: manipulation` on mobile controls
- [x] Live counter on the home "Active investors" stat card

## Verification
- [x] `npx tsc --noEmit` — zero type errors
- [ ] `npm run build` — final production build check

