'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Overlay from '../../Overlay';
import testData from '../test.json';
import menuData from '../menuData.json';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SideMenu({ isOpen, onClose }: SideMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay
          onClick={() => {
            onClose();
          }}
        >
          <motion.div
            animate={{ x: 0.1 }} // 나타날 때 왼쪽에서 오른쪽으로 슬라이드
            transition={{ duration: 0.1 }} // 전환 애니메이션 속도
            className="fixed top-0 -left-1 w-52 pl-4 h-full x-10 z-40 bg-white-0 text-black-0 transition-transform transform drop-shadow-md"
          >
            <div>
              <div className="flex w-full h-20">
                <motion.div layoutId="smallLogo">
                  <Image src="/assets/logo-sm.svg" alt="모바일로고" width={80} height={40} className="flex pt-6 pr-3" />
                </motion.div>
              </div>
              <div className="pl-6 font-semibold text-xl">
                <Link href="/my-page/check-password">{testData.userData.userName} 님</Link>
                <div className="flex bg-gray-5 w-36 h-[1px] mt-3" />
              </div>
            </div>
            <div className="flex-col pl-6">
              <ul className="pt-5 ">
                <p className="text-xl pb-1.5 font-semibold">블로그</p>
                {menuData.blogSubMenuItems.map((menu) => (
                  <Link
                    href={menu.path}
                    onClick={() => {
                      onClose();
                    }}
                  >
                    <li className="text-sm text-gray-0 pt-2 pl-5">{menu.name}</li>
                  </Link>
                ))}
              </ul>
              <ul className="pt-5 ">
                <p className="text-xl pb-1.5 font-semibold">구직</p>
                {menuData.jobSubMenuItems.map((menu) => (
                  <Link
                    href={menu.path}
                    onClick={() => {
                      onClose();
                    }}
                  >
                    <li className="text-sm text-gray-0 pt-2 pl-5">{menu.name}</li>
                  </Link>
                ))}
              </ul>
            </div>
          </motion.div>
        </Overlay>
      )}
    </AnimatePresence>
  );
}
