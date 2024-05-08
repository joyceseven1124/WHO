import { signIn } from '@/src/auth';
import { auth, db } from '@/src/lib/firebaseConfig';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { AuthError } from 'next-auth';
export type State = {
  errors?: any;
  message?: string | null;
  success?: boolean | undefined;
};
//  const providerGoogle = new GoogleAuthProvider();
export async function googleAuthenticate() {
  try {
    // const authTest = getAuth(auth);
    const providerGoogle = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, providerGoogle);
    return { success: true, data: result, errorMsg: '' };
  } catch (error) {
    return { success: false, errorMsg: error, data: '' };
  }
}

export async function signOutWithGoogle() {
  try {
    await auth.signOut();
  } catch (error) {
    console.error('Error signing out with Google', error);
  }
}
