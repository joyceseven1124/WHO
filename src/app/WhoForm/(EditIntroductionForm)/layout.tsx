import CombinationForm from '@/src/app/ui/formComponent/CombinationForm';
import EditFormButtonsGroup from '@/src/app/ui/formComponent/EditFormButtonsGroup';
import { Metadata } from 'next';

const metadata: Metadata = {
  title: 'Create',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="margin mx-auto max-w-[1200px] p-4">
        <div>{children}</div>
        <form>
          <CombinationForm />
          <button>Cancel</button>
          <button>SAVE</button>
        </form>
        <EditFormButtonsGroup />
      </main>
    </>
  );
}
