'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import MainMenu from './_components/MainMenu';

export default function Header() {
  const router = useRouter();

  // 상태 관리
  const [openMenu, setOpenMenu] = useState<string | null>(null); // 현재 열려 있는 메뉴를 추적
  const [hoverText, setHoverText] = useState<string | null>(null); // 마우스 호버 시의 텍스트 관리

  // 메뉴 열기/닫기 핸들러
  const handleMenuOpen = (menu: string | null) => {
    setOpenMenu(menu === openMenu ? null : menu); // 클릭된 메뉴를 열거나 닫기
  };

  // 서클 표시 핸들러
  const handleCircleTrue = (menu: string) => {
    setHoverText(menu);
  };

  const handleCircleFalse = () => {
    setHoverText(null);
  };

  return (
    <div className="flex text-white-0 px-8 gap-1 w-full bg-white-0 border-b-2 h-20 relative items-center ">
      <div className="hidden md:flex w-full items-center ">
        {/* 로고 버튼 */}
        <div className="pl-4">
          {' '}
          <button
            type="button"
            onClick={() => {
              router.push(`/main`);
            }}
          >
            {/* PC 스크린 */}
            <Image src="/assets/logo-lg.svg" alt="로고" width={117} height={30} className="hidden lg:flex" />

            {/* Tablet 스크린 */}
            <Image
              src="/assets/logo-md.svg"
              alt="로고"
              width={117}
              height={30}
              className="hidden md:flex pt-1 lg:hidden"
            />
          </button>
        </div>
        <div className="flex lg:hidden px-3 ">
          <MainMenu
            openMenu={openMenu}
            hoverText={hoverText}
            handleCircleTrue={handleCircleTrue}
            handleCircleFalse={handleCircleFalse}
            handleMenuOpen={handleMenuOpen}
          />
        </div>
        <div className="hidden lg:flex px-8">
          <MainMenu
            openMenu={openMenu}
            hoverText={hoverText}
            handleCircleTrue={handleCircleTrue}
            handleCircleFalse={handleCircleFalse}
            handleMenuOpen={handleMenuOpen}
          />
        </div>
      </div>
      <div className="flex-center md:hidden w-full h-full pt-6">
        {/* Mobile 스크린 */}
        <button
          type="button"
          onClick={() => {
            router.push(`/main`);
          }}
        >
          <Image src="/assets/logo-sm.svg" alt="모바일로고" width={100} height={30} className="flex md:hidden" />
        </button>
      </div>
    </div>
  );
}
