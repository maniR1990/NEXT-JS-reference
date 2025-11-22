import React from 'react';
import { fetchSidebarLists } from './utils/apicalls';
import NameListSection from './components/NameListSection';

export default async function Sidebar() {
  const lists = await fetchSidebarLists();

  return (
    <div className="stack">
      {lists.map((list) => (
        <NameListSection key={list.id} data={list} />
      ))}
    </div>
  );
}
