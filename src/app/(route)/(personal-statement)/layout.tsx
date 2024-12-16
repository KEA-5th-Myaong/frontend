import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'AI 자기소개서 첨삭',
    template: '%s | PPLOG 자기소개서',
  },
  description: 'AI가 제안하는 맞춤형 자기소개서 첨삭 서비스 - 더 좋은 자기소개서를 위한 실시간 피드백',
  keywords: [
    '자기소개서 작성',
    'AI 자기소개서',
    '자기소개서 첨삭',
    '취업 준비',
    '인공지능 첨삭',
    '자소서 피드백',
    '취준생 자기소개서',
    '합격 자기소개서',
  ],
  openGraph: {
    title: 'AI 자기소개서 첨삭 서비스 | PPLOG',
    description: 'AI가 도와주는 맞춤형 자기소개서 작성과 실시간 피드백',
    type: 'website',
    images: [
      {
        url: '/myaong.png',
        width: 1200,
        height: 630,
        alt: 'PPLOG AI 자기소개서 서비스',
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
  return <div className="pt-14 md:pt-0">{children}</div>;
}
