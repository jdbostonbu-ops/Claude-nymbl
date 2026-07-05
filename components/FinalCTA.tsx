import { calLink } from "@/site.config";

const FinalCTA = () => {
  return (
    <section className="final" id="book">
      <p className="eyebrow" style={{ color: "#fff" }}>
        Ready when you are
      </p>
      <h2 className="display">Your marketing runs itself—starting this week.</h2>
      <a href={calLink} className="btn btn-gold" target="_blank" rel="noreferrer">
        Book a 15-min call
      </a>
    </section>
  );
};

export default FinalCTA;
