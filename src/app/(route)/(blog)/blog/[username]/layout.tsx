import { Metadata } from 'next';

// 동적 메타데이터 생성
export async function generateMetadata({ params }: { params: { username: string } }): Promise<Metadata> {
  return {
    title: {
      default: `${params.username}님의 블로그 | Popolog`,
      template: `%s | ${params.username}님의 블로그 | Popolog`,
    },
    description: `${params.username}님의 기술 블로그`,
    openGraph: {
      title: `${params.username}님의 블로그 | Popolog`,
      description: `${params.username}님의 기술 블로그`,
      images: [
        {
          url: '/mya.png',
          width: 1200,
          height: 630,
          alt: `${params.username}님의 블로그`,
        },
      ],
      type: 'article',
      locale: 'ko_KR',
      siteName: 'Popolog',
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
