import type { Metadata } from 'next';
import '../globals.css';
import localFont from 'next/font/local';
import Providers from '../_components/Providers';
import Header from '../_components/Header';

const pretendard = localFont({
  src: '../fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: 'PPlog',
  description: 'PPlog',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body className={`${pretendard.variable} font-pretendard`}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
