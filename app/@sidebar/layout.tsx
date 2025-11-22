export default function RootLayout({
  listA,
  listB,
}: {
  listA: React.ReactNode;
  listB: React.ReactNode;
}) {
  return (
    <div>
      <div>{listA}</div>
      <div>{listB}</div>
    </div>
  );
}
