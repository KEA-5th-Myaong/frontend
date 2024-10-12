'use client';

import { useState, useRef } from 'react';
import MoreOptions from '../../../../../../_components/MoreOptions';
import Icons from '../../../../../../_components/ui/Icon';
import { MoreIcon } from '../../../../../../_components/ui/iconPath';
import useClickOutside from '../../../../../../_hooks/useClickOutside';

export interface PSCreateHeaderProps {
  title: string;
  mode: 'create' | 'preview' | 'read';
  onButtonClick: () => void;
  handleDeleteClick?: () => void;
}

export default function PSCreateHeader({ title, mode, onButtonClick, handleDeleteClick }: PSCreateHeaderProps) {
  const [showDropDown, setShowDropDown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside({
    ref: dropdownRef,
    callback: () => setShowDropDown(false),
  });

  const getButtonText = () => {
    switch (mode) {
      case 'create':
        return '작성 완료';
      case 'preview':
        return '뒤로 가기';
      case 'read':
        return 'AI 첨삭 바로가기';
      default:
        return '';
    }
  };

  return (
    <div className="flex flex-col w-full items-center">
      <div className="flex justify-between w-full ">
        <p className="font-semibold pt-3">자기소개서 작성</p>
        <button
          type="button"
          onClick={onButtonClick}
          className="flex items-center gap-3 py-4 px-7 rounded-[28px] text-xs sm:text-base primary-1-btn"
        >
          {getButtonText()}
        </button>
      </div>

      <div className="flex justify-between items-center w-full mt-[10px]">
        <p className="font-semibold text-[32px]">{title}</p>
        {mode === 'read' && (
          <div className="relative" ref={dropdownRef}>
            <Icons onClick={() => setShowDropDown((prev) => !prev)} className="cursor-pointer" name={MoreIcon} />
            {showDropDown && <MoreOptions handleDeleteClick={handleDeleteClick} />}
          </div>
        )}
      </div>
    </div>
  );
}
