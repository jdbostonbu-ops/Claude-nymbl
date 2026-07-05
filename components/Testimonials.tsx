import { testimonials } from "@/site.config";
import Reveal from "@/components/Reveal";

const Testimonials = () => {
  return (
    <section className="section testi">
      <div className="wrap">
        <Reveal className="section-head center">
          <p className="eyebrow">From busy owners</p>
          <h2 className="display">
            They stopped posting.
            <br />
            Nymbl didn&apos;t.
          </h2>
        </Reveal>

        <div className="quotes">
          {testimonials.map((t) => (
            <Reveal as="figure" className="quote" key={t.name}>
              <div className="stars" aria-label="Five out of five stars">
                ★★★★★
              </div>
              <blockquote>“{t.quote}”</blockquote>
              <div className="who">
                <div className={`avatar ${t.avatarClass}`}>{t.initials}</div>
                <div>
                  <div className="name">{t.name}</div>
                  <div className="role">{t.role}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
