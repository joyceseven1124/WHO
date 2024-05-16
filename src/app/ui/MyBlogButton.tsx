'use server';
import { auth } from '@/src/auth';
import { checkAuthStatus } from '@/src/lib/handleData/handleAuth';
import {
  fetchBusinessCard,
  fetchViewContent,
} from '@/src/lib/handleData/handleContentData';
import { Link } from '@mui/material';
import ButtonCva from './ButtonCva';

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
