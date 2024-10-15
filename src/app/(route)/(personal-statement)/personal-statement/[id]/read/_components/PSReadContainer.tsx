'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePDF } from 'react-to-pdf';
import psReadTest from './psReadTest.json';
import BackButton from '../../../../../../_components/BackButton';
import Modal, { initailModalState } from '../../../../../../_components/Modal';
import { PSFormData } from '../../create/_types/psCreate';
import PSFooter from '../../../../_components/PSFooter';
import PSHeader from '../../../../_components/PSHeader';
import PSReadContent from './PSReadContent';

export default function PSReadContainer() {
  const router = useRouter();
  const [psState, setPsState] = useState<PSFormData>({
    title: '',
    position: '',
    reason: '',
    content: '',
  });

  const [modalState, setModalState] = useState(initailModalState);

  useEffect(() => {
    setPsState(psReadTest[0]);
  }, []);

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

  const { toPDF, targetRef } = usePDF({
    filename: '자기소개서.pdf',
    page: { format: 'A4' },
    method: 'save',
  });

  return (
    <>
      <BackButton className="self-start pb-4" />
      <PSHeader
        title={psState.title}
        mode="read"
        onButtonClick={() => {
          router.push('/personal-statement/1/editing');
        }}
        handleDeleteClick={handleDeleteClick}
      />

      <div ref={targetRef} className="self-start w-full mt-8 sm:mt-20">
        <p className="w-full font-semibold text-[28px] pb-5 mb-9 border-b-2 border-gray-[#D9D9D9]">자기소개서</p>

        <div className="flex flex-col gap-11">
          <PSReadContent label="지원 직무" content={psState.position} />
          <PSReadContent label="지원 사유" content={psState.reason} />
          <PSReadContent label="자기소개" content={psState.content} />
        </div>
      </div>
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