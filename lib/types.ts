// Shared types for the Nymbl landing page. No `any` — every shape is explicit.

export interface ScriptRequest {
  promoting: string;
  vibe: string;
  presenter: string;
  sellingPoint: string;
}

export interface ScriptResponse {
  script: string;
}

export interface ErrorResponse {
  error: string;
}

export type TierId = "kickstart" | "cruise" | "throttle";

export interface Tier {
  id: TierId;
  name: string;
  tagline: string;
  price: string;
  cadence: string;
  amount: string;
  features: ReadonlyArray<string>;
  variant: "t1" | "popular" | "t3";
  popular: boolean;
}

export interface Service {
  tag: string;
  title: string;
  body: string;
  variant: "feature" | "c-blue" | "c-magenta" | "c-amber" | "c-cyan" | "c-gold" | "c-ink";
  size: "feature" | "third" | "wide";
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initials: string;
  avatarClass: "a1" | "a2" | "a3" | "a4" | "a5" | "a6";
}
