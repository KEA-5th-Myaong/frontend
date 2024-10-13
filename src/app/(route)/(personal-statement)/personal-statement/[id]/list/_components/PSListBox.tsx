'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import MoreOptions from '../../../../../../_components/MoreOptions';
import Icons from '../../../../../../_components/ui/Icon';
import { MoreIcon } from '../../../../../../_components/ui/iconPath';
import useClickOutside from '../../../../../../_hooks/useClickOutside';
import { PSListBoxProps } from '../_types/psList';
import Modal, { initailModalState } from '../../../../../../_components/Modal';

export default function PSListBox({ id, title, job, content, created_at }: PSListBoxProps) {
  const router = useRouter();
  const [showDropDown, setShowDropDown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside({
    ref: dropdownRef,
    callback: () => setShowDropDown(false),
  });

  const handlePSListBoxClick = () => {
    router.push(`/personal-statement/${id}/read`);
  };

  const [modalState, setModalState] = useState(initailModalState);

  // 삭제 클릭
  const handleDeleteClick = () => {
    setModalState((prev) => ({
      ...prev,
      open: true,
      hasSubBtn: true,
      topText: '자기소개서를 삭제하시겠습니까?',
      subBtnText: '취소',
      btnText: '확인',
      onSubBtnClick: () => setModalState(initailModalState),
      onBtnClick: () =>
        setModalState((prev2) => ({
          ...prev2,
          open: true,
          hasSubBtn: false,
          topText: '삭제되었습니다.',
          btnText: '확인',
          onBtnClick: () => setModalState(initailModalState),
        })),
    }));
  };

  return (
    <div className="flex justify-between px-8 pb-4 pt-10 border border-gray-2 rounded-lg bg-white-0 cursor-pointer">
      <div
        role="button"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handlePSListBoxClick();
          }
        }}
        onClick={handlePSListBoxClick}
        className="flex flex-col gap-3 w-2/3"
        tabIndex={0}
      >
        <div className="flex items-center gap-4">
          <p className="font-semibold text-xl line-clamp-2">{title}</p>
          <div className="hidden sm:block bg-primary-1 rounded-md px-5 py-1 text-xs text-white-0">지원직무 : {job}</div>
        </div>

        <p className="text-gray-0 text-sm line-clamp-5">{content}</p>
        <p className="text-gray-0 text-sm pt-4">{created_at} 등록</p>
      </div>

      <div className="relative" ref={dropdownRef}>
        <Icons
          onClick={() => {
            setShowDropDown((prev) => !prev);
          }}
          className="cursor-pointer"
          name={MoreIcon}
        />

        {showDropDown && <MoreOptions handleDeleteClick={handleDeleteClick} />}
      </div>

      {modalState.open && (
        <Modal
          hasSubBtn={modalState.hasSubBtn}
          topText={modalState.topText}
          subBtnText={modalState.subBtnText}
          btnText={modalState.btnText}
          onSubBtnClick={modalState.onSubBtnClick}
          onBtnClick={modalState.onBtnClick}
        />
      )}
    </div>
  );
}
