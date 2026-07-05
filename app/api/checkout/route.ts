import { NextResponse } from "next/server";
import Stripe from "stripe";
import type { TierId } from "@/lib/types";

export const runtime = "nodejs";

interface CheckoutRequest {
  tierId: TierId;
}

interface CheckoutResponse {
  url: string;
  sessionId: string;
}

const tierIds: ReadonlyArray<TierId> = ["kickstart", "cruise", "throttle"];

const isTierId = (value: unknown): value is TierId => {
  return typeof value === "string" && tierIds.includes(value as TierId);
};

const parseCheckoutRequest = (body: unknown): CheckoutRequest | null => {
  if (body === null || typeof body !== "object") {
    return null;
  }

  const source = body as Record<string, unknown>;
  if (!isTierId(source.tierId)) {
    return null;
  }

  return { tierId: source.tierId };
};

const getPriceId = (tierId: TierId): string | undefined => {
  const prices: Record<TierId, string | undefined> = {
    kickstart: process.env.STRIPE_PRICE_KICKSTART,
    cruise: process.env.STRIPE_PRICE_CRUISE,
    throttle: process.env.STRIPE_PRICE_THROTTLE,
  };

  return prices[tierId];
};

export const POST = async (request: Request): Promise<NextResponse<CheckoutResponse | { error: string }>> => {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (secretKey === undefined || secretKey === "") {
    return NextResponse.json({ error: "Stripe is not configured." }, { status: 500 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const input = parseCheckoutRequest(body);
  if (input === null) {
    return NextResponse.json({ error: "Choose a valid plan." }, { status: 400 });
  }

  const priceId = getPriceId(input.tierId);
  if (priceId === undefined || priceId === "") {
    return NextResponse.json({ error: "Stripe price is not configured for this plan." }, { status: 500 });
  }

  const origin = new URL(request.url).origin;
  const stripe = new Stripe(secretKey);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      allow_promotion_codes: true,
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel`,
    });

    if (session.url === null) {
      return NextResponse.json({ error: "Stripe did not return a checkout URL." }, { status: 502 });
    }

    return NextResponse.json({ url: session.url, sessionId: session.id });
  } catch {
    return NextResponse.json({ error: "Could not start Stripe Checkout." }, { status: 502 });
  }
};
