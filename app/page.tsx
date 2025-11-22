import React from 'react';
import HomeLists from './home-lists';

export default function Page() {
  return (
    <div className="page">
      <header className="page-header">
        <p className="eyebrow">Simple example</p>
        <h1>Easy server data with minimal layout</h1>
        <p className="muted">Each section loads a short list of names with a small simulated delay.</p>
      </header>

      <HomeLists />
    </div>
  );
}
