import { Noto_Sans, Noto_Sans_TC } from 'next/font/google';

export const notoSanaTc = Noto_Sans_TC({
  subsets: ['latin'],
  weight: ['100', '300', '500'],
});
export const notoSana = Noto_Sans({
  subsets: ['latin'],
  weight: ['300', '500', '700'],
});
