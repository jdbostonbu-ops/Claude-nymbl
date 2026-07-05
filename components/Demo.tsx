"use client";

import { useState } from "react";
import type { ScriptRequest, ScriptResponse, ErrorResponse } from "@/lib/types";

// The form calls our own /api/generate-script route (which holds the OpenAI
// key server-side). Output is rendered as React text nodes — React escapes
// them, so user input is never injected as HTML (the textContent-safe rule).
const Demo = () => {
  const [promoting, setPromoting] = useState<string>("");
  const [vibe, setVibe] = useState<string>("Spunky & high-energy");
  const [presenter, setPresenter] = useState<string>("Young & adventurous");
  const [sellingPoint, setSellingPoint] = useState<string>("");

  const [script, setScript] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleGenerate = async (): Promise<void> => {
    setLoading(true);
    setError("");
    setScript("");

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
        return;
      }

      setScript(data.script);
    } catch {
      setError("Could not reach the script service. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const hasResult = script !== "" || error !== "";

  return (
    <section className="section demo" id="demo">
      <div className="wrap">
        <div className="section-head center reveal in">
          <p className="eyebrow">Try it live</p>
          <h2 className="display">See it build you a video</h2>
          <p>Tell Nymbl what you sell. Watch it write the script in seconds.</p>
        </div>

        <div className="demo-grid">
          <div className="form-card">
            <div className="field">
              <label htmlFor="promo">What are you promoting?</label>
              <input
                id="promo"
                type="text"
                placeholder="e.g. tandem skydiving jumps"
                value={promoting}
                maxLength={200}
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
              <input
                id="selling"
                type="text"
                placeholder="e.g. book online in 60 seconds"
                value={sellingPoint}
                maxLength={200}
                onChange={(event) => setSellingPoint(event.target.value)}
              />
            </div>

            <button
              className="btn btn-primary"
              type="button"
              onClick={handleGenerate}
              disabled={loading}
            >
              {loading ? "Writing…" : "Write my script ◆"}
            </button>
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
