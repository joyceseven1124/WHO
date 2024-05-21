'use server';
import { auth } from '@/src/auth';
import { fetchBusinessCard } from '@/src/lib/handleData/handleContentData';
import Link from 'next/link';

export default async function MyBlogButton({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  let href = '/WhoForm/create';
  if (session && session.user && session.user.email) {
    const checkHaveData = await fetchBusinessCard(session.user.email);
    if (checkHaveData.success) {
      href = '/WhoForm/edit/' + session.user.email;
    }
  }
  return <Link href={href}>{children}</Link>;
}
