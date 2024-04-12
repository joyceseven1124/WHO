import { Metadata } from 'next';
import CombinationForm from '../../../ui/formComponent/CombinationForm';
import EditFormSideBar from '../../../ui/formComponent/EditFormSideBar';

const metadata: Metadata = {
  title: 'Create',
};

export default function CreatePage() {
  return (
    <>
      <EditFormSideBar />
      <main className="margin max-w-1200 p-24">
        <form>
          <h1 className="text-black">用文字展現自己的個性、能力、經歷吧</h1>
          <CombinationForm />
        </form>
      </main>
    </>
  );
}
