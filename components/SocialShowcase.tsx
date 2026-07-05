import Script from "next/script";
import Reveal from "@/components/Reveal";

const instagramUrl = "https://www.instagram.com/p/DaYfRkalc7d/";

const InstagramIcon = () => (
  <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1.2" />
  </svg>
);

const SocialShowcase = () => {
  return (
    <section className="section social-showcase">
      <div className="wrap social-wrap">
        <Reveal className="social-copy">
          <p className="eyebrow">AI-generated social posts</p>
          <h2 className="display">Landing pages meet Instagram momentum.</h2>
          <p>
            Nymbl turns the offer, voice, and message from your landing page into social-ready
            creative your audience can actually see, tap, and remember.
          </p>
          <a className="instagram-link" href={instagramUrl} target="_blank" rel="noreferrer">
            <InstagramIcon />
            View on Instagram
          </a>
        </Reveal>

        <Reveal className="instagram-frame">
          <blockquote
            className="instagram-media"
            data-instgrm-permalink={instagramUrl}
            data-instgrm-version="14"
          >
            <a href={instagramUrl} target="_blank" rel="noreferrer">
              Watch the Instagram post
            </a>
          </blockquote>
        </Reveal>
      </div>
      <Script src="https://www.instagram.com/embed.js" strategy="lazyOnload" />
    </section>
  );
};

export default SocialShowcase;
