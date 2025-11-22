import React from 'react';
import { NameList } from '../utils/apicalls';

export default function NameListSection({ data }: { data: NameList }) {
  
  return (
    <section className="card">
      <header className="card-header">
        <p className="eyebrow">{data.id}</p>
        <h3>{data.title}</h3>
        {data.delayMs ? <p className="muted">Simulated delay: {data.delayMs} ms</p> : null}
      </header>
      <ul className="name-list">
        {data.names.map((name, index) => (
          <li key={`${data.id}-${index}`}>{name}</li>
        ))}
      </ul>
    </section>
  );
}
