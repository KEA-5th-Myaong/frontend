'use client';

import { useRef, useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import useClickOutside from '../../../_hooks/useClickOutside';
import SubMenu from './SubMenu';
import { User } from '@/app/_hooks/useMe';

interface MainMenuProps {
  userData: User | undefined;
  handleBlogOpen: (menu: string | null) => void;
  handleJobOpen: (menu: string | null) => void;
  openBlogMenu: string | null;
  openJobMenu: string | null;
}

export default function MainMenu({
  userData,
  handleBlogOpen,
  handleJobOpen,
  openBlogMenu,
  openJobMenu,
}: MainMenuProps) {
  const blogMenuRef = useRef<HTMLDivElement>(null);
  const jobMenuRef = useRef<HTMLDivElement>(null);
  const [hoverBlogText, setHoverBlogText] = useState<true | false>(false); // 마우스 호버 시의 텍스트 관리
  const [hoverJobText, setHoverJobText] = useState<true | false>(false); // 마우스 호버 시의 텍스트 관리

  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    handleJobOpen(null);
    handleBlogOpen(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);

  useClickOutside({
    ref: blogMenuRef,
    callback: () => {
      handleBlogOpen(null);
      setHoverBlogText(false);
    },
  });

  useClickOutside({
    ref: jobMenuRef,
    callback: () => {
      handleJobOpen(null);
      setHoverJobText(false);
    },
  });

  const handleBlogCircleTrue = () => {
    setHoverBlogText(true);
  };
  const handleJobCircleTrue = () => {
    setHoverJobText(true);
  };

  const handleBlogCircleFalse = () => {
    setHoverBlogText(false);
  };
  const handleJobCircleFalse = () => {
    setHoverJobText(false);
  };

  return (
    <div className="flex w-full h-16 relative items-center">
      {/* 블로그 메뉴 */}
      <div ref={blogMenuRef} className="w-28 h-16 relative">
        <button
          type="button"
          onMouseEnter={() => handleBlogCircleTrue()}
          onMouseLeave={() => {
            if (openBlogMenu !== 'blog') {
              handleBlogCircleFalse();
            }
          }}
          onClick={() => handleBlogOpen('blog')}
          className="relative text-black-1 dark:text-white-1 text-sm font-semibold w-full h-full pb-2"
        >
          <div className="w-full h-1.5 flex-center">
            <div className="flex-center w-28 h-full">
              {hoverBlogText === true && (
                <motion.div layoutId="circle" className="bg-primary-1 w-1.5 h-1.5 rounded-lg " />
              )}
            </div>
          </div>
          블로그
          {openBlogMenu === 'blog' && <SubMenu isBlog userName={userData?.data.username} />}
        </button>
      </div>

      {/* 구직 메뉴 */}
      <div ref={jobMenuRef} className="w-28 h-16 relative items-center">
        <button
          type="button"
          onMouseEnter={() => handleJobCircleTrue()}
          onMouseLeave={() => {
            if (openJobMenu !== 'job') {
              handleJobCircleFalse();
            }
          }}
          onClick={() => handleJobOpen('job')}
          className="relative text-black-1 dark:text-white-1 text-sm font-semibold w-full h-full pb-2 "
        >
          <div className="flex -center w-full h-1.5">
            <div className="flex-center w-28 h-full">
              {hoverJobText === true && (
                <motion.div layoutId="circle" className="bg-primary-1 w-1.5 h-1.5 rounded-lg pb-1" />
              )}
            </div>
          </div>
          구직
          {openJobMenu === 'job' && <SubMenu isBlog={false} userName={userData?.data.username} />}
        </button>
      </div>
    </div>
  );
}
