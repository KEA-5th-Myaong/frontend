import Link from 'next/link';
import Image from 'next/image';
import Icons from '@/app/_components/ui/Icon';
import { ArrowIcon } from '@/app/_components/ui/iconPath';

export default function AdminSideBar() {
  const handleLogoutClick = () => {};
  return (
    <div className="w-full max-w-52">
      <div className="flex-center flex-col bg-black-3 py-9 text-white-0 font-semibold">
        <Image width={79} height={79} src="/assets/admin/main-admin.svg" alt="" />
        <p className="mt-2">관리자</p>
        <p className="mt-2 font-medium text-xs">yeonilil@naver.com</p>
        <button type="button" onClick={handleLogoutClick} className="mt-16 flex gap-1.5 items-center">
          <Image width={20} height={20} src="/assets/admin/main-logout.svg" alt="" />
          로그아웃
        </button>
      </div>

      <div className="mt-4 px-0.5 py-4 bg-black-3 font-semibold text-[13px] text-white-0">
        <Link href="/admin/contents" className="flex items-center gap-1 bg-white-0 py-2 pl-1 text-black-0">
          <Icons name={{ ...ArrowIcon, fill: 'black' }} className="rotate-180" />
          콘텐츠 관리
        </Link>
        <Link href="/admin/members" className="block pl-[18px] py-2">
          회원 관리
        </Link>
        <Link href="/admin/faq" className="block pl-[18px] py-2">
          문의 관리
        </Link>
        <Link href="/admin/member-corp" className="block pl-[18px] py-2">
          기업 관리
        </Link>
        <Link href="/admin/member-category" className="block pl-[18px] py-2">
          회원 카테고리 관리
        </Link>
        <Link href="/admin/notice" className="block pl-[18px] py-2">
          공지 관리
        </Link>
      </div>
    </div>
  );
}
