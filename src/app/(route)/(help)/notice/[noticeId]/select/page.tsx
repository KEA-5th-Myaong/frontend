'use client';

import { useState, useRef } from 'react';
import { MoreIcon } from '@/app/_components/ui/iconPath';
import Icons from '@/app/_components/ui/Icon';
import MoreOptions from '@/app/_components/MoreOptions';
import testData from '../../test.json';
import BackButton from '@/app/_components/BackButton';
import useClickOutside from '@/app/_hooks/useClickOutside';

export default function NoticeSelect() {
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside({
    ref: dropdownRef,
    callback: () => setMenuOpen(false),
  });

  return (
    <div className="flex-col w-full max-w-[1000px] min-w-[360px]: mx-10 md:my-7 my-32">
      {/* 문의 title */}
      <div className="flex-col w-full py-1">
        <BackButton />
        <div className="flex-col font-semibold text-3xl pt-7">
          공지
          <div className="flex font-light text-sm py-4 text-gray-0">문의메일 : pplog@pplog.com</div>
        </div>
      </div>
      <div className="flex-col w-full border-2 border-gray-5 pb-10">
        <div className="relative py-8">
          <div className="absolute  right-4 w-11 h-10 " ref={dropdownRef}>
            <button
              type="button"
              className="cursor-pointer"
              onClick={() => {
                setMenuOpen((prev) => !prev);
              }}
            >
              <Icons name={MoreIcon} />
            </button>
            {menuOpen && <MoreOptions />}
          </div>
        </div>
        <div className="flex w-full pb-8 px-14 text-2xl font-semibold">
          <div className="">{testData.selectData.title}</div>
        </div>
        <div className="px-14">
          <p className="flex">{testData.selectData.content}</p>
          <div className="py-5 text-gray-0">{testData.selectData.timestamp}</div>
        </div>
      </div>
    </div>
  );
}
