import Link from 'next/link';
import AuthButtonSubmit from '../../ui/login/AuthButtonSubmit';
import LogInForm from '../../ui/login/LogInForm';
import PageTitle from '../../ui/login/PageTitle';

export default function Page() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="w-8/12 max-w-md text-black">
        <PageTitle>註冊系統</PageTitle>
        <LogInForm authType="register">
          <Link
            href="/auth/login"
            className="text-black hover:underline hover:underline-offset-4"
          >
            已有帳號
          </Link>
          <AuthButtonSubmit>註冊</AuthButtonSubmit>
        </LogInForm>
      </div>
    </div>
  );
}
