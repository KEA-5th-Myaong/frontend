'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { usePDF, Margin } from 'react-to-pdf';
import Image from 'next/image';
import Modal, { initailModalState } from '../../../../../../_components/Modal';
import { PSFormData } from '../../create/_types/psCreate';
import PSFooter from '../../../../_components/PSFooter';
import PSHeader from '../../../../_components/PSHeader';
import PSReadContent from './PSReadContent';
import { fetchPS, deletePS } from '@/app/(route)/(personal-statement)/_services/psServices';
import useCustomQuery from '@/app/_hooks/useCustomQuery';
import useMe from '@/app/_hooks/useMe';
import usePSStore from '../../../../_store/psStore';
import { usePersonalStatementStore, usePostWriteStore } from '@/app/(route)/(personal-statement)/_store/psStore';

export default function PSReadContainer() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: userData } = useMe();
  const postId = usePersonalStatementStore((state) => state.psId);

  const { data: psData } = useCustomQuery(['ps', postId], () => fetchPS(postId));
  const { setIsTouch } = usePSStore();

  const setTitle = usePostWriteStore((state) => state.setPostTitle);
  const setContent = usePostWriteStore((state) => state.setPostContent);
  const setReason = usePostWriteStore((state) => state.setPostReason);
  const setPosition = usePostWriteStore((state) => state.setPostPosition);

  const [psState, setPsState] = useState<PSFormData>({
    title: '',
    position: '',
    reason: '',
    content: '',
  });

  const [modalState, setModalState] = useState(initailModalState);

  useEffect(() => {
    setPsState(psData?.data);
  }, [psData]);

  async function handlePSListDelete(psId: number) {
    await deletePS(psId);
  }

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
        handlePSListDelete(Number(postId));
        setModalState((prev2) => ({
          ...prev2,
          open: true,
          hasSubBtn: false,
          topText: '삭제되었습니다.',
          btnText: '확인',
          onBtnClick: async () => {
            setModalState(initailModalState);
            router.back();
            queryClient.invalidateQueries({ queryKey: ['ps'] });
          },
        }));
      },
    }));
  };

  // 수정 클릭
  const handleEditClick = () => {
    setTitle(psData?.data.title);
    setContent(psData?.data.content);
    setReason(psData?.data.title);
    setPosition(psData?.data.position);
    setIsTouch(false);
    router.push(`/personal-statement/${userData?.data.username}/create?edit=true`);
  };

  const { toPDF, targetRef } = usePDF({
    filename: '자기소개서.pdf',
    page: { margin: Margin.SMALL, format: 'A4' },
    method: 'save',
  });

  return (
    <>
      {psState ? (
        <div className="flex-col  w-full h-full">
          <PSHeader
            title={psState.title}
            mode="read"
            onButtonClick={() => {
              router.push('/personal-statement/1/editing');
            }}
            handleDeleteClick={handleDeleteClick}
            handleEditClick={handleEditClick}
          />

          <div ref={targetRef} className="self-start w-full mt-8 sm:mt-20">
            <p className="w-full font-semibold text-[28px] pb-5 mb-9 border-b-2 border-5">자기소개서</p>

            <div className="flex flex-col gap-11">
              <PSReadContent label="지원 직무" content={psState.position} />
              <PSReadContent label="지원 사유" content={psState.reason} />
              <PSReadContent label="자기소개" content={psState.content} />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3 mt-44">
          <Image className="animate-bounce" src="/mascot.png" alt="마스코트" width={204} height={193} />
          <p className="text-gray-0">불러오는 중 입니다</p>
        </div>
      )}
      <PSFooter
        showPDF
        showBack
        handlePdfClick={toPDF}
        handleBackClick={() => {
          router.back();
        }}
      />

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
    </>
  );
}
