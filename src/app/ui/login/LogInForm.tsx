'use client';
import { authenticate } from '@/src/lib/actions/authAction';
import { googleAuthenticate } from '@/src/lib/actions/authGoogleAction';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { useFormState } from 'react-dom';
import ButtonCva from '../ButtonCva';

export default function LogInForm({
  children,
  authType,
}: {
  children: React.ReactNode;
  authType: string;
}) {
  const initialState = { message: '', errors: {}, success: false };
  // const initialStateGoogleMsg = { message: null, errors: {}, success: false };
  const [stateMsg, dispatch] = useFormState(authenticate, initialState);
  const [passwordShow, setPasswordShow] = useState(false);
  // const [stateGoogleMsg, googleDispatch] = useFormState(
  //   googleAuthenticate,
  //   initialStateGoogleMsg
  // );
  return (
    <div className="flex flex-col gap-y-5 border p-10">
      <form className="flex flex-col gap-y-5" action={dispatch} id="authForm">
        <div className="flex flex-col gap-y-2">
          <input type="hidden" value={authType} name="authType"></input>
          <label htmlFor="accountInput">帳號</label>
          <input
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
          {stateMsg && stateMsg.success && stateMsg.message ? (
            <p className="text-lime-600">{stateMsg.message}</p>
          ) : null}
          {stateMsg && !stateMsg.success && stateMsg.message ? (
            <p className="text-rose-600">{stateMsg.message}</p>
          ) : null}
        </div>

        {/* <div>
          {stateGoogleMsg.success ? (
            <p className="text-lime-600">{stateGoogleMsg.message}</p>
          ) : (
            <p className="text-rose-600">{stateGoogleMsg.message}</p>
          )}
        </div> */}
        {/* <button className="flex w-full  gap-x-2 hover:underline hover:underline-offset-4">
        <FacebookIcon />
        <p>使用Facebook繼續</p>
      </button> */}
        {/* {authType === 'login' && (
          //  form='googleForm'
          <button
            type="button"
            className="flex w-full gap-x-2  hover:underline hover:underline-offset-4"
            onClick={() => {
              const result = googleAuthenticate();
            }}
          >
            <GoogleIcon />
            <p>使用Google繼續</p>
          </button>
        )} */}
        <div className="flex w-full items-center justify-between">
          {children}
        </div>
      </form>
    </div>
  );
}
