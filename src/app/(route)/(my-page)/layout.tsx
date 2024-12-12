export const metadata = {
  title: {
    default: '마이페이지 | Popolog',
    template: '%s | 마이페이지 | Popolog',
  },
  description: '사용자의 프로필을 한눈에 확인할 수 있는 마이페이지',
  keywords: ['프로필', '비밀번호', '직군', '탈퇴', ''],
  openGraph: {
    title: '마이페이지 | Popolog',
    description: '사용자의 프로필을 한눈에 확인할 수 있는 마이페이지',
    images: [
      {
        url: '/mya.png',
        width: 1200,
        height: 630,
        alt: 'Popolog 마이페이지',
      },
    ],
    type: 'profile', // 프로필 페이지임을 명시
    locale: 'ko_KR',
    siteName: 'Popolog',
  },
  robots: {
    index: false, // 개인 페이지는 검색엔진에 노출되지 않도록
    follow: false,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <section className="flex justify-center w-full min-w-[360px] mb-20">{children}</section>;
}
