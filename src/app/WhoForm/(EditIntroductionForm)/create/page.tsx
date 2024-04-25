import CreateStepsCombine from '@/src/app/ui/createPage/CreateStepsCombine';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create',
};

export default function Page() {
  return <CreateStepsCombine />;
}
