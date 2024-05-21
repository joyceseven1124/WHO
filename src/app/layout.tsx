import AlertCard from '@/src/app/ui/AlertCard';
import { Navigation } from '@/src/app/ui/Navigation';
import { notoSanaTc } from '@/src/app/ui/fonts';
import { Metadata } from 'next';
import { auth } from '../auth';
import StoreProvider from './StoreProvider';
import './globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s | Who I am',
    default: 'Who I am',
  },
  description:
    'Introduce your experiences, abilities, characteristics, and so on to everyone. Let more people get to know you.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  let firstStatus = true;
  return (
    <html lang="en">
      <head></head>
      <body className={notoSanaTc.className}>
        {session &&
          firstStatus &&
          (() => {
            firstStatus = false;
            const nowTime = new Date().getTime();
            if (session.user && session.user.name) {
              // 將創建時間放入name中，避免錯誤，時間都為毫秒
              const tokenCreateTime = Number(session.user.name);
              if ((nowTime - tokenCreateTime) / 1000 >= 300) {
                return (
                  <>
                    <AlertCard />
                  </>
                );
              }
            }
          })()}
        <Navigation />
        <StoreProvider>{children}</StoreProvider>
        <footer className="border-t p-4 text-center text-slate-600">
          <p className="mb-2 text-lg">WHO I AM</p>
          <p>©2024 CHIA-YI LIU All Rights Reserved</p>
        </footer>
      </body>
    </html>
  );
}
