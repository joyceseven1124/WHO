import { signOut } from '@/src/auth';
import { checkAuthType } from '@/src/lib/definitions';
import { auth } from '@/src/lib/firebaseConfig';
import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
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
    setPersistence(auth, browserLocalPersistence).then(() => {
      return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
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
  });
}

export async function firebaseSignOut() {
  try {
    return auth.signOut();
  } catch (error) {
    console.error('Error signing out with Google', error);
  }
}

export async function checkAuthStatus(): Promise<checkAuthType> {
  return new Promise((resolve) => {
    auth.onAuthStateChanged(function (user: any) {
      if (user) {
        var email = user.email;
        var uid = user.uid;
        resolve({ email: email, uid: uid, authStatus: true });
      } else {
        resolve({ email: '', uid: '', authStatus: false });
      }
    });
  });
}

export async function persistAuthHandle() {
  await setPersistence(auth, browserLocalPersistence);
}

export async function authSignOut() {
  // 'use server';
  await signOut();
}
