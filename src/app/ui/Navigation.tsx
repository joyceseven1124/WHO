import { auth } from '@/src/auth';
import { UserIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import ButtonCva from './ButtonCva';
import SignOutButton from './LogOutButton';
import MyBlogButton from './MyBlogButton';
import Search from './Search';

export async function Navigation() {
  const session = await auth();
  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white">
      <div className="mx-auto grid max-w-[1200px] grid-cols-2 items-center gap-y-5 p-4 md:grid-cols-[auto_1fr_auto] md:justify-around md:gap-x-4">
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
          {session ? (
            <SignOutButton></SignOutButton>
          ) : (
            <Link href="/auth/login">
              <ButtonCva size={'sm'}>LogIn</ButtonCva>
            </Link>
          )}
        </div>
        <div className="col-span-2 md:col-auto">
          <Search />
        </div>
        <div className="hidden gap-x-3 md:flex">
          <MyBlogButton>
            <ButtonCva intent={'secondary'}>My Blog</ButtonCva>
          </MyBlogButton>

          {session ? (
            <SignOutButton></SignOutButton>
          ) : (
            <Link href="/auth/login">
              <ButtonCva>LogIn</ButtonCva>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
