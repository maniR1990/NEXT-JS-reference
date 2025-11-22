export default function RootLayout({
  HomeListA,
  HomeListB,
  HomeListC,
}: {
  HomeListA: React.ReactNode;
  HomeListB: React.ReactNode;
  HomeListC: React.ReactNode;
}) {
  return (
    <div>
      <div>{HomeListA}</div>
      <div>{HomeListB}</div>
      <div>{HomeListC}</div>
    </div>
  );
}
