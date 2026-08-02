# Deployment Checklist — Al-Mashreq Platform

## Git Hygiene & Setup
- [ ] Rename `gitignore` → `.gitignore` (git currently ignores nothing)
- [ ] Untrack `node_modules` from git (31,351 files, ~260MB — keep on disk)
- [ ] Verify `.gitignore` covers node_modules, .output, .tanstack, .wrangler, .vercel
- [ ] Verify package.json + package-lock.json correct and consistent

## Build & Verify
- [ ] `npm install` succeeds
- [ ] `npm run dev` — dev server starts, homepage returns HTTP 200
- [ ] `npm run build` — succeeds with zero errors
- [ ] Fix every error found

## Commit & Push
- [ ] Commit all changes
- [ ] Push to `origin/main`

## Vercel Deployment
- [ ] Wait for Vercel auto-deployment to start
- [ ] Verify deployment succeeds (status Ready)
- [ ] Verify live Vercel website is updated
- [ ] If deployment fails: read logs, fix, commit, push, repeat until success

