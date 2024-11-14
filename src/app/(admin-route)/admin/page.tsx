'use client';

import Link from 'next/link';
import Image from 'next/image';
import Icons from '@/app/_components/ui/Icon';
import {
  AlertIcon,
  CorpIcon,
  FaqIcon,
  FolderIcon,
  LogOutIcon,
  MemberCategoryIcon,
  MemberIcon,
  NoticeIcon,
} from '@/app/_components/ui/iconPath';

export default function AdminMain() {
  const handleLogoutClick = () => {};
  return (
    <section className="flex-center w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 font-semibold min-w-[360px] w-full max-w-[768px] pb-40">
        {/* 관리자 */}
        <div className="flex-center flex-col bg-black-3 h-[286px] pt-10 pb-9 text-white-0 font-semibold w-full max-w-h-96 shadow-xl">
          <Image width={120} height={120} src="/assets/admin/main-admin.svg" alt="" />
          <p className="mt-4">관리자</p>
          <p className="mt-3 font-medium">yeonilil@naver.com</p>
          <button type="button" onClick={handleLogoutClick} className="mt-5 flex gap-1.5 items-center">
            <Icons name={LogOutIcon} />
            로그아웃
          </button>
        </div>

        {/* 알림 */}
        <div className="pl-10 pr-6 pt-9 w-full h-[286px] max-w-h-96 border border-gray-3 font-semibold bg-white-0">
          <div className="flex items-center gap-3 pb-2.5 border-b border-gray-0">
            <Icons name={AlertIcon} />
            알림
          </div>
          <div className="mt-6 w-full flex justify-between text-xs whitespace-nowrap">
            <p>답변 대기 문의</p>
            <p className="text-red-0 pr-14">2건</p>
          </div>
        </div>

        {/* 콘텐츠 관리 */}
        <Link href="/admin/contents" className="manage-page-block">
          <div className="manage-icon">
            <Icons name={FolderIcon} />
            콘텐츠 관리
          </div>
          <Image width={40} height={40} src="/assets/arrow-right.svg" alt=">" />
        </Link>
        {/* 기업 관리 */}
        <Link href="/admin/corp" className="manage-page-block">
          <div className="manage-icon">
            <Icons name={CorpIcon} />
            기업 관리
          </div>
          <Image width={40} height={40} src="/assets/arrow-right.svg" alt=">" />
        </Link>
        {/* 회원 관리 */}
        <Link href="/admin/members" className="manage-page-block">
          <div className="manage-icon">
            <Icons name={MemberIcon} />
            회원 관리
          </div>
          <Image width={40} height={40} src="/assets/arrow-right.svg" alt=">" />
        </Link>
        {/* 회원 카테고리 관리 */}
        <Link href="admin/member-category" className="manage-page-block">
          <div className="manage-icon">
            <Icons name={MemberCategoryIcon} />
            회원 카테고리 관리
          </div>
          <Image width={40} height={40} src="/assets/arrow-right.svg" alt=">" />
        </Link>
        {/* 문의 관리 */}
        <Link href="/admin/faq" className="manage-page-block">
          <div className="manage-icon">
            <Icons name={FaqIcon} />
            문의 관리
          </div>
          <Image width={40} height={40} src="/assets/arrow-right.svg" alt=">" />
        </Link>
        {/* 공지 관리 */}
        <Link href="/admin/notice" className="manage-page-block">
          <div className="manage-icon">
            <Icons name={NoticeIcon} />
            공지 관리
          </div>
          <Image width={40} height={40} src="/assets/arrow-right.svg" alt=">" />
        </Link>
      </div>
    </section>
  );
}
