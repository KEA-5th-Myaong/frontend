'use client';

import { useState, useRef } from 'react';
import { MoreIcon, LockIcon } from '@/app/_components/ui/iconPath';
import Icons from '@/app/_components/ui/Icon';
import MoreOptions from '@/app/_components/MoreOptions';
import testData from '../../test.json';
import BackButton from '@/app/_components/BackButton';
import useClickOutside from '@/app/_hooks/useClickOutside';

export default function QASelect() {
  const [isLocked, setIsLocked] = useState(true);
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
          문의
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
        <div className="flex w-full pb-8 px-7 text-2xl font-semibold">
          <div className="flex w-7 h-7">{isLocked && <Icons name={LockIcon} className="flex-center w-5 h-8" />}</div>
          <div className="">{testData.selectData.title}</div>
        </div>
        <div className="px-14">
          <p className="flex">{testData.selectData.content}</p>
          <div className="py-5">{testData.selectData.timestamp}</div>
        </div>
      </div>
      <div className="flex-col w-full bg-blue-2 mt-5 pb-10">
        <div className="flex w-full py-10 px-7 text-xl font-semibold">
          <div className="px-7">관리자</div>
        </div>
        <div className="px-14">
          <p className="flex">{testData.selectData.content}</p>
          <div className="py-5">{testData.selectData.timestamp}</div>
        </div>
      </div>
    </div>
  );
}
