import { auth, signOut } from '@/src/auth';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <>
      <main className="margin mx-auto max-w-[1200px] p-4">
        <div>{children}</div>
      </main>
    </>
  );
}
