import CreateStepsCombine from '@/src/app/ui/createPage/CreateStepsCombine';
import {
  fetchBusinessCard,
  fetchViewContent,
} from '@/src/lib/handleData/handleContentData';
import { Metadata } from 'next';

const metadata: Metadata = {
  title: 'Edit',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  return <CreateStepsCombine email={id} />;
}
