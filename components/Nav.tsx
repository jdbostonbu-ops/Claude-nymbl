import { calLink } from "@/site.config";

const Nav = () => {
  return (
    <nav className="nav">
      <div className="wrap">
        <div className="logo">
          <span className="logo-dot" aria-hidden="true" />
          Nymbl
        </div>
        <a href={calLink} className="btn btn-gold" target="_blank" rel="noreferrer">
          Book a 15-min call
        </a>
      </div>
    </nav>
  );
};

export default Nav;
