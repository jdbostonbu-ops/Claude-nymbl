import { calLink } from "@/site.config";
import Reveal from "@/components/Reveal";

const Hero = () => {
  return (
    <header className="hero">
      <div className="blobs" aria-hidden="true">
        <span className="blob b1" />
        <span className="blob b2" />
        <span className="blob b3" />
        <span className="blob b4" />
      </div>
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">Automation studio</p>
        </Reveal>
        <Reveal>
          <h1 className="display">
            We <span className="grad-text">automate</span> your marketing—so you don&apos;t have to.
          </h1>
        </Reveal>
        <Reveal>
          <p className="sub">
            Nymbl builds your videos, posts them everywhere, captures your leads, and handles the
            busywork across 9,000+ apps—automatically.
            <br />
            You run your business. We run the rest.
          </p>
        </Reveal>
        <Reveal>
          <div className="cta-row">
            <a href={calLink} className="btn btn-gold" target="_blank" rel="noreferrer">
              Book a 15-min call
            </a>
            <a href="#demo" className="btn btn-ghost">
              See it build you a video
            </a>
          </div>
        </Reveal>
        <Reveal>
          <p className="trust">Loved by realtors, roofers, studios, skydivers, and makers.</p>
        </Reveal>
      </div>
    </header>
  );
};

export default Hero;
