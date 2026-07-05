# Nymbl — Landing Page Outline

The complete blueprint for this build. Every decision that shaped the page.

## Identity
- **Name:** Nymbl ("nimble" — quick, effortless, automation-adjacent)
- **What it is:** a broad automation service. **AI social video is the showcase**, not the whole offer.
- **Audience:** time-starved owner-operators — realtors, insurance/solar agents, landscapers,
  roofers, skydiving/scuba/watersports operators, handmade jewelry & clothing makers, boutiques,
  and more. All welcome.
- **Core pain (headline driver):** "too busy running the business to market it."

## Look & Feel
- **High-energy, bright, media/AI — NOT calm/spa.**
- **NO purple/violet. NO lime green.**
- **Palette (from the approved mockup):**
  - Midnight navy `#0a1030` (base — not purple, not black)
  - Electric blue `#1e6bff`
  - Bright cyan `#00d4e0`
  - Hot magenta `#ff2d95`
  - Amber/orange `#ff8a00`
  - Electric yellow-gold `#ffd400`
  - Spectrum gradient: cyan → magenta → amber
- Large + small font contrast (Sora display, Inter body)
- One long scroll page
- Words fade in on scroll (IntersectionObserver)
- Animated gradient signature (media spectrum / AI iridescence / motion = automation)

## Build Stack
- Next.js (App Router) + TypeScript + CSS
- Deployed on Vercel
- **Code constraints:** no `any`, no `var` (const/let), closure-based functions,
  `textContent`-safe rendering of user input, lean-but-quality.

## Page Sections (top → bottom)
1. **Nav** — Nymbl logo + primary CTA "Book a 15-min call"
2. **Hero** — headline "We automate your marketing—so you don't have to." + value-prop subhead
   + primary CTA (book call) + secondary ("watch it make a video") + trust line
3. **Audience ticker** — scrolling strip of business types (so everyone sees themselves)
4. **What we automate** — grid: AI social video *featured*, plus lead capture, Slack/team alerts,
   weekly blogs, booking flow, custom automations, "9,000+ apps"
5. **AI video demo** — interactive form (promoting / vibe / presenter / selling point) →
   generates a preview script via OpenAI. **Capped at generation — the video is generated but NOT
   sent to the customer, to prevent abuse.**
6. **Pricing** — 3 tiers, Stripe Test Mode Payment Links:
   - **Kickstart** $50/mo — 5 services
   - **Cruise Control** $150/mo — 10 services (Most Popular)
   - **Full Throttle** $500/mo — 20 services
7. **Testimonials** — varied personas (realtor, dropzone owner, jeweler, insurance agent)
8. **Final CTA** — big "Book a 15-min call"
9. **Footer** — Nymbl + "demo · test mode"

## CTAs
- **Primary:** Cal.com 15-min call (the money action)
- **Secondary:** the demo form ("see it build a video")

## Copy / Claims
- Headline sells **automation broadly**; the demo spotlights AI social video.
- Stats: "distributed across 9,000+ apps" (reach — names no vendors).
- Video engines stay unnamed/unquantified (keeps vendors private).
- ❌ Never "9,000+ AI video apps" — that number is a total app-ecosystem count, not AI/video.
- Value proposition written from the customer's perspective.

## Integrations (wired in this scaffold)
- **Cal.com booking** — all "Book a 15-min call" buttons link to `NEXT_PUBLIC_CAL_LINK`.
- **Stripe Test Mode Payment Links ×3** — one per tier, from `NEXT_PUBLIC_STRIPE_*` (test card 4242…).
- **Demo form → OpenAI** — via the server-side API route `/api/generate-script`
  (key held server-side, never exposed; input length-capped; output rendered as escaped text).
- **Proof embeds (to add):** real LinkedIn + Instagram posts, and the YouTube video once its upload is fixed.

## Go-Live Checklist (later)
- YouTube video privacy: unlisted → public.
- Stripe: swap test links for live only when truly selling.
- Re-check any free-tier assets before transacting.
