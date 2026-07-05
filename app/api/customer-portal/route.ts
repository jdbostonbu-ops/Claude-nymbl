import { NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

interface PortalRequest {
  sessionId: string;
}

interface PortalResponse {
  url: string;
}

const parsePortalRequest = (body: unknown): PortalRequest | null => {
  if (body === null || typeof body !== "object") {
    return null;
  }

  const source = body as Record<string, unknown>;
  if (typeof source.sessionId !== "string" || source.sessionId.trim() === "") {
    return null;
  }

  return { sessionId: source.sessionId.trim() };
};

const getCustomerId = (customer: string | Stripe.Customer | Stripe.DeletedCustomer | null): string | null => {
  if (typeof customer === "string") {
    return customer;
  }

  if (customer !== null && customer.deleted !== true) {
    return customer.id;
  }

  return null;
};

export const POST = async (request: Request): Promise<NextResponse<PortalResponse | { error: string }>> => {
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

  const input = parsePortalRequest(body);
  if (input === null) {
    return NextResponse.json({ error: "No completed checkout session was found." }, { status: 400 });
  }

  const origin = new URL(request.url).origin;
  const stripe = new Stripe(secretKey);

  try {
    const checkoutSession = await stripe.checkout.sessions.retrieve(input.sessionId, {
      expand: ["customer"],
    });
    const customerId = getCustomerId(checkoutSession.customer);

    if (customerId === null) {
      return NextResponse.json(
        { error: "This checkout session does not have a Stripe customer yet." },
        { status: 400 }
      );
    }

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${origin}/#pricing`,
    });

    return NextResponse.json({ url: portalSession.url });
  } catch {
    return NextResponse.json({ error: "Could not open the customer portal." }, { status: 502 });
  }
};
