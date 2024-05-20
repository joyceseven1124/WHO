import CreateStepsCombine from '@/src/app/ui/createPage/CreateStepsCombine';
import { auth } from '@/src/auth';
import { fetchBusinessCard } from '@/src/lib/handleData/handleContentData';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Create',
};

export default async function Page() {
  const session = await auth();
  if (session && session.user && session.user.email) {
    const checkHaveData = await fetchBusinessCard(session.user.email);
    if (checkHaveData.success) redirect('/WhoForm/edit/' + session.user.email);
  }
  return <CreateStepsCombine />;
}
