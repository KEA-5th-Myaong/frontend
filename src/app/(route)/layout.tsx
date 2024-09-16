import type { Metadata } from 'next';
import '../globals.css';
import localFont from 'next/font/local';
import Providers from '../_components/Providers';

const pretendard = localFont({
  src: '../fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: 'Popolog',
  description: 'Popolog',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <Providers>
        <body className={`${pretendard.variable} font-pretendard`}>{children}</body>
      </Providers>
    </html>
  );
}
