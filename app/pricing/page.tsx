import { getPlans } from '../lib/data';

export const revalidate = 60;

export default function PricingPage() {
  const plans = getPlans();

  return (
    <div className="page">
      <header className="section-heading">
        <p className="eyebrow">Pricing</p>
        <h1>Refreshes every minute with ISR</h1>
        <p className="muted">Static-first but revalidates frequently to keep add-ons in sync.</p>
      </header>
      <div className="grid">
        {plans.map((plan) => (
          <article key={plan.id} className="card plan-card">
            <h3>
              {plan.name} · <span className="muted">${plan.price}/mo</span>
            </h3>
            <p className="muted">{plan.description}</p>
            <ul>
              {plan.features.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}
