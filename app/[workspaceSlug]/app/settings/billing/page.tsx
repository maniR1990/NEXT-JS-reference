'use client';

import { useState, useTransition } from 'react';

export default function BillingPage() {
  const [card, setCard] = useState('4242 4242 4242 4242');
  const [message, setMessage] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setMessage('Payment method saved via mocked client component.');
    });
  };

  return (
    <div className="stack">
      <h1>Billing</h1>
      <p className="muted">Client component form with simulated persistence.</p>
      <form onSubmit={handleSubmit} className="card stack">
        <label>
          <span>Card number</span>
          <input value={card} onChange={(event) => setCard(event.target.value)} />
        </label>
        <button className="button" type="submit" disabled={isPending}>
          {isPending ? 'Saving…' : 'Save card'}
        </button>
        {message && <p className="muted">{message}</p>}
      </form>
      <article className="card">
        <p className="eyebrow">Billing history</p>
        <ul>
          <li>May 2024 — Growth plan — $38</li>
          <li>Apr 2024 — Growth plan — $38</li>
        </ul>
      </article>
    </div>
  );
}
