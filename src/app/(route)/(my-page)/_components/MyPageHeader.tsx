'use client';

import Link from 'next/link';
import useMe from '@/app/_hooks/useMe';

interface MyPageHeaderProps {
  currentPage: 'change-profile' | 'change-password' | 'withdraw';
}

export default function MyPageHeader({ currentPage }: MyPageHeaderProps) {
  const { data: userData } = useMe();

  // 현재 페이지에 따라 링크의 스타일을 결정하는 함수
  const getLinkStyle = (page: string) => {
    return currentPage === page ? 'font-bold' : 'font-semibold text-gray-0';
  };

  return (
    <div className="hidden sm:flex items-center sm:gap-8 md:gap-16 w-full pb-6 max-w-[1300px] border-b border-[#d9d9d9]">
      <p className="font-semibold sm:text-[22px] md:text-[32px] whitespace-nowrap">{userData?.data.name} 님</p>

      <div className="flex gap-12 whitespace-nowrap">
        <Link href="/my-page/change-profile" className={getLinkStyle('change-profile')}>
          기본 정보 수정
        </Link>
        <Link href="/my-page/change-password" className={getLinkStyle('change-password')}>
          비밀번호 변경
        </Link>
        <Link href="/my-page/withdraw" className={getLinkStyle('withdraw')}>
          회원 탈퇴
        </Link>
      </div>
    </div>
  );
}
