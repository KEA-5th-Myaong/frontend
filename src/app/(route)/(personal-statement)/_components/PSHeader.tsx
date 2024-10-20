'use client';

import { useState, useRef } from 'react';
import MoreOptions from '../../../_components/MoreOptions';
import Icons from '../../../_components/ui/Icon';
import { MoreIcon } from '../../../_components/ui/iconPath';
import useClickOutside from '../../../_hooks/useClickOutside';

export interface PSCreateHeaderProps {
  title: string;
  mode: 'create' | 'preview' | 'read' | 'editing';
  onButtonClick?: () => void;
  handleDeleteClick?: () => void;
}

const headerText = {
  buttonText: {
    create: '작성 완료',
    preview: '뒤로 가기',
    read: 'AI 첨삭 바로가기',
    editing: '포스트 작성',
  },
  titleText: {
    create: '자기소개서 작성',
    preview: '자기소개서 미리보기',
    read: '자기소개서',
    editing: '자기소개서 첨삭',
  },
};

export default function PSHeader({ title, mode, onButtonClick, handleDeleteClick }: PSCreateHeaderProps) {
  const [showDropDown, setShowDropDown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside({
    ref: dropdownRef,
    callback: () => setShowDropDown(false),
  });

  const getButtonText = () => headerText.buttonText[mode] || '';
  const getTitleText = () => headerText.titleText[mode] || '';

  return (
    <div className="flex flex-col w-full items-center">
      <div className="flex items-center justify-between w-full">
        <p className="font-semibold">{getTitleText()}</p>
        {onButtonClick && (
          <button
            type="button"
            onClick={onButtonClick}
            className="flex items-center gap-3 py-4 px-7 rounded-[28px] text-xs sm:text-base primary-1-btn"
          >
            {getButtonText()}
          </button>
        )}
      </div>

      <div className="flex justify-between items-center w-full mt-2.5">
        <p className="font-semibold text-2xl sm:text-[32px]">{title}</p>
        {mode === 'read' && (
          <div className="relative mr-5" ref={dropdownRef}>
            <Icons onClick={() => setShowDropDown((prev) => !prev)} className="cursor-pointer" name={MoreIcon} />
            {showDropDown && <MoreOptions handleDeleteClick={handleDeleteClick} />}
          </div>
        )}
      </div>
    </div>
  );
}
