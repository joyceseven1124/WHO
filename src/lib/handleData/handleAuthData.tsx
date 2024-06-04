'use server';
import { clientConfig, serverConfig } from '@/config';
import { signOut } from '@/src/auth';
import { checkAuthType } from '@/src/lib/definitions';
import { auth } from '@/src/lib/firebaseConfig';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { getTokens } from 'next-firebase-auth-edge';
import { cookies } from 'next/headers';

export async function registerHandle(email: string, password: string) {
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

export async function signInHandle(email: string, password: string) {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
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
}

export async function firebaseSignOut() {
  try {
    return auth.signOut();
  } catch (error) {
    console.error(error);
  }
}

export async function checkAuthStatus(): Promise<checkAuthType> {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, function (user: any) {
      if (user) {
        const email = user.email;
        const uid = user.uid;
        resolve({ email: email, uid: uid, authStatus: true });
      } else {
        resolve({ email: '', uid: '', authStatus: false });
      }
    });
  });
}

export async function authSignOut() {
  await signOut();
}

export async function getToken() {
  const result = await getTokens(cookies(), {
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    serviceAccount: serverConfig.serviceAccount,
  });

  return result;
}
