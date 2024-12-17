import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: '문의페이지',
    template: '%s | PPLOG 문의',
  },
  description: 'PPLOG 서비스 관련 문의사항을 남겨주세요. 귀한 의견 감사합니다.',
  keywords: ['문의페이지', '문의하기', '서비스 문의', '문의사항', '건의하기', '의견 보내기'],
  openGraph: {
    title: 'PPLOG 문의페이지',
    description: 'PPLOG 서비스 관련 문의사항을 남겨주세요',
    type: 'website',
    images: [
      {
        url: '/myaong.png',
        width: 1200,
        height: 630,
        alt: 'PPLOG 문의페이지',
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
  return <section className="flex justify-center w-full">{children}</section>;
}
