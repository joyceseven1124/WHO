import { auth } from '@/src/lib/firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

export function registerHandle(email: string, password: string) {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        resolve({ userData: user, success: true });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        reject({
          errorCode: errorCode,
          errorMessage: errorMessage,
          success: false,
        });
      });
  });
}

export function signInHandle(email: string, password: string) {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        resolve({ userData: user, success: true });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        reject({
          errorCode: errorCode,
          errorMessage: errorMessage,
          success: false,
        });
      });
  });
}

export async function firebaseSignOut() {
  try {
    return auth.signOut();
  } catch (error) {
    console.error('Error signing out with Google', error);
  }
}
