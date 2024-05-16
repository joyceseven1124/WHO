'use server';
import { signIn } from '@/src/auth';
// import { AuthError } from 'next-auth';
import { State } from '../definitions';
import {
  // persistAuthHandle,
  registerHandle,
  signInHandle,
} from '../handleData/handleAuth';
// import { getAuth} from "firebase/auth";
// import { revalidatePath } from 'next/cache';
// import { redirect } from 'next/navigation';

// export type State = {
//   errors?: any;
//   message?: string | null | undefined;
//   success?: boolean | undefined;
// };

export async function authenticate(
  prevState: State | void,
  formData: FormData
): Promise<State | void> {
  const type = formData.get('authType');
  const account = (formData.get('id') || '').toString();
  const password = (formData.get('password') || '').toString();

  if (type === 'register') {
    try {
      const result = await registerHandle(account, password);
      console.log('註冊完的結果', result);
      return { message: '註冊成功', errors: '', success: true };
    } catch (error: any) {
      let message = '發生非預期的錯誤';
      let errorCode = error.errorCode;
      switch (errorCode) {
        case 'auth/email-already-in-use':
          message = '此帳號已有人註冊';
        case 'auth/invalid-email':
          message = '此信箱格式有誤';
        case 'auth/weak-password':
          message = '密碼設定請6字元以上';
      }
      return {
        message: message,
        errors: error.errorMessage,
        success: false,
      };
    }
  } else {
    try {
      await signInHandle(account, password);
    } catch (error) {
      return {
        message: '登入失敗',
        errors: JSON.parse(JSON.stringify(error)),
        success: false,
      };
    }

    try {
      await signIn('credentials', formData, {
        callbackUrl: '/',
      });
    } catch (error) {
      // 需丟出throw防止跳轉
      throw error;
    }
  }
}
