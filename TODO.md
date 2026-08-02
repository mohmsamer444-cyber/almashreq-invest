# Deposit Workflow — Task Checklist

## Goal
Stop instant package activation on "اشترك الآن". Always open a Premium Deposit Modal → create Pending Deposit Request → Admin approves (adds balance + notification) → User then subscribes using wallet balance.

## Steps
- [x] 1. Rewrite `src/routes/admin.deposits.tsx` — complete Admin Deposit Requests page:
  - Admin-only guard
  - Stat cards (pending / approved / rejected / total approved)
  - Search + status filter
  - Request list with receipt preview
  - Approve / Reject actions
- [x] 2. UI polish in `src/styles.css`:
  - Faster page transitions
  - Smoother modal animations
  - Card stagger entrance utility
  - Better button hover effects
  - No layout jumping / stable cards
  - Preserve premium dark + gold design
- [x] 3. UI polish in `src/components/packages-page.tsx`:
  - Staggered card entrance animations
  - Smooth modal improvements
  - Verify "اشترك الآن" ALWAYS opens Deposit Modal (never instant activation)
  - Verify subscribe flow only activates when wallet balance >= price (with confirmation dialog)
- [x] 4. TypeScript check (`npx tsc --noEmit`) — zero errors
- [x] 5. Production build (`npm run build`) — succeeds
- [x] 6. Test all routes (HTTP 200, no "Hello", no blank pages)
- [x] 7. Commit changes
- [x] 8. Push to `origin/main`
- [x] 9. Verify live Vercel deployment

