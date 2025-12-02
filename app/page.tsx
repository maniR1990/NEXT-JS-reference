import Link from 'next/link';
import { getFeatures, getPlans, getTestimonials } from './lib/data';

export default function HomePage() {
  const features = getFeatures();
  const plans = getPlans();
  const testimonials = getTestimonials();

  return (
    <div className="page">
      <section className="hero">
        <div>
          <p className="eyebrow">Multi-tenant SaaS template</p>
          <h1>Workspace Analytics for every team</h1>
          <p className="muted">
            A Next.js App Router demo that stitches together routing, auth, middleware, API routes, and
            streaming dashboards for isolated workspaces.
          </p>
          <div className="actions">
            <Link className="button" href="/auth/register">
              Start free trial
            </Link>
            <Link className="button ghost" href="/pricing">
              View pricing
            </Link>
          </div>
        </div>
        <div className="hero-panel">
          <div className="stat-card">
            <p className="eyebrow">Streaming dashboards</p>
            <h3>Server components with client charts</h3>
            <p className="muted">Progressively render dependent analytics without blocking the UI.</p>
          </div>
          <div className="stat-card">
            <p className="eyebrow">Multi-tenant routing</p>
            <h3>/[workspaceSlug]/app/...</h3>
            <p className="muted">Middleware keeps tenants isolated and redirects to default workspaces.</p>
          </div>
        </div>
      </section>

      <section>
        <div className="section-heading">
          <h2>Feature-rich by design</h2>
          <p className="muted">Static content rendered server-side for SEO and fast TTFB.</p>
        </div>
        <div className="grid">
          {features.map((feature) => (
            <article key={feature.title} className="card">
              <h3>{feature.title}</h3>
              <p className="muted">{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="section-heading">
          <h2>Plans for every stage</h2>
          <p className="muted">Pricing uses ISR to refresh quickly while staying static-first.</p>
        </div>
        <div className="grid">
          {plans.map((plan) => (
            <article key={plan.id} className="card plan-card">
              <p className="eyebrow">{plan.name}</p>
              <h3>${plan.price}/mo</h3>
              <p className="muted">{plan.description}</p>
              <ul>
                {plan.features.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className="section-heading">
          <h2>Loved by product teams</h2>
          <p className="muted">Testimonials are fetched at build time for instant render.</p>
        </div>
        <div className="grid testimonials">
          {testimonials.map((testimonial) => (
            <blockquote key={testimonial.author} className="card">
              <p>“{testimonial.quote}”</p>
              <footer>
                <strong>{testimonial.author}</strong> · {testimonial.company}
              </footer>
            </blockquote>
          ))}
        </div>
      </section>
    </div>
  );
}
