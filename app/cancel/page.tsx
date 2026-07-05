import Link from "next/link";

const CancelPage = () => {
  return (
    <main className="status-page">
      <section className="section status-section">
        <div className="wrap">
          <div className="status-card">
            <p className="eyebrow">Checkout canceled</p>
            <h1 className="display">No subscription was started.</h1>
            <p>
              You can head back to the plans, compare the monthly bundles, and restart checkout
              whenever you are ready.
            </p>
            <div className="status-actions">
              <Link className="btn btn-primary" href="/#pricing">
                Back to plans
              </Link>
              <Link className="btn btn-ghost" href="/#demo">
                Try the demo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CancelPage;
