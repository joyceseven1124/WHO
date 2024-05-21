'use server';
import { signOut } from '@/src/auth';
import { auth } from '@/src/lib/firebaseConfig';
import ButtonCva from './ButtonCva';

export default async function SignOutButton() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
        await auth.signOut();
      }}
    >
      <ButtonCva>LogOut</ButtonCva>
    </form>
  );
}
