'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Icons from '@/app/_components/ui/Icon';
import {
  CorpIcon,
  FaqIcon,
  FolderIcon,
  LogOutIcon,
  MemberCategoryIcon,
  MemberIcon,
  NoticeIcon,
} from '@/app/_components/ui/iconPath';

export default function AdminSideBar() {
  const pathname = usePathname();
  const handleLogoutClick = () => {};

  if (pathname === '/admin') {
    return null;
  }

  const getLinkClassName = (href: string) => {
    const isActive = pathname === href;
    return `group flex gap-3 py-3 px-4 mx-1.5 rounded-lg hover:bg-[#F5F5F5] hover:text-[#1E1E1E] ${
      isActive
        ? 'bg-[#F5F5F5] text-[#1E1E1E] [--icon-stroke:#303030]'
        : '[--icon-stroke:#FFF] hover:[--icon-stroke:#303030]'
    }`;
  };

  return (
    <div className="w-full max-w-52">
      <div className="flex-center flex-col bg-black-3 py-9 text-white-0 font-semibold">
        <Image width={79} height={79} src="/assets/admin/main-admin.svg" alt="" />
        <p className="mt-2">관리자</p>
        <p className="mt-2 font-medium text-xs">yeonilil@naver.com</p>
        <button type="button" onClick={handleLogoutClick} className="mt-16 flex gap-1.5 items-center">
          <Icons name={LogOutIcon} />
          로그아웃
        </button>
      </div>

      <div className="mt-4 px-0.5 pt-2 pb-9 bg-black-3 font-semibold text-[13px] text-white-0">
        <div className="px-4 pt-2 pb-1">
          <p className="text-white-0 text-opacity-70 text-sm">PPLOG</p>
          <p className="text-white-0 font-semibold">관리자 메뉴</p>
        </div>

        <div className="h-[1px] bg-[#444444] mx-4 my-2" />

        <Link href="/admin/contents" className={getLinkClassName('/admin/contents')}>
          <Icons
            name={{
              ...FolderIcon,
              options: { ...FolderIcon, stroke: 'var(--icon-stroke)' },
            }}
          />
          <div className="flex flex-col gap-1">
            <p className="font-semibold">콘텐츠 관리</p>
            <p className="opacity-70 text-xs">신고/피신고 콘텐츠</p>
          </div>
        </Link>
        <Link href="/admin/members" className={getLinkClassName('/admin/members')}>
          <Icons
            name={{
              ...MemberIcon,
              options: { ...MemberIcon, stroke: 'var(--icon-stroke)' },
            }}
          />
          <div className="flex flex-col gap-1">
            <p className="font-semibold">회원 관리</p>
            <p className="opacity-70 text-xs">회원 정지 및 관리</p>
          </div>
        </Link>
        <Link href="/admin/member-category" className={getLinkClassName('/admin/member-category')}>
          <Icons
            name={{
              ...MemberCategoryIcon,
              options: { ...MemberCategoryIcon, stroke: 'var(--icon-stroke)' },
            }}
          />
          <div className="flex flex-col gap-1">
            <p className="font-semibold">회원 카테고리 관리</p>
            <p className="opacity-70 text-xs">직군 카테고리 관리</p>
          </div>
        </Link>
        <Link href="/admin/corp" className={getLinkClassName('/admin/corp')}>
          <Icons
            name={{
              ...CorpIcon,
              options: { ...CorpIcon, stroke: 'var(--icon-stroke)' },
            }}
          />
          <div className="flex flex-col gap-1">
            <p className="font-semibold">기업 관리</p>
            <p className="opacity-70 text-xs">모의면접 기업 관리</p>
          </div>
        </Link>
        <Link href="/admin/notice" className={getLinkClassName('/admin/notice')}>
          <Icons
            name={{
              ...NoticeIcon,
              options: { ...NoticeIcon.options, stroke: 'var(--icon-stroke)' },
            }}
          />
          <div className="flex flex-col gap-1">
            <p className="font-semibold">공지 관리</p>
            <p className="opacity-70 text-xs">공지사항 작성</p>
          </div>
        </Link>
        <Link href="/admin/faq" className={getLinkClassName('/admin/faq')}>
          <Icons
            name={{
              ...FaqIcon,
              options: { ...FaqIcon.options, stroke: 'var(--icon-stroke)' },
            }}
          />
          <div className="flex flex-col gap-1">
            <p className="font-semibold">문의 관리</p>
            <p className="opacity-70 text-xs">문의사항 답변</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
