import React from 'react';
import { ApiDelayListResponse } from '../utils/apicalls';

type DelayList = ApiDelayListResponse<readonly number[]>;

type Props = {
  data: DelayList;
  description?: string;
};

export default function PreliminaryCard({ data, description }: Props) {
  return (
    <section className="card">
      <header className="card-header">
        <p className="eyebrow">{data.id}</p>
        <h3>{data.title}</h3>
        <p className="muted">
          {description ? `${description} · ` : null}
          Loaded at {new Date(data.loadedAt).toLocaleTimeString()}. Delay values: [
          {data.delayMsList.join(', ')}] (ms)
        </p>
      </header>
    </section>
  );
}
