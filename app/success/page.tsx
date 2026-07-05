import Link from "next/link";
import ManageSubscription from "@/components/ManageSubscription";

const SuccessPage = () => {
  return (
    <main className="status-page">
      <section className="section status-section">
        <div className="wrap">
          <div className="status-card success-card">
            <div className="status-brand" aria-label="Nymbl">
              <span className="logo-dot" aria-hidden="true" />
              <span>Nymbl</span>
            </div>
            <p className="eyebrow">Subscription started</p>
            <h1 className="display">Your automation plan is live.</h1>
            <p>
              Stripe confirmed your subscription. Nymbl is ready to turn your monthly automation
              bundle into finished marketing work.
            </p>
            <p className="status-test-note">
              No money is transferred in this transaction.
              <br />
              This is a Stripe demo subscription test feature.
            </p>
            <div className="status-actions">
              <Link className="btn btn-primary" href="/#demo">
                Try the script demo
              </Link>
              <ManageSubscription />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SuccessPage;
