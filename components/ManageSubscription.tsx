"use client";

import { useState } from "react";

const CHECKOUT_SESSION_KEY = "nymbl_checkout_session_id";

interface PortalResponse {
  url: string;
}

interface ErrorResponse {
  error: string;
}

const isObject = (value: unknown): value is Record<string, unknown> => {
  return value !== null && typeof value === "object";
};

const readError = (value: unknown): string => {
  if (isObject(value) && typeof value.error === "string") {
    return value.error;
  }

  return "Could not open the customer portal.";
};

const readPortalUrl = (value: unknown): string | null => {
  if (isObject(value) && typeof value.url === "string") {
    return value.url;
  }

  return null;
};

const getSavedSessionId = (): string | null => {
  const searchParams = new URLSearchParams(window.location.search);
  const sessionId = searchParams.get("session_id") ?? window.localStorage.getItem(CHECKOUT_SESSION_KEY);

  if (sessionId === null || sessionId.trim() === "") {
    return null;
  }

  return sessionId;
};

const ManageSubscription = ({ className = "" }: { className?: string }) => {
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleManage = async (): Promise<void> => {
    const sessionId = getSavedSessionId();
    if (sessionId === null) {
      setMessage("Start a subscription first, then this link can open your customer portal.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/customer-portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });
      const data: PortalResponse | ErrorResponse | unknown = await response.json();
      const portalUrl = readPortalUrl(data);

      if (!response.ok || portalUrl === null) {
        setMessage(readError(data));
        return;
      }

      window.location.href = portalUrl;
    } catch {
      setMessage("Could not reach the customer portal. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const classes = className === "" ? "manage-subscription" : `manage-subscription ${className}`;

  return (
    <div className={classes}>
      <button className="btn btn-primary" type="button" onClick={handleManage} disabled={loading}>
        {loading ? "Opening portal..." : "Manage subscription"}
      </button>
      {message !== "" ? <p className="checkout-message">{message}</p> : null}
    </div>
  );
};

export { CHECKOUT_SESSION_KEY };
export default ManageSubscription;
