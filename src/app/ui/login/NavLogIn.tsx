'use client';
import { auth } from '@/src/lib/firebaseConfig';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ButtonCva from '../ButtonCva';
import SignOutButton from '../LogOutButton';

export default function NavLogIn({
  buttonSize,
}: {
  buttonSize?: 'sm' | 'md' | 'lg' | undefined;
}) {
  const [user, setUser] = useState(false);

  useEffect(() => {
    const authSubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        setUser(true);
      } else {
        setUser(false);
      }
    });
    return () => authSubscribe();
  }, []);

  return (
    <>
      {!user ? (
        <Link href="/auth/login">
          <ButtonCva size={buttonSize}>LogIn</ButtonCva>
        </Link>
      ) : (
        <SignOutButton></SignOutButton>
      )}
    </>
  );
}
