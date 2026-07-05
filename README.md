<p align="center">
  <img src="./nimbl-logo.svg" alt="Nymbl logo" width="300" />
</p>

# Nymbl

Automated-marketing landing page. **Next.js (App Router) + TypeScript + CSS**, deployed on **Vercel**.

The page sells automation broadly, showcases AI social video with a live demo (powered by
OpenAI, server-side), books calls through Cal.com, and offers three Stripe **Test Mode**
subscription tiers.

<p align="center">
  <a href="https://claude-nymbl.vercel.app/"><img src="https://img.shields.io/badge/Live_Demo-Visit-ff2d95?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" /></a>
  <img src="https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-strict-1e6bff?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
  <img src="https://img.shields.io/badge/License-MIT-ff8a00?style=for-the-badge" alt="License" />
</p>

**🔗 Live site:** [claude-nymbl.vercel.app](https://claude-nymbl.vercel.app/)

---

## Author

<p align="center">
  <a href="https://github.com/jdbostonbu-ops">
    <img src="https://github.com/jdbostonbu-ops.png" width="120" style="border-radius:50%" alt="Jacqueline Delgado" />
  </a>
</p>

<p align="center">
  <strong>Jacqueline Delgado</strong><br />
  <a href="https://github.com/jdbostonbu-ops">@jdbostonbu-ops</a>
</p>

---

## Tech stack

| Layer | Tool |
| --- | --- |
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| Styling | CSS (design tokens in `:root`) |
| Fonts | Sora (display) + Inter (body) via `next/font` |
| AI script generation | OpenAI (server-side API route) |
| Booking | Cal.com |
| Payments | Stripe (Checkout + Customer Portal, Test Mode) |
| **Automation & workflows** | **Zapier** — all automations demonstrated on this landing page (AI video generation & social distribution, lead capture, scheduled posting, and workflow orchestration) are built and run through Zapier |
| Hosting | Vercel |

---

## Quick start

```bash
npm install
cp .env.example .env      # then fill in your values
npm run dev               # http://localhost:3000
```

## Environment variables

Set these in `.env` (local) and in the Vercel dashboard (production). `.env` is git-ignored.

| Variable | What it is | Exposed to browser? |
| --- | --- | --- |
| `OPENAI_API_KEY` | Powers the "Write my script" demo. | No — server only |
| `OPENAI_MODEL` | Optional model override (default `gpt-4o-mini`). | No |
| `NEXT_PUBLIC_CAL_LINK` | Your Cal.com 15-min booking link. | Yes |
| `STRIPE_SECRET_KEY` | Stripe secret key for Checkout and Customer Portal. | No |
| `STRIPE_PRICE_KICKSTART` | Stripe recurring monthly Price ID for Kickstart ($50). | No |
| `STRIPE_PRICE_CRUISE` | Stripe recurring monthly Price ID for Cruise Control ($150). | No |
| `STRIPE_PRICE_THROTTLE` | Stripe recurring monthly Price ID for Full Throttle ($500). | No |

Anything prefixed `NEXT_PUBLIC_` is public by design (it ships to the browser). The OpenAI key
and Stripe secret key are **not** public — they are read only inside server-side API routes.

---

## How the integrations wire up

**Write my script (OpenAI).** The form in `components/Demo.tsx` POSTs the four fields to
`/api/generate-script`. That route holds `OPENAI_API_KEY`, calls OpenAI, and returns a short
script. The browser never sees the key. Input is capped at 200 chars per field as a basic
abuse guard, and the demo only *generates* a script — it never posts or delivers anything.

**Book a 15-min call (Cal.com).** Every "Book a 15-min call" button links to
`NEXT_PUBLIC_CAL_LINK`. Set it to your Cal.com URL (e.g. `https://cal.com/you/15min`). To use
the popup embed instead of a link, add `@calcom/embed-react` and swap the anchor for its
button — the link version needs no dependency.

**Pricing (Stripe Test Mode).** Each tier button POSTs to `/api/checkout`, which creates a
Stripe Checkout Session in `subscription` mode with the matching `STRIPE_PRICE_*` ID and
redirects to Stripe. The browser never sees `STRIPE_SECRET_KEY`. Create three recurring/monthly
Prices in Stripe **in Test Mode** and paste the `price_` IDs. Test card:
`4242 4242 4242 4242`, any future expiry, any CVC/ZIP. The "Manage subscription" control POSTs
to `/api/customer-portal` using the saved Checkout Session ID to open Stripe's Customer Portal.

**Automation & workflows (Zapier).** Every automation showcased on this page — AI video
generation and multi-platform social distribution, lead capture, scheduled posting, and the
end-to-end workflow orchestration — is built and run through **Zapier**. The landing page is the
storefront; Zapier is the engine behind the demonstrated services.

All page content (tiers, services, testimonials, audience ticker) lives in `site.config.ts` —
edit copy there without touching components.

---

## Deploy to Vercel

1. Push this repo to GitHub.
2. In Vercel, "New Project" → import the repo (Vercel auto-detects Next.js).
3. Add the environment variables above under **Settings → Environment Variables**.
4. Deploy. You get a live `*.vercel.app` URL.

---

## Going live later (demo → real)

- Swap Stripe from **test** keys/links to **live** ones only when actually charging.
- If you embed proof videos, flip YouTube privacy from unlisted to public.

---

## Project structure
app/
layout.tsx                 fonts (Sora + Inter) + metadata
page.tsx                   assembles every section
globals.css                all styling (design tokens in :root)
api/generate-script/route.ts   server-side OpenAI call
api/checkout/route.ts          server-side Stripe Checkout Session
api/customer-portal/route.ts   server-side Stripe Customer Portal
components/
Nav, Hero, Marquee, Automate, Demo, Pricing, Testimonials, FinalCTA, Footer
Reveal.tsx                 scroll fade-in (IntersectionObserver)
lib/types.ts                 shared types (no any)
site.config.ts               links + all page content

## Code conventions

No `any`, no `var` (const/let only), functions written as closures, user input rendered as
escaped React text nodes (never `dangerouslySetInnerHTML`), and lean components that stay
readable. `tsconfig` runs in `strict` mode.

---

<p align="center">
  ⭐ <strong>If you find this useful, please <a href="https://github.com/jdbostonbu-ops">star the repo</a>!</strong> ⭐
</p>

<p align="center">
  <sub>Built by <a href="https://github.com/jdbostonbu-ops">Jacqueline Delgado</a> · Powered by Zapier automation · Deployed on Vercel</sub>
</p>