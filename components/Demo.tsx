"use client";

import { useState } from "react";
import type { ScriptRequest, ScriptResponse, ErrorResponse, VideoRequest, VideoResponse } from "@/lib/types";

// The form calls our own /api/generate-script route (which holds the OpenAI
// key server-side). Output is rendered as React text nodes — React escapes
// them, so user input is never injected as HTML (the textContent-safe rule).
const Demo = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [business, setBusiness] = useState<string>("");
  const [promoting, setPromoting] = useState<string>("");
  const [vibe, setVibe] = useState<string>("Spunky & high-energy");
  const [presenter, setPresenter] = useState<string>("Young & adventurous");
  const [sellingPoint, setSellingPoint] = useState<string>("");

  const [script, setScript] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [orderMessage, setOrderMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [ordering, setOrdering] = useState<boolean>(false);

  const handleGenerateScript = async (): Promise<string> => {
    setLoading(true);
    setError("");
    setScript("");
    setOrderMessage("");

    // Critical: this payload is creative-brief data only. Contact and business
    // fields must never be sent to /api/generate-script or OpenAI.
    const payload: ScriptRequest = { promoting, vibe, presenter, sellingPoint };

    try {
      const response = await fetch("/api/generate-script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data: ScriptResponse | ErrorResponse = await response.json();

      if (!response.ok || "error" in data) {
        const message = "error" in data ? data.error : "Something went wrong.";
        setError(message);
        return "";
      }

      setScript(data.script);
      return data.script;
    } catch {
      setError("Could not reach the script service. Please try again.");
      return "";
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateVideo = async (): Promise<void> => {
    setError("");
    setOrderMessage("");

    if (name.trim() === "" || email.trim() === "" || phone.trim() === "" || business.trim() === "") {
      setError("Please add your name, email, phone, and business before ordering.");
      return;
    }

    setOrdering(true);

    const readyScript = await handleGenerateScript();
    if (readyScript === "") {
      setOrdering(false);
      return;
    }

    const payload: VideoRequest = {
      name,
      email,
      phone,
      business,
      promoting,
      vibe,
      presenter,
      sellingPoint,
      script: readyScript,
    };

    try {
      const response = await fetch("/api/generate-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data: VideoResponse | ErrorResponse = await response.json();

      if (!response.ok || "error" in data) {
        const message = "error" in data ? data.error : "Could not send your video order.";
        setError(message);
        return;
      }

      setOrderMessage("Your video order is in. We'll send the next steps to your email.");
    } catch {
      setError("Could not reach the video order service. Please try again.");
    } finally {
      setOrdering(false);
    }
  };

  const hasResult = script !== "" || error !== "";
  const isBusy = loading || ordering;

  return (
    <section className="section demo" id="demo">
      <div className="wrap">
        <div className="section-head center reveal in">
          <p className="eyebrow">Try it live</p>
          <h2 className="display">Need one video instead of 5. Order here!</h2>
          <p>Tell Nymbl what you sell. Watch it write the script in seconds.</p>
        </div>

        <div className="demo-grid">
          <div className="form-card">
            <div className="field-row">
              <div className="field">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  maxLength={200}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>

              <div className="field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  maxLength={200}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
            </div>

            <div className="field-row">
              <div className="field">
                <label htmlFor="phone">Phone</label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={phone}
                  maxLength={200}
                  onChange={(event) => setPhone(event.target.value)}
                />
              </div>

              <div className="field">
                <label htmlFor="business">Business</label>
                <input
                  id="business"
                  type="text"
                  placeholder="Your business"
                  value={business}
                  maxLength={200}
                  onChange={(event) => setBusiness(event.target.value)}
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="promo">What are you promoting?</label>
              <textarea
                id="promo"
                placeholder="e.g. tandem skydiving jumps"
                value={promoting}
                maxLength={1000}
                rows={4}
                onChange={(event) => setPromoting(event.target.value)}
              />
            </div>

            <div className="field">
              <label htmlFor="vibe">Vibe &amp; tone</label>
              <select id="vibe" value={vibe} onChange={(event) => setVibe(event.target.value)}>
                <option>Spunky &amp; high-energy</option>
                <option>Bold &amp; adventurous</option>
                <option>Sleek &amp; premium</option>
                <option>Fun &amp; playful</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="presenter">Presenter style</label>
              <select
                id="presenter"
                value={presenter}
                onChange={(event) => setPresenter(event.target.value)}
              >
                <option>Young &amp; adventurous</option>
                <option>Bold &amp; energetic</option>
                <option>Polished &amp; professional</option>
                <option>Friendly &amp; approachable</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="selling">
                Key selling point <span className="optional">(optional)</span>
              </label>
              <textarea
                id="selling"
                placeholder="e.g. book online in 60 seconds"
                value={sellingPoint}
                maxLength={1000}
                rows={4}
                onChange={(event) => setSellingPoint(event.target.value)}
              />
            </div>

            <button
              className="btn btn-primary"
              type="button"
              onClick={handleGenerateScript}
              disabled={isBusy}
            >
              {loading ? "Writing…" : "Write my script ◆"}
            </button>
            <button
              className="btn btn-gold"
              type="button"
              onClick={handleGenerateVideo}
              disabled={isBusy}
            >
              {ordering ? "Sending…" : "Generate my video"}
            </button>
            {orderMessage !== "" ? <p className="success">{orderMessage}</p> : null}
            <p className="form-note">
              Demo writes a preview script. The full service
              <br />
              renders the video and posts it for you.
            </p>
          </div>

          <div className="preview">
            <div className="inner">
              {!hasResult ? (
                <p className="placeholder">
                  Your script appears here.
                  <span>Fill in what you sell and hit “Write my script.”</span>
                </p>
              ) : error !== "" ? (
                <p className="error">{error}</p>
              ) : (
                <>
                  <div className="chips">
                    <span className="chip">{vibe}</span>
                    <span className="chip">{presenter}</span>
                  </div>
                  <div className="script-out">{script}</div>
                  <p className="after-note">
                    In the full service, Nymbl films this with your presenter and posts it for you.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo;
