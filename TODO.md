# Deployment Checklist — Al-Mashreq Platform

## Git Hygiene & Setup
- [x] Rename `gitignore` → `.gitignore` (git currently ignores nothing)
- [x] Untrack `node_modules` from git (31,351 files, ~260MB — keep on disk)
- [x] Verify `.gitignore` covers node_modules, .output, .tanstack, .wrangler, .vercel
- [x] Verify package.json + package-lock.json correct and consistent

## Build & Verify
- [x] `npm install` succeeds (418 packages, 0 vulnerabilities)
- [x] `npm run dev` — dev server starts, homepage returns HTTP 200
- [x] `npm run build` — succeeds with zero errors (client 2506 modules, SSR 88, Nitro 2535)
- [x] Fix every error found

## Commit & Push
- [x] Commit all changes — `2f9398b3` (chore: fix gitignore + untrack node_modules)
- [x] Push to `origin/main` — `39782a94..2f9398b3 main -> main`

## Vercel Deployment
- [x] Wait for Vercel auto-deployment to start (triggered by push)
- [x] Verify deployment succeeds (status Ready) — `dpl_4vbfVpcZ9MFEUn5Pgs3kvghU5L8N`
- [x] Verify live Vercel website is updated (all routes HTTP 200 on production alias)
- [x] If deployment fails: read logs, fix, commit, push, repeat until success (not needed — deployment succeeded on first attempt)

