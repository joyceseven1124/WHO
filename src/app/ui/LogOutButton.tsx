'use client';
import { auth } from '@/src/lib/firebaseConfig';
import { useRouter } from 'next/navigation';
import ButtonCva from './ButtonCva';

export default function SignOutButton() {
  const router = useRouter();

  async function handleLogout() {
    await auth.signOut();
    await fetch('/api/logout');
    window.location.reload();
    router.push('/');
  }

  return <ButtonCva onClick={() => handleLogout()}>LogOut</ButtonCva>;
}
