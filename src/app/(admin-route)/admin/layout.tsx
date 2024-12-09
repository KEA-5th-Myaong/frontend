import Link from 'next/link';
import '../../globals.css';
import Image from 'next/image';
import AdminSideBar from './_components/AdminSideBar';

export const metadata = {
  title: 'PPLOG 관리자',
  description: 'PPLOG 관리자 페이지',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Link href="/main" className="absolute ml-16 pt-9">
          <Image src="/assets/adminLogo.svg" alt="로고" width={103} height={66} />
        </Link>

        <section className="flex bg-[#F5F5F5] min-h-screen pt-28 px-5">
          <AdminSideBar />
          {children}
        </section>
      </body>
    </html>
  );
}
