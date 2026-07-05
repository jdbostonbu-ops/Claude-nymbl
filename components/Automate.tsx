import { services } from "@/site.config";
import Reveal from "@/components/Reveal";
import type { Service } from "@/lib/types";

// Returns the modifier classes for a card. Reveal prepends "reveal", so we
// pass "card <modifiers>" and the element ends up as "reveal card <modifiers>".
const modifiers = (service: Service): string => {
  if (service.size === "feature") {
    return "card feature";
  }
  if (service.size === "wide") {
    return `card wide ${service.variant}`;
  }
  return `card third ${service.variant}`;
};

const Automate = () => {
  const topRow = services.filter((s) => s.size !== "wide");
  const wideRow = services.filter((s) => s.size === "wide");

  return (
    <section className="section">
      <div className="wrap">
        <Reveal className="section-head">
          <p className="eyebrow">The whole gamut</p>
          <h2 className="display">One studio. Every repetitive thing—gone.</h2>
          <p>
            AI social video is our showcase. But Nymbl runs the busywork most owners never have
            time for.
          </p>
        </Reveal>

        <div className="grid">
          {topRow.map((service) =>
            service.size === "feature" ? (
              <Reveal as="article" className={modifiers(service)} key={service.title}>
                <div>
                  <span className="tag">{service.tag}</span>
                  <h3 className="display">{service.title}</h3>
                </div>
                <p>{service.body}</p>
              </Reveal>
            ) : (
              <Reveal as="article" className={modifiers(service)} key={service.title}>
                <span className="tag">{service.tag}</span>
                <h3>{service.title}</h3>
                <p>{service.body}</p>
              </Reveal>
            )
          )}
        </div>

        <div className="grid" style={{ marginTop: "1.1rem" }}>
          {wideRow.map((service) => (
            <Reveal as="article" className={modifiers(service)} key={service.title}>
              <span className="tag">{service.tag}</span>
              <h3>{service.title}</h3>
              <p>{service.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Automate;
