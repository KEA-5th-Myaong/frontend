import type { Metadata } from 'next';
import '../globals.css';
import localFont from 'next/font/local';
import Providers from '../_components/Providers';
import Header from '../_components/Header/Header';
import { ThemeProvider } from '../_components/ThemeProvider';

const pretendard = localFont({
  src: '../fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: {
    default: 'PPLOG',
    template: '%s | PPLOG', // 하위 페이지의 타이틀 템플릿
  },
  description: '개발자들의 일상과 기술을 공유하는 소셜 플랫폼',
  keywords: [
    '커뮤니티',
    '기술 블로그',
    '개발자 SNS',
    '소통',
    '프로그래밍',
    '개발자 모의면접',
    '기술면접',
    'AI 면접',
    '면접 연습',
    '모의면접',
    '표정분석',
    '자소서',
    '블로그',
  ],
  authors: [{ name: 'PPLOG' }],
  creator: 'PPLOG',
  publisher: 'PPLOG',
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  icons: {
    icon: '/favicon.ico',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: 'PPLOG',
    title: 'PPLOG',
    description: '개발자들의 일상과 기술을 공유하는 소셜 플랫폼',
    images: [
      {
        url: '/mya.png',
        width: 1200,
        height: 630,
        alt: 'PPLOG',
      },
    ],
  },
  verification: {
    google: 'google-site-verification-code', // 구글 서치 콘솔 인증 코드
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
        <ThemeProvider>
          <Providers>
            <Header />
            {children}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
