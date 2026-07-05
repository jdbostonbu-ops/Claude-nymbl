"use client";

import { useState } from "react";
import { tiers } from "@/site.config";
import Reveal from "@/components/Reveal";
import ManageSubscription, { CHECKOUT_SESSION_KEY } from "@/components/ManageSubscription";
import type { TierId } from "@/lib/types";

interface CheckoutResponse {
  url: string;
  sessionId: string;
}

interface ErrorResponse {
  error: string;
}

const isObject = (value: unknown): value is Record<string, unknown> => {
  return value !== null && typeof value === "object";
};

const readCheckoutResponse = (value: unknown): CheckoutResponse | null => {
  if (
    isObject(value) &&
    typeof value.url === "string" &&
    typeof value.sessionId === "string"
  ) {
    return { url: value.url, sessionId: value.sessionId };
  }

  return null;
};

const readError = (value: unknown): string => {
  if (isObject(value) && typeof value.error === "string") {
    return value.error;
  }

  return "Could not start checkout. Please try again.";
};

const Pricing = () => {
  const [loadingTier, setLoadingTier] = useState<TierId | null>(null);
  const [message, setMessage] = useState<string>("");

  const startCheckout = async (tierId: TierId): Promise<void> => {
    setLoadingTier(tierId);
    setMessage("");

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tierId }),
      });
      const data: CheckoutResponse | ErrorResponse | unknown = await response.json();
      const checkout = readCheckoutResponse(data);

      if (!response.ok || checkout === null) {
        setMessage(readError(data));
        return;
      }

      window.localStorage.setItem(CHECKOUT_SESSION_KEY, checkout.sessionId);
      window.location.href = checkout.url;
    } catch {
      setMessage("Could not reach Stripe Checkout. Please try again.");
    } finally {
      setLoadingTier(null);
    }
  };

  return (
    <section className="section alt" id="pricing">
      <div className="wrap">
        <Reveal className="section-head center">
          <p className="eyebrow">Simple monthly plans</p>
          <h2 className="display">Pick your speed</h2>
          <p>Every plan is a bundle of done-for-you automations each month. Cancel anytime.</p>
        </Reveal>

        <div className="tiers">
          {tiers.map((tier) => (
            <Reveal className={`tier ${tier.variant}`} key={tier.id}>
              {tier.popular ? <span className="badge">Most popular</span> : null}
              <div className="tier-name">{tier.name}</div>
              <div className="tier-tag">{tier.tagline}</div>
              <div className="price">{tier.price}</div>
              <div className="per">{tier.cadence}</div>
              <div className="amount">{tier.amount}</div>
              <ul>
                {tier.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <button
                className="btn btn-solid"
                type="button"
                onClick={() => void startCheckout(tier.id)}
                disabled={loadingTier !== null}
              >
                {loadingTier === tier.id ? "Opening..." : `Start ${tier.name}`}
              </button>
            </Reveal>
          ))}
        </div>

        {message !== "" ? <p className="checkout-message pricing-message">{message}</p> : null}

        <p className="form-note pricing-note">
          Payments run in secure test mode for this demo.
        </p>
        <ManageSubscription className="pricing-manage" />
      </div>
    </section>
  );
};

export default Pricing;
