'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import MoreOptions from '../../../../../../_components/MoreOptions';
import Icons from '../../../../../../_components/ui/Icon';
import { MoreIcon } from '../../../../../../_components/ui/iconPath';
import useClickOutside from '../../../../../../_hooks/useClickOutside';

export default function PSCreateHeader() {
  const router = useRouter();
  const [showDropDown, setShowDropDown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside({
    ref: dropdownRef,
    callback: () => setShowDropDown(false),
  });
  return (
    <div className="flex flex-col w-full items-center">
      <div className="flex justify-between w-full ">
        <p className="font-semibold pt-3">자기소개서 작성</p>
        <button
          type="button"
          onClick={() => router.push('/')}
          className="flex items-center gap-3 py-4 px-7 rounded-[28px] text-xs sm:text-base primary-1-btn"
        >
          작성 완료
        </button>
      </div>

      <div className="flex justify-between items-center w-full mt-[10px]">
        <p className="font-semibold text-[32px]">김현중 자기소개서 _20241010</p>
        <div className="relative" ref={dropdownRef}>
          <Icons
            onClick={() => {
              setShowDropDown((prev) => !prev);
            }}
            className="cursor-pointer"
            name={MoreIcon}
          />

          {showDropDown && <MoreOptions />}
        </div>
      </div>
    </div>
  );
}
