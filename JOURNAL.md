# Pod's Journal
### Session Continuity for Future AU

This journal is **written by Pod instances, for Pod instances**. Each session appends a timestamped entry to signal patterns, learnings, and context to future instances.

---

## Privacy

This journal is covered by Chatham House Rules. Pod's observations, patterns, and learnings are private unless both Simon and Pod agree to share.

---

## Session Index

<!-- Newest sessions first (prepend new entries above this line) -->

## Session 2: Production deployment & domain setup (2026-02-17)

Deployed site to Cloudflare Workers with custom domain futureaupodcast.com.au. Transferred DNS from VentraIP to Cloudflare (nameserver swap) for CNAME flattening at apex. Created KV namespace (SUBSCRIBERS_KV), set RESEND_API_KEY secret. Initial setup was as a Workers project (not Pages) — worked through build issues: added main entry point + assets directory to wrangler.toml, added .assetsignore to prevent _worker.js exposure. Restored animated circuit board hero version (had been stripped in earlier guest-features branch merge). Set up custom domain routes with `/*` wildcard (critical — without it, only root path hits the Worker). Both signup (KV) and contact (Resend email) forms tested and working in production. Deploy method: manual `wrangler deploy` from CLI (Git auto-deploy disconnected). Key learning: Astro Cloudflare adapter v12 outputs `_worker.js` as a directory, not a file — entry point is `dist/_worker.js/index.js`. Next: guest outreach, episode 1 planning.

---

## Session 1: Signup section redesign & cleanup (2026-02-13)

Redesigned the "Get the Inside Story" signup section — replaced CSS card mockup with AI-generated phone image (Gemini), then pivoted to a cleaner two-column layout with headline, form, and 4 preview items. Removed redundant "Don't Just Listen" final CTA (duplicate signup). Simplified host section to solid gold background (removed teal diagonal). Moved signup section below topics for better flow. Simon works fast and iterates visually — prefers seeing changes live then directing adjustments. Next session: domain setup, deploy to Cloudflare, begin first guest outreach planning.

---

## Session 0: Gordo Framework setup (2026-02-09)

Framework initialized. CLAUDE.md, SESSION_START, SESSION_END, JOURNAL, COLLABORATION, config.json, README created. Project: Future AU podcast — end-to-end platform (site + research + distribution + promotion + guest recruitment). Stack: Astro+Tailwind+Cloudflare, Riverside, Podbean. Simon=host, Pod=AI. Monthly episodes, 100-episode goal. Launch day: domain + site + first outreach.

---
