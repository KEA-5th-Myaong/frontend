'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import MainMenu from './_components/MainMenu';
import Icons from '../ui/Icon';
import { MenuIcon } from '../ui/iconPath';
import SideMenu from './_components/SideMenu';
import useClickOutside from '../../_hooks/useClickOutside';

export default function Header() {
  const router = useRouter();

  // 상태 관리
  const [openMenu, setOpenMenu] = useState<string | null>(null); // 현재 열려 있는 메뉴를 추적
  const [hoverText, setHoverText] = useState<string | null>(null); // 마우스 호버 시의 텍스트 관리
  const [isSideMenuOpen, setSideMenuOpen] = useState(false); // 사이드 메뉴 상태 추가

  const toggleMenuRef = useRef<HTMLDivElement>(null);

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

  const toggleSideMenuOpen = () => {
    setSideMenuOpen(true);
  };

  const toggleSideMenuClose = () => {
    setSideMenuOpen(false);
  };

  useClickOutside({
    ref: toggleMenuRef,
    callback: () => {
      toggleSideMenuClose();
    },
  });

  return (
    <div className="fixed md:relative flex text-white-0 px-8 gap-1 w-full bg-white-0 border-b-2 h-20 items-center z-50">
      <div className="hidden md:flex w-full items-center ">
        {/* 로고 버튼 */}
        <div className="pl-4">
          <button
            type="button"
            onClick={() => {
              router.push(`/main`);
            }}
          >
            <Image src="/assets/logo-lg.svg" alt="로고" width={117} height={30} className="hidden lg:flex" />
            <Image
              src="/assets/logo-md.svg"
              alt="로고"
              width={117}
              height={30}
              className="hidden md:flex pt-1 lg:hidden"
            />
          </button>
        </div>
        {/* PC 및 Tablet 스크린 */}
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
      {/* Mobile 스크린 */}
      <div className="flex-center md:hidden w-full h-full">
        <div className="absolute left-1 p-4 w-10 h-12">
          <button type="button" onClick={toggleSideMenuOpen}>
            <Icons name={MenuIcon} />
          </button>
        </div>
        <button
          type="button"
          onClick={() => {
            router.push(`/main`);
          }}
        >
          {!isSideMenuOpen && (
            <motion.div layoutId="smallLogo" className="flex">
              <Image
                src="/assets/logo-sm.svg"
                alt="모바일로고"
                width={80}
                height={40}
                className="flex md:hidden pt-6 pr-3"
              />
            </motion.div>
          )}
        </button>
      </div>
      <div ref={toggleMenuRef}>
        {/* SideMenu 컴포넌트 */}
        <SideMenu isOpen={isSideMenuOpen} onClose={toggleSideMenuClose} />
      </div>
    </div>
  );
}
