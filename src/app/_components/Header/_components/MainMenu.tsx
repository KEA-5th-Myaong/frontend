'use client';

import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import useClickOutside from '../../../_hooks/useClickOutside';
import SubMenu from './SubMenu'; // 새로 만든 SubMenu 컴포넌트 불러오기

interface MainMenuProps {
  openMenu: string | null;
  hoverText: string | null;
  handleCircleTrue: (menu: string) => void;
  handleCircleFalse: () => void;
  handleMenuOpen: (menu: string | null) => void;
}

export default function MainMenu({
  openMenu,
  hoverText,
  handleCircleTrue,
  handleCircleFalse,
  handleMenuOpen,
}: MainMenuProps) {
  const router = useRouter();

  const blogMenuRef = useRef<HTMLDivElement>(null);
  const jobMenuRef = useRef<HTMLDivElement>(null);

  const blogSubMenuItems = [
    { id: 1, name: '내 블로그', onClick: () => router.push(`/blog/1`) },
    { id: 2, name: '글쓰기', onClick: () => router.push(`/blog/1/write`) },
  ];

  const jobSubMenuItems = [
    { id: 1, name: '모의 면접', onClick: () => router.push(`/interview/1/select`) },
    { id: 2, name: '자소서 첨삭', onClick: () => router.push(`/personal-statement/1/list`) },
    { id: 3, name: '내 포트폴리오', onClick: () => router.push(`/portfolio`) },
  ];

  useClickOutside({
    ref: blogMenuRef,
    callback: () => {
      handleMenuOpen(null);
      handleCircleFalse();
    },
  });

  useClickOutside({
    ref: jobMenuRef,
    callback: () => {
      handleMenuOpen(null);
      handleCircleFalse();
    },
  });

  return (
    <div className="flex gap-1 w-full h-16 relative items-center">
      {/* 블로그 메뉴 */}
      <div ref={blogMenuRef} className="w-28 h-9 relative">
        <div className="w-full h-1.5 justify-center items-center">
          <div className="flex-center w-28 h-full">
            {hoverText === 'blog' && <div className="bg-primary-1 w-1.5 h-1.5 rounded-lg " />}
          </div>
        </div>
        <button
          type="button"
          onMouseEnter={() => handleCircleTrue('blog')}
          onMouseLeave={() => handleCircleFalse()}
          onClick={() => handleMenuOpen('blog')}
          className="relative text-black-1 text-sm font-semibold w-full"
        >
          블로그
          {openMenu === 'blog' && <SubMenu menuItems={blogSubMenuItems} />}
        </button>
      </div>

      {/* 구직 메뉴 */}
      <div ref={jobMenuRef} className="w-28 h-9 relative items-center">
        <div className="w-full h-1.5 justify-center items-center">
          <div className="flex-center w-28 h-full">
            {hoverText === 'job' && <div className="bg-primary-1 w-1.5 h-1.5 rounded-lg " />}
          </div>
        </div>
        <button
          type="button"
          onMouseEnter={() => handleCircleTrue('job')}
          onMouseLeave={() => handleCircleFalse()}
          onClick={() => handleMenuOpen('job')}
          className="relative text-black-1 text-sm font-semibold w-full"
        >
          구직
          {openMenu === 'job' && <SubMenu menuItems={jobSubMenuItems} />}
        </button>
      </div>
    </div>
  );
}
