'use server';
import Link from 'next/link';

export default async function MyBlogButton({
  children,
}: {
  children: React.ReactNode;
}) {
  let href = '/WhoForm/create';
  return <Link href={href}>{children}</Link>;
}
