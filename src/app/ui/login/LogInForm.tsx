'use client';
import { auth } from '@/src/lib/firebaseConfig';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function LogInForm({
  children,
  authType,
}: {
  children: React.ReactNode;
  authType: 'register' | 'login';
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({ success: false, msg: '' });
  const [submitStatus, setSubmitStatus] = useState(false);
  const router = useRouter();

  const [passwordShow, setPasswordShow] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitStatus(true);
    setError({ success: false, msg: '' });

    try {
      if (authType === 'register') {
        await createUserWithEmailAndPassword(auth, email, password);

        // router.push('/auth/login');
      }
      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const idToken = await credential.user.getIdToken();

      await fetch('/api/login', {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });
      setSubmitStatus(true);
      router.push('/');
    } catch (e) {
      setSubmitStatus(false);
      setError({ success: false, msg: (e as Error).message });
    }
  }

  return (
    <div className="flex flex-col gap-y-5 border p-10">
      <form className="flex flex-col gap-y-5" action="#" id="authForm">
        <div className="flex flex-col gap-y-2">
          <input type="hidden" value={authType} name="authType"></input>
          <label htmlFor="accountInput">帳號</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            id="accountInput"
            name="id"
            placeholder="需為gmail格式"
            className="border p-2 outline-none focus:border-black"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="passwordInput">密碼</label>
          <div className="relative">
            <input
              type={passwordShow ? 'text' : 'password'}
              id="passwordInput"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              placeholder="需6字元"
              className="w-full border p-2 outline-none focus:border-black"
            />
            <div
              className="absolute right-2 top-1/2 -translate-y-1/2 transform bg-white"
              onClick={() => {
                setPasswordShow(!passwordShow);
              }}
            >
              {passwordShow ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </div>
          </div>
        </div>

        <div>
          <p className="text-rose-600">{error.msg}</p>
        </div>

        <div className="flex w-full items-center justify-between">
          {children}
          <button
            className="w-fit rounded bg-black p-3 text-white hover:bg-zinc-800"
            type="button"
            onClick={handleSubmit}
            disabled={submitStatus}
          >
            {submitStatus
              ? '等待中'
              : authType === 'register'
                ? '註冊'
                : '登入'}
          </button>
        </div>
      </form>
    </div>
  );
}
