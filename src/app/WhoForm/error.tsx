'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center bg-black bg-opacity-50">
      <h2 className="text-center">Something went wrong!</h2>
      <button
        className=" mt-4 rounded-md  border border-black  bg-black px-4 py-2 text-sm   text-white transition-colors  hover:bg-white hover:text-black"
        onClick={
          // Attempt to recover by trying to re-render the invoices route
          () => reset()
        }
      >
        Try again
      </button>
    </main>
  );
}
