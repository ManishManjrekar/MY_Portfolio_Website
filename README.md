# Manish Raj — Portfolio

Next.js 15 (App Router, TypeScript), no UI framework, one stylesheet. Static by default; the only live part is the Ask section, which calls the Project 6 API.

## Edit content, not components

Everything a visitor reads is in `/content`:

| File | What it holds |
|---|---|
| `content/profile.ts` | Name, headline, summaries, impact numbers, principles, links, résumé and booking URLs |
| `content/work.ts` | Case studies (with their Not GenAI / pipeline / agent category) and the GitHub repo list |
| `content/lab.ts` | The five AI-infrastructure projects, their status and (once measured) results |
| `content/career.ts` | Roles, certifications, education, toolbox |

Rules kept in the copy: facts only, no invented numbers. Lab `result` stays empty until measured.

## Before the first deploy

1. Put your updated résumé at `public/resume.pdf` (change the portfolio link inside it from WordPress to this site first).
2. Optional: set `bookingUrl` in `content/profile.ts` to a Calendly link; otherwise the call buttons open email.
3. Decide the headline: `headline` (fact-based, live) or `headlineBold` (swap it in once the evidence is published).

## Run locally

```powershell
npm install
copy .env.example .env.local
npm run dev        # http://localhost:3000
npm run build      # production build check
```

`?mode=architect` in the URL opens the Architect view directly (useful in a LinkedIn post or email).

## Deploy to Vercel (new project, same account)

1. Create a new GitHub repo (e.g. `portfolio`) and push this folder.
2. Vercel → Add New → Project → import the repo. Framework preset: Next.js. No build settings to change.
3. Environment variables (Production and Preview):
   - `NEXT_PUBLIC_SITE_URL` = your final URL (e.g. `https://manishraj.dev`)
   - `NEXT_PUBLIC_API_URL` = leave **empty** until Project 6 is live behind the Cloudflare Tunnel (e.g. `https://api.manishraj.dev`). Empty means the Ask section shows its offline state instead of a broken chat.
4. Deploy. Every push to `main` redeploys; pull requests get preview URLs.
5. Custom domain: Project → Settings → Domains → add `yourdomain`. Optionally add `architecture.yourdomain` to the existing **genai-architecture** project (its own settings), then update `architectureUrl` in `content/profile.ts`.

`NEXT_PUBLIC_*` values are baked in at build time, so redeploy after changing them.

## Connecting the Project 6 API

The Ask section expects the contract in Project 6's spec:

- `GET  {API}/healthz` → 200 when up (checked on page load, 4 s timeout)
- `POST {API}/v1/chat/stream` with `{question, conversation_id, mode}` → SSE events `run.created`, `route.selected`, `tool.called`, `message.delta`, `message.retracted`, `citations`, `run.completed` (carries the RunTrace), `error`
- `429` and `503` are shown as friendly limits, not errors

On the API side, add this site's exact origin(s) to `cors_allow_origins`.

## After launch

- Add a "Back to portfolio" link on genai-architecture.
- Update the résumé and LinkedIn Featured section with the new URL.
- Fill Lab results and flip statuses in `content/lab.ts` as projects land.
