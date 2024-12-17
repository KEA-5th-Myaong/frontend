import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: '포트폴리오',
    template: '%s | PPLOG',
  },
  description: '당신의 작품들을 PPLOG와 함께 기록하고 관리하세요.',
  keywords: [
    '포트폴리오',
    '학력',
    '경력',
    '자격중',
    '프로젝트',
    '작품',
    '작업물',
    '개발자 포트폴리오',
    'PPLOG 포트폴리오',
  ],
  openGraph: {
    title: 'PPLOG 포트폴리오',
    description: '당신의 작품들을 PPLOG와 함께 기록하고 관리하세요.',
    type: 'website',
    images: [
      {
        url: '/myaong.png',
        width: 1200,
        height: 630,
        alt: 'PPLOG 포트폴리오',
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
