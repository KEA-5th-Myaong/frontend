import InterviewHistory from './_components/InterviewHistory';

export const metadata = {
  title: {
    default: '모의면접 | PPLOG',
    template: '%s | 모의면접 | PPLOG',
  },
  description: 'AI 면접관과 함께하는 모의면접 연습, 피드백 제공 및 면접 기록 관리',
  keywords: ['개발자 모의면접', '기술면접', 'AI 면접', '면접 연습', '모의면접', '표정분석'],
  openGraph: {
    title: '모의면접 | PPLOG',
    description: 'AI 면접관과 함께하는 개발자 모의면접 연습',
    images: [
      {
        url: '/mya.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'ko_KR',
    type: 'website',
    siteName: 'PPLOG',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row justify-center min-w-[360px] px-8 md:px-20 lg:px-24 xl:px-32 pt-24 md:pt-[22px] pb-12">
      <InterviewHistory />
      {children}
    </div>
  );
}
