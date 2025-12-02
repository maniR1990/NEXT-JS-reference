import Link from 'next/link';

export default function SettingsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { workspaceSlug: string };
}) {
  const base = `/${params.workspaceSlug}/app/settings`;
  const tabs = [
    { href: base, label: 'Workspace' },
    { href: `${base}/members`, label: 'Members' },
    { href: `${base}/billing`, label: 'Billing' },
  ];

  return (
    <div className="stack">
      <div className="tabs">
        {tabs.map((tab) => (
          <Link key={tab.href} href={tab.href}>
            {tab.label}
          </Link>
        ))}
      </div>
      {children}
    </div>
  );
}
