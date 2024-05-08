import Image from 'next/image';

export default function PageTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <p className="w-fit border-b bg-black p-3 text-center text-white">
        {children}
      </p>
      <p className="w-full bg-black p-4 text-xl text-white">WHO are YOU</p>
    </div>
  );
}
