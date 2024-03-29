import { UserIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import ButtonCva from './ButtonCva';
import Search from './Search';
// const buttonStyles = 'mr-1 border rounded border-neutral-900 p-2';

export function Navigation() {
  return (
    <header className="border-b border-gray-200">
      <div className="mx-auto grid max-w-[1200px] grid-cols-2 items-center gap-y-5 px-4 py-4 md:grid-cols-[auto_1fr_auto] md:justify-around md:gap-x-4">
        <Link href="/">
          <Image
            src="/logo.png"
            width={150}
            height={150}
            alt="website logo"
            className="h-auto w-36 md:w-48"
          />
        </Link>
        <div className="flex items-center gap-x-2 justify-self-end md:hidden">
          <button className="h-6 w-6">
            <UserIcon className="h-[24px] w-[24px] text-gray-500 peer-focus:text-gray-900" />
          </button>
          <Link href="/">
            <ButtonCva size={'sm'}>LogIn</ButtonCva>
          </Link>
        </div>
        <div className="col-span-2 md:col-auto">
          <Search />
        </div>
        <div className="hidden gap-x-3 md:flex">
          <Link href="/">
            <ButtonCva intent={'secondary'}>My Blog</ButtonCva>
          </Link>
          <Link href="/">
            <ButtonCva>LogIn</ButtonCva>
          </Link>
        </div>
      </div>
    </header>
  );
}
