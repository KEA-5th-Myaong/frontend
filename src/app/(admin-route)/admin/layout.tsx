import Link from 'next/link';
import '../../globals.css';
import localFont from 'next/font/local';
import { Metadata } from 'next';
import Image from 'next/image';
import AdminSideBar from './_components/AdminSideBar';
import Providers from '@/app/_components/Providers';

const pretendard = localFont({
  src: '../../fonts/PretendardVariable.woff2',
  display: 'swap', // 폰트 로딩 전략
  weight: '45 920', // 지원하는 폰트 두께 범위
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: {
    default: '관리자',
    template: '%s | PPLOG',
  },
  description: 'PPLOG 서비스를 관리하고 운영하는 관리자 페이지입니다.',
  keywords: ['관리자', '어드민', '서비스 관리', '관리자 대시보드', 'PPLOG 관리자'],
  openGraph: {
    title: 'PPLOG 관리자',
    description: 'PPLOG 서비스를 관리하고 운영하는 관리자 페이지입니다.',
    type: 'website',
    images: [
      {
        url: '/myaong.png',
        width: 1200,
        height: 630,
        alt: 'PPLOG 관리자',
      },
    ],
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${pretendard.variable} font-pretendard`}>
        <Link href="/main" className="absolute ml-16 pt-9">
          <Image src="/assets/adminLogo.svg" alt="로고" width={103} height={66} />
        </Link>

        <section className="flex bg-[#F5F5F5] min-h-screen pt-28 px-5">
          <AdminSideBar />
          <Providers>{children}</Providers>
        </section>
      </body>
    </html>
  );
}
