'use client';
import { Metadata } from 'next';
import CombinationForm from '../../../ui/formComponent/CombinationForm';
import EditFormSideBar from '../../../ui/formComponent/EditFormButtonsGroup';

const metadata: Metadata = {
  title: 'Create',
};

export default function Page() {
  return <div>123</div>;
}

// export default function CreatePage() {
//   return (
//     <>
//       {/* <EditFormSideBar /> */}
//       <main className="margin max-w-1200 p-24">
//         <form>
//           {/* <h1 className="text-center text-black">
//             用文字展現自己的個性、能力、經歷吧
//           </h1> */}
//           <CombinationForm />
//           <button>Cancel</button>
//           <button>SAVE</button>
//         </form>
//       </main>
//     </>
//   );
// }
