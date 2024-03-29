import type { Metadata } from 'next';
// import { Inter } from 'next/font/google';
import { Navigation } from '@/src/app/ui/Navigation';
import { notoSanaTc } from '@/src/app/ui/fonts';
import './globals.css';

// const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Who I am',
  description:
    'Introduce your experiences, abilities, characteristics, and so on to everyone. Let more people get to know you.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head></head>
      <body className={notoSanaTc.className}>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
