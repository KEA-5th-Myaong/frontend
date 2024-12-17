import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: '회원가입',
    template: '%s | PPLOG',
  },
  description: 'PPLOG 회원가입 페이지입니다.',
  keywords: ['회원가입', '가입하기', '신규가입', '소셜가입', 'PPLOG 회원가입'],
  openGraph: {
    title: 'PPLOG 회원가입',
    description: 'PPLOG 회원가입 페이지입니다.',
    type: 'website',
    images: [
      {
        url: '/myaong.png',
        width: 1200,
        height: 630,
        alt: 'PPLOG 회원가입',
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
