export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="margin mx-auto max-w-[1200px] p-4">
        <div>{children}</div>
      </main>
    </>
  );
}
