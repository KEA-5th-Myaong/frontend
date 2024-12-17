import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: '공지사항',
    template: '%s | PPLOG 공지사항',
  },
  description: 'PPLOG의 새로운 소식과 업데이트, 이벤트 소식을 확인하세요',
  keywords: ['PPLOG 공지사항', '서비스 업데이트', '이벤트 소식', '서비스 안내', '새소식'],
  openGraph: {
    title: 'PPLOG 공지사항',
    description: 'PPLOG의 새로운 소식과 업데이트, 이벤트 소식을 확인하세요',
    type: 'website',
    images: [
      {
        url: '/myaong.png',
        width: 1200,
        height: 630,
        alt: 'PPLOG 공지사항',
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
