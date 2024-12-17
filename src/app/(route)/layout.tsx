import type { Metadata, Viewport } from 'next';
import '../globals.css';
import localFont from 'next/font/local';
import Providers from '../_components/Providers';
import Header from '../_components/Header/Header';
import { ThemeProvider } from '../_components/ThemeProvider';

const pretendard = localFont({
  src: '../fonts/PretendardVariable.woff2',
  display: 'swap', // 폰트 로딩 전략
  weight: '45 920', // 지원하는 폰트 두께 범위
  variable: '--font-pretendard',
});

// 뷰포트 메타데이터 설정
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

// 페이지 메타데이터 설정
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  title: {
    default: 'PPLOG', // 기본 제목
    template: '%s | PPLOG', // 하위 페이지의 타이틀 템플릿
  },
  description: '블로그 서비스에서 모의면접과 자소서첨삭, 포트폴리오 관리를 한 번에', // 페이지 설명
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
  authors: [{ name: 'PPLOG' }], // 저자 정보
  creator: 'PPLOG', // 컨텐츠 생성자
  publisher: 'PPLOG', // 발행자
  formatDetection: {
    telephone: false, // 자동 포맷 감지 설정
    email: false, // 전화번호, 이메일, 주소 자동 감지 비활성화
    address: false,
  },
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    type: 'website', // 웹사이트 타입
    locale: 'ko_KR', // 한국어 로케일
    siteName: 'PPLOG', // 사이트명
    title: 'PPLOG', // 제목
    description: '블로그 서비스에서 모의면접과 자소서첨삭, 포트폴리오 관리를 한 번에',
    // 공유 시 표시될 이미지
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
  // 검색엔진 크롤링 설정
  robots: {
    index: true, // 페이지 인덱싱 허용
    follow: true, // 링크 추적 허용
    // 구글봇 전용 설정
    googleBot: {
      index: true, // 구글봇 인덱싱 허용
      follow: true, // 구글봇 링크 추적 허용
      'max-image-preview': 'large', // 이미지 미리보기 크기
      'max-snippet': -1, // 스니펫 길이 제한 없음
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
