'use client';
import { useFormStatus } from 'react-dom';

export default function AuthButtonSubmit({
  children,
}: {
  children: React.ReactNode;
}) {
  const status = useFormStatus();
  return (
    <button
      className="w-fit rounded bg-black p-3 text-white hover:bg-zinc-800"
      // form="authForm"
      type="submit"
      disabled={status.pending}
    >
      {status.pending ? '等待中' : children}
    </button>
  );
}
