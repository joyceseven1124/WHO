import { fetchViewContent } from '@/src/lib/handleData/handleContentData';
import { Metadata } from 'next';

const metadata: Metadata = {
  title: 'Hello',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  console.log('這個使用者是誰', id);
  await fetchViewContent(id);
  return <div>test 檢閱</div>;
}
