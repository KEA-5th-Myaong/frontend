import Carousel from './_components/Carousel';

export const metadata = {
  title: {
    default: 'PPLOG',
    template: '%s | PPLOG',
  },
  description: '모의면접과 자소서첨삭, 포트폴리오 관리를 한 번에',
  keywords: ['개발자 커뮤니티', '기술 블로그', '개발자 SNS', '프로그래밍', '개발자 네트워크'],
  openGraph: {
    title: 'PPLOG',
    description: '모의면접과 자소서첨삭, 포트폴리오 관리를 한 번에',
    images: [
      {
        url: '/mya.png', // 메인 피드 대표 이미지
        width: 1200,
        height: 630,
        alt: 'PPLOG 메인 피드',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
    siteName: 'PPLOG',
  },
  robots: {
    index: true, // true: 검색 결과에 페이지 포함
    follow: true, // true: 페이지의 링크를 따라갈 수 있음
    // 구글 검색엔진 전용 설정
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex justify-center pt-14 pb-20">
      <div className="w-full min-w-[360px] max-w-[982px] px-[42px]">
        <Carousel />
        {children}
      </div>
    </section>
  );
}
