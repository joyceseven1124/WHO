import { FaceFrownIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const style = {
  width: 'fit-content',
  height: '200px',
  margin: '50vh auto auto',
  color: 'gray',
  textAlign: 'center' as 'center',
  display: 'grid',
  gap: '20px',
  justifyItems: 'center',
  transform: 'translateY(-100%)',
};

export default function NotFound() {
  return (
    <main style={style}>
      <FaceFrownIcon className="w-10 text-gray-400" />
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>Could not find the requested blog.</p>
      <Link
        href="/"
        className=" mt-4 rounded-md  border border-black  bg-black px-4 py-2 text-sm   text-white transition-colors  hover:bg-white hover:text-black"
      >
        Go Back Home
      </Link>
    </main>
  );
}
