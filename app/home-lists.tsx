import React from 'react';
import { fetchHomeLists } from './utils/apicalls';
import NameListSection from './components/NameListSection';

export default async function HomeLists() {
  const lists = await fetchHomeLists();

  return (
    <div className="grid">
      {lists.map((list) => (
        <NameListSection key={list.id} data={list} />
      ))}
    </div>
  );
}
