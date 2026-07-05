import type { Service, Testimonial, Tier } from "@/lib/types";

// ---------------------------------------------------------------------------
// One place to edit the integration URLs. Values come from env vars so no
// secrets live in the code. Fallbacks are safe placeholders for local dev.
// ---------------------------------------------------------------------------

export const calLink: string =
  process.env.NEXT_PUBLIC_CAL_LINK ?? "https://cal.com/your-username/15min";

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------

export const audiences: ReadonlyArray<string> = [
  "Real estate",
  "Med-spa & studios",
  "Skydiving",
  "Handmade jewelry",
  "Roofing",
  "Solar",
  "Boutiques",
  "Insurance",
  "Landscaping",
  "Watersports",
];

export const services: ReadonlyArray<Service> = [
  {
    tag: "Showcase",
    title: "AI social video",
    body: "Scripts, voice, avatar, captions—generated and posted to every channel on a schedule. You never open an editor. No cameras, no editing software, no midnight edits.",
    variant: "feature",
    size: "feature",
  },
  {
    tag: "Leads",
    title: "Lead capture",
    body: "New leads pulled from your inbox, sorted, and ready to work.",
    variant: "c-blue",
    size: "third",
  },
  {
    tag: "Alerts",
    title: "Team updates",
    body: "The right message in Slack the moment it actually matters.",
    variant: "c-magenta",
    size: "third",
  },
  {
    tag: "Content",
    title: "Weekly blogs",
    body: "Fresh posts written and published every week, hands-free.",
    variant: "c-amber",
    size: "third",
  },
  {
    tag: "Bookings",
    title: "Booking flow",
    body: "Calls booked and every follow-up handled automatically.",
    variant: "c-cyan",
    size: "third",
  },
  {
    tag: "And 9,000+ more",
    title: "If it has an app, Nymbl connects it.",
    body: "Spreadsheets, CRMs, calendars, payments, forms—wired together so your tools finally talk to each other.",
    variant: "c-gold",
    size: "wide",
  },
  {
    tag: "Built for you",
    title: "Custom automations",
    body: "Tell us the task you dread. We turn it into something that runs on its own.",
    variant: "c-ink",
    size: "wide",
  },
];

export const tiers: ReadonlyArray<Tier> = [
  {
    id: "kickstart",
    name: "Kickstart",
    tagline: "Test the waters.",
    price: "$50",
    cadence: "per month",
    amount: "5 automated services / month",
    features: [
      "AI social video posts",
      "Auto-posting to your channels",
      "Lead capture from email",
      "Cancel anytime",
    ],
    variant: "t1",
    popular: false,
  },
  {
    id: "cruise",
    name: "Cruise Control",
    tagline: "Set it and cruise.",
    price: "$150",
    cadence: "per month",
    amount: "10 automated services / month",
    features: [
      "Everything in Kickstart",
      "Weekly AI blog posts",
      "Slack & team alerts",
      "Booking & follow-up flow",
    ],
    variant: "popular",
    popular: true,
  },
  {
    id: "throttle",
    name: "Full Throttle",
    tagline: "Send it.",
    price: "$500",
    cadence: "per month",
    amount: "20 automated services / month",
    features: [
      "Everything in Cruise Control",
      "Custom automations built for you",
      "Priority turnaround",
      "Connect any of 9,000+ apps",
    ],
    variant: "t3",
    popular: false,
  },
];

export const testimonials: ReadonlyArray<Testimonial> = [
  {
    quote:
      "I listed three homes and never touched Canva. Nymbl posted walkthroughs while I was out showing houses.",
    name: "Marcus R.",
    role: "Real estate agent",
    initials: "MR",
    avatarClass: "a1",
  },
  {
    quote:
      "Our jump videos hit socials the same day, automatically. Bookings are up and I'm not on my laptop at midnight.",
    name: "Diego S.",
    role: "Dropzone owner",
    initials: "DS",
    avatarClass: "a2",
  },
  {
    quote:
      "Every new piece gets its own little video. It feels like I quietly hired a whole marketing team.",
    name: "Priya K.",
    role: "Handmade jeweler",
    initials: "PK",
    avatarClass: "a3",
  },
  {
    quote:
      "New leads land sorted in my inbox and my socials post themselves. I actually get my evenings back.",
    name: "Tanya W.",
    role: "Insurance agent",
    initials: "TW",
    avatarClass: "a4",
  },
  {
    quote:
      "I spend my days with clients, not making posts. Nymbl keeps my specials, openings, and wellness tips showing up every week.",
    name: "Elena M.",
    role: "Massage therapist",
    initials: "EM",
    avatarClass: "a5",
  },
  {
    quote:
      "New arrivals get posted before the racks are even full. It keeps our boutique visible without adding one more task to the day.",
    name: "Jada L.",
    role: "Clothing boutique owner",
    initials: "JL",
    avatarClass: "a6",
  },
];
