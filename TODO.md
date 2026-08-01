# Al-Mashreq Platform — Complete Rebuild Checklist

## Phase 1: Core Libraries
- [x] Create git backup commit
- [x] `src/lib/types.ts` — all domain types
- [x] `src/lib/utils.ts` — formatters, uid, cn
- [x] `src/lib/security.ts` — password hashing + JWT-ready tokens
- [x] `src/lib/constants.ts` — 7 packages, payment methods, testimonials, news, charts
- [x] `src/lib/store.tsx` — database layer + AuthProvider + seed data

## Phase 2: Design System
- [x] `src/styles.css` — luxury theme (charcoal/graphite/emerald/gold, glass, light/dark)
- [x] `src/components/ui/index.tsx` — Button, Card, Input, Textarea, Badge, Switch, Skeleton, Progress, Tabs, Dialog, Select

## Phase 3: Layout & Shell
- [x] `src/components/layout/theme.tsx` — theme + language provider
- [x] `src/components/layout/logo.tsx`
- [x] `src/components/layout/sidebar.tsx` — desktop professional sidebar
- [x] `src/components/layout/bottom-nav.tsx` — exactly 5 animated icons
- [x] `src/components/layout/app-shell.tsx`

## Phase 4: Shared Components
- [x] `src/components/shared/stat-card.tsx`
- [x] `src/components/shared/count-up.tsx`
- [x] `src/components/shared/charts.tsx` — recharts wrappers
- [x] `src/components/shared/testimonial-carousel.tsx`
- [x] `src/components/shared/news-ticker.tsx`
- [x] `src/components/shared/status-pill.tsx`
- [x] `src/components/shared/status-timeline.tsx`

## Phase 5: Routes
- [x] `src/routes/__root.tsx` — root, auth guard, transitions
- [x] `src/routes/auth.tsx` — login/register/forgot password
- [x] `src/routes/index.tsx` — home dashboard
- [x] `src/routes/invest.tsx` — 7 packages
- [x] `src/routes/wallet.tsx` — balances + history
- [x] `src/routes/transfers.tsx` — deposit & withdraw
- [x] `src/routes/account.tsx` — profile & settings
- [x] `src/routes/admin.tsx` — admin panel
- [x] `src/routes/notifications.tsx`

## Phase 6: Cleanup
- [x] Delete old routes (dashboard, plans, requests, deposit-request, withdrawal-request)
- [x] Delete old components (cinematic, activity-ticker, testimonials, status-pill, app-shell, bottom-nav, ui/form, ui/card)
- [x] Regenerate routeTree.gen.ts
- [x] Migrate old `demo.tsx` references to new store (demo.tsx deleted)

## Phase 7: Strict Mode & Verification
- [x] `npx tsc --noEmit` — zero errors (after strict-mode fixes in auth, admin, transfers, news-ticker)
- [x] `npm run dev` runs without errors
- [x] All routes work, auth works, bottom nav works
- [x] Responsive mobile/desktop
- [ ] `npm run build` succeeds (final confirmation)

## Phase 8: Final QA
- [ ] Verify every route loads
- [ ] Verify login/register/forgot/reset flows
- [ ] Verify bottom nav exactly 5 items
- [ ] Verify admin approve/reject + balance adjustment
- [ ] Verify deposit/withdraw receipt upload & timeline
- [ ] Verify profile theme/language toggles
- [ ] Verify no console/runtime errors

