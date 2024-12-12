'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import Modal, { initailModalState } from '../../../../../../_components/Modal';
import MoreOptions from '../../../../../../_components/MoreOptions';
import Icons from '../../../../../../_components/ui/Icon';
import { MoreIcon } from '../../../../../../_components/ui/iconPath';
import useClickOutside from '../../../../../../_hooks/useClickOutside';
import { PSListBoxProps } from '../_types/psList';
import { deletePS } from '@/app/(route)/(personal-statement)/_services/psServices';
import { formatDate } from '@/app/_utils/formatDate';
import useMe from '@/app/_hooks/useMe';
import usePSStore from '../../../../_store/psStore';
import { usePersonalStatementStore } from '@/app/(route)/(personal-statement)/_store/psStore';

export default function PSListBox({ psId, title, position, content, timestamp }: PSListBoxProps) {
  const router = useRouter();
  const { setIsTouch } = usePSStore();
  const queryClient = useQueryClient();
  const [showDropDown, setShowDropDown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data: userData } = useMe();
  const setPsId = usePersonalStatementStore((state) => state.setPsId);

  useClickOutside({
    ref: dropdownRef,
    callback: () => setShowDropDown(false),
  });

  const handlePSListBoxClick = () => {
    setPsId(psId);
    router.push(`/personal-statement/${userData?.data.username}/read`);
  };

  async function handlePSListDelete(postId: number) {
    await deletePS(postId);
    queryClient.invalidateQueries({ queryKey: ['ps'] });
  }

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
      onBtnClick: () => {
        setModalState((prev2) => ({
          ...prev2,
          open: true,
          hasSubBtn: false,
          topText: '삭제되었습니다.',
          btnText: '확인',
          onBtnClick: () => {
            handlePSListDelete(psId);
            setModalState(initailModalState);
          },
        }));
      },
    }));
  };

  function handlePSListEdit(postId: number) {
    setPsId(postId);
    setIsTouch(false);
    router.push(`/personal-statement/${userData?.data.username}/create?edit=true`);
  }

  // 수정 클릭
  const handleEditClick = () => {
    handlePSListEdit(psId);
  };

  return (
    <div className="flex justify-between px-6 pb-4 pt-6 sm:px-8 sm:pb-4 sm:pt-10 border border-gray-2 rounded-lg bg-white-0 cursor-pointer">
      <div onClick={handlePSListBoxClick} className="flex flex-col gap-3 w-2/3">
        <div className="flex items-center gap-4">
          <p className="font-semibold text-lg sm:text-xl line-clamp-2">{title}</p>
          <div className="hidden sm:block bg-primary-1 rounded-md px-5 py-1 text-[11px] text-white-0">
            지원직무 : {position}
          </div>
        </div>

        <p className="text-gray-0 text-sm line-clamp-5">{content}</p>
        <p className="text-gray-0 text-xs sm:text-sm pt-4">{formatDate(timestamp)} 등록</p>
      </div>

      <div className="relative" ref={dropdownRef}>
        <Icons
          onClick={() => {
            setShowDropDown((prev) => !prev);
          }}
          className="cursor-pointer"
          name={MoreIcon}
        />

        {showDropDown && <MoreOptions handleDeleteClick={handleDeleteClick} handleEditClick={handleEditClick} />}
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
