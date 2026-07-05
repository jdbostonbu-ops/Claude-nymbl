const Footer = () => {
  return (
    <footer>
      <div className="wrap">
        <div className="logo">
          <span className="logo-dot" aria-hidden="true" />
          Nymbl
        </div>
        <p>Automated marketing for busy businesses.</p>
        <p className="footer-call">
          Don&apos;t want to book? Want to talk to us right away? Call us at{" "}
          <a href="tel:2222222222">222-222-2222</a>.
        </p>
        <p className="footer-note">Demo landing page · payments in test mode</p>
      </div>
    </footer>
  );
};

export default Footer;
