'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import useClickOutside from '../../../_hooks/useClickOutside';
import SubMenu from './SubMenu';
import menuData from '../menuData.json';

interface MainMenuProps {
  hoverText: string | null;
  handleCircleTrue: (menu: string) => void;
  handleCircleFalse: () => void;
  handleBlogOpen: (menu: string | null) => void;
  handleJobOpen: (menu: string | null) => void;
  openBlogMenu: string | null;
  openJobMenu: string | null;
}

export default function MainMenu({
  hoverText,
  handleCircleTrue,
  handleCircleFalse,
  handleBlogOpen,
  handleJobOpen,
  openBlogMenu,
  openJobMenu,
}: MainMenuProps) {
  const blogMenuRef = useRef<HTMLDivElement>(null);
  const jobMenuRef = useRef<HTMLDivElement>(null);

  useClickOutside({
    ref: blogMenuRef,
    callback: () => {
      handleBlogOpen(null);
    },
  });

  useClickOutside({
    ref: jobMenuRef,
    callback: () => {
      handleJobOpen(null);
    },
  });

  function handleCircle() {
    handleCircleFalse();
  }

  return (
    <div className="flex w-full h-16 relative items-center">
      {/* 블로그 메뉴 */}
      <div ref={blogMenuRef} className="w-28 h-16 relative">
        <button
          type="button"
          onMouseEnter={() => handleCircleTrue('blog')}
          onMouseLeave={() => {
            if (openBlogMenu === 'blog') {
              handleCircleTrue('blog');
            } else {
              handleCircle();
            }
          }}
          onClick={() => handleBlogOpen('blog')}
          className="relative text-black-1 text-sm font-semibold w-full h-full pb-2"
        >
          <div className="w-full h-1.5 flex-center">
            <div className="flex-center w-28 h-full">
              {(hoverText || handleCircleTrue) === 'blog' && (
                <motion.div layoutId="circle" className="bg-primary-1 w-1.5 h-1.5 rounded-lg " />
              )}
            </div>
          </div>
          블로그
          {openBlogMenu === 'blog' && <SubMenu menuItems={menuData.blogSubMenuItems} />}
        </button>
      </div>

      {/* 구직 메뉴 */}
      <div ref={jobMenuRef} className="w-28 h-16 relative items-center">
        <button
          type="button"
          onMouseEnter={() => handleCircleTrue('job')}
          onMouseLeave={() => {
            if (openBlogMenu === 'blog') {
              handleCircleTrue('blog');
            } else {
              handleCircle();
            }
          }}
          onClick={() => handleJobOpen('job')}
          className="relative text-black-1 text-sm font-semibold w-full h-full pb-2 "
        >
          <div className="flex -center w-full h-1.5">
            <div className="flex-center w-28 h-full">
              {hoverText === 'job' && (
                <motion.div layoutId="circle" className="bg-primary-1 w-1.5 h-1.5 rounded-lg pb-1" />
              )}
            </div>
          </div>
          구직
          {openJobMenu === 'job' && <SubMenu menuItems={menuData.jobSubMenuItems} />}
        </button>
      </div>
    </div>
  );
}
