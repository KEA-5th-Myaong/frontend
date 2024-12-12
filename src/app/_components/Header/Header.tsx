'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import MainMenu from './_components/MainMenu';
import Icons from '../ui/Icon';
import { MenuIcon } from '../ui/iconPath';
import SideMenu from './_components/SideMenu';
import useClickOutside from '../../_hooks/useClickOutside';
import MyMenu from './_components/MyMenu';
import useMe from '@/app/_hooks/useMe';

export default function Header() {
  const { data: userData } = useMe();

  // 상태 관리
  const [openMenu, setOpenMenu] = useState<string | null>(null); // 현재 열려 있는 메뉴를 추적
  const [openBlogMenu, setOpenBlogMenu] = useState<string | null>(null); // 현재 열려 있는 메뉴를 추적
  const [openJobMenu, setOpenJobMenu] = useState<string | null>(null); // 현재 열려 있는 메뉴를 추적
  const [isSideMenuOpen, setSideMenuOpen] = useState(false); // 사이드 메뉴 상태

  const toggleMenuRef = useRef<HTMLDivElement>(null);

  // 메뉴 열기/닫기 핸들러
  const handleMenuOpen = (menu: string | null) => {
    setOpenMenu(menu === openMenu ? null : menu); // 클릭된 메뉴를 열거나 닫기
  };

  const handleBlogOpen = (menu: string | null) => {
    setOpenBlogMenu(menu === openMenu ? null : menu); // 클릭된 메뉴를 열거나 닫기
  };

  const handleJobOpen = (menu: string | null) => {
    setOpenJobMenu(menu === openMenu ? null : menu); // 클릭된 메뉴를 열거나 닫기
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
    <div className="fixed md:relative flex text-white-0 px-8 w-full min-w-[360px] bg-white-0 dark:bg-black-1 border-b-2 h-20 items-center z-50">
      <div className="hidden md:flex w-full items-center">
        {/* 로고 버튼 */}
        <div className="pl-4 w-44">
          <Link href="/main">
            <Image src="/assets/logo-lg.svg" alt="로고" width={117} height={30} className="hidden lg:flex mr-3" />
            <Image
              src="/assets/logo-md.svg"
              alt="로고"
              width={117}
              height={30}
              className="hidden md:flex pt-1 lg:hidden"
            />
          </Link>
        </div>
        {/* PC 및 Tablet 스크린 */}
        <div className="hidden md:flex">
          <MainMenu
            userData={userData}
            handleBlogOpen={handleBlogOpen}
            handleJobOpen={handleJobOpen}
            openBlogMenu={openBlogMenu}
            openJobMenu={openJobMenu}
          />
        </div>
      </div>
      <div className="hidden md:flex w-full">
        <MyMenu openMenu={openMenu} handleMenuOpen={handleMenuOpen} userData={userData} />
      </div>

      {/* Mobile 스크린 */}
      <div className="flex-center md:hidden w-full">
        <div className="absolute left-1 pl-4 cursor-pointer" onClick={toggleSideMenuOpen}>
          <Icons name={MenuIcon} />
        </div>
        <Link href="/main" className="">
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
        </Link>
      </div>
      <div ref={toggleMenuRef}>
        {/* SideMenu 컴포넌트 */}
        <SideMenu isOpen={isSideMenuOpen} onClose={toggleSideMenuClose} userData={userData} />
      </div>
    </div>
  );
}
