import Link from 'next/link';
import AuthButtonSubmit from '../../ui/login/AuthButtonSubmit';
import LogInForm from '../../ui/login/LogInForm';
import PageTitle from '../../ui/login/PageTitle';

export default function Page() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="w-8/12 max-w-md text-black">
        <PageTitle>登入系統</PageTitle>
        <LogInForm authType="login">
          <Link
            href="/auth/register"
            className="text-black hover:underline hover:underline-offset-4"
          >
            註冊會員
          </Link>
          {/* <AuthButtonSubmit>登入</AuthButtonSubmit> */}
        </LogInForm>
      </div>
    </div>
  );
}
