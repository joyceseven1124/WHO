import { getToken } from '@/src/lib/handleData/handleAuthData';
import { notFound } from 'next/navigation';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tokens = await getToken();
  if (!tokens) {
    notFound();
  }
  return <>{children}</>;
}
