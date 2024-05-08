// // 'use client';
// import { SessionProvider } from 'next-auth/react';
// import getServerSession from 'next-auth';
// import { authoptions } from '@/src/app/api/auth/[...nextauth]';

// const async NextAuthProvider = ({
//   children,
//   // session,
// }: {
//   children: React.ReactNode;
//   // session?: any;
// }) => {
//   const session = await getServerSession(authoptions);
//   return <SessionProvider session={session}>{children}</SessionProvider>;
// };

// export default NextAuthProvider;

'use client';
import { SessionProvider } from 'next-auth/react';

export default function NextAuthProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session?: any;
}) {
  // const session = await getServerSession(authoptions);
  // return <div>{children}</div>;
  return <SessionProvider>{children}</SessionProvider>;
}

// export default NextAuthProvider;
