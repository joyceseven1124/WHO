import { Navigation } from '@/src/app/ui/Navigation';
import { notoSanaTc } from '@/src/app/ui/fonts';
import { Metadata } from 'next';
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
  return (
    <html lang="en">
      <head></head>
      <body className={notoSanaTc.className}>
        <Navigation />
        <StoreProvider>{children}</StoreProvider>
        <footer className="border-t p-4 text-center text-black text-slate-600">
          <p className="mb-2 text-lg">WHO I AM</p>
          <p>©2024 CHIA-YI LIU All Rights Reserved</p>
        </footer>
      </body>
    </html>
  );
}
