import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: '로그인',
    template: '%s | PPLOG',
  },
  description: 'PPLOG 로그인 페이지입니다. 소셜 로그인으로 간편하게 시작하세요.',
  keywords: ['로그인', '회원가입', '소셜로그인', '시작하기', 'PPLOG 로그인'],
  openGraph: {
    title: 'PPLOG 로그인',
    description: 'PPLOG 로그인 페이지입니다. 소셜 로그인으로 간편하게 시작하세요.',
    type: 'website',
    images: [
      {
        url: '/myaong.png',
        width: 1200,
        height: 630,
        alt: 'PPLOG 로그인',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
