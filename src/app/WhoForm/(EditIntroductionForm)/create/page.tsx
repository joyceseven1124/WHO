import CreateStepsCombine from '@/src/app/ui/createPage/CreateStepsCombine';
import { fetchBusinessCard } from '@/src/lib/handleData/fetchContentData';
import { getToken } from '@/src/lib/handleData/handleAuth';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Create',
};

export default async function Page() {
  const tokens = await getToken();
  if (tokens && tokens?.decodedToken.email) {
    const userId = tokens?.decodedToken.email;
    const checkHaveData = await fetchBusinessCard(userId);
    if (checkHaveData.success) redirect('/WhoForm/edit/' + userId);
  }
  return <CreateStepsCombine />;
}
